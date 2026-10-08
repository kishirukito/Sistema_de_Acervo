-- ==============================================================================
-- SISTEMA DE GESTIÓN BIBLIOTECARIA (SISTEMA DE ACERVO - CIU)
-- Datos Iniciales / Semilla (Seed Data)
-- ==============================================================================

-- 1. USUARIOS INICIALES (Contraseña por defecto: admin123)
-- Hash bcrypt para 'admin123': $2b$12$e80yqX41U9I2O3dZzI1lK.p8e.N0v4VwZqgW8J3v0D.wP0U5O5g1C
INSERT INTO usuarios (id, email, password_hash, nombre_completo, matricula_o_nomina, rol, estado)
VALUES 
('a0000000-0000-0000-0000-000000000001', 'admin@upd.edu.mx', '$2b$12$e80yqX41U9I2O3dZzI1lK.p8e.N0v4VwZqgW8J3v0D.wP0U5O5g1C', 'Administrador General', 'EMP-001', 'admin', 'activo'),
('a0000000-0000-0000-0000-000000000002', 'biblioteca@upd.edu.mx', '$2b$12$e80yqX41U9I2O3dZzI1lK.p8e.N0v4VwZqgW8J3v0D.wP0U5O5g1C', 'Lic. Julia Alvarado', 'EMP-002', 'personal', 'activo'),
('a0000000-0000-0000-0000-000000000003', 'alumno.prueba@upd.edu.mx', '$2b$12$e80yqX41U9I2O3dZzI1lK.p8e.N0v4VwZqgW8J3v0D.wP0U5O5g1C', 'Estudiante de Prueba', '2303150999', 'alumno', 'activo')
ON CONFLICT (email) DO NOTHING;

-- 2. TEMAS / CATEGORÍAS
INSERT INTO temas (id, nombre, descripcion)
VALUES 
(1, 'Ingeniería de Software', 'Metodologías ágiles, arquitectura de software, DevOps y patrones de diseño'),
(2, 'Bases de Datos', 'Modelado relacional, normalización, SQL avanzado y sistemas distribuidos'),
(3, 'Inteligencia Artificial', 'Aprendizaje automático, procesamiento de lenguaje natural y visión artificial'),
(4, 'Redes y Seguridad', 'Protocolos de comunicación, ciberseguridad y criptografía')
ON CONFLICT (id) DO NOTHING;

-- 3. LIBROS DE EJEMPLO
INSERT INTO libros (id, isbn, titulo, autor, editorial, anio_publicacion, edicion, portada_url)
VALUES 
('b0000000-0000-0000-0000-000000000001', '9780132350884', 'Clean Code: A Handbook of Agile Software Craftsmanship', 'Robert C. Martin', 'Prentice Hall', 2008, '1ra Edición', 'https://m.media-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg'),
('b0000000-0000-0000-0000-000000000002', '9780135957059', 'The Pragmatic Programmer: your journey to mastery', 'David Thomas, Andrew Hunt', 'Addison-Wesley', 2019, '20th Anniversary Edition', 'https://m.media-amazon.com/images/I/51W1sBPO7tL._SX380_BO1,204,203,200_.jpg'),
('b0000000-0000-0000-0000-000000000003', '9780134494166', 'Clean Architecture: A Craftsman''s Guide to Software Structure and Design', 'Robert C. Martin', 'Prentice Hall', 2017, '1ra Edición', 'https://m.media-amazon.com/images/I/41-sN-mzwKL._SX381_BO1,204,203,200_.jpg')
ON CONFLICT (isbn) DO NOTHING;

-- 4. RELACIÓN LIBROS - TEMAS
INSERT INTO libro_temas (libro_id, tema_id)
VALUES 
('b0000000-0000-0000-0000-000000000001', 1),
('b0000000-0000-0000-0000-000000000002', 1),
('b0000000-0000-0000-0000-000000000003', 1)
ON CONFLICT DO NOTHING;

-- 5. EJEMPLARES FÍSICOS
INSERT INTO ejemplares (id, libro_id, codigo_inventario, ubicacion_estante, estado, observaciones)
VALUES 
('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'CIU-LIB-001-A', 'Pasillo 2, Estante B, Nivel 3', 'disponible', 'Excelente estado físico'),
('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'CIU-LIB-001-B', 'Pasillo 2, Estante B, Nivel 3', 'disponible', 'Copia nueva'),
('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000002', 'CIU-LIB-002-A', 'Pasillo 2, Estante C, Nivel 1', 'disponible', 'Tapa dura')
ON CONFLICT (codigo_inventario) DO NOTHING;
