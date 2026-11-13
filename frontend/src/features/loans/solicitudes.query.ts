/**
 * solicitudes.query.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Funciones y claves de consulta centralizadas para React Query.
 * Solo contiene lógica de fetch y mapeo; no modifica reglas de negocio,
 * endpoints, ni el backend.
 *
 * ALCANCE: únicamente frontend — caché, invalidación, polling.
 */

import type { BorrowRequest } from '../../types';
import { getUserBorrowRequests } from './requests.service';

// ─── Query Keys ───────────────────────────────────────────────────────────────

/** Clave para solicitudes del usuario lector autenticado. */
export const USER_SOLICITUDES_KEY = 'user-solicitudes' as const;

/** Clave para solicitudes en la vista del administrador. */
export const ADMIN_SOLICITUDES_KEY = 'admin-solicitudes' as const;

// ─── Mapper compartido ────────────────────────────────────────────────────────

function mapApiRowToRequest(s: any): BorrowRequest {
  return {
    supabaseId: s.id,
    id: s.folio || s.id,
    bookId: s.libro_id ?? '',
    bookTitle: s.libros?.titulo ?? 'Sin título',
    userId: s.usuario_id ?? '',
    userName: s.usuarios?.nombre_completo ?? '',
    userEmail: s.usuarios?.email ?? '',
    requestDate: s.fecha_solicitud ?? s.created_at ?? '',
    status: s.estado ?? 'PENDING',
    notes: s.notas ?? '',
    pickupLocation: s.lugar_recogida ?? 'Mostrador Principal',
    suggestedDate: s.fecha_sugerida ?? '',
  };
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

/**
 * Obtiene las solicitudes del usuario autenticado.
 * El backend ya filtra por rol: el lector solo recibe las suyas.
 * Si falla, cae a localStorage (sin exponer datos de otros usuarios).
 */
export async function fetchUserSolicitudes(
  userId?: string,
  userEmail?: string
): Promise<BorrowRequest[]> {
  try {
    const token = localStorage.getItem('acervo_token');
    if (!token) throw new Error('no-token');

    const res = await fetch('/api/v1/data/solicitudes', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error(`http-${res.status}`);

    const data: any[] = await res.json();
    const apiRows = data.map(mapApiRowToRequest);

    // Merge con localStorage para solicitudes que aún no llegaron al backend
    const localReqs = getUserBorrowRequests({ id: userId, email: userEmail });
    const apiIds = new Set(apiRows.map((r) => r.id));
    const localOnly = localReqs.filter((r) => !apiIds.has(r.id));

    return [...apiRows, ...localOnly];
  } catch {
    // Fallback: solo solicitudes del localStorage del propio usuario
    return getUserBorrowRequests({ id: userId, email: userEmail });
  }
}

/**
 * Obtiene todas las solicitudes de alumnos para el administrador.
 * Fallback a localStorage si el backend no responde.
 */
export async function fetchAdminSolicitudes(): Promise<BorrowRequest[]> {
  try {
    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const res = await fetch('/api/v1/data/solicitudes', { headers });
    if (!res.ok) throw new Error(`http-${res.status}`);

    const data: any[] = await res.json();
    return data.map(mapApiRowToRequest);
  } catch {
    // Fallback: localStorage (cualquier solicitud guardada)
    const { getAllBorrowRequests } = await import('./requests.service');
    return getAllBorrowRequests();
  }
}

