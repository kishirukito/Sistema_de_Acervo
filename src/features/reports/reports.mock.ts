import type {
  ReportSummaryMetrics,
  MonthlyLoanTrend,
  TopBorrowedBook,
  LoanStatusDistribution,
  CategoryLoanMetric,
  OverdueLoanItem,
  QuickReportItem,
} from './reports.types';

export const MOCK_REPORT_SUMMARY: ReportSummaryMetrics = {
  totalLoans: 286,
  totalLoansGrowth: '↑ 8% vs ago.',
  activeLoans: 32,
  returnedLoans: 241,
  returnedGrowth: '↑ 12% vs ago.',
  overdueLoans: 13,
  overdueDifference: '↓ 3 vs ago.',
};

export const MOCK_MONTHLY_TRENDS: MonthlyLoanTrend[] = [
  { month: 'Abril', shortMonth: 'Abr', count: 48 },
  { month: 'Mayo', shortMonth: 'May', count: 60 },
  { month: 'Junio', shortMonth: 'Jun', count: 72 },
  { month: 'Julio', shortMonth: 'Jul', count: 62 },
  { month: 'Agosto', shortMonth: 'Ago', count: 85 },
  { month: 'Septiembre', shortMonth: 'Sep', count: 80 },
];

export const MOCK_TOP_BOOKS: TopBorrowedBook[] = [
  { id: 'tb-1', title: 'El principito', count: 48 },
  { id: 'tb-2', title: 'Cien años de soledad', count: 41 },
  { id: 'tb-3', title: 'Don Quijote de la Ma...', count: 36 },
  { id: 'tb-4', title: 'Introducción a Pytho...', count: 28 },
  { id: 'tb-5', title: 'Harry Potter', count: 24 },
];

export const MOCK_STATUS_DISTRIBUTION: LoanStatusDistribution[] = [
  {
    status: 'RETURNED',
    label: 'Devueltos',
    count: 241,
    percentage: 84,
    color: '#27AE60',
  },
  {
    status: 'ACTIVE',
    label: 'Activos',
    count: 32,
    percentage: 11,
    color: '#2F80ED',
  },
  {
    status: 'OVERDUE',
    label: 'Vencidos',
    count: 13,
    percentage: 5,
    color: '#EB5757',
  },
];

export const MOCK_CATEGORIES_METRICS: CategoryLoanMetric[] = [
  { category: '800 — Literatura', count: 92, color: '#2F80ED' },
  { category: '000 — Ciencias de las Computadoras, Información y Obras Generales', count: 73, color: '#1E293B' },
  { category: '900 — Historia y Geografía', count: 58, color: '#22C55E' },
  { category: '500 — Ciencias', count: 44, color: '#EAB308' },
  { category: '600 — Tecnología', count: 30, color: '#8B5CF6' },
];

export const MOCK_OVERDUE_LOANS: OverdueLoanItem[] = [
  {
    id: 'ov-1',
    folio: 'PR-002',
    userName: 'Carlos Ruiz',
    userInitials: 'CR',
    userAvatarColor: '#B45309',
    bookTitle: 'Don Quijote de la Manc...',
    dueDate: '22 sep. 2026',
    daysOverdue: 7,
    status: 'OVERDUE',
  },
  {
    id: 'ov-2',
    folio: 'PR-005',
    userName: 'Sofía Castillo',
    userInitials: 'SC',
    userAvatarColor: '#C2410C',
    bookTitle: 'Breve historia del tiempo',
    dueDate: '18 sep. 2026',
    daysOverdue: 11,
    status: 'OVERDUE',
  },
  {
    id: 'ov-3',
    folio: 'PR-013',
    userName: 'Tomás Vega',
    userInitials: 'TV',
    userAvatarColor: '#047857',
    bookTitle: 'El código Da Vinci',
    dueDate: '20 sep. 2026',
    daysOverdue: 9,
    status: 'OVERDUE',
  },
];

export const MOCK_QUICK_REPORTS: QuickReportItem[] = [
  {
    id: 'qr-1',
    title: 'Libros más prestados',
    iconName: 'BookOpen',
    iconBgColor: '#EFF6FF',
    iconColor: '#2F80ED',
    fileName: 'libros_mas_prestados_sep_2026.csv',
  },
  {
    id: 'qr-2',
    title: 'Préstamos por periodo',
    iconName: 'ClipboardCheck',
    iconBgColor: '#EFF6FF',
    iconColor: '#2F80ED',
    fileName: 'prestamos_periodo_sep_2026.csv',
  },
  {
    id: 'qr-3',
    title: 'Usuarios más activos',
    iconName: 'Users',
    iconBgColor: '#DCFCE7',
    iconColor: '#16A34A',
    fileName: 'usuarios_mas_activos_sep_2026.csv',
  },
  {
    id: 'qr-4',
    title: 'Devoluciones por periodo',
    iconName: 'RotateCcw',
    iconBgColor: '#FEF3C7',
    iconColor: '#D97706',
    fileName: 'devoluciones_periodo_sep_2026.csv',
  },
  {
    id: 'qr-5',
    title: 'Inventario disponible',
    iconName: 'FileSpreadsheet',
    iconBgColor: '#F3E8FF',
    iconColor: '#9333EA',
    fileName: 'inventario_disponible_sep_2026.csv',
  },
];
