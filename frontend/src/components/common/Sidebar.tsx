import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookMarked, Repeat, LayoutDashboard, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.rol === 'administrador';

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/catalog" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <BookMarked size={18} />
          <span>Catálogo de Libros</span>
        </NavLink>

        <NavLink to="/loans" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Repeat size={18} />
          <span>Préstamos</span>
        </NavLink>

        {isAdmin && (
          <>
            <NavLink to="/admin" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <ShieldCheck size={18} />
              <span>Inventario Admin</span>
            </NavLink>

            <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <LayoutDashboard size={18} />
              <span>Estadísticas</span>
            </NavLink>
          </>
        )}
      </nav>
      <div className="sidebar-footer">
        <small><Sparkles size={12} /> CIU UNIPOLI v1.0</small>
      </div>
    </aside>
  );
};
