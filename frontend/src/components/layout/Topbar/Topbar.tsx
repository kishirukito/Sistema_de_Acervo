import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, Clock, BookOpen, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../features/auth/AuthContext';
import './Topbar.css';

interface TopbarProps {
  title?: React.ReactNode;
}

export const Topbar: React.FC<TopbarProps> = ({ title = 'Dashboard' }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifyRef = useRef<HTMLDivElement>(null);

  const userName =
    user?.name === 'Administrador del Sistema' ? 'Camila Flores' : user?.name || 'Camila Flores';
  const userRole = user?.kind === 'ADMINISTRATIVE' ? 'Administradora' : 'Usuario';

  // Close notifications on outside click or Escape key
  useEffect(() => {
    if (!showNotifications) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (notifyRef.current && !notifyRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showNotifications]);

  const handleProfileClick = () => {
    if (window.location.pathname !== '/admin/profile') {
      navigate('/admin/profile');
    }
  };

  return (
    <header className="app-topbar">
      <div className="app-topbar-left">
        <h1 className="app-topbar-title">{title}</h1>
      </div>

      <div className="app-topbar-right">
        {/* Notification Bell Icon with Popover */}
        <div className="app-topbar-notify-wrapper" ref={notifyRef}>
          <button
            type="button"
            className="app-topbar-bell-btn"
            aria-label="Notificaciones del sistema"
            aria-expanded={showNotifications}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={18} color="#6B7280" />
            <span className="app-topbar-bell-dot" aria-hidden="true" />
          </button>

          {showNotifications && (
            <div className="app-notifications-popover" role="dialog" aria-label="Notificaciones del sistema">
              <div className="app-notifications-header">
                <span className="app-notifications-title">Notificaciones</span>
                <span className="app-notifications-badge">2 nuevas</span>
              </div>
              <div className="app-notifications-list">
                <div className="app-notification-item">
                  <div className="app-notification-icon app-notification-icon--warning" aria-hidden="true">
                    <Clock size={14} />
                  </div>
                  <div className="app-notification-content">
                    <p className="app-notification-text">
                      <strong>Préstamo por vencer</strong>: PR-002 vence en 24 horas.
                    </p>
                    <span className="app-notification-time">Hace 15 min</span>
                  </div>
                </div>

                <div className="app-notification-item">
                  <div className="app-notification-icon app-notification-icon--info" aria-hidden="true">
                    <BookOpen size={14} />
                  </div>
                  <div className="app-notification-content">
                    <p className="app-notification-text">
                      <strong>Nueva solicitud</strong>: Juan Pérez solicitó un ejemplar.
                    </p>
                    <span className="app-notification-time">Hace 1 hora</span>
                  </div>
                </div>

                <div className="app-notification-item">
                  <div className="app-notification-icon app-notification-icon--success" aria-hidden="true">
                    <CheckCircle2 size={14} />
                  </div>
                  <div className="app-notification-content">
                    <p className="app-notification-text">
                      <strong>Devolución exitosa</strong>: Ejemplar de Python verificado.
                    </p>
                    <span className="app-notification-time">Hace 3 horas</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Info */}
        <div
          className="app-topbar-user"
          role="button"
          tabIndex={0}
          onClick={handleProfileClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleProfileClick();
            }
          }}
          title="Ver perfil"
          aria-label="Perfil del administrador"
        >
          <div className="app-topbar-avatar" aria-hidden="true">
            CF
          </div>
          <div className="app-topbar-user-info">
            <span className="app-topbar-user-name">{userName}</span>
            <span className="app-topbar-user-role">{userRole}</span>
          </div>
          <ChevronDown size={14} color="#6B7280" style={{ marginLeft: 2 }} />
        </div>
      </div>
    </header>
  );
};
