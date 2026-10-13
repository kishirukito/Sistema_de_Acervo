import React from 'react';
import { Users, UserCheck, Clock } from 'lucide-react';
import type { UsersMetricsData } from '../users.types';

interface UsersMetricsProps {
  metrics: UsersMetricsData;
}

export const UsersMetrics: React.FC<UsersMetricsProps> = ({ metrics }) => {
  return (
    <div className="users-metrics-grid">
      {/* Metric 1: Usuarios registrados */}
      <div className="users-metric-card">
        <div className="users-metric-icon-wrap users-metric-icon-wrap--neutral" aria-hidden="true">
          <Users size={22} color="#4B5563" />
        </div>
        <div className="users-metric-content">
          <span className="users-metric-value">{metrics.totalUsers}</span>
          <span className="users-metric-label">Usuarios registrados</span>
        </div>
      </div>

      {/* Metric 2: Usuarios activos */}
      <div className="users-metric-card">
        <div className="users-metric-icon-wrap users-metric-icon-wrap--success" aria-hidden="true">
          <UserCheck size={22} color="#27AE60" />
        </div>
        <div className="users-metric-content">
          <span className="users-metric-value">{metrics.activeUsers}</span>
          <span className="users-metric-label">Usuarios activos</span>
        </div>
      </div>

      {/* Metric 3: Con préstamos vencidos */}
      <div className="users-metric-card">
        <div className="users-metric-icon-wrap users-metric-icon-wrap--danger" aria-hidden="true">
          <Clock size={22} color="#EB5757" />
        </div>
        <div className="users-metric-content">
          <span className="users-metric-value">{metrics.overdueLoansCount}</span>
          <span className="users-metric-label">Con préstamos vencidos</span>
        </div>
      </div>
    </div>
  );
};
