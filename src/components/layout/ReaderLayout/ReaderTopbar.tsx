import React, { useState } from 'react';
import { Bell, ChevronDown, Menu, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../features/auth/AuthContext';
import './ReaderTopbar.css';

interface ReaderTopbarProps {
  title?: string;
  subtitle?: string;
  onOpenMobileMenu?: () => void;
}

export const ReaderTopbar: React.FC<ReaderTopbarProps> = ({
  title = 'Inicio',
  subtitle = 'Tu espacio de lectura',
  onOpenMobileMenu,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const userName = user?.name || 'Camila Flores';
  const userCategory = user?.departmentOrCareer === 'Estudiante' || user?.category === 'STUDENT'
    ? 'Estudiante'
    : user?.departmentOrCareer || 'Estudiante';

  // Get user initials (e.g. Camila Flores -> CF)
  const initials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'CF';

  return (
    <header className="reader-topbar" aria-label="Cabecera del lector">
      <div className="reader-topbar-left">
        {onOpenMobileMenu && (
          <button
            type="button"
            className="reader-topbar-menu-btn"
            onClick={onOpenMobileMenu}
            aria-label="Abrir menú lateral"
          >
            <Menu size={20} />
          </button>
        )}

        <div className="reader-topbar-titles">
          <h1 className="reader-topbar-title">{title}</h1>
          {subtitle && <p className="reader-topbar-subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="reader-topbar-right">
        {/* Notification Bell with red dot */}
        <div className="reader-topbar-notify-wrapper">
          <button
            type="button"
            className="reader-topbar-bell-btn"
            aria-label="Notificaciones"
            aria-expanded={showNotifications}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={18} color="#64748B" />
            <span className="reader-topbar-bell-dot" aria-hidden="true" />
          </button>

          {showNotifications && (
            <div className="reader-notifications-popover" role="dialog" aria-label="Notificaciones">
              <div className="reader-notifications-header">
                <span className="reader-notifications-title">Notificaciones</span>
                <span className="reader-notifications-badge">1 nueva</span>
              </div>
              <div className="reader-notifications-list">
                <div className="reader-notification-item">
                  <div className="reader-notification-icon" aria-hidden="true">
                    <Check size={14} />
                  </div>
                  <div className="reader-notification-content">
                    <p className="reader-notification-text">
                      Bienvenida a tu portal de lectura y biblioteca digital.
                    </p>
                    <span className="reader-notification-time">Reciente</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Card */}
        <div
          className="reader-topbar-user"
          role="button"
          tabIndex={0}
          onClick={() => navigate('/user/profile')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              navigate('/user/profile');
            }
          }}
          aria-label={`Perfil de ${userName}`}
          title="Ver mi perfil"
        >
          <div className="reader-topbar-avatar" aria-hidden="true">
            {initials}
          </div>
          <div className="reader-topbar-user-info">
            <span className="reader-topbar-user-name">{userName}</span>
            <span className="reader-topbar-user-role">{userCategory}</span>
          </div>
          <ChevronDown size={14} color="#64748B" className="reader-topbar-chevron" />
        </div>
      </div>
    </header>
  );
};
