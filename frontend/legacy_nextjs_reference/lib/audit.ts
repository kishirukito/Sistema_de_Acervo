import { supabaseAdmin } from './supabase';

export interface AuditLogPayload {
  usuario_id?: string | null;
  accion: 'LOGIN' | 'CREATE_BOOK' | 'UPDATE_BOOK' | 'DELETE_BOOK' | 'CREATE_EJEMPLAR' | 'CREATE_LOAN' | 'RETURN_LOAN' | 'CREATE_USER' | 'UPDATE_USER' | 'UPLOAD_FILE';
  tabla_afectada: 'libros' | 'ejemplares' | 'usuarios' | 'prestamos' | 'archivos' | 'temas';
  registro_id: string;
  detalle_cambio?: Record<string, any>;
}

/**
 * Registra una acción de forma asíncrona en la bitácora de auditoría (auditoria_logs).
 * Almacena quién, qué, sobre qué registro y cuándo ocurrió el cambio.
 */
export async function registrarAuditoria(payload: AuditLogPayload): Promise<void> {
  try {
    const { error } = await supabaseAdmin.from('auditoria_logs').insert({
      usuario_id: payload.usuario_id || null,
      accion: payload.accion,
      tabla_afectada: payload.tabla_afectada,
      registro_id: payload.registro_id,
      detalle_cambio: payload.detalle_cambio || {},
    });

    if (error) {
      console.error('[AUDIT WARNING] No se pudo insertar registro de auditoría:', error.message);
    } else {
      console.log(`[AUDIT LOG] ${payload.accion} en ${payload.tabla_afectada} (ID: ${payload.registro_id})`);
    }
  } catch (err) {
    console.error('[AUDIT EXCEPTION] Fallo al guardar log de auditoría:', err);
  }
}
