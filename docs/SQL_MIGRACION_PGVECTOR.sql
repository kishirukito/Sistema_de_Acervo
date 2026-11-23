-- =============================================================================
-- MIGRACIÓN pgvector — Sistema de Acervo CIU
-- Ejecutar en el SQL Editor de Supabase (Dashboard → SQL Editor → New Query)
-- Fecha: 22 de noviembre de 2026
-- =============================================================================

-- ═══════════════════════════════════════════════════════════════════════════════
-- PASO 1: Habilitar la extensión pgvector en PostgreSQL
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE EXTENSION IF NOT EXISTS vector;

-- ═══════════════════════════════════════════════════════════════════════════════
-- PASO 2: Agregar columna de embedding vectorial a la tabla libros
-- nomic-embed-text genera vectores de 768 dimensiones
-- ═══════════════════════════════════════════════════════════════════════════════
ALTER TABLE libros ADD COLUMN IF NOT EXISTS embedding vector(768);

-- ═══════════════════════════════════════════════════════════════════════════════
-- PASO 3: Crear índice HNSW para búsqueda aproximada de alta velocidad
-- m=16 y ef_construction=64 son parámetros óptimos para colecciones <10,000
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS libros_embedding_hnsw_idx
ON libros USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- ═══════════════════════════════════════════════════════════════════════════════
-- PASO 4: Función RPC para búsqueda semántica (similitud coseno)
-- Esta función es llamada desde el backend FastAPI via REST API
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION buscar_libros_semantico(
    query_embedding vector(768),
    match_threshold float DEFAULT 0.45,
    match_count int DEFAULT 5
)
RETURNS TABLE (
    id uuid,
    titulo text,
    similarity float
)
LANGUAGE sql STABLE AS $$
    SELECT
        id,
        titulo,
        1 - (embedding <=> query_embedding) AS similarity
    FROM libros
    WHERE embedding IS NOT NULL
      AND (1 - (embedding <=> query_embedding)) >= match_threshold
    ORDER BY similarity DESC
    LIMIT match_count;
$$;

-- ═══════════════════════════════════════════════════════════════════════════════
-- VERIFICACIÓN: Comprobar que todo se creó correctamente
-- ═══════════════════════════════════════════════════════════════════════════════

-- Ver si la extensión está activa
SELECT * FROM pg_extension WHERE extname = 'vector';

-- Ver si la columna existe
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'libros' AND column_name = 'embedding';

-- Ver si la función existe
SELECT routine_name
FROM information_schema.routines
WHERE routine_name = 'buscar_libros_semantico';
