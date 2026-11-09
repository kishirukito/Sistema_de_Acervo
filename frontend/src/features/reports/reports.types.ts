export interface ReportSummaryMetrics {
  totalLoans: number;
  totalLoansGrowth: string;
  activeLoans: number;
  returnedLoans: number;
  returnedGrowth: string;
  overdueLoans: number;
  overdueDifference: string;
}

export interface MonthlyLoanTrend {
  month: string;
  shortMonth: string;
  count: number;
}

export interface TopBorrowedBook {
  id: string;
  title: string;
  count: number;
}

export interface LoanStatusDistribution {
  status: 'RETURNED' | 'ACTIVE' | 'OVERDUE';
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface CategoryLoanMetric {
  category: string;
  count: number;
  color: string;
}

export interface OverdueLoanItem {
  id: string;
  folio: string;
  userName: string;
  userInitials: string;
  userAvatarColor: string;
  bookTitle: string;
  dueDate: string;
  daysOverdue: number;
  status: 'OVERDUE';
}

export interface QuickReportItem {
  id: string;
  title: string;
  iconName: string;
  iconBgColor: string;
  iconColor: string;
  fileName: string;
}

export interface ReportsFilterState {
  dateRange: string;
  startDate: string;
  endDate: string;
  category: string;
  userType: string;
  loanStatus: string;
}

export interface SiabucSancionesStats {
  usuarios_sancionados: number;
  total_sanciones: number;
  monto_total: number;
  monto_pendiente: number;
  monto_recaudado: number;
  por_tipo: Array<{ tipo: string; cantidad: number }>;
  detalle: any[];
}

export interface SiabucCirculacion {
  total_prestamos: number;
  prestamos_sala: number;
  prestamos_domicilio: number;
  renovaciones: number;
  prestamos_por_tipo_usuario: Array<{ tipo: string; cantidad: number }>;
  prestamos_por_carrera: Array<{ carrera: string; cantidad: number }>;
  frecuencia_acervo: Array<{ titulo: string; solicitudes: number }>;
  sanciones: SiabucSancionesStats;
}

export interface SiabucProcesosTecnicos {
  total_titulos: number;
  total_ejemplares: number;
  productividad_catalogador: Array<{ catalogador: string; fichas_creadas: number }>;
  altas_por_periodo: Array<{ periodo: string; titulos: number }>;
}

export interface SiabucInventario {
  existencias_totales: number;
  distribucion_estados: Array<{ estado: string; cantidad: number }>;
  existencias_dewey: Array<{ clasificacion: string; cantidad: number }>;
  perdidos_o_bajas: number;
}

export interface SiabucServicios {
  espacios: {
    total_espacios: number;
    total_reservas: number;
    uso_por_espacio: Array<{ espacio: string; reservas: number }>;
    detalle_reservas: any[];
  };
  computo: {
    total_equipos: number;
    total_sesiones: number;
    minutos_totales: number;
    horas_totales: number;
    detalle_sesiones: any[];
  };
}

export interface ResumenEjecutivoReal {
  metricas: ReportSummaryMetrics;
  tendencia_mensual: MonthlyLoanTrend[];
  libros_top: TopBorrowedBook[];
  distribucion_estados: LoanStatusDistribution[];
  categorias_solicitadas: CategoryLoanMetric[];
  actividad_reciente: OverdueLoanItem[];
  alertas: {
    ejemplares_no_disponibles: number;
    multas_pendientes: number;
    prestamos_vencidos: number;
  };
}

export interface CatalogosReportes {
  usuarios: Array<{ id: string; nombre: string; email: string }>;
  espacios: Array<{ id: number; nombre: string; tipo: string }>;
  equipos: Array<{ id: number; codigo: string; ubicacion: string }>;
  ejemplares: Array<{ id: string; codigo: string; estado: string }>;
}

export interface SiabucReportData {
  circulacion: SiabucCirculacion;
  procesos_tecnicos: SiabucProcesosTecnicos;
  inventario: SiabucInventario;
  servicios: SiabucServicios;
  resumen_ejecutivo: ResumenEjecutivoReal;
  catalogos: CatalogosReportes;
}
