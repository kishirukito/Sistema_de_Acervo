/**
 * Dashboard Service — Fetches 100% real data from FastAPI endpoints
 * (/api/v1/data/libros, /api/v1/data/prestamos, /api/v1/data/usuarios)
 * with zero fake/hardcoded mocks.
 */

import type {
  MetricData,
  MonthlyLoanData,
  CategoryConsultData,
  RecentActivityItem,
  DashboardAlert,
  ActivityStatus,
} from '../../features/dashboard/dashboard.types';
import {
  BIBLIOGRAPHIC_CATEGORIES,
  getCategoryFullLabel,
} from '../../constants/categories';

export interface DashboardSnapshot {
  metrics: MetricData[];
  monthlyLoans: MonthlyLoanData[];
  categoryConsults: CategoryConsultData[];
  recentActivities: RecentActivityItem[];
  alerts: DashboardAlert[];
  lastSyncTime: string;
}

const MONTH_NAMES = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];

/**
 * Helper to fetch with bearer token from localStorage
 */
async function apiGet<T>(endpoint: string): Promise<T[]> {
  try {
    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const res = await fetch(endpoint, { headers });
    if (!res.ok) {
      console.warn(`[DashboardService] GET ${endpoint} returned ${res.status}`);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error(`[DashboardService] Network error fetching ${endpoint}:`, err);
    return [];
  }
}

/**
 * Format date in Spanish as "DD MMM YYYY"
 */
function formatSpanishDate(isoDate?: string | null): string {
  if (!isoDate) return '—';
  try {
    const d = new Date(isoDate);
    if (isNaN(d.getTime())) return '—';
    const day = String(d.getUTCDate()).padStart(2, '0');
    const month = MONTH_NAMES[d.getUTCMonth()];
    const year = d.getUTCFullYear();
    return `${day} ${month} ${year}`;
  } catch {
    return '—';
  }
}

/**
 * Classifies a book into exactly ONE canonical Dewey category,
 * avoiding duplicate tags.
 */
function classifyBook(book: any): string {
  const dewey = String(book.clasificacion_dewey || '').trim();
  if (dewey && /^\d{3}/.test(dewey)) {
    const code = dewey.slice(0, 3);
    const cat = BIBLIOGRAPHIC_CATEGORIES.find((c) => c.code === code);
    if (cat) return cat.label;
  }

  // Check libro_temas
  if (Array.isArray(book.libro_temas) && book.libro_temas.length > 0) {
    for (const lt of book.libro_temas) {
      const temaNombre = lt.temas?.nombre || lt.nombre || '';
      const fullLabel = getCategoryFullLabel(temaNombre);
      if (fullLabel && fullLabel !== '000 — Generalidades') {
        return fullLabel;
      }
    }
  }

  // Check title heuristics
  const title = String(book.titulo || '').toLowerCase();
  if (title.includes('prince') || title.includes('principito') || title.includes('quijote') || title.includes('soledad') || title.includes('poema')) {
    return '800 — Literatura';
  }
  if (title.includes('historia') || title.includes('geografía') || title.includes('guerra')) {
    return '900 — Historia y Geografía';
  }
  if (title.includes('código') || title.includes('code') || title.includes('software') || title.includes('algorithm') || title.includes('program') || title.includes('clean') || title.includes('comput')) {
    return '000 — Ciencias de las Computadoras, Información y Obras Generales';
  }

  return '000 — Ciencias de las Computadoras, Información y Obras Generales';
}

/**
 * Primary aggregator: fetches real data from backend endpoints and calculates
 * all 5 widgets of the dashboard without any fake data.
 */
export async function fetchDashboardSnapshot(): Promise<DashboardSnapshot> {
  const [libros, prestamos, usuarios] = await Promise.all([
    apiGet<any>('/api/v1/data/libros'),
    apiGet<any>('/api/v1/data/prestamos'),
    apiGet<any>('/api/v1/data/usuarios'),
  ]);

  const now = new Date();

  // 1. Libros & Ejemplares counts
  const totalBooks = libros.length;
  let totalEjemplares = 0;
  let disponiblesEjemplares = 0;
  let exhaustedBooksCount = 0;

  for (const b of libros) {
    const ejList = Array.isArray(b.ejemplares) ? b.ejemplares : [];
    const bTotal = ejList.length;
    const bDisp = ejList.filter((e: any) => e.estado === 'disponible').length;
    totalEjemplares += bTotal;
    disponiblesEjemplares += bDisp;
    if (bTotal > 0 && bDisp === 0) {
      exhaustedBooksCount++;
    }
  }

  // 2. Préstamos metrics
  let activeLoans = 0;
  let overdueLoans = 0;
  let dueSoonLoans = 0;
  const in48Hours = new Date(now.getTime() + 48 * 3600 * 1000);

  for (const p of prestamos) {
    const estado = String(p.estado || '').toLowerCase();
    const isReturned = estado === 'devuelto' || Boolean(p.fecha_devolucion_real);
    const dueDate = p.fecha_limite_devolucion ? new Date(p.fecha_limite_devolucion) : null;
    const isOverdue = !isReturned && (estado === 'vencido' || (dueDate !== null && dueDate < now));

    if (!isReturned) {
      if (isOverdue) {
        overdueLoans++;
        activeLoans++; // Un préstamo vencido sigue activo en circulación
      } else {
        activeLoans++;
        if (dueDate !== null && dueDate <= in48Hours && dueDate >= now) {
          dueSoonLoans++;
        }
      }
    }
  }

  // 3. Usuarios metrics
  const totalUsers = usuarios.length;
  const activeUsers = usuarios.filter((u: any) => u.estado === 'activo').length;

  // 4. KPI Cards
  const metrics: MetricData[] = [
    {
      id: 'metric-books',
      title: 'TOTAL DE LIBROS',
      value: totalBooks,
      trend: `${disponiblesEjemplares} disponibles / ${totalEjemplares} totales`,
      trendType: 'neutral',
      iconType: 'book',
      accentColor: '#1E3A5F',
      badgeBgColor: '#EFF6FF',
    },
    {
      id: 'metric-active-loans',
      title: 'PRÉSTAMOS ACTIVOS',
      value: activeLoans,
      trend: `${activeLoans} en circulación`,
      trendType: 'neutral',
      iconType: 'book-open',
      accentColor: '#27AE60',
      badgeBgColor: '#DDF5E7',
    },
    {
      id: 'metric-users',
      title: 'USUARIOS REGISTRADOS',
      value: totalUsers,
      trend: `${activeUsers} usuarios activos`,
      trendType: 'positive',
      iconType: 'clipboard',
      accentColor: '#2F80ED',
      badgeBgColor: '#EFF6FF',
    },
    {
      id: 'metric-overdue',
      title: 'PRÉSTAMOS VENCIDOS',
      value: overdueLoans,
      trend: overdueLoans > 0 ? `${overdueLoans} requieren atención` : 'Sin adeudos pendientes',
      trendType: overdueLoans > 0 ? 'negative' : 'positive',
      iconType: 'clock',
      accentColor: '#EB5757',
      badgeBgColor: '#FDE2E2',
    },
  ];

  // 5. Monthly Loans (Current Year)
  const currentYear = now.getFullYear();
  const monthlyCounts: Record<string, number> = {};
  MONTH_NAMES.forEach((m) => { monthlyCounts[m] = 0; });

  for (const p of prestamos) {
    if (p.fecha_prestamo) {
      const d = new Date(p.fecha_prestamo);
      if (!isNaN(d.getTime()) && d.getFullYear() === currentYear) {
        const m = MONTH_NAMES[d.getMonth()];
        if (m) monthlyCounts[m]++;
      }
    }
  }

  const monthlyLoans: MonthlyLoanData[] = MONTH_NAMES.map((m) => ({
    month: m,
    loans: monthlyCounts[m] || 0,
  }));

  // 6. Category Consults / Libros por categoría
  const categoryCounts: Record<string, number> = {};
  for (const b of libros) {
    const catLabel = classifyBook(b);
    categoryCounts[catLabel] = (categoryCounts[catLabel] || 0) + 1;
  }

  const categoryConsults: CategoryConsultData[] = Object.entries(categoryCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  // 7. Recent Activities (Top 6–8 real movements)
  const sortedPrestamos = [...prestamos].sort((a, b) => {
    const dateA = new Date(a.fecha_devolucion_real || a.fecha_prestamo || 0).getTime();
    const dateB = new Date(b.fecha_devolucion_real || b.fecha_prestamo || 0).getTime();
    return dateB - dateA;
  });

  const recentActivities: RecentActivityItem[] = sortedPrestamos.slice(0, 8).map((p, idx) => {
    const isReturned = p.estado === 'devuelto' || Boolean(p.fecha_devolucion_real);
    const dueDate = p.fecha_limite_devolucion ? new Date(p.fecha_limite_devolucion) : null;
    const isOverdue = !isReturned && (p.estado === 'vencido' || (dueDate !== null && dueDate < now));

    let status: ActivityStatus = 'Activo';
    if (isReturned) status = 'Devuelto';
    else if (isOverdue) status = 'Vencido';

    let userName = 'Usuario';
    if (p.usuarios?.nombre_completo) {
      userName = p.usuarios.nombre_completo;
    } else if (p.instituciones_convenio?.nombre) {
      userName = `${p.instituciones_convenio.nombre}${p.instituciones_convenio.nombre_biblioteca ? ` (${p.instituciones_convenio.nombre_biblioteca})` : ''}`;
    } else if (p.responsable_externo_nombre) {
      userName = p.responsable_externo_nombre;
    }

    const bookTitle = p.ejemplares?.libros?.titulo || 'Recurso bibliográfico';
    const activityDate = formatSpanishDate(p.fecha_devolucion_real || p.fecha_prestamo);

    return {
      id: p.id || `act-real-${idx}`,
      type: isReturned ? 'Devolución' : 'Préstamo',
      user: userName,
      resource: bookTitle,
      date: activityDate,
      status,
    };
  });

  // 8. Alerts
  const alerts: DashboardAlert[] = [];
  if (overdueLoans > 0) {
    alerts.push({
      id: 'alert-overdue',
      title: 'Préstamos vencidos',
      text: `Hay ${overdueLoans} préstamo(s) con fecha vencida que requieren devolución inmediata.`,
      type: 'error',
      actionUrl: '/admin/returns',
      actionText: 'Ir a Devoluciones',
    });
  }

  if (dueSoonLoans > 0) {
    alerts.push({
      id: 'alert-due-soon',
      title: 'Próximos a vencer',
      text: `${dueSoonLoans} préstamo(s) vencerán dentro de las próximas 48 horas.`,
      type: 'warning',
      actionUrl: '/admin/loans',
      actionText: 'Ver Préstamos',
    });
  }

  if (exhaustedBooksCount > 0) {
    alerts.push({
      id: 'alert-exhausted',
      title: 'Ejemplares agotados',
      text: `${exhaustedBooksCount} libro(s) tienen todos sus ejemplares prestados actualmente.`,
      type: 'warning',
      actionUrl: '/admin/catalog',
      actionText: 'Ver Catálogo',
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      id: 'alert-ok',
      title: 'Todo en orden',
      text: 'No hay préstamos vencidos ni alertas pendientes en el acervo.',
      type: 'success',
    });
  }

  // 9. Last sync timestamp in Spanish (HH:MM hrs)
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const lastSyncTime = `hoy, ${hours}:${minutes} hrs`;

  return {
    metrics,
    monthlyLoans,
    categoryConsults,
    recentActivities,
    alerts,
    lastSyncTime,
  };
}

// Backwards compatibility functions delegating to snapshot
export async function fetchDashboardMetrics(): Promise<MetricData[]> {
  const snap = await fetchDashboardSnapshot();
  return snap.metrics;
}

export async function fetchMonthlyLoans(): Promise<MonthlyLoanData[]> {
  const snap = await fetchDashboardSnapshot();
  return snap.monthlyLoans;
}

export async function fetchCategoryConsults(): Promise<CategoryConsultData[]> {
  const snap = await fetchDashboardSnapshot();
  return snap.categoryConsults;
}

export async function fetchRecentActivities(): Promise<RecentActivityItem[]> {
  const snap = await fetchDashboardSnapshot();
  return snap.recentActivities;
}

export async function fetchDashboardAlerts(): Promise<DashboardAlert[]> {
  const snap = await fetchDashboardSnapshot();
  return snap.alerts;
}
