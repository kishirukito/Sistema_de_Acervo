/**
 * admin-loans.query.ts — React Query hooks centralizados para préstamos admin.
 *
 * Clave compartida: 'admin-loans'
 * staleTime: 2 min  — Los datos en caché se reutilizan sin re-fetch al volver a la pantalla.
 * gcTime:   10 min  — Los datos se conservan en memoria tras desmontar el componente.
 *
 * fetchLoansSummary() en loans-admin.service.ts llamaba internamente a fetchAdminLoans()
 * → duplicaba la petición a /api/v1/data/prestamos en cada montaje de LoansPage.
 * Aquí derivamos el resumen directamente de los datos ya en caché, sin petición adicional.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAdminLoans } from '../../services/api/loans-admin.service';
import type { Loan, LoansSummaryData } from './loans.types';

export const ADMIN_LOANS_KEY = 'admin-loans';

/** Hook principal — carga todos los préstamos admin con caché de 2 minutos. */
export function useAdminLoans() {
  return useQuery<Loan[]>({
    queryKey: [ADMIN_LOANS_KEY],
    queryFn: fetchAdminLoans,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}

/**
 * Deriva el resumen KPI desde los préstamos ya cargados.
 * Nunca hace petición adicional; elimina la segunda llamada a fetchAdminLoans()
 * que fetchLoansSummary() hacía internamente.
 */
export function deriveLoansSummary(loans: Loan[]): LoansSummaryData {
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

/** Invalida la caché de préstamos (úsalo después de registrar, renovar o devolver). */
export function invalidateAdminLoans(queryClient: ReturnType<typeof useQueryClient>) {
  return queryClient.invalidateQueries({ queryKey: [ADMIN_LOANS_KEY] });
}
