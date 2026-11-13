import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CheckCircle2,
  BookOpen,
  Layers,
  Package,
  Monitor,
  LayoutDashboard,
  Download,
  Loader2,
  PlusCircle,
  AlertTriangle,
} from 'lucide-react';
import { ReportsFilters } from '../../features/reports/components/ReportsFilters';
import { ReportsSummary } from '../../features/reports/components/ReportsSummary';
import { LoansTrendChart } from '../../features/reports/components/LoansTrendChart';
import { TopBooksBarChart } from '../../features/reports/components/TopBooksBarChart';
import { LoanStatusDonutChart } from '../../features/reports/components/LoanStatusDonutChart';
import { CategoriesBarChart } from '../../features/reports/components/CategoriesBarChart';
import { OverdueLoansTable } from '../../features/reports/components/OverdueLoansTable';
import { QuickReportsCard } from '../../features/reports/components/QuickReportsCard';

import { CirculacionStatsView } from '../../features/reports/components/CirculacionStatsView';
import { ProcesosTecnicosStatsView } from '../../features/reports/components/ProcesosTecnicosStatsView';
import { InventarioStatsView } from '../../features/reports/components/InventarioStatsView';
import { ServiciosStatsView } from '../../features/reports/components/ServiciosStatsView';
import { ReportDataEntryModal } from '../../features/reports/components/ReportDataEntryModal';

import type { ReportsFilterState, QuickReportItem } from '../../features/reports/reports.types';
import { fetchSiabucReports, DEFAULT_SIABUC_DATA } from '../../services/api/reports.service';
import '../../features/reports/reports.css';

type ActiveTab = 'circulacion' | 'procesos' | 'inventario' | 'servicios' | 'resumen';

const SIABUC_REPORTS_KEY = ['siabuc-reports'] as const;

