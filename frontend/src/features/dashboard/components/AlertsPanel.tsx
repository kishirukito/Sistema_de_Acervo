import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import type { DashboardAlert } from '../dashboard.types';

interface AlertsPanelProps {
  alerts: DashboardAlert[];
  lastSyncTime?: string;
}

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts, lastSyncTime }) => {
  const navigate = useNavigate();

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
        {alerts.length === 0 ? (
          <div className="alert-box alert-box--success">
            <div className="alert-icon-wrapper" aria-hidden="true">
              <CheckCircle2 size={18} color="#1D7A46" />
            </div>
            <div className="alert-content">
              <span className="alert-title">Todo en orden</span>
              <span className="alert-text">No hay préstamos vencidos ni alertas pendientes</span>
            </div>
          </div>
        ) : (
          alerts.map((alertItem) => (
            <div
              key={alertItem.id}
              className={`alert-box alert-box--${alertItem.type}`}
              style={alertItem.actionUrl ? { cursor: 'pointer', transition: 'transform 0.15s ease' } : undefined}
              onClick={() => {
                if (alertItem.actionUrl) navigate(alertItem.actionUrl);
              }}
              role={alertItem.actionUrl ? 'button' : undefined}
              tabIndex={alertItem.actionUrl ? 0 : undefined}
              onKeyDown={(e) => {
                if (alertItem.actionUrl && (e.key === 'Enter' || e.key === ' ')) {
                  navigate(alertItem.actionUrl);
                }
              }}
            >
              <div className="alert-icon-wrapper" aria-hidden="true">
                {renderAlertIcon(alertItem.type)}
              </div>
              <div className="alert-content" style={{ flex: 1 }}>
                <span className="alert-title">{alertItem.title}</span>
                <span className="alert-text">{alertItem.text}</span>
              </div>
              {alertItem.actionUrl && (
                <div style={{ display: 'flex', alignItems: 'center', color: '#64748B', marginLeft: 8 }}>
                  <ArrowRight size={15} />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="alerts-footer">
        Última sincronización: {lastSyncTime || 'Datos en tiempo real'}
      </div>
    </div>
  );
};
