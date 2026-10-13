export type UserKind = 'ADMINISTRATIVE' | 'NORMAL';

export type AdministrativeRole = 'ADMIN' | 'LIBRARIAN';

export type NormalUserCategory = 'TEACHER' | 'STUDENT' | 'EXTERNAL' | 'ROOM' | 'GRADUATE';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface User {
  id: string;
  name: string;
  email: string;
  kind: UserKind;
  role?: AdministrativeRole;
  category?: NormalUserCategory;
  status: UserStatus;
  avatarUrl?: string;
  identifierCode?: string;
  departmentOrCareer?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
  redirectUrl?: string;
}
