-- ==============================================================================
-- SISTEMA DE GESTIÓN BIBLIOTECARIA (SISTEMA DE ACERVO - CIU)
-- Script de Limpieza Total (Reset / Drop All) para PostgreSQL / Supabase
-- Elimina todas las tablas, vistas, funciones y tipos ENUM en orden correcto
-- ==============================================================================

-- 1. ELIMINAR TABLAS (CASCADE elimina automáticamente llaves foráneas y triggers asociados)
DROP TABLE IF EXISTS auditoria_logs CASCADE;
DROP TABLE IF EXISTS resumenes_ia CASCADE;
DROP TABLE IF EXISTS prestamos CASCADE;
DROP TABLE IF EXISTS ejemplares CASCADE;
DROP TABLE IF EXISTS libro_temas CASCADE;
DROP TABLE IF EXISTS libros CASCADE;
DROP TABLE IF EXISTS temas CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS tipos_usuario CASCADE;

-- 2. ELIMINAR FUNCIONES DE TRIGGERS
DROP FUNCTION IF EXISTS trigger_set_timestamp() CASCADE;

-- 3. ELIMINAR TIPOS ENUM PERSONALIZADOS
DROP TYPE IF EXISTS enum_prestamo_tipo CASCADE;
DROP TYPE IF EXISTS enum_prestamo_estado CASCADE;
DROP TYPE IF EXISTS enum_ejemplar_estado CASCADE;
DROP TYPE IF EXISTS enum_user_estado CASCADE;
DROP TYPE IF EXISTS enum_user_rol CASCADE;
