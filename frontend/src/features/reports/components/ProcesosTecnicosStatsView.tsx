import React from 'react';
import { Layers, UserCheck, Calendar, BookPlus, Award, CheckCircle } from 'lucide-react';
import type { SiabucProcesosTecnicos } from '../reports.types';

interface Props {
  data: SiabucProcesosTecnicos;
}

export const ProcesosTecnicosStatsView: React.FC<Props> = ({ data }) => {
  const { total_titulos, total_ejemplares, productividad_catalogador, altas_por_periodo } = data;

  const totalCatalogado = productividad_catalogador.reduce((sum, item) => sum + item.fichas_creadas, 0) || 1;

  return (
    <div className="siabuc-block-container">
      {/* KPI Cards */}
      <div className="reports-summary-grid">
        <div className="summary-card">
          <div className="summary-card-header">
            <span className="summary-card-title">Títulos Catalogados</span>
            <div className="summary-card-icon-wrapper" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
              <Layers size={18} />
            </div>
          </div>
          <div className="summary-card-value">{total_titulos}</div>
          <div className="summary-card-footer">
            <span className="summary-card-trend trend-positive">Fichas bibliográficas activas</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <span className="summary-card-title">Ejemplares Físicos</span>
            <div className="summary-card-icon-wrapper" style={{ backgroundColor: '#F0FDF4', color: '#16A34A' }}>
              <BookPlus size={18} />
            </div>
          </div>
          <div className="summary-card-value">{total_ejemplares}</div>
          <div className="summary-card-footer">
            <span className="summary-card-trend trend-neutral">Volúmenes con código de barra</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <span className="summary-card-title">Catalogadores Activos</span>
            <div className="summary-card-icon-wrapper" style={{ backgroundColor: '#FAF5FF', color: '#9333EA' }}>
              <UserCheck size={18} />
            </div>
          </div>
          <div className="summary-card-value">{productividad_catalogador.length}</div>
          <div className="summary-card-footer">
            <span className="summary-card-trend trend-neutral">Personal técnico asignado</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <span className="summary-card-title">Promedio Ejemplares / Título</span>
            <div className="summary-card-icon-wrapper" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>
              <Award size={18} />
            </div>
          </div>
          <div className="summary-card-value">
            {total_titulos > 0 ? (total_ejemplares / total_titulos).toFixed(1) : '1.0'}
          </div>
          <div className="summary-card-footer">
            <span className="summary-card-trend trend-positive">Tasa de replicación bibliográfica</span>
          </div>
        </div>
      </div>

      {/* Grid: Productividad por Analista & Altas Netas */}
      <div className="reports-charts-grid" style={{ marginTop: '1rem' }}>
        {/* Productividad por Catalogador */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">Productividad por Analista (Catalogador)</h3>
              <p className="chart-card-subtitle">Fichas catalográficas procesadas por analista técnico</p>
            </div>
            <Award size={20} color="#9333EA" />
          </div>
          <div className="siabuc-list">
            {productividad_catalogador.length === 0 ? (
              <p style={{ color: '#9CA3AF', fontSize: '0.875rem', padding: '1rem' }}>No hay catalogadores registrados.</p>
            ) : (
              productividad_catalogador.map((analista, idx) => {
                const pct = Math.round((analista.fichas_creadas / totalCatalogado) * 100);
                return (
                  <div key={idx} className="siabuc-list-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: '#EDE9FE',
                          color: '#7C3AED',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}>
                          {analista.catalogador.slice(0, 2).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 600, color: '#1F2937', fontSize: '0.875rem' }}>
                          {analista.catalogador}
                        </span>
                      </div>
                      <span style={{ fontWeight: 700, color: '#7C3AED', fontSize: '0.875rem' }}>
                        {analista.fichas_creadas} registros ({pct}%)
                      </span>
                    </div>
                    <div className="siabuc-progress-bg">
                      <div
                        className="siabuc-progress-bar"
                        style={{ width: `${pct}%`, backgroundColor: '#8B5CF6' }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Altas del Acervo */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">Altas del Acervo (Conteo Anual / Neto)</h3>
              <p className="chart-card-subtitle">Ritmo de incorporación de nuevos títulos al catálogo</p>
            </div>
            <Calendar size={20} color="#2563EB" />
          </div>
          <div className="siabuc-list">
            {altas_por_periodo.length === 0 ? (
              <p style={{ color: '#9CA3AF', fontSize: '0.875rem', padding: '1rem' }}>Sin historial de altas disponible.</p>
            ) : (
              altas_por_periodo.map((p, idx) => (
                <div key={idx} className="siabuc-list-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>
                      Año Fiscal {p.periodo}
                    </span>
                    <span style={{ fontWeight: 700, color: '#2563EB', fontSize: '0.875rem' }}>
                      +{p.titulos} títulos nuevos
                    </span>
                  </div>
                  <div className="siabuc-progress-bg">
                    <div
                      className="siabuc-progress-bar"
                      style={{
                        width: `${Math.min(100, Math.round((p.titulos / (total_titulos || 1)) * 100))}%`,
                        backgroundColor: '#2563EB',
                      }}
                    />
                  </div>
                </div>
              ))
            )}
            <div style={{
              marginTop: '1.25rem',
              padding: '0.85rem',
              borderRadius: '8px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #DBEAFE',
              fontSize: '0.8rem',
              color: '#1E40AF',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle size={16} />
              <span>Conforme al estándar SIABUC, las altas netas reflejan registros bibliográficos validados con signatura topográfica asignada.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

