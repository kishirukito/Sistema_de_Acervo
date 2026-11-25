import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CheckCircle2,
  BookOpen,
  Layers,
  Package,
  Monitor,
  LayoutDashboard,
  PlusCircle,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import { AlertDetailModal, type AlertType } from '../../features/reports/components/AlertDetailModal';
import { ReportsFilters } from '../../features/reports/components/ReportsFilters';
import { ReportsSummary } from '../../features/reports/components/ReportsSummary';
import { LoansTrendChart } from '../../features/reports/components/LoansTrendChart';
import { TopBooksBarChart } from '../../features/reports/components/TopBooksBarChart';
import { LoanStatusDonutChart } from '../../features/reports/components/LoanStatusDonutChart';
import { CategoriesBarChart } from '../../features/reports/components/CategoriesBarChart';
import { OverdueLoansTable } from '../../features/reports/components/OverdueLoansTable';
import { QuickReportsCard } from '../../features/reports/components/QuickReportsCard';
import { ReportTemplateModal } from '../../features/reports/components/ReportTemplateModal';

import { CirculacionStatsView } from '../../features/reports/components/CirculacionStatsView';
import { ProcesosTecnicosStatsView } from '../../features/reports/components/ProcesosTecnicosStatsView';
import { InventarioStatsView } from '../../features/reports/components/InventarioStatsView';
import { ServiciosStatsView } from '../../features/reports/components/ServiciosStatsView';
import { ReportDataEntryModal } from '../../features/reports/components/ReportDataEntryModal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

import type { ReportsFilterState } from '../../features/reports/reports.types';
import { fetchSiabucReports, DEFAULT_SIABUC_DATA } from '../../services/api/reports.service';
import '../../features/reports/reports.css';

type ActiveTab = 'circulacion' | 'procesos' | 'inventario' | 'servicios' | 'resumen';

const SIABUC_REPORTS_KEY = ['siabuc-reports'] as const;

export const ReportsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<ActiveTab>('resumen');

  // Modal maestro interactivo de generación y previsualización de reportes
  const [isMasterReportModalOpen, setIsMasterReportModalOpen] = useState(false);
  const [activeMasterReportId, setActiveMasterReportId] = useState<string>('rep-carreras');

  // Modal de detalle de alertas del acervo
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertModalType, setAlertModalType] = useState<AlertType | null>(null);

  const handleOpenAlertModal = (type: AlertType) => {
    setAlertModalType(type);
    setIsAlertModalOpen(true);
  };

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
  // Re-consulta automáticamente cuando cambian los filtros de fecha.
  const { data: siabucData = DEFAULT_SIABUC_DATA, isLoading: loading } = useQuery({
    queryKey: [...SIABUC_REPORTS_KEY, filters.startDate, filters.endDate],
    queryFn: () => fetchSiabucReports(filters.startDate, filters.endDate),
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
    queryClient.invalidateQueries({ queryKey: SIABUC_REPORTS_KEY });
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
      'SISTEMA DE ACERVO BIBLIOTECARIO - ESTADÍSTICAS (DATOS REALES)',
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
    link.setAttribute('download', `reporte_estadistico_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Reporte completo descargado con éxito');
  };

  const handleOpenMasterModal = (initialReportId?: string) => {
    if (initialReportId) {
      setActiveMasterReportId(initialReportId);
    }
    setIsMasterReportModalOpen(true);
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
        <div style={{ padding: '3rem 0' }}>
          <LoadingSpinner center size="lg" text="Cargando estadísticas de la base de datos..." />
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
                      {/* Alerta 1: Ejemplares no disponibles */}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleOpenAlertModal('ejemplares')}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpenAlertModal('ejemplares');
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 0.95rem',
                          backgroundColor: '#FEF3C7',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          border: '1px solid #FDE68A',
                          transition: 'transform 0.12s ease, box-shadow 0.12s ease',
                        }}
                        title="Haz clic para ver la lista de ejemplares no disponibles"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#92400E', fontWeight: 600 }}>Ejemplares no disponibles:</span>
                          <strong style={{ color: '#92400E' }}>{executive.alertas.ejemplares_no_disponibles} ejemplares</strong>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#92400E', fontSize: '0.75rem', fontWeight: 600 }}>
                          <span>Ver detalle</span>
                          <ChevronRight size={14} />
                        </div>
                      </div>

                      {/* Alerta 2: Multas pendientes de cobro */}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleOpenAlertModal('multas')}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpenAlertModal('multas');
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 0.95rem',
                          backgroundColor: executive.alertas.multas_pendientes > 0 ? '#FEE2E2' : '#F0FDF4',
                          border: executive.alertas.multas_pendientes > 0 ? '1px solid #FECACA' : '1px solid #DCFCE7',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          transition: 'transform 0.12s ease, box-shadow 0.12s ease',
                        }}
                        title="Haz clic para ver qué usuarios tienen multas y qué libros solicitaron"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: executive.alertas.multas_pendientes > 0 ? '#991B1B' : '#166534', fontWeight: 600 }}>
                            Multas pendientes de cobro:
                          </span>
                          <strong style={{ color: executive.alertas.multas_pendientes > 0 ? '#991B1B' : '#166534' }}>
                            ${executive.alertas.multas_pendientes.toFixed(2)} MXN
                          </strong>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: executive.alertas.multas_pendientes > 0 ? '#991B1B' : '#166534', fontSize: '0.75rem', fontWeight: 600 }}>
                          <span>Ver detalle</span>
                          <ChevronRight size={14} />
                        </div>
                      </div>

                      {/* Alerta 3: Préstamos vencidos */}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleOpenAlertModal('vencidos')}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleOpenAlertModal('vencidos');
                          }
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.75rem 0.95rem',
                          backgroundColor: executive.alertas.prestamos_vencidos > 0 ? '#FEE2E2' : '#F0FDF4',
                          border: executive.alertas.prestamos_vencidos > 0 ? '1px solid #FECACA' : '1px solid #DCFCE7',
                          borderRadius: '8px',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          transition: 'transform 0.12s ease, box-shadow 0.12s ease',
                        }}
                        title="Haz clic para ver los préstamos vencidos y días de mora"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: executive.alertas.prestamos_vencidos > 0 ? '#991B1B' : '#166534', fontWeight: 600 }}>
                            Préstamos vencidos:
                          </span>
                          <strong style={{ color: executive.alertas.prestamos_vencidos > 0 ? '#991B1B' : '#166534' }}>
                            {executive.alertas.prestamos_vencidos}
                          </strong>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: executive.alertas.prestamos_vencidos > 0 ? '#991B1B' : '#166534', fontSize: '0.75rem', fontWeight: 600 }}>
                          <span>Ver detalle</span>
                          <ChevronRight size={14} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <QuickReportsCard
                    onOpenMasterModal={handleOpenMasterModal}
                  />
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

      {/* Interactive Executive Report Template Modal */}
      <ReportTemplateModal
        isOpen={isMasterReportModalOpen}
        initialReportId={activeMasterReportId}
        initialStartDate={filters.startDate}
        initialEndDate={filters.endDate}
        onClose={() => setIsMasterReportModalOpen(false)}
        onExportConfirmed={(msg) => showToast(msg)}
      />

      {/* Modal de detalle de alertas del acervo */}
      <AlertDetailModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        alertType={alertModalType}
        alertasData={executive.alertas}
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
