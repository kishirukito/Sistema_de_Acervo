/**
 * Users Managed Service — Fetches usuarios from the backend API (or Supabase)
 * and maps them to the frontend `ManagedUser` type.
 */

import { supabase } from './supabase';
import type { ManagedUser, UsersMetricsData, UserStatus } from '../../features/users/users.types';

const AVATAR_COLORS = ['#2F80ED', '#27AE60', '#D97706', '#8B5CF6', '#06B6D4', '#EC4899', '#F59E0B', '#6366F1', '#EF4444', '#14B8A6'];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (name.slice(0, 2) || 'US').toUpperCase();
}

function mapRolToKind(rol: string): 'ADMINISTRATIVE' | 'NORMAL' {
  if (rol === 'admin' || rol === 'personal') return 'ADMINISTRATIVE';
  return 'NORMAL';
}

function mapRolToRole(rol: string): 'ADMIN' | 'LIBRARIAN' | undefined {
  if (rol === 'admin') return 'ADMIN';
  if (rol === 'personal') return 'LIBRARIAN';
  return undefined;
}

function mapEstadoToStatus(estado: string): UserStatus {
  if (estado === 'activo') return 'ACTIVE';
  if (estado === 'suspendido') return 'SUSPENDED';
  return 'INACTIVE';
}

function mapUsuarioToManagedUser(row: any, index: number): ManagedUser {
  const kind = mapRolToKind(row.rol);
  const initials = getInitials(row.nombre_completo || '');
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];

  let activeLoans = 0;
  let hasOverdueLoan = false;
  if (Array.isArray(row.prestamos)) {
    for (const p of row.prestamos) {
      if (p.estado === 'activo') activeLoans++;
      if (p.estado === 'vencido') { activeLoans++; hasOverdueLoan = true; }
    }
  }

  const carreraData = row.carreras && typeof row.carreras === 'object' ? {
    id: row.carreras.id,
    nivel: row.carreras.nivel,
    nombre: row.carreras.nombre,
  } : null;

  const base = {
    id: row.id,
    fullName: row.nombre_completo || 'Sin nombre',
    email: row.email || '',
    phone: row.telefono || undefined,
    status: mapEstadoToStatus(row.estado),
    activeLoans,
    borrowerCode: row.matricula_o_nomina || row.id.slice(0, 8),
    matricula: row.matricula_o_nomina || null,
    createdAt: row.created_at ? new Date(row.created_at).toLocaleDateString('es-MX') : '',
    hasOverdueLoan,
    avatarColor: color,
    avatarInitials: initials,
    carreraId: row.carrera_id || null,
    carrera: carreraData,
    dependenciaOArea: row.dependencia_o_area || row.carrera_o_dependencia || null,
  };

  if (kind === 'ADMINISTRATIVE') {
    return {
      ...base,
      kind: 'ADMINISTRATIVE' as const,
      role: mapRolToRole(row.rol) || 'ADMIN',
    };
  }

  let category: 'TEACHER' | 'STUDENT' | 'EXTERNAL' | 'ROOM' | 'GRADUATE' = 'STUDENT';
  const dep = (row.dependencia_o_area || row.carrera_o_dependencia || '').toLowerCase();
  if (dep.includes('docente') || dep.includes('profesor')) category = 'TEACHER';
  else if (dep.includes('egresado')) category = 'GRADUATE';
  else if (dep.includes('externo')) category = 'EXTERNAL';
  else if (dep.includes('sala')) category = 'ROOM';

  return {
    ...base,
    kind: 'NORMAL' as const,
    category,
  };
}

/**
 * Fetches all users using the Python backend proxy or Supabase directly.
 */
