import React, { useState, useMemo } from 'react';
import {
  X,
  FileSpreadsheet,
  Printer,
  Search,
  Info,
  BarChart2,
  TrendingUp,
} from 'lucide-react';
import type { ReportTemplateData } from '../reports-templates.types';
import { exportReportTemplateToCsv } from '../reports-templates.data';
import './ReportTemplateModal.css';

interface ReportTemplateModalProps {
  reportData: ReportTemplateData | null;
  onClose: () => void;
}

export const ReportTemplateModal: React.FC<ReportTemplateModalProps> = ({
  reportData,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!reportData) return null;

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

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
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

  return (
    <div className="report-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="report-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header Superior del Modal */}
        <header className="report-modal-header">
          <div className="report-modal-header-info">
            <div className="report-modal-badges-row">
              <span className="report-modal-code-badge">{reportData.code}</span>
              <span className="report-modal-cat-badge">{reportData.categoryBadge}</span>
              <span className="report-modal-period-badge">{reportData.periodLabel}</span>
            </div>
            <h2 className="report-modal-title">{reportData.title.toUpperCase()}</h2>
            <p className="report-modal-desc">
              {reportData.description}
            </p>
          </div>

          <div className="report-modal-header-actions">
            <button
              type="button"
              className="report-modal-action-btn report-modal-btn--export"
              onClick={handleExport}
              title="Descargar archivo CSV estructurado para Excel"
            >
              <FileSpreadsheet size={16} />
              <span>Exportar Excel / CSV</span>
            </button>

            <button
              type="button"
              className="report-modal-action-btn report-modal-btn--print"
              onClick={handlePrint}
              title="Imprimir o guardar como PDF"
            >
              <Printer size={16} />
              <span>Imprimir / PDF</span>
            </button>

            <button
              type="button"
              className="report-modal-close-btn"
              onClick={onClose}
              aria-label="Cerrar reporte"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Cuerpo del Reporte (Diseño Plantilla Ejecutiva) */}
        <div className="report-modal-body">
          {/* BANNER KPI SUPERIOR (Estilo Dorado / Gold de la Plantilla) */}
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

          {/* SECCIÓN DE GRÁFICAS INFORMATIVAS (Dos Paneles) */}
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

          {/* SECCIÓN TABLA DE DATOS (Detalle Granular) */}
          <section className="report-table-section">
            <div className="report-table-toolbar">
              <div className="report-table-title-group">
                <h3 className="report-table-main-title">RESUMEN Y REGISTRO DETALLADO</h3>
                <span className="report-table-count">
                  Mostrando {filteredRows.length} de {reportData.rows.length} fila(s)
                </span>
              </div>

              <div className="report-table-search">
                <Search size={15} className="report-search-icon" />
                <input
                  type="text"
                  placeholder="Buscar en la tabla..."
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

                  {/* Fila de Totales / Resumen */}
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

          {/* Pie de Página Institucional */}
          <footer className="report-modal-footer">
            <div className="report-footer-left">
              <Info size={15} color="#64748B" />
              <span>
                Documento generado automáticamente por el Sistema de Acervo Bibliotecario de la Universidad Politécnica de Durango.
              </span>
            </div>
            <div className="report-footer-right">
              <button
                type="button"
                className="report-modal-action-btn report-modal-btn--export"
                onClick={handleExport}
              >
                <FileSpreadsheet size={15} />
                <span>Descargar en formato Excel / CSV</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
