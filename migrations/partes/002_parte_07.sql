-- Parte 7 de 7 (4 libros)
DO $$
DECLARE v_lid UUID;
BEGIN

  -- [2401] ISBN: CIU-02401
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02401' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02401-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2402] ISBN: CIU-02402
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02402' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02402-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2403] ISBN: CIU-02403
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02403' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02403-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2404] ISBN: CIU-02404
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02404' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02404-E01', 'Sin asignar', 'disponible');
  END IF;


END $$;
