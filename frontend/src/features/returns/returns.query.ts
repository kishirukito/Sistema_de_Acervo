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

/**
 * Deriva el resumen KPI desde los registros ya cargados.
 * Nunca hace petición adicional; elimina la segunda llamada a fetchReturnRecords()
 * que fetchReturnsSummary() hacía internamente.
 */
export function deriveReturnsSummary(records: ReturnRecord[]): ReturnsSummaryData {
  let pending = 0;
  let overdue = 0;
  let returnedToday = 0;
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  for (const r of records) {
    if (r.status === 'RETURNED') {
      if (r.rawReturnDate && r.rawReturnDate.startsWith(todayStr)) {
        returnedToday++;
      }
    } else {
      pending++;
      if (r.isOverdue || r.status === 'OVERDUE') {
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

