import React, { useState } from 'react';
import {
  X,
  AlertCircle,
  Package,
  Clock,
  Search,
  Book,
  Mail,
} from 'lucide-react';
import type {
  MultaAlertaDetalle,
  EjemplarNoDisponibleAlertaDetalle,
  OverdueLoanItem,
  SiabucReportData,
} from '../reports.types';

export type AlertType = 'ejemplares' | 'multas' | 'vencidos';

interface AlertDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  alertType: AlertType | null;
  alertasData?: SiabucReportData['resumen_ejecutivo']['alertas'];
}

export const AlertDetailModal: React.FC<AlertDetailModalProps> = ({
  isOpen,
  onClose,
  alertType,
  alertasData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen || !alertType) return null;

  const multas: MultaAlertaDetalle[] = alertasData?.detalle_multas_pendientes || [];
  const ejemplares: EjemplarNoDisponibleAlertaDetalle[] = alertasData?.detalle_ejemplares_no_disponibles || [];
  const vencidos: OverdueLoanItem[] = alertasData?.detalle_prestamos_vencidos || [];

  // Filtrado por buscador
  const filteredMultas = multas.filter((m) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      m.nombre.toLowerCase().includes(q) ||
      m.matricula.toLowerCase().includes(q) ||
      m.libro.toLowerCase().includes(q) ||
      m.folioSancion.toLowerCase().includes(q) ||
      m.carrera.toLowerCase().includes(q)
    );
  });

  const filteredEjemplares = ejemplares.filter((e) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      e.titulo.toLowerCase().includes(q) ||
      e.codigoInventario.toLowerCase().includes(q) ||
      e.usuario.toLowerCase().includes(q) ||
      e.matricula.toLowerCase().includes(q) ||
      e.ubicacion.toLowerCase().includes(q) ||
      e.estado.toLowerCase().includes(q)
    );
  });

  const filteredVencidos = vencidos.filter((v) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      v.userName.toLowerCase().includes(q) ||
      (v.matricula && v.matricula.toLowerCase().includes(q)) ||
      v.bookTitle.toLowerCase().includes(q) ||
      v.folio.toLowerCase().includes(q)
    );
  });

  const titles = {
    multas: {
      title: 'Multas Pendientes de Cobro',
      subtitle: 'Listado detallado de alumnos y usuarios con adeudos activos por material bibliográfico.',
      icon: <AlertCircle size={22} color="#DC2626" />,
      badgeColor: '#FEE2E2',
      badgeText: '#991B1B',
      countText: `$${(alertasData?.multas_pendientes || 0).toFixed(2)} MXN (${multas.length} multas)`,
    },
    ejemplares: {
      title: 'Ejemplares No Disponibles',
      subtitle: 'Libros y materiales en préstamo activo, mantenimiento, extravío o proceso de baja.',
      icon: <Package size={22} color="#D97706" />,
      badgeColor: '#FEF3C7',
      badgeText: '#92400E',
      countText: `${alertasData?.ejemplares_no_disponibles || 0} ejemplares`,
    },
    vencidos: {
      title: 'Préstamos Vencidos',
      subtitle: 'Préstamos activos cuya fecha límite de devolución ha expirado sin registrarse entrega.',
      icon: <Clock size={22} color="#DC2626" />,
      badgeColor: '#FEE2E2',
      badgeText: '#991B1B',
      countText: `${alertasData?.prestamos_vencidos || 0} préstamos con retraso`,
    },
  };

  const currentMeta = titles[alertType];

  return (
    <div
      className="report-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(3px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="alert-detail-modal-card"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '100%',
          maxWidth: '960px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #E2E8F0',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="alert-modal-title"
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F8FAFC',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: currentMeta.badgeColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {currentMeta.icon}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3
                  id="alert-modal-title"
                  style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0F172A' }}
                >
                  {currentMeta.title}
                </h3>
                <span
                  style={{
                    backgroundColor: currentMeta.badgeColor,
                    color: currentMeta.badgeText,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '9999px',
                  }}
                >
                  {currentMeta.countText}
                </span>
              </div>
              <p style={{ margin: '2px 0 0', fontSize: '0.8125rem', color: '#64748B' }}>
                {currentMeta.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#94A3B8',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Toolbar: Search */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            gap: '12px',
          }}
        >
          <div
            style={{
              position: 'relative',
              flex: 1,
              maxWidth: '380px',
            }}
          >
            <Search
              size={15}
              color="#94A3B8"
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Buscar por usuario, matrícula, libro o folio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 12px 7px 32px',
                fontSize: '0.8125rem',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
            {alertType === 'multas' && `${filteredMultas.length} de ${multas.length} registros`}
            {alertType === 'ejemplares' && `${filteredEjemplares.length} de ${ejemplares.length} registros`}
            {alertType === 'vencidos' && `${filteredVencidos.length} de ${vencidos.length} registros`}
          </div>
        </div>

        {/* Modal Body / Table Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {/* TABLA DE MULTAS PENDIENTES */}
          {alertType === 'multas' && (
            <>
              {filteredMultas.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748B' }}>
                  <AlertCircle size={36} color="#10B981" style={{ margin: '0 auto 8px' }} />
                  <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: 0, color: '#0F172A' }}>
                    {searchQuery ? 'No se encontraron multas con ese criterio.' : 'Sin multas pendientes de cobro.'}
                  </p>
                  <p style={{ fontSize: '0.8125rem', margin: '4px 0 0' }}>
                    Todos los alumnos y docentes se encuentran al corriente.
                  </p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                        <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Folio / Fecha</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Usuario / Matrícula</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Libro Solicitado</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Motivo & Retraso</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569', textAlign: 'right' }}>Monto Pendiente</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMultas.map((m, idx) => (
                        <tr
                          key={m.id || idx}
                          style={{
                            borderBottom: '1px solid #F1F5F9',
                            backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                          }}
                        >
                          <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                            <div style={{ fontWeight: 700, color: '#1E293B' }}>{m.folioSancion}</div>
                            <div style={{ fontSize: '0.71875rem', color: '#64748B' }}>{m.fechaEmision}</div>
                          </td>
                          <td style={{ padding: '10px 14px' }}>
                            <div style={{ fontWeight: 600, color: '#0F172A' }}>{m.nombre}</div>
                            <div style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 600 }}>
                              Mat: {m.matricula}
                            </div>
                            <div style={{ fontSize: '0.71875rem', color: '#64748B' }}>{m.carrera}</div>
                            {m.email !== 'No disponible' && (
                              <div style={{ fontSize: '0.71875rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                <Mail size={11} />
                                <span>{m.email}</span>
                              </div>
                            )}
                          </td>
                          <td style={{ padding: '10px 14px', maxWidth: '240px' }}>
                            <div style={{ fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                              <Book size={14} color="#64748B" style={{ flexShrink: 0, marginTop: '2px' }} />
                              <span>{m.libro}</span>
                            </div>
                          </td>
                          <td style={{ padding: '10px 14px' }}>
                            <div style={{ color: '#334155' }}>{m.motivo}</div>
                            {m.diasRetraso > 0 && (
                              <span
                                style={{
                                  display: 'inline-block',
                                  marginTop: '4px',
                                  padding: '1px 7px',
                                  backgroundColor: '#FEE2E2',
                                  color: '#DC2626',
                                  borderRadius: '4px',
                                  fontWeight: 700,
                                  fontSize: '0.6875rem',
                                }}
                              >
                                {m.diasRetraso} día(s) de mora
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#DC2626' }}>
                              ${m.monto.toFixed(2)} MXN
                            </div>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '1px 6px',
                                backgroundColor: '#FEF3C7',
                                color: '#B45309',
                                borderRadius: '4px',
                                fontSize: '0.6875rem',
                                fontWeight: 600,
                              }}
                            >
                              Pendiente
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* TABLA DE EJEMPLARES NO DISPONIBLES */}
          {alertType === 'ejemplares' && (
            <>
              {filteredEjemplares.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748B' }}>
                  <Package size={36} color="#10B981" style={{ margin: '0 auto 8px' }} />
                  <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: 0, color: '#0F172A' }}>
                    Todos los ejemplares del acervo están disponibles.
                  </p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                        <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Cód. Inventario</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Título del Libro</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Estado</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>En posesión / Usuario</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Ubicación / Ficha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEjemplares.map((e, idx) => (
                        <tr
                          key={e.id || idx}
                          style={{
                            borderBottom: '1px solid #F1F5F9',
                            backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                          }}
                        >
                          <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                            <span style={{ fontWeight: 700, color: '#1E293B', fontFamily: 'monospace' }}>
                              {e.codigoInventario}
                            </span>
                            <div style={{ fontSize: '0.71875rem', color: '#64748B' }}>Dewey: {e.dewey}</div>
                          </td>
                          <td style={{ padding: '10px 14px', maxWidth: '280px' }}>
                            <div style={{ fontWeight: 600, color: '#0F172A' }}>{e.titulo}</div>
                            {e.isbn && e.isbn !== 'N/A' && (
                              <div style={{ fontSize: '0.71875rem', color: '#64748B' }}>ISBN: {e.isbn}</div>
                            )}
                          </td>
                          <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '2px 8px',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                backgroundColor:
                                  e.estado.toLowerCase() === 'prestado'
                                    ? '#DBEAFE'
                                    : e.estado.toLowerCase() === 'mantenimiento'
                                    ? '#FEF3C7'
                                    : '#FEE2E2',
                                color:
                                  e.estado.toLowerCase() === 'prestado'
                                    ? '#1E40AF'
                                    : e.estado.toLowerCase() === 'mantenimiento'
                                    ? '#92400E'
                                    : '#991B1B',
                              }}
                            >
                              {e.estado}
                            </span>
                          </td>
                          <td style={{ padding: '10px 14px' }}>
                            <div style={{ fontWeight: 600, color: '#1E293B' }}>{e.usuario}</div>
                            {e.matricula !== 'N/A' && (
                              <div style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 600 }}>
                                Mat: {e.matricula}
                              </div>
                            )}
                            {e.fechaLimite !== 'N/A' && (
                              <div style={{ fontSize: '0.71875rem', color: '#64748B' }}>
                                Límite: {e.fechaLimite}
                              </div>
                            )}
                          </td>
                          <td style={{ padding: '10px 14px' }}>
                            <div style={{ color: '#334155' }}>{e.ubicacion}</div>
                            <div style={{ fontSize: '0.71875rem', color: '#64748B', fontStyle: 'italic' }}>
                              {e.observaciones}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* TABLA DE PRÉSTAMOS VENCIDOS */}
          {alertType === 'vencidos' && (
            <>
              {filteredVencidos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748B' }}>
                  <Clock size={36} color="#10B981" style={{ margin: '0 auto 8px' }} />
                  <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: 0, color: '#0F172A' }}>
                    No hay préstamos vencidos en este momento.
                  </p>
                  <p style={{ fontSize: '0.8125rem', margin: '4px 0 0' }}>
                    Todas las devoluciones activas están dentro de la fecha reglamentaria.
                  </p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8125rem' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                        <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Folio</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Usuario / Matrícula</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Libro Prestado</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569' }}>Fecha Límite</th>
                        <th style={{ padding: '10px 14px', fontWeight: 700, color: '#475569', textAlign: 'right' }}>Días de Retraso</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVencidos.map((v, idx) => (
                        <tr
                          key={v.id || idx}
                          style={{
                            borderBottom: '1px solid #F1F5F9',
                            backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                          }}
                        >
                          <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                            <span style={{ fontWeight: 700, color: '#1E293B' }}>{v.folio}</span>
                          </td>
                          <td style={{ padding: '10px 14px' }}>
                            <div style={{ fontWeight: 600, color: '#0F172A' }}>{v.userName}</div>
                            {v.matricula && (
                              <div style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 600 }}>
                                Mat: {v.matricula}
                              </div>
                            )}
                            {v.email && v.email !== 'No disponible' && (
                              <div style={{ fontSize: '0.71875rem', color: '#64748B' }}>{v.email}</div>
                            )}
                          </td>
                          <td style={{ padding: '10px 14px', maxWidth: '260px' }}>
                            <div style={{ fontWeight: 600, color: '#1E293B' }}>{v.bookTitle}</div>
                            {v.codigoInventario && (
                              <div style={{ fontSize: '0.71875rem', color: '#64748B' }}>
                                Ejemplar: {v.codigoInventario}
                              </div>
                            )}
                          </td>
                          <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                            <div style={{ fontWeight: 600, color: '#DC2626' }}>{v.dueDate}</div>
                          </td>
                          <td style={{ padding: '10px 14px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <span
                              style={{
                                display: 'inline-block',
                                padding: '2px 8px',
                                backgroundColor: '#FEE2E2',
                                color: '#991B1B',
                                borderRadius: '6px',
                                fontWeight: 700,
                                fontSize: '0.75rem',
                              }}
                            >
                              {v.daysOverdue} día(s) de mora
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '0.5rem 1.25rem',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
