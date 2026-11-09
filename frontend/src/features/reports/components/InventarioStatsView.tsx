import React from 'react';
import { Package, ShieldAlert, CheckCircle2, Bookmark, PlusCircle } from 'lucide-react';
import type { SiabucInventario } from '../reports.types';

interface Props {
  data: SiabucInventario;
  onOpenEntryModal?: (tab: 'baja') => void;
}

export const InventarioStatsView: React.FC<Props> = ({ data, onOpenEntryModal }) => {
  const { existencias_totales, distribucion_estados, existencias_dewey, perdidos_o_bajas } = data;

  const totalDewey = existencias_dewey.reduce((acc, curr) => acc + curr.cantidad, 0) || 1;
  const porcentajePerdidas = existencias_totales > 0
    ? ((perdidos_o_bajas / existencias_totales) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="siabuc-block-container">
      {/* Action Toolbar */}
      {onOpenEntryModal && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={() => onOpenEntryModal('baja')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.45rem 0.9rem',
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              border: '1px solid #FECACA',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            <PlusCircle size={16} />
            <span>+ Registrar Baja / Extravío de Ejemplar</span>
          </button>
        </div>
      )}

      {/* 4 KPI Cards */}
      <div className="reports-summary-grid">
        <div className="summary-card">
          <div className="summary-card-header">
            <span className="summary-card-title">Existencias Totales</span>
            <div className="summary-card-icon-wrapper" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
              <Package size={18} />
            </div>
          </div>
          <div className="summary-card-value">{existencias_totales}</div>
          <div className="summary-card-footer">
            <span className="summary-card-trend trend-positive">Inventario físico inventariado</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <span className="summary-card-title">Pérdidas y Bajas</span>
            <div className="summary-card-icon-wrapper" style={{ backgroundColor: '#FEF2F2', color: '#DC2626' }}>
              <ShieldAlert size={18} />
            </div>
          </div>
          <div className="summary-card-value">{perdidos_o_bajas}</div>
          <div className="summary-card-footer">
            <span className="summary-card-trend trend-negative">{porcentajePerdidas}% del acervo total</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <span className="summary-card-title">Disponibilidad Inmediata</span>
            <div className="summary-card-icon-wrapper" style={{ backgroundColor: '#F0FDF4', color: '#16A34A' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="summary-card-value">
            {distribucion_estados.find((d) => d.estado.toLowerCase() === 'disponible')?.cantidad || 0}
          </div>
          <div className="summary-card-footer">
            <span className="summary-card-trend trend-positive">Ejemplares listos para préstamo</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <span className="summary-card-title">En Préstamo Activo</span>
            <div className="summary-card-icon-wrapper" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>
              <Bookmark size={18} />
            </div>
          </div>
          <div className="summary-card-value">
            {distribucion_estados.find((d) => d.estado.toLowerCase() === 'prestado')?.cantidad || 0}
          </div>
          <div className="summary-card-footer">
            <span className="summary-card-trend trend-neutral">Fuera de estantería</span>
          </div>
        </div>
      </div>

      {/* Grid: Existencias por Clasificación Dewey & Distribución por Estado Físico */}
      <div className="reports-charts-grid" style={{ marginTop: '1rem' }}>
        {/* Existencias Dewey */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">Existencias por Clasificación</h3>
              <p className="chart-card-subtitle">Áreas de conocimiento según sistema Dewey</p>
            </div>
          </div>
          <div className="siabuc-list">
            {existencias_dewey.length === 0 ? (
              <p style={{ color: '#9CA3AF', fontSize: '0.875rem', padding: '1rem' }}>Sin clasificaciones registradas.</p>
            ) : (
              existencias_dewey.map((item, idx) => (
                <div key={idx} className="siabuc-list-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, color: '#1F2937', fontSize: '0.875rem' }}>{item.clasificacion}</span>
                    <span style={{ fontWeight: 700, color: '#3B82F6', fontSize: '0.875rem' }}>{item.cantidad} ejemplares</span>
                  </div>
                  <div className="siabuc-progress-track">
                    <div
                      className="siabuc-progress-fill"
                      style={{
                        width: `${(item.cantidad / totalDewey) * 100}%`,
                        backgroundColor: '#3B82F6',
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Distribución por Estado */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">Distribución por Estado Físico</h3>
              <p className="chart-card-subtitle">Condición de los códigos de barra en el acervo</p>
            </div>
          </div>
          <div className="siabuc-list">
            {distribucion_estados.length === 0 ? (
              <p style={{ color: '#9CA3AF', fontSize: '0.875rem', padding: '1rem' }}>Sin ejemplares registrados.</p>
            ) : (
              distribucion_estados.map((item, idx) => (
                <div key={idx} className="siabuc-list-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, color: '#1F2937', fontSize: '0.875rem' }}>{item.estado}</span>
                    <span style={{ fontWeight: 700, color: '#10B981', fontSize: '0.875rem' }}>
                      {item.cantidad} ({existencias_totales > 0 ? Math.round((item.cantidad / existencias_totales) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="siabuc-progress-track">
                    <div
                      className="siabuc-progress-fill"
                      style={{
                        width: `${existencias_totales > 0 ? (item.cantidad / existencias_totales) * 100 : 0}%`,
                        backgroundColor:
                          item.estado.toLowerCase() === 'disponible'
                            ? '#10B981'
                            : item.estado.toLowerCase() === 'prestado'
                            ? '#3B82F6'
                            : '#EF4444',
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
