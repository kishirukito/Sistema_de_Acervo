import React from 'react';
import { BookOpen, UserCheck, RefreshCw, DollarSign, PlusCircle } from 'lucide-react';
import type { SiabucCirculacion } from '../reports.types';

interface Props {
  data: SiabucCirculacion;
  onOpenEntryModal?: (tab: 'sancion') => void;
}

export const CirculacionStatsView: React.FC<Props> = ({ data, onOpenEntryModal }) => {
  const {
    total_prestamos,
    prestamos_sala,
    prestamos_domicilio,
    renovaciones,
    prestamos_por_tipo_usuario,
    prestamos_por_carrera,
    frecuencia_acervo,
    sanciones,
  } = data;

  const totalPorCarrera = prestamos_por_carrera.reduce((acc, curr) => acc + curr.cantidad, 0) || 1;

  return (
    <div className="siabuc-block-container">
      {/* Action Toolbar */}
      {onOpenEntryModal && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={() => onOpenEntryModal('sancion')}
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
            <span>+ Registrar Sanción o Multa</span>
          </button>
        </div>
      )}

      {/* 4 Main Circulation KPIs */}
      <div className="reports-summary-grid">
        <div className="summary-card">
          <div className="summary-card-header">
            <span className="summary-card-title">Total Préstamos</span>
            <div className="summary-card-icon-wrapper" style={{ backgroundColor: '#EFF6FF', color: '#2563EB' }}>
              <BookOpen size={18} />
            </div>
          </div>
          <div className="summary-card-value">{total_prestamos}</div>
          <div className="summary-card-footer">
            <span className="summary-card-trend trend-positive">Actividad acumulada en sistema</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <span className="summary-card-title">Modalidad de Uso</span>
            <div className="summary-card-icon-wrapper" style={{ backgroundColor: '#F0FDF4', color: '#16A34A' }}>
              <UserCheck size={18} />
            </div>
          </div>
          <div className="summary-card-value">
            {prestamos_domicilio}{' '}
            <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#6B7280' }}>
              domicilio / {prestamos_sala} sala
            </span>
          </div>
          <div className="summary-card-footer">
            <span className="summary-card-trend trend-neutral">Circulación interna vs externa</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <span className="summary-card-title">Renovaciones</span>
            <div className="summary-card-icon-wrapper" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>
              <RefreshCw size={18} />
            </div>
          </div>
          <div className="summary-card-value">{renovaciones}</div>
          <div className="summary-card-footer">
            <span className="summary-card-trend trend-neutral">Extensiones de plazo registradas</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-header">
            <span className="summary-card-title">Multas y Sanciones</span>
            <div className="summary-card-icon-wrapper" style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div className="summary-card-value">${sanciones.monto_total.toFixed(2)}</div>
          <div className="summary-card-footer">
            <span className="summary-card-trend" style={{ color: sanciones.monto_pendiente > 0 ? '#DC2626' : '#16A34A' }}>
              ${sanciones.monto_pendiente.toFixed(2)} por cobrar / ${sanciones.monto_recaudado.toFixed(2)} pagado
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Préstamos por Tipo de Usuario & Préstamos por Unidad Académica */}
      <div className="reports-charts-grid" style={{ marginTop: '1rem' }}>
        {/* Tipo de Usuario */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">Préstamos por Tipo de Usuario</h3>
              <p className="chart-card-subtitle">Transacciones discriminadas por rol institucional</p>
            </div>
          </div>
          <div className="siabuc-list">
            {prestamos_por_tipo_usuario.length === 0 ? (
              <p style={{ color: '#9CA3AF', fontSize: '0.875rem', padding: '1rem' }}>Sin registros de préstamos en el periodo.</p>
            ) : (
              prestamos_por_tipo_usuario.map((item, idx) => (
                <div key={idx} className="siabuc-list-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, color: '#1F2937', fontSize: '0.875rem' }}>{item.tipo}</span>
                    <span style={{ fontWeight: 700, color: '#2563EB', fontSize: '0.875rem' }}>{item.cantidad} préstamos</span>
                  </div>
                  <div className="siabuc-progress-track">
                    <div
                      className="siabuc-progress-fill"
                      style={{
                        width: `${total_prestamos > 0 ? (item.cantidad / total_prestamos) * 100 : 0}%`,
                        backgroundColor: '#3B82F6',
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Por Unidad Académica / Escuela */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">Préstamos por Carrera / Dependencia</h3>
              <p className="chart-card-subtitle">Impacto de uso del servicio por facultades o áreas</p>
            </div>
          </div>
          <div className="siabuc-list">
            {prestamos_por_carrera.length === 0 ? (
              <p style={{ color: '#9CA3AF', fontSize: '0.875rem', padding: '1rem' }}>Sin transacciones registradas.</p>
            ) : (
              prestamos_por_carrera.map((item, idx) => (
                <div key={idx} className="siabuc-list-item">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, color: '#1F2937', fontSize: '0.875rem' }}>{item.carrera}</span>
                    <span style={{ fontWeight: 700, color: '#10B981', fontSize: '0.875rem' }}>{item.cantidad}</span>
                  </div>
                  <div className="siabuc-progress-track">
                    <div
                      className="siabuc-progress-fill"
                      style={{
                        width: `${(item.cantidad / totalPorCarrera) * 100}%`,
                        backgroundColor: '#10B981',
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Grid: Frecuencia de Uso del Acervo & Reporte Contable de Sanciones */}
      <div className="reports-charts-grid" style={{ marginTop: '1rem' }}>
        {/* Frecuencia de Uso */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">Frecuencia de Uso del Acervo</h3>
              <p className="chart-card-subtitle">Títulos y clasificaciones bibliográficas más solicitadas</p>
            </div>
          </div>
          <div className="siabuc-list">
            {frecuencia_acervo.length === 0 ? (
              <p style={{ color: '#9CA3AF', fontSize: '0.875rem', padding: '1rem' }}>Sin préstamos registrados en el rango de fechas.</p>
            ) : (
              frecuencia_acervo.map((item, idx) => (
                <div key={idx} className="siabuc-list-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="siabuc-rank-badge">{idx + 1}</span>
                    <span style={{ fontWeight: 600, color: '#374151', fontSize: '0.875rem' }}>{item.titulo}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: '#8B5CF6', fontSize: '0.875rem' }}>
                    {item.solicitudes} {item.solicitudes === 1 ? 'préstamo' : 'préstamos'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Desglose de Sanciones y Multas */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">Estadísticas de Sanciones y Multas</h3>
              <p className="chart-card-subtitle">Reporte contable de usuarios amonestados o suspendidos</p>
            </div>
          </div>
          <div style={{ padding: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: '#F9FAFB', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Sancionados</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1F2937' }}>{sanciones.usuarios_sancionados}</div>
              </div>
              <div style={{ backgroundColor: '#FEF2F2', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#DC2626' }}>Por Cobrar</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#DC2626' }}>${sanciones.monto_pendiente.toFixed(2)}</div>
              </div>
              <div style={{ backgroundColor: '#F0FDF4', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: '#16A34A' }}>Recaudado</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#16A34A' }}>${sanciones.monto_recaudado.toFixed(2)}</div>
              </div>
            </div>

            <div className="siabuc-table-responsive">
              <table className="siabuc-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Tipo</th>
                    <th>Monto</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {sanciones.detalle.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', color: '#9CA3AF' }}>Sin sanciones registradas.</td>
                    </tr>
                  ) : (
                    sanciones.detalle.slice(0, 5).map((s, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 500 }}>{s.usuarios?.nombre_completo || s.usuarios?.email || 'Usuario'}</td>
                        <td><span className="siabuc-tag tag-warning">{s.tipo_sancion}</span></td>
                        <td style={{ fontWeight: 600 }}>${(parseFloat(s.monto_multa) || 0).toFixed(2)}</td>
                        <td>
                          <span className={`siabuc-tag ${s.estado_pago === 'pagado' ? 'tag-success' : s.estado_pago === 'pendiente' ? 'tag-danger' : 'tag-neutral'}`}>
                            {s.estado_pago}
                          </span>
                        </td>
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
