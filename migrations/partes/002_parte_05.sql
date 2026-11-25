-- Parte 5 de 7 (400 libros)
DO $$
DECLARE v_lid UUID;
BEGIN

  -- [1601] ISBN: CIU-01601
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01601' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01601-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1602] ISBN: CIU-01602
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01602' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01602-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1603] ISBN: CIU-01603
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01603' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01603-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1604] ISBN: CIU-01604
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01604' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01604-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1605] ISBN: CIU-01605
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01605' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01605-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01605-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01605-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1606] ISBN: CIU-01606
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01606' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01606-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01606-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01606-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1607] ISBN: CIU-01607
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01607' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01607-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01607-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01607-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1608] ISBN: CIU-01608
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01608' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01608-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01608-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01608-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1609] ISBN: CIU-01609
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01609' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01609-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01609-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01609-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1610] ISBN: CIU-01610
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01610' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01610-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1611] ISBN: CIU-01611
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01611' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01611-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1612] ISBN: CIU-01612
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01612' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01612-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1613] ISBN: CIU-01613
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01613' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01613-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1614] ISBN: CIU-01614
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01614' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01614-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1615] ISBN: CIU-01615
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01615' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01615-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1616] ISBN: CIU-01616
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01616' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01616-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1617] ISBN: CIU-01617
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01617' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01617-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1618] ISBN: CIU-01618
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01618' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01618-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1619] ISBN: CIU-01619
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01619' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01619-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1620] ISBN: CIU-01620
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01620' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01620-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1621] ISBN: CIU-01621
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01621' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01621-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1622] ISBN: CIU-01622
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01622' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01622-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1623] ISBN: CIU-01623
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01623' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01623-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01623-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1624] ISBN: CIU-01624
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01624' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01624-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01624-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1625] ISBN: CIU-01625
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01625' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01625-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1626] ISBN: CIU-01626
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01626' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01626-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1627] ISBN: CIU-01627
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01627' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01627-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1628] ISBN: CIU-01628
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01628' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01628-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1629] ISBN: CIU-01629
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01629' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01629-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01629-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01629-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1630] ISBN: CIU-01630
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01630' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01630-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1631] ISBN: CIU-01631
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01631' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01631-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1632] ISBN: CIU-01632
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01632' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01632-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1633] ISBN: CIU-01633
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01633' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01633-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1634] ISBN: CIU-01634
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01634' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01634-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01634-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1635] ISBN: CIU-01635
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01635' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01635-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1636] ISBN: CIU-01636
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01636' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01636-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1637] ISBN: CIU-01637
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01637' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01637-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1638] ISBN: CIU-01638
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01638' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01638-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1639] ISBN: CIU-01639
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01639' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01639-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1640] ISBN: CIU-01640
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01640' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01640-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01640-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01640-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01640-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01640-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01640-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01640-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01640-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01640-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01640-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1641] ISBN: CIU-01641
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01641' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01641-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01641-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01641-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01641-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01641-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01641-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01641-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01641-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01641-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01641-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01641-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01641-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01641-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01641-E14', 'Sin asignar', 'disponible');
  END IF;

  -- [1642] ISBN: CIU-01642
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01642' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01642-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01642-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01642-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01642-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01642-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01642-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01642-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01642-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1643] ISBN: CIU-01643
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01643' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01643-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01643-E22', 'Sin asignar', 'disponible');
  END IF;

  -- [1644] ISBN: CIU-01644
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01644' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01644-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01644-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01644-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01644-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01644-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01644-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01644-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01644-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1645] ISBN: CIU-01645
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01645' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01645-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01645-E18', 'Sin asignar', 'disponible');
  END IF;

  -- [1646] ISBN: CIU-01646
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01646' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01646-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01646-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01646-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01646-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01646-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01646-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01646-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01646-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01646-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01646-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1647] ISBN: CIU-01647
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01647' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01647-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01647-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1648] ISBN: CIU-01648
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01648' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01648-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01648-E19', 'Sin asignar', 'disponible');
  END IF;

  -- [1649] ISBN: CIU-01649
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01649' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01649-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01649-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1650] ISBN: CIU-01650
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01650' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01650-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01650-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01650-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01650-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01650-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01650-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01650-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01650-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01650-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01650-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01650-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01650-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01650-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01650-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01650-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01650-E16', 'Sin asignar', 'disponible');
  END IF;

  -- [1651] ISBN: CIU-01651
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01651' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01651-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01651-E22', 'Sin asignar', 'disponible');
  END IF;

  -- [1652] ISBN: CIU-01652
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01652' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01652-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01652-E21', 'Sin asignar', 'disponible');
  END IF;

  -- [1653] ISBN: CIU-01653
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01653' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01653-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E22', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E23', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E24', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E25', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E26', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E27', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E28', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E29', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01653-E30', 'Sin asignar', 'disponible');
  END IF;

  -- [1654] ISBN: CIU-01654
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01654' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01654-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E22', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E23', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E24', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E25', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E26', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E27', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E28', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E29', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01654-E30', 'Sin asignar', 'disponible');
  END IF;

  -- [1655] ISBN: CIU-01655
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01655' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01655-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E22', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E23', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E24', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E25', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E26', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E27', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E28', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E29', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01655-E30', 'Sin asignar', 'disponible');
  END IF;

  -- [1656] ISBN: CIU-01656
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01656' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01656-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01656-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01656-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01656-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01656-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01656-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01656-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01656-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01656-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01656-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01656-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01656-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01656-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01656-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01656-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01656-E16', 'Sin asignar', 'disponible');
  END IF;

  -- [1657] ISBN: CIU-01657
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01657' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01657-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01657-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1658] ISBN: CIU-01658
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01658' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01658-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01658-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01658-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01658-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1659] ISBN: CIU-01659
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01659' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01659-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01659-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01659-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01659-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1660] ISBN: CIU-01660
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01660' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01660-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01660-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01660-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1661] ISBN: CIU-01661
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01661' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01661-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01661-E22', 'Sin asignar', 'disponible');
  END IF;

  -- [1662] ISBN: CIU-01662
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01662' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01662-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01662-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01662-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01662-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1663] ISBN: CIU-01663
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01663' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01663-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01663-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01663-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01663-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01663-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01663-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01663-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01663-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01663-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01663-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1664] ISBN: CIU-01664
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01664' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01664-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01664-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1665] ISBN: CIU-01665
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01665' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01665-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01665-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01665-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01665-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01665-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01665-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01665-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01665-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1666] ISBN: CIU-01666
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01666' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01666-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01666-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01666-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01666-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01666-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01666-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01666-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01666-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01666-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01666-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1667] ISBN: CIU-01667
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01667' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01667-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01667-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01667-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01667-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01667-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01667-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01667-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01667-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1668] ISBN: CIU-01668
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01668' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01668-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01668-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01668-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01668-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1669] ISBN: CIU-01669
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01669' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01669-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01669-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01669-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01669-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1670] ISBN: CIU-01670
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01670' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01670-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01670-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01670-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01670-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01670-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01670-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01670-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01670-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1671] ISBN: CIU-01671
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01671' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01671-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01671-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01671-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01671-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1672] ISBN: CIU-01672
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01672' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01672-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01672-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01672-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01672-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01672-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01672-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01672-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01672-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1673] ISBN: CIU-01673
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01673' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01673-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01673-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01673-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01673-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01673-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01673-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01673-E07', 'Sin asignar', 'disponible');
  END IF;

  -- [1674] ISBN: CIU-01674
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01674' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01674-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01674-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1675] ISBN: CIU-01675
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01675' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01675-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1676] ISBN: CIU-01676
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01676' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01676-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01676-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1677] ISBN: CIU-01677
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01677' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01677-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01677-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01677-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01677-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01677-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01677-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [1678] ISBN: CIU-01678
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01678' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01678-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01678-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01678-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01678-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01678-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1679] ISBN: CIU-01679
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01679' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01679-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01679-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01679-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01679-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01679-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01679-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01679-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01679-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01679-E09', 'Sin asignar', 'disponible');
  END IF;

  -- [1680] ISBN: CIU-01680
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01680' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01680-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01680-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1681] ISBN: CIU-01681
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01681' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01681-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01681-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1682] ISBN: CIU-01682
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01682' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01682-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01682-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01682-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01682-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01682-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01682-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01682-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01682-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01682-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01682-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1683] ISBN: CIU-01683
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01683' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01683-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01683-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01683-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01683-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01683-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1684] ISBN: CIU-01684
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01684' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01684-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01684-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01684-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1685] ISBN: CIU-01685
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01685' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01685-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01685-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01685-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01685-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1686] ISBN: CIU-01686
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01686' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01686-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01686-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1687] ISBN: CIU-01687
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01687' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01687-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01687-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1688] ISBN: CIU-01688
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01688' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01688-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01688-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01688-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1689] ISBN: CIU-01689
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01689' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01689-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01689-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01689-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01689-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01689-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01689-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [1690] ISBN: CIU-01690
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01690' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01690-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01690-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01690-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01690-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1691] ISBN: CIU-01691
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01691' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01691-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01691-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01691-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01691-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1692] ISBN: CIU-01692
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01692' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01692-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01692-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01692-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1693] ISBN: CIU-01693
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01693' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01693-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01693-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01693-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01693-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01693-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01693-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01693-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01693-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01693-E09', 'Sin asignar', 'disponible');
  END IF;

  -- [1694] ISBN: CIU-01694
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01694' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01694-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01694-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1695] ISBN: CIU-01695
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01695' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01695-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1696] ISBN: CIU-01696
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01696' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01696-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01696-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01696-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01696-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1697] ISBN: CIU-01697
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01697' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01697-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01697-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01697-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01697-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1698] ISBN: CIU-01698
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01698' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01698-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01698-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1699] ISBN: CIU-01699
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01699' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01699-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1700] ISBN: CIU-01700
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01700' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01700-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01700-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01700-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1701] ISBN: CIU-01701
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01701' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01701-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01701-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01701-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01701-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01701-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01701-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [1702] ISBN: CIU-01702
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01702' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01702-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1703] ISBN: CIU-01703
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01703' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01703-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01703-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1704] ISBN: CIU-01704
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01704' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01704-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1705] ISBN: CIU-01705
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01705' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01705-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1706] ISBN: CIU-01706
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01706' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01706-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1707] ISBN: CIU-01707
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01707' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01707-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01707-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1708] ISBN: CIU-01708
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01708' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01708-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1709] ISBN: CIU-01709
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01709' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01709-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1710] ISBN: CIU-01710
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01710' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01710-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1711] ISBN: CIU-01711
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01711' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01711-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1712] ISBN: CIU-01712
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01712' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01712-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1713] ISBN: CIU-01713
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01713' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01713-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1714] ISBN: CIU-01714
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01714' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01714-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1715] ISBN: CIU-01715
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01715' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01715-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1716] ISBN: CIU-01716
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01716' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01716-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1717] ISBN: CIU-01717
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01717' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01717-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01717-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01717-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1718] ISBN: CIU-01718
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01718' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01718-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01718-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01718-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1719] ISBN: CIU-01719
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01719' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01719-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1720] ISBN: CIU-01720
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01720' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01720-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1721] ISBN: CIU-01721
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01721' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01721-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1722] ISBN: CIU-01722
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01722' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01722-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1723] ISBN: CIU-01723
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01723' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01723-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1724] ISBN: CIU-01724
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01724' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01724-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01724-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01724-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1725] ISBN: CIU-01725
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01725' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01725-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01725-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01725-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1726] ISBN: CIU-01726
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01726' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01726-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01726-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1727] ISBN: CIU-01727
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01727' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01727-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01727-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1728] ISBN: CIU-01728
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01728' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01728-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1729] ISBN: CIU-01729
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01729' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01729-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01729-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1730] ISBN: CIU-01730
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01730' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01730-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1731] ISBN: CIU-01731
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01731' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01731-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01731-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01731-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01731-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1732] ISBN: CIU-01732
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01732' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01732-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1733] ISBN: CIU-01733
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01733' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01733-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01733-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1734] ISBN: CIU-01734
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01734' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01734-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01734-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1735] ISBN: CIU-01735
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01735' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01735-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01735-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1736] ISBN: CIU-01736
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01736' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01736-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01736-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1737] ISBN: CIU-01737
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01737' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01737-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1738] ISBN: CIU-01738
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01738' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01738-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1739] ISBN: CIU-01739
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01739' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01739-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01739-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1740] ISBN: CIU-01740
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01740' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01740-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1741] ISBN: CIU-01741
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01741' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01741-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1742] ISBN: CIU-01742
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01742' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01742-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1743] ISBN: CIU-01743
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01743' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01743-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01743-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1744] ISBN: CIU-01744
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01744' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01744-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1745] ISBN: CIU-01745
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01745' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01745-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01745-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1746] ISBN: CIU-01746
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01746' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01746-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1747] ISBN: CIU-01747
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01747' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01747-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1748] ISBN: CIU-01748
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01748' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01748-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1749] ISBN: CIU-01749
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01749' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01749-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1750] ISBN: CIU-01750
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01750' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01750-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1751] ISBN: CIU-01751
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01751' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01751-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01751-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01751-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1752] ISBN: CIU-01752
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01752' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01752-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01752-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1753] ISBN: CIU-01753
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01753' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01753-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1754] ISBN: CIU-01754
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01754' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01754-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1755] ISBN: CIU-01755
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01755' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01755-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1756] ISBN: CIU-01756
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01756' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01756-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01756-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01756-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01756-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01756-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01756-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01756-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01756-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1757] ISBN: CIU-01757
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01757' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01757-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01757-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01757-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01757-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1758] ISBN: CIU-01758
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01758' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01758-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01758-E22', 'Sin asignar', 'disponible');
  END IF;

  -- [1759] ISBN: CIU-01759
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01759' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01759-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01759-E19', 'Sin asignar', 'disponible');
  END IF;

  -- [1760] ISBN: CIU-01760
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01760' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01760-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01760-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1761] ISBN: CIU-01761
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01761' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01761-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01761-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01761-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01761-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01761-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01761-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01761-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01761-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01761-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01761-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01761-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01761-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01761-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01761-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01761-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01761-E16', 'Sin asignar', 'disponible');
  END IF;

  -- [1762] ISBN: CIU-01762
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01762' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01762-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01762-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01762-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01762-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01762-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01762-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01762-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01762-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1763] ISBN: CIU-01763
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01763' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01763-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01763-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01763-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01763-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01763-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01763-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01763-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01763-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01763-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01763-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1764] ISBN: CIU-01764
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01764' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01764-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01764-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01764-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1765] ISBN: CIU-01765
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01765' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01765-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01765-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01765-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01765-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01765-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01765-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01765-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01765-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01765-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01765-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01765-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01765-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01765-E13', 'Sin asignar', 'disponible');
  END IF;

  -- [1766] ISBN: CIU-01766
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01766' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01766-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01766-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01766-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01766-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01766-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01766-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01766-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01766-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01766-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01766-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01766-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01766-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01766-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01766-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01766-E15', 'Sin asignar', 'disponible');
  END IF;

  -- [1767] ISBN: CIU-01767
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01767' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01767-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01767-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01767-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01767-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1768] ISBN: CIU-01768
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01768' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01768-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01768-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01768-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01768-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01768-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01768-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01768-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01768-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01768-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01768-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1769] ISBN: CIU-01769
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01769' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01769-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01769-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01769-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01769-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01769-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01769-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01769-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01769-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01769-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01769-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1770] ISBN: CIU-01770
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01770' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01770-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01770-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01770-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01770-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01770-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01770-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01770-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01770-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01770-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01770-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1771] ISBN: CIU-01771
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01771' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01771-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01771-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01771-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01771-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01771-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01771-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01771-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01771-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01771-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01771-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1772] ISBN: CIU-01772
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01772' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01772-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01772-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01772-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01772-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01772-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01772-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01772-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01772-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01772-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01772-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1773] ISBN: CIU-01773
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01773' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01773-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01773-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01773-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01773-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01773-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01773-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01773-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01773-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01773-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01773-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01773-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01773-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01773-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01773-E14', 'Sin asignar', 'disponible');
  END IF;

  -- [1774] ISBN: CIU-01774
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01774' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01774-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01774-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01774-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01774-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01774-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01774-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01774-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01774-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01774-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01774-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1775] ISBN: CIU-01775
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01775' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01775-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01775-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01775-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01775-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01775-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01775-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01775-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01775-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01775-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01775-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1776] ISBN: CIU-01776
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01776' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01776-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01776-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01776-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01776-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01776-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01776-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01776-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01776-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01776-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01776-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1777] ISBN: CIU-01777
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01777' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01777-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01777-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01777-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1778] ISBN: CIU-01778
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01778' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01778-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01778-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01778-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01778-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1779] ISBN: CIU-01779
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01779' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01779-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01779-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01779-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01779-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1780] ISBN: CIU-01780
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01780' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01780-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01780-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01780-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01780-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1781] ISBN: CIU-01781
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01781' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01781-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01781-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01781-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01781-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1782] ISBN: CIU-01782
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01782' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01782-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01782-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01782-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01782-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01782-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1783] ISBN: CIU-01783
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01783' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01783-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01783-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1784] ISBN: CIU-01784
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01784' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01784-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01784-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1785] ISBN: CIU-01785
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01785' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01785-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01785-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1786] ISBN: CIU-01786
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01786' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01786-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01786-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01786-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01786-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01786-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01786-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01786-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01786-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01786-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01786-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1787] ISBN: CIU-01787
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01787' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01787-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01787-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1788] ISBN: CIU-01788
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01788' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01788-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01788-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01788-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01788-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01788-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01788-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01788-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01788-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01788-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01788-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1789] ISBN: CIU-01789
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01789' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01789-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01789-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01789-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01789-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01789-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01789-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01789-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01789-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1790] ISBN: CIU-01790
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01790' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01790-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01790-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01790-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01790-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1791] ISBN: CIU-01791
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01791' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01791-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01791-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01791-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01791-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01791-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01791-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [1792] ISBN: CIU-01792
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01792' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01792-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01792-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01792-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01792-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1793] ISBN: CIU-01793
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01793' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01793-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1794] ISBN: CIU-01794
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01794' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01794-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01794-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01794-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01794-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1795] ISBN: CIU-01795
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01795' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01795-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01795-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01795-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01795-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01795-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01795-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01795-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01795-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01795-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01795-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01795-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01795-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01795-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01795-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01795-E15', 'Sin asignar', 'disponible');
  END IF;

  -- [1796] ISBN: CIU-01796
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01796' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01796-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01796-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01796-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01796-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01796-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01796-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [1797] ISBN: CIU-01797
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01797' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01797-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01797-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01797-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01797-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01797-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01797-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01797-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01797-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1798] ISBN: CIU-01798
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01798' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01798-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01798-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01798-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1799] ISBN: CIU-01799
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01799' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01799-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01799-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1800] ISBN: CIU-01800
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01800' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01800-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01800-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01800-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01800-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1801] ISBN: CIU-01801
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01801' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01801-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01801-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01801-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01801-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1802] ISBN: CIU-01802
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01802' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01802-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1803] ISBN: CIU-01803
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01803' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01803-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1804] ISBN: CIU-01804
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01804' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01804-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01804-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1805] ISBN: CIU-01805
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01805' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01805-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01805-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01805-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01805-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1806] ISBN: CIU-01806
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01806' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01806-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1807] ISBN: CIU-01807
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01807' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01807-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1808] ISBN: CIU-01808
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01808' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01808-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1809] ISBN: CIU-01809
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01809' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01809-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1810] ISBN: CIU-01810
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01810' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01810-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1811] ISBN: CIU-01811
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01811' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01811-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1812] ISBN: CIU-01812
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01812' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01812-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01812-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01812-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1813] ISBN: CIU-01813
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01813' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01813-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1814] ISBN: CIU-01814
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01814' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01814-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1815] ISBN: CIU-01815
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01815' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01815-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1816] ISBN: CIU-01816
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01816' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01816-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1817] ISBN: CIU-01817
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01817' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01817-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1818] ISBN: CIU-01818
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01818' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01818-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1819] ISBN: CIU-01819
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01819' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01819-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1820] ISBN: CIU-01820
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01820' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01820-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1821] ISBN: CIU-01821
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01821' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01821-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1822] ISBN: CIU-01822
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01822' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01822-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1823] ISBN: CIU-01823
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01823' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01823-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1824] ISBN: CIU-01824
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01824' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01824-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1825] ISBN: CIU-01825
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01825' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01825-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01825-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1826] ISBN: CIU-01826
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01826' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01826-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1827] ISBN: CIU-01827
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01827' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01827-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1828] ISBN: CIU-01828
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01828' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01828-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1829] ISBN: CIU-01829
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01829' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01829-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1830] ISBN: CIU-01830
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01830' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01830-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1831] ISBN: CIU-01831
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01831' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01831-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1832] ISBN: CIU-01832
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01832' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01832-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1833] ISBN: CIU-01833
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01833' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01833-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1834] ISBN: CIU-01834
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01834' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01834-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1835] ISBN: CIU-01835
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01835' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01835-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1836] ISBN: CIU-01836
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01836' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01836-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1837] ISBN: CIU-01837
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01837' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01837-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1838] ISBN: CIU-01838
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01838' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01838-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1839] ISBN: CIU-01839
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01839' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01839-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1840] ISBN: CIU-01840
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01840' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01840-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1841] ISBN: CIU-01841
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01841' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01841-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01841-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01841-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1842] ISBN: CIU-01842
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01842' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01842-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1843] ISBN: CIU-01843
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01843' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01843-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1844] ISBN: CIU-01844
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01844' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01844-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1845] ISBN: CIU-01845
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01845' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01845-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1846] ISBN: CIU-01846
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01846' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01846-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01846-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01846-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01846-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1847] ISBN: CIU-01847
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01847' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01847-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01847-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01847-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1848] ISBN: CIU-01848
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01848' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01848-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01848-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01848-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1849] ISBN: CIU-01849
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01849' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01849-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01849-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01849-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1850] ISBN: CIU-01850
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01850' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01850-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01850-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01850-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1851] ISBN: CIU-01851
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01851' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01851-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01851-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01851-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1852] ISBN: CIU-01852
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01852' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01852-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1853] ISBN: CIU-01853
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01853' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01853-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1854] ISBN: CIU-01854
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01854' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01854-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1855] ISBN: CIU-01855
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01855' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01855-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1856] ISBN: CIU-01856
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01856' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01856-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01856-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01856-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1857] ISBN: CIU-01857
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01857' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01857-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01857-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01857-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1858] ISBN: CIU-01858
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01858' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01858-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1859] ISBN: CIU-01859
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01859' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01859-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1860] ISBN: CIU-01860
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01860' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01860-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1861] ISBN: CIU-01861
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01861' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01861-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1862] ISBN: CIU-01862
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01862' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01862-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1863] ISBN: CIU-01863
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01863' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01863-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1864] ISBN: CIU-01864
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01864' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01864-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01864-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01864-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1865] ISBN: CIU-01865
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01865' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01865-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1866] ISBN: CIU-01866
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01866' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01866-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01866-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01866-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1867] ISBN: CIU-01867
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01867' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01867-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01867-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01867-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1868] ISBN: CIU-01868
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01868' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01868-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1869] ISBN: CIU-01869
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01869' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01869-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1870] ISBN: CIU-01870
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01870' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01870-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1871] ISBN: CIU-01871
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01871' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01871-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01871-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01871-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1872] ISBN: CIU-01872
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01872' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01872-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01872-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01872-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1873] ISBN: CIU-01873
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01873' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01873-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01873-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1874] ISBN: CIU-01874
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01874' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01874-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01874-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01874-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1875] ISBN: CIU-01875
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01875' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01875-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01875-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1876] ISBN: CIU-01876
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01876' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01876-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01876-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1877] ISBN: CIU-01877
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01877' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01877-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01877-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1878] ISBN: CIU-01878
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01878' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01878-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01878-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01878-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1879] ISBN: CIU-01879
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01879' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01879-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01879-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01879-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01879-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01879-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1880] ISBN: CIU-01880
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01880' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01880-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01880-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1881] ISBN: CIU-01881
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01881' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01881-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1882] ISBN: CIU-01882
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01882' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01882-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01882-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1883] ISBN: CIU-01883
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01883' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01883-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01883-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01883-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01883-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01883-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01883-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01883-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01883-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01883-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01883-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01883-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01883-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01883-E13', 'Sin asignar', 'disponible');
  END IF;

  -- [1884] ISBN: CIU-01884
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01884' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01884-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1885] ISBN: CIU-01885
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01885' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01885-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1886] ISBN: CIU-01886
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01886' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01886-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1887] ISBN: CIU-01887
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01887' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01887-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1888] ISBN: CIU-01888
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01888' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01888-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01888-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1889] ISBN: CIU-01889
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01889' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01889-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01889-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1890] ISBN: CIU-01890
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01890' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01890-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01890-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1891] ISBN: CIU-01891
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01891' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01891-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01891-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01891-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01891-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1892] ISBN: CIU-01892
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01892' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01892-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1893] ISBN: CIU-01893
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01893' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01893-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1894] ISBN: CIU-01894
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01894' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01894-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1895] ISBN: CIU-01895
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01895' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01895-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1896] ISBN: CIU-01896
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01896' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01896-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01896-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1897] ISBN: CIU-01897
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01897' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01897-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1898] ISBN: CIU-01898
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01898' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01898-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1899] ISBN: CIU-01899
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01899' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01899-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1900] ISBN: CIU-01900
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01900' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01900-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1901] ISBN: CIU-01901
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01901' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01901-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01901-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1902] ISBN: CIU-01902
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01902' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01902-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01902-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1903] ISBN: CIU-01903
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01903' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01903-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1904] ISBN: CIU-01904
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01904' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01904-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01904-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1905] ISBN: CIU-01905
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01905' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01905-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1906] ISBN: CIU-01906
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01906' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01906-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1907] ISBN: CIU-01907
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01907' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01907-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1908] ISBN: CIU-01908
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01908' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01908-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01908-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1909] ISBN: CIU-01909
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01909' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01909-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1910] ISBN: CIU-01910
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01910' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01910-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01910-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1911] ISBN: CIU-01911
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01911' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01911-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01911-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1912] ISBN: CIU-01912
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01912' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01912-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01912-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01912-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01912-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1913] ISBN: CIU-01913
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01913' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01913-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01913-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01913-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01913-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01913-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01913-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01913-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01913-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1914] ISBN: CIU-01914
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01914' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01914-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01914-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1915] ISBN: CIU-01915
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01915' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01915-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01915-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1916] ISBN: CIU-01916
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01916' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01916-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01916-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1917] ISBN: CIU-01917
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01917' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01917-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01917-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01917-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01917-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01917-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01917-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01917-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01917-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1918] ISBN: CIU-01918
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01918' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01918-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01918-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01918-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01918-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1919] ISBN: CIU-01919
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01919' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01919-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01919-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01919-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01919-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01919-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01919-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01919-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01919-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01919-E09', 'Sin asignar', 'disponible');
  END IF;

  -- [1920] ISBN: CIU-01920
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01920' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01920-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01920-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01920-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01920-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01920-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01920-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01920-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01920-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01920-E09', 'Sin asignar', 'disponible');
  END IF;

  -- [1921] ISBN: CIU-01921
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01921' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01921-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01921-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01921-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01921-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1922] ISBN: CIU-01922
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01922' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01922-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1923] ISBN: CIU-01923
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01923' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01923-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1924] ISBN: CIU-01924
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01924' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01924-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01924-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1925] ISBN: CIU-01925
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01925' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01925-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01925-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1926] ISBN: CIU-01926
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01926' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01926-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01926-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1927] ISBN: CIU-01927
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01927' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01927-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1928] ISBN: CIU-01928
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01928' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01928-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1929] ISBN: CIU-01929
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01929' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01929-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1930] ISBN: CIU-01930
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01930' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01930-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1931] ISBN: CIU-01931
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01931' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01931-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1932] ISBN: CIU-01932
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01932' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01932-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1933] ISBN: CIU-01933
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01933' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01933-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1934] ISBN: CIU-01934
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01934' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01934-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1935] ISBN: CIU-01935
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01935' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01935-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1936] ISBN: CIU-01936
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01936' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01936-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01936-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01936-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1937] ISBN: CIU-01937
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01937' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01937-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01937-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01937-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1938] ISBN: CIU-01938
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01938' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01938-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01938-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01938-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01938-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1939] ISBN: CIU-01939
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01939' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01939-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01939-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1940] ISBN: CIU-01940
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01940' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01940-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01940-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01940-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01940-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01940-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1941] ISBN: CIU-01941
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01941' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01941-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01941-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01941-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01941-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01941-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1942] ISBN: CIU-01942
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01942' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01942-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01942-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01942-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01942-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01942-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1943] ISBN: CIU-01943
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01943' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01943-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01943-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01943-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01943-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01943-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01943-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01943-E07', 'Sin asignar', 'disponible');
  END IF;

  -- [1944] ISBN: CIU-01944
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01944' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01944-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01944-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01944-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1945] ISBN: CIU-01945
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01945' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01945-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01945-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01945-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1946] ISBN: CIU-01946
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01946' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01946-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01946-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01946-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1947] ISBN: CIU-01947
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01947' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01947-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01947-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01947-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1948] ISBN: CIU-01948
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01948' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01948-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01948-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01948-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1949] ISBN: CIU-01949
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01949' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01949-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1950] ISBN: CIU-01950
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01950' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01950-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1951] ISBN: CIU-01951
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01951' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01951-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01951-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01951-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1952] ISBN: CIU-01952
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01952' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01952-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1953] ISBN: CIU-01953
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01953' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01953-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01953-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01953-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1954] ISBN: CIU-01954
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01954' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01954-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1955] ISBN: CIU-01955
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01955' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01955-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1956] ISBN: CIU-01956
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01956' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01956-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1957] ISBN: CIU-01957
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01957' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01957-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1958] ISBN: CIU-01958
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01958' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01958-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1959] ISBN: CIU-01959
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01959' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01959-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1960] ISBN: CIU-01960
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01960' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01960-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1961] ISBN: CIU-01961
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01961' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01961-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01961-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01961-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1962] ISBN: CIU-01962
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01962' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01962-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01962-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1963] ISBN: CIU-01963
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01963' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01963-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1964] ISBN: CIU-01964
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01964' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01964-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1965] ISBN: CIU-01965
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01965' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01965-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01965-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01965-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1966] ISBN: CIU-01966
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01966' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01966-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1967] ISBN: CIU-01967
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01967' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01967-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1968] ISBN: CIU-01968
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01968' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01968-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1969] ISBN: CIU-01969
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01969' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01969-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1970] ISBN: CIU-01970
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01970' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01970-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1971] ISBN: CIU-01971
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01971' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01971-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1972] ISBN: CIU-01972
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01972' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01972-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1973] ISBN: CIU-01973
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01973' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01973-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1974] ISBN: CIU-01974
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01974' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01974-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1975] ISBN: CIU-01975
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01975' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01975-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1976] ISBN: CIU-01976
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01976' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01976-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1977] ISBN: CIU-01977
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01977' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01977-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1978] ISBN: CIU-01978
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01978' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01978-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1979] ISBN: CIU-01979
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01979' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01979-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1980] ISBN: CIU-01980
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01980' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01980-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1981] ISBN: CIU-01981
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01981' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01981-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1982] ISBN: CIU-01982
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01982' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01982-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1983] ISBN: CIU-01983
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01983' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01983-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1984] ISBN: CIU-01984
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01984' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01984-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1985] ISBN: CIU-01985
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01985' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01985-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1986] ISBN: CIU-01986
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01986' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01986-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1987] ISBN: CIU-01987
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01987' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01987-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1988] ISBN: CIU-01988
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01988' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01988-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1989] ISBN: CIU-01989
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01989' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01989-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1990] ISBN: CIU-01990
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01990' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01990-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1991] ISBN: CIU-01991
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01991' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01991-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01991-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1992] ISBN: CIU-01992
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01992' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01992-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01992-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1993] ISBN: CIU-01993
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01993' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01993-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01993-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1994] ISBN: CIU-01994
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01994' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01994-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1995] ISBN: CIU-01995
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01995' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01995-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01995-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1996] ISBN: CIU-01996
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01996' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01996-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1997] ISBN: CIU-01997
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01997' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01997-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01997-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1998] ISBN: CIU-01998
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01998' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01998-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01998-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01998-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01998-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1999] ISBN: CIU-01999
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01999' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01999-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [2000] ISBN: CIU-02000
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-02000' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-02000-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-02000-E02', 'Sin asignar', 'disponible');
  END IF;


END $$;
