export type UserKind = 'ADMINISTRATIVE' | 'NORMAL';

export type AdministrativeRole = 'ADMIN' | 'LIBRARIAN';

export type NormalUserCategory =
  | 'TEACHER'
  | 'STUDENT'
  | 'EXTERNAL'
  | 'ROOM'
  | 'GRADUATE';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface BaseManagedUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  status: UserStatus;
  activeLoans: number;
  borrowerCode: string;
  createdAt: string; // Formatted date or ISO
  hasOverdueLoan?: boolean;
  avatarColor?: string;
  avatarInitials?: string;
}

export interface AdministrativeUser extends BaseManagedUser {
  kind: 'ADMINISTRATIVE';
  role: AdministrativeRole;
  category?: never;
  roomResponsibleName?: never;
}

export interface NormalUser extends BaseManagedUser {
  kind: 'NORMAL';
  category: NormalUserCategory;
  role?: never;
  roomResponsibleName?: string;
}

export type ManagedUser = AdministrativeUser | NormalUser;

export interface UsersFilterState {
  searchQuery: string;
  kind: '' | UserKind;
  roleOrCategory: string;
  status: '' | UserStatus | 'OVERDUE';
}

export interface UsersMetricsData {
  totalUsers: number;
  activeUsers: number;
  overdueLoansCount: number;
}
