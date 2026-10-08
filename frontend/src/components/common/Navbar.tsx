import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, LogOut, User as UserIcon, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <BookOpen className="icon" />
        <span className="brand-title">Sistema de Acervo CIU</span>
        <span className="ai-badge">
          <Sparkles size={14} /> IA Habilitada
        </span>
      </div>

      <div className="navbar-user">
        {user ? (
          <>
            <span className="user-name">
              <UserIcon size={16} /> {user.nombre_completo} ({user.rol})
            </span>
            <button onClick={logout} className="btn-logout" title="Cerrar sesión">
              <LogOut size={16} /> Salir
            </button>
          </>
        ) : (
          <span className="user-guest">Invitado</span>
        )}
      </div>
    </header>
  );
};
