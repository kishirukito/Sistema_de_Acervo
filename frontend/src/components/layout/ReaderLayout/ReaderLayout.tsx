import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { ReaderSidebar } from './ReaderSidebar';
import { ReaderTopbar } from './ReaderTopbar';
import './ReaderLayout.css';

const ROUTE_CONFIG: Record<string, { title: React.ReactNode; subtitle?: string }> = {
  '/user/home': {
    title: 'Inicio',
    subtitle: 'Tu espacio de lectura',
  },
  '/user/catalog': {
    title: 'Explorar catálogo',
    subtitle: 'Tu espacio de lectura',
  },
  '/user/requests': {
    title: 'Mis solicitudes',
    subtitle: 'Tu espacio de lectura',
  },
  '/user/loans': {
    title: 'Mis préstamos',
    subtitle: 'Libros en tu posesión y fechas límite',
  },
  '/user/profile': {
    title: 'Mi perfil',
    subtitle: 'Tu espacio de lectura',
  },
};

export const ReaderLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isRequestSuccess =
    location.pathname.startsWith('/user/catalog/') &&
    location.pathname.includes('/success');

  const isBookRequest =
    !isRequestSuccess &&
    location.pathname.startsWith('/user/catalog/') &&
    (location.pathname.endsWith('/request') || location.pathname.endsWith('/solicitar'));

  const isBookDetail =
    !isRequestSuccess &&
    !isBookRequest &&
    location.pathname.startsWith('/user/catalog/') &&
    location.pathname !== '/user/catalog';

  const currentBookId = (isBookRequest || isRequestSuccess) ? location.pathname.split('/')[3] : null;

  const originFromState = (location.state as { from?: string } | null)?.from;
  const breadcrumbOrigin = (() => {
    if (originFromState?.startsWith('/user/requests')) {
      return { path: originFromState, label: 'Mis solicitudes' };
    }
    if (originFromState?.startsWith('/user/loans')) {
      return { path: originFromState, label: 'Mis préstamos' };
    }
    if (originFromState?.startsWith('/user/home')) {
      return { path: originFromState, label: 'Inicio' };
    }
    return { path: '/user/catalog', label: 'Explorar catálogo' };
  })();

  const currentRoute = isRequestSuccess
    ? {
        title: (
          <nav aria-label="Ruta de navegación" className="reader-topbar-breadcrumb">
            <Link to="/user/catalog" className="reader-topbar-breadcrumb-link">
              Explorar catálogo
            </Link>
            <span className="reader-topbar-breadcrumb-sep" aria-hidden="true">
              /
            </span>
            <span className="reader-topbar-breadcrumb-current" aria-current="page">
              Solicitud enviada
            </span>
          </nav>
        ),
        subtitle: undefined,
      }
    : isBookRequest
    ? {
        title: (
          <nav aria-label="Ruta de navegación" className="reader-topbar-breadcrumb">
            <Link to="/user/catalog" className="reader-topbar-breadcrumb-link">
              Explorar catálogo
            </Link>
            <span className="reader-topbar-breadcrumb-sep" aria-hidden="true">
              /
            </span>
            <Link to={`/user/catalog/${currentBookId}`} className="reader-topbar-breadcrumb-link">
              Detalle del libro
            </Link>
            <span className="reader-topbar-breadcrumb-sep" aria-hidden="true">
              /
            </span>
            <span className="reader-topbar-breadcrumb-current" aria-current="page">
              Solicitar préstamo
            </span>
          </nav>
        ),
        subtitle: undefined,
      }
    : isBookDetail
    ? {
        title: (
          <nav aria-label="Ruta de navegación" className="reader-topbar-breadcrumb">
            <Link to={breadcrumbOrigin.path} state={location.state} className="reader-topbar-breadcrumb-link">
              {breadcrumbOrigin.label}
            </Link>
            <span className="reader-topbar-breadcrumb-sep" aria-hidden="true">
              /
            </span>
            <span className="reader-topbar-breadcrumb-current" aria-current="page">
              Detalle del libro
            </span>
          </nav>
        ),
        subtitle: undefined,
      }
    : ROUTE_CONFIG[location.pathname] || {
        title: 'Sistema de Acervo',
        subtitle: 'Portal del lector',
      };

  return (
    <div className="reader-layout">
      <ReaderSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <div className="reader-layout-main">
        <ReaderTopbar
          title={currentRoute.title}
          subtitle={currentRoute.subtitle}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />
        <main className="reader-layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
