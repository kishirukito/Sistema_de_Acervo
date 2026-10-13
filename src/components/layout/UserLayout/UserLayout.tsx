import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AppSidebar } from '../AppSidebar';
import { Topbar } from '../Topbar';
import { USER_NAV_ITEMS } from '../../../constants';
import { useAuth } from '../../../features/auth/AuthContext';
import '../Layout.css';

const USER_ROUTE_TITLES: Record<string, string> = {
  '/user/home': 'Portal del Usuario',
  '/user/catalog': 'Catálogo Bibliográfico',
  '/user/requests': 'Mis Solicitudes de Préstamo',
  '/user/loans': 'Mis Préstamos Vigentes e Historial',
  '/user/profile': 'Mi Perfil de Usuario',
};

export const UserLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const currentTitle =
    USER_ROUTE_TITLES[location.pathname] ||
    (location.pathname.startsWith('/user/catalog/')
      ? 'Detalle del Libro'
      : location.pathname.startsWith('/user/requests/')
      ? 'Detalle de Solicitud'
      : 'Sistema de Acervo');

  return (
    <div className="app-layout">
      <AppSidebar items={USER_NAV_ITEMS} />
      <div className="app-layout-main">
        <Topbar title={currentTitle} />
        <main className="app-layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
