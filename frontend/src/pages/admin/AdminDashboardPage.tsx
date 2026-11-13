import React from 'react';
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
import { useQuery } from '@tanstack/react-query';
import '../../features/dashboard/dashboard.css';

/** Clave para el snapshot del dashboard. staleTime: 60s — datos estadísticos. */
const DASHBOARD_KEY = 'dashboard-snapshot' as const;

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();

  // ── React Query: dashboard snapshot ──────────────────────────────────────
  // Primera visita: lanza 3 peticiones paralelas en fetchDashboardSnapshot.
  // Regreso en < 60s: datos visibles inmediatamente desde caché sin re-fetch.
  const { data, isLoading } = useQuery({
    queryKey: [DASHBOARD_KEY],
    queryFn: fetchDashboardSnapshot,
    staleTime: 60_000,          // 1 minuto — estadísticas no cambian en segundos
    refetchOnWindowFocus: false, // Evita re-fetch al cambiar de pestaña
    retry: 1,
  });

  const metrics           = data?.metrics           ?? [];
  const monthlyLoans      = data?.monthlyLoans      ?? [];
  const categoryConsults  = data?.categoryConsults  ?? [];
  const recentActivities  = data?.recentActivities  ?? [];
  const alerts            = data?.alerts            ?? [];
  const lastSyncTime      = data?.lastSyncTime      ?? '';

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
