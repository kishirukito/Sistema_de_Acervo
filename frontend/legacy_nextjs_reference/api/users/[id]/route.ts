import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { successResponse, errorResponse, handleApiError } from '@/lib/errors';
import { registrarAuditoria } from '@/lib/audit';
import crypto from 'crypto';

interface Params {
  params: Promise<{ id: string }>;
}

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * GET /api/users/[id]
 * Detalle completo de un usuario por su ID.
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const { data: user, error } = await supabaseAdmin
      .from('usuarios')
      .select('id, email, nombre_completo, matricula_o_nomina, rol, estado, created_at, updated_at')
      .eq('id', id)
      .single();

    if (error || !user) {
      return errorResponse('Usuario no encontrado.', 404);
    }

    return successResponse(user);
  } catch (error) {
    return handleApiError(error, 'Fallo al obtener datos del usuario');
  }
}

/**
 * PUT /api/users/[id]
 * Modificación de datos de usuario, actualización de rol o suspensión/reactivación.
 */
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { nombre_completo, rol, estado, password, admin_usuario_id } = body;

    // Verificar usuario actual
    const { data: previousUser, error: findError } = await supabaseAdmin
      .from('usuarios')
      .select('id, email, nombre_completo, rol, estado')
      .eq('id', id)
      .single();

    if (findError || !previousUser) {
      return errorResponse('El usuario no existe.', 404);
    }

    const updatePayload: Record<string, any> = {};
    if (nombre_completo !== undefined) updatePayload.nombre_completo = nombre_completo.trim();
    if (rol !== undefined) {
      const rolesValidos = ['admin', 'personal', 'lector'];
      if (!rolesValidos.includes(rol)) {
        return errorResponse(`Rol inválido (${rol})`, 400);
      }
      updatePayload.rol = rol;
    }
    if (estado !== undefined) {
      const estadosValidos = ['activo', 'suspendido', 'inactivo'];
      if (!estadosValidos.includes(estado)) {
        return errorResponse(`Estado inválido (${estado})`, 400);
      }
      updatePayload.estado = estado;
    }
    if (password) {
      updatePayload.password_hash = hashPassword(password);
    }

    const { data: updatedUser, error: updateError } = await supabaseAdmin
      .from('usuarios')
      .update(updatePayload)
      .eq('id', id)
      .select('id, email, nombre_completo, matricula_o_nomina, rol, estado, updated_at')
      .single();

    if (updateError || !updatedUser) {
      return errorResponse(`Error al actualizar usuario: ${updateError?.message}`, 500);
    }

    // Registrar en auditoría
    await registrarAuditoria({
      usuario_id: admin_usuario_id || null,
      accion: 'UPDATE_USER',
      tabla_afectada: 'usuarios',
      registro_id: id,
      detalle_cambio: {
        antes: previousUser,
        despues: updatedUser,
      },
    });

    return successResponse(updatedUser);
  } catch (error) {
    return handleApiError(error, 'Fallo al actualizar datos del usuario');
  }
}
