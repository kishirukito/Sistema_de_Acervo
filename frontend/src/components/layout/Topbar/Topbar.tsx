import React, { useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, Clock, BookOpen, CheckCircle2, Menu, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../features/auth/AuthContext';
import './Topbar.css';

interface PendingPasswordReset {
  user_id: string;
  email: string;
  nombre: string;
  requested_at: number;
}

interface TopbarProps {
  title?: React.ReactNode;
  onOpenMobileMenu?: () => void;
}

function getInitials(name: string): string {
  if (!name) return 'AG';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  return (name.slice(0, 2) || 'AG').toUpperCase();
}

export const Topbar: React.FC<TopbarProps> = ({ title = 'Dashboard', onOpenMobileMenu }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [pendingResets, setPendingResets] = useState<PendingPasswordReset[]>([]);
  const notifyRef = useRef<HTMLDivElement>(null);

  const userName = user?.name || 'Administrador General';
  const userInitials = getInitials(userName);
  const userRole = (user as any)?.role === 'ADMIN' ? 'Administrador' : (user?.kind === 'ADMINISTRATIVE' ? 'Administrador' : 'Usuario');

  // Poll pending password reset requests for administrative users
  useEffect(() => {
    if (user?.kind !== 'ADMINISTRATIVE') return;
    let active = true;

    const fetchPendingResets = async () => {
      try {
        const token = localStorage.getItem('acervo_token');
        if (!token) return;
        const res = await fetch('/api/v1/auth/forgot-password/pending', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok && active) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setPendingResets(data);
          }
        }
      } catch {
        // Ignore transient network errors
      }
    };

    fetchPendingResets();
    const interval = setInterval(fetchPendingResets, 60000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [user?.kind]);

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
        {onOpenMobileMenu && (
          <button
            type="button"
            className="app-topbar-mobile-menu-btn"
            onClick={onOpenMobileMenu}
            aria-label="Abrir menú de navegación"
          >
            <Menu size={22} color="#1E3A5F" />
          </button>
        )}
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
                <span className="app-notifications-badge">
                  {pendingResets.length > 0
                    ? `${pendingResets.length} solicitud(es) de clave`
                    : '2 nuevas'}
                </span>
              </div>
              <div className="app-notifications-list">
                {pendingResets.map((req) => (
                  <button
                    key={req.user_id}
                    type="button"
                    className="app-notification-item"
                    style={{ width: '100%', border: 'none', textAlign: 'left', cursor: 'pointer' }}
                    onClick={() => {
                      setShowNotifications(false);
                      // Navegar a la sección de usuarios y pasar el id para abrir la modal allá
                      navigate('/admin/users', {
                        state: { resetUserId: req.user_id },
                      });
                    }}
                  >
                    <div className="app-notification-icon app-notification-icon--warning" aria-hidden="true">
                      <KeyRound size={14} />
                    </div>
                    <div className="app-notification-content">
                      <p className="app-notification-text">
                        <strong>Restablecer contraseña</strong>: {req.nombre} ({req.email}) solicitó ayuda.
                      </p>
                      <span className="app-notification-time">Ir a Usuarios para atender</span>
                    </div>
                  </button>
                ))}

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
            {(user as any)?.avatarUrl ? (
              <img
                src={(user as any).avatarUrl}
                alt={userName}
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              userInitials
            )}
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
