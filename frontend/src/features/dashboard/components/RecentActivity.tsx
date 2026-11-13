import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { RecentActivityItem } from '../dashboard.types';

interface RecentActivityProps {
  items: RecentActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ items }) => {
  const navigate = useNavigate();

  const getBadgeClass = (status: RecentActivityItem['status']) => {
    switch (status) {
      case 'Activo':
        return 'activity-badge activity-badge--activo';
      case 'Devuelto':
        return 'activity-badge activity-badge--devuelto';
      case 'Vencido':
        return 'activity-badge activity-badge--vencido';
      default:
        return 'activity-badge activity-badge--activo';
    }
  };

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">Actividad reciente</h3>
        <button
          type="button"
          className="dashboard-card-link"
          onClick={() => navigate('/admin/loans')}
          aria-label="Ver todos los préstamos y devoluciones"
        >
          Ver todo
        </button>
      </div>

      <div className="activity-table-wrapper">
        <table className="activity-table">
          <thead>
            <tr>
              <th>TIPO</th>
              <th>USUARIO</th>
              <th>LIBRO</th>
              <th>FECHA</th>
              <th>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '32px 16px', color: '#64748B' }}>
                  No hay actividad de préstamos registrada en el acervo.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td className="activity-type-cell">{item.type}</td>
                  <td>{item.user}</td>
                  <td>{item.resource}</td>
                  <td>{item.date}</td>
                  <td>
                    <span className={getBadgeClass(item.status)}>{item.status}</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
