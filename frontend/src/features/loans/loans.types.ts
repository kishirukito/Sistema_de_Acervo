export type LoanStatus = 'ACTIVE' | 'DUE_SOON' | 'OVERDUE' | 'RETURNED';

export type UserKind = 'ADMINISTRATIVE' | 'NORMAL';

export type NormalUserCategory =
  | 'TEACHER'
  | 'STUDENT'
  | 'EXTERNAL'
  | 'ROOM'
  | 'GRADUATE';

export interface LoanType {
  id: string;
  clave: string;
  nombre: string;
  descripcion?: string;
  dias_plazo_default: number;
  requiere_convenio: boolean;
  activo?: boolean;
}

export interface InstitucionConvenio {
  id: string;
  nombre: string;
  nombre_biblioteca?: string | null;
  clave_convenio?: string | null;
  responsable_titular?: string | null;
  responsable_email?: string | null;
  responsable_telefono?: string | null;
  direccion?: string | null;
  activa?: boolean;
}

export interface Loan {
  id: string;
  folio: string;
  userId: string;
  userName: string;
  userKind: UserKind;
  userCategory: NormalUserCategory;
  userInitials: string;
  userAvatarColor: string;
  resourceId: string;
  resourceTitle: string;
  resourceAuthor: string;
  checkoutDate: string; // Formatted display e.g. "25 sep. 2026"
  dueDate: string;      // Formatted display e.g. "02 oct. 2026"
  dueDateNote?: string; // e.g. "3d restantes", "7d vencido", "Vence en 2d"
  returnDate?: string;
  status: LoanStatus;
  renewalCount: number;
  renewalLimit: number;
  notes?: string;
  // Campos del nuevo esquema
  tipoPrestamoId?: string;
  tipoPrestamoClave?: string; // 'domicilio' | 'sala' | 'interbibliotecario'
  tipoPrestamoNombre?: string;
  userCareerName?: string;
  institucionId?: string | null;
  institucionNombre?: string | null;
  institucionBiblioteca?: string | null;
  responsableExternoNombre?: string | null;
  responsableExternoCargo?: string | null;
  responsableExternoContacto?: string | null;
  folioOficio?: string | null;
  autorizadoPorNombre?: string | null;
}

export interface LoansFilterState {
  searchQuery: string;
  status: '' | LoanStatus;
  userCategory: '' | NormalUserCategory;
  dateFilter: string;
}

export interface LoansSummaryData {
  activeLoansCount: number;
  activeTrend: string;
  dueSoonCount: number;
  dueSoonSubtitle: string;
  overdueCount: number;
  overdueSubtitle: string;
  returnedThisMonthCount: number;
  returnedTrend: string;
}
