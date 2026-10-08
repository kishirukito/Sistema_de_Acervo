-- ==============================================================================
-- SISTEMA DE GESTIÓN BIBLIOTECARIA (SISTEMA DE ACERVO - CIU)
-- Script DDL de Base de Datos para PostgreSQL 15+ / Supabase
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TIPOS ENUM PERSONALIZADOS
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_user_rol') THEN
        CREATE TYPE enum_user_rol AS ENUM ('admin', 'personal', 'alumno');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_user_estado') THEN
        CREATE TYPE enum_user_estado AS ENUM ('activo', 'suspendido', 'inactivo');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_ejemplar_estado') THEN
        CREATE TYPE enum_ejemplar_estado AS ENUM ('disponible', 'prestado', 'mantenimiento', 'extraviado');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_prestamo_estado') THEN
        CREATE TYPE enum_prestamo_estado AS ENUM ('activo', 'devuelto', 'vencido', 'renovado');
    END IF;
END $$;

-- 3. TABLA: USUARIOS
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nombre_completo VARCHAR(150) NOT NULL,
    matricula_o_nomina VARCHAR(30) UNIQUE NOT NULL,
    rol enum_user_rol NOT NULL DEFAULT 'alumno',
    estado enum_user_estado NOT NULL DEFAULT 'activo',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLA: TEMAS
CREATE TABLE IF NOT EXISTS temas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT
);

-- 5. TABLA: LIBROS
CREATE TABLE IF NOT EXISTS libros (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    isbn VARCHAR(20) UNIQUE NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(200) NOT NULL,
    editorial VARCHAR(100),
    anio_publicacion INT CHECK (anio_publicacion >= 1500 AND anio_publicacion <= 2100),
    edicion VARCHAR(50),
    portada_url VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLA PIVOTE: LIBRO_TEMAS
CREATE TABLE IF NOT EXISTS libro_temas (
    libro_id UUID NOT NULL REFERENCES libros(id) ON DELETE CASCADE,
    tema_id INT NOT NULL REFERENCES temas(id) ON DELETE CASCADE,
    PRIMARY KEY (libro_id, tema_id)
);

-- 7. TABLA: EJEMPLARES
CREATE TABLE IF NOT EXISTS ejemplares (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    libro_id UUID NOT NULL REFERENCES libros(id) ON DELETE CASCADE,
    codigo_inventario VARCHAR(50) UNIQUE NOT NULL,
    ubicacion_estante VARCHAR(80) NOT NULL,
    estado enum_ejemplar_estado NOT NULL DEFAULT 'disponible',
    observaciones TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABLA: PRESTAMOS
CREATE TABLE IF NOT EXISTS prestamos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    ejemplar_id UUID NOT NULL REFERENCES ejemplares(id) ON DELETE RESTRICT,
    fecha_prestamo TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    fecha_limite_devolucion TIMESTAMPTZ NOT NULL,
    fecha_devolucion_real TIMESTAMPTZ,
    estado enum_prestamo_estado NOT NULL DEFAULT 'activo',
    notas TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. TABLA: RESUMENES_IA
CREATE TABLE IF NOT EXISTS resumenes_ia (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    libro_id UUID NOT NULL REFERENCES libros(id) ON DELETE CASCADE,
    resumen_texto TEXT NOT NULL,
    palabras_clave VARCHAR(300),
    modelo_usado VARCHAR(50) DEFAULT 'gpt-4o-mini',
    generado_en TIMESTAMPTZ DEFAULT NOW()
);

-- 10. TABLA: AUDITORIA_LOGS
CREATE TABLE IF NOT EXISTS auditoria_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    accion VARCHAR(20) NOT NULL,
    tabla_afectada VARCHAR(50) NOT NULL,
    registro_id VARCHAR(100) NOT NULL,
    detalle_cambio JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ÍNDICES DE RENDIMIENTO
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_libros_isbn ON libros(isbn);
CREATE INDEX IF NOT EXISTS idx_libros_titulo ON libros(titulo);
CREATE INDEX IF NOT EXISTS idx_ejemplares_codigo ON ejemplares(codigo_inventario);
CREATE INDEX IF NOT EXISTS idx_prestamos_usuario ON prestamos(usuario_id);
CREATE INDEX IF NOT EXISTS idx_prestamos_estado ON prestamos(estado);
CREATE INDEX IF NOT EXISTS idx_auditoria_tabla ON auditoria_logs(tabla_afectada);

-- ==============================================================================
-- TRIGGER PARA ACTUALIZAR 'updated_at' AUTOMÁTICAMENTE
-- ==============================================================================
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp_usuarios ON usuarios;
CREATE TRIGGER set_timestamp_usuarios
BEFORE UPDATE ON usuarios
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_libros ON libros;
CREATE TRIGGER set_timestamp_libros
BEFORE UPDATE ON libros
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

DROP TRIGGER IF EXISTS set_timestamp_ejemplares ON ejemplares;
CREATE TRIGGER set_timestamp_ejemplares
BEFORE UPDATE ON ejemplares
FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) PARA SUPABASE
-- ==============================================================================
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE libros ENABLE ROW LEVEL SECURITY;
ALTER TABLE ejemplares ENABLE ROW LEVEL SECURITY;
ALTER TABLE prestamos ENABLE ROW LEVEL SECURITY;
ALTER TABLE temas ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumenes_ia ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditoria_logs ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública
DROP POLICY IF EXISTS "Lectura pública de libros" ON libros;
CREATE POLICY "Lectura pública de libros" ON libros FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura pública de temas" ON temas;
CREATE POLICY "Lectura pública de temas" ON temas FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura pública de ejemplares" ON ejemplares;
CREATE POLICY "Lectura pública de ejemplares" ON ejemplares FOR SELECT USING (true);
