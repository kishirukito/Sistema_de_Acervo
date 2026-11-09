import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { successResponse, errorResponse, handleApiError } from '@/lib/errors';

/**
 * GET /api/audit
 * Permite a los administradores consultar el historial de auditoría y bitácora del sistema.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tabla = searchParams.get('tabla');
    const accion = searchParams.get('accion');
    const usuario_id = searchParams.get('usuario_id');
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    let query = supabaseAdmin
      .from('auditoria_logs')
      .select('*, usuarios(id, nombre_completo, email, rol)');

    if (tabla) query = query.eq('tabla_afectada', tabla);
    if (accion) query = query.eq('accion', accion);
    if (usuario_id) query = query.eq('usuario_id', usuario_id);

    const { data: logs, error } = await query
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      return errorResponse(`Error al consultar bitácora de auditoría: ${error.message}`, 500);
    }

    return successResponse(logs || []);
  } catch (error) {
    return handleApiError(error, 'Fallo al consultar auditoría');
  }
}
