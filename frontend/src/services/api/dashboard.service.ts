/**
 * Dashboard Service — Fetches aggregate metrics from Supabase
 * for the admin dashboard.
 *
 * Falls back to mock data when Supabase is unreachable.
 */

import { supabase } from './supabase';
import {
  MOCK_METRICS,
  MOCK_MONTHLY_LOANS,
  MOCK_CATEGORY_CONSULTS,
  MOCK_RECENT_ACTIVITIES,
  MOCK_DASHBOARD_ALERTS,
} from '../../features/dashboard/dashboard.mock';
import type {
  MetricData,
  MonthlyLoanData,
  CategoryConsultData,
  RecentActivityItem,
  DashboardAlert,
} from '../../features/dashboard/dashboard.types';

export async function fetchDashboardMetrics(): Promise<MetricData[]> {
  try {
    // Fetch counts in parallel
    const [booksRes, usersRes, loansActiveRes, loansOverdueRes] = await Promise.all([
      supabase.from('libros').select('id', { count: 'exact', head: true }),
      supabase.from('usuarios').select('id', { count: 'exact', head: true }),
      supabase.from('prestamos').select('id', { count: 'exact', head: true }).in('estado', ['activo', 'renovado']),
      supabase.from('prestamos').select('id', { count: 'exact', head: true }).eq('estado', 'vencido'),
    ]);

    const totalBooks = booksRes.count ?? 0;
    const totalUsers = usersRes.count ?? 0;
    const activeLoans = loansActiveRes.count ?? 0;
    const overdueLoans = loansOverdueRes.count ?? 0;

    // If all counts are 0 and there were errors, fall back to mocks
    if (totalBooks === 0 && totalUsers === 0 && booksRes.error) {
      return [...MOCK_METRICS];
    }

    return [
      {
        id: 'metric-books',
        title: 'Libros en catálogo',
        value: totalBooks,
        trend: `${totalBooks} títulos registrados`,
        trendType: 'neutral',
        iconType: 'book',
        accentColor: '#2F80ED',
        badgeBgColor: '#EBF5FF',
      },
      {
        id: 'metric-active-loans',
        title: 'Préstamos activos',
        value: activeLoans,
        trend: `${activeLoans} en circulación`,
        trendType: 'neutral',
        iconType: 'book-open',
        accentColor: '#27AE60',
        badgeBgColor: '#E8F5E9',
      },
      {
        id: 'metric-users',
        title: 'Usuarios registrados',
        value: totalUsers,
        trend: `${totalUsers} usuarios`,
        trendType: 'positive',
        iconType: 'clipboard',
        accentColor: '#F2994A',
        badgeBgColor: '#FFF3E0',
      },
      {
        id: 'metric-overdue',
        title: 'Préstamos vencidos',
        value: overdueLoans,
        trend: overdueLoans > 0 ? `${overdueLoans} requieren atención` : 'Sin vencidos',
        trendType: overdueLoans > 0 ? 'negative' : 'positive',
        iconType: 'clock',
        accentColor: '#EB5757',
        badgeBgColor: '#FEECEC',
      },
    ];
  } catch {
    return [...MOCK_METRICS];
  }
}

export async function fetchMonthlyLoans(): Promise<MonthlyLoanData[]> {
  try {
    const { data, error } = await supabase
      .from('prestamos')
      .select('fecha_prestamo');

    if (error || !data || data.length === 0) return [...MOCK_MONTHLY_LOANS];

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const counts: Record<string, number> = {};
    months.forEach(m => { counts[m] = 0; });

    for (const p of data) {
      if (p.fecha_prestamo) {
        const d = new Date(p.fecha_prestamo);
        const m = months[d.getMonth()];
        if (m) counts[m]++;
      }
    }

    return months.map(m => ({ month: m, loans: counts[m] || 0 }));
  } catch {
    return [...MOCK_MONTHLY_LOANS];
  }
}

export async function fetchCategoryConsults(): Promise<CategoryConsultData[]> {
  try {
    const { data, error } = await supabase
      .from('libro_temas')
      .select('temas ( nombre )');

    if (error || !data || data.length === 0) return [...MOCK_CATEGORY_CONSULTS];

    const counts: Record<string, number> = {};
    for (const lt of data) {
      const name = (lt as any).temas?.nombre || 'Sin categoría';
      counts[name] = (counts[name] || 0) + 1;
    }

    return Object.entries(counts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  } catch {
    return [...MOCK_CATEGORY_CONSULTS];
  }
}

export async function fetchRecentActivities(): Promise<RecentActivityItem[]> {
  try {
    const { data, error } = await supabase
      .from('prestamos')
      .select(`
        id, estado, fecha_prestamo, fecha_devolucion_real,
        usuarios ( nombre_completo ),
        ejemplares ( libros ( titulo ) )
      `)
      .order('fecha_prestamo', { ascending: false })
      .limit(5);

    if (error || !data || data.length === 0) return [...MOCK_RECENT_ACTIVITIES];

    return data.map((p, i) => {
      const usuario = (p as any).usuarios?.nombre_completo || 'Usuario';
      const libro = (p as any).ejemplares?.libros?.titulo || 'Libro';
      let status: 'Activo' | 'Devuelto' | 'Vencido' | 'Pendiente' = 'Activo';
      if (p.estado === 'devuelto') status = 'Devuelto';
      else if (p.estado === 'vencido') status = 'Vencido';

      return {
        id: p.id || `act-${i}`,
        type: p.estado === 'devuelto' ? 'Devolución' : 'Préstamo',
        user: usuario,
        resource: libro,
        date: p.fecha_prestamo ? new Date(p.fecha_prestamo).toLocaleDateString('es-MX') : '',
        status,
      };
    });
  } catch {
    return [...MOCK_RECENT_ACTIVITIES];
  }
}

export async function fetchDashboardAlerts(): Promise<DashboardAlert[]> {
  try {
    const alerts: DashboardAlert[] = [];

    // Check for overdue loans
    const { count: overdueCount } = await supabase
      .from('prestamos')
      .select('id', { count: 'exact', head: true })
      .eq('estado', 'vencido');

    if (overdueCount && overdueCount > 0) {
      alerts.push({
        id: 'alert-overdue',
        title: 'Préstamos vencidos',
        text: `Hay ${overdueCount} préstamo(s) con fecha vencida que requieren atención inmediata.`,
        type: 'error',
      });
    }

    // Check for books with no available copies
    const { data: ejemplares } = await supabase
      .from('ejemplares')
      .select('estado');

    if (ejemplares) {
      const unavailable = ejemplares.filter(e => e.estado !== 'disponible').length;
      if (unavailable > 0) {
        alerts.push({
          id: 'alert-unavailable',
          title: 'Ejemplares no disponibles',
          text: `${unavailable} ejemplar(es) se encuentran prestados o en mantenimiento.`,
          type: 'warning',
        });
      }
    }

    if (alerts.length === 0) {
      alerts.push({
        id: 'alert-ok',
        title: 'Todo en orden',
        text: 'No hay alertas pendientes en el sistema.',
        type: 'success',
      });
    }

    return alerts;
  } catch {
    return [...MOCK_DASHBOARD_ALERTS];
  }
}

