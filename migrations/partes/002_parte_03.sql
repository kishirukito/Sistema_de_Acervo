-- Parte 3 de 7 (400 libros)
DO $$
DECLARE v_lid UUID;
BEGIN

  -- [801] ISBN: CIU-00801
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00801' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00801-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00801-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00801-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [802] ISBN: CIU-00802
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00802' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00802-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00802-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [803] ISBN: CIU-00803
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00803' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00803-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00803-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00803-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [804] ISBN: CIU-00804
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00804' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00804-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00804-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00804-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [805] ISBN: CIU-00805
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00805' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00805-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00805-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00805-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [806] ISBN: CIU-00806
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00806' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00806-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00806-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00806-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [807] ISBN: CIU-00807
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00807' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00807-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00807-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00807-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [808] ISBN: CIU-00808
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00808' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00808-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00808-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00808-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [809] ISBN: CIU-00809
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00809' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00809-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00809-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00809-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [810] ISBN: CIU-00810
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00810' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00810-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00810-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00810-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [811] ISBN: CIU-00811
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00811' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00811-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00811-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00811-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [812] ISBN: CIU-00812
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00812' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00812-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [813] ISBN: CIU-00813
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00813' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00813-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00813-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00813-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00813-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00813-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00813-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00813-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00813-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [814] ISBN: CIU-00814
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00814' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00814-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00814-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00814-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [815] ISBN: CIU-00815
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00815' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00815-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00815-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00815-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [816] ISBN: CIU-00816
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00816' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00816-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00816-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00816-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00816-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00816-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00816-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [817] ISBN: CIU-00817
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00817' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00817-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00817-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00817-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00817-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00817-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [818] ISBN: CIU-00818
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00818' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00818-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00818-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [819] ISBN: CIU-00819
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00819' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00819-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00819-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00819-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [820] ISBN: CIU-00820
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00820' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00820-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00820-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00820-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [821] ISBN: CIU-00821
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00821' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00821-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00821-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [822] ISBN: CIU-00822
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00822' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00822-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00822-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00822-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [823] ISBN: CIU-00823
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00823' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00823-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00823-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00823-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [824] ISBN: CIU-00824
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00824' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00824-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00824-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00824-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [825] ISBN: CIU-00825
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00825' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00825-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00825-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00825-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [826] ISBN: CIU-00826
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00826' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00826-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00826-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00826-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [827] ISBN: CIU-00827
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00827' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00827-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00827-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00827-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [828] ISBN: CIU-00828
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00828' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00828-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00828-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00828-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [829] ISBN: CIU-00829
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00829' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00829-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00829-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00829-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [830] ISBN: CIU-00830
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00830' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00830-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00830-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00830-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [831] ISBN: CIU-00831
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00831' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00831-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00831-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00831-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [832] ISBN: CIU-00832
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00832' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00832-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00832-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00832-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [833] ISBN: CIU-00833
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00833' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00833-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00833-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00833-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [834] ISBN: CIU-00834
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00834' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00834-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00834-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00834-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [835] ISBN: CIU-00835
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00835' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00835-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00835-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00835-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [836] ISBN: CIU-00836
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00836' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00836-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00836-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00836-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [837] ISBN: CIU-00837
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00837' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00837-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00837-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00837-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00837-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [838] ISBN: CIU-00838
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00838' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00838-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00838-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00838-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [839] ISBN: CIU-00839
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00839' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00839-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00839-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [840] ISBN: CIU-00840
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00840' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00840-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00840-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00840-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [841] ISBN: CIU-00841
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00841' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00841-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [842] ISBN: CIU-00842
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00842' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00842-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00842-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00842-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [843] ISBN: CIU-00843
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00843' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00843-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00843-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00843-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [844] ISBN: CIU-00844
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00844' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00844-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00844-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00844-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [845] ISBN: CIU-00845
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00845' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00845-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [846] ISBN: CIU-00846
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00846' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00846-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00846-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [847] ISBN: CIU-00847
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00847' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00847-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00847-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00847-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [848] ISBN: CIU-00848
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00848' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00848-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [849] ISBN: CIU-00849
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00849' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00849-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [850] ISBN: CIU-00850
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00850' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00850-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [851] ISBN: CIU-00851
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00851' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00851-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [852] ISBN: CIU-00852
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00852' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00852-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [853] ISBN: CIU-00853
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00853' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00853-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [854] ISBN: CIU-00854
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00854' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00854-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [855] ISBN: CIU-00855
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00855' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00855-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [856] ISBN: CIU-00856
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00856' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00856-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [857] ISBN: CIU-00857
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00857' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00857-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00857-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [858] ISBN: CIU-00858
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00858' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00858-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [859] ISBN: CIU-00859
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00859' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00859-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [860] ISBN: CIU-00860
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00860' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00860-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [861] ISBN: CIU-00861
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00861' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00861-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [862] ISBN: CIU-00862
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00862' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00862-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [863] ISBN: CIU-00863
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00863' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00863-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [864] ISBN: CIU-00864
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00864' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00864-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [865] ISBN: CIU-00865
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00865' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00865-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [866] ISBN: CIU-00866
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00866' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00866-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [867] ISBN: CIU-00867
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00867' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00867-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [868] ISBN: CIU-00868
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00868' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00868-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [869] ISBN: CIU-00869
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00869' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00869-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [870] ISBN: CIU-00870
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00870' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00870-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [871] ISBN: CIU-00871
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00871' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00871-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [872] ISBN: CIU-00872
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00872' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00872-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [873] ISBN: CIU-00873
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00873' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00873-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [874] ISBN: CIU-00874
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00874' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00874-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [875] ISBN: CIU-00875
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00875' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00875-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [876] ISBN: CIU-00876
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00876' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00876-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [877] ISBN: CIU-00877
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00877' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00877-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00877-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [878] ISBN: CIU-00878
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00878' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00878-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [879] ISBN: CIU-00879
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00879' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00879-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [880] ISBN: CIU-00880
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00880' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00880-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00880-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [881] ISBN: CIU-00881
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00881' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00881-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [882] ISBN: CIU-00882
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00882' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00882-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00882-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [883] ISBN: CIU-00883
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00883' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00883-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00883-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [884] ISBN: CIU-00884
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00884' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00884-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00884-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [885] ISBN: CIU-00885
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00885' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00885-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00885-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00885-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [886] ISBN: CIU-00886
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00886' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00886-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [887] ISBN: CIU-00887
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00887' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00887-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00887-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00887-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [888] ISBN: CIU-00888
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00888' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00888-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00888-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00888-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [889] ISBN: CIU-00889
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00889' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00889-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00889-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00889-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [890] ISBN: CIU-00890
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00890' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00890-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00890-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00890-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00890-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00890-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00890-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00890-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00890-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00890-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00890-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [891] ISBN: CIU-00891
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00891' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00891-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00891-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00891-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [892] ISBN: CIU-00892
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00892' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00892-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00892-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00892-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [893] ISBN: CIU-00893
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00893' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00893-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00893-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00893-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [894] ISBN: CIU-00894
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00894' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00894-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00894-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00894-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [895] ISBN: CIU-00895
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00895' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00895-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00895-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [896] ISBN: CIU-00896
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00896' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00896-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00896-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00896-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [897] ISBN: CIU-00897
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00897' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00897-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00897-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00897-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [898] ISBN: CIU-00898
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00898' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00898-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00898-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00898-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [899] ISBN: CIU-00899
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00899' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00899-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00899-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00899-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [900] ISBN: CIU-00900
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00900' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00900-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00900-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00900-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [901] ISBN: CIU-00901
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00901' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00901-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00901-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [902] ISBN: CIU-00902
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00902' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00902-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00902-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00902-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [903] ISBN: CIU-00903
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00903' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00903-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00903-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00903-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00903-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00903-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00903-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00903-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00903-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [904] ISBN: CIU-00904
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00904' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00904-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00904-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00904-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00904-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00904-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [905] ISBN: CIU-00905
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00905' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00905-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00905-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00905-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00905-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00905-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00905-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00905-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00905-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [906] ISBN: CIU-00906
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00906' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00906-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00906-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00906-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [907] ISBN: CIU-00907
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00907' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00907-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00907-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00907-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00907-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00907-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00907-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [908] ISBN: CIU-00908
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00908' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00908-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00908-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00908-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [909] ISBN: CIU-00909
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00909' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00909-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00909-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00909-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [910] ISBN: CIU-00910
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00910' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00910-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00910-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [911] ISBN: CIU-00911
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00911' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00911-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00911-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [912] ISBN: CIU-00912
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00912' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00912-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00912-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [913] ISBN: CIU-00913
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00913' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00913-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00913-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00913-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00913-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00913-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [914] ISBN: CIU-00914
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00914' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00914-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00914-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00914-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00914-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [915] ISBN: CIU-00915
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00915' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00915-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00915-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00915-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00915-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [916] ISBN: CIU-00916
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00916' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00916-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00916-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00916-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00916-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00916-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00916-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00916-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00916-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00916-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00916-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [917] ISBN: CIU-00917
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00917' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00917-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00917-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00917-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [918] ISBN: CIU-00918
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00918' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00918-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00918-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00918-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [919] ISBN: CIU-00919
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00919' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00919-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00919-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00919-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [920] ISBN: CIU-00920
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00920' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00920-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00920-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00920-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [921] ISBN: CIU-00921
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00921' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00921-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00921-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00921-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [922] ISBN: CIU-00922
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00922' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00922-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00922-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00922-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00922-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [923] ISBN: CIU-00923
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00923' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00923-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00923-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00923-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [924] ISBN: CIU-00924
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00924' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00924-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00924-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [925] ISBN: CIU-00925
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00925' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00925-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00925-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00925-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [926] ISBN: CIU-00926
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00926' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00926-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00926-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00926-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [927] ISBN: CIU-00927
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00927' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00927-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [928] ISBN: CIU-00928
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00928' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00928-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00928-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00928-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [929] ISBN: CIU-00929
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00929' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00929-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00929-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [930] ISBN: CIU-00930
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00930' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00930-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00930-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00930-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [931] ISBN: CIU-00931
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00931' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00931-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00931-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00931-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [932] ISBN: CIU-00932
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00932' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00932-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00932-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00932-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [933] ISBN: CIU-00933
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00933' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00933-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [934] ISBN: CIU-00934
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00934' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00934-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00934-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00934-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [935] ISBN: CIU-00935
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00935' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00935-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [936] ISBN: CIU-00936
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00936' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00936-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [937] ISBN: CIU-00937
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00937' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00937-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00937-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [938] ISBN: CIU-00938
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00938' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00938-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [939] ISBN: CIU-00939
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00939' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00939-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [940] ISBN: CIU-00940
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00940' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00940-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [941] ISBN: CIU-00941
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00941' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00941-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [942] ISBN: CIU-00942
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00942' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00942-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [943] ISBN: CIU-00943
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00943' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00943-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [944] ISBN: CIU-00944
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00944' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00944-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [945] ISBN: CIU-00945
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00945' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00945-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [946] ISBN: CIU-00946
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00946' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00946-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [947] ISBN: CIU-00947
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00947' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00947-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [948] ISBN: CIU-00948
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00948' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00948-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [949] ISBN: CIU-00949
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00949' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00949-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [950] ISBN: CIU-00950
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00950' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00950-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [951] ISBN: CIU-00951
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00951' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00951-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [952] ISBN: CIU-00952
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00952' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00952-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [953] ISBN: CIU-00953
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00953' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00953-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [954] ISBN: CIU-00954
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00954' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00954-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00954-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [955] ISBN: CIU-00955
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00955' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00955-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00955-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [956] ISBN: CIU-00956
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00956' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00956-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00956-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [957] ISBN: CIU-00957
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00957' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00957-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00957-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [958] ISBN: CIU-00958
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00958' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00958-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00958-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [959] ISBN: CIU-00959
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00959' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00959-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00959-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00959-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [960] ISBN: CIU-00960
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00960' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00960-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00960-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00960-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [961] ISBN: CIU-00961
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00961' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00961-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00961-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00961-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [962] ISBN: CIU-00962
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00962' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00962-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00962-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00962-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [963] ISBN: CIU-00963
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00963' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00963-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00963-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [964] ISBN: CIU-00964
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00964' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00964-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00964-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00964-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [965] ISBN: CIU-00965
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00965' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00965-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00965-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00965-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [966] ISBN: CIU-00966
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00966' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00966-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00966-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00966-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [967] ISBN: CIU-00967
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00967' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00967-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00967-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00967-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [968] ISBN: CIU-00968
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00968' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00968-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00968-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00968-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [969] ISBN: CIU-00969
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00969' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00969-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E21', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00969-E22', 'Sin asignar', 'disponible');
  END IF;

  -- [970] ISBN: CIU-00970
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00970' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00970-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00970-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00970-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [971] ISBN: CIU-00971
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00971' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00971-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00971-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00971-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00971-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00971-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00971-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00971-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00971-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00971-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00971-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [972] ISBN: CIU-00972
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00972' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00972-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00972-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00972-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00972-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00972-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00972-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00972-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00972-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [973] ISBN: CIU-00973
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00973' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00973-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00973-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [974] ISBN: CIU-00974
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00974' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00974-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00974-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00974-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00974-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00974-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00974-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00974-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00974-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00974-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00974-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [975] ISBN: CIU-00975
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00975' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00975-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [976] ISBN: CIU-00976
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00976' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00976-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00976-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00976-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00976-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00976-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00976-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00976-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00976-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [977] ISBN: CIU-00977
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00977' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00977-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00977-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00977-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00977-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [978] ISBN: CIU-00978
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00978' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00978-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00978-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00978-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00978-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00978-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00978-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00978-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00978-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [979] ISBN: CIU-00979
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00979' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00979-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00979-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00979-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00979-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00979-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00979-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00979-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00979-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [980] ISBN: CIU-00980
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00980' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00980-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00980-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00980-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [981] ISBN: CIU-00981
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00981' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00981-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00981-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00981-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00981-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00981-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00981-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00981-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00981-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [982] ISBN: CIU-00982
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00982' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00982-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00982-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00982-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00982-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [983] ISBN: CIU-00983
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00983' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00983-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [984] ISBN: CIU-00984
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00984' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00984-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00984-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00984-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [985] ISBN: CIU-00985
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00985' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00985-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00985-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00985-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [986] ISBN: CIU-00986
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00986' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00986-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00986-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00986-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [987] ISBN: CIU-00987
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00987' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00987-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00987-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00987-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [988] ISBN: CIU-00988
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00988' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00988-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00988-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00988-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00988-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [989] ISBN: CIU-00989
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00989' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00989-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [990] ISBN: CIU-00990
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00990' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00990-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00990-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00990-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00990-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00990-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [991] ISBN: CIU-00991
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00991' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00991-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00991-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00991-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [992] ISBN: CIU-00992
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00992' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00992-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00992-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00992-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00992-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00992-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00992-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00992-E07', 'Sin asignar', 'disponible');
  END IF;

  -- [993] ISBN: CIU-00993
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00993' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00993-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [994] ISBN: CIU-00994
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00994' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00994-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00994-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00994-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00994-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00994-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00994-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00994-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00994-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00994-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00994-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00994-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00994-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00994-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00994-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00994-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00994-E16', 'Sin asignar', 'disponible');
  END IF;

  -- [995] ISBN: CIU-00995
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00995' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00995-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00995-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00995-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00995-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00995-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00995-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00995-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00995-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00995-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00995-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [996] ISBN: CIU-00996
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00996' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00996-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [997] ISBN: CIU-00997
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00997' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00997-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00997-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [998] ISBN: CIU-00998
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00998' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00998-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00998-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [999] ISBN: CIU-00999
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-00999' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-00999-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00999-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00999-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00999-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-00999-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1000] ISBN: CIU-01000
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01000' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01000-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01000-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01000-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1001] ISBN: CIU-01001
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01001' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01001-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01001-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01001-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1002] ISBN: CIU-01002
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01002' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01002-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01002-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01002-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1003] ISBN: CIU-01003
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01003' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01003-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01003-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01003-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1004] ISBN: CIU-01004
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01004' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01004-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01004-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01004-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1005] ISBN: CIU-01005
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01005' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01005-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01005-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01005-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1006] ISBN: CIU-01006
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01006' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01006-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01006-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01006-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1007] ISBN: CIU-01007
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01007' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01007-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01007-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01007-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1008] ISBN: CIU-01008
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01008' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01008-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01008-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01008-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01008-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01008-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1009] ISBN: CIU-01009
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01009' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01009-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01009-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01009-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1010] ISBN: CIU-01010
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01010' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01010-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01010-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01010-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1011] ISBN: CIU-01011
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01011' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01011-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01011-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01011-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1012] ISBN: CIU-01012
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01012' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01012-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01012-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01012-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1013] ISBN: CIU-01013
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01013' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01013-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01013-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01013-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1014] ISBN: CIU-01014
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01014' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01014-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01014-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01014-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1015] ISBN: CIU-01015
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01015' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01015-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01015-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01015-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1016] ISBN: CIU-01016
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01016' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01016-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1017] ISBN: CIU-01017
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01017' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01017-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01017-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01017-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01017-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1018] ISBN: CIU-01018
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01018' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01018-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1019] ISBN: CIU-01019
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01019' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01019-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01019-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1020] ISBN: CIU-01020
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01020' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01020-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01020-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01020-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01020-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01020-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1021] ISBN: CIU-01021
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01021' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01021-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1022] ISBN: CIU-01022
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01022' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01022-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1023] ISBN: CIU-01023
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01023' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01023-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1024] ISBN: CIU-01024
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01024' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01024-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01024-E18', 'Sin asignar', 'disponible');
  END IF;

  -- [1025] ISBN: CIU-01025
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01025' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01025-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1026] ISBN: CIU-01026
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01026' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01026-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1027] ISBN: CIU-01027
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01027' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01027-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01027-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1028] ISBN: CIU-01028
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01028' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01028-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01028-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1029] ISBN: CIU-01029
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01029' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01029-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1030] ISBN: CIU-01030
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01030' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01030-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1031] ISBN: CIU-01031
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01031' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01031-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1032] ISBN: CIU-01032
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01032' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01032-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1033] ISBN: CIU-01033
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01033' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01033-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1034] ISBN: CIU-01034
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01034' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01034-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1035] ISBN: CIU-01035
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01035' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01035-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1036] ISBN: CIU-01036
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01036' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01036-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1037] ISBN: CIU-01037
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01037' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01037-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1038] ISBN: CIU-01038
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01038' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01038-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1039] ISBN: CIU-01039
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01039' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01039-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1040] ISBN: CIU-01040
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01040' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01040-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1041] ISBN: CIU-01041
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01041' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01041-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1042] ISBN: CIU-01042
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01042' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01042-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1043] ISBN: CIU-01043
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01043' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01043-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1044] ISBN: CIU-01044
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01044' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01044-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1045] ISBN: CIU-01045
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01045' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01045-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1046] ISBN: CIU-01046
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01046' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01046-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01046-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1047] ISBN: CIU-01047
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01047' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01047-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01047-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1048] ISBN: CIU-01048
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01048' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01048-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1049] ISBN: CIU-01049
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01049' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01049-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01049-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1050] ISBN: CIU-01050
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01050' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01050-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1051] ISBN: CIU-01051
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01051' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01051-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01051-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01051-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01051-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1052] ISBN: CIU-01052
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01052' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01052-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01052-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1053] ISBN: CIU-01053
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01053' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01053-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1054] ISBN: CIU-01054
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01054' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01054-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01054-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1055] ISBN: CIU-01055
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01055' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01055-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01055-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1056] ISBN: CIU-01056
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01056' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01056-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1057] ISBN: CIU-01057
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01057' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01057-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1058] ISBN: CIU-01058
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01058' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01058-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01058-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01058-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1059] ISBN: CIU-01059
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01059' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01059-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01059-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01059-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1060] ISBN: CIU-01060
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01060' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01060-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01060-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01060-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1061] ISBN: CIU-01061
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01061' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01061-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01061-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1062] ISBN: CIU-01062
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01062' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01062-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01062-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01062-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1063] ISBN: CIU-01063
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01063' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01063-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01063-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01063-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1064] ISBN: CIU-01064
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01064' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01064-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01064-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01064-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1065] ISBN: CIU-01065
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01065' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01065-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01065-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01065-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1066] ISBN: CIU-01066
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01066' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01066-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01066-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01066-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01066-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1067] ISBN: CIU-01067
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01067' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01067-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01067-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01067-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01067-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01067-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01067-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01067-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01067-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01067-E09', 'Sin asignar', 'disponible');
  END IF;

  -- [1068] ISBN: CIU-01068
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01068' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01068-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01068-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01068-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1069] ISBN: CIU-01069
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01069' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01069-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01069-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01069-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01069-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1070] ISBN: CIU-01070
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01070' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01070-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01070-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01070-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1071] ISBN: CIU-01071
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01071' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01071-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01071-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01071-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01071-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01071-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01071-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01071-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01071-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01071-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01071-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1072] ISBN: CIU-01072
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01072' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01072-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01072-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1073] ISBN: CIU-01073
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01073' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01073-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01073-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01073-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1074] ISBN: CIU-01074
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01074' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01074-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01074-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01074-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1075] ISBN: CIU-01075
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01075' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01075-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01075-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01075-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1076] ISBN: CIU-01076
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01076' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01076-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01076-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01076-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1077] ISBN: CIU-01077
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01077' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01077-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01077-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01077-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1078] ISBN: CIU-01078
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01078' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01078-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01078-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01078-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1079] ISBN: CIU-01079
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01079' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01079-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01079-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01079-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1080] ISBN: CIU-01080
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01080' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01080-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01080-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01080-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01080-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01080-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01080-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01080-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01080-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01080-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01080-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01080-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01080-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01080-E13', 'Sin asignar', 'disponible');
  END IF;

  -- [1081] ISBN: CIU-01081
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01081' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01081-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01081-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01081-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01081-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01081-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01081-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01081-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01081-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01081-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01081-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1082] ISBN: CIU-01082
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01082' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01082-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01082-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1083] ISBN: CIU-01083
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01083' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01083-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01083-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01083-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01083-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01083-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01083-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01083-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01083-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01083-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01083-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1084] ISBN: CIU-01084
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01084' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01084-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01084-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01084-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01084-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01084-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01084-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01084-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01084-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01084-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01084-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1085] ISBN: CIU-01085
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01085' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01085-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1086] ISBN: CIU-01086
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01086' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01086-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01086-E20', 'Sin asignar', 'disponible');
  END IF;

  -- [1087] ISBN: CIU-01087
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01087' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01087-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01087-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1088] ISBN: CIU-01088
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01088' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01088-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01088-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01088-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01088-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01088-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01088-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01088-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01088-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01088-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01088-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1089] ISBN: CIU-01089
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01089' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01089-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01089-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01089-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01089-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01089-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01089-E06', 'Sin asignar', 'disponible');
  END IF;

  -- [1090] ISBN: CIU-01090
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01090' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01090-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01090-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01090-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1091] ISBN: CIU-01091
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01091' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01091-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01091-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1092] ISBN: CIU-01092
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01092' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01092-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01092-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01092-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01092-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01092-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01092-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01092-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01092-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1093] ISBN: CIU-01093
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01093' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01093-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01093-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01093-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1094] ISBN: CIU-01094
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01094' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01094-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1095] ISBN: CIU-01095
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01095' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01095-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01095-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01095-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1096] ISBN: CIU-01096
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01096' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01096-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01096-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01096-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1097] ISBN: CIU-01097
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01097' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01097-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01097-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01097-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1098] ISBN: CIU-01098
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01098' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01098-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01098-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01098-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1099] ISBN: CIU-01099
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01099' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01099-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01099-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01099-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1100] ISBN: CIU-01100
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01100' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01100-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01100-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01100-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1101] ISBN: CIU-01101
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01101' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01101-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01101-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01101-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1102] ISBN: CIU-01102
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01102' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01102-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01102-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1103] ISBN: CIU-01103
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01103' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01103-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01103-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01103-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01103-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01103-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01103-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01103-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01103-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01103-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01103-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1104] ISBN: CIU-01104
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01104' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01104-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01104-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01104-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01104-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01104-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01104-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01104-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01104-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01104-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01104-E10', 'Sin asignar', 'disponible');
  END IF;

  -- [1105] ISBN: CIU-01105
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01105' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01105-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E18', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E19', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E20', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01105-E21', 'Sin asignar', 'disponible');
  END IF;

  -- [1106] ISBN: CIU-01106
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01106' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01106-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E08', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E09', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E10', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E11', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E12', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E13', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E14', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E15', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E16', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E17', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01106-E18', 'Sin asignar', 'disponible');
  END IF;

  -- [1107] ISBN: CIU-01107
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01107' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01107-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01107-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01107-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01107-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01107-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01107-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01107-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01107-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1108] ISBN: CIU-01108
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01108' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01108-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01108-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01108-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01108-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01108-E05', 'Sin asignar', 'disponible');
  END IF;

  -- [1109] ISBN: CIU-01109
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01109' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01109-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01109-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1110] ISBN: CIU-01110
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01110' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01110-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01110-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1111] ISBN: CIU-01111
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01111' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01111-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01111-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01111-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01111-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1112] ISBN: CIU-01112
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01112' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01112-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01112-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01112-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1113] ISBN: CIU-01113
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01113' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01113-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01113-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01113-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01113-E04', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01113-E05', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01113-E06', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01113-E07', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01113-E08', 'Sin asignar', 'disponible');
  END IF;

  -- [1114] ISBN: CIU-01114
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01114' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01114-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01114-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01114-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1115] ISBN: CIU-01115
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01115' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01115-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01115-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01115-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1116] ISBN: CIU-01116
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01116' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01116-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01116-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01116-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1117] ISBN: CIU-01117
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01117' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01117-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01117-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01117-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1118] ISBN: CIU-01118
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01118' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01118-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01118-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01118-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1119] ISBN: CIU-01119
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01119' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01119-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01119-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01119-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1120] ISBN: CIU-01120
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01120' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01120-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01120-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01120-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1121] ISBN: CIU-01121
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01121' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01121-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1122] ISBN: CIU-01122
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01122' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01122-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01122-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01122-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1123] ISBN: CIU-01123
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01123' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01123-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01123-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01123-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1124] ISBN: CIU-01124
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01124' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01124-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01124-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01124-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1125] ISBN: CIU-01125
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01125' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01125-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01125-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01125-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1126] ISBN: CIU-01126
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01126' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01126-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01126-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01126-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1127] ISBN: CIU-01127
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01127' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01127-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01127-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01127-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1128] ISBN: CIU-01128
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01128' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01128-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01128-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01128-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1129] ISBN: CIU-01129
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01129' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01129-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01129-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01129-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1130] ISBN: CIU-01130
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01130' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01130-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1131] ISBN: CIU-01131
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01131' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01131-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1132] ISBN: CIU-01132
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01132' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01132-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01132-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01132-E03', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01132-E04', 'Sin asignar', 'disponible');
  END IF;

  -- [1133] ISBN: CIU-01133
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01133' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01133-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01133-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01133-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1134] ISBN: CIU-01134
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01134' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01134-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01134-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01134-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1135] ISBN: CIU-01135
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01135' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01135-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01135-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1136] ISBN: CIU-01136
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01136' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01136-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1137] ISBN: CIU-01137
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01137' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01137-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1138] ISBN: CIU-01138
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01138' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01138-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1139] ISBN: CIU-01139
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01139' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01139-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1140] ISBN: CIU-01140
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01140' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01140-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1141] ISBN: CIU-01141
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01141' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01141-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01141-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01141-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1142] ISBN: CIU-01142
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01142' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01142-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01142-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1143] ISBN: CIU-01143
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01143' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01143-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1144] ISBN: CIU-01144
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01144' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01144-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1145] ISBN: CIU-01145
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01145' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01145-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1146] ISBN: CIU-01146
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01146' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01146-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1147] ISBN: CIU-01147
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01147' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01147-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1148] ISBN: CIU-01148
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01148' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01148-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1149] ISBN: CIU-01149
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01149' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01149-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1150] ISBN: CIU-01150
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01150' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01150-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1151] ISBN: CIU-01151
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01151' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01151-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1152] ISBN: CIU-01152
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01152' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01152-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1153] ISBN: CIU-01153
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01153' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01153-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1154] ISBN: CIU-01154
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01154' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01154-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1155] ISBN: CIU-01155
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01155' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01155-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1156] ISBN: CIU-01156
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01156' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01156-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01156-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1157] ISBN: CIU-01157
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01157' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01157-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1158] ISBN: CIU-01158
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01158' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01158-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1159] ISBN: CIU-01159
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01159' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01159-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1160] ISBN: CIU-01160
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01160' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01160-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1161] ISBN: CIU-01161
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01161' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01161-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1162] ISBN: CIU-01162
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01162' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01162-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1163] ISBN: CIU-01163
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01163' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01163-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1164] ISBN: CIU-01164
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01164' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01164-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1165] ISBN: CIU-01165
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01165' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01165-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1166] ISBN: CIU-01166
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01166' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01166-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1167] ISBN: CIU-01167
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01167' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01167-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1168] ISBN: CIU-01168
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01168' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01168-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1169] ISBN: CIU-01169
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01169' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01169-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1170] ISBN: CIU-01170
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01170' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01170-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1171] ISBN: CIU-01171
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01171' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01171-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1172] ISBN: CIU-01172
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01172' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01172-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1173] ISBN: CIU-01173
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01173' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01173-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1174] ISBN: CIU-01174
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01174' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01174-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1175] ISBN: CIU-01175
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01175' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01175-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1176] ISBN: CIU-01176
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01176' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01176-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1177] ISBN: CIU-01177
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01177' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01177-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1178] ISBN: CIU-01178
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01178' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01178-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01178-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01178-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1179] ISBN: CIU-01179
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01179' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01179-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01179-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01179-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1180] ISBN: CIU-01180
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01180' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01180-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01180-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1181] ISBN: CIU-01181
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01181' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01181-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01181-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1182] ISBN: CIU-01182
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01182' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01182-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01182-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1183] ISBN: CIU-01183
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01183' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01183-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01183-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1184] ISBN: CIU-01184
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01184' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01184-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01184-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01184-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1185] ISBN: CIU-01185
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01185' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01185-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01185-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01185-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1186] ISBN: CIU-01186
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01186' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01186-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01186-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01186-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1187] ISBN: CIU-01187
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01187' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01187-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1188] ISBN: CIU-01188
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01188' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01188-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01188-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1189] ISBN: CIU-01189
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01189' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01189-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1190] ISBN: CIU-01190
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01190' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01190-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1191] ISBN: CIU-01191
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01191' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01191-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1192] ISBN: CIU-01192
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01192' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01192-E01', 'Sin asignar', 'disponible');
  END IF;

  -- [1193] ISBN: CIU-01193
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01193' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01193-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01193-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1194] ISBN: CIU-01194
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01194' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01194-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01194-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01194-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1195] ISBN: CIU-01195
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01195' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01195-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01195-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01195-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1196] ISBN: CIU-01196
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01196' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01196-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01196-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01196-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1197] ISBN: CIU-01197
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01197' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01197-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01197-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01197-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1198] ISBN: CIU-01198
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01198' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01198-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01198-E02', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01198-E03', 'Sin asignar', 'disponible');
  END IF;

  -- [1199] ISBN: CIU-01199
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01199' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01199-E01', 'Sin asignar', 'disponible'),
      (v_lid, 'CIU-01199-E02', 'Sin asignar', 'disponible');
  END IF;

  -- [1200] ISBN: CIU-01200
  SELECT id INTO v_lid FROM libros WHERE isbn = 'CIU-01200' LIMIT 1;
  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN
    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES
      (v_lid, 'CIU-01200-E01', 'Sin asignar', 'disponible');
  END IF;


END $$;
