import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { BookMarked, LogOut, User, type LucideIcon } from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../../../features/auth/AuthContext';
import { APP_NAME } from '../../../constants';
import './AppSidebar.css';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

interface AppSidebarProps {
  items: NavItem[];
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ items }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Separate main navigation items from profile
  const mainNavItems = items.filter((item) => item.path !== '/admin/profile');

  return (
    <aside className="app-sidebar" aria-label="Navegación principal">
      <div className="app-sidebar-header">
        <div className="app-sidebar-logo-icon">
          <BookMarked size={20} />
        </div>
        <div className="app-sidebar-brand">
          <span className="app-sidebar-brand-name">{APP_NAME}</span>
        </div>
      </div>

      <nav className="app-sidebar-nav">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isSearchMatch =
            item.path === '/admin/search' && (location.pathname === '/search' || location.pathname === '/admin/search');

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx('app-sidebar-link', (isActive || isSearchMatch) && 'app-sidebar-link--active')
              }
            >
              <Icon className="app-sidebar-icon" size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="app-sidebar-footer">
        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            clsx('app-sidebar-link', isActive && 'app-sidebar-link--active')
          }
        >
          <User className="app-sidebar-icon" size={18} />
          <span>Perfil</span>
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          className="app-sidebar-logout-btn"
          aria-label="Cerrar sesión"
        >
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};
