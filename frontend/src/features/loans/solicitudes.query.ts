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
import { getUserBorrowRequests, USER_REQUESTS_STORAGE_KEY } from './requests.service';

// ─── Query Keys ───────────────────────────────────────────────────────────────

/** Clave para solicitudes del usuario lector autenticado. */
export const USER_SOLICITUDES_KEY = 'user-solicitudes' as const;

/** Clave para solicitudes en la vista del administrador. */
export const ADMIN_SOLICITUDES_KEY = 'admin-solicitudes' as const;

// ─── Mapper compartido ────────────────────────────────────────────────────────

function mapApiRowToRequest(s: any): BorrowRequest {
  const autores = s.libros?.libro_autores
    ? s.libros.libro_autores.map((la: any) => la.autores?.nombre).filter(Boolean).join(', ')
    : undefined;

  return {
    supabaseId: s.id,
    id: s.folio || s.id,
    bookId: s.libro_id ?? '',
    bookTitle: s.libros?.titulo ?? 'Sin título',
    bookAuthor: autores || s.libros?.autor || undefined,
    bookCover: s.libros?.portada_url || undefined,
    bookIsbn: s.libros?.isbn || undefined,
    userId: s.usuario_id ?? '',
    userName: s.usuarios?.nombre_completo ?? '',
    userEmail: s.usuarios?.email ?? '',
    userMatricula: s.usuarios?.matricula_o_nomina ?? undefined,
    userCareer: s.usuarios?.carreras?.nombre ?? undefined,
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

    // Limpieza de duplicados: descartar de localStorage las solicitudes que ya están en Supabase
    const localReqs = getUserBorrowRequests({ id: userId, email: userEmail });
    const apiIds = new Set(apiRows.map((r) => r.id));
    const apiBookIds = new Set(apiRows.map((r) => `${r.bookId}_${r.status}`));

    // Mantener solo solicitudes locales no sincronizadas (offline)
    const localOnly = localReqs.filter(
      (r) => !apiIds.has(r.id) && !apiBookIds.has(`${r.bookId}_${r.status}`)
    );

    // Actualizar localStorage para remover los folios temporales (SOL-2026-xxxx) ya registrados en BD
    try {
      localStorage.setItem(USER_REQUESTS_STORAGE_KEY, JSON.stringify(localOnly));
    } catch {}

    // Si hay datos en la API de Supabase, devolver exclusivamente los registros reales
    return apiRows.length > 0 ? apiRows : localOnly;
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

