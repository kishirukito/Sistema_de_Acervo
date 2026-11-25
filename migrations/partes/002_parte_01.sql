-- Parte 1 de 7 (400 libros)
DO $$
DECLARE v_lid UUID;
BEGIN

  -- [1] ISBN: CIU-00001
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00001' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00001-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00001-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00001-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2] ISBN: CIU-00002
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00002' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00002-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00002-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [3] ISBN: CIU-00003
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00003' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00003-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00003-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [4] ISBN: CIU-00004
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00004' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00004-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00004-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00004-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [5] ISBN: CIU-00005
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00005' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00005-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [6] ISBN: CIU-00006
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00006' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00006-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00006-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00006-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [7] ISBN: CIU-00007
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00007' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00007-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00007-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00007-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [8] ISBN: CIU-00008
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00008' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00008-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00008-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00008-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [9] ISBN: CIU-00009
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00009' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00009-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E22', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00009-E23', 'Sin asignar', 'disponible');
  END IF;

  -- [10] ISBN: CIU-00010
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00010' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00010-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00010-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [11] ISBN: CIU-00011
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00011' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00011-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00011-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00011-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00011-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00011-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [12] ISBN: CIU-00012
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00012' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00012-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00012-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [13] ISBN: CIU-00013
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00013' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00013-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00013-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00013-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [14] ISBN: CIU-00014
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00014' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00014-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00014-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00014-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [15] ISBN: CIU-00015
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00015' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00015-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00015-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00015-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [16] ISBN: CIU-00016
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00016' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00016-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00016-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00016-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [17] ISBN: CIU-00017
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00017' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00017-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00017-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00017-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [18] ISBN: CIU-00018
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00018' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00018-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00018-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00018-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [19] ISBN: CIU-00019
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00019' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00019-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00019-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00019-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [20] ISBN: CIU-00020
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00020' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00020-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00020-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00020-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [21] ISBN: CIU-00021
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00021' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00021-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00021-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00021-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [22] ISBN: CIU-00022
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00022' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00022-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00022-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00022-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [23] ISBN: CIU-00023
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00023' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00023-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00023-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00023-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [24] ISBN: CIU-00024
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00024' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00024-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00024-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00024-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [25] ISBN: CIU-00025
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00025' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00025-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00025-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00025-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [26] ISBN: CIU-00026
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00026' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00026-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00026-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00026-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [27] ISBN: CIU-00027
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00027' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00027-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00027-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00027-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [28] ISBN: CIU-00028
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00028' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00028-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00028-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00028-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [29] ISBN: CIU-00029
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00029' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00029-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00029-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00029-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [30] ISBN: CIU-00030
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00030' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00030-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00030-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00030-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [31] ISBN: CIU-00031
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00031' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00031-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00031-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00031-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [32] ISBN: CIU-00032
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00032' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00032-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00032-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00032-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00032-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00032-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00032-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00032-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00032-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00032-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00032-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [33] ISBN: CIU-00033
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00033' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00033-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00033-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00033-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [34] ISBN: CIU-00034
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00034' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00034-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00034-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00034-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [35] ISBN: CIU-00035
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00035' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00035-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00035-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00035-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [36] ISBN: CIU-00036
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00036' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00036-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00036-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00036-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [37] ISBN: CIU-00037
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00037' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00037-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00037-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00037-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [38] ISBN: CIU-00038
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00038' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00038-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00038-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00038-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [39] ISBN: CIU-00039
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00039' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00039-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00039-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00039-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [40] ISBN: CIU-00040
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00040' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00040-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00040-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [41] ISBN: CIU-00041
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00041' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00041-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [42] ISBN: CIU-00042
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00042' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00042-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00042-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00042-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00042-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [43] ISBN: CIU-00043
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00043' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00043-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00043-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00043-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [44] ISBN: CIU-00044
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00044' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00044-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00044-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00044-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00044-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [45] ISBN: CIU-00045
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00045' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00045-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00045-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [46] ISBN: CIU-00046
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00046' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00046-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [47] ISBN: CIU-00047
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00047' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00047-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [48] ISBN: CIU-00048
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00048' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00048-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00048-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00048-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00048-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00048-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00048-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00048-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00048-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00048-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00048-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00048-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00048-E12', 'Sin asignar', 'disponible');
  END IF;

  -- [49] ISBN: CIU-00049
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00049' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00049-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [50] ISBN: CIU-00050
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00050' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00050-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [51] ISBN: CIU-00051
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00051' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00051-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [52] ISBN: CIU-00052
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00052' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00052-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [53] ISBN: CIU-00053
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00053' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00053-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [54] ISBN: CIU-00054
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00054' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00054-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [55] ISBN: CIU-00055
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00055' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00055-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00055-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00055-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00055-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [56] ISBN: CIU-00056
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00056' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00056-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00056-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00056-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00056-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00056-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00056-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [57] ISBN: CIU-00057
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00057' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00057-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00057-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00057-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00057-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00057-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00057-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00057-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00057-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00057-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00057-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [58] ISBN: CIU-00058
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00058' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00058-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00058-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00058-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00058-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00058-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [59] ISBN: CIU-00059
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00059' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00059-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00059-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00059-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00059-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00059-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00059-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00059-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00059-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00059-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00059-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00059-E11', 'Sin asignar', 'disponible');
  END IF;

  -- [60] ISBN: CIU-00060
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00060' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00060-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00060-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [61] ISBN: CIU-00061
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00061' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00061-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [62] ISBN: CIU-00062
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00062' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00062-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [63] ISBN: CIU-00063
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00063' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00063-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00063-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00063-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00063-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00063-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [64] ISBN: CIU-00064
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00064' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00064-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00064-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00064-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [65] ISBN: CIU-00065
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00065' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00065-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00065-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [66] ISBN: CIU-00066
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00066' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00066-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00066-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00066-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [67] ISBN: CIU-00067
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00067' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00067-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [68] ISBN: CIU-00068
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00068' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00068-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [69] ISBN: CIU-00069
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00069' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00069-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [70] ISBN: CIU-00070
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00070' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00070-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [71] ISBN: CIU-00071
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00071' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00071-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [72] ISBN: CIU-00072
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00072' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00072-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [73] ISBN: CIU-00073
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00073' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00073-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [74] ISBN: CIU-00074
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00074' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00074-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [75] ISBN: CIU-00075
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00075' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00075-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [76] ISBN: CIU-00076
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00076' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00076-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [77] ISBN: CIU-00077
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00077' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00077-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [78] ISBN: CIU-00078
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00078' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00078-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [79] ISBN: CIU-00079
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00079' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00079-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [80] ISBN: CIU-00080
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00080' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00080-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [81] ISBN: CIU-00081
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00081' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00081-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [82] ISBN: CIU-00082
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00082' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00082-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [83] ISBN: CIU-00083
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00083' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00083-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [84] ISBN: CIU-00084
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00084' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00084-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [85] ISBN: CIU-00085
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00085' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00085-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [86] ISBN: CIU-00086
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00086' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00086-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [87] ISBN: CIU-00087
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00087' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00087-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [88] ISBN: CIU-00088
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00088' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00088-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [89] ISBN: CIU-00089
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00089' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00089-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [90] ISBN: CIU-00090
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00090' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00090-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [91] ISBN: CIU-00091
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00091' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00091-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [92] ISBN: CIU-00092
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00092' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00092-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [93] ISBN: CIU-00093
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00093' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00093-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [94] ISBN: CIU-00094
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00094' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00094-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [95] ISBN: CIU-00095
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00095' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00095-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [96] ISBN: CIU-00096
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00096' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00096-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [97] ISBN: CIU-00097
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00097' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00097-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [98] ISBN: CIU-00098
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00098' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00098-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [99] ISBN: CIU-00099
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00099' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00099-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [100] ISBN: CIU-00100
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00100' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00100-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [101] ISBN: CIU-00101
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00101' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00101-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [102] ISBN: CIU-00102
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00102' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00102-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [103] ISBN: CIU-00103
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00103' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00103-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [104] ISBN: CIU-00104
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00104' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00104-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [105] ISBN: CIU-00105
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00105' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00105-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [106] ISBN: CIU-00106
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00106' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00106-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [107] ISBN: CIU-00107
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00107' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00107-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [108] ISBN: CIU-00108
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00108' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00108-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [109] ISBN: CIU-00109
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00109' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00109-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [110] ISBN: CIU-00110
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00110' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00110-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [111] ISBN: CIU-00111
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00111' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00111-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [112] ISBN: CIU-00112
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00112' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00112-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [113] ISBN: CIU-00113
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00113' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00113-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [114] ISBN: CIU-00114
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00114' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00114-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [115] ISBN: CIU-00115
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00115' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00115-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [116] ISBN: CIU-00116
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00116' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00116-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [117] ISBN: CIU-00117
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00117' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00117-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [118] ISBN: CIU-00118
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00118' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00118-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [119] ISBN: CIU-00119
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00119' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00119-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [120] ISBN: CIU-00120
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00120' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00120-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [121] ISBN: CIU-00121
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00121' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00121-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [122] ISBN: CIU-00122
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00122' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00122-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [123] ISBN: CIU-00123
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00123' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00123-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00123-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [124] ISBN: CIU-00124
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00124' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00124-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00124-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [125] ISBN: CIU-00125
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00125' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00125-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [126] ISBN: CIU-00126
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00126' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00126-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [127] ISBN: CIU-00127
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00127' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00127-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [128] ISBN: CIU-00128
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00128' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00128-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [129] ISBN: CIU-00129
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00129' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00129-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [130] ISBN: CIU-00130
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00130' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00130-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [131] ISBN: CIU-00131
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00131' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00131-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [132] ISBN: CIU-00132
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00132' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00132-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [133] ISBN: CIU-00133
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00133' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00133-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [134] ISBN: CIU-00134
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00134' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00134-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [135] ISBN: CIU-00135
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00135' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00135-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [136] ISBN: CIU-00136
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00136' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00136-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [137] ISBN: CIU-00137
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00137' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00137-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [138] ISBN: CIU-00138
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00138' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00138-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [139] ISBN: CIU-00139
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00139' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00139-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [140] ISBN: CIU-00140
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00140' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00140-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [141] ISBN: CIU-00141
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00141' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00141-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [142] ISBN: CIU-00142
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00142' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00142-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [143] ISBN: CIU-00143
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00143' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00143-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [144] ISBN: CIU-00144
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00144' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00144-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [145] ISBN: CIU-00145
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00145' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00145-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [146] ISBN: CIU-00146
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00146' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00146-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00146-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [147] ISBN: CIU-00147
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00147' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00147-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [148] ISBN: CIU-00148
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00148' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00148-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [149] ISBN: CIU-00149
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00149' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00149-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00149-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00149-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [150] ISBN: CIU-00150
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00150' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00150-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [151] ISBN: CIU-00151
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00151' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00151-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [152] ISBN: CIU-00152
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00152' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00152-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [153] ISBN: CIU-00153
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00153' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00153-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [154] ISBN: CIU-00154
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00154' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00154-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [155] ISBN: CIU-00155
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00155' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00155-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [156] ISBN: CIU-00156
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00156' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00156-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [157] ISBN: CIU-00157
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00157' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00157-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00157-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [158] ISBN: CIU-00158
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00158' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00158-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [159] ISBN: CIU-00159
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00159' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00159-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [160] ISBN: CIU-00160
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00160' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00160-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [161] ISBN: CIU-00161
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00161' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00161-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [162] ISBN: CIU-00162
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00162' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00162-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [163] ISBN: CIU-00163
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00163' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00163-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [164] ISBN: CIU-00164
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00164' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00164-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [165] ISBN: CIU-00165
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00165' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00165-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [166] ISBN: CIU-00166
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00166' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00166-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [167] ISBN: CIU-00167
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00167' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00167-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [168] ISBN: CIU-00168
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00168' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00168-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [169] ISBN: CIU-00169
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00169' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00169-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00169-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [170] ISBN: CIU-00170
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00170' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00170-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00170-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [171] ISBN: CIU-00171
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00171' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00171-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00171-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [172] ISBN: CIU-00172
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00172' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00172-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00172-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [173] ISBN: CIU-00173
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00173' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00173-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00173-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00173-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [174] ISBN: CIU-00174
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00174' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00174-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00174-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00174-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00174-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [175] ISBN: CIU-00175
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00175' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00175-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00175-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00175-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00175-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00175-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [176] ISBN: CIU-00176
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00176' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00176-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [177] ISBN: CIU-00177
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00177' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00177-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00177-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00177-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00177-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00177-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00177-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00177-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00177-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00177-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00177-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00177-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00177-E12', 'Sin asignar', 'disponible');
  END IF;

  -- [178] ISBN: CIU-00178
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00178' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00178-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00178-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00178-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [179] ISBN: CIU-00179
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00179' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00179-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00179-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [180] ISBN: CIU-00180
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00180' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00180-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00180-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00180-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00180-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [181] ISBN: CIU-00181
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00181' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00181-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00181-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00181-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [182] ISBN: CIU-00182
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00182' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00182-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00182-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00182-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [183] ISBN: CIU-00183
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00183' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00183-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00183-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00183-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [184] ISBN: CIU-00184
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00184' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00184-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00184-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00184-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [185] ISBN: CIU-00185
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00185' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00185-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00185-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00185-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [186] ISBN: CIU-00186
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00186' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00186-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00186-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00186-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [187] ISBN: CIU-00187
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00187' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00187-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00187-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [188] ISBN: CIU-00188
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00188' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00188-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00188-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [189] ISBN: CIU-00189
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00189' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00189-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00189-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00189-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [190] ISBN: CIU-00190
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00190' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00190-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00190-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00190-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [191] ISBN: CIU-00191
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00191' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00191-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00191-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00191-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [192] ISBN: CIU-00192
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00192' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00192-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00192-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00192-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [193] ISBN: CIU-00193
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00193' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00193-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00193-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [194] ISBN: CIU-00194
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00194' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00194-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [195] ISBN: CIU-00195
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00195' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00195-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [196] ISBN: CIU-00196
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00196' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00196-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [197] ISBN: CIU-00197
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00197' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00197-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [198] ISBN: CIU-00198
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00198' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00198-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [199] ISBN: CIU-00199
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00199' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00199-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00199-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [200] ISBN: CIU-00200
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00200' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00200-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00200-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [201] ISBN: CIU-00201
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00201' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00201-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [202] ISBN: CIU-00202
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00202' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00202-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00202-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [203] ISBN: CIU-00203
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00203' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00203-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [204] ISBN: CIU-00204
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00204' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00204-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [205] ISBN: CIU-00205
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00205' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00205-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00205-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [206] ISBN: CIU-00206
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00206' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00206-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [207] ISBN: CIU-00207
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00207' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00207-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00207-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [208] ISBN: CIU-00208
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00208' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00208-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [209] ISBN: CIU-00209
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00209' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00209-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [210] ISBN: CIU-00210
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00210' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00210-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00210-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [211] ISBN: CIU-00211
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00211' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00211-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [212] ISBN: CIU-00212
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00212' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00212-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [213] ISBN: CIU-00213
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00213' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00213-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00213-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [214] ISBN: CIU-00214
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00214' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00214-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [215] ISBN: CIU-00215
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00215' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00215-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00215-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [216] ISBN: CIU-00216
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00216' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00216-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00216-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [217] ISBN: CIU-00217
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00217' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00217-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [218] ISBN: CIU-00218
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00218' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00218-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [219] ISBN: CIU-00219
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00219' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00219-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [220] ISBN: CIU-00220
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00220' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00220-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [221] ISBN: CIU-00221
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00221' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00221-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [222] ISBN: CIU-00222
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00222' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00222-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [223] ISBN: CIU-00223
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00223' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00223-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [224] ISBN: CIU-00224
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00224' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00224-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [225] ISBN: CIU-00225
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00225' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00225-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [226] ISBN: CIU-00226
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00226' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00226-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [227] ISBN: CIU-00227
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00227' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00227-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [228] ISBN: CIU-00228
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00228' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00228-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [229] ISBN: CIU-00229
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00229' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00229-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [230] ISBN: CIU-00230
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00230' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00230-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [231] ISBN: CIU-00231
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00231' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00231-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [232] ISBN: CIU-00232
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00232' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00232-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [233] ISBN: CIU-00233
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00233' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00233-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [234] ISBN: CIU-00234
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00234' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00234-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [235] ISBN: CIU-00235
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00235' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00235-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [236] ISBN: CIU-00236
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00236' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00236-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [237] ISBN: CIU-00237
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00237' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00237-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [238] ISBN: CIU-00238
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00238' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00238-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [239] ISBN: CIU-00239
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00239' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00239-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [240] ISBN: CIU-00240
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00240' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00240-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [241] ISBN: CIU-00241
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00241' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00241-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [242] ISBN: CIU-00242
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00242' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00242-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [243] ISBN: CIU-00243
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00243' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00243-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [244] ISBN: CIU-00244
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00244' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00244-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [245] ISBN: CIU-00245
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00245' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00245-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [246] ISBN: CIU-00246
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00246' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00246-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [247] ISBN: CIU-00247
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00247' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00247-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [248] ISBN: CIU-00248
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00248' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00248-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [249] ISBN: CIU-00249
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00249' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00249-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [250] ISBN: CIU-00250
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00250' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00250-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [251] ISBN: CIU-00251
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00251' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00251-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [252] ISBN: CIU-00252
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00252' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00252-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [253] ISBN: CIU-00253
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00253' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00253-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [254] ISBN: CIU-00254
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00254' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00254-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [255] ISBN: CIU-00255
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00255' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00255-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [256] ISBN: CIU-00256
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00256' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00256-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [257] ISBN: CIU-00257
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00257' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00257-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [258] ISBN: CIU-00258
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00258' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00258-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00258-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00258-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [259] ISBN: CIU-00259
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00259' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00259-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [260] ISBN: CIU-00260
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00260' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00260-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [261] ISBN: CIU-00261
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00261' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00261-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [262] ISBN: CIU-00262
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00262' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00262-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [263] ISBN: CIU-00263
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00263' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00263-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [264] ISBN: CIU-00264
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00264' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00264-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [265] ISBN: CIU-00265
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00265' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00265-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [266] ISBN: CIU-00266
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00266' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00266-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [267] ISBN: CIU-00267
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00267' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00267-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [268] ISBN: CIU-00268
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00268' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00268-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [269] ISBN: CIU-00269
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00269' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00269-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [270] ISBN: CIU-00270
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00270' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00270-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [271] ISBN: CIU-00271
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00271' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00271-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [272] ISBN: CIU-00272
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00272' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00272-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [273] ISBN: CIU-00273
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00273' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00273-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [274] ISBN: CIU-00274
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00274' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00274-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [275] ISBN: CIU-00275
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00275' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00275-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [276] ISBN: CIU-00276
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00276' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00276-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [277] ISBN: CIU-00277
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00277' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00277-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [278] ISBN: CIU-00278
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00278' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00278-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [279] ISBN: CIU-00279
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00279' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00279-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [280] ISBN: CIU-00280
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00280' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00280-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [281] ISBN: CIU-00281
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00281' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00281-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [282] ISBN: CIU-00282
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00282' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00282-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [283] ISBN: CIU-00283
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00283' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00283-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [284] ISBN: CIU-00284
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00284' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00284-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [285] ISBN: CIU-00285
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00285' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00285-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [286] ISBN: CIU-00286
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00286' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00286-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [287] ISBN: CIU-00287
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00287' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00287-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [288] ISBN: CIU-00288
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00288' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00288-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [289] ISBN: CIU-00289
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00289' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00289-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [290] ISBN: CIU-00290
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00290' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00290-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [291] ISBN: CIU-00291
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00291' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00291-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [292] ISBN: CIU-00292
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00292' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00292-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [293] ISBN: CIU-00293
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00293' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00293-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [294] ISBN: CIU-00294
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00294' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00294-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [295] ISBN: CIU-00295
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00295' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00295-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [296] ISBN: CIU-00296
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00296' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00296-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [297] ISBN: CIU-00297
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00297' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00297-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00297-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00297-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [298] ISBN: CIU-00298
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00298' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00298-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00298-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [299] ISBN: CIU-00299
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00299' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00299-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [300] ISBN: CIU-00300
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00300' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00300-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [301] ISBN: CIU-00301
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00301' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00301-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [302] ISBN: CIU-00302
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00302' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00302-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [303] ISBN: CIU-00303
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00303' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00303-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [304] ISBN: CIU-00304
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00304' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00304-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [305] ISBN: CIU-00305
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00305' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00305-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [306] ISBN: CIU-00306
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00306' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00306-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [307] ISBN: CIU-00307
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00307' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00307-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [308] ISBN: CIU-00308
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00308' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00308-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [309] ISBN: CIU-00309
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00309' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00309-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [310] ISBN: CIU-00310
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00310' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00310-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [311] ISBN: CIU-00311
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00311' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00311-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [312] ISBN: CIU-00312
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00312' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00312-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [313] ISBN: CIU-00313
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00313' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00313-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [314] ISBN: CIU-00314
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00314' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00314-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [315] ISBN: CIU-00315
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00315' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00315-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [316] ISBN: CIU-00316
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00316' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00316-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [317] ISBN: CIU-00317
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00317' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00317-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [318] ISBN: CIU-00318
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00318' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00318-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [319] ISBN: CIU-00319
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00319' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00319-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [320] ISBN: CIU-00320
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00320' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00320-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [321] ISBN: CIU-00321
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00321' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00321-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [322] ISBN: CIU-00322
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00322' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00322-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [323] ISBN: CIU-00323
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00323' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00323-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [324] ISBN: CIU-00324
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00324' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00324-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [325] ISBN: CIU-00325
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00325' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00325-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [326] ISBN: CIU-00326
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00326' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00326-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [327] ISBN: CIU-00327
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00327' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00327-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [328] ISBN: CIU-00328
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00328' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00328-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [329] ISBN: CIU-00329
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00329' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00329-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [330] ISBN: CIU-00330
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00330' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00330-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [331] ISBN: CIU-00331
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00331' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00331-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [332] ISBN: CIU-00332
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00332' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00332-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [333] ISBN: CIU-00333
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00333' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00333-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [334] ISBN: CIU-00334
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00334' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00334-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [335] ISBN: CIU-00335
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00335' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00335-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [336] ISBN: CIU-00336
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00336' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00336-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [337] ISBN: CIU-00337
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00337' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00337-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [338] ISBN: CIU-00338
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00338' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00338-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [339] ISBN: CIU-00339
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00339' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00339-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [340] ISBN: CIU-00340
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00340' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00340-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [341] ISBN: CIU-00341
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00341' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00341-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [342] ISBN: CIU-00342
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00342' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00342-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [343] ISBN: CIU-00343
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00343' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00343-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [344] ISBN: CIU-00344
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00344' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00344-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [345] ISBN: CIU-00345
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00345' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00345-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [346] ISBN: CIU-00346
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00346' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00346-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [347] ISBN: CIU-00347
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00347' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00347-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [348] ISBN: CIU-00348
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00348' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00348-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [349] ISBN: CIU-00349
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00349' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00349-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [350] ISBN: CIU-00350
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00350' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00350-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [351] ISBN: CIU-00351
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00351' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00351-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [352] ISBN: CIU-00352
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00352' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00352-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [353] ISBN: CIU-00353
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00353' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00353-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [354] ISBN: CIU-00354
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00354' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00354-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [355] ISBN: CIU-00355
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00355' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00355-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [356] ISBN: CIU-00356
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00356' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00356-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [357] ISBN: CIU-00357
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00357' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00357-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [358] ISBN: CIU-00358
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00358' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00358-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [359] ISBN: CIU-00359
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00359' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00359-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [360] ISBN: CIU-00360
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00360' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00360-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [361] ISBN: CIU-00361
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00361' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00361-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [362] ISBN: CIU-00362
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00362' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00362-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [363] ISBN: CIU-00363
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00363' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00363-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [364] ISBN: CIU-00364
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00364' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00364-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [365] ISBN: CIU-00365
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00365' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00365-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [366] ISBN: CIU-00366
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00366' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00366-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [367] ISBN: CIU-00367
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00367' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00367-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [368] ISBN: CIU-00368
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00368' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00368-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [369] ISBN: CIU-00369
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00369' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00369-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [370] ISBN: CIU-00370
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00370' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00370-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [371] ISBN: CIU-00371
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00371' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00371-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [372] ISBN: CIU-00372
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00372' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00372-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [373] ISBN: CIU-00373
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00373' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00373-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00373-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [374] ISBN: CIU-00374
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00374' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00374-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [375] ISBN: CIU-00375
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00375' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00375-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [376] ISBN: CIU-00376
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00376' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00376-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [377] ISBN: CIU-00377
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00377' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00377-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00377-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00377-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00377-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [378] ISBN: CIU-00378
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00378' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00378-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00378-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00378-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [379] ISBN: CIU-00379
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00379' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00379-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00379-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00379-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00379-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00379-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00379-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00379-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00379-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00379-E09', 'Sin asignar', 'disponible');
  END IF;

  -- [380] ISBN: CIU-00380
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00380' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00380-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [381] ISBN: CIU-00381
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00381' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00381-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [382] ISBN: CIU-00382
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00382' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00382-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [383] ISBN: CIU-00383
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00383' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00383-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [384] ISBN: CIU-00384
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00384' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00384-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00384-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [385] ISBN: CIU-00385
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00385' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00385-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00385-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [386] ISBN: CIU-00386
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00386' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00386-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00386-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00386-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00386-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00386-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00386-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00386-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00386-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00386-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00386-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00386-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00386-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00386-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00386-E14', 'Sin asignar', 'disponible');
  END IF;

  -- [387] ISBN: CIU-00387
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00387' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00387-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00387-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [388] ISBN: CIU-00388
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00388' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00388-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00388-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00388-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00388-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00388-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00388-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00388-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00388-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [389] ISBN: CIU-00389
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00389' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00389-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [390] ISBN: CIU-00390
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00390' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00390-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [391] ISBN: CIU-00391
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00391' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00391-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [392] ISBN: CIU-00392
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00392' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00392-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [393] ISBN: CIU-00393
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00393' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00393-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [394] ISBN: CIU-00394
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00394' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00394-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [395] ISBN: CIU-00395
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00395' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00395-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00395-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [396] ISBN: CIU-00396
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00396' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00396-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00396-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00396-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [397] ISBN: CIU-00397
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00397' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00397-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [398] ISBN: CIU-00398
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00398' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00398-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00398-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00398-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [399] ISBN: CIU-00399
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00399' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00399-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [400] ISBN: CIU-00400
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00400' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00400-E01', 'Sin asignar', 'disponible');
  END IF;


END $$;
