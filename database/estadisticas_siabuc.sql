-- ==============================================================================
-- SISTEMA DE ACERVO (CIU) - MÓDULO DE ESTADÍSTICAS Y GESTIÓN AVANZADA (SIABUC)
-- ==============================================================================
-- Este script respeta y amplía la base de datos actual sin borrar registros existentes.
-- Fecha de generación: Noviembre 2026
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. AMPLIACIÓN DE TABLAS EXISTENTES
-- ------------------------------------------------------------------------------

-- Agregar número de teléfono y datos de contacto a la tabla usuarios
ALTER TABLE usuarios 
ADD COLUMN IF NOT EXISTS telefono VARCHAR(25);

-- Soporte para renovaciones en préstamos
ALTER TABLE prestamos 
ADD COLUMN IF NOT EXISTS renovaciones_count INT DEFAULT 0;

-- Registro del analista/catalogador y clasificación Dewey detallada en libros
ALTER TABLE libros 
ADD COLUMN IF NOT EXISTS creado_por_id UUID REFERENCES usuarios(id),
ADD COLUMN IF NOT EXISTS modificado_por_id UUID REFERENCES usuarios(id),
ADD COLUMN IF NOT EXISTS clasificacion_dewey VARCHAR(50);

-- Soporte para bajas/extravíos en ejemplares
DO $$
BEGIN
    ALTER TABLE ejemplares 
    ADD COLUMN IF NOT EXISTS fecha_baja TIMESTAMP WITH TIME ZONE;
EXCEPTION
    WHEN duplicate_column THEN NULL;
END $$;


-- ------------------------------------------------------------------------------
-- 2. TABLA DE SANCIONES Y MULTAS (Módulo de Circulación)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sanciones_multas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    prestamo_id UUID REFERENCES prestamos(id) ON DELETE SET NULL,
    tipo_sancion VARCHAR(30) NOT NULL, -- 'amonestacion', 'suspension', 'multa'
    monto_multa DECIMAL(10,2) DEFAULT 0.00,
    estado_pago VARCHAR(20) DEFAULT 'pendiente', -- 'pendiente', 'pagado', 'condonado'
    motivo TEXT,
    fecha_inicio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    fecha_fin TIMESTAMP WITH TIME ZONE,
    fecha_pago TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE sanciones_multas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de sanciones" ON sanciones_multas
FOR SELECT USING (true);


-- ------------------------------------------------------------------------------
-- 3. SERVICIOS BIBLIOTECARIOS: OCUPACIÓN DE ESPACIOS (Salas y Cubículos)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS espacios_biblioteca (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) DEFAULT 'cubiculo', -- 'sala_estudio', 'cubiculo', 'auditorio', 'sala_computo'
    capacidad INT DEFAULT 4,
    estado VARCHAR(20) DEFAULT 'disponible' -- 'disponible', 'mantenimiento', 'ocupado'
);

CREATE TABLE IF NOT EXISTS reservas_espacios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    espacio_id INT NOT NULL REFERENCES espacios_biblioteca(id) ON DELETE CASCADE,
    inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    fin TIMESTAMP WITH TIME ZONE NOT NULL,
    estado VARCHAR(20) DEFAULT 'concluida', -- 'activa', 'concluida', 'cancelada'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE espacios_biblioteca ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservas_espacios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de espacios" ON espacios_biblioteca FOR SELECT USING (true);
CREATE POLICY "Lectura pública de reservas espacios" ON reservas_espacios FOR SELECT USING (true);


-- ------------------------------------------------------------------------------
-- 4. SERVICIOS BIBLIOTECARIOS: EQUIPOS DE CÓMPUTO
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS equipos_computo (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL, -- Ej. 'PC-01', 'PC-02'
    ubicacion_sala VARCHAR(100) DEFAULT 'Sala de Cómputo Principal',
    ip VARCHAR(45),
    estado VARCHAR(20) DEFAULT 'disponible' -- 'disponible', 'ocupado', 'mantenimiento'
);

CREATE TABLE IF NOT EXISTS sesiones_computo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    equipo_id INT NOT NULL REFERENCES equipos_computo(id) ON DELETE CASCADE,
    inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    fin TIMESTAMP WITH TIME ZONE,
    duracion_minutos INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE equipos_computo ENABLE ROW LEVEL SECURITY;
ALTER TABLE sesiones_computo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de equipos cómputo" ON equipos_computo FOR SELECT USING (true);
CREATE POLICY "Lectura pública de sesiones cómputo" ON sesiones_computo FOR SELECT USING (true);


