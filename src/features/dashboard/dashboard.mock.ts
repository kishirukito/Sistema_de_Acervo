import type {
  MetricData,
  MonthlyLoanData,
  CategoryConsultData,
  RecentActivityItem,
  DashboardAlert,
} from './dashboard.types';

export const MOCK_METRICS: MetricData[] = [
  {
    id: 'm1',
    title: 'TOTAL DE LIBROS',
    value: '1,250',
    trend: '↑ +12 este mes',
    trendType: 'positive',
    iconType: 'book',
    accentColor: '#1E3A5F',
    badgeBgColor: '#EFF6FF',
  },
  {
    id: 'm2',
    title: 'LIBROS DISPONIBLES',
    value: '860',
    trend: '↑ +5 esta semana',
    trendType: 'positive',
    iconType: 'book-open',
    accentColor: '#27AE60',
    badgeBgColor: '#DDF5E7',
  },
  {
    id: 'm3',
    title: 'PRÉSTAMOS ACTIVOS',
    value: '32',
    iconType: 'clipboard',
    accentColor: '#2F80ED',
    badgeBgColor: '#EFF6FF',
  },
  {
    id: 'm4',
    title: 'PRÉSTAMOS VENCIDOS',
    value: '4',
    iconType: 'clock',
    accentColor: '#EB5757',
    badgeBgColor: '#FDE2E2',
  },
];

export const MOCK_MONTHLY_LOANS: MonthlyLoanData[] = [
  { month: 'Ene', loans: 38 },
  { month: 'Feb', loans: 52 },
  { month: 'Mar', loans: 44 },
  { month: 'Abr', loans: 68 },
  { month: 'May', loans: 58 },
  { month: 'Jun', loans: 74 },
  { month: 'Jul', loans: 60 },
  { month: 'Ago', loans: 86 },
  { month: 'Sep', loans: 78 },
];

export const MOCK_CATEGORY_CONSULTS: CategoryConsultData[] = [
  { category: 'Ciencias', count: 185 },
  { category: 'Historia', count: 142 },
  { category: 'Literatura', count: 228 },
  { category: 'Tecnología', count: 168 },
  { category: 'Arte', count: 98 },
  { category: 'Filosofía', count: 112 },
];

export const MOCK_RECENT_ACTIVITIES: RecentActivityItem[] = [
  {
    id: 'act-1',
    type: 'Préstamo',
    user: 'Ana García',
    resource: 'El Principito',
    date: '29 Sep 2026',
    status: 'Activo',
  },
  {
    id: 'act-2',
    type: 'Devolución',
    user: 'Luis Mendoza',
    resource: 'Cien años de soledad',
    date: '28 Sep 2026',
    status: 'Devuelto',
  },
  {
    id: 'act-3',
    type: 'Préstamo',
    user: 'Sofía Ríos',
    resource: 'Don Quijote',
    date: '27 Sep 2026',
    status: 'Activo',
  },
  {
    id: 'act-4',
    type: 'Vencido',
    user: 'Carlos Vega',
    resource: 'Sapiens',
    date: '20 Sep 2026',
    status: 'Vencido',
  },
  {
    id: 'act-5',
    type: 'Préstamo',
    user: 'Marta López',
    resource: 'Breve historia del tiempo',
    date: '26 Sep 2025',
    status: 'Activo',
  },
  {
    id: 'act-6',
    type: 'Devolución',
    user: 'Tomás Herrera',
    resource: '1984',
    date: '25 Sep 2025',
    status: 'Devuelto',
  },
];

export const MOCK_DASHBOARD_ALERTS: DashboardAlert[] = [
  {
    id: 'alt-1',
    title: 'Préstamos vencidos',
    text: '4 préstamos están vencidos sin devolver.',
    type: 'error',
  },
  {
    id: 'alt-2',
    title: 'Por vencer pronto',
    text: '8 préstamos vencen esta semana.',
    type: 'warning',
  },
  {
    id: 'alt-3',
    title: 'Nuevos registros',
    text: '15 libros fueron registrados este mes.',
    type: 'success',
  },
];
