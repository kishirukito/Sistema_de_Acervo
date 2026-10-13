import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../../features/auth/AuthContext';
import './Topbar.css';

interface TopbarProps {
  title?: string;
}

export const Topbar: React.FC<TopbarProps> = ({ title = 'Dashboard' }) => {
  const { user } = useAuth();

  const userName =
    user?.name === 'Administrador del Sistema' ? 'Camila Flores' : user?.name || 'Camila Flores';
  const userRole = user?.kind === 'ADMINISTRATIVE' ? 'Administradora' : 'Usuario';

  return (
    <header className="app-topbar">
      <div className="app-topbar-left">
        <h1 className="app-topbar-title">{title}</h1>
      </div>

      <div className="app-topbar-right">
        {/* Notification Bell Icon with Red Dot */}
        <button
          type="button"
          className="app-topbar-bell-btn"
          aria-label="Notificaciones"
          onClick={() => alert('Notificaciones del sistema')}
        >
          <Bell size={18} color="#6B7280" />
          <span className="app-topbar-bell-dot" aria-hidden="true" />
        </button>

        {/* User Profile Info matching Figma */}
        <div
          className="app-topbar-user"
          style={{ cursor: 'pointer' }}
          onClick={() => window.location.pathname !== '/admin/profile' && window.location.assign('/admin/profile')}
          title="Ver perfil"
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
