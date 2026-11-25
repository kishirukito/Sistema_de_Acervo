import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  X,
  FileSpreadsheet,
  FileText,
  Search,
  Info,
  BarChart2,
  TrendingUp,
  Calendar,
  Layers,
  BookOpen,
  ClipboardCheck,
  Package,
  RotateCcw,
  AlertTriangle,
  Building2,
  BarChart3,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CustomSelect } from '../../../components/ui/CustomSelect';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import type { ReportModel } from '../reports-templates.types';
import { ALL_QUICK_REPORT_TEMPLATES } from '../reports-templates.data';
import { fetchReportModel, downloadReportFile } from '../../../services/api/reports.service';
import { getPaginationItems } from '../../../utils/pagination';
import './ReportTemplateModal.css';

interface ReportTemplateModalProps {
  isOpen: boolean;
  initialReportId?: string;
  initialStartDate?: string;
  initialEndDate?: string;
  onClose: () => void;
  onExportConfirmed?: (message: string) => void;
}

function formatKpiDisplay(val: string | number, fmt: string): string {
  if (typeof val === 'number') {
    if (fmt === 'currency') return `$${val.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;
    if (fmt === 'percent') return `${val.toFixed(1)}%`;
    if (fmt === 'int') return val.toLocaleString('es-MX');
    if (fmt === 'float') return val.toLocaleString('es-MX', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  }
  return String(val ?? 'No disponible');
}

function formatCellDisplay(val: any, type: string): string {
  if (val === null || val === undefined || val === '') return 'No disponible';
  if (typeof val === 'number') {
    if (type === 'currency') return `$${val.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (type === 'percent') return `${(val * 100).toFixed(1)}%`;
    if (type === 'int') return val.toLocaleString('es-MX');
    if (type === 'float') return val.toLocaleString('es-MX', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  }
  return String(val);
}

export const ReportTemplateModal: React.FC<ReportTemplateModalProps> = ({
  isOpen,
  initialReportId = 'rep-carreras',
  initialStartDate = '',
  initialEndDate = '',
  onClose,
  onExportConfirmed,
}) => {
  const [selectedReportId, setSelectedReportId] = useState<string>(initialReportId);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
  const currentDay = String(today.getDate()).padStart(2, '0');
  const todayStr = `${currentYear}-${currentMonth}-${currentDay}`;

  const [startDate, setStartDate] = useState<string>(initialStartDate);
  const [endDate, setEndDate] = useState<string>(initialEndDate);
  const [activePreset, setActivePreset] = useState<'all' | 'month' | 'quarter' | 'semester' | 'year' | 'c1' | 'c2_ago' | 'c3_sep' | 'custom'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Sincronizar fechas iniciales cuando abre el modal
  useEffect(() => {
    if (isOpen) {
      if (initialStartDate || initialEndDate) {
        setStartDate(initialStartDate);
        setEndDate(initialEndDate);
        setActivePreset('custom');
      }
    }
  }, [isOpen, initialStartDate, initialEndDate]);

  const [reportModel, setReportModel] = useState<ReportModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [exportingFormat, setExportingFormat] = useState<'excel' | 'pdf' | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedReportId, startDate, endDate, debouncedSearch, pageSize]);

  const totalRows = reportModel?.rows.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedRows = useMemo(() => {
    if (!reportModel?.rows) return [];
    const startIdx = (safePage - 1) * pageSize;
    return reportModel.rows.slice(startIdx, startIdx + pageSize);
  }, [reportModel, safePage, pageSize]);

  useEffect(() => {
    if (initialReportId) {
      setSelectedReportId(initialReportId);
    }
  }, [initialReportId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const loadModel = useCallback(async () => {
    if (!isOpen) return;
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const model = await fetchReportModel({
        reportId: selectedReportId,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        search: debouncedSearch,
      });
      setReportModel(model);
    } catch (err: any) {
      setErrorMsg(err?.message || 'No se pudo cargar el reporte desde el servidor.');
      setReportModel(null);
    } finally {
      setIsLoading(false);
    }
  }, [isOpen, selectedReportId, startDate, endDate, debouncedSearch]);

  useEffect(() => {
    loadModel();
  }, [loadModel]);

  const handleApplyPreset = (preset: 'all' | 'month' | 'quarter' | 'semester' | 'year' | 'c1' | 'c2_ago' | 'c3_sep') => {
    setActivePreset(preset);
    if (preset === 'all') {
      setStartDate('');
      setEndDate('');
    } else if (preset === 'month') {
      setStartDate(`${currentYear}-${currentMonth}-01`);
      setEndDate(todayStr);
    } else if (preset === 'c1') {
      setStartDate(`${currentYear}-01-01`);
      setEndDate(`${currentYear}-04-30`);
    } else if (preset === 'c2_ago') {
      setStartDate(`${currentYear}-05-01`);
      setEndDate(`${currentYear}-08-31`);
    } else if (preset === 'c3_sep') {
      setStartDate(`${currentYear}-09-01`);
      setEndDate(`${currentYear}-12-31`);
    } else if (preset === 'quarter') {
      const qStart = new Date(today);
      qStart.setMonth(qStart.getMonth() - 3);
      setStartDate(qStart.toISOString().slice(0, 10));
      setEndDate(todayStr);
    } else if (preset === 'semester') {
      const sStart = new Date(today);
      sStart.setMonth(sStart.getMonth() - 6);
      setStartDate(sStart.toISOString().slice(0, 10));
      setEndDate(todayStr);
    } else if (preset === 'year') {
      setStartDate(`${currentYear}-01-01`);
      setEndDate(todayStr);
    }
  };

  const handleExport = async (format: 'excel' | 'pdf') => {
    setExportingFormat(format);
    setErrorMsg(null);
    try {
      const filename = await downloadReportFile({
        format,
        reportId: selectedReportId,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        search: debouncedSearch,
      });
      // Refrescar vista con el mismo corte tras exportación confirmada
      await loadModel();
      if (onExportConfirmed) {
        onExportConfirmed(`Archivo exportado correctamente: ${filename}`);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || `Error al exportar el archivo ${format.toUpperCase()}.`);
    } finally {
      setExportingFormat(null);
    }
  };

  if (!isOpen) return null;

  const activeMeta = ALL_QUICK_REPORT_TEMPLATES.find((t) => t.id === selectedReportId) || ALL_QUICK_REPORT_TEMPLATES[0];

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
        {/* HEADER SUPERIOR */}
        <header className="report-modal-header">
          <div className="report-modal-header-info">
            <div className="report-modal-badges-row">
              <span className="report-modal-code-badge">{reportModel?.code || activeMeta.code}</span>
              <span className="report-modal-cat-badge">{reportModel?.badge || activeMeta.badge}</span>
              <span className="report-modal-period-badge">
                <Calendar size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} />
                {reportModel?.period_label || 'Consultando periodo...'}
              </span>
            </div>
            <h2 className="report-modal-title">{(reportModel?.title || activeMeta.title).toUpperCase()}</h2>
            <p className="report-modal-desc">{reportModel?.description || activeMeta.description}</p>
          </div>

          <div className="report-modal-header-actions">
            <button
              type="button"
              className="report-modal-action-btn report-modal-btn--export-excel"
              onClick={() => handleExport('excel')}
              disabled={exportingFormat !== null || isLoading}
              title="Descargar libro Excel (.xlsx) real con hojas Resumen (gráficas nativas), Detalle y Criterios"
            >
              <FileSpreadsheet size={16} />
              <span>{exportingFormat === 'excel' ? 'Generando Excel...' : 'Exportar Excel (.xlsx)'}</span>
            </button>

            <button
              type="button"
              className="report-modal-action-btn report-modal-btn--print"
              onClick={() => handleExport('pdf')}
              disabled={exportingFormat !== null || isLoading}
              title={`Descargar PDF independiente (${activeMeta.orientation === 'landscape' ? 'Horizontal' : 'Vertical'})`}
            >
              <FileText size={16} />
              <span>{exportingFormat === 'pdf' ? 'Generando PDF...' : 'Exportar PDF (.pdf)'}</span>
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

        {/* BARRA DE CONFIGURACIÓN Y FECHAS */}
        <section className="report-config-bar">
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
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setActivePreset('custom');
                  }}
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
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setActivePreset('custom');
                  }}
                  aria-label="Fecha final del reporte"
                />
              </div>

              <div className="report-presets-row">
                <button
                  type="button"
                  className={`report-preset-btn ${activePreset === 'all' ? 'active' : ''}`}
                  onClick={() => handleApplyPreset('all')}
                >
                  Todo
                </button>
                <button
                  type="button"
                  className={`report-preset-btn ${activePreset === 'month' ? 'active' : ''}`}
                  onClick={() => handleApplyPreset('month')}
                >
                  Este mes
                </button>
                <button
                  type="button"
                  className={`report-preset-btn ${activePreset === 'c1' ? 'active' : ''}`}
                  onClick={() => handleApplyPreset('c1')}
                  title="1er Cuatrimestre: Enero - Abril"
                >
                  Ene - Abr
                </button>
                <button
                  type="button"
                  className={`report-preset-btn ${activePreset === 'c2_ago' ? 'active' : ''}`}
                  onClick={() => handleApplyPreset('c2_ago')}
                  title="2do Cuatrimestre: Mayo - Agosto"
                >
                  May - Ago
                </button>
                <button
                  type="button"
                  className={`report-preset-btn ${activePreset === 'c3_sep' ? 'active' : ''}`}
                  onClick={() => handleApplyPreset('c3_sep')}
                  title="3er Cuatrimestre: Septiembre - Diciembre"
                >
                  Sep - Dic
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

        {/* PESTAÑAS DE CAMBIO RÁPIDO */}
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

        {/* CUERPO DEL REPORTE (PREVISUALIZACIÓN DEL MODELO COMÚN REAL) */}
        <div className="report-modal-body">
          {errorMsg && (
            <div
              role="alert"
              style={{
                backgroundColor: '#FEE2E2',
                border: '1px solid #FCA5A5',
                color: '#991B1B',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                fontSize: '0.85rem',
              }}
            >
              <span>{errorMsg}</span>
              <button
                type="button"
                onClick={loadModel}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #FCA5A5',
                  borderRadius: '6px',
                  color: '#991B1B',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <RefreshCw size={13} />
                <span>Reintentar</span>
              </button>
            </div>
          )}

          {isLoading ? (
            <div style={{ padding: '4rem 0' }}>
              <LoadingSpinner center size="lg" text="Consultando datos reales desde el servidor..." />
            </div>
          ) : reportModel ? (
            <>
              {/* BANNER DE KPIS */}
              <section className="report-kpi-gold-ribbon" aria-label="Indicadores generales del informe">
                {reportModel.kpis.map((kpi, idx) => (
                  <div
                    key={idx}
                    className={`report-kpi-gold-card ${kpi.highlight ? 'report-kpi-gold-card--highlight' : ''}`}
                  >
                    <span className="report-kpi-gold-label">{kpi.label}</span>
                    <span className="report-kpi-gold-val">{formatKpiDisplay(kpi.value, kpi.format)}</span>
                  </div>
                ))}
              </section>

              {/* GRÁFICAS INFORMATIVAS */}
              {reportModel.charts.length > 0 && (
                <section className="report-charts-two-col">
                  {reportModel.charts.map((ch) => {
                    const maxVal = Math.max(...ch.values, 1);
                    const isFirstBar = ch.type === 'line';
                    return (
                      <div key={ch.id} className="report-chart-box">
                        <div className="report-chart-box-header">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {isFirstBar ? <TrendingUp size={16} color="#2563EB" /> : <BarChart2 size={16} color="#1E3A5F" />}
                            <h4 className="report-chart-box-title">{ch.title}</h4>
                          </div>
                          <span className="report-chart-box-sub">{ch.subtitle}</span>
                        </div>

                        <div className="report-bars-horizontal-list" style={{ height: 'auto', minHeight: '140px' }}>
                          {ch.categories.map((cat, idx) => {
                            const val = ch.values[idx] ?? 0;
                            const pct = Math.min((val / maxVal) * 100, 100);
                            return (
                              <div key={idx} className="report-horiz-bar-item">
                                <span className="report-horiz-bar-label" title={cat}>{cat}</span>
                                <div className="report-horiz-bar-track">
                                  <div
                                    className="report-horiz-bar-fill"
                                    style={{
                                      width: `${Math.max(pct, val > 0 ? 6 : 0)}%`,
                                      backgroundColor: '#2563EB',
                                    }}
                                  />
                                </div>
                                <span className="report-horiz-bar-val">
                                  {formatCellDisplay(val, ch.value_format)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </section>
              )}

              {/* TABLA DETALLADA (CON TODOS LOS REGISTROS DEL CORTE) */}
              <section className="report-table-section">
                <div className="report-table-toolbar">
                  <div className="report-table-title-group">
                    <h3 className="report-table-main-title">DETALLE COMPLETO DEL REPORTE</h3>
                    <span className="report-table-count">
                      {reportModel.rows.length} registro(s) · La búsqueda escrita afecta pantalla, Excel y PDF
                    </span>
                  </div>

                  <div className="report-table-search">
                    <Search size={15} className="report-search-icon" />
                    <input
                      type="text"
                      placeholder="Filtrar registros (afecta Excel y PDF)..."
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
                        {reportModel.columns.map((col) => (
                          <th
                            key={col.key}
                            style={{
                              minWidth: col.width_hint ? `${col.width_hint * 6}px` : undefined,
                              textAlign: col.align || 'left',
                            }}
                          >
                            {col.header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {reportModel.rows.length === 0 ? (
                        <tr>
                          <td colSpan={reportModel.columns.length} className="report-table-empty">
                            Sin datos para el periodo
                          </td>
                        </tr>
                      ) : (
                        paginatedRows.map((row, rowIdx) => (
                          <tr key={(safePage - 1) * pageSize + rowIdx}>
                            {reportModel.columns.map((col) => (
                              <td key={col.key} style={{ textAlign: col.align || 'left' }}>
                                <span className="report-cell-text">
                                  {formatCellDisplay(row[col.key], col.type)}
                                </span>
                              </td>
                            ))}
                          </tr>
                        ))
                      )}

                      {reportModel.rows.length > 0 && reportModel.total_row && (
                        <tr className="report-row-summary">
                          {reportModel.columns.map((col) => (
                            <td key={col.key} style={{ textAlign: col.align || 'left' }}>
                              <strong>
                                {reportModel.total_row?.[col.key] !== '' && reportModel.total_row?.[col.key] !== undefined
                                  ? formatCellDisplay(reportModel.total_row[col.key], col.type)
                                  : ''}
                              </strong>
                            </td>
                          ))}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {totalRows > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      marginTop: '0.85rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid #E2E8F0',
                      fontSize: '0.82rem',
                      color: '#475569',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span>
                        Mostrando {(safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, totalRows)} de {totalRows} registros
                      </span>
                      <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        aria-label="Filas por página"
                        style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          color: '#1E293B',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                        }}
                      >
                        <option value={15}>15 por pág.</option>
                        <option value={25}>25 por pág.</option>
                        <option value={50}>50 por pág.</option>
                        <option value={100}>100 por pág.</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        disabled={safePage <= 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        aria-label="Página anterior"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: safePage <= 1 ? '#F8FAFC' : '#FFFFFF',
                          color: safePage <= 1 ? '#94A3B8' : '#1E293B',
                          cursor: safePage <= 1 ? 'not-allowed' : 'pointer',
                          fontWeight: 500,
                        }}
                      >
                        <ChevronLeft size={14} /> Anterior
                      </button>

                      {getPaginationItems(safePage, totalPages).map((item) =>
                        typeof item === 'number' ? (
                          <button
                            key={item}
                            type="button"
                            onClick={() => setCurrentPage(item)}
                            style={{
                              minWidth: '32px',
                              height: '30px',
                              padding: '0 8px',
                              borderRadius: '6px',
                              border: item === safePage ? '1px solid #2563EB' : '1px solid #CBD5E1',
                              backgroundColor: item === safePage ? '#2563EB' : '#FFFFFF',
                              color: item === safePage ? '#FFFFFF' : '#1E293B',
                              fontWeight: item === safePage ? 600 : 500,
                              cursor: 'pointer',
                            }}
                          >
                            {item}
                          </button>
                        ) : (
                          <span key={item} style={{ padding: '0 6px', color: '#94A3B8', userSelect: 'none' }}>
                            …
                          </span>
                        )
                      )}

                      <button
                        type="button"
                        disabled={safePage >= totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        aria-label="Página siguiente"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: safePage >= totalPages ? '#F8FAFC' : '#FFFFFF',
                          color: safePage >= totalPages ? '#94A3B8' : '#1E293B',
                          cursor: safePage >= totalPages ? 'not-allowed' : 'pointer',
                          fontWeight: 500,
                        }}
                      >
                        Siguiente <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </section>

              {/* RECOMENDACIONES Y CRITERIOS METODOLÓGICOS */}
              <section className="report-table-section">
                <h3 className="report-table-main-title">HALLAZGOS, CRITERIOS Y LIMITACIONES</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', fontSize: '0.8rem', color: '#334155' }}>
                  <div>
                    <strong style={{ color: '#1E3A5F' }}>Recomendaciones:</strong>
                    <ul style={{ margin: '6px 0 0', paddingLeft: '1.1rem' }}>
                      {reportModel.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                  <div>
                    <strong style={{ color: '#1E3A5F' }}>Fórmulas y reglas:</strong>
                    <ul style={{ margin: '6px 0 0', paddingLeft: '1.1rem' }}>
                      {[...reportModel.methodology.formulas, ...reportModel.methodology.rules].map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                  <div>
                    <strong style={{ color: '#1E3A5F' }}>Limitaciones documentadas:</strong>
                    <ul style={{ margin: '6px 0 0', paddingLeft: '1.1rem' }}>
                      {reportModel.methodology.limitations.map((l, i) => <li key={i}>{l}</li>)}
                    </ul>
                  </div>
                </div>
              </section>
            </>
          ) : null}

          {/* FOOTER */}
          <footer className="report-modal-footer">
            <div className="report-footer-left">
              <Info size={15} color="#64748B" />
              <span>
                Corte: {reportModel?.cutoff_date || todayStr} · Orientación PDF: {activeMeta.orientation === 'landscape' ? 'Horizontal' : 'Vertical'} · Datos reales del backend.
              </span>
            </div>

            <div className="report-footer-right">
              <button
                type="button"
                className="report-modal-action-btn report-modal-btn--export-excel"
                onClick={() => handleExport('excel')}
                disabled={exportingFormat !== null || isLoading}
              >
                <FileSpreadsheet size={15} />
                <span>{exportingFormat === 'excel' ? 'Generando...' : 'Descargar Excel (.xlsx)'}</span>
              </button>

              <button
                type="button"
                className="report-modal-action-btn report-modal-btn--print"
                onClick={() => handleExport('pdf')}
                disabled={exportingFormat !== null || isLoading}
              >
                <FileText size={15} />
                <span>{exportingFormat === 'pdf' ? 'Generando...' : 'Descargar PDF (.pdf)'}</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
