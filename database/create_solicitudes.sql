-- ==============================================================================
-- MIGRACIÓN: TABLA SOLICITUDES_PRESTAMO
-- Permite que los alumnos envíen solicitudes de préstamo desde su portal y que
-- los administradores las acepten o rechacen en tiempo real.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.solicitudes_prestamo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    folio VARCHAR(30) UNIQUE NOT NULL,
    usuario_id UUID NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
    libro_id UUID NOT NULL REFERENCES public.libros(id) ON DELETE CASCADE,
    fecha_solicitud TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    fecha_sugerida DATE,
    lugar_recogida VARCHAR(100) DEFAULT 'Mostrador Principal',
    estado VARCHAR(30) NOT NULL DEFAULT 'PENDING' CHECK (estado IN ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED')),
    notas TEXT,
    atendido_por_id UUID REFERENCES public.usuarios(id) ON DELETE SET NULL,
    fecha_atencion TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Índices de consulta rápida
CREATE INDEX IF NOT EXISTS idx_solicitudes_usuario ON public.solicitudes_prestamo(usuario_id);
CREATE INDEX IF NOT EXISTS idx_solicitudes_libro ON public.solicitudes_prestamo(libro_id);
CREATE INDEX IF NOT EXISTS idx_solicitudes_estado ON public.solicitudes_prestamo(estado);

-- Comentarios explicativos
COMMENT ON TABLE public.solicitudes_prestamo IS 'Solicitudes de préstamo reservadas por los alumnos antes de acudir a ventanilla.';
