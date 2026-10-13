import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AppSidebar } from '../AppSidebar';
import { Topbar } from '../Topbar';
import { ADMIN_NAV_ITEMS } from '../../../constants';
import { useAuth } from '../../../features/auth/AuthContext';
import '../Layout.css';

const ADMIN_ROUTE_TITLES: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/catalog': 'Catálogo de libros',
  '/admin/catalog/new': 'Registrar Nuevo Título',
  '/admin/users': 'Usuarios',
  '/admin/loans': 'Préstamos',
  '/admin/loans/new': 'Nuevo Préstamo',
  '/admin/returns': 'Devoluciones',
  '/admin/search': 'Búsqueda Inteligente',
  '/search': 'Búsqueda Inteligente',
  '/admin/reports': 'Reportes',
  '/admin/profile': 'Mi perfil',
};

export const AdminLayout: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If normal user tries to access admin routes, redirect to user home
  if (user?.kind !== 'ADMINISTRATIVE') {
    return <Navigate to="/user/home" replace />;
  }

  const currentTitle = ADMIN_ROUTE_TITLES[location.pathname] || 'Sistema de Acervo';

  return (
    <div className="app-layout">
      <AppSidebar items={ADMIN_NAV_ITEMS} />
      <div className="app-layout-main">
        <Topbar title={currentTitle} />
        <main className="app-layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
