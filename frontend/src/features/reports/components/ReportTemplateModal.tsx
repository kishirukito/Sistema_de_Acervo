import React, { useState, useMemo } from 'react';
import {
  X,
  FileSpreadsheet,
  Printer,
  Search,
  Info,
  BarChart2,
  TrendingUp,
  Calendar,
  Layers,
  Download,
  BookOpen,
  ClipboardCheck,
  Package,
  RotateCcw,
  AlertTriangle,
  Building2,
  BarChart3,
} from 'lucide-react';
import { CustomSelect } from '../../../components/ui/CustomSelect';
import type { ReportTemplateData } from '../reports-templates.types';
import type { SiabucReportData } from '../reports.types';
import type { Loan } from '../../loans/loans.types';
import {
  ALL_QUICK_REPORT_TEMPLATES,
  buildReportTemplateData,
  exportReportTemplateToExcelXlsx,
  exportReportTemplateToCsv,
} from '../reports-templates.data';
import './ReportTemplateModal.css';

interface ReportTemplateModalProps {
  isOpen: boolean;
  initialReportId?: string;
  siabucData: SiabucReportData;
  loansList?: Loan[];
  onClose: () => void;
}

export const ReportTemplateModal: React.FC<ReportTemplateModalProps> = ({
  isOpen,
  initialReportId = 'rep-carreras',
  siabucData,
  loansList = [],
  onClose,
}) => {
  // Reporte seleccionado
  const [selectedReportId, setSelectedReportId] = useState<string>(initialReportId);

  // Inicialización de fechas (por defecto: mes actual al día de hoy)
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
  const currentDay = String(today.getDate()).padStart(2, '0');

  const defaultStart = `${currentYear}-${currentMonth}-01`;
  const defaultEnd = `${currentYear}-${currentMonth}-${currentDay}`;

  const [startDate, setStartDate] = useState<string>(defaultStart);
  const [endDate, setEndDate] = useState<string>(defaultEnd);
  const [activePreset, setActivePreset] = useState<'month' | 'quarter' | 'semester' | 'year' | 'custom'>('month');

  const [searchQuery, setSearchQuery] = useState('');

  // Atajos rápidos de fecha
  const handleApplyPreset = (preset: 'month' | 'quarter' | 'semester' | 'year') => {
    setActivePreset(preset);
    const endStr = `${currentYear}-${currentMonth}-${currentDay}`;

    if (preset === 'month') {
      setStartDate(`${currentYear}-${currentMonth}-01`);
      setEndDate(endStr);
    } else if (preset === 'quarter') {
      const qStart = new Date(today);
      qStart.setMonth(qStart.getMonth() - 3);
      setStartDate(qStart.toISOString().slice(0, 10));
      setEndDate(endStr);
    } else if (preset === 'semester') {
      const sStart = new Date(today);
      sStart.setMonth(sStart.getMonth() - 6);
      setStartDate(sStart.toISOString().slice(0, 10));
      setEndDate(endStr);
    } else if (preset === 'year') {
      setStartDate(`${currentYear}-01-01`);
      setEndDate(endStr);
    }
  };

  const handleStartDateChange = (val: string) => {
    setStartDate(val);
    setActivePreset('custom');
  };

  const handleEndDateChange = (val: string) => {
    setEndDate(val);
    setActivePreset('custom');
  };

  // Construcción reactiva de los datos del reporte seleccionado con el rango de fechas
  const reportData = useMemo<ReportTemplateData>(() => {
    return buildReportTemplateData(selectedReportId, siabucData, loansList, {
      startDate,
      endDate,
    });
  }, [selectedReportId, siabucData, loansList, startDate, endDate]);

  // Filtrado interno de filas por búsqueda
  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return reportData.rows;
    const q = searchQuery.toLowerCase().trim();
    return reportData.rows.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(q)
      )
    );
  }, [reportData.rows, searchQuery]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportExcel = () => {
    exportReportTemplateToExcelXlsx(reportData);
  };

  const handleExportCsv = () => {
    exportReportTemplateToCsv(reportData);
  };

  // Escala máxima para gráfica de ranking
  const maxRankingVal = reportData.rankingSeries.length > 0
    ? Math.max(...reportData.rankingSeries.map((s) => s.value), 1)
    : 1;

  // Escala máxima para gráfica de tendencia
  const maxTrendVal = reportData.trendSeries.length > 0
    ? Math.max(...reportData.trendSeries.map((s) => s.value), 1)
    : 1;

  const renderIconForReport = (id: string) => {
    switch (id) {
      case 'rep-carreras': return <BookOpen size={14} />;
      case 'rep-sanciones': return <ClipboardCheck size={14} />;
      case 'rep-inventario': return <Package size={14} />;
      case 'rep-acervo': return <RotateCcw size={14} />;
      case 'rep-morosidad': return <AlertTriangle size={14} />;
      case 'rep-convenios': return <Building2 size={14} />;
      case 'rep-cedula': return <BarChart3 size={14} />;
      default: return <FileSpreadsheet size={14} />;
    }
  };

  return (
    <div className="report-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="report-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* =========================================================================
            HEADER SUPERIOR DEL MODAL
            ========================================================================= */}
        <header className="report-modal-header">
          <div className="report-modal-header-info">
            <div className="report-modal-badges-row">
              <span className="report-modal-code-badge">{reportData.code}</span>
              <span className="report-modal-cat-badge">{reportData.categoryBadge}</span>
              <span className="report-modal-period-badge">
                <Calendar size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} />
                {reportData.periodLabel}
              </span>
            </div>
            <h2 className="report-modal-title">{reportData.title.toUpperCase()}</h2>
            <p className="report-modal-desc">
              {reportData.description}
            </p>
          </div>

          <div className="report-modal-header-actions">
            <button
              type="button"
              className="report-modal-action-btn report-modal-btn--export-excel"
              onClick={handleExportExcel}
              title="Descargar libro de Microsoft Excel (.xlsx) con anchos de columna auto-ajustados"
            >
              <FileSpreadsheet size={16} />
              <span>Exportar Excel (.xlsx)</span>
            </button>

            <button
              type="button"
              className="report-modal-action-btn report-modal-btn--print"
              onClick={handlePrint}
              title="Imprimir cédula oficial o guardar como PDF"
            >
              <Printer size={16} />
              <span>Imprimir / PDF</span>
            </button>

            <button
              type="button"
              className="report-modal-close-btn"
              onClick={onClose}
              aria-label="Cerrar ventana de reportes"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* =========================================================================
            BARRA DE CONFIGURACIÓN DE REPORTES Y FECHAS (Tiempos e Inputs)
            ========================================================================= */}
        <section className="report-config-bar">
          {/* Selector de Tipo de Reporte */}
          <div className="report-config-type-group">
            <label className="report-config-label" htmlFor="report-select-master">
              <Layers size={14} />
              <span>Plantilla de reporte:</span>
            </label>
            <CustomSelect
              id="report-select-master"
              value={selectedReportId}
              onChange={(val) => setSelectedReportId(val)}
              options={ALL_QUICK_REPORT_TEMPLATES.map((tmpl) => ({
                value: tmpl.id,
                label: `${tmpl.title} — ${tmpl.badge}`,
              }))}
              fullWidth
              aria-label="Seleccionar plantilla de reporte"
            />
          </div>

          {/* Selector de Rango de Fechas (Inputs inicial y final) */}
          <div className="report-config-dates-group">
            <label className="report-config-label">
              <Calendar size={14} />
              <span>Rango de fechas para el reporte:</span>
            </label>

            <div className="report-date-inputs-row">
              <div className="report-date-field">
                <span className="report-date-field-tag">Inicial:</span>
                <input
                  type="date"
                  className="report-date-input"
                  value={startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  aria-label="Fecha inicial del reporte"
                />
              </div>

              <span className="report-date-separator">al</span>

              <div className="report-date-field">
                <span className="report-date-field-tag">Final:</span>
                <input
                  type="date"
                  className="report-date-input"
                  value={endDate}
                  onChange={(e) => handleEndDateChange(e.target.value)}
                  aria-label="Fecha final del reporte"
                />
              </div>

              {/* Botones de Presets Rápidos */}
              <div className="report-presets-row">
                <button
                  type="button"
                  className={`report-preset-btn ${activePreset === 'month' ? 'active' : ''}`}
                  onClick={() => handleApplyPreset('month')}
                >
                  Este mes
                </button>
                <button
                  type="button"
                  className={`report-preset-btn ${activePreset === 'quarter' ? 'active' : ''}`}
                  onClick={() => handleApplyPreset('quarter')}
                >
                  Trimestre
                </button>
                <button
                  type="button"
                  className={`report-preset-btn ${activePreset === 'semester' ? 'active' : ''}`}
                  onClick={() => handleApplyPreset('semester')}
                >
                  Semestre
                </button>
                <button
                  type="button"
                  className={`report-preset-btn ${activePreset === 'year' ? 'active' : ''}`}
                  onClick={() => handleApplyPreset('year')}
                >
                  Año
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pestañas de Acceso Rápido por Icono */}
        <nav className="report-tabs-quick-bar" aria-label="Cambio rápido de reporte">
          {ALL_QUICK_REPORT_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              type="button"
              className={`report-tab-quick-item ${selectedReportId === tmpl.id ? 'active' : ''}`}
              onClick={() => setSelectedReportId(tmpl.id)}
            >
              {renderIconForReport(tmpl.id)}
              <span>{tmpl.title.replace('Reporte de ', '').replace('Reporte ', '')}</span>
            </button>
          ))}
        </nav>

        {/* =========================================================================
            CUERPO DEL REPORTE (PREVISUALIZACIÓN EN VIVO)
            ========================================================================= */}
        <div className="report-modal-body">
          {/* BANNER KPI SUPERIOR (Estilo Dorado de la Plantilla de Referencia) */}
          <section className="report-kpi-gold-ribbon" aria-label="Indicadores generales del informe">
            {reportData.kpis.map((kpi, idx) => (
              <div
                key={idx}
                className={`report-kpi-gold-card ${kpi.highlight ? 'report-kpi-gold-card--highlight' : ''}`}
              >
                <span className="report-kpi-gold-label">{kpi.label}</span>
                <span className="report-kpi-gold-val">{kpi.value}</span>
              </div>
            ))}
          </section>

          {/* SECCIÓN DE GRÁFICAS INFORMATIVAS (2 Paneles) */}
          <section className="report-charts-two-col">
            {/* Gráfica 1: Tendencia / Flujo */}
            <div className="report-chart-box">
              <div className="report-chart-box-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp size={16} color="#2563EB" />
                  <h4 className="report-chart-box-title">{reportData.trendChartTitle}</h4>
                </div>
                <span className="report-chart-box-sub">{reportData.trendChartSubtitle}</span>
              </div>

              <div className="report-bars-vertical-wrapper">
                {reportData.trendSeries.map((item, idx) => {
                  const pct = Math.min((item.value / maxTrendVal) * 100, 100);
                  return (
                    <div key={idx} className="report-vert-bar-col">
                      <span className="report-vert-bar-val">{item.value}</span>
                      <div className="report-vert-bar-track">
                        <div
                          className="report-vert-bar-fill"
                          style={{
                            height: `${Math.max(pct, item.value > 0 ? 8 : 4)}%`,
                            backgroundColor: item.color || '#3B82F6',
                          }}
                          title={item.sublabel || `${item.label}: ${item.value}`}
                        />
                      </div>
                      <span className="report-vert-bar-label">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Gráfica 2: Ranking / Desglose */}
            <div className="report-chart-box">
              <div className="report-chart-box-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BarChart2 size={16} color="#D97706" />
                  <h4 className="report-chart-box-title">{reportData.rankingChartTitle}</h4>
                </div>
                <span className="report-chart-box-sub">{reportData.rankingChartSubtitle}</span>
              </div>

              <div className="report-bars-horizontal-list">
                {reportData.rankingSeries.map((item, idx) => {
                  const pct = Math.min((item.value / maxRankingVal) * 100, 100);
                  return (
                    <div key={idx} className="report-horiz-bar-item">
                      <span className="report-horiz-bar-label" title={item.label}>
                        {item.label}
                      </span>
                      <div className="report-horiz-bar-track">
                        <div
                          className="report-horiz-bar-fill"
                          style={{
                            width: `${Math.max(pct, item.value > 0 ? 8 : 0)}%`,
                            backgroundColor: item.color || '#F59E0B',
                          }}
                        />
                      </div>
                      <span className="report-horiz-bar-val">{item.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECCIÓN TABLA DE DATOS (Detalle Granular con Fila de Totales) */}
          <section className="report-table-section">
            <div className="report-table-toolbar">
              <div className="report-table-title-group">
                <h3 className="report-table-main-title">RESUMEN Y REGISTRO DETALLADO DEL PERIODO</h3>
                <span className="report-table-count">
                  Mostrando {filteredRows.length} de {reportData.rows.length} fila(s)
                </span>
              </div>

              <div className="report-table-search">
                <Search size={15} className="report-search-icon" />
                <input
                  type="text"
                  placeholder="Buscar en la tabla de este reporte..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="report-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="report-search-clear"
                    onClick={() => setSearchQuery('')}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            <div className="report-table-wrapper">
              <table className="report-grid-table">
                <thead>
                  <tr>
                    {reportData.columns.map((col) => (
                      <th
                        key={col.key}
                        style={{
                          minWidth: col.minWidth,
                          textAlign: col.align || 'left',
                        }}
                      >
                        {col.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.length === 0 ? (
                    <tr>
                      <td colSpan={reportData.columns.length} className="report-table-empty">
                        No se encontraron registros que coincidan con la búsqueda.
                      </td>
                    </tr>
                  ) : (
                    filteredRows.map((row, rowIdx) => (
                      <tr key={rowIdx}>
                        {reportData.columns.map((col) => {
                          const val = row[col.key];
                          const badge = col.badge ? col.badge(val) : null;

                          return (
                            <td
                              key={col.key}
                              style={{ textAlign: col.align || 'left' }}
                            >
                              {badge ? (
                                <span
                                  className="report-cell-badge"
                                  style={{
                                    backgroundColor: badge.bg,
                                    color: badge.color,
                                  }}
                                >
                                  {badge.text}
                                </span>
                              ) : (
                                <span className="report-cell-text">{val ?? '—'}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  )}

                  {/* Fila de Totales / Resumen Destacada */}
                  {reportData.totalSummaryRow && (
                    <tr className="report-row-summary">
                      {reportData.columns.map((col) => (
                        <td
                          key={col.key}
                          style={{ textAlign: col.align || 'left' }}
                        >
                          <strong>{reportData.totalSummaryRow?.[col.key] ?? '—'}</strong>
                        </td>
                      ))}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* =========================================================================
              PIE DE PÁGINA DEL REPORTE
              ========================================================================= */}
          <footer className="report-modal-footer">
            <div className="report-footer-left">
              <Info size={15} color="#64748B" />
              <span>
                Reporte oficial generado por el Sistema de Acervo Bibliotecario de la Universidad Politécnica de Durango.
              </span>
            </div>

            <div className="report-footer-right">
              <button
                type="button"
                className="report-modal-action-btn report-modal-btn--export-excel"
                onClick={handleExportExcel}
              >
                <FileSpreadsheet size={15} />
                <span>Descargar Excel (.xlsx)</span>
              </button>

              <button
                type="button"
                className="report-modal-action-btn report-modal-btn--csv"
                onClick={handleExportCsv}
                title="Descargar versión alternativa CSV delimitada por comas"
              >
                <Download size={14} />
                <span>CSV</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
