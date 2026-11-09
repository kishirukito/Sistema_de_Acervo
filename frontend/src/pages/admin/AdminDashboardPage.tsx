import React, { useState, useEffect } from 'react';
import { Monitor } from 'lucide-react';
import { MetricCard } from '../../features/dashboard/components/MetricCard';
import { QuickActions } from '../../features/dashboard/components/QuickActions';
import {
  MonthlyLoansChart,
  CategoryConsultsChart,
} from '../../features/dashboard/components/SimpleChart';
import { RecentActivity } from '../../features/dashboard/components/RecentActivity';
import { AlertsPanel } from '../../features/dashboard/components/AlertsPanel';
import {
  MOCK_METRICS,
  MOCK_MONTHLY_LOANS,
  MOCK_CATEGORY_CONSULTS,
  MOCK_RECENT_ACTIVITIES,
  MOCK_DASHBOARD_ALERTS,
} from '../../features/dashboard/dashboard.mock';
import {
  fetchDashboardMetrics,
  fetchMonthlyLoans,
  fetchCategoryConsults,
  fetchRecentActivities,
  fetchDashboardAlerts,
} from '../../services/api/dashboard.service';
import '../../features/dashboard/dashboard.css';

export const AdminDashboardPage: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [metrics, setMetrics] = useState(MOCK_METRICS);
  const [monthlyLoans, setMonthlyLoans] = useState(MOCK_MONTHLY_LOANS);
  const [categoryConsults, setCategoryConsults] = useState(MOCK_CATEGORY_CONSULTS);
  const [recentActivities, setRecentActivities] = useState(MOCK_RECENT_ACTIVITIES);
  const [alerts, setAlerts] = useState(MOCK_DASHBOARD_ALERTS);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetchDashboardMetrics(),
      fetchMonthlyLoans(),
      fetchCategoryConsults(),
      fetchRecentActivities(),
      fetchDashboardAlerts(),
    ]).then(([m, ml, cc, ra, al]) => {
      if (active) {
        if (m) setMetrics(m);
        if (ml) setMonthlyLoans(ml);
        if (cc) setCategoryConsults(cc);
        if (ra) setRecentActivities(ra);
        if (al) setAlerts(al);
      }
    });
    return () => { active = false; };
  }, []);

  // Screen size requirement (< 1024px fallback card)
  if (!isDesktop) {
    return (
      <div className="desktop-only-container">
        <div className="desktop-only-card" role="alert">
          <div className="desktop-only-icon" aria-hidden="true">
            <Monitor size={36} />
          </div>
          <h2 className="desktop-only-title">
            El panel administrativo está disponible para equipos de escritorio
          </h2>
          <p className="desktop-only-text">
            Utiliza una pantalla de 1024 px o más para acceder al módulo administrativo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Page Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-titles">
          <h1 className="dashboard-welcome">Buenos días, Camila</h1>
          <p className="dashboard-subtitle">
            Aquí tienes el resumen de tu acervo.
          </p>
        </div>
        <QuickActions />
      </header>

      {/* 4 Metric Cards */}
      <section className="dashboard-metrics-grid" aria-label="Métricas generales">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} data={metric} />
        ))}
      </section>

      {/* 2 Charts Grid */}
      <section className="dashboard-charts-grid" aria-label="Estadísticas e historial">
        <MonthlyLoansChart
          data={monthlyLoans}
          title="Préstamos por mes"
          subtitle="Enero - Septiembre 2026"
        />
        <CategoryConsultsChart
          data={categoryConsults}
          title="Categorías más consultadas"
          subtitle="Libros por categoría en catálogo"
        />
      </section>

      {/* Bottom Grid: Recent Activity & Alerts */}
      <section className="dashboard-bottom-grid" aria-label="Actividad y Alertas">
        <RecentActivity items={recentActivities} />
        <AlertsPanel alerts={alerts} />
      </section>
    </div>
  );
};
