import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ReaderSidebar } from './ReaderSidebar';
import { ReaderTopbar } from './ReaderTopbar';
import './ReaderLayout.css';

const ROUTE_CONFIG: Record<string, { title: string; subtitle: string }> = {
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
    subtitle: 'Estado y seguimiento de pedidos de préstamo',
  },
  '/user/loans': {
    title: 'Mis préstamos',
    subtitle: 'Libros en tu posesión y fechas límite',
  },
  '/user/profile': {
    title: 'Mi perfil',
    subtitle: 'Datos de tu cuenta de lector',
  },
};

export const ReaderLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const currentRoute =
    ROUTE_CONFIG[location.pathname] ||
    (location.pathname.startsWith('/user/catalog/')
      ? { title: 'Detalle del libro', subtitle: 'Ficha bibliográfica y disponibilidad' }
      : { title: 'Sistema de Acervo', subtitle: 'Portal del lector' });

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
