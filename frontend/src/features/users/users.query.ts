/**
 * users.query.ts — React Query hooks centralizados para usuarios administrados.
 *
 * Clave compartida: 'admin-users'
 * staleTime: 2 min  — Los datos en caché se reutilizan sin re-fetch al volver a la pantalla.
 * gcTime:   10 min  — Los datos se conservan en memoria tras desmontar el componente.
 *
 * fetchUsersMetrics() en users-managed.service.ts hacía una segunda llamada completa
 * a fetchManagedUsers() solo para contar totales → duplicaba la petición a /api/v1/data/usuarios.
 * Aquí derivamos las métricas directamente de los datos ya cargados, sin petición adicional.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchManagedUsers } from '../../services/api/users-managed.service';
import type { ManagedUser, UsersMetricsData } from './users.types';

export const ADMIN_USERS_KEY = 'admin-users';

/** Hook principal — carga la lista de usuarios con caché de 2 minutos. */
export function useAdminUsers() {
  return useQuery<ManagedUser[]>({
    queryKey: [ADMIN_USERS_KEY],
    queryFn: fetchManagedUsers,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
}

/**
 * Deriva las métricas KPI de los usuarios ya cargados.
 * Nunca hace una petición adicional; consume la caché de useAdminUsers().
 */
export function deriveUsersMetrics(users: ManagedUser[]): UsersMetricsData {
  let activeUsers = 0;
  let overdueLoansCount = 0;
  for (const u of users) {
    if (u.status === 'ACTIVE') activeUsers++;
    if (u.hasOverdueLoan) overdueLoansCount++;
  }
  return { totalUsers: users.length, activeUsers, overdueLoansCount };
}

/** Invalida la caché de usuarios (úsalo después de crear, editar o cambiar estado). */
export function invalidateAdminUsers(queryClient: ReturnType<typeof useQueryClient>) {
  return queryClient.invalidateQueries({ queryKey: [ADMIN_USERS_KEY] });
}

