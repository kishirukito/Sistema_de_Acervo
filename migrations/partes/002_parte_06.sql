-- Parte 6 de 7 (400 libros)
DO $$
DECLARE v_lid UUID;
BEGIN

  -- [2001] ISBN: CIU-02001
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02001' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02001-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02001-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2002] ISBN: CIU-02002
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02002' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02002-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2003] ISBN: CIU-02003
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02003' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02003-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2004] ISBN: CIU-02004
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02004' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02004-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2005] ISBN: CIU-02005
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02005' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02005-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2006] ISBN: CIU-02006
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02006' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02006-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2007] ISBN: CIU-02007
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02007' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02007-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2008] ISBN: CIU-02008
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02008' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02008-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2009] ISBN: CIU-02009
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02009' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02009-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02009-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2010] ISBN: CIU-02010
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02010' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02010-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02010-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2011] ISBN: CIU-02011
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02011' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02011-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02011-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2012] ISBN: CIU-02012
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02012' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02012-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02012-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2013] ISBN: CIU-02013
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02013' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02013-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2014] ISBN: CIU-02014
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02014' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02014-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2015] ISBN: CIU-02015
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02015' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02015-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02015-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02015-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2016] ISBN: CIU-02016
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02016' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02016-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2017] ISBN: CIU-02017
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02017' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02017-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02017-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2018] ISBN: CIU-02018
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02018' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02018-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2019] ISBN: CIU-02019
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02019' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02019-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02019-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2020] ISBN: CIU-02020
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02020' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02020-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2021] ISBN: CIU-02021
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02021' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02021-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2022] ISBN: CIU-02022
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02022' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02022-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02022-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02022-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2023] ISBN: CIU-02023
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02023' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02023-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02023-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02023-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2024] ISBN: CIU-02024
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02024' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02024-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02024-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02024-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2025] ISBN: CIU-02025
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02025' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02025-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2026] ISBN: CIU-02026
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02026' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02026-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2027] ISBN: CIU-02027
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02027' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02027-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02027-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2028] ISBN: CIU-02028
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02028' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02028-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02028-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2029] ISBN: CIU-02029
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02029' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02029-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02029-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02029-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2030] ISBN: CIU-02030
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02030' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02030-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02030-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02030-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2031] ISBN: CIU-02031
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02031' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02031-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02031-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02031-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2032] ISBN: CIU-02032
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02032' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02032-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02032-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02032-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2033] ISBN: CIU-02033
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02033' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02033-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02033-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02033-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2034] ISBN: CIU-02034
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02034' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02034-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02034-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02034-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2035] ISBN: CIU-02035
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02035' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02035-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02035-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02035-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2036] ISBN: CIU-02036
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02036' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02036-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02036-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02036-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2037] ISBN: CIU-02037
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02037' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02037-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02037-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2038] ISBN: CIU-02038
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02038' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02038-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02038-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02038-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2039] ISBN: CIU-02039
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02039' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02039-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02039-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02039-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2040] ISBN: CIU-02040
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02040' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02040-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02040-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02040-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2041] ISBN: CIU-02041
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02041' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02041-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02041-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02041-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2042] ISBN: CIU-02042
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02042' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02042-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02042-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02042-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2043] ISBN: CIU-02043
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02043' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02043-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2044] ISBN: CIU-02044
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02044' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02044-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02044-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02044-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2045] ISBN: CIU-02045
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02045' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02045-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02045-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2046] ISBN: CIU-02046
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02046' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02046-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02046-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02046-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2047] ISBN: CIU-02047
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02047' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02047-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02047-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2048] ISBN: CIU-02048
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02048' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02048-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02048-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2049] ISBN: CIU-02049
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02049' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02049-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2050] ISBN: CIU-02050
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02050' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02050-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2051] ISBN: CIU-02051
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02051' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02051-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2052] ISBN: CIU-02052
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02052' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02052-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2053] ISBN: CIU-02053
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02053' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02053-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2054] ISBN: CIU-02054
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02054' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02054-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2055] ISBN: CIU-02055
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02055' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02055-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2056] ISBN: CIU-02056
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02056' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02056-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2057] ISBN: CIU-02057
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02057' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02057-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2058] ISBN: CIU-02058
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02058' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02058-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02058-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02058-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02058-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [2059] ISBN: CIU-02059
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02059' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02059-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02059-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2060] ISBN: CIU-02060
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02060' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02060-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2061] ISBN: CIU-02061
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02061' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02061-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2062] ISBN: CIU-02062
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02062' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02062-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2063] ISBN: CIU-02063
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02063' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02063-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02063-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02063-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2064] ISBN: CIU-02064
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02064' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02064-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02064-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02064-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02064-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [2065] ISBN: CIU-02065
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02065' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02065-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02065-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2066] ISBN: CIU-02066
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02066' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02066-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2067] ISBN: CIU-02067
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02067' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02067-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02067-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2068] ISBN: CIU-02068
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02068' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02068-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02068-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2069] ISBN: CIU-02069
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02069' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02069-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02069-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2070] ISBN: CIU-02070
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02070' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02070-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02070-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02070-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2071] ISBN: CIU-02071
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02071' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02071-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02071-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2072] ISBN: CIU-02072
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02072' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02072-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2073] ISBN: CIU-02073
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02073' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02073-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2074] ISBN: CIU-02074
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02074' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02074-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2075] ISBN: CIU-02075
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02075' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02075-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2076] ISBN: CIU-02076
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02076' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02076-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2077] ISBN: CIU-02077
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02077' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02077-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2078] ISBN: CIU-02078
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02078' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02078-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2079] ISBN: CIU-02079
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02079' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02079-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2080] ISBN: CIU-02080
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02080' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02080-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2081] ISBN: CIU-02081
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02081' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02081-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2082] ISBN: CIU-02082
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02082' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02082-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2083] ISBN: CIU-02083
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02083' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02083-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2084] ISBN: CIU-02084
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02084' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02084-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02084-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02084-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2085] ISBN: CIU-02085
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02085' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02085-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02085-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2086] ISBN: CIU-02086
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02086' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02086-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2087] ISBN: CIU-02087
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02087' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02087-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2088] ISBN: CIU-02088
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02088' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02088-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02088-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2089] ISBN: CIU-02089
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02089' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02089-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02089-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2090] ISBN: CIU-02090
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02090' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02090-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2091] ISBN: CIU-02091
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02091' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02091-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02091-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02091-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2092] ISBN: CIU-02092
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02092' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02092-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02092-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02092-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2093] ISBN: CIU-02093
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02093' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02093-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02093-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2094] ISBN: CIU-02094
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02094' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02094-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02094-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02094-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02094-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02094-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02094-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [2095] ISBN: CIU-02095
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02095' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02095-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02095-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2096] ISBN: CIU-02096
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02096' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02096-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2097] ISBN: CIU-02097
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02097' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02097-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02097-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02097-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02097-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [2098] ISBN: CIU-02098
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02098' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02098-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02098-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2099] ISBN: CIU-02099
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02099' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02099-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2100] ISBN: CIU-02100
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02100' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02100-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2101] ISBN: CIU-02101
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02101' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02101-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02101-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2102] ISBN: CIU-02102
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02102' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02102-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2103] ISBN: CIU-02103
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02103' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02103-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2104] ISBN: CIU-02104
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02104' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02104-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2105] ISBN: CIU-02105
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02105' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02105-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2106] ISBN: CIU-02106
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02106' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02106-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2107] ISBN: CIU-02107
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02107' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02107-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2108] ISBN: CIU-02108
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02108' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02108-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2109] ISBN: CIU-02109
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02109' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02109-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2110] ISBN: CIU-02110
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02110' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02110-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2111] ISBN: CIU-02111
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02111' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02111-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2112] ISBN: CIU-02112
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02112' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02112-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2113] ISBN: CIU-02113
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02113' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02113-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2114] ISBN: CIU-02114
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02114' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02114-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2115] ISBN: CIU-02115
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02115' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02115-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2116] ISBN: CIU-02116
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02116' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02116-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2117] ISBN: CIU-02117
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02117' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02117-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2118] ISBN: CIU-02118
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02118' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02118-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02118-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2119] ISBN: CIU-02119
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02119' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02119-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2120] ISBN: CIU-02120
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02120' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02120-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2121] ISBN: CIU-02121
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02121' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02121-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2122] ISBN: CIU-02122
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02122' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02122-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2123] ISBN: CIU-02123
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02123' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02123-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2124] ISBN: CIU-02124
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02124' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02124-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2125] ISBN: CIU-02125
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02125' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02125-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2126] ISBN: CIU-02126
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02126' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02126-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02126-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2127] ISBN: CIU-02127
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02127' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02127-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02127-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2128] ISBN: CIU-02128
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02128' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02128-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02128-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2129] ISBN: CIU-02129
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02129' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02129-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02129-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2130] ISBN: CIU-02130
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02130' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02130-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02130-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2131] ISBN: CIU-02131
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02131' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02131-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02131-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2132] ISBN: CIU-02132
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02132' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02132-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02132-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02132-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02132-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02132-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [2133] ISBN: CIU-02133
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02133' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02133-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2134] ISBN: CIU-02134
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02134' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02134-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2135] ISBN: CIU-02135
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02135' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02135-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2136] ISBN: CIU-02136
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02136' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02136-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2137] ISBN: CIU-02137
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02137' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02137-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2138] ISBN: CIU-02138
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02138' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02138-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2139] ISBN: CIU-02139
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02139' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02139-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2140] ISBN: CIU-02140
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02140' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02140-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02140-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02140-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02140-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [2141] ISBN: CIU-02141
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02141' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02141-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2142] ISBN: CIU-02142
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02142' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02142-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02142-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02142-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02142-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02142-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [2143] ISBN: CIU-02143
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02143' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02143-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02143-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02143-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02143-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [2144] ISBN: CIU-02144
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02144' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02144-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02144-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02144-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02144-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02144-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [2145] ISBN: CIU-02145
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02145' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02145-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02145-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02145-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02145-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02145-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [2146] ISBN: CIU-02146
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02146' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02146-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2147] ISBN: CIU-02147
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02147' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02147-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2148] ISBN: CIU-02148
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02148' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02148-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02148-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02148-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02148-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02148-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02148-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02148-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02148-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02148-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02148-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02148-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02148-E12', 'Sin asignar', 'disponible');
  END IF;

  -- [2149] ISBN: CIU-02149
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02149' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02149-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2150] ISBN: CIU-02150
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02150' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02150-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2151] ISBN: CIU-02151
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02151' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02151-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2152] ISBN: CIU-02152
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02152' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02152-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2153] ISBN: CIU-02153
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02153' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02153-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2154] ISBN: CIU-02154
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02154' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02154-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2155] ISBN: CIU-02155
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02155' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02155-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2156] ISBN: CIU-02156
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02156' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02156-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2157] ISBN: CIU-02157
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02157' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02157-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2158] ISBN: CIU-02158
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02158' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02158-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2159] ISBN: CIU-02159
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02159' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02159-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2160] ISBN: CIU-02160
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02160' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02160-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02160-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2161] ISBN: CIU-02161
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02161' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02161-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02161-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2162] ISBN: CIU-02162
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02162' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02162-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02162-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2163] ISBN: CIU-02163
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02163' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02163-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2164] ISBN: CIU-02164
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02164' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02164-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02164-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2165] ISBN: CIU-02165
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02165' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02165-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02165-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2166] ISBN: CIU-02166
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02166' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02166-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02166-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2167] ISBN: CIU-02167
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02167' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02167-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2168] ISBN: CIU-02168
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02168' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02168-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02168-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2169] ISBN: CIU-02169
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02169' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02169-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2170] ISBN: CIU-02170
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02170' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02170-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2171] ISBN: CIU-02171
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02171' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02171-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2172] ISBN: CIU-02172
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02172' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02172-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02172-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2173] ISBN: CIU-02173
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02173' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02173-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2174] ISBN: CIU-02174
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02174' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02174-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2175] ISBN: CIU-02175
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02175' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02175-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2176] ISBN: CIU-02176
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02176' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02176-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2177] ISBN: CIU-02177
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02177' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02177-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02177-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2178] ISBN: CIU-02178
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02178' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02178-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2179] ISBN: CIU-02179
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02179' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02179-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2180] ISBN: CIU-02180
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02180' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02180-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2181] ISBN: CIU-02181
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02181' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02181-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2182] ISBN: CIU-02182
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02182' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02182-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2183] ISBN: CIU-02183
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02183' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02183-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2184] ISBN: CIU-02184
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02184' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02184-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2185] ISBN: CIU-02185
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02185' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02185-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2186] ISBN: CIU-02186
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02186' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02186-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2187] ISBN: CIU-02187
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02187' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02187-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2188] ISBN: CIU-02188
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02188' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02188-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02188-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2189] ISBN: CIU-02189
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02189' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02189-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2190] ISBN: CIU-02190
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02190' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02190-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02190-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2191] ISBN: CIU-02191
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02191' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02191-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2192] ISBN: CIU-02192
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02192' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02192-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2193] ISBN: CIU-02193
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02193' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02193-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02193-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2194] ISBN: CIU-02194
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02194' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02194-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02194-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02194-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2195] ISBN: CIU-02195
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02195' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02195-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2196] ISBN: CIU-02196
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02196' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02196-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02196-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02196-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2197] ISBN: CIU-02197
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02197' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02197-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02197-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2198] ISBN: CIU-02198
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02198' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02198-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02198-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2199] ISBN: CIU-02199
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02199' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02199-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02199-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2200] ISBN: CIU-02200
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02200' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02200-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02200-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02200-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02200-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [2201] ISBN: CIU-02201
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02201' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02201-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2202] ISBN: CIU-02202
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02202' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02202-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2203] ISBN: CIU-02203
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02203' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02203-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02203-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2204] ISBN: CIU-02204
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02204' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02204-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2205] ISBN: CIU-02205
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02205' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02205-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2206] ISBN: CIU-02206
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02206' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02206-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2207] ISBN: CIU-02207
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02207' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02207-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2208] ISBN: CIU-02208
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02208' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02208-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2209] ISBN: CIU-02209
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02209' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02209-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2210] ISBN: CIU-02210
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02210' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02210-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2211] ISBN: CIU-02211
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02211' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02211-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2212] ISBN: CIU-02212
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02212' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02212-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02212-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2213] ISBN: CIU-02213
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02213' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02213-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02213-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2214] ISBN: CIU-02214
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02214' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02214-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02214-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2215] ISBN: CIU-02215
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02215' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02215-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02215-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2216] ISBN: CIU-02216
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02216' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02216-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2217] ISBN: CIU-02217
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02217' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02217-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E22', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E23', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E24', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E25', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E26', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E27', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E28', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E29', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E30', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E31', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E32', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E33', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E34', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E35', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E36', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E37', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E38', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E39', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02217-E40', 'Sin asignar', 'disponible');
  END IF;

  -- [2218] ISBN: CIU-02218
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02218' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02218-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02218-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2219] ISBN: CIU-02219
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02219' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02219-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02219-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2220] ISBN: CIU-02220
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02220' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02220-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2221] ISBN: CIU-02221
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02221' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02221-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2222] ISBN: CIU-02222
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02222' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02222-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02222-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02222-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2223] ISBN: CIU-02223
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02223' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02223-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2224] ISBN: CIU-02224
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02224' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02224-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02224-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02224-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02224-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [2225] ISBN: CIU-02225
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02225' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02225-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02225-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2226] ISBN: CIU-02226
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02226' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02226-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02226-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2227] ISBN: CIU-02227
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02227' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02227-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02227-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2228] ISBN: CIU-02228
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02228' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02228-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2229] ISBN: CIU-02229
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02229' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02229-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02229-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2230] ISBN: CIU-02230
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02230' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02230-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02230-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2231] ISBN: CIU-02231
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02231' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02231-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02231-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2232] ISBN: CIU-02232
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02232' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02232-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02232-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2233] ISBN: CIU-02233
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02233' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02233-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02233-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02233-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02233-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [2234] ISBN: CIU-02234
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02234' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02234-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2235] ISBN: CIU-02235
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02235' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02235-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2236] ISBN: CIU-02236
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02236' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02236-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2237] ISBN: CIU-02237
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02237' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02237-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02237-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02237-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2238] ISBN: CIU-02238
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02238' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02238-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02238-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2239] ISBN: CIU-02239
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02239' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02239-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02239-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2240] ISBN: CIU-02240
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02240' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02240-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02240-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2241] ISBN: CIU-02241
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02241' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02241-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02241-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2242] ISBN: CIU-02242
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02242' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02242-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02242-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2243] ISBN: CIU-02243
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02243' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02243-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02243-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2244] ISBN: CIU-02244
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02244' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02244-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02244-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2245] ISBN: CIU-02245
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02245' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02245-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02245-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2246] ISBN: CIU-02246
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02246' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02246-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02246-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2247] ISBN: CIU-02247
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02247' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02247-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02247-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2248] ISBN: CIU-02248
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02248' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02248-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02248-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2249] ISBN: CIU-02249
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02249' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02249-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2250] ISBN: CIU-02250
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02250' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02250-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2251] ISBN: CIU-02251
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02251' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02251-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2252] ISBN: CIU-02252
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02252' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02252-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2253] ISBN: CIU-02253
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02253' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02253-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2254] ISBN: CIU-02254
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02254' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02254-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2255] ISBN: CIU-02255
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02255' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02255-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02255-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2256] ISBN: CIU-02256
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02256' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02256-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2257] ISBN: CIU-02257
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02257' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02257-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02257-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2258] ISBN: CIU-02258
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02258' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02258-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2259] ISBN: CIU-02259
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02259' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02259-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02259-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2260] ISBN: CIU-02260
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02260' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02260-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02260-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2261] ISBN: CIU-02261
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02261' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02261-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02261-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2262] ISBN: CIU-02262
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02262' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02262-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2263] ISBN: CIU-02263
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02263' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02263-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02263-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02263-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2264] ISBN: CIU-02264
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02264' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02264-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2265] ISBN: CIU-02265
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02265' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02265-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02265-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2266] ISBN: CIU-02266
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02266' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02266-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2267] ISBN: CIU-02267
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02267' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02267-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2268] ISBN: CIU-02268
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02268' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02268-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02268-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2269] ISBN: CIU-02269
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02269' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02269-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2270] ISBN: CIU-02270
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02270' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02270-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02270-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2271] ISBN: CIU-02271
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02271' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02271-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02271-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2272] ISBN: CIU-02272
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02272' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02272-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02272-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2273] ISBN: CIU-02273
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02273' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02273-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02273-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2274] ISBN: CIU-02274
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02274' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02274-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02274-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02274-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2275] ISBN: CIU-02275
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02275' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02275-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02275-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2276] ISBN: CIU-02276
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02276' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02276-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2277] ISBN: CIU-02277
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02277' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02277-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2278] ISBN: CIU-02278
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02278' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02278-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02278-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2279] ISBN: CIU-02279
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02279' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02279-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02279-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02279-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2280] ISBN: CIU-02280
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02280' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02280-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02280-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2281] ISBN: CIU-02281
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02281' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02281-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2282] ISBN: CIU-02282
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02282' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02282-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2283] ISBN: CIU-02283
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02283' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02283-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02283-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02283-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02283-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [2284] ISBN: CIU-02284
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02284' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02284-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02284-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02284-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02284-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [2285] ISBN: CIU-02285
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02285' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02285-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02285-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2286] ISBN: CIU-02286
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02286' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02286-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2287] ISBN: CIU-02287
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02287' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02287-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02287-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2288] ISBN: CIU-02288
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02288' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02288-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2289] ISBN: CIU-02289
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02289' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02289-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02289-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02289-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [2290] ISBN: CIU-02290
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02290' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02290-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02290-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02290-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02290-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [2291] ISBN: CIU-02291
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02291' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02291-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2292] ISBN: CIU-02292
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02292' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02292-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02292-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2293] ISBN: CIU-02293
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02293' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02293-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2294] ISBN: CIU-02294
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02294' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02294-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2295] ISBN: CIU-02295
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02295' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02295-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2296] ISBN: CIU-02296
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02296' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02296-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2297] ISBN: CIU-02297
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02297' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02297-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2298] ISBN: CIU-02298
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02298' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02298-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2299] ISBN: CIU-02299
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02299' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02299-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2300] ISBN: CIU-02300
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02300' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02300-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2301] ISBN: CIU-02301
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02301' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02301-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2302] ISBN: CIU-02302
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02302' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02302-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2303] ISBN: CIU-02303
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02303' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02303-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2304] ISBN: CIU-02304
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02304' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02304-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2305] ISBN: CIU-02305
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02305' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02305-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2306] ISBN: CIU-02306
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02306' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02306-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2307] ISBN: CIU-02307
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02307' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02307-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2308] ISBN: CIU-02308
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02308' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02308-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2309] ISBN: CIU-02309
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02309' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02309-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2310] ISBN: CIU-02310
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02310' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02310-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2311] ISBN: CIU-02311
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02311' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02311-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2312] ISBN: CIU-02312
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02312' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02312-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02312-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2313] ISBN: CIU-02313
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02313' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02313-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2314] ISBN: CIU-02314
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02314' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02314-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2315] ISBN: CIU-02315
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02315' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02315-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2316] ISBN: CIU-02316
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02316' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02316-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2317] ISBN: CIU-02317
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02317' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02317-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2318] ISBN: CIU-02318
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02318' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02318-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2319] ISBN: CIU-02319
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02319' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02319-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2320] ISBN: CIU-02320
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02320' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02320-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2321] ISBN: CIU-02321
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02321' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02321-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2322] ISBN: CIU-02322
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02322' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02322-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02322-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2323] ISBN: CIU-02323
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02323' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02323-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2324] ISBN: CIU-02324
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02324' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02324-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2325] ISBN: CIU-02325
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02325' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02325-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2326] ISBN: CIU-02326
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02326' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02326-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2327] ISBN: CIU-02327
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02327' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02327-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2328] ISBN: CIU-02328
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02328' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02328-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2329] ISBN: CIU-02329
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02329' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02329-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2330] ISBN: CIU-02330
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02330' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02330-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2331] ISBN: CIU-02331
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02331' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02331-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2332] ISBN: CIU-02332
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02332' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02332-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2333] ISBN: CIU-02333
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02333' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02333-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2334] ISBN: CIU-02334
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02334' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02334-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2335] ISBN: CIU-02335
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02335' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02335-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2336] ISBN: CIU-02336
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02336' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02336-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2337] ISBN: CIU-02337
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02337' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02337-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2338] ISBN: CIU-02338
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02338' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02338-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2339] ISBN: CIU-02339
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02339' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02339-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2340] ISBN: CIU-02340
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02340' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02340-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2341] ISBN: CIU-02341
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02341' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02341-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2342] ISBN: CIU-02342
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02342' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02342-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2343] ISBN: CIU-02343
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02343' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02343-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2344] ISBN: CIU-02344
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02344' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02344-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2345] ISBN: CIU-02345
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02345' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02345-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2346] ISBN: CIU-02346
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02346' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02346-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2347] ISBN: CIU-02347
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02347' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02347-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2348] ISBN: CIU-02348
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02348' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02348-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2349] ISBN: CIU-02349
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02349' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02349-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2350] ISBN: CIU-02350
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02350' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02350-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2351] ISBN: CIU-02351
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02351' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02351-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2352] ISBN: CIU-02352
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02352' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02352-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2353] ISBN: CIU-02353
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02353' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02353-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2354] ISBN: CIU-02354
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02354' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02354-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2355] ISBN: CIU-02355
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02355' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02355-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2356] ISBN: CIU-02356
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02356' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02356-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2357] ISBN: CIU-02357
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02357' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02357-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2358] ISBN: CIU-02358
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02358' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02358-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2359] ISBN: CIU-02359
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02359' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02359-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2360] ISBN: CIU-02360
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02360' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02360-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2361] ISBN: CIU-02361
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02361' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02361-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2362] ISBN: CIU-02362
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02362' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02362-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2363] ISBN: CIU-02363
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02363' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02363-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2364] ISBN: CIU-02364
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02364' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02364-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2365] ISBN: CIU-02365
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02365' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02365-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2366] ISBN: CIU-02366
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02366' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02366-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02366-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2367] ISBN: CIU-02367
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02367' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02367-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2368] ISBN: CIU-02368
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02368' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02368-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02368-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2369] ISBN: CIU-02369
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02369' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02369-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2370] ISBN: CIU-02370
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02370' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02370-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2371] ISBN: CIU-02371
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02371' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02371-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2372] ISBN: CIU-02372
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02372' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02372-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2373] ISBN: CIU-02373
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02373' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02373-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2374] ISBN: CIU-02374
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02374' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02374-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2375] ISBN: CIU-02375
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02375' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02375-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2376] ISBN: CIU-02376
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02376' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02376-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2377] ISBN: CIU-02377
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02377' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02377-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2378] ISBN: CIU-02378
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02378' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02378-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2379] ISBN: CIU-02379
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02379' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02379-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2380] ISBN: CIU-02380
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02380' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02380-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2381] ISBN: CIU-02381
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02381' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02381-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2382] ISBN: CIU-02382
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02382' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02382-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02382-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2383] ISBN: CIU-02383
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02383' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02383-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2384] ISBN: CIU-02384
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02384' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02384-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02384-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [2385] ISBN: CIU-02385
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02385' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02385-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2386] ISBN: CIU-02386
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02386' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02386-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2387] ISBN: CIU-02387
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02387' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02387-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2388] ISBN: CIU-02388
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02388' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02388-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2389] ISBN: CIU-02389
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02389' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02389-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2390] ISBN: CIU-02390
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02390' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02390-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2391] ISBN: CIU-02391
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02391' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02391-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2392] ISBN: CIU-02392
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02392' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02392-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2393] ISBN: CIU-02393
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02393' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02393-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2394] ISBN: CIU-02394
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02394' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02394-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2395] ISBN: CIU-02395
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02395' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02395-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2396] ISBN: CIU-02396
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02396' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02396-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2397] ISBN: CIU-02397
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02397' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02397-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2398] ISBN: CIU-02398
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02398' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02398-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2399] ISBN: CIU-02399
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02399' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02399-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2400] ISBN: CIU-02400
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02400' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02400-E01', 'Sin asignar', 'disponible');
  END IF;


END $$;
