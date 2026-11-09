-- ==============================================================================
-- SISTEMA DE GESTIÓN BIBLIOTECARIA (SISTEMA DE ACERVO - CIU)
-- Datos Iniciales / Semilla (Seed Data)
-- Incluye: Clasificación de Usuarios (Alumnos, Docentes, Tesistas, Externos)
-- y Préstamos (Salas vs Domicilio)
-- ==============================================================================

-- 1. TIPOS DE USUARIO / REGLAS DE PRÉSTAMO
INSERT INTO tipos_usuario (id, codigo, nombre, max_libros_simultaneos, dias_prestamo_domicilio, permite_prestamo_domicilio, descripcion)
VALUES 
(1, 'administrativo', 'Personal Administrativo', 5, 30, true, 'Personal operativo y bibliotecarios con control del sistema'),
(2, 'docente', 'Docente Universitario', 5, 21, true, 'Profesores e investigadores de la universidad'),
(3, 'alumno', 'Alumno Regular', 3, 7, true, 'Estudiantes activos de nivel licenciatura o posgrado'),
(4, 'egresado_tesista', 'Egresado / Tesista', 3, 14, true, 'Estudiantes egresados en proceso de titulación o elaboración de tesis'),
(5, 'externo', 'Persona Externa', 1, 0, false, 'Visitantes externos; préstamo exclusivo para consulta en sala de lectura')
ON CONFLICT (id) DO UPDATE SET
  codigo = EXCLUDED.codigo,
  nombre = EXCLUDED.nombre,
  max_libros_simultaneos = EXCLUDED.max_libros_simultaneos,
  dias_prestamo_domicilio = EXCLUDED.dias_prestamo_domicilio,
  permite_prestamo_domicilio = EXCLUDED.permite_prestamo_domicilio,
  descripcion = EXCLUDED.descripcion;

-- 2. USUARIOS INICIALES (Contraseña por defecto: admin123)
-- Hash bcrypt para 'admin123': $2b$12$e80yqX41U9I2O3dZzI1lK.p8e.N0v4VwZqgW8J3v0D.wP0U5O5g1C
INSERT INTO usuarios (id, tipo_usuario_id, rol, email, password_hash, nombre_completo, matricula_o_nomina, carrera_o_dependencia, vigencia_hasta, estado)
VALUES 
-- Administrador (vigencia 2027)
('a0000000-0000-0000-0000-000000000001', 1, 'admin', 'admin@upd.edu.mx', '$2b$12$e80yqX41U9I2O3dZzI1lK.p8e.N0v4VwZqgW8J3v0D.wP0U5O5g1C', 'Administrador General', 'EMP-001', 'Dirección de Biblioteca', '2027-12-31', 'activo'),

-- Personal Bibliotecario (vigencia 2026)
('a0000000-0000-0000-0000-000000000002', 1, 'personal', 'biblioteca@upd.edu.mx', '$2b$12$e80yqX41U9I2O3dZzI1lK.p8e.N0v4VwZqgW8J3v0D.wP0U5O5g1C', 'Lic. Julia Alvarado', 'EMP-002', 'Área de Acervo y Préstamos', '2026-12-31', 'activo'),

-- Docente (vigencia 2026)
('a0000000-0000-0000-0000-000000000003', 2, 'lector', 'docente.sistemas@upd.edu.mx', '$2b$12$e80yqX41U9I2O3dZzI1lK.p8e.N0v4VwZqgW8J3v0D.wP0U5O5g1C', 'Dr. Roberto Mendoza', 'DOC-105', 'División de Telemática y Software', '2026-12-31', 'activo'),

-- Alumno Regular (vigencia 2025)
('a0000000-0000-0000-0000-000000000004', 3, 'lector', 'alumno.prueba@upd.edu.mx', '$2b$12$e80yqX41U9I2O3dZzI1lK.p8e.N0v4VwZqgW8J3v0D.wP0U5O5g1C', 'Carlos Hernández Gómez', '2303150999', 'Ingeniería en Software', '2025-12-31', 'activo'),

-- Egresado / Tesista (vigencia 2025)
('a0000000-0000-0000-0000-000000000005', 4, 'lector', 'tesista.ia@upd.edu.mx', '$2b$12$e80yqX41U9I2O3dZzI1lK.p8e.N0v4VwZqgW8J3v0D.wP0U5O5g1C', 'Mariana Soto Luna', '2103140555', 'Egresada / Proyecto de Tesis IA', '2025-08-31', 'activo'),

