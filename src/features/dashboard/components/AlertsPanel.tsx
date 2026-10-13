import React from 'react';
import { AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import type { DashboardAlert } from '../dashboard.types';

interface AlertsPanelProps {
  alerts: DashboardAlert[];
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  const renderAlertIcon = (type: DashboardAlert['type']) => {
    switch (type) {
      case 'error':
        return <AlertTriangle size={18} color="#B42318" />;
      case 'warning':
        return <Clock size={18} color="#9A6700" />;
      case 'success':
        return <CheckCircle2 size={18} color="#1D7A46" />;
      default:
        return <AlertTriangle size={18} />;
    }
  };

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">Alertas</h3>
      </div>

      <div className="alerts-list">
        {alerts.map((alertItem) => (
          <div
            key={alertItem.id}
            className={`alert-box alert-box--${alertItem.type}`}
          >
            <div className="alert-icon-wrapper" aria-hidden="true">
              {renderAlertIcon(alertItem.type)}
            </div>
            <div className="alert-content">
              <span className="alert-title">{alertItem.title}</span>
              <span className="alert-text">{alertItem.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="alerts-footer">
        Última actualización: hoy, 08:42 a.m.
      </div>
    </div>
  );
};
