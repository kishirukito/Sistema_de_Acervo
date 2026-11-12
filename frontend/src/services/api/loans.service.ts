import { apiClient } from './client';
import type { Loan, LoanStatus } from '../../types';

/**
 * Consulta segura de préstamos del usuario autenticado en FastAPI / Supabase.
 * Extrae el usuario_id del token Bearer del usuario sin filtrar en el cliente.
 */
export async function fetchMyLoans(): Promise<Loan[]> {
  const token = localStorage.getItem('acervo_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch('/api/v1/data/mis-prestamos', { headers });
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Sesión no autorizada o expirada. Por favor inicia sesión nuevamente.');
    }
    throw new Error(`Error al consultar préstamos (código ${res.status}).`);
  }

  const rawList = await res.json();
  if (!Array.isArray(rawList)) return [];

  return rawList.map((row: any) => ({
    id: row.id,
    bookId: row.libro_id || row.id,
    bookTitle: row.titulo || 'Sin título',
    bookIsbn: row.isbn || '',
    userId: row.usuario_id || '',
    userName: '',
    userEmail: '',
    loanDate: row.fecha_prestamo
      ? new Date(row.fecha_prestamo).toLocaleDateString('es-MX', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : '—',
    dueDate: row.fecha_limite_devolucion
      ? new Date(row.fecha_limite_devolucion).toLocaleDateString('es-MX', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : '—',
    returnDate: row.fecha_devolucion_real
      ? new Date(row.fecha_devolucion_real).toLocaleDateString('es-MX', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : undefined,
    status:
      row.estado === 'vencido'
        ? ('OVERDUE' as LoanStatus)
        : row.estado === 'devuelto'
        ? ('RETURNED' as LoanStatus)
        : ('ACTIVE' as LoanStatus),
    renewalsCount: 0,
    notes: row.notas || undefined,
  }));
}

export const loansService = {
  async getAll(): Promise<Loan[]> {
    const response = await apiClient.get<Loan[]>('/loans');
    return response.data;
  },

  async getByUser(userId: string): Promise<Loan[]> {
    const response = await apiClient.get<Loan[]>(`/loans/user/${userId}`);
    return response.data;
  },

  async updateStatus(loanId: string, status: LoanStatus): Promise<Loan> {
    const response = await apiClient.patch<Loan>(`/loans/${loanId}/status`, { status });
    return response.data;
  },
};
