import {
  LayoutDashboard,
  BookOpen,
  Users,
  BookMarked,
  RotateCcw,
  Sparkles,
  BarChart3,
  User,
  Home,
  Clock,
  BookmarkCheck,
} from 'lucide-react';

export const APP_NAME = 'Sistema de Acervo';
export const APP_DESCRIPTION = 'Sistema web para gestión de acervo, préstamos y consultas bibliográficas.';

export const ROLE_LABELS: Record<string, string> = {
  ADMIN: 'Administrador',
  LIBRARIAN: 'Bibliotecario',
};

export const CATEGORY_LABELS: Record<string, string> = {
  TEACHER: 'Docente',
  STUDENT: 'Alumno',
  EXTERNAL: 'Persona externa',
  ROOM: 'Sala',
  GRADUATE: 'Egresado',
};

export const STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Activo',
  INACTIVE: 'Inactivo',
  SUSPENDED: 'Suspendido',
};

export const ADMIN_NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Catálogo', path: '/admin/catalog', icon: BookOpen },
  { label: 'Usuarios', path: '/admin/users', icon: Users },
  { label: 'Préstamos', path: '/admin/loans', icon: BookMarked },
  { label: 'Devoluciones', path: '/admin/returns', icon: RotateCcw },
  { label: 'Búsqueda Inteligente', path: '/admin/search', icon: Sparkles },
  { label: 'Reportes', path: '/admin/reports', icon: BarChart3 },
  { label: 'Perfil', path: '/admin/profile', icon: User },
];

export const USER_NAV_ITEMS = [
  { label: 'Inicio', path: '/user/home', icon: Home },
  { label: 'Explorar catálogo', path: '/user/catalog', icon: BookOpen },
  { label: 'Mis solicitudes', path: '/user/requests', icon: Clock },
  { label: 'Mis préstamos', path: '/user/loans', icon: BookmarkCheck },
  { label: 'Mi perfil', path: '/user/profile', icon: User },
];

export * from './categories';

