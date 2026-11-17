-- =============================================================================
-- Migración: 20261117_categorias_dewey.sql
-- Descripción: Extiende la tabla `temas` para soportar gestión de categorías
--              bibliográficas (Dewey) y temas específicos del acervo.
-- =============================================================================
-- ROLLBACK (para revertir):
--   ALTER TABLE temas DROP COLUMN IF EXISTS activa;
--   ALTER TABLE temas DROP COLUMN IF EXISTS codigo;
--   ALTER TABLE temas DROP COLUMN IF EXISTS tipo;
-- NOTA: El rollback elimina los campos pero NO borra los registros insertados
--       de categorías Dewey — para borrarlos usa:
--   DELETE FROM temas WHERE tipo = 'categoria';
-- =============================================================================

-- 1. Añadir columna `codigo` (VARCHAR preserva ceros iniciales como "000", "100")
ALTER TABLE temas
  ADD COLUMN IF NOT EXISTS codigo VARCHAR(20);

-- 2. Añadir columna `activa` (distingue categorías/temas activos de desactivados)
ALTER TABLE temas
  ADD COLUMN IF NOT EXISTS activa BOOLEAN NOT NULL DEFAULT true;

-- 3. Añadir columna `tipo` (distingue categorías Dewey de temas específicos)
--    CHECK garantiza que solo se inserten valores válidos.
ALTER TABLE temas
  ADD COLUMN IF NOT EXISTS tipo VARCHAR(20) NOT NULL DEFAULT 'tema'
    CHECK (tipo IN ('categoria', 'tema'));

-- 3.1 Normalizar registros Dewey que se hayan insertado previamente con el formato "XXX — Nombre"
--     Extrae el código al campo `codigo`, limpia el `nombre` y asigna `tipo = 'categoria'`
UPDATE temas
SET
  codigo = substring(nombre from '^([0-9]{3})\s*[-—]'),
  nombre = trim(substring(nombre from '^[0-9]{3}\s*[-—]\s*(.*)$')),
  tipo = 'categoria',
  activa = true
WHERE nombre ~ '^[0-9]{3}\s*[-—]';

-- 4. Insertar las 10 categorías Dewey principales.
--    ON CONFLICT (nombre) DO UPDATE: idempotente — si ya existe el registro
--    por nombre, actualiza codigo/tipo/activa sin crear duplicados.
INSERT INTO temas (nombre, descripcion, codigo, tipo, activa) VALUES
  (
    'Ciencias de las Computadoras, Información y Obras Generales',
    'Comprende informática, bibliotecología, obras de referencia general y periodismo.',
    '000', 'categoria', true
  ),
  (
    'Filosofía y Psicología',
    'Comprende filosofía, lógica, parapsicología, psicología y ética.',
    '100', 'categoria', true
  ),
  (
    'Religión',
    'Comprende religión comparada, Biblia, teología cristiana y otras religiones.',
    '200', 'categoria', true
  ),
  (
    'Ciencias Sociales',
    'Comprende estadística, ciencias políticas, economía, derecho, educación y comercio.',
    '300', 'categoria', true
  ),
  (
    'Lenguas',
    'Comprende lingüística, idiomas específicos y libros de texto de idiomas.',
    '400', 'categoria', true
  ),
  (
    'Ciencias',
    'Comprende matemáticas, astronomía, física, química, geología y biología.',
    '500', 'categoria', true
  ),
  (
    'Tecnología',
    'Comprende medicina, ingeniería, agricultura, economía doméstica y administración.',
    '600', 'categoria', true
  ),
  (
    'Artes y Recreación',
    'Comprende artes plásticas, fotografía, música, deportes y juegos.',
    '700', 'categoria', true
  ),
  (
    'Literatura',
    'Comprende retórica, prosa, poesía, drama y escritura en idiomas específicos.',
    '800', 'categoria', true
  ),
  (
    'Historia y Geografía',
    'Comprende geografía, biografía, historia general e historia por continentes.',
    '900', 'categoria', true
  )
ON CONFLICT (nombre) DO UPDATE SET
  codigo  = EXCLUDED.codigo,
  tipo    = EXCLUDED.tipo,
  activa  = EXCLUDED.activa;

-- =============================================================================
-- 5. RLS — Nota de seguridad
-- =============================================================================
-- El backend utiliza la Service Role Key de Supabase, la cual BYPASSA RLS
-- automáticamente. Por lo tanto NO se requiere una política adicional de
-- escritura para las operaciones admin (INSERT/UPDATE/DELETE) en temas.
--
-- La política de LECTURA pública existente en temas permanece sin cambios:
--   los lectores (y el catálogo público) siguen pudiendo leer temas sin
--   autenticación, ya que la lectura la hace el frontend vía RLS anon.
--
-- Si en el futuro el backend dejara de usar service_role y pasara a usar
-- JWT de usuario, se necesitaría una política así:
--
--   DROP POLICY IF EXISTS "admin_write_temas" ON temas;
--   CREATE POLICY "admin_write_temas" ON temas
--     FOR ALL
--     USING (
--       EXISTS (
--         SELECT 1 FROM usuarios
--         WHERE usuarios.id = auth.uid()
--           AND usuarios.rol IN ('admin', 'personal')
--           AND usuarios.estado = 'activo'
--       )
--     )
--     WITH CHECK (
--       EXISTS (
--         SELECT 1 FROM usuarios
--         WHERE usuarios.id = auth.uid()
--           AND usuarios.rol IN ('admin', 'personal')
--           AND usuarios.estado = 'activo'
--       )
--     );
-- =============================================================================
