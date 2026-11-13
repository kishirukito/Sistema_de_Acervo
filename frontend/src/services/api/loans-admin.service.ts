/**
 * Loans Admin Service — Fetches prestamos using Python backend proxy or Supabase directly.
 */

import { supabase } from './supabase';
import type { Loan, LoansSummaryData, LoanStatus } from '../../features/loans/loans.types';

const AVATAR_COLORS = ['#2F80ED', '#27AE60', '#D97706', '#8B5CF6', '#06B6D4', '#EC4899'];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return (name.slice(0, 2) || 'US').toUpperCase();
}

function formatDate(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, '0');
  const months = ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'];
  return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function mapEstadoToStatus(estado: string, dueDateIso?: string, returnDateIso?: string): LoanStatus {
  if (estado === 'devuelto' || returnDateIso) return 'RETURNED';
  if (estado === 'vencido') return 'OVERDUE';
  if (dueDateIso) {
    const due = new Date(dueDateIso);
    if (new Date() >= due) return 'OVERDUE';
  }
  if (estado === 'renovado') return 'ACTIVE';
  return 'ACTIVE';
}

function mapPrestamoToLoan(row: any, index: number): Loan {
  const usuario = row.usuarios || {};
  const ejemplar = row.ejemplares || {};
  const libro = ejemplar.libros || {};
  const tipoInfo = row.tipos_prestamo || {};
  const instInfo = row.instituciones_convenio || {};
  const authInfo = row.autorizado_por || {};

  let authorName = 'Autor desconocido';
  if (Array.isArray(libro.libro_autores) && libro.libro_autores.length > 0) {
    const firstAuthor = libro.libro_autores[0];
    if (firstAuthor.autores?.nombre) authorName = firstAuthor.autores.nombre;
  }

  const isInter = tipoInfo.clave === 'interbibliotecario' || Boolean(row.institucion_id);
  const userName = isInter
    ? (instInfo.nombre || 'Institución Externa en Convenio')
    : (usuario.nombre_completo || 'Usuario desconocido');

  const status = mapEstadoToStatus(row.estado, row.fecha_limite_devolucion, row.fecha_devolucion_real);

  let dueDateNote: string | undefined;
  if (status !== 'RETURNED' && row.fecha_limite_devolucion) {
    const now = new Date();
    const due = new Date(row.fecha_limite_devolucion);
    const diffMs = due.getTime() - now.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      dueDateNote = `${Math.abs(diffDays)}d vencido`;
    } else if (diffDays <= 3) {
      dueDateNote = `Vence en ${diffDays}d`;
    } else {
      dueDateNote = `${diffDays}d restantes`;
    }
  }

  // Carrera del usuario si aplica
  let userCareerName: string | undefined;
  if (usuario.carreras && typeof usuario.carreras === 'object') {
    userCareerName = `${usuario.carreras.nivel || ''} en ${usuario.carreras.nombre || ''}`.trim();
  } else if (usuario.dependencia_o_area) {
    userCareerName = usuario.dependencia_o_area;
  }

  return {
    id: row.id,
    folio: `PR-${String(index + 1).padStart(3, '0')}`,
    userId: row.usuario_id || '',
    userName,
    userKind: 'NORMAL',
    userCategory: isInter ? 'EXTERNAL' : 'STUDENT',
    userInitials: getInitials(userName),
    userAvatarColor: isInter ? '#7C3AED' : AVATAR_COLORS[index % AVATAR_COLORS.length],
    resourceId: ejemplar.codigo_inventario || row.ejemplar_id || '',
    resourceTitle: libro.titulo || 'Sin título',
    resourceAuthor: authorName,
    checkoutDate: formatDate(row.fecha_prestamo),
    dueDate: formatDate(row.fecha_limite_devolucion),
    dueDateNote,
    returnDate: row.fecha_devolucion_real ? formatDate(row.fecha_devolucion_real) : undefined,
    status,
    renewalCount: row.renovaciones_count || 0,
    renewalLimit: 2,
    notes: row.notas || undefined,
    tipoPrestamoId: row.tipo_prestamo_id,
    tipoPrestamoClave: tipoInfo.clave,
    tipoPrestamoNombre: tipoInfo.nombre,
    userCareerName,
    institucionId: row.institucion_id,
    institucionNombre: instInfo.nombre,
    institucionBiblioteca: instInfo.nombre_biblioteca,
    responsableExternoNombre: row.responsable_externo_nombre,
    responsableExternoCargo: row.responsable_externo_cargo,
    responsableExternoContacto: row.responsable_externo_contacto,
    folioOficio: row.folio_oficio,
    autorizadoPorNombre: authInfo.nombre_completo,
  };
}

/**
 * Fetches all loans from backend or Supabase directly.
 */
export async function fetchAdminLoans(): Promise<Loan[]> {
  try {
    // 1. Try Python backend proxy first
    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const res = await fetch('/api/v1/data/prestamos', { headers });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((row, i) => mapPrestamoToLoan(row, i));
      }
    }
  } catch (err) {
    console.warn('[LoansAdminService] Backend fetch failed:', err);
  }

  // 2. Direct query fallback
  try {
    const { data } = await supabase
      .from('prestamos')
      .select('id, usuario_id, ejemplar_id, tipo_prestamo, fecha_prestamo, fecha_limite_devolucion, fecha_devolucion_real, estado, notas, usuarios ( nombre_completo, email, rol ), ejemplares ( codigo_inventario, libros ( titulo, libro_autores ( autores ( nombre ) ) ) )')
      .order('fecha_prestamo', { ascending: false });

    if (!data) return [];
    return data.map((row, i) => mapPrestamoToLoan(row, i));
  } catch {
    return [];
  }
}

