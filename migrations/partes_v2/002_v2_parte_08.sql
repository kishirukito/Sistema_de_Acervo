-- =============================================================
-- Migracion 002 v2 - Parte 8 de 8
-- INSERT eficiente: un solo statement con VALUES masivo
-- Instrucciones:
--   1. Pegar en Supabase SQL Editor
--   2. Dar click en Run
--   3. Esperar confirmacion, luego ejecutar la siguiente parte
-- =============================================================

-- Deshabilitar timeout para esta sesion
SET statement_timeout = '0';

-- Insertar solo ejemplares de libros que AUN no tienen ninguno
INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado)
SELECT l.id, v.codigo, v.ubicacion, 'disponible'
FROM (VALUES
  ('CIU-02349', 'CIU-02349-E01', 'Sin asignar'),
  ('CIU-02350', 'CIU-02350-E01', 'Sin asignar'),
  ('CIU-02351', 'CIU-02351-E01', 'Sin asignar'),
  ('CIU-02352', 'CIU-02352-E01', 'Sin asignar'),
  ('CIU-02353', 'CIU-02353-E01', 'Sin asignar'),
  ('CIU-02354', 'CIU-02354-E01', 'Sin asignar'),
  ('CIU-02355', 'CIU-02355-E01', 'Sin asignar'),
  ('CIU-02356', 'CIU-02356-E01', 'Sin asignar'),
  ('CIU-02357', 'CIU-02357-E01', 'Sin asignar'),
  ('CIU-02358', 'CIU-02358-E01', 'Sin asignar'),
  ('CIU-02359', 'CIU-02359-E01', 'Sin asignar'),
  ('CIU-02360', 'CIU-02360-E01', 'Sin asignar'),
  ('CIU-02361', 'CIU-02361-E01', 'Sin asignar'),
  ('CIU-02362', 'CIU-02362-E01', 'Sin asignar'),
  ('CIU-02363', 'CIU-02363-E01', 'Sin asignar'),
  ('CIU-02364', 'CIU-02364-E01', 'Sin asignar'),
  ('CIU-02365', 'CIU-02365-E01', 'Sin asignar'),
  ('CIU-02366', 'CIU-02366-E01', 'Sin asignar'),
  ('CIU-02366', 'CIU-02366-E02', 'Sin asignar'),
  ('CIU-02367', 'CIU-02367-E01', 'Sin asignar'),
  ('CIU-02368', 'CIU-02368-E01', 'Sin asignar'),
  ('CIU-02368', 'CIU-02368-E02', 'Sin asignar'),
  ('CIU-02369', 'CIU-02369-E01', 'Sin asignar'),
  ('CIU-02370', 'CIU-02370-E01', 'Sin asignar'),
  ('CIU-02371', 'CIU-02371-E01', 'Sin asignar'),
  ('CIU-02372', 'CIU-02372-E01', 'Sin asignar'),
  ('CIU-02373', 'CIU-02373-E01', 'Sin asignar'),
  ('CIU-02374', 'CIU-02374-E01', 'Sin asignar'),
  ('CIU-02375', 'CIU-02375-E01', 'Sin asignar'),
  ('CIU-02376', 'CIU-02376-E01', 'Sin asignar'),
  ('CIU-02377', 'CIU-02377-E01', 'Sin asignar'),
  ('CIU-02378', 'CIU-02378-E01', 'Sin asignar'),
  ('CIU-02379', 'CIU-02379-E01', 'Sin asignar'),
  ('CIU-02380', 'CIU-02380-E01', 'Sin asignar'),
  ('CIU-02381', 'CIU-02381-E01', 'Sin asignar'),
  ('CIU-02382', 'CIU-02382-E01', 'Sin asignar'),
  ('CIU-02382', 'CIU-02382-E02', 'Sin asignar'),
  ('CIU-02383', 'CIU-02383-E01', 'Sin asignar'),
  ('CIU-02384', 'CIU-02384-E01', 'Sin asignar'),
  ('CIU-02384', 'CIU-02384-E02', 'Sin asignar'),
  ('CIU-02385', 'CIU-02385-E01', 'Sin asignar'),
  ('CIU-02386', 'CIU-02386-E01', 'Sin asignar'),
  ('CIU-02387', 'CIU-02387-E01', 'Sin asignar'),
  ('CIU-02388', 'CIU-02388-E01', 'Sin asignar'),
  ('CIU-02389', 'CIU-02389-E01', 'Sin asignar'),
  ('CIU-02390', 'CIU-02390-E01', 'Sin asignar'),
  ('CIU-02391', 'CIU-02391-E01', 'Sin asignar'),
  ('CIU-02392', 'CIU-02392-E01', 'Sin asignar'),
  ('CIU-02393', 'CIU-02393-E01', 'Sin asignar'),
  ('CIU-02394', 'CIU-02394-E01', 'Sin asignar'),
  ('CIU-02395', 'CIU-02395-E01', 'Sin asignar'),
  ('CIU-02396', 'CIU-02396-E01', 'Sin asignar'),
  ('CIU-02397', 'CIU-02397-E01', 'Sin asignar'),
  ('CIU-02398', 'CIU-02398-E01', 'Sin asignar'),
  ('CIU-02399', 'CIU-02399-E01', 'Sin asignar'),
  ('CIU-02400', 'CIU-02400-E01', 'Sin asignar'),
  ('CIU-02401', 'CIU-02401-E01', 'Sin asignar'),
  ('CIU-02402', 'CIU-02402-E01', 'Sin asignar'),
  ('CIU-02403', 'CIU-02403-E01', 'Sin asignar'),
  ('CIU-02404', 'CIU-02404-E01', 'Sin asignar')
) AS v(isbn, codigo, ubicacion)
JOIN libros l ON l.isbn = v.isbn
WHERE NOT EXISTS (
  SELECT 1 FROM ejemplares e WHERE e.libro_id = l.id
)
ON CONFLICT (codigo_inventario) DO NOTHING;
