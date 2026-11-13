import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/auth/AuthContext';
import { MetricCard } from '../../features/dashboard/components/MetricCard';
import { QuickActions } from '../../features/dashboard/components/QuickActions';
import {
  MonthlyLoansChart,
  CategoryConsultsChart,
} from '../../features/dashboard/components/SimpleChart';
import { RecentActivity } from '../../features/dashboard/components/RecentActivity';
import { AlertsPanel } from '../../features/dashboard/components/AlertsPanel';
import { fetchDashboardSnapshot } from '../../services/api/dashboard.service';
import type {
  MetricData,
  MonthlyLoanData,
  CategoryConsultData,
  RecentActivityItem,
  DashboardAlert,
} from '../../features/dashboard/dashboard.types';
import '../../features/dashboard/dashboard.css';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [monthlyLoans, setMonthlyLoans] = useState<MonthlyLoanData[]>([]);
  const [categoryConsults, setCategoryConsults] = useState<CategoryConsultData[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivityItem[]>([]);
  const [alerts, setAlerts] = useState<DashboardAlert[]>([]);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    setIsLoading(true);

    fetchDashboardSnapshot()
      .then((data) => {
        if (active && data) {
          setMetrics(data.metrics);
          setMonthlyLoans(data.monthlyLoans);
          setCategoryConsults(data.categoryConsults);
          setRecentActivities(data.recentActivities);
          setAlerts(data.alerts);
          setLastSyncTime(data.lastSyncTime);
        }
      })
      .catch((err) => {
        console.error('[AdminDashboardPage] Error loading dashboard data:', err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const adminDisplayName = user?.name ? user.name.split(' ')[0] : 'Administrador';
  const currentYear = new Date().getFullYear();

  return (
    <div className="dashboard-container">
      {/* Page Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-titles">
          <h1 className="dashboard-welcome">{`${getGreeting()}, ${adminDisplayName}`}</h1>
          <p className="dashboard-subtitle">
            Aquí tienes el resumen en tiempo real de tu acervo bibliográfico.
          </p>
        </div>
        <QuickActions />
      </header>

      {/* 4 Metric Cards */}
      <section className="dashboard-metrics-grid" aria-label="Métricas generales">
        {metrics.length === 0 && isLoading ? (
          <div style={{ gridColumn: '1 / -1', padding: '24px', textAlign: 'center', color: '#64748B' }}>
            Cargando estadísticas en tiempo real...
          </div>
        ) : (
          metrics.map((metric) => (
            <MetricCard key={metric.id} data={metric} />
          ))
        )}
      </section>

      {/* 2 Charts Grid */}
      <section className="dashboard-charts-grid" aria-label="Estadísticas e historial">
        <MonthlyLoansChart
          data={monthlyLoans}
          title="Préstamos por mes"
          subtitle={`${currentYear} — Registro anual de circulación`}
        />
        <CategoryConsultsChart
          data={categoryConsults}
          title="Libros por categoría"
          subtitle="Distribución del acervo en catálogo (Dewey)"
        />
      </section>

      {/* Bottom Grid: Recent Activity & Alerts */}
      <section className="dashboard-bottom-grid" aria-label="Actividad y Alertas">
        <RecentActivity items={recentActivities} />
        <AlertsPanel alerts={alerts} lastSyncTime={lastSyncTime} />
      </section>
    </div>
  );
};