-- ==============================================================================
-- 5. DATOS SEMILLA PARA ESTADÍSTICAS REALISTAS EN EL PANEL DE ADMINISTRACIÓN
-- ==============================================================================

-- Actualizar teléfonos de contacto reales en usuarios existentes
UPDATE usuarios SET telefono = '492 123 4567' WHERE email = 'admin@upd.edu.mx';
UPDATE usuarios SET telefono = '492 987 6543' WHERE email = 'biblioteca@upd.edu.mx';
UPDATE usuarios SET telefono = '493 555 0101' WHERE email = 'docente.sistemas@upd.edu.mx';
UPDATE usuarios SET telefono = '493 111 2233' WHERE email = 'alumno.prueba@upd.edu.mx';
UPDATE usuarios SET telefono = '492 333 4455' WHERE email = 'tesista.ia@upd.edu.mx';
UPDATE usuarios SET telefono = '492 777 8899' WHERE email = 'investigador.externo@gmail.com';

-- Espacios de biblioteca iniciales
INSERT INTO espacios_biblioteca (nombre, tipo, capacidad, estado) VALUES
('Cubículo de Estudio 1', 'cubiculo', 4, 'disponible'),
('Cubículo de Estudio 2', 'cubiculo', 6, 'disponible'),
('Sala de Lectura Silenciosa', 'sala_estudio', 25, 'disponible'),
('Auditorio CIU', 'auditorio', 60, 'disponible')
ON CONFLICT DO NOTHING;

-- Equipos de cómputo iniciales
INSERT INTO equipos_computo (codigo, ubicacion_sala, estado) VALUES
('PC-LAB-01', 'Sala de Cómputo A', 'disponible'),
('PC-LAB-02', 'Sala de Cómputo A', 'disponible'),
('PC-LAB-03', 'Sala de Cómputo A', 'disponible'),
('PC-LAB-04', 'Sala de Cómputo B', 'disponible'),
('PC-LAB-05', 'Sala de Cómputo B', 'disponible')
ON CONFLICT (codigo) DO NOTHING;

-- Asignar catalogador inicial a los 3 libros existentes (Admin General)
UPDATE libros 
SET creado_por_id = 'a0000000-0000-0000-0000-000000000001',
    clasificacion_dewey = '005.1'
WHERE creado_por_id IS NULL;

-- Asignar renovaciones y tipos de préstamo representativos
UPDATE prestamos 
SET renovaciones_count = 1 
WHERE id = 'd0000000-0000-0000-0000-000000000001';

-- Insertar sanciones de prueba basadas en usuarios reales
INSERT INTO sanciones_multas (usuario_id, tipo_sancion, monto_multa, estado_pago, motivo, fecha_inicio)
VALUES 
('a0000000-0000-0000-0000-000000000004', 'multa', 45.00, 'pendiente', 'Retraso de 3 días en devolución de material bibliográfico', NOW() - INTERVAL '2 days'),
('a0000000-0000-0000-0000-000000000006', 'amonestacion', 0.00, 'condonado', 'Devolución fuera de horario de sala', NOW() - INTERVAL '10 days')
ON CONFLICT DO NOTHING;

-- Insertar sesiones de cómputo históricas para gráficos de afluencia
INSERT INTO sesiones_computo (usuario_id, equipo_id, inicio, fin, duracion_minutos)
VALUES
('a0000000-0000-0000-0000-000000000004', 1, NOW() - INTERVAL '1 day 2 hours', NOW() - INTERVAL '1 day', 120),
('a0000000-0000-0000-0000-000000000003', 2, NOW() - INTERVAL '2 days 3 hours', NOW() - INTERVAL '2 days 1 hour', 120),
('a0000000-0000-0000-0000-000000000005', 3, NOW() - INTERVAL '3 days 4 hours', NOW() - INTERVAL '3 days 2 hours', 120)
ON CONFLICT DO NOTHING;

-- Insertar reservas de cubículos históricas para gráficos de ocupación
INSERT INTO reservas_espacios (usuario_id, espacio_id, inicio, fin, estado)
VALUES
('a0000000-0000-0000-0000-000000000004', 1, NOW() - INTERVAL '1 day 4 hours', NOW() - INTERVAL '1 day 2 hours', 'concluida'),
('a0000000-0000-0000-0000-000000000003', 2, NOW() - INTERVAL '2 days 5 hours', NOW() - INTERVAL '2 days 3 hours', 'concluida')
ON CONFLICT DO NOTHING;
