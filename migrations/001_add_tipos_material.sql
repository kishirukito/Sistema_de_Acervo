-- ============================================================
-- Migración: Crear tabla tipos_material y FK en libros
-- Ejecutar en: Supabase → SQL Editor
-- ============================================================

-- 1. Tabla normalizada de tipos de material
CREATE TABLE IF NOT EXISTS public.tipos_material (
    id          SERIAL PRIMARY KEY,
    nombre      TEXT NOT NULL UNIQUE,
    descripcion TEXT
);

-- 2. Tipos base del acervo CIU
INSERT INTO public.tipos_material (nombre, descripcion) VALUES
  ('Libro',    'Material bibliográfico general: libros, manuales y textos'),
  ('Tesis',    'Trabajos de titulación y proyectos (PYMES, ITM, ITA, etc.)'),
  ('Donación', 'Material bibliográfico ingresado por donación externa')
ON CONFLICT (nombre) DO NOTHING;

-- 3. Agregar FK en la tabla libros (nullable para no romper registros existentes)
ALTER TABLE public.libros
  ADD COLUMN IF NOT EXISTS tipo_material_id INTEGER
  REFERENCES public.tipos_material(id)
  ON DELETE SET NULL;

-- 4. Habilitar RLS (misma política que el resto de tablas)
ALTER TABLE public.tipos_material ENABLE ROW LEVEL SECURITY;

-- Policy: lectura pública (cualquier autenticado puede leer los tipos)
CREATE POLICY "tipos_material_select" ON public.tipos_material
  FOR SELECT USING (true);

-- Policy: solo admins pueden insertar/modificar
CREATE POLICY "tipos_material_admin_write" ON public.tipos_material
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- Verificar resultado:
-- SELECT * FROM tipos_material;
-- SELECT column_name, data_type FROM information_schema.columns
--   WHERE table_name = 'libros' AND column_name = 'tipo_material_id';
-- ============================================================
