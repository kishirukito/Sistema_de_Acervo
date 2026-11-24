/**
 * returns.query.ts — React Query hooks centralizados para devoluciones admin.
 *
 * Clave compartida: 'admin-returns'
 * staleTime: 2 min  — Los datos en caché se reutilizan sin re-fetch al volver a la pantalla.
 * gcTime:   10 min  — Los datos se conservan en memoria tras desmontar el componente.
 *
 * fetchReturnsSummary() en returns-admin.service.ts llamaba internamente a fetchReturnRecords()
 * → duplicaba la petición a /api/v1/data/prestamos en cada montaje de ReturnsPage.
 * Aquí derivamos el resumen desde los registros ya cargados, sin petición adicional.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchReturnRecords } from '../../services/api/returns-admin.service';
import type { ReturnRecord, ReturnsSummaryData } from './returns.types';

export const ADMIN_RETURNS_KEY = 'admin-returns';

/** Hook principal — carga todos los registros pendientes de devolución con caché de 2 minutos. */
export function useAdminReturns() {
  return useQuery<ReturnRecord[]>({
    queryKey: [ADMIN_RETURNS_KEY],
    queryFn: fetchReturnRecords,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}

export function isDateToday(rawDateStr?: string, formattedStr?: string): boolean {
  if (!rawDateStr && !formattedStr) return false;
  const now = new Date();

  if (rawDateStr) {
    const d = new Date(rawDateStr);
    if (!isNaN(d.getTime())) {
      if (
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate()
      ) {
        return true;
      }
    }
    const localTodayYmd = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    if (rawDateStr.startsWith(localTodayYmd)) {
      return true;
    }
  }

  if (formattedStr) {
    const months = ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'];
    const day = String(now.getDate()).padStart(2, '0');
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const todayFormatted = `${day} ${month} ${year}`;
    if (formattedStr.toLowerCase().trim() === todayFormatted.toLowerCase().trim()) {
      return true;
    }
  }

  return false;
}

/**
 * Deriva el resumen KPI desde los registros ya cargados.
 * Nunca hace petición adicional; elimina la segunda llamada a fetchReturnRecords()
 * que fetchReturnsSummary() hacía internamente.
 */
export function deriveReturnsSummary(records: ReturnRecord[]): ReturnsSummaryData {
  let pending = 0;
  let overdue = 0;
  let returnedToday = 0;

  for (const r of records) {
    if (r.status === 'RETURNED') {
      if (isDateToday(r.rawReturnDate, r.returnDate)) {
        returnedToday++;
      }
    } else {
      pending++;
      if (r.status === 'OVERDUE') {
        overdue++;
      }
    }
  }

  return { pendingReturnsCount: pending, overdueCount: overdue, returnedTodayCount: returnedToday };
}

/** Invalida la caché de devoluciones (úsalo después de procesar una devolución). */
export function invalidateAdminReturns(queryClient: ReturnType<typeof useQueryClient>) {
  return queryClient.invalidateQueries({ queryKey: [ADMIN_RETURNS_KEY] });
}