export const ReportsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<ActiveTab>('resumen');

  // Data entry modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'sancion' | 'espacio' | 'computo' | 'baja'>('sancion');

  // Filters state
  const [filters, setFilters] = useState<ReportsFilterState>({
    dateRange: 'Periodo Completo',
    startDate: '',
    endDate: '',
    category: '',
    userType: '',
    loanStatus: '',
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // React Query — staleTime: 5 min para estadísticas SIABUC.
  // No se hace polling porque el endpoint puede tener efectos secundarios.
  // La invalidación solo ocurre tras acción explícita del usuario (handleModalSuccess).
  const { data: siabucData = DEFAULT_SIABUC_DATA, isLoading: loading } = useQuery({
    queryKey: SIABUC_REPORTS_KEY,
    queryFn: fetchSiabucReports,
    staleTime: 1000 * 60 * 5,   // 5 min
    gcTime: 1000 * 60 * 15,     // 15 min en memoria
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
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
    showToast('Filtros aplicados a los reportes');
  };

  const handleOpenModal = (tab: 'sancion' | 'espacio' | 'computo' | 'baja' = 'sancion') => {
    setModalTab(tab);
    setIsModalOpen(true);
  };

  const handleModalSuccess = (msg: string) => {
    showToast(msg);
    queryClient.invalidateQueries({ queryKey: SIABUC_REPORTS_KEY });
  };

  // Real Executive Summary Data from Supabase / Backend
  const executive = siabucData.resumen_ejecutivo;

  // Export handlers
  const handleExportReport = () => {
    const csvRows = [
      'SISTEMA DE ACERVO BIBLIOTECARIO - ESTADÍSTICAS SIABUC (DATOS REALES)',
      `Fecha de Generación: ${new Date().toLocaleDateString('es-MX')}`,
      '',
      '=== 1. CIRCULACIÓN ===',
      `Total Préstamos,${siabucData.circulacion.total_prestamos}`,
      `Préstamos en Sala,${siabucData.circulacion.prestamos_sala}`,
      `Préstamos a Domicilio,${siabucData.circulacion.prestamos_domicilio}`,
      `Renovaciones,${siabucData.circulacion.renovaciones}`,
      `Multas Totales Generadas,$${siabucData.circulacion.sanciones.monto_total}`,
      `Multas Pendientes de Pago,$${siabucData.circulacion.sanciones.monto_pendiente}`,
      `Multas Recaudadas,$${siabucData.circulacion.sanciones.monto_recaudado}`,
      '',
      '=== 2. PROCESOS TÉCNICOS ===',
      `Total Títulos Catalogados,${siabucData.procesos_tecnicos.total_titulos}`,
      `Total Ejemplares Físicos,${siabucData.procesos_tecnicos.total_ejemplares}`,
      '',
      '=== 3. INVENTARIO Y EXISTENCIAS ===',
      `Existencias Totales,${siabucData.inventario.existencias_totales}`,
      `Pérdidas y Bajas,${siabucData.inventario.perdidos_o_bajas}`,
      '',
      '=== 4. SERVICIOS BIBLIOTECARIOS ===',
      `Total Espacios y Cubículos,${siabucData.servicios.espacios.total_espacios}`,
      `Reservaciones de Espacio,${siabucData.servicios.espacios.total_reservas}`,
      `Sesiones de Cómputo,${siabucData.servicios.computo.total_sesiones}`,
      `Horas Totales de Internet,${siabucData.servicios.computo.horas_totales}`,
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `reporte_estadistico_siabuc_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Reporte completo SIABUC descargado con éxito');
  };

  const handleDownloadQuickReport = (item: QuickReportItem) => {
    let csvRows = [`Reporte: ${item.title}`, `Fecha: ${new Date().toLocaleDateString('es-MX')}`, ''];
    if (item.id === 'rep-circulacion') {
      csvRows.push('Carrera/Facultad,Cantidad');
      siabucData.circulacion.prestamos_por_carrera.forEach((c) => csvRows.push(`"${c.carrera}",${c.cantidad}`));
    } else if (item.id === 'rep-sanciones') {
      csvRows.push('Métrica,Valor');
      csvRows.push(`Total Sanciones,${siabucData.circulacion.sanciones.total_sanciones}`);
      csvRows.push(`Monto Pendiente,$${siabucData.circulacion.sanciones.monto_pendiente}`);
      csvRows.push(`Monto Recaudado,$${siabucData.circulacion.sanciones.monto_recaudado}`);
    } else if (item.id === 'rep-inventario') {
      csvRows.push('Estado,Cantidad');
      siabucData.inventario.distribucion_estados.forEach((d) => csvRows.push(`"${d.estado}",${d.cantidad}`));
    } else {
      csvRows.push('Título,Solicitudes');
      siabucData.circulacion.frecuencia_acervo.forEach((f) => csvRows.push(`"${f.titulo}",${f.solicitudes}`));
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="reports-page-title">Estadísticas y Reportes Bibliotecarios</h1>
            <p className="reports-page-subtitle">
              Módulos estandarizados de Circulación, Procesos Técnicos, Inventario y Servicios.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => handleOpenModal('sancion')}
              className="siabuc-action-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.5rem 1rem',
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <PlusCircle size={16} />
              <span>+ Capturar Registro</span>
            </button>
            <button
              onClick={handleExportReport}
              className="reports-export-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Download size={16} />
              <span>Exportar SIABUC (CSV)</span>
            </button>
          </div>
        </div>
      </div>

      {/* SIABUC Tab Navigation */}
      <nav className="siabuc-tabs-nav" aria-label="Secciones estadísticas">
        <button
          className={`siabuc-tab-btn ${activeTab === 'resumen' ? 'active' : ''}`}
          onClick={() => setActiveTab('resumen')}
        >
          <LayoutDashboard size={16} />
          <span>Resumen Ejecutivo</span>
        </button>
        <button
          className={`siabuc-tab-btn ${activeTab === 'circulacion' ? 'active' : ''}`}
          onClick={() => setActiveTab('circulacion')}
        >
          <BookOpen size={16} />
          <span>1. Circulación</span>
        </button>
        <button
          className={`siabuc-tab-btn ${activeTab === 'procesos' ? 'active' : ''}`}
          onClick={() => setActiveTab('procesos')}
        >
          <Layers size={16} />
          <span>2. Procesos Técnicos</span>
        </button>
        <button
          className={`siabuc-tab-btn ${activeTab === 'inventario' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventario')}
        >
          <Package size={16} />
          <span>3. Inventario y Existencias</span>
        </button>
        <button
          className={`siabuc-tab-btn ${activeTab === 'servicios' ? 'active' : ''}`}
          onClick={() => setActiveTab('servicios')}
        >
          <Monitor size={16} />
          <span>4. Servicios Bibliotecarios</span>
        </button>
      </nav>

      {/* Filters Toolbar */}
      <ReportsFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        onExportReport={handleExportReport}
      />

      {/* Loading state indicator */}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 0', gap: '10px', color: '#6B7280' }}>
          <Loader2 size={24} className="animate-spin" />
          <span>Cargando estadísticas de la base de datos...</span>
        </div>
      ) : (
        <>
          {/* TAB 1: RESUMEN EJECUTIVO (100% REAL DATABASE DATA) */}
          {activeTab === 'resumen' && (
            <div className="siabuc-block-container">
              <ReportsSummary metrics={executive.metricas} />

              <div className="reports-charts-grid">
                <LoansTrendChart data={executive.tendencia_mensual} />
                <TopBooksBarChart books={executive.libros_top} />
                <LoanStatusDonutChart
                  data={executive.distribucion_estados}
                  total={executive.metricas.totalLoans}
                />
                <CategoriesBarChart categories={executive.categorias_solicitadas} />
              </div>

              <div className="reports-bottom-grid">
                <OverdueLoansTable
                  overdueLoans={executive.actividad_reciente}
                  totalOverdueCount={executive.metricas.overdueLoans}
                />
                
                {/* Real Alerts & Quick Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="reports-chart-card" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                      <AlertTriangle size={18} color="#D97706" />
                      <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#1F2937' }}>
                        Alertas y Estado del Acervo
                      </h4>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0.85rem', backgroundColor: '#FEF3C7', borderRadius: '8px', fontSize: '0.85rem' }}>
                        <span style={{ color: '#92400E', fontWeight: 500 }}>Ejemplares no disponibles:</span>
                        <strong style={{ color: '#92400E' }}>{executive.alertas.ejemplares_no_disponibles} ejemplares</strong>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0.85rem', backgroundColor: executive.alertas.multas_pendientes > 0 ? '#FEE2E2' : '#F0FDF4', borderRadius: '8px', fontSize: '0.85rem' }}>
                        <span style={{ color: executive.alertas.multas_pendientes > 0 ? '#991B1B' : '#166534', fontWeight: 500 }}>
                          Multas pendientes de cobro:
                        </span>
                        <strong style={{ color: executive.alertas.multas_pendientes > 0 ? '#991B1B' : '#166534' }}>
                          ${executive.alertas.multas_pendientes.toFixed(2)} MXN
                        </strong>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0.85rem', backgroundColor: executive.alertas.prestamos_vencidos > 0 ? '#FEE2E2' : '#F0FDF4', borderRadius: '8px', fontSize: '0.85rem' }}>
                        <span style={{ color: executive.alertas.prestamos_vencidos > 0 ? '#991B1B' : '#166534', fontWeight: 500 }}>
                          Préstamos vencidos:
                        </span>
                        <strong style={{ color: executive.alertas.prestamos_vencidos > 0 ? '#991B1B' : '#166534' }}>
                          {executive.alertas.prestamos_vencidos}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <QuickReportsCard onDownloadReport={handleDownloadQuickReport} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CIRCULACIÓN */}
          {activeTab === 'circulacion' && (
            <CirculacionStatsView
              data={siabucData.circulacion}
              onOpenEntryModal={handleOpenModal}
            />
          )}

          {/* TAB 3: PROCESOS TÉCNICOS */}
          {activeTab === 'procesos' && (
            <ProcesosTecnicosStatsView data={siabucData.procesos_tecnicos} />
          )}

          {/* TAB 4: INVENTARIO Y EXISTENCIAS */}
          {activeTab === 'inventario' && (
            <InventarioStatsView
              data={siabucData.inventario}
              onOpenEntryModal={handleOpenModal}
            />
          )}

          {/* TAB 5: SERVICIOS BIBLIOTECARIOS */}
          {activeTab === 'servicios' && (
            <ServiciosStatsView
              data={siabucData.servicios}
              onOpenEntryModal={handleOpenModal}
            />
          )}
        </>
      )}

      {/* Data Entry Modal */}
      <ReportDataEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
        catalogos={siabucData.catalogos}
        initialTab={modalTab}
      />

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
