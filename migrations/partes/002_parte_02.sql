-- Parte 2 de 7 (400 libros)
DO $$
DECLARE v_lid UUID;
BEGIN

  -- [401] ISBN: CIU-00401
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00401' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00401-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [402] ISBN: CIU-00402
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00402' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00402-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [403] ISBN: CIU-00403
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00403' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00403-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00403-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [404] ISBN: CIU-00404
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00404' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00404-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00404-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00404-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [405] ISBN: CIU-00405
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00405' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00405-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [406] ISBN: CIU-00406
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00406' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00406-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [407] ISBN: CIU-00407
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00407' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00407-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [408] ISBN: CIU-00408
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00408' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00408-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00408-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [409] ISBN: CIU-00409
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00409' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00409-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [410] ISBN: CIU-00410
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00410' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00410-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [411] ISBN: CIU-00411
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00411' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00411-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [412] ISBN: CIU-00412
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00412' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00412-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [413] ISBN: CIU-00413
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00413' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00413-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [414] ISBN: CIU-00414
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00414' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00414-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [415] ISBN: CIU-00415
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00415' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00415-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [416] ISBN: CIU-00416
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00416' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00416-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00416-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [417] ISBN: CIU-00417
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00417' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00417-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [418] ISBN: CIU-00418
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00418' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00418-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [419] ISBN: CIU-00419
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00419' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00419-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [420] ISBN: CIU-00420
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00420' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00420-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [421] ISBN: CIU-00421
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00421' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00421-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [422] ISBN: CIU-00422
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00422' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00422-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [423] ISBN: CIU-00423
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00423' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00423-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [424] ISBN: CIU-00424
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00424' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00424-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00424-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [425] ISBN: CIU-00425
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00425' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00425-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00425-E22', 'Sin asignar', 'disponible');
  END IF;

  -- [426] ISBN: CIU-00426
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00426' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00426-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00426-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00426-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [427] ISBN: CIU-00427
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00427' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00427-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00427-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [428] ISBN: CIU-00428
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00428' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00428-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [429] ISBN: CIU-00429
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00429' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00429-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00429-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00429-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [430] ISBN: CIU-00430
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00430' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00430-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00430-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00430-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00430-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00430-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00430-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00430-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00430-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00430-E09', 'Sin asignar', 'disponible');
  END IF;

  -- [431] ISBN: CIU-00431
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00431' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00431-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [432] ISBN: CIU-00432
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00432' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00432-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [433] ISBN: CIU-00433
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00433' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00433-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00433-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00433-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [434] ISBN: CIU-00434
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00434' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00434-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [435] ISBN: CIU-00435
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00435' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00435-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [436] ISBN: CIU-00436
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00436' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00436-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00436-E21', 'Sin asignar', 'disponible');
  END IF;

  -- [437] ISBN: CIU-00437
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00437' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00437-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [438] ISBN: CIU-00438
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00438' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00438-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00438-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00438-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [439] ISBN: CIU-00439
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00439' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00439-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00439-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00439-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [440] ISBN: CIU-00440
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00440' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00440-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00440-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00440-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00440-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00440-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00440-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00440-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00440-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00440-E09', 'Sin asignar', 'disponible');
  END IF;

  -- [441] ISBN: CIU-00441
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00441' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00441-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [442] ISBN: CIU-00442
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00442' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00442-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00442-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00442-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [443] ISBN: CIU-00443
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00443' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00443-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [444] ISBN: CIU-00444
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00444' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00444-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00444-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00444-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [445] ISBN: CIU-00445
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00445' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00445-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00445-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00445-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [446] ISBN: CIU-00446
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00446' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00446-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00446-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00446-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [447] ISBN: CIU-00447
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00447' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00447-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00447-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00447-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [448] ISBN: CIU-00448
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00448' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00448-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00448-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00448-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [449] ISBN: CIU-00449
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00449' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00449-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00449-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00449-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [450] ISBN: CIU-00450
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00450' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00450-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00450-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00450-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [451] ISBN: CIU-00451
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00451' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00451-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00451-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00451-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [452] ISBN: CIU-00452
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00452' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00452-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00452-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00452-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [453] ISBN: CIU-00453
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00453' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00453-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00453-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00453-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [454] ISBN: CIU-00454
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00454' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00454-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00454-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00454-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [455] ISBN: CIU-00455
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00455' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00455-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [456] ISBN: CIU-00456
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00456' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00456-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [457] ISBN: CIU-00457
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00457' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00457-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00457-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [458] ISBN: CIU-00458
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00458' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00458-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00458-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [459] ISBN: CIU-00459
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00459' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00459-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [460] ISBN: CIU-00460
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00460' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00460-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [461] ISBN: CIU-00461
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00461' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00461-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00461-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00461-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [462] ISBN: CIU-00462
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00462' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00462-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00462-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00462-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [463] ISBN: CIU-00463
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00463' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00463-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00463-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [464] ISBN: CIU-00464
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00464' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00464-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E22', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E23', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E24', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E25', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E26', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00464-E27', 'Sin asignar', 'disponible');
  END IF;

  -- [465] ISBN: CIU-00465
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00465' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00465-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00465-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00465-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [466] ISBN: CIU-00466
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00466' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00466-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00466-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00466-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [467] ISBN: CIU-00467
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00467' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00467-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00467-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [468] ISBN: CIU-00468
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00468' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00468-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [469] ISBN: CIU-00469
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00469' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00469-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00469-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [470] ISBN: CIU-00470
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00470' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00470-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00470-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00470-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [471] ISBN: CIU-00471
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00471' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00471-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00471-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [472] ISBN: CIU-00472
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00472' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00472-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00472-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00472-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [473] ISBN: CIU-00473
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00473' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00473-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00473-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00473-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [474] ISBN: CIU-00474
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00474' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00474-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00474-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00474-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [475] ISBN: CIU-00475
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00475' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00475-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00475-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00475-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [476] ISBN: CIU-00476
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00476' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00476-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00476-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00476-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [477] ISBN: CIU-00477
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00477' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00477-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [478] ISBN: CIU-00478
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00478' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00478-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00478-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [479] ISBN: CIU-00479
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00479' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00479-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [480] ISBN: CIU-00480
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00480' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00480-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00480-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [481] ISBN: CIU-00481
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00481' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00481-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [482] ISBN: CIU-00482
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00482' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00482-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [483] ISBN: CIU-00483
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00483' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00483-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [484] ISBN: CIU-00484
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00484' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00484-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [485] ISBN: CIU-00485
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00485' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00485-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00485-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00485-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [486] ISBN: CIU-00486
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00486' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00486-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00486-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00486-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [487] ISBN: CIU-00487
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00487' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00487-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00487-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00487-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00487-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00487-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00487-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00487-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00487-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00487-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00487-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [488] ISBN: CIU-00488
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00488' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00488-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00488-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00488-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00488-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [489] ISBN: CIU-00489
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00489' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00489-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00489-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00489-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [490] ISBN: CIU-00490
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00490' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00490-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00490-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00490-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [491] ISBN: CIU-00491
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00491' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00491-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00491-E22', 'Sin asignar', 'disponible');
  END IF;

  -- [492] ISBN: CIU-00492
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00492' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00492-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00492-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00492-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00492-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00492-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00492-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00492-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00492-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [493] ISBN: CIU-00493
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00493' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00493-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00493-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [494] ISBN: CIU-00494
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00494' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00494-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00494-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00494-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [495] ISBN: CIU-00495
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00495' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00495-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [496] ISBN: CIU-00496
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00496' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00496-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [497] ISBN: CIU-00497
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00497' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00497-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00497-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [498] ISBN: CIU-00498
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00498' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00498-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00498-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00498-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [499] ISBN: CIU-00499
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00499' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00499-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00499-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00499-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [500] ISBN: CIU-00500
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00500' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00500-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00500-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00500-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [501] ISBN: CIU-00501
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00501' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00501-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00501-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00501-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00501-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00501-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00501-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00501-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00501-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00501-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00501-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [502] ISBN: CIU-00502
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00502' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00502-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00502-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00502-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00502-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [503] ISBN: CIU-00503
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00503' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00503-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00503-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00503-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [504] ISBN: CIU-00504
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00504' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00504-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00504-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00504-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [505] ISBN: CIU-00505
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00505' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00505-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00505-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00505-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [506] ISBN: CIU-00506
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00506' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00506-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00506-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00506-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [507] ISBN: CIU-00507
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00507' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00507-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00507-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00507-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [508] ISBN: CIU-00508
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00508' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00508-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00508-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00508-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [509] ISBN: CIU-00509
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00509' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00509-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00509-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [510] ISBN: CIU-00510
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00510' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00510-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00510-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [511] ISBN: CIU-00511
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00511' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00511-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00511-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00511-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [512] ISBN: CIU-00512
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00512' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00512-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00512-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00512-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [513] ISBN: CIU-00513
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00513' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00513-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00513-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00513-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [514] ISBN: CIU-00514
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00514' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00514-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00514-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00514-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [515] ISBN: CIU-00515
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00515' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00515-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00515-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [516] ISBN: CIU-00516
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00516' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00516-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [517] ISBN: CIU-00517
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00517' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00517-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [518] ISBN: CIU-00518
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00518' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00518-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [519] ISBN: CIU-00519
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00519' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00519-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00519-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [520] ISBN: CIU-00520
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00520' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00520-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00520-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [521] ISBN: CIU-00521
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00521' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00521-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [522] ISBN: CIU-00522
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00522' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00522-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [523] ISBN: CIU-00523
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00523' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00523-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [524] ISBN: CIU-00524
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00524' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00524-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [525] ISBN: CIU-00525
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00525' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00525-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00525-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00525-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [526] ISBN: CIU-00526
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00526' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00526-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00526-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00526-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [527] ISBN: CIU-00527
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00527' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00527-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00527-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00527-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00527-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00527-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [528] ISBN: CIU-00528
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00528' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00528-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00528-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00528-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00528-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00528-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00528-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00528-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00528-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [529] ISBN: CIU-00529
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00529' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00529-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00529-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00529-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00529-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00529-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00529-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00529-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00529-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [530] ISBN: CIU-00530
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00530' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00530-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00530-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00530-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [531] ISBN: CIU-00531
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00531' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00531-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00531-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00531-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [532] ISBN: CIU-00532
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00532' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00532-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00532-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [533] ISBN: CIU-00533
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00533' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00533-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00533-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [534] ISBN: CIU-00534
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00534' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00534-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00534-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00534-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [535] ISBN: CIU-00535
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00535' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00535-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00535-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00535-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [536] ISBN: CIU-00536
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00536' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00536-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00536-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00536-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [537] ISBN: CIU-00537
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00537' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00537-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00537-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00537-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [538] ISBN: CIU-00538
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00538' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00538-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [539] ISBN: CIU-00539
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00539' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00539-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00539-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00539-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [540] ISBN: CIU-00540
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00540' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00540-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00540-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [541] ISBN: CIU-00541
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00541' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00541-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [542] ISBN: CIU-00542
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00542' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00542-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [543] ISBN: CIU-00543
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00543' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00543-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [544] ISBN: CIU-00544
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00544' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00544-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00544-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00544-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00544-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [545] ISBN: CIU-00545
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00545' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00545-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00545-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [546] ISBN: CIU-00546
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00546' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00546-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00546-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [547] ISBN: CIU-00547
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00547' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00547-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [548] ISBN: CIU-00548
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00548' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00548-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00548-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00548-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [549] ISBN: CIU-00549
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00549' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00549-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00549-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00549-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [550] ISBN: CIU-00550
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00550' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00550-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00550-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00550-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [551] ISBN: CIU-00551
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00551' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00551-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00551-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [552] ISBN: CIU-00552
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00552' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00552-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00552-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00552-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [553] ISBN: CIU-00553
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00553' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00553-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00553-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [554] ISBN: CIU-00554
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00554' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00554-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00554-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00554-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [555] ISBN: CIU-00555
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00555' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00555-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00555-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00555-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [556] ISBN: CIU-00556
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00556' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00556-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [557] ISBN: CIU-00557
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00557' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00557-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00557-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00557-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [558] ISBN: CIU-00558
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00558' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00558-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [559] ISBN: CIU-00559
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00559' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00559-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [560] ISBN: CIU-00560
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00560' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00560-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00560-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00560-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [561] ISBN: CIU-00561
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00561' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00561-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00561-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00561-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [562] ISBN: CIU-00562
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00562' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00562-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00562-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00562-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00562-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00562-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [563] ISBN: CIU-00563
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00563' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00563-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [564] ISBN: CIU-00564
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00564' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00564-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [565] ISBN: CIU-00565
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00565' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00565-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [566] ISBN: CIU-00566
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00566' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00566-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [567] ISBN: CIU-00567
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00567' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00567-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00567-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [568] ISBN: CIU-00568
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00568' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00568-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [569] ISBN: CIU-00569
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00569' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00569-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [570] ISBN: CIU-00570
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00570' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00570-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00570-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00570-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [571] ISBN: CIU-00571
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00571' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00571-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00571-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00571-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [572] ISBN: CIU-00572
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00572' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00572-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00572-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00572-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [573] ISBN: CIU-00573
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00573' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00573-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00573-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00573-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [574] ISBN: CIU-00574
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00574' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00574-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00574-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00574-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [575] ISBN: CIU-00575
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00575' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00575-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00575-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00575-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00575-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [576] ISBN: CIU-00576
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00576' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00576-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00576-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00576-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00576-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [577] ISBN: CIU-00577
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00577' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00577-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00577-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00577-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00577-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00577-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [578] ISBN: CIU-00578
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00578' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00578-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00578-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00578-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [579] ISBN: CIU-00579
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00579' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00579-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00579-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00579-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [580] ISBN: CIU-00580
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00580' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00580-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [581] ISBN: CIU-00581
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00581' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00581-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00581-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00581-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [582] ISBN: CIU-00582
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00582' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00582-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00582-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00582-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [583] ISBN: CIU-00583
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00583' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00583-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00583-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00583-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [584] ISBN: CIU-00584
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00584' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00584-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00584-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00584-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [585] ISBN: CIU-00585
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00585' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00585-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00585-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00585-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [586] ISBN: CIU-00586
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00586' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00586-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00586-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00586-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [587] ISBN: CIU-00587
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00587' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00587-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00587-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [588] ISBN: CIU-00588
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00588' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00588-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [589] ISBN: CIU-00589
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00589' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00589-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [590] ISBN: CIU-00590
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00590' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00590-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [591] ISBN: CIU-00591
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00591' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00591-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [592] ISBN: CIU-00592
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00592' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00592-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [593] ISBN: CIU-00593
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00593' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00593-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00593-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00593-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00593-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [594] ISBN: CIU-00594
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00594' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00594-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [595] ISBN: CIU-00595
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00595' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00595-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [596] ISBN: CIU-00596
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00596' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00596-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [597] ISBN: CIU-00597
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00597' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00597-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [598] ISBN: CIU-00598
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00598' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00598-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [599] ISBN: CIU-00599
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00599' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00599-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [600] ISBN: CIU-00600
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00600' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00600-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [601] ISBN: CIU-00601
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00601' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00601-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [602] ISBN: CIU-00602
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00602' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00602-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00602-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [603] ISBN: CIU-00603
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00603' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00603-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [604] ISBN: CIU-00604
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00604' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00604-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00604-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [605] ISBN: CIU-00605
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00605' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00605-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [606] ISBN: CIU-00606
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00606' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00606-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00606-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [607] ISBN: CIU-00607
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00607' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00607-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [608] ISBN: CIU-00608
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00608' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00608-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [609] ISBN: CIU-00609
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00609' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00609-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00609-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00609-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [610] ISBN: CIU-00610
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00610' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00610-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00610-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00610-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [611] ISBN: CIU-00611
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00611' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00611-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00611-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00611-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [612] ISBN: CIU-00612
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00612' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00612-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00612-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00612-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [613] ISBN: CIU-00613
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00613' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00613-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00613-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00613-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [614] ISBN: CIU-00614
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00614' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00614-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00614-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00614-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [615] ISBN: CIU-00615
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00615' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00615-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00615-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00615-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [616] ISBN: CIU-00616
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00616' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00616-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00616-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00616-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [617] ISBN: CIU-00617
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00617' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00617-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00617-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00617-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [618] ISBN: CIU-00618
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00618' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00618-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00618-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00618-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [619] ISBN: CIU-00619
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00619' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00619-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00619-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00619-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [620] ISBN: CIU-00620
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00620' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00620-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00620-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00620-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [621] ISBN: CIU-00621
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00621' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00621-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00621-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00621-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [622] ISBN: CIU-00622
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00622' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00622-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00622-E22', 'Sin asignar', 'disponible');
  END IF;

  -- [623] ISBN: CIU-00623
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00623' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00623-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00623-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00623-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00623-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00623-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00623-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00623-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00623-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00623-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00623-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00623-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00623-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00623-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00623-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00623-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00623-E16', 'Sin asignar', 'disponible');
  END IF;

  -- [624] ISBN: CIU-00624
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00624' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00624-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00624-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00624-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [625] ISBN: CIU-00625
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00625' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00625-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00625-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00625-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [626] ISBN: CIU-00626
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00626' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00626-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00626-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00626-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [627] ISBN: CIU-00627
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00627' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00627-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00627-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00627-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [628] ISBN: CIU-00628
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00628' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00628-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00628-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00628-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [629] ISBN: CIU-00629
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00629' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00629-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00629-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [630] ISBN: CIU-00630
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00630' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00630-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00630-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [631] ISBN: CIU-00631
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00631' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00631-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00631-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00631-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [632] ISBN: CIU-00632
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00632' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00632-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00632-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00632-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [633] ISBN: CIU-00633
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00633' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00633-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00633-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00633-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [634] ISBN: CIU-00634
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00634' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00634-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00634-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00634-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [635] ISBN: CIU-00635
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00635' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00635-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00635-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00635-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00635-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00635-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00635-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [636] ISBN: CIU-00636
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00636' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00636-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00636-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00636-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [637] ISBN: CIU-00637
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00637' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00637-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00637-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00637-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [638] ISBN: CIU-00638
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00638' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00638-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00638-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00638-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [639] ISBN: CIU-00639
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00639' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00639-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00639-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00639-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [640] ISBN: CIU-00640
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00640' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00640-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00640-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00640-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [641] ISBN: CIU-00641
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00641' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00641-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00641-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00641-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [642] ISBN: CIU-00642
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00642' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00642-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00642-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00642-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [643] ISBN: CIU-00643
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00643' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00643-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00643-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00643-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00643-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [644] ISBN: CIU-00644
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00644' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00644-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00644-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [645] ISBN: CIU-00645
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00645' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00645-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00645-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [646] ISBN: CIU-00646
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00646' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00646-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00646-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [647] ISBN: CIU-00647
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00647' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00647-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00647-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [648] ISBN: CIU-00648
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00648' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00648-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00648-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [649] ISBN: CIU-00649
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00649' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00649-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00649-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [650] ISBN: CIU-00650
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00650' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00650-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00650-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00650-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00650-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00650-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00650-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [651] ISBN: CIU-00651
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00651' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00651-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [652] ISBN: CIU-00652
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00652' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00652-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [653] ISBN: CIU-00653
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00653' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00653-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [654] ISBN: CIU-00654
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00654' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00654-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [655] ISBN: CIU-00655
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00655' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00655-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [656] ISBN: CIU-00656
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00656' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00656-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [657] ISBN: CIU-00657
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00657' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00657-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [658] ISBN: CIU-00658
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00658' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00658-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [659] ISBN: CIU-00659
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00659' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00659-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [660] ISBN: CIU-00660
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00660' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00660-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [661] ISBN: CIU-00661
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00661' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00661-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [662] ISBN: CIU-00662
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00662' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00662-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [663] ISBN: CIU-00663
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00663' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00663-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [664] ISBN: CIU-00664
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00664' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00664-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00664-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [665] ISBN: CIU-00665
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00665' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00665-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [666] ISBN: CIU-00666
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00666' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00666-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [667] ISBN: CIU-00667
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00667' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00667-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00667-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00667-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00667-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [668] ISBN: CIU-00668
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00668' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00668-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [669] ISBN: CIU-00669
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00669' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00669-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00669-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00669-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [670] ISBN: CIU-00670
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00670' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00670-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00670-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00670-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [671] ISBN: CIU-00671
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00671' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00671-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [672] ISBN: CIU-00672
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00672' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00672-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00672-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00672-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [673] ISBN: CIU-00673
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00673' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00673-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00673-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00673-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [674] ISBN: CIU-00674
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00674' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00674-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00674-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00674-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [675] ISBN: CIU-00675
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00675' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00675-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00675-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00675-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [676] ISBN: CIU-00676
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00676' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00676-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00676-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00676-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [677] ISBN: CIU-00677
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00677' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00677-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00677-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00677-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [678] ISBN: CIU-00678
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00678' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00678-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00678-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00678-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [679] ISBN: CIU-00679
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00679' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00679-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00679-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00679-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [680] ISBN: CIU-00680
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00680' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00680-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00680-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00680-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00680-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00680-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00680-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00680-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00680-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00680-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00680-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [681] ISBN: CIU-00681
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00681' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00681-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00681-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00681-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [682] ISBN: CIU-00682
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00682' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00682-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [683] ISBN: CIU-00683
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00683' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00683-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00683-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00683-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00683-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [684] ISBN: CIU-00684
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00684' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00684-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00684-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00684-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [685] ISBN: CIU-00685
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00685' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00685-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00685-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00685-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00685-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00685-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00685-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00685-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00685-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00685-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00685-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [686] ISBN: CIU-00686
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00686' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00686-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00686-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00686-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [687] ISBN: CIU-00687
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00687' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00687-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [688] ISBN: CIU-00688
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00688' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00688-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00688-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00688-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [689] ISBN: CIU-00689
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00689' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00689-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00689-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00689-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [690] ISBN: CIU-00690
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00690' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00690-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00690-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00690-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [691] ISBN: CIU-00691
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00691' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00691-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00691-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00691-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [692] ISBN: CIU-00692
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00692' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00692-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00692-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00692-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [693] ISBN: CIU-00693
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00693' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00693-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00693-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00693-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [694] ISBN: CIU-00694
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00694' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00694-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00694-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00694-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00694-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00694-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00694-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00694-E07', 'Sin asignar', 'disponible');
  END IF;

  -- [695] ISBN: CIU-00695
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00695' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00695-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00695-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00695-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [696] ISBN: CIU-00696
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00696' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00696-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00696-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00696-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [697] ISBN: CIU-00697
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00697' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00697-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00697-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00697-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [698] ISBN: CIU-00698
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00698' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00698-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00698-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00698-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [699] ISBN: CIU-00699
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00699' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00699-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00699-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [700] ISBN: CIU-00700
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00700' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00700-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [701] ISBN: CIU-00701
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00701' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00701-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00701-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [702] ISBN: CIU-00702
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00702' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00702-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00702-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00702-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [703] ISBN: CIU-00703
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00703' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00703-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00703-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [704] ISBN: CIU-00704
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00704' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00704-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [705] ISBN: CIU-00705
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00705' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00705-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [706] ISBN: CIU-00706
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00706' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00706-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00706-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [707] ISBN: CIU-00707
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00707' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00707-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [708] ISBN: CIU-00708
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00708' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00708-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [709] ISBN: CIU-00709
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00709' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00709-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [710] ISBN: CIU-00710
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00710' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00710-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [711] ISBN: CIU-00711
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00711' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00711-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [712] ISBN: CIU-00712
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00712' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00712-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [713] ISBN: CIU-00713
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00713' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00713-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00713-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00713-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [714] ISBN: CIU-00714
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00714' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00714-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [715] ISBN: CIU-00715
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00715' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00715-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00715-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00715-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [716] ISBN: CIU-00716
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00716' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00716-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00716-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00716-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [717] ISBN: CIU-00717
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00717' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00717-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [718] ISBN: CIU-00718
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00718' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00718-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00718-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00718-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [719] ISBN: CIU-00719
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00719' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00719-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00719-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00719-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [720] ISBN: CIU-00720
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00720' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00720-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00720-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00720-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [721] ISBN: CIU-00721
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00721' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00721-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00721-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00721-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [722] ISBN: CIU-00722
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00722' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00722-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00722-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00722-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [723] ISBN: CIU-00723
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00723' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00723-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00723-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00723-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [724] ISBN: CIU-00724
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00724' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00724-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00724-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00724-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [725] ISBN: CIU-00725
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00725' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00725-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00725-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00725-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [726] ISBN: CIU-00726
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00726' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00726-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00726-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00726-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [727] ISBN: CIU-00727
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00727' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00727-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00727-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00727-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [728] ISBN: CIU-00728
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00728' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00728-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00728-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00728-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [729] ISBN: CIU-00729
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00729' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00729-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00729-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00729-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [730] ISBN: CIU-00730
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00730' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00730-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00730-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [731] ISBN: CIU-00731
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00731' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00731-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00731-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00731-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [732] ISBN: CIU-00732
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00732' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00732-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00732-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00732-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [733] ISBN: CIU-00733
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00733' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00733-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00733-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00733-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [734] ISBN: CIU-00734
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00734' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00734-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00734-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00734-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [735] ISBN: CIU-00735
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00735' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00735-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00735-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00735-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [736] ISBN: CIU-00736
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00736' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00736-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00736-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00736-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00736-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [737] ISBN: CIU-00737
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00737' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00737-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00737-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00737-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00737-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [738] ISBN: CIU-00738
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00738' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00738-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00738-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00738-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [739] ISBN: CIU-00739
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00739' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00739-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00739-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00739-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [740] ISBN: CIU-00740
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00740' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00740-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [741] ISBN: CIU-00741
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00741' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00741-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00741-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00741-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00741-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00741-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00741-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00741-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00741-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00741-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00741-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [742] ISBN: CIU-00742
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00742' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00742-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00742-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00742-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [743] ISBN: CIU-00743
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00743' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00743-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00743-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00743-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00743-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00743-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00743-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00743-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00743-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [744] ISBN: CIU-00744
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00744' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00744-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00744-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [745] ISBN: CIU-00745
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00745' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00745-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00745-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00745-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [746] ISBN: CIU-00746
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00746' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00746-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00746-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00746-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00746-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [747] ISBN: CIU-00747
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00747' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00747-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00747-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00747-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [748] ISBN: CIU-00748
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00748' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00748-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00748-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00748-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [749] ISBN: CIU-00749
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00749' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00749-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00749-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00749-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [750] ISBN: CIU-00750
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00750' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00750-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00750-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00750-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [751] ISBN: CIU-00751
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00751' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00751-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00751-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00751-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00751-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00751-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00751-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [752] ISBN: CIU-00752
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00752' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00752-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00752-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00752-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [753] ISBN: CIU-00753
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00753' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00753-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00753-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00753-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [754] ISBN: CIU-00754
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00754' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00754-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00754-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00754-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [755] ISBN: CIU-00755
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00755' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00755-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00755-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00755-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [756] ISBN: CIU-00756
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00756' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00756-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00756-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00756-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [757] ISBN: CIU-00757
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00757' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00757-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00757-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00757-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [758] ISBN: CIU-00758
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00758' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00758-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00758-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00758-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [759] ISBN: CIU-00759
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00759' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00759-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00759-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00759-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [760] ISBN: CIU-00760
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00760' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00760-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [761] ISBN: CIU-00761
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00761' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00761-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00761-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [762] ISBN: CIU-00762
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00762' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00762-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00762-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00762-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [763] ISBN: CIU-00763
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00763' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00763-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00763-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00763-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [764] ISBN: CIU-00764
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00764' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00764-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00764-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00764-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [765] ISBN: CIU-00765
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00765' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00765-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00765-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00765-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [766] ISBN: CIU-00766
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00766' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00766-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [767] ISBN: CIU-00767
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00767' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00767-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [768] ISBN: CIU-00768
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00768' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00768-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00768-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00768-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [769] ISBN: CIU-00769
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00769' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00769-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [770] ISBN: CIU-00770
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00770' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00770-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [771] ISBN: CIU-00771
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00771' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00771-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [772] ISBN: CIU-00772
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00772' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00772-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [773] ISBN: CIU-00773
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00773' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00773-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [774] ISBN: CIU-00774
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00774' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00774-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [775] ISBN: CIU-00775
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00775' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00775-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [776] ISBN: CIU-00776
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00776' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00776-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [777] ISBN: CIU-00777
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00777' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00777-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [778] ISBN: CIU-00778
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00778' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00778-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [779] ISBN: CIU-00779
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00779' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00779-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [780] ISBN: CIU-00780
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00780' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00780-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [781] ISBN: CIU-00781
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00781' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00781-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [782] ISBN: CIU-00782
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00782' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00782-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [783] ISBN: CIU-00783
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00783' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00783-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [784] ISBN: CIU-00784
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00784' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00784-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [785] ISBN: CIU-00785
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00785' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00785-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [786] ISBN: CIU-00786
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00786' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00786-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [787] ISBN: CIU-00787
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00787' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00787-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [788] ISBN: CIU-00788
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00788' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00788-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00788-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [789] ISBN: CIU-00789
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00789' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00789-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00789-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [790] ISBN: CIU-00790
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00790' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00790-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [791] ISBN: CIU-00791
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00791' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00791-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00791-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00791-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00791-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [792] ISBN: CIU-00792
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00792' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00792-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00792-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [793] ISBN: CIU-00793
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00793' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00793-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00793-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [794] ISBN: CIU-00794
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00794' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00794-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00794-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00794-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [795] ISBN: CIU-00795
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00795' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00795-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00795-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00795-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [796] ISBN: CIU-00796
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00796' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00796-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00796-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [797] ISBN: CIU-00797
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00797' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00797-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00797-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [798] ISBN: CIU-00798
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00798' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00798-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00798-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00798-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [799] ISBN: CIU-00799
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00799' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00799-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00799-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00799-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [800] ISBN: CIU-00800
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00800' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00800-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00800-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00800-E03', 'Sin asignar', 'disponible');
  END IF;


END $$;