/**
 * Fetches a single loan by its UUID or Folio.
 */
export async function fetchAdminLoanById(loanId: string): Promise<Loan | null> {
  if (!loanId) return null;
  const loans = await fetchAdminLoans();
  return (
    loans.find(
      (l) =>
        l.id === loanId ||
        l.folio.toLowerCase() === loanId.toLowerCase()
    ) || null
  );
}

/**
 * Fetches loans summary metrics.
 */
export async function fetchLoansSummary(): Promise<LoansSummaryData> {
  const loans = await fetchAdminLoans();
  let active = 0, dueSoon = 0, overdue = 0, returned = 0;

  for (const l of loans) {
    if (l.status === 'RETURNED') returned++;
    else {
      active++;
      if (l.status === 'OVERDUE') overdue++;
      else if (l.dueDateNote?.includes('Vence')) dueSoon++;
    }
  }

  return {
    activeLoansCount: active,
    activeTrend: `${active} préstamos vigentes`,
    dueSoonCount: dueSoon,
    dueSoonSubtitle: `${dueSoon} próximos a vencer`,
    overdueCount: overdue,
    overdueSubtitle: `${overdue} con retraso`,
    returnedThisMonthCount: returned,
    returnedTrend: `${returned} devueltos`,
  };
}

/**
 * Updates a loan in Supabase via protected backend endpoint (e.g. renew or return).
 */
export async function updateAdminLoan(
  loanId: string,
  updates: { dueDate?: string; returnDate?: string; status?: string; notes?: string }
): Promise<boolean> {
  const token = localStorage.getItem('acervo_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`/api/v1/data/prestamos/${encodeURIComponent(loanId)}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    let errorMsg = `Error al actualizar el préstamo (${res.status})`;
    try {
      const errBody = await res.json();
      if (errBody && errBody.detail) {
        errorMsg = typeof errBody.detail === 'string' ? errBody.detail : JSON.stringify(errBody.detail);
      }
    } catch {}
    console.error('[LoansAdminService] Update failed:', errorMsg);
    throw new Error(errorMsg);
  }

  return true;
}

// ==============================================================================
// Caché en Memoria / SessionStorage con TTL de 10 minutos para Catálogos
// ==============================================================================
const CATALOG_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutos
const memoryCatalogCache: Record<string, { timestamp: number; data: any[] }> = {};

function getCachedCatalog(key: string): any[] | null {
  const now = Date.now();
  // 1. Revisar memoria RAM
  if (memoryCatalogCache[key] && now - memoryCatalogCache[key].timestamp < CATALOG_CACHE_TTL_MS) {
    return memoryCatalogCache[key].data;
  }
  // 2. Revisar sessionStorage
  try {
    const raw = sessionStorage.getItem(`acervo_catalog_${key}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.timestamp && now - parsed.timestamp < CATALOG_CACHE_TTL_MS && Array.isArray(parsed.data)) {
        memoryCatalogCache[key] = { timestamp: parsed.timestamp, data: parsed.data };
        return parsed.data;
      }
    }
  } catch {}
  return null;
}

function setCachedCatalog(key: string, data: any[]): void {
  const entry = { timestamp: Date.now(), data };
  memoryCatalogCache[key] = entry;
  try {
    sessionStorage.setItem(`acervo_catalog_${key}`, JSON.stringify(entry));
  } catch {}
}

export function invalidateCatalogCache(key?: 'carreras' | 'loanTypes' | 'instituciones'): void {
  if (key) {
    delete memoryCatalogCache[key];
    try {
      sessionStorage.removeItem(`acervo_catalog_${key}`);
    } catch {}
  } else {
    for (const k of ['carreras', 'loanTypes', 'instituciones']) {
      delete memoryCatalogCache[k];
      try {
        sessionStorage.removeItem(`acervo_catalog_${k}`);
      } catch {}
    }
  }
}

export async function fetchLoanTypes(): Promise<any[]> {
  const cached = getCachedCatalog('loanTypes');
  if (cached) return cached;

  try {
    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const res = await fetch('/api/v1/data/tipos-prestamo', { headers });
    if (res.ok) {
      const data = await res.json();
      setCachedCatalog('loanTypes', data);
      return data;
    }
  } catch (err) {
    console.warn('[LoansAdminService] fetchLoanTypes failed:', err);
  }
  return [];
}

export async function fetchInstituciones(): Promise<any[]> {
  const cached = getCachedCatalog('instituciones');
  if (cached) return cached;

  try {
    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const res = await fetch('/api/v1/data/instituciones', { headers });
    if (res.ok) {
      const data = await res.json();
      setCachedCatalog('instituciones', data);
      return data;
    }
  } catch (err) {
    console.warn('[LoansAdminService] fetchInstituciones failed:', err);
  }
  return [];
}

export async function createInstitucion(payload: any): Promise<any> {
  const token = localStorage.getItem('acervo_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch('/api/v1/data/instituciones', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Error al registrar la institución');
  }
  const created = await res.json();
  // Invalidación automática del caché de instituciones
  invalidateCatalogCache('instituciones');
  return created;
}

export async function fetchCarreras(): Promise<any[]> {
  const cached = getCachedCatalog('carreras');
  if (cached) return cached;

  try {
    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const res = await fetch('/api/v1/data/carreras', { headers });
    if (res.ok) {
      const data = await res.json();
      setCachedCatalog('carreras', data);
      return data;
    }
  } catch (err) {
    console.warn('[LoansAdminService] fetchCarreras failed:', err);
  }
  return [];
}
