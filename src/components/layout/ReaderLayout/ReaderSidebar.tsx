import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Bookmark,
  ClipboardCheck,
  User,
  Sparkles,
  LogOut,
  X,
  HelpCircle,
} from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../../../features/auth/AuthContext';
import { APP_NAME } from '../../../constants';
import './ReaderSidebar.css';

export interface ReaderSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const ReaderSidebar: React.FC<ReaderSidebarProps> = ({
  isOpen = false,
  onClose,
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Inicio', path: '/user/home', icon: Home },
    { label: 'Explorar catálogo', path: '/user/catalog', icon: BookOpen },
    { label: 'Mis solicitudes', path: '/user/requests', icon: Bookmark },
    { label: 'Mis préstamos', path: '/user/loans', icon: ClipboardCheck },
    { label: 'Mi perfil', path: '/user/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="reader-sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={clsx('reader-sidebar', isOpen && 'reader-sidebar--open')}
        aria-label="Navegación del lector"
      >
        {/* Sidebar Header: Brand */}
        <div className="reader-sidebar-header">
          <div className="reader-sidebar-brand-group">
            <div className="reader-sidebar-logo" aria-hidden="true">
              <BookOpen size={20} />
            </div>
            <div className="reader-sidebar-brand-text">
              <span className="reader-sidebar-brand-title">{APP_NAME}</span>
            </div>
          </div>

          {/* Close button on mobile */}
          {onClose && (
            <button
              type="button"
              className="reader-sidebar-close-btn"
              onClick={onClose}
              aria-label="Cerrar menú de navegación"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Section title & Navigation */}
        <div className="reader-sidebar-section-label">MI BIBLIOTECA</div>
        <nav className="reader-sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={clsx(
                  'reader-sidebar-link',
                  isActive && 'reader-sidebar-link--active'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="reader-sidebar-icon" size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Help & Search Advice Card */}
        <div className="reader-sidebar-help-card">
          <div className="reader-sidebar-help-header">
            <div className="reader-sidebar-help-icon" aria-hidden="true">
              <Sparkles size={16} />
            </div>
            <div className="reader-sidebar-help-info">
              <h4 className="reader-sidebar-help-title">Ayuda de búsqueda</h4>
              <p className="reader-sidebar-help-desc">Encuentra tu próxima lectura</p>
            </div>
          </div>
          <button
            type="button"
            className="reader-sidebar-help-btn"
            onClick={() => setShowHelpModal(true)}
            aria-label="Ver asistencia de búsqueda"
          >
            ¿Necesitas ayuda?
          </button>
        </div>

        {/* Footer: Logout */}
        <div className="reader-sidebar-footer">
          <button
            type="button"
            onClick={handleLogout}
            className="reader-sidebar-logout-btn"
            aria-label="Cerrar sesión"
          >
            <LogOut size={18} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Help Modal */}
      {showHelpModal && (
        <div
          className="reader-modal-overlay"
          onClick={() => setShowHelpModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reader-help-modal-title"
        >
          <div
            className="reader-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="reader-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <HelpCircle size={22} color="var(--color-primary, #2F80ED)" />
                <h3 id="reader-help-modal-title" className="reader-modal-title">
                  Centro de Ayuda al Lector
                </h3>
              </div>
              <button
                type="button"
                className="reader-modal-close-btn"
                onClick={() => setShowHelpModal(false)}
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>
            </div>
            <div className="reader-modal-body">
              <p>
                ¿No encuentras el libro que buscas o requieres asesoría para tu préstamo?
              </p>
              <div className="reader-modal-tips">
                <div className="reader-modal-tip-item">
                  <strong>Búsqueda avanzada:</strong> Puedes buscar por título, autor,
                  tema general o ISBN desde el buscador principal o explorar por categorías temáticas.
                </div>
                <div className="reader-modal-tip-item">
                  <strong>Atención en sala:</strong> De lunes a viernes de 8:00 a 19:00 hrs en el
                  mostrador central de biblioteca.
                </div>
                <div className="reader-modal-tip-item">
                  <strong>Correo de contacto:</strong> biblioteca@acervo.edu.mx
                </div>
              </div>
            </div>
            <div className="reader-modal-footer">
              <button
                type="button"
                className="reader-modal-primary-btn"
                onClick={() => setShowHelpModal(false)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
