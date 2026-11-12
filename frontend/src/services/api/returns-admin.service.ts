/**
 * Returns Admin Service — Uses Python backend or Supabase directly.
 */

import type { ReturnRecord, ReturnsSummaryData, LoanStatus } from '../../features/returns/returns.types';

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

function mapPrestamoToReturnRecord(row: any, index: number): ReturnRecord {
  const usuario = row.usuarios || {};
  const ejemplar = row.ejemplares || {};
  const libro = ejemplar.libros || {};

  let authorName = 'Autor desconocido';
  if (Array.isArray(libro.libro_autores) && libro.libro_autores.length > 0) {
    const first = libro.libro_autores[0];
    if (first.autores?.nombre) authorName = first.autores.nombre;
  }

  const userName = usuario.nombre_completo || 'Usuario desconocido';
  const now = new Date();
  const dueDate = row.fecha_limite_devolucion ? new Date(row.fecha_limite_devolucion) : now;
  const diffMs = dueDate.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const isOverdue = diffDays < 0;

  let status: LoanStatus = 'ACTIVE';
  let daysDiffText = '';
  let daysDiffType: 'remaining' | 'overdue' | 'due-soon' = 'remaining';

  if (row.estado === 'devuelto') {
    status = 'RETURNED';
    daysDiffText = 'Devuelto';
    daysDiffType = 'remaining';
  } else if (isOverdue) {
    status = 'OVERDUE';
    daysDiffText = `${Math.abs(diffDays)} días de retraso`;
    daysDiffType = 'overdue';
  } else if (diffDays <= 3) {
    status = 'DUE_SOON';
    daysDiffText = `${diffDays} días restantes`;
    daysDiffType = 'due-soon';
  } else {
    status = 'ACTIVE';
    daysDiffText = `${diffDays} días restantes`;
    daysDiffType = 'remaining';
  }

  return {
    id: row.id,
    loanId: row.id,
    folio: `PR-${String(index + 1).padStart(3, '0')}`,
    userId: row.usuario_id || '',
    userName,
    userEmail: usuario.email || '',
    userCategory: 'STUDENT',
    userInitials: getInitials(userName),
    userAvatarColor: AVATAR_COLORS[index % AVATAR_COLORS.length],
    resourceId: ejemplar.codigo_inventario || row.ejemplar_id || '',
    resourceTitle: libro.titulo || 'Sin título',
    resourceAuthor: authorName,
    isbn: libro.isbn || undefined,
    checkoutDate: formatDate(row.fecha_prestamo),
    dueDate: formatDate(row.fecha_limite_devolucion),
    isOverdue,
    daysDiffText,
    daysDiffType,
    status,
    returnDate: row.fecha_devolucion_real ? formatDate(row.fecha_devolucion_real) : undefined,
    borrowerCode: usuario.matricula_o_nomina || (row.usuario_id ? row.usuario_id.slice(0, 8).toUpperCase() : undefined),
    borrowerCareer: usuario.carrera_o_dependencia || undefined,
    borrowerPhone: usuario.telefono || undefined,
    inventoryCode: ejemplar.codigo_inventario || undefined,
    location: ejemplar.ubicacion_estante || undefined,
    notes: row.notas || undefined,
  };
}

export async function fetchReturnRecordById(loanId: string): Promise<ReturnRecord | null> {
  if (!loanId) return null;
  const token = localStorage.getItem('acervo_token');
  const headers: Record<string, string> = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // 1. Intentar consulta directa por ID
  try {
    const res = await fetch(`/api/v1/data/prestamos/${encodeURIComponent(loanId)}`, { headers });
    if (res.ok) {
      const row = await res.json();
      if (row && row.id) {
        return mapPrestamoToReturnRecord(row, 0);
      }
    }
  } catch (e) {
    console.warn('[ReturnsService] Direct fetch by ID failed, falling back to list:', e);
  }

  // 2. Consulta fallback a la lista general
  try {
    const res = await fetch('/api/v1/data/prestamos', { headers });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        const idx = data.findIndex(
          (p: any, i: number) =>
            p.id === loanId ||
            `PR-${String(i + 1).padStart(3, '0')}`.toLowerCase() === loanId.toLowerCase()
        );
        if (idx !== -1) {
          return mapPrestamoToReturnRecord(data[idx], idx);
        }
      }
    }
  } catch (err) {
    console.warn('[ReturnsService] fetchReturnRecordById fallback failed:', err);
  }

  return null;
}

export async function fetchReturnRecords(): Promise<ReturnRecord[]> {
  try {
    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const res = await fetch('/api/v1/data/prestamos', { headers });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        return data
          .filter((p: any) => p.estado !== 'devuelto')
          .map((row: any, i: number) => mapPrestamoToReturnRecord(row, i));
      }
    }
  } catch (err) {
    console.warn('[ReturnsService] Backend fetch failed:', err);
  }

  return [];
}

export async function fetchReturnsSummary(): Promise<ReturnsSummaryData> {
  const records = await fetchReturnRecords();
  const overdue = records.filter(r => r.isOverdue).length;
  return { pendingReturnsCount: records.length, overdueCount: overdue, returnedTodayCount: 0 };
}
