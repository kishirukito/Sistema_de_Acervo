import React, { useState, useMemo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ReportsFilters } from '../../features/reports/components/ReportsFilters';
import { ReportsSummary } from '../../features/reports/components/ReportsSummary';
import { LoansTrendChart } from '../../features/reports/components/LoansTrendChart';
import { TopBooksBarChart } from '../../features/reports/components/TopBooksBarChart';
import { LoanStatusDonutChart } from '../../features/reports/components/LoanStatusDonutChart';
import { CategoriesBarChart } from '../../features/reports/components/CategoriesBarChart';
import { OverdueLoansTable } from '../../features/reports/components/OverdueLoansTable';
import { QuickReportsCard } from '../../features/reports/components/QuickReportsCard';
import {
  MOCK_REPORT_SUMMARY,
  MOCK_MONTHLY_TRENDS,
  MOCK_TOP_BOOKS,
  MOCK_STATUS_DISTRIBUTION,
  MOCK_CATEGORIES_METRICS,
  MOCK_OVERDUE_LOANS,
} from '../../features/reports/reports.mock';
import type { ReportsFilterState, QuickReportItem } from '../../features/reports/reports.types';
import { resolveCategory } from '../../constants';
import '../../features/reports/reports.css';

export const ReportsPage: React.FC = () => {
  // Filters state initialized to match Figma screenshot exactly
  const [filters, setFilters] = useState<ReportsFilterState>({
    dateRange: '01 sep. 2026  —  29 sep. 2026',
    startDate: '2026-09-01',
    endDate: '2026-09-29',
    category: '',
    userType: '',
    loanStatus: '',
  });

  const [activeFilters, setActiveFilters] = useState<ReportsFilterState>(filters);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleFilterChange = <K extends keyof ReportsFilterState>(
    key: K,
    value: ReportsFilterState[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilters = () => {
    setActiveFilters({ ...filters });
    showToast('Filtros aplicados al periodo seleccionado');
  };

  // Compute reactive data based on active filters
  const metrics = useMemo(() => {
    if (!activeFilters.category && !activeFilters.userType && !activeFilters.loanStatus) {
      return MOCK_REPORT_SUMMARY;
    }

    // Scale slightly if category is filtered to demonstrate interactive reactivity
    const factor = activeFilters.category ? 0.35 : 0.8;
    const total = Math.round(MOCK_REPORT_SUMMARY.totalLoans * factor);
    const active = Math.round(MOCK_REPORT_SUMMARY.activeLoans * factor);
    const returned = Math.round(MOCK_REPORT_SUMMARY.returnedLoans * factor);
    const overdue = Math.round(MOCK_REPORT_SUMMARY.overdueLoans * factor);

    return {
      totalLoans: total,
      totalLoansGrowth: '↑ 5% vs periodo ant.',
      activeLoans: active,
      returnedLoans: returned,
      returnedGrowth: '↑ 9% vs periodo ant.',
      overdueLoans: overdue,
      overdueDifference: '↓ 1 vs periodo ant.',
    };
  }, [activeFilters]);

  const statusDistribution = useMemo(() => {
    if (!activeFilters.category) return MOCK_STATUS_DISTRIBUTION;

    const total = metrics.totalLoans;
    return [
      {
        ...MOCK_STATUS_DISTRIBUTION[0],
        count: metrics.returnedLoans,
        percentage: total > 0 ? Math.round((metrics.returnedLoans / total) * 100) : 0,
      },
      {
        ...MOCK_STATUS_DISTRIBUTION[1],
        count: metrics.activeLoans,
        percentage: total > 0 ? Math.round((metrics.activeLoans / total) * 100) : 0,
      },
      {
        ...MOCK_STATUS_DISTRIBUTION[2],
        count: metrics.overdueLoans,
        percentage: total > 0 ? Math.round((metrics.overdueLoans / total) * 100) : 0,
      },
    ];
  }, [activeFilters, metrics]);

  const categoriesMetrics = useMemo(() => {
    if (!activeFilters.category) return MOCK_CATEGORIES_METRICS;
    const filterCat = resolveCategory(activeFilters.category);
    return MOCK_CATEGORIES_METRICS.filter((c) => {
      const metricCat = resolveCategory(c.category);
      return (
        c.category === activeFilters.category ||
        (filterCat && metricCat && filterCat.code === metricCat.code)
      );
    });
  }, [activeFilters]);

  // Export handlers
  const handleExportReport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Indicador,Valor,Comparativa\n' +
      `Total Prestamos,${metrics.totalLoans},${metrics.totalLoansGrowth}\n` +
      `Prestamos Activos,${metrics.activeLoans},-\n` +
      `Devueltos,${metrics.returnedLoans},${metrics.returnedGrowth}\n` +
      `Vencidos,${metrics.overdueLoans},${metrics.overdueDifference}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `reporte_acervo_${filters.startDate}_${filters.endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Reporte generado y descargado correctamente');
  };

  const handleDownloadQuickReport = (item: QuickReportItem) => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      `Reporte,${item.title}\n` +
      `Generado,${new Date().toLocaleDateString('es-MX')}\n` +
      'Registro,Cantidad\n' +
      'Item 1,48\nItem 2,41\nItem 3,36\n';

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', item.fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Descargando ${item.title}...`);
  };

  return (
    <div className="reports-page-container">
      {/* Page Header */}
      <div className="reports-page-header">
        <h1 className="reports-page-title">Reportes y estadísticas</h1>
        <p className="reports-page-subtitle">
          Consulta el uso, préstamos y disponibilidad de los recursos de la biblioteca.
        </p>
      </div>

      {/* Filters Toolbar */}
      <ReportsFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        onExportReport={handleExportReport}
      />

      {/* KPI Summary Cards */}
      <ReportsSummary metrics={metrics} />

      {/* Middle 2x2 Charts Grid */}
      <div className="reports-charts-grid">
        <LoansTrendChart data={MOCK_MONTHLY_TRENDS} />
        <TopBooksBarChart books={MOCK_TOP_BOOKS} />
        <LoanStatusDonutChart
          data={statusDistribution}
          total={metrics.totalLoans}
        />
        <CategoriesBarChart categories={categoriesMetrics} />
      </div>

      {/* Bottom Split Section: Overdue Loans Table + Quick Reports */}
      <div className="reports-bottom-grid">
        <OverdueLoansTable
          overdueLoans={MOCK_OVERDUE_LOANS}
          totalOverdueCount={metrics.overdueLoans}
        />
        <QuickReportsCard onDownloadReport={handleDownloadQuickReport} />
      </div>

      {/* Toast notification banner */}
      {toastMessage && (
        <div className="reports-toast" role="status" aria-live="polite">
          <CheckCircle2 size={18} color="#22C55E" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
export default ReportsPage;