-- Persona Externa (vigencia 2025)
('a0000000-0000-0000-0000-000000000006', 5, 'lector', 'investigador.externo@gmail.com', '$2b$12$e80yqX41U9I2O3dZzI1lK.p8e.N0v4VwZqgW8J3v0D.wP0U5O5g1C', 'Ing. Pedro Ramírez Ortiz', 'INE-882349102', 'Investigador Externo Independiente', '2025-12-31', 'activo')
ON CONFLICT (email) DO NOTHING;

-- 3. TEMAS / CATEGORÍAS
INSERT INTO temas (id, nombre, descripcion)
VALUES 
(1, 'Ingeniería de Software', 'Metodologías ágiles, arquitectura de software, DevOps y patrones de diseño'),
(2, 'Bases de Datos', 'Modelado relacional, normalización, SQL avanzado y sistemas distribuidos'),
(3, 'Inteligencia Artificial', 'Aprendizaje automático, procesamiento de lenguaje natural y visión artificial'),
(4, 'Redes y Seguridad', 'Protocolos de comunicación, ciberseguridad y criptografía')
ON CONFLICT (id) DO NOTHING;

-- 4. LIBROS DE EJEMPLO
INSERT INTO libros (id, isbn, titulo, autor, editorial, anio_publicacion, edicion, portada_url)
VALUES 
('b0000000-0000-0000-0000-000000000001', '9780132350884', 'Clean Code: A Handbook of Agile Software Craftsmanship', 'Robert C. Martin', 'Prentice Hall', 2008, '1ra Edición', 'https://m.media-amazon.com/images/I/41xShlnTZTL._SX376_BO1,204,203,200_.jpg'),
('b0000000-0000-0000-0000-000000000002', '9780135957059', 'The Pragmatic Programmer: your journey to mastery', 'David Thomas, Andrew Hunt', 'Addison-Wesley', 2019, '20th Anniversary Edition', 'https://m.media-amazon.com/images/I/51W1sBPO7tL._SX380_BO1,204,203,200_.jpg'),
('b0000000-0000-0000-0000-000000000003', '9780134494166', 'Clean Architecture: A Craftsman''s Guide to Software Structure and Design', 'Robert C. Martin', 'Prentice Hall', 2017, '1ra Edición', 'https://m.media-amazon.com/images/I/41-sN-mzwKL._SX381_BO1,204,203,200_.jpg')
ON CONFLICT (isbn) DO NOTHING;

-- 5. RELACIÓN LIBROS - TEMAS
INSERT INTO libro_temas (libro_id, tema_id)
VALUES 
('b0000000-0000-0000-0000-000000000001', 1),
('b0000000-0000-0000-0000-000000000002', 1),
('b0000000-0000-0000-0000-000000000003', 1)
ON CONFLICT DO NOTHING;

-- 6. EJEMPLARES FÍSICOS
INSERT INTO ejemplares (id, libro_id, codigo_inventario, ubicacion_estante, estado, observaciones)
VALUES 
('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'CIU-LIB-001-A', 'Pasillo 2, Estante B, Nivel 3', 'prestado', 'Excelente estado físico'),
('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'CIU-LIB-001-B', 'Pasillo 2, Estante B, Nivel 3', 'disponible', 'Copia nueva'),
('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000002', 'CIU-LIB-002-A', 'Pasillo 2, Estante C, Nivel 1', 'prestado', 'Tapa dura')
ON CONFLICT (codigo_inventario) DO NOTHING;

-- 7. PRÉSTAMOS DE DEMOSTRACIÓN (1 a Domicilio y 1 en Sala)
INSERT INTO prestamos (id, usuario_id, ejemplar_id, tipo_prestamo, fecha_prestamo, fecha_limite_devolucion, estado, notas)
VALUES 
-- Préstamo a Domicilio para Docente
('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000001', 'domicilio', NOW(), NOW() + INTERVAL '21 days', 'activo', 'Préstamo académico a domicilio'),

-- Préstamo en Sala para Persona Externa
('d0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-000000000003', 'sala', NOW(), NOW() + INTERVAL '4 hours', 'activo', 'Préstamo exclusivo para consulta en sala de lectura')
ON CONFLICT (id) DO NOTHING;
