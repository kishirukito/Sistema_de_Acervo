import React, { useState, useMemo } from 'react';
import {
  Inbox,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  BookOpen,
  Calendar,
  MapPin,
  Eye,
  RefreshCw,
  X,
} from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { RequestDetailModal } from '../../features/loans/components/RequestDetailModal';
import {
  fetchAdminSolicitudes,
  ADMIN_SOLICITUDES_KEY,
} from '../../features/loans/solicitudes.query';
import {
  approveBorrowRequest,
  rejectBorrowRequest,
  formatSuggestedDate,
} from '../../features/loans/requests.service';
import { invalidateAdminLoans } from '../../features/loans/admin-loans.query';
import type { BorrowRequest, RequestStatus } from '../../types';
import './RequestsPage.css';

/** Polling continuo para sincronización en tiempo real de nuevas solicitudes */
const ADMIN_REQUESTS_POLL_MS = 15_000;

export const RequestsPage: React.FC = () => {
  const queryClient = useQueryClient();

  // ── React Query: solicitudes de alumnos con polling automático ───────────
  const {
    data: requests = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<BorrowRequest[]>({
    queryKey: [ADMIN_SOLICITUDES_KEY],
    queryFn: fetchAdminSolicitudes,
    refetchInterval: ADMIN_REQUESTS_POLL_MS,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staleTime: 10_000,
  });

  // Filtros de estado y búsqueda
  const [statusFilter, setStatusFilter] = useState<'ALL' | RequestStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<BorrowRequest | null>(null);

  // Modal para confirmación de rechazo con motivo opcional
  const [rejectingRequest, setRejectingRequest] = useState<BorrowRequest | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejectingLoading, setIsRejectingLoading] = useState(false);

  // Notificaciones Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastType(type);
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((cur) => (cur === message ? null : cur));
    }, 4500);
  };

  // Contadores para las tarjetas KPI superiores
  const counts = useMemo(() => {
    let pending = 0;
    let approved = 0;
    let rejected = 0;

    for (const r of requests) {
      if (r.status === 'PENDING') pending++;
      else if (r.status === 'APPROVED') approved++;
      else if (r.status === 'REJECTED') rejected++;
    }

    return {
      all: requests.length,
      pending,
      approved,
      rejected,
    };
  }, [requests]);

  // Filtrado de solicitudes
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      // 1. Filtro de Estado
      if (statusFilter !== 'ALL' && req.status !== statusFilter) {
        return false;
      }

      // 2. Búsqueda por texto (folio, alumno, matrícula, correo, libro, autor)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchFolio = req.id.toLowerCase().includes(q);
        const matchUser = req.userName.toLowerCase().includes(q);
        const matchEmail = (req.userEmail || '').toLowerCase().includes(q);
        const matchMatricula = (req.userMatricula || '').toLowerCase().includes(q);
        const matchBook = req.bookTitle.toLowerCase().includes(q);
        const matchAuthor = (req.bookAuthor || '').toLowerCase().includes(q);
        const matchLocation = (req.pickupLocation || '').toLowerCase().includes(q);

        if (
          !matchFolio &&
          !matchUser &&
          !matchEmail &&
          !matchMatricula &&
          !matchBook &&
          !matchAuthor &&
          !matchLocation
        ) {
          return false;
        }
      }

      return true;
    });
  }, [requests, statusFilter, searchQuery]);

  // Acción: Aprobar Solicitud
  const handleApprove = async (req: BorrowRequest) => {
    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // 1. PATCH solicitud en Supabase → APPROVED
    if (req.supabaseId) {
      try {
        await fetch(`/api/v1/data/solicitudes/${req.supabaseId}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            estado: 'APPROVED',
            notas: 'Aprobada por el administrador en mostrador.',
          }),
        });
      } catch (err) {
        console.warn('[RequestsPage] Error updating request state:', err);
      }
    }

    // 2. Intentar registrar automáticamente el préstamo oficial en mostrador si el libro y usuario existen
    try {
      const catRes = await fetch('/api/v1/data/libros', { headers });
      if (catRes.ok) {
        const books = await catRes.json();
        const targetBook = books.find(
          (b: any) =>
            b.id === req.bookId ||
            b.titulo?.toLowerCase() === req.bookTitle?.toLowerCase()
        );
        const availCopy = targetBook?.ejemplares?.find((ej: any) => ej.estado === 'disponible');

        if (availCopy && req.userId) {
          await fetch('/api/v1/data/prestamos', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              usuario_id: req.userId,
              ejemplar_id: availCopy.id,
              notas: `Aprobado desde solicitud web ${req.id}. Recogida: ${req.pickupLocation || 'Mostrador Principal'}`,
            }),
          });
          invalidateAdminLoans(queryClient);
        }
      }
    } catch (err) {
      console.warn('[RequestsPage] Registro automático de préstamo formal omitido:', err);
    }

    // 3. Actualizar copia local en localStorage
    approveBorrowRequest(req.id);

    // 4. Invalidar React Query
    queryClient.invalidateQueries({ queryKey: [ADMIN_SOLICITUDES_KEY] });
    setSelectedRequest(null);
    showToast(`Solicitud ${req.id} aprobada con éxito. El libro está listo para entrega al alumno.`, 'success');
  };

  // Abrir diálogo de rechazo
  const handleOpenRejectDialog = (req: BorrowRequest) => {
    setRejectingRequest(req);
    setRejectReason('No hay ejemplares disponibles en este momento.');
  };

  // Confirmar Rechazo de Solicitud
  const handleConfirmReject = async () => {
    if (!rejectingRequest) return;
    setIsRejectingLoading(true);

    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    if (rejectingRequest.supabaseId) {
      try {
        await fetch(`/api/v1/data/solicitudes/${rejectingRequest.supabaseId}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            estado: 'REJECTED',
            notas: rejectReason || 'Rechazada por la biblioteca.',
          }),
        });
      } catch (err) {
        console.warn('[RequestsPage] Error rejecting request in backend:', err);
      }
    }

    rejectBorrowRequest(rejectingRequest.id, rejectReason || 'Rechazada por la biblioteca.');
    queryClient.invalidateQueries({ queryKey: [ADMIN_SOLICITUDES_KEY] });

    setIsRejectingLoading(false);
    setRejectingRequest(null);
    setSelectedRequest(null);
    showToast(`Solicitud ${rejectingRequest.id} rechazada correctamente.`, 'success');
  };

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="req-badge req-badge-pending">
            <Clock size={13} />
            <span>Pendiente</span>
          </span>
        );
      case 'APPROVED':
        return (
          <span className="req-badge req-badge-approved">
            <CheckCircle2 size={13} />
            <span>Aprobada</span>
          </span>
        );
      case 'REJECTED':
        return (
          <span className="req-badge req-badge-rejected">
            <XCircle size={13} />
            <span>Rechazada</span>
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="req-badge req-badge-cancelled">
            <AlertCircle size={13} />
            <span>Cancelada</span>
          </span>
        );
      default:
        return <span className="req-badge">{status}</span>;
    }
  };

  return (
    <div className="requests-page-container">
      {/* ── 1. Encabezado de la Página ─────────────────────────────────── */}
      <div className="requests-header">
        <div className="requests-header-titles">
          <h1 className="requests-title">Solicitudes de alumnos</h1>
          <p className="requests-subtitle">
            Bandeja de solicitudes de préstamo enviadas por estudiantes y lectores para entrega en biblioteca.
          </p>
        </div>

        <div className="requests-header-actions">
          <button
            type="button"
            className="requests-refresh-btn"
            onClick={() => refetch()}
            disabled={isFetching}
            title="Actualizar solicitudes ahora"
            aria-label="Actualizar solicitudes"
          >
            <RefreshCw size={16} className={isFetching ? 'requests-spin' : ''} />
            <span>{isFetching ? 'Actualizando...' : 'Actualizar'}</span>
          </button>
        </div>
      </div>

      {/* ── 2. Tablero de Tarjetas de Estado Interactivas ──────────────── */}
      <div
        className="requests-kpi-grid"
        role="tablist"
        aria-label="Filtrar solicitudes por estado"
      >
        {/* Todas */}
        <button
          type="button"
          role="tab"
          aria-selected={statusFilter === 'ALL'}
          className={`requests-kpi-card${statusFilter === 'ALL' ? ' requests-kpi-card--active' : ''}`}
          onClick={() => setStatusFilter('ALL')}
        >
          <div className="requests-kpi-icon requests-kpi-icon--all">
            <Inbox size={22} />
          </div>
          <div className="requests-kpi-content">
            <span className="requests-kpi-value">{counts.all}</span>
            <span className="requests-kpi-label">Todas las solicitudes</span>
          </div>
          {statusFilter === 'ALL' && <span className="requests-kpi-pill">Filtrado</span>}
        </button>

        {/* Pendientes */}
        <button
          type="button"
          role="tab"
          aria-selected={statusFilter === 'PENDING'}
          className={`requests-kpi-card${statusFilter === 'PENDING' ? ' requests-kpi-card--active requests-kpi-card--pending-active' : ''}`}
          onClick={() => setStatusFilter('PENDING')}
        >
          <div className="requests-kpi-icon requests-kpi-icon--pending">
            <Clock size={22} />
          </div>
          <div className="requests-kpi-content">
            <span className="requests-kpi-value requests-kpi-value--pending">{counts.pending}</span>
            <span className="requests-kpi-label">Por revisar / Pendientes</span>
          </div>
          {counts.pending > 0 && statusFilter !== 'PENDING' && (
            <span className="requests-kpi-attention-pill">{counts.pending} nuevas</span>
          )}
          {statusFilter === 'PENDING' && <span className="requests-kpi-pill">Filtrado</span>}
        </button>

        {/* Aprobadas */}
        <button
          type="button"
          role="tab"
          aria-selected={statusFilter === 'APPROVED'}
          className={`requests-kpi-card${statusFilter === 'APPROVED' ? ' requests-kpi-card--active' : ''}`}
          onClick={() => setStatusFilter('APPROVED')}
        >
          <div className="requests-kpi-icon requests-kpi-icon--approved">
            <CheckCircle2 size={22} />
          </div>
          <div className="requests-kpi-content">
            <span className="requests-kpi-value">{counts.approved}</span>
            <span className="requests-kpi-label">Aprobadas para entrega</span>
          </div>
          {statusFilter === 'APPROVED' && <span className="requests-kpi-pill">Filtrado</span>}
        </button>

        {/* Rechazadas */}
        <button
          type="button"
          role="tab"
          aria-selected={statusFilter === 'REJECTED'}
          className={`requests-kpi-card${statusFilter === 'REJECTED' ? ' requests-kpi-card--active' : ''}`}
          onClick={() => setStatusFilter('REJECTED')}
        >
          <div className="requests-kpi-icon requests-kpi-icon--rejected">
            <XCircle size={22} />
          </div>
          <div className="requests-kpi-content">
            <span className="requests-kpi-value">{counts.rejected}</span>
            <span className="requests-kpi-label">Rechazadas</span>
          </div>
          {statusFilter === 'REJECTED' && <span className="requests-kpi-pill">Filtrado</span>}
        </button>
      </div>

      {/* ── 3. Barra de Búsqueda y Filtros ─────────────────────────────── */}
      <div className="requests-toolbar-card">
        <div className="requests-toolbar-row">
          <div className="requests-search-box">
            <Search size={18} className="requests-search-icon" aria-hidden="true" />
            <input
              type="text"
              className="requests-search-input"
              placeholder="Buscar por folio, nombre del alumno, matrícula, correo o título..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar solicitudes de alumnos"
            />
          </div>

          {(statusFilter !== 'ALL' || searchQuery.trim()) && (
            <button
              type="button"
              className="requests-clear-btn"
              onClick={() => {
                setStatusFilter('ALL');
                setSearchQuery('');
              }}
            >
              <X size={14} />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>

        <div className="requests-summary-bar">
          <span>
            Mostrando <strong>{filteredRequests.length}</strong> de <strong>{requests.length}</strong> solicitudes
          </span>
          {statusFilter !== 'ALL' && (
            <span className="requests-filter-badge-active">
              Filtro activo: {statusFilter === 'PENDING' ? 'Pendientes' : statusFilter === 'APPROVED' ? 'Aprobadas' : 'Rechazadas'}
            </span>
          )}
        </div>
      </div>

      {/* ── 4. Tabla de Solicitudes ───────────────────────────────────── */}
      {isLoading ? (
        <div style={{ padding: '3.5rem 0' }}>
          <LoadingSpinner center size="lg" text="Cargando solicitudes de alumnos..." />
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="requests-empty-card" role="region" aria-label="Sin solicitudes">
          <div className="requests-empty-icon" aria-hidden="true">
            <Clock size={36} />
          </div>
          <h2 className="requests-empty-title">No hay solicitudes en esta sección</h2>
          <p className="requests-empty-desc">
            {requests.length === 0
              ? 'Cuando los alumnos soliciten libros desde su portal de lector, aparecerán aquí para tu revisión inmediata.'
              : 'No hay solicitudes que coincidan con la búsqueda o el filtro de estado seleccionado.'}
          </p>
          {(statusFilter !== 'ALL' || searchQuery) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setStatusFilter('ALL');
                setSearchQuery('');
              }}
            >
              Restablecer filtros
            </Button>
          )}
        </div>
      ) : (
        <div className="requests-table-card">
          <div className="requests-table-wrapper">
            <table className="requests-table" aria-label="Tabla de solicitudes de alumnos">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '13%' }}>FOLIO / FECHA</th>
                  <th scope="col" style={{ width: '22%' }}>ALUMNO / SOLICITANTE</th>
                  <th scope="col" style={{ width: '22%' }}>LIBRO SOLICITADO</th>
                  <th scope="col" style={{ width: '13%' }}>FECHA SUGERIDA</th>
                  <th scope="col" style={{ width: '10%' }}>ESTADO</th>
                  <th scope="col" style={{ width: '20%', minWidth: '240px' }} className="requests-th-center">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => {
                  const userInitials = (req.userName || 'AL')
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase();

                  return (
                    <tr key={req.id} className="requests-table-row">
                      {/* Folio y Fecha */}
                      <td>
                        <div className="requests-folio-cell">
                          <span className="requests-folio-code" title={req.id}>
                            {req.id}
                          </span>
                          <span className="requests-folio-date">
                            {req.requestDate
                              ? formatSuggestedDate(req.requestDate)
                              : 'Fecha no registrada'}
                          </span>
                        </div>
                      </td>

                      {/* Alumno / Solicitante */}
                      <td>
                        <div className="requests-user-cell">
                          <div className="requests-user-avatar" aria-hidden="true">
                            {userInitials}
                          </div>
                          <div className="requests-user-info">
                            <span className="requests-user-name">{req.userName}</span>
                            <div className="requests-user-meta">
                              {req.userMatricula && (
                                <span className="requests-matricula-badge">
                                  {req.userMatricula}
                                </span>
                              )}
                              <span className="requests-user-email">{req.userEmail}</span>
                            </div>
                            {req.userCareer && (
                              <span className="requests-career-tag">{req.userCareer}</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Libro Solicitado */}
                      <td>
                        <div className="requests-book-cell">
                          <div className="requests-book-cover" aria-hidden="true">
                            {req.bookCover ? (
                              <img
                                src={req.bookCover}
                                alt={req.bookTitle}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            ) : (
                              <BookOpen size={18} />
                            )}
                          </div>
                          <div className="requests-book-info">
                            <span className="requests-book-title">{req.bookTitle}</span>
                            {req.bookAuthor && (
                              <span className="requests-book-author">{req.bookAuthor}</span>
                            )}
                            {req.bookIsbn && (
                              <span className="requests-book-isbn">ISBN: {req.bookIsbn}</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Fecha Sugerida y Recogida */}
                      <td>
                        <div className="requests-date-cell">
                          <div className="requests-date-row">
                            <Calendar size={13} className="requests-cell-icon" />
                            <span>
                              {req.suggestedDate ? formatSuggestedDate(req.suggestedDate) : 'Inmediata'}
                            </span>
                          </div>
                          <div className="requests-location-row">
                            <MapPin size={13} className="requests-cell-icon" />
                            <span>{req.pickupLocation || 'Mostrador Principal'}</span>
                          </div>
                        </div>
                      </td>

                      {/* Estado */}
                      <td>{getStatusBadge(req.status)}</td>

                      {/* Acciones */}
                      <td className="requests-td-center">
                        <div className="requests-actions-group">
                          <button
                            type="button"
                            className="requests-btn-approve"
                            onClick={() => handleApprove(req)}
                            disabled={req.status === 'APPROVED'}
                            title={
                              req.status === 'APPROVED'
                                ? 'Esta solicitud ya se encuentra aprobada'
                                : 'Aceptar solicitud y autorizar entrega'
                            }
                            aria-label={`Aceptar solicitud ${req.id}`}
                          >
                            <CheckCircle2 size={14} />
                            <span>Aceptar</span>
                          </button>

                          <button
                            type="button"
                            className="requests-btn-reject"
                            onClick={() => handleOpenRejectDialog(req)}
                            disabled={req.status === 'REJECTED'}
                            title={
                              req.status === 'REJECTED'
                                ? 'Esta solicitud ya se encuentra rechazada'
                                : 'Rechazar solicitud'
                            }
                            aria-label={`Rechazar solicitud ${req.id}`}
                          >
                            <XCircle size={14} />
                            <span>Rechazar</span>
                          </button>

                          <button
                            type="button"
                            className="requests-btn-view"
                            onClick={() => setSelectedRequest(req)}
                            title="Ver detalle completo de la solicitud"
                            aria-label={`Ver detalles de solicitud ${req.id}`}
                          >
                            <Eye size={14} />
                            <span>Ver detalle</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── 5. Modal de Detalle Completo de Solicitud ─────────────────── */}
      <RequestDetailModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onApprove={handleApprove}
        onReject={(req) => {
          setSelectedRequest(null);
          handleOpenRejectDialog(req);
        }}
      />

      {/* ── 6. Modal de Confirmación de Rechazo con Motivo ────────────── */}
      {rejectingRequest && (
        <div className="requests-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="reject-dialog-title">
          <div className="requests-reject-card">
            <div className="requests-reject-header">
              <div className="requests-reject-icon" aria-hidden="true">
                <AlertCircle size={24} />
              </div>
              <div>
                <h3 id="reject-dialog-title" className="requests-reject-title">
                  Rechazar solicitud de préstamo
                </h3>
                <p className="requests-reject-subtitle">
                  Folio: <strong>{rejectingRequest.id}</strong> — Alumno: {rejectingRequest.userName}
                </p>
              </div>
            </div>

            <div className="requests-reject-body">
              <label htmlFor="reject-reason-input" className="requests-reject-label">
                Motivo del rechazo (será visible para el alumno):
              </label>
              <textarea
                id="reject-reason-input"
                className="requests-reject-textarea"
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Indica el motivo (ej. Sin ejemplares disponibles, libro en restauración...)"
              />
            </div>

            <div className="requests-reject-footer">
              <Button
                variant="outline"
                onClick={() => setRejectingRequest(null)}
                disabled={isRejectingLoading}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                onClick={handleConfirmReject}
                isLoading={isRejectingLoading}
                disabled={isRejectingLoading}
              >
                Confirmar rechazo
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── 7. Toast Banner ───────────────────────────────────────────── */}
      {toastMessage && (
        <div
          className={`requests-toast-banner${toastType === 'error' ? ' requests-toast-banner--error' : ''}`}
          role={toastType === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {toastType === 'error' ? (
            <AlertCircle size={18} color="#DC2626" />
          ) : (
            <CheckCircle2 size={18} color="#27AE60" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
