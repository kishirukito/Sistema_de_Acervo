-- ==============================================================================
-- MIGRACIÓN DE OPTIMIZACIÓN: Funciones Almacenadas (RPC) para Latencia Reducida
-- Sistema de Acervo Bibliotecario (CIU)
-- ==============================================================================

-- 1. Función RPC para creación atómica de libros en una sola transacción
CREATE OR REPLACE FUNCTION registrar_libro_completo(
    p_isbn VARCHAR,
    p_titulo VARCHAR,
    p_autor VARCHAR,
    p_editorial VARCHAR DEFAULT NULL,
    p_anio_publicacion INT DEFAULT 2026,
    p_edicion VARCHAR DEFAULT '1ra Edición',
    p_categoria VARCHAR DEFAULT '000',
    p_total_copias INT DEFAULT 1,
    p_ubicacion_estante VARCHAR DEFAULT 'Estante General',
    p_portada_url VARCHAR DEFAULT NULL,
    p_descripcion TEXT DEFAULT NULL,
    p_creado_por_id UUID DEFAULT 'a0000000-0000-0000-0000-000000000001'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_editorial_id INT := NULL;
    v_autor_id INT := NULL;
    v_tema_id INT := NULL;
    v_libro_id UUID;
    v_libro JSONB;
    v_sufijo VARCHAR;
    v_clean_isbn VARCHAR;
    v_letra VARCHAR;
    v_cod_inv VARCHAR;
    i INT;
BEGIN
    -- A. Validación de unicidad de ISBN
    IF EXISTS (SELECT 1 FROM libros WHERE isbn = p_isbn) THEN
        RAISE EXCEPTION 'El código ISBN ya se encuentra registrado en el acervo' USING ERRCODE = '23505';
    END IF;

    -- B. Resolver o crear Editorial
    IF p_editorial IS NOT NULL AND LENGTH(TRIM(p_editorial)) > 0 THEN
        SELECT id INTO v_editorial_id FROM editoriales WHERE LOWER(nombre) = LOWER(TRIM(p_editorial)) LIMIT 1;
        IF v_editorial_id IS NULL THEN
            INSERT INTO editoriales (nombre) VALUES (TRIM(p_editorial)) RETURNING id INTO v_editorial_id;
        END IF;
    END IF;

    -- C. Insertar Libro
    INSERT INTO libros (
        isbn,
        titulo,
        autor,
        editorial,
        anio_publicacion,
        edicion,
        portada_url,
        editorial_id,
        clasificacion_dewey,
        creado_por_id
    ) VALUES (
        p_isbn,
        p_titulo,
        p_autor,
        p_editorial,
        p_anio_publicacion,
        p_edicion,
        p_portada_url,
        v_editorial_id,
        SUBSTRING(p_categoria FROM 1 FOR 10),
        p_creado_por_id
    ) RETURNING id INTO v_libro_id;

    -- D. Resolver o crear Autor y asociar
    IF p_autor IS NOT NULL AND LENGTH(TRIM(p_autor)) > 0 THEN
        SELECT id INTO v_autor_id FROM autores WHERE LOWER(nombre) = LOWER(TRIM(p_autor)) LIMIT 1;
        IF v_autor_id IS NULL THEN
            INSERT INTO autores (nombre) VALUES (TRIM(p_autor)) RETURNING id INTO v_autor_id;
        END IF;
        INSERT INTO libro_autores (libro_id, autor_id, orden) VALUES (v_libro_id, v_autor_id, 1)
        ON CONFLICT DO NOTHING;
    END IF;

    -- E. Asociar tema/categoría si existe
    SELECT id INTO v_tema_id FROM temas WHERE nombre ILIKE '%' || SUBSTRING(p_categoria FROM 1 FOR 3) || '%' LIMIT 1;
    IF v_tema_id IS NOT NULL THEN
        INSERT INTO libro_temas (libro_id, tema_id) VALUES (v_libro_id, v_tema_id)
        ON CONFLICT DO NOTHING;
    END IF;

    -- F. Insertar Ejemplares
    v_clean_isbn := REGEXP_REPLACE(p_isbn, '[^A-Za-z0-9]', '', 'g');
    IF LENGTH(v_clean_isbn) >= 4 THEN
        v_sufijo := SUBSTRING(v_clean_isbn FROM LENGTH(v_clean_isbn) - 3 FOR 4);
    ELSE
        v_sufijo := '001';
    END IF;

    FOR i IN 1..GREATEST(1, LEAST(p_total_copias, 50)) LOOP
        IF i <= 26 THEN
            v_letra := CHR(64 + i);
        ELSE
            v_letra := i::VARCHAR;
        END IF;
        v_cod_inv := 'CIU-' || v_sufijo || '-' || v_letra;

        INSERT INTO ejemplares (
            libro_id,
            codigo_inventario,
            ubicacion_estante,
            estado,
            observaciones
        ) VALUES (
            v_libro_id,
            v_cod_inv,
            COALESCE(p_ubicacion_estante, 'Estante General'),
            'disponible',
            'Ejemplar ' || v_letra || ' ingresado al acervo'
        );
    END LOOP;

    -- G. Resumen IA si fue proporcionado
    IF p_descripcion IS NOT NULL AND LENGTH(TRIM(p_descripcion)) > 0 THEN
        INSERT INTO resumenes_ia (
            libro_id,
            resumen_texto,
            palabras_clave,
            modelo_usado
        ) VALUES (
            v_libro_id,
            TRIM(p_descripcion),
            p_titulo || ', ' || p_autor || ', Acervo CIU',
            'llama3.2:3b'
        );
    END IF;

    -- H. Construir y devolver respuesta JSONB completa
    SELECT json_build_object(
        'id', l.id,
        'isbn', l.isbn,
        'titulo', l.titulo,
        'autor', l.autor,
        'anio_publicacion', l.anio_publicacion,
        'edicion', l.edicion,
        'portada_url', l.portada_url,
        'editorial_id', l.editorial_id,
        'clasificacion_dewey', l.clasificacion_dewey,
        'created_at', l.created_at,
        'ejemplares', (
            SELECT COALESCE(json_agg(row_to_json(e)), '[]'::json)
            FROM ejemplares e
            WHERE e.libro_id = l.id
        )
    )::jsonb INTO v_libro
    FROM libros l
    WHERE l.id = v_libro_id;

    RETURN v_libro;
END;
$$;

