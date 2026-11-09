import React from 'react';
import { Monitor, Calendar, Clock, PlusCircle } from 'lucide-react';
import type { SiabucServicios } from '../reports.types';

interface Props {
  data: SiabucServicios;
  onOpenEntryModal?: (tab: 'espacio' | 'computo') => void;
}

export const ServiciosStatsView: React.FC<Props> = ({ data, onOpenEntryModal }) => {
  const { espacios, computo } = data;

  const totalReservas = espacios.uso_por_espacio.reduce((sum, e) => sum + e.reservas, 0) || 1;

  return (
    <div className="siabuc-block-container">
      {/* Action Toolbar */}
      {onOpenEntryModal && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={() => onOpenEntryModal('espacio')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.45rem 0.9rem',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              border: '1px solid #BFDBFE',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            <PlusCircle size={16} />
            <span>+ Reservar Espacio / Cubículo</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenEntryModal('computo')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.45rem 0.9rem',
              backgroundColor: '#F0FDF4',
              color: '#16A34A',
              border: '1px solid #BBF7D0',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            <PlusCircle size={16} />
            <span>+ Registrar Sesión de Cómputo</span>
          </button>
        </div>
      )}

      {/* 4 KPI Cards */}
      <div className="reports-summary-grid">
        <div className="summary-card">
          <div className="summary-card-header">
            <span className="summary-card-title">Espacios y Cubículos</span>
            <div className="summary-card-icon-wrapper" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
              <Calendar size={18} />
            </div>
          </div>
          <div className="summary-card-value">{espacios.total_espacios}</div>
          <div className="summary-card-footer">
            <span className="summary-card-trend trend-positive">{espacios.total_reservas} reservaciones registradas</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <span className="summary-card-title">Equipos de Cómputo</span>
            <div className="summary-card-icon-wrapper" style={{ backgroundColor: '#F0FDF4', color: '#16A34A' }}>
              <Monitor size={18} />
            </div>
          </div>
          <div className="summary-card-value">{computo.total_equipos}</div>
          <div className="summary-card-footer">
            <span className="summary-card-trend trend-positive">Estaciones monitoreadas</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <span className="summary-card-title">Sesiones de Cómputo</span>
            <div className="summary-card-icon-wrapper" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>
              <Clock size={18} />
            </div>
          </div>
          <div className="summary-card-value">{computo.total_sesiones}</div>
          <div className="summary-card-footer">
            <span className="summary-card-trend trend-neutral">Uso del servicio por alumnos</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <span className="summary-card-title">Tiempo Total en Internet</span>
            <div className="summary-card-icon-wrapper" style={{ backgroundColor: '#F3E8FF', color: '#9333EA' }}>
              <Clock size={18} />
            </div>
          </div>
          <div className="summary-card-value">{computo.horas_totales} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#6B7280' }}>horas</span></div>
          <div className="summary-card-footer">
            <span className="summary-card-trend trend-positive">{computo.minutos_totales} minutos acumulados</span>
          </div>
        </div>
      </div>

      {/* Grid: Ocupación de Espacios & Sesiones de Cómputo */}
      <div className="reports-charts-grid" style={{ marginTop: '1rem' }}>
        {/* Ocupación de Espacios */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">Ocupación de Espacios de Estudio</h3>
              <p className="chart-card-subtitle">Frecuencia de reserva en cubículos y salas grupales</p>
            </div>
          </div>
          <div className="siabuc-list">
            {espacios.uso_por_espacio.length === 0 ? (
              <p style={{ color: '#9CA3AF', fontSize: '0.875rem', padding: '1rem' }}>Sin reservaciones registradas.</p>
            ) : (
              espacios.uso_por_espacio.map((item, idx) => (
                <div key={idx} className="siabuc-list-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, color: '#1F2937', fontSize: '0.875rem' }}>{item.espacio}</span>
                    <span style={{ fontWeight: 700, color: '#2563EB', fontSize: '0.875rem' }}>{item.reservas} reservas</span>
                  </div>
                  <div className="siabuc-progress-track">
                    <div
                      className="siabuc-progress-fill"
                      style={{
                        width: `${(item.reservas / totalReservas) * 100}%`,
                        backgroundColor: '#2563EB',
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Monitoreo de Sesiones de Cómputo */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">Registro de Sesiones de Cómputo</h3>
              <p className="chart-card-subtitle">Afluencia y tiempo de conexión de usuarios</p>
            </div>
          </div>
          <div style={{ padding: '1rem' }}>
            <div className="siabuc-table-responsive">
              <table className="siabuc-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Equipo</th>
                    <th>Duración</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {computo.detalle_sesiones.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', color: '#9CA3AF' }}>Sin sesiones registradas en el periodo.</td>
                    </tr>
                  ) : (
                    computo.detalle_sesiones.slice(0, 5).map((s, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 500 }}>{s.usuarios?.nombre_completo || 'Alumno'}</td>
                        <td><span className="siabuc-tag tag-primary">{s.equipos_computo?.codigo || 'PC'}</span></td>
                        <td style={{ fontWeight: 600 }}>{s.duracion_minutos} min</td>
                        <td style={{ color: '#6B7280', fontSize: '0.8rem' }}>{s.inicio ? s.inicio.slice(0, 10) : 'Hoy'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
