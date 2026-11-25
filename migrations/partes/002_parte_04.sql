-- Parte 4 de 7 (400 libros)
DO $$
DECLARE v_lid UUID;
BEGIN

  -- [1201] ISBN: CIU-01201
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01201' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01201-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1202] ISBN: CIU-01202
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01202' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01202-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01202-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01202-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1203] ISBN: CIU-01203
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01203' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01203-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01203-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01203-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01203-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01203-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01203-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01203-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01203-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01203-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01203-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01203-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01203-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01203-E13', 'Sin asignar', 'disponible');
  END IF;

  -- [1204] ISBN: CIU-01204
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01204' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01204-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01204-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01204-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1205] ISBN: CIU-01205
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01205' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01205-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01205-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01205-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1206] ISBN: CIU-01206
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01206' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01206-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01206-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01206-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1207] ISBN: CIU-01207
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01207' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01207-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01207-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01207-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1208] ISBN: CIU-01208
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01208' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01208-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01208-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01208-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1209] ISBN: CIU-01209
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01209' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01209-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01209-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01209-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01209-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01209-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01209-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01209-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01209-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01209-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01209-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1210] ISBN: CIU-01210
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01210' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01210-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01210-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01210-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1211] ISBN: CIU-01211
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01211' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01211-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01211-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01211-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1212] ISBN: CIU-01212
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01212' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01212-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01212-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01212-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1213] ISBN: CIU-01213
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01213' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01213-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01213-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01213-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1214] ISBN: CIU-01214
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01214' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01214-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01214-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1215] ISBN: CIU-01215
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01215' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01215-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01215-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01215-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1216] ISBN: CIU-01216
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01216' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01216-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01216-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01216-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01216-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01216-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01216-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01216-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01216-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1217] ISBN: CIU-01217
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01217' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01217-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01217-E22', 'Sin asignar', 'disponible');
  END IF;

  -- [1218] ISBN: CIU-01218
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01218' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01218-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01218-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01218-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01218-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1219] ISBN: CIU-01219
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01219' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01219-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01219-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01219-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01219-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01219-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01219-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01219-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01219-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01219-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01219-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01219-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01219-E12', 'Sin asignar', 'disponible');
  END IF;

  -- [1220] ISBN: CIU-01220
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01220' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01220-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01220-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1221] ISBN: CIU-01221
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01221' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01221-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01221-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01221-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01221-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01221-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01221-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01221-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01221-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01221-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01221-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01221-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01221-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01221-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01221-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01221-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01221-E16', 'Sin asignar', 'disponible');
  END IF;

  -- [1222] ISBN: CIU-01222
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01222' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01222-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01222-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1223] ISBN: CIU-01223
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01223' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01223-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01223-E22', 'Sin asignar', 'disponible');
  END IF;

  -- [1224] ISBN: CIU-01224
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01224' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01224-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01224-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01224-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1225] ISBN: CIU-01225
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01225' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01225-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1226] ISBN: CIU-01226
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01226' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01226-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01226-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01226-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01226-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1227] ISBN: CIU-01227
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01227' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01227-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01227-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1228] ISBN: CIU-01228
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01228' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01228-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01228-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01228-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01228-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01228-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01228-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01228-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01228-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1229] ISBN: CIU-01229
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01229' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01229-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01229-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01229-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01229-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1230] ISBN: CIU-01230
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01230' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01230-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01230-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01230-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01230-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01230-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01230-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01230-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01230-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01230-E09', 'Sin asignar', 'disponible');
  END IF;

  -- [1231] ISBN: CIU-01231
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01231' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01231-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01231-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01231-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01231-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1232] ISBN: CIU-01232
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01232' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01232-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01232-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01232-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01232-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01232-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01232-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [1233] ISBN: CIU-01233
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01233' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01233-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01233-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01233-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01233-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1234] ISBN: CIU-01234
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01234' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01234-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01234-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01234-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01234-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01234-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01234-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01234-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01234-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1235] ISBN: CIU-01235
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01235' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01235-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01235-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01235-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1236] ISBN: CIU-01236
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01236' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01236-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01236-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1237] ISBN: CIU-01237
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01237' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01237-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01237-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1238] ISBN: CIU-01238
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01238' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01238-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01238-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01238-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01238-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01238-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01238-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01238-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01238-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1239] ISBN: CIU-01239
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01239' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01239-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01239-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1240] ISBN: CIU-01240
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01240' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01240-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01240-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01240-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01240-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01240-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01240-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01240-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01240-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1241] ISBN: CIU-01241
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01241' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01241-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01241-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01241-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01241-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1242] ISBN: CIU-01242
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01242' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01242-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01242-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01242-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01242-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01242-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01242-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01242-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01242-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1243] ISBN: CIU-01243
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01243' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01243-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01243-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01243-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01243-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01243-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01243-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01243-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01243-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1244] ISBN: CIU-01244
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01244' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01244-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01244-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01244-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01244-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1245] ISBN: CIU-01245
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01245' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01245-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01245-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01245-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01245-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1246] ISBN: CIU-01246
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01246' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01246-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01246-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01246-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1247] ISBN: CIU-01247
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01247' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01247-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01247-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1248] ISBN: CIU-01248
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01248' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01248-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01248-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1249] ISBN: CIU-01249
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01249' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01249-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01249-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01249-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1250] ISBN: CIU-01250
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01250' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01250-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01250-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01250-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1251] ISBN: CIU-01251
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01251' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01251-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01251-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01251-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1252] ISBN: CIU-01252
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01252' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01252-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01252-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01252-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1253] ISBN: CIU-01253
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01253' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01253-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01253-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01253-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1254] ISBN: CIU-01254
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01254' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01254-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01254-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01254-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1255] ISBN: CIU-01255
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01255' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01255-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01255-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01255-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1256] ISBN: CIU-01256
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01256' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01256-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01256-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1257] ISBN: CIU-01257
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01257' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01257-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01257-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01257-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1258] ISBN: CIU-01258
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01258' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01258-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01258-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1259] ISBN: CIU-01259
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01259' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01259-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01259-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1260] ISBN: CIU-01260
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01260' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01260-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01260-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01260-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01260-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01260-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01260-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01260-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01260-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01260-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01260-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01260-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01260-E12', 'Sin asignar', 'disponible');
  END IF;

  -- [1261] ISBN: CIU-01261
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01261' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01261-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01261-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01261-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01261-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01261-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01261-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [1262] ISBN: CIU-01262
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01262' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01262-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01262-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1263] ISBN: CIU-01263
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01263' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01263-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01263-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01263-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1264] ISBN: CIU-01264
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01264' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01264-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01264-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01264-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01264-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01264-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01264-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01264-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01264-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01264-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01264-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01264-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01264-E12', 'Sin asignar', 'disponible');
  END IF;

  -- [1265] ISBN: CIU-01265
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01265' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01265-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01265-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01265-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1266] ISBN: CIU-01266
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01266' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01266-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01266-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01266-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1267] ISBN: CIU-01267
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01267' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01267-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01267-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01267-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01267-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1268] ISBN: CIU-01268
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01268' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01268-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01268-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01268-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1269] ISBN: CIU-01269
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01269' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01269-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01269-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1270] ISBN: CIU-01270
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01270' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01270-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01270-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01270-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01270-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1271] ISBN: CIU-01271
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01271' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01271-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01271-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01271-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1272] ISBN: CIU-01272
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01272' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01272-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01272-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1273] ISBN: CIU-01273
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01273' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01273-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1274] ISBN: CIU-01274
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01274' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01274-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01274-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01274-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01274-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01274-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01274-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01274-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01274-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01274-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01274-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01274-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01274-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01274-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01274-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01274-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01274-E16', 'Sin asignar', 'disponible');
  END IF;

  -- [1275] ISBN: CIU-01275
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01275' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01275-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01275-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01275-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01275-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01275-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01275-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01275-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01275-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1276] ISBN: CIU-01276
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01276' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01276-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01276-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01276-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01276-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1277] ISBN: CIU-01277
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01277' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01277-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01277-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1278] ISBN: CIU-01278
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01278' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01278-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01278-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1279] ISBN: CIU-01279
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01279' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01279-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01279-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01279-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01279-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01279-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1280] ISBN: CIU-01280
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01280' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01280-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01280-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1281] ISBN: CIU-01281
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01281' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01281-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1282] ISBN: CIU-01282
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01282' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01282-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1283] ISBN: CIU-01283
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01283' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01283-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01283-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01283-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1284] ISBN: CIU-01284
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01284' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01284-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1285] ISBN: CIU-01285
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01285' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01285-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1286] ISBN: CIU-01286
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01286' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01286-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1287] ISBN: CIU-01287
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01287' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01287-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1288] ISBN: CIU-01288
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01288' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01288-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1289] ISBN: CIU-01289
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01289' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01289-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1290] ISBN: CIU-01290
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01290' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01290-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1291] ISBN: CIU-01291
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01291' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01291-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1292] ISBN: CIU-01292
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01292' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01292-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01292-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1293] ISBN: CIU-01293
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01293' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01293-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1294] ISBN: CIU-01294
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01294' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01294-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1295] ISBN: CIU-01295
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01295' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01295-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01295-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1296] ISBN: CIU-01296
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01296' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01296-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1297] ISBN: CIU-01297
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01297' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01297-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1298] ISBN: CIU-01298
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01298' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01298-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1299] ISBN: CIU-01299
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01299' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01299-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1300] ISBN: CIU-01300
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01300' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01300-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1301] ISBN: CIU-01301
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01301' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01301-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1302] ISBN: CIU-01302
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01302' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01302-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01302-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01302-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1303] ISBN: CIU-01303
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01303' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01303-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1304] ISBN: CIU-01304
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01304' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01304-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1305] ISBN: CIU-01305
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01305' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01305-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1306] ISBN: CIU-01306
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01306' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01306-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01306-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1307] ISBN: CIU-01307
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01307' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01307-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1308] ISBN: CIU-01308
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01308' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01308-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1309] ISBN: CIU-01309
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01309' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01309-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1310] ISBN: CIU-01310
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01310' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01310-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1311] ISBN: CIU-01311
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01311' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01311-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1312] ISBN: CIU-01312
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01312' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01312-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1313] ISBN: CIU-01313
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01313' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01313-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1314] ISBN: CIU-01314
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01314' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01314-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01314-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01314-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1315] ISBN: CIU-01315
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01315' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01315-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01315-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01315-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1316] ISBN: CIU-01316
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01316' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01316-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01316-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01316-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1317] ISBN: CIU-01317
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01317' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01317-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01317-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01317-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1318] ISBN: CIU-01318
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01318' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01318-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1319] ISBN: CIU-01319
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01319' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01319-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1320] ISBN: CIU-01320
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01320' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01320-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1321] ISBN: CIU-01321
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01321' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01321-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01321-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01321-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1322] ISBN: CIU-01322
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01322' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01322-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1323] ISBN: CIU-01323
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01323' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01323-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01323-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1324] ISBN: CIU-01324
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01324' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01324-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01324-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1325] ISBN: CIU-01325
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01325' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01325-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1326] ISBN: CIU-01326
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01326' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01326-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1327] ISBN: CIU-01327
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01327' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01327-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1328] ISBN: CIU-01328
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01328' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01328-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01328-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1329] ISBN: CIU-01329
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01329' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01329-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1330] ISBN: CIU-01330
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01330' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01330-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1331] ISBN: CIU-01331
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01331' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01331-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1332] ISBN: CIU-01332
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01332' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01332-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01332-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1333] ISBN: CIU-01333
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01333' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01333-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01333-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01333-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1334] ISBN: CIU-01334
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01334' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01334-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01334-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01334-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1335] ISBN: CIU-01335
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01335' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01335-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01335-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1336] ISBN: CIU-01336
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01336' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01336-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01336-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01336-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1337] ISBN: CIU-01337
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01337' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01337-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E22', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01337-E23', 'Sin asignar', 'disponible');
  END IF;

  -- [1338] ISBN: CIU-01338
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01338' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01338-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01338-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01338-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1339] ISBN: CIU-01339
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01339' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01339-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01339-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01339-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1340] ISBN: CIU-01340
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01340' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01340-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01340-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01340-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01340-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1341] ISBN: CIU-01341
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01341' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01341-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01341-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01341-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01341-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1342] ISBN: CIU-01342
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01342' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01342-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01342-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1343] ISBN: CIU-01343
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01343' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01343-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01343-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1344] ISBN: CIU-01344
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01344' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01344-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01344-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1345] ISBN: CIU-01345
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01345' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01345-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01345-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01345-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01345-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1346] ISBN: CIU-01346
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01346' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01346-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01346-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1347] ISBN: CIU-01347
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01347' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01347-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01347-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01347-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01347-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01347-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01347-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01347-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01347-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01347-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01347-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01347-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01347-E12', 'Sin asignar', 'disponible');
  END IF;

  -- [1348] ISBN: CIU-01348
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01348' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01348-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01348-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1349] ISBN: CIU-01349
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01349' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01349-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01349-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1350] ISBN: CIU-01350
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01350' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01350-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01350-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1351] ISBN: CIU-01351
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01351' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01351-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01351-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1352] ISBN: CIU-01352
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01352' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01352-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01352-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01352-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01352-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01352-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01352-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01352-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01352-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01352-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01352-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1353] ISBN: CIU-01353
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01353' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01353-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01353-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01353-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01353-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01353-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01353-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01353-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01353-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01353-E09', 'Sin asignar', 'disponible');
  END IF;

  -- [1354] ISBN: CIU-01354
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01354' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01354-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01354-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01354-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01354-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01354-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01354-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01354-E07', 'Sin asignar', 'disponible');
  END IF;

  -- [1355] ISBN: CIU-01355
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01355' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01355-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01355-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01355-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01355-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01355-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01355-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01355-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01355-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1356] ISBN: CIU-01356
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01356' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01356-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01356-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01356-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01356-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01356-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01356-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01356-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01356-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01356-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01356-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01356-E11', 'Sin asignar', 'disponible');
  END IF;

  -- [1357] ISBN: CIU-01357
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01357' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01357-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01357-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01357-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01357-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01357-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01357-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01357-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01357-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01357-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01357-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1358] ISBN: CIU-01358
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01358' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01358-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01358-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01358-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01358-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01358-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01358-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01358-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01358-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01358-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01358-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01358-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01358-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01358-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01358-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01358-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01358-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01358-E17', 'Sin asignar', 'disponible');
  END IF;

  -- [1359] ISBN: CIU-01359
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01359' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01359-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E22', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E23', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E24', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E25', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E26', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E27', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E28', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E29', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01359-E30', 'Sin asignar', 'disponible');
  END IF;

  -- [1360] ISBN: CIU-01360
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01360' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01360-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01360-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01360-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01360-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1361] ISBN: CIU-01361
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01361' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01361-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01361-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01361-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01361-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01361-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01361-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01361-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01361-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1362] ISBN: CIU-01362
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01362' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01362-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01362-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01362-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01362-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1363] ISBN: CIU-01363
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01363' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01363-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01363-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01363-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01363-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1364] ISBN: CIU-01364
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01364' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01364-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1365] ISBN: CIU-01365
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01365' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01365-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01365-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01365-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01365-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1366] ISBN: CIU-01366
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01366' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01366-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01366-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01366-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1367] ISBN: CIU-01367
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01367' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01367-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01367-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01367-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1368] ISBN: CIU-01368
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01368' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01368-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01368-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01368-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1369] ISBN: CIU-01369
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01369' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01369-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1370] ISBN: CIU-01370
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01370' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01370-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01370-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1371] ISBN: CIU-01371
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01371' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01371-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01371-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01371-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1372] ISBN: CIU-01372
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01372' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01372-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01372-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1373] ISBN: CIU-01373
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01373' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01373-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01373-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01373-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01373-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01373-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01373-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [1374] ISBN: CIU-01374
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01374' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01374-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01374-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01374-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1375] ISBN: CIU-01375
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01375' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01375-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01375-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1376] ISBN: CIU-01376
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01376' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01376-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01376-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1377] ISBN: CIU-01377
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01377' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01377-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01377-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1378] ISBN: CIU-01378
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01378' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01378-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01378-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1379] ISBN: CIU-01379
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01379' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01379-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01379-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01379-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01379-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01379-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01379-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01379-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01379-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01379-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01379-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01379-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01379-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01379-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01379-E14', 'Sin asignar', 'disponible');
  END IF;

  -- [1380] ISBN: CIU-01380
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01380' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01380-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01380-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01380-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01380-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01380-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01380-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01380-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01380-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1381] ISBN: CIU-01381
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01381' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01381-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01381-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01381-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01381-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01381-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01381-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01381-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01381-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1382] ISBN: CIU-01382
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01382' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01382-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01382-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01382-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01382-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1383] ISBN: CIU-01383
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01383' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01383-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01383-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1384] ISBN: CIU-01384
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01384' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01384-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01384-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1385] ISBN: CIU-01385
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01385' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01385-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01385-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01385-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01385-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1386] ISBN: CIU-01386
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01386' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01386-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01386-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01386-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01386-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01386-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1387] ISBN: CIU-01387
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01387' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01387-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01387-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01387-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01387-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01387-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1388] ISBN: CIU-01388
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01388' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01388-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01388-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1389] ISBN: CIU-01389
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01389' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01389-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01389-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01389-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1390] ISBN: CIU-01390
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01390' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01390-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01390-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01390-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1391] ISBN: CIU-01391
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01391' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01391-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01391-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01391-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01391-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01391-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01391-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01391-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01391-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01391-E09', 'Sin asignar', 'disponible');
  END IF;

  -- [1392] ISBN: CIU-01392
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01392' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01392-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01392-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01392-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01392-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01392-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01392-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01392-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01392-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01392-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01392-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1393] ISBN: CIU-01393
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01393' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01393-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01393-E19', 'Sin asignar', 'disponible');
  END IF;

  -- [1394] ISBN: CIU-01394
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01394' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01394-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01394-E19', 'Sin asignar', 'disponible');
  END IF;

  -- [1395] ISBN: CIU-01395
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01395' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01395-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01395-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01395-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1396] ISBN: CIU-01396
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01396' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01396-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01396-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01396-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1397] ISBN: CIU-01397
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01397' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01397-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01397-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01397-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01397-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01397-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01397-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01397-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01397-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01397-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01397-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01397-E11', 'Sin asignar', 'disponible');
  END IF;

  -- [1398] ISBN: CIU-01398
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01398' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01398-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01398-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01398-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01398-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01398-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01398-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [1399] ISBN: CIU-01399
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01399' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01399-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01399-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01399-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1400] ISBN: CIU-01400
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01400' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01400-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01400-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01400-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1401] ISBN: CIU-01401
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01401' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01401-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01401-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01401-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01401-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1402] ISBN: CIU-01402
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01402' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01402-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1403] ISBN: CIU-01403
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01403' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01403-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1404] ISBN: CIU-01404
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01404' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01404-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1405] ISBN: CIU-01405
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01405' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01405-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1406] ISBN: CIU-01406
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01406' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01406-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01406-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01406-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01406-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1407] ISBN: CIU-01407
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01407' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01407-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1408] ISBN: CIU-01408
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01408' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01408-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1409] ISBN: CIU-01409
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01409' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01409-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1410] ISBN: CIU-01410
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01410' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01410-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1411] ISBN: CIU-01411
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01411' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01411-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01411-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1412] ISBN: CIU-01412
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01412' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01412-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01412-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01412-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1413] ISBN: CIU-01413
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01413' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01413-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01413-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1414] ISBN: CIU-01414
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01414' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01414-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01414-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01414-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01414-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1415] ISBN: CIU-01415
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01415' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01415-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1416] ISBN: CIU-01416
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01416' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01416-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1417] ISBN: CIU-01417
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01417' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01417-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1418] ISBN: CIU-01418
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01418' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01418-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1419] ISBN: CIU-01419
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01419' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01419-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01419-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01419-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01419-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01419-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01419-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [1420] ISBN: CIU-01420
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01420' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01420-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1421] ISBN: CIU-01421
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01421' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01421-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01421-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01421-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1422] ISBN: CIU-01422
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01422' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01422-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1423] ISBN: CIU-01423
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01423' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01423-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01423-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1424] ISBN: CIU-01424
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01424' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01424-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1425] ISBN: CIU-01425
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01425' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01425-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1426] ISBN: CIU-01426
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01426' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01426-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1427] ISBN: CIU-01427
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01427' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01427-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1428] ISBN: CIU-01428
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01428' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01428-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1429] ISBN: CIU-01429
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01429' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01429-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1430] ISBN: CIU-01430
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01430' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01430-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1431] ISBN: CIU-01431
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01431' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01431-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1432] ISBN: CIU-01432
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01432' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01432-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1433] ISBN: CIU-01433
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01433' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01433-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1434] ISBN: CIU-01434
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01434' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01434-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1435] ISBN: CIU-01435
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01435' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01435-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1436] ISBN: CIU-01436
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01436' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01436-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1437] ISBN: CIU-01437
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01437' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01437-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1438] ISBN: CIU-01438
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01438' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01438-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1439] ISBN: CIU-01439
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01439' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01439-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01439-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1440] ISBN: CIU-01440
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01440' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01440-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1441] ISBN: CIU-01441
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01441' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01441-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01441-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01441-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01441-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1442] ISBN: CIU-01442
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01442' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01442-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1443] ISBN: CIU-01443
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01443' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01443-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1444] ISBN: CIU-01444
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01444' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01444-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1445] ISBN: CIU-01445
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01445' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01445-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1446] ISBN: CIU-01446
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01446' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01446-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1447] ISBN: CIU-01447
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01447' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01447-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1448] ISBN: CIU-01448
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01448' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01448-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1449] ISBN: CIU-01449
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01449' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01449-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1450] ISBN: CIU-01450
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01450' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01450-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1451] ISBN: CIU-01451
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01451' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01451-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1452] ISBN: CIU-01452
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01452' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01452-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01452-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01452-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01452-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1453] ISBN: CIU-01453
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01453' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01453-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01453-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01453-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1454] ISBN: CIU-01454
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01454' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01454-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1455] ISBN: CIU-01455
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01455' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01455-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1456] ISBN: CIU-01456
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01456' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01456-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1457] ISBN: CIU-01457
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01457' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01457-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1458] ISBN: CIU-01458
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01458' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01458-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1459] ISBN: CIU-01459
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01459' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01459-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1460] ISBN: CIU-01460
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01460' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01460-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1461] ISBN: CIU-01461
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01461' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01461-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1462] ISBN: CIU-01462
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01462' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01462-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1463] ISBN: CIU-01463
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01463' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01463-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1464] ISBN: CIU-01464
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01464' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01464-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1465] ISBN: CIU-01465
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01465' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01465-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1466] ISBN: CIU-01466
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01466' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01466-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1467] ISBN: CIU-01467
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01467' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01467-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1468] ISBN: CIU-01468
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01468' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01468-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1469] ISBN: CIU-01469
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01469' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01469-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1470] ISBN: CIU-01470
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01470' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01470-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1471] ISBN: CIU-01471
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01471' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01471-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1472] ISBN: CIU-01472
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01472' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01472-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1473] ISBN: CIU-01473
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01473' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01473-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1474] ISBN: CIU-01474
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01474' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01474-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1475] ISBN: CIU-01475
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01475' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01475-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1476] ISBN: CIU-01476
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01476' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01476-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01476-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1477] ISBN: CIU-01477
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01477' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01477-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01477-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1478] ISBN: CIU-01478
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01478' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01478-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01478-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1479] ISBN: CIU-01479
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01479' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01479-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01479-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1480] ISBN: CIU-01480
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01480' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01480-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01480-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1481] ISBN: CIU-01481
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01481' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01481-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01481-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1482] ISBN: CIU-01482
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01482' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01482-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01482-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1483] ISBN: CIU-01483
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01483' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01483-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01483-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1484] ISBN: CIU-01484
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01484' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01484-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1485] ISBN: CIU-01485
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01485' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01485-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1486] ISBN: CIU-01486
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01486' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01486-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1487] ISBN: CIU-01487
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01487' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01487-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01487-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1488] ISBN: CIU-01488
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01488' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01488-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1489] ISBN: CIU-01489
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01489' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01489-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1490] ISBN: CIU-01490
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01490' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01490-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01490-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1491] ISBN: CIU-01491
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01491' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01491-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01491-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1492] ISBN: CIU-01492
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01492' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01492-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01492-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01492-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01492-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1493] ISBN: CIU-01493
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01493' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01493-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1494] ISBN: CIU-01494
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01494' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01494-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1495] ISBN: CIU-01495
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01495' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01495-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1496] ISBN: CIU-01496
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01496' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01496-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1497] ISBN: CIU-01497
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01497' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01497-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01497-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1498] ISBN: CIU-01498
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01498' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01498-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1499] ISBN: CIU-01499
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01499' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01499-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01499-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01499-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1500] ISBN: CIU-01500
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01500' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01500-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01500-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01500-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01500-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01500-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01500-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01500-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01500-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01500-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01500-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1501] ISBN: CIU-01501
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01501' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01501-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01501-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1502] ISBN: CIU-01502
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01502' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01502-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01502-E19', 'Sin asignar', 'disponible');
  END IF;

  -- [1503] ISBN: CIU-01503
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01503' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01503-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01503-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01503-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01503-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1504] ISBN: CIU-01504
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01504' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01504-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01504-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01504-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1505] ISBN: CIU-01505
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01505' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01505-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01505-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01505-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01505-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1506] ISBN: CIU-01506
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01506' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01506-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01506-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01506-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01506-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1507] ISBN: CIU-01507
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01507' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01507-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01507-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01507-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01507-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01507-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01507-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01507-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01507-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01507-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01507-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1508] ISBN: CIU-01508
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01508' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01508-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01508-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01508-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01508-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1509] ISBN: CIU-01509
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01509' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01509-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01509-E22', 'Sin asignar', 'disponible');
  END IF;

  -- [1510] ISBN: CIU-01510
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01510' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01510-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01510-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01510-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01510-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01510-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01510-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01510-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01510-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01510-E09', 'Sin asignar', 'disponible');
  END IF;

  -- [1511] ISBN: CIU-01511
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01511' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01511-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01511-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1512] ISBN: CIU-01512
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01512' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01512-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01512-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01512-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01512-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01512-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01512-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01512-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01512-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1513] ISBN: CIU-01513
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01513' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01513-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01513-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01513-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01513-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01513-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01513-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01513-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01513-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1514] ISBN: CIU-01514
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01514' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01514-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01514-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01514-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01514-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01514-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01514-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01514-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01514-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01514-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01514-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1515] ISBN: CIU-01515
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01515' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01515-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E22', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E23', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E24', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E25', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E26', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E27', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01515-E28', 'Sin asignar', 'disponible');
  END IF;

  -- [1516] ISBN: CIU-01516
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01516' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01516-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01516-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1517] ISBN: CIU-01517
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01517' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01517-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E22', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E23', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E24', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E25', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E26', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E27', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E28', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E29', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E30', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E31', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E32', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E33', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E34', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E35', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E36', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E37', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E38', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E39', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01517-E40', 'Sin asignar', 'disponible');
  END IF;

  -- [1518] ISBN: CIU-01518
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01518' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01518-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01518-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1519] ISBN: CIU-01519
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01519' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01519-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01519-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01519-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01519-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01519-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01519-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01519-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01519-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01519-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01519-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1520] ISBN: CIU-01520
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01520' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01520-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01520-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01520-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01520-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01520-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01520-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01520-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01520-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01520-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01520-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1521] ISBN: CIU-01521
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01521' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01521-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01521-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01521-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01521-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1522] ISBN: CIU-01522
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01522' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01522-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01522-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1523] ISBN: CIU-01523
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01523' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01523-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01523-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1524] ISBN: CIU-01524
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01524' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01524-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01524-E19', 'Sin asignar', 'disponible');
  END IF;

  -- [1525] ISBN: CIU-01525
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01525' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01525-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01525-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1526] ISBN: CIU-01526
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01526' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01526-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01526-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01526-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01526-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01526-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01526-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01526-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01526-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1527] ISBN: CIU-01527
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01527' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01527-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01527-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01527-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01527-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01527-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01527-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01527-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01527-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01527-E09', 'Sin asignar', 'disponible');
  END IF;

  -- [1528] ISBN: CIU-01528
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01528' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01528-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01528-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01528-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01528-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01528-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01528-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01528-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01528-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01528-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01528-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1529] ISBN: CIU-01529
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01529' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01529-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01529-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1530] ISBN: CIU-01530
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01530' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01530-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01530-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01530-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01530-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01530-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01530-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01530-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01530-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01530-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01530-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1531] ISBN: CIU-01531
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01531' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01531-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01531-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01531-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01531-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01531-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01531-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01531-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01531-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1532] ISBN: CIU-01532
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01532' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01532-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01532-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01532-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01532-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1533] ISBN: CIU-01533
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01533' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01533-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01533-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01533-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01533-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01533-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01533-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01533-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01533-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01533-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01533-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1534] ISBN: CIU-01534
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01534' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01534-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01534-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01534-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01534-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01534-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01534-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01534-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01534-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1535] ISBN: CIU-01535
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01535' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01535-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01535-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01535-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01535-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01535-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01535-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01535-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01535-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01535-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01535-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01535-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01535-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01535-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01535-E14', 'Sin asignar', 'disponible');
  END IF;

  -- [1536] ISBN: CIU-01536
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01536' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01536-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01536-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01536-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01536-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1537] ISBN: CIU-01537
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01537' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01537-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01537-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01537-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01537-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1538] ISBN: CIU-01538
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01538' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01538-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01538-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01538-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01538-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01538-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1539] ISBN: CIU-01539
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01539' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01539-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01539-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01539-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01539-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01539-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1540] ISBN: CIU-01540
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01540' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01540-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01540-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1541] ISBN: CIU-01541
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01541' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01541-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01541-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1542] ISBN: CIU-01542
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01542' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01542-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01542-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01542-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01542-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01542-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1543] ISBN: CIU-01543
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01543' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01543-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01543-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1544] ISBN: CIU-01544
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01544' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01544-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1545] ISBN: CIU-01545
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01545' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01545-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01545-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1546] ISBN: CIU-01546
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01546' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01546-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1547] ISBN: CIU-01547
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01547' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01547-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01547-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01547-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01547-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1548] ISBN: CIU-01548
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01548' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01548-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01548-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01548-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1549] ISBN: CIU-01549
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01549' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01549-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01549-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01549-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01549-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01549-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01549-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01549-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01549-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1550] ISBN: CIU-01550
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01550' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01550-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01550-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01550-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01550-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1551] ISBN: CIU-01551
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01551' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01551-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01551-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01551-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01551-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01551-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01551-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [1552] ISBN: CIU-01552
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01552' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01552-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01552-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01552-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01552-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1553] ISBN: CIU-01553
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01553' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01553-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01553-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01553-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01553-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1554] ISBN: CIU-01554
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01554' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01554-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01554-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01554-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01554-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1555] ISBN: CIU-01555
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01555' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01555-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01555-E22', 'Sin asignar', 'disponible');
  END IF;

  -- [1556] ISBN: CIU-01556
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01556' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01556-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01556-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1557] ISBN: CIU-01557
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01557' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01557-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01557-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01557-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01557-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01557-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01557-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01557-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01557-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1558] ISBN: CIU-01558
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01558' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01558-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01558-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1559] ISBN: CIU-01559
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01559' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01559-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01559-E19', 'Sin asignar', 'disponible');
  END IF;

  -- [1560] ISBN: CIU-01560
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01560' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01560-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01560-E19', 'Sin asignar', 'disponible');
  END IF;

  -- [1561] ISBN: CIU-01561
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01561' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01561-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01561-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01561-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1562] ISBN: CIU-01562
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01562' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01562-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01562-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01562-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01562-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01562-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01562-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01562-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01562-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01562-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01562-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01562-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01562-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01562-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01562-E14', 'Sin asignar', 'disponible');
  END IF;

  -- [1563] ISBN: CIU-01563
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01563' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01563-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01563-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01563-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01563-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1564] ISBN: CIU-01564
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01564' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01564-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01564-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01564-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01564-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1565] ISBN: CIU-01565
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01565' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01565-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01565-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01565-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01565-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01565-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01565-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01565-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01565-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01565-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01565-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1566] ISBN: CIU-01566
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01566' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01566-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1567] ISBN: CIU-01567
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01567' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01567-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1568] ISBN: CIU-01568
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01568' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01568-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1569] ISBN: CIU-01569
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01569' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01569-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1570] ISBN: CIU-01570
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01570' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01570-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1571] ISBN: CIU-01571
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01571' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01571-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1572] ISBN: CIU-01572
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01572' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01572-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1573] ISBN: CIU-01573
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01573' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01573-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01573-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1574] ISBN: CIU-01574
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01574' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01574-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1575] ISBN: CIU-01575
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01575' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01575-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1576] ISBN: CIU-01576
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01576' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01576-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1577] ISBN: CIU-01577
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01577' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01577-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1578] ISBN: CIU-01578
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01578' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01578-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01578-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1579] ISBN: CIU-01579
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01579' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01579-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1580] ISBN: CIU-01580
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01580' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01580-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1581] ISBN: CIU-01581
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01581' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01581-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1582] ISBN: CIU-01582
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01582' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01582-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1583] ISBN: CIU-01583
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01583' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01583-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1584] ISBN: CIU-01584
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01584' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01584-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1585] ISBN: CIU-01585
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01585' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01585-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1586] ISBN: CIU-01586
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01586' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01586-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1587] ISBN: CIU-01587
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01587' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01587-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01587-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01587-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01587-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01587-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1588] ISBN: CIU-01588
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01588' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01588-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1589] ISBN: CIU-01589
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01589' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01589-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1590] ISBN: CIU-01590
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01590' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01590-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01590-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01590-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1591] ISBN: CIU-01591
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01591' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01591-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1592] ISBN: CIU-01592
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01592' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01592-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1593] ISBN: CIU-01593
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01593' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01593-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1594] ISBN: CIU-01594
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01594' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01594-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1595] ISBN: CIU-01595
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01595' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01595-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01595-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01595-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01595-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1596] ISBN: CIU-01596
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01596' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01596-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01596-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01596-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1597] ISBN: CIU-01597
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01597' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01597-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1598] ISBN: CIU-01598
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01598' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01598-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1599] ISBN: CIU-01599
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01599' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01599-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1600] ISBN: CIU-01600
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01600' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01600-E01', 'Sin asignar', 'disponible');
  END IF;


END $$;