export async function fetchManagedUsers(): Promise<ManagedUser[]> {
  try {
    // 1. Try Python backend proxy first (which uses service key)
    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const res = await fetch('/api/v1/data/usuarios', { headers });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((row, i) => mapUsuarioToManagedUser(row, i));
      }
    }
  } catch (err) {
    console.warn('[UsersService] Backend proxy fetch failed, falling back to direct Supabase:', err);
  }

  // 2. Direct Supabase query fallback
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, rol, email, nombre_completo, matricula_o_nomina, carrera_o_dependencia, vigencia_hasta, estado, created_at, prestamos ( id, estado )')
      .order('nombre_completo', { ascending: true });

    if (error || !data) return [];
    return data.map((row, i) => mapUsuarioToManagedUser(row, i));
  } catch {
    return [];
  }
}

/**
 * Fetches user metrics.
 */
export async function fetchUsersMetrics(): Promise<UsersMetricsData> {
  const users = await fetchManagedUsers();
  let total = users.length;
  let active = 0;
  let overdueCount = 0;

  for (const u of users) {
    if (u.status === 'ACTIVE') active++;
    if (u.hasOverdueLoan) overdueCount++;
  }

  return { totalUsers: total, activeUsers: active, overdueLoansCount: overdueCount };
}

/**
 * Creates a new user in Supabase via protected backend endpoint.
 * Throws an Error with a user-facing message if the backend rejects the request.
 */
export async function createManagedUser(user: any): Promise<any> {
  const token = localStorage.getItem('acervo_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch('/api/v1/data/usuarios', {
    method: 'POST',
    headers,
    body: JSON.stringify(user),
  });
  if (res.ok) {
    return await res.json();
  }
  // Parse backend error and surface it to the caller
  let errorMessage = `Error del servidor (${res.status}).`;
  try {
    const errData = await res.json();
    if (typeof errData.detail === 'string') {
      errorMessage = errData.detail;
    } else if (errData.detail?.message) {
      const extra = Array.isArray(errData.detail.errors) ? ' ' + errData.detail.errors.join(' ') : '';
      errorMessage = errData.detail.message + extra;
    }
  } catch {
    // response body was not JSON
  }
  throw new Error(errorMessage);
}

/**
 * Updates a user's status or details in Supabase via protected backend endpoint.
 */
export async function updateManagedUser(
  userId: string,
  updates: { status?: UserStatus; fullName?: string; phone?: string; carrera_o_dependencia?: string }
): Promise<boolean> {
  try {
    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(`/api/v1/data/usuarios/${encodeURIComponent(userId)}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(updates),
    });

    return res.ok;
  } catch (err) {
    console.error('[UsersService] Update failed:', err);
    return false;
  }
}

/**
 * Consulta los IDs de usuarios con sanciones o multas pendientes de pago
 * para garantizar que nunca sean desactivados por la configuración de generaciones.
 */
export async function fetchPendingSanctionsUserIds(): Promise<Set<string>> {
  const result = new Set<string>();
  try {
    // 1. Intentar vía backend reportes/siabuc
    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const res = await fetch('/api/v1/reports/siabuc', { headers });
    if (res.ok) {
      const data = await res.json();
      const detalle = data?.sanciones?.detalle;
      if (Array.isArray(detalle)) {
        for (const item of detalle) {
          if (item?.usuario_id && item?.estado_pago === 'pendiente') {
            result.add(String(item.usuario_id));
          }
        }
      }
    }
  } catch (err) {
    console.warn('[UsersService] Could not fetch sanctions from SIABUC proxy, checking Supabase fallback:', err);
  }

  // Fallback con cliente Supabase si aún está vacío
  if (result.size === 0) {
    try {
      const { data } = await supabase
        .from('sanciones_multas')
        .select('usuario_id, estado_pago')
        .eq('estado_pago', 'pendiente');
      if (Array.isArray(data)) {
        for (const item of data) {
          if (item.usuario_id) result.add(String(item.usuario_id));
        }
      }
    } catch {
      // Ignorar si la tabla no existe o no tiene registros
    }
  }

  return result;
}
