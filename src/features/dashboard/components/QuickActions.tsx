import React from 'react';
import { useNavigate } from 'react-router-dom';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-quick-actions" aria-label="Acciones rápidas">
      <button
        type="button"
        className="dashboard-btn-outline"
        onClick={() => navigate('/admin/catalog/new')}
      >
        <span>+ Agregar libro</span>
      </button>

      <button
        type="button"
        className="dashboard-btn-outline"
        onClick={() => navigate('/admin/users')}
      >
        <span>+ Registrar usuario</span>
      </button>

      <button
        type="button"
        className="dashboard-btn-highlight"
        onClick={() => navigate('/admin/loans/new')}
      >
        <span>+ Nuevo préstamo</span>
      </button>

      <button
        type="button"
        className="dashboard-btn-outline"
        onClick={() => navigate('/admin/returns')}
      >
        <span>Registrar devolución</span>
      </button>
    </div>
  );
};
