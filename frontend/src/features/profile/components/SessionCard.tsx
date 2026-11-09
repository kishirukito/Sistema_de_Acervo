import React from 'react';
import { LogOut } from 'lucide-react';

interface SessionCardProps {
  onLogout: () => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({ onLogout }) => {
  return (
    <div className="profile-card">
      <h3 className="profile-card-title">Sesión</h3>

      <div className="profile-session-row">
        <div className="profile-session-info">
          <p className="profile-session-title">
            Cierra sesión de forma segura en este dispositivo.
          </p>
          <p className="profile-session-desc">
            Se cerrarán todas tus sesiones activas en este navegador.
          </p>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="profile-btn-danger"
          aria-label="Cerrar sesión en este dispositivo"
        >
          <LogOut size={16} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
};
