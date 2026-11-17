import React, { useRef, useState } from 'react';
import {
  BookOpen,
  User,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Hash,
  Mail,
  AlertTriangle,
  X,
} from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import type { BorrowRequest } from '../../../types';
import { formatSuggestedDate } from '../requests.service';
import './RequestDetailModal.css';

export interface RequestDetailModalProps {
  request: BorrowRequest | null;
  onClose: () => void;
  onApprove: (request: BorrowRequest) => void | Promise<void>;
  onReject: (request: BorrowRequest) => void | Promise<void>;
}

function getStatusLabel(status: string): string {
  switch (status) {
    case 'PENDING':   return 'Pendiente';
    case 'APPROVED':  return 'Aprobada';
    case 'REJECTED':  return 'Rechazada';
    case 'CANCELLED': return 'Cancelada';
    case 'EXPIRED':   return 'Vencida';
    default:          return status;
  }
}

function getStatusClass(status: string): string {
  switch (status) {
    case 'PENDING':   return 'req-detail-badge--pending';
    case 'APPROVED':  return 'req-detail-badge--approved';
    case 'REJECTED':  return 'req-detail-badge--rejected';
    case 'CANCELLED':
    case 'EXPIRED':   return 'req-detail-badge--cancelled';
    default:          return '';
  }
}

export const RequestDetailModal: React.FC<RequestDetailModalProps> = ({
  request,
  onClose,
  onApprove,
  onReject,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  if (!request) return null;

  const isPending = request.status === 'PENDING';
  const isProcessed = request.status === 'APPROVED' || request.status === 'REJECTED';

  const handleApprove = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setActionError(null);
    try {
      await onApprove(request);
      // La lista se actualizará vía caché invalidada en LoansPage.
      // El modal se cierra desde LoansPage después de la operación.
    } catch (err: any) {
      setActionError(err?.message || 'Error al aprobar la solicitud. Intente de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setActionError(null);
    try {
      await onReject(request);
    } catch (err: any) {
      setActionError(err?.message || 'Error al rechazar la solicitud. Intente de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={Boolean(request)}
      onClose={onClose}
      size="large"
      title="Detalle de la solicitud"
      description="Información completa y gestión de la solicitud de préstamo."
      icon={<FileText size={18} />}
      closeButtonAriaLabel="Cerrar detalle de solicitud"
      closeOnBackdrop={!isSubmitting}
      closeOnEscape={!isSubmitting}
      initialFocusRef={closeBtnRef}
      footer={
        <div className="req-detail-footer">
          <Button
            type="button"
            variant="outline"
            ref={closeBtnRef}
            onClick={onClose}
            disabled={isSubmitting}
            leftIcon={<X size={15} />}
            aria-label="Cerrar detalle"
          >
            Cerrar
          </Button>

          {isPending && (
            <>
              <Button
                type="button"
                variant="danger"
                leftIcon={<XCircle size={15} />}
                onClick={handleReject}
                disabled={isSubmitting}
                isLoading={isSubmitting}
                aria-label="Rechazar solicitud"
              >
                Rechazar solicitud
              </Button>
              <Button
                type="button"
                variant="primary"
                leftIcon={<CheckCircle2 size={15} />}
                onClick={handleApprove}
                disabled={isSubmitting}
                isLoading={isSubmitting}
                aria-label="Aceptar solicitud"
              >
                Aceptar solicitud
              </Button>
            </>
          )}
        </div>
      }
    >
      <div className="req-detail-body">
        {/* Error banner */}
        {actionError && (
          <div className="req-detail-error-banner" role="alert">
            <AlertTriangle size={16} />
            <span>{actionError}</span>
          </div>
        )}

        {/* ── A. INFORMACIÓN DE LA SOLICITUD ─────────────────────── */}
        <section className="req-detail-section">
          <h3 className="req-detail-section-title">Información de la solicitud</h3>
          <div className="req-detail-grid">
            <div className="req-detail-field">
              <span className="req-detail-label">
                <Hash size={13} /> Folio
              </span>
              <span className="req-detail-value req-detail-folio">{request.id}</span>
            </div>

            <div className="req-detail-field">
              <span className="req-detail-label">
                <Clock size={13} /> Estado
              </span>
              <span className={`req-detail-badge ${getStatusClass(request.status)}`}>
                {getStatusLabel(request.status)}
              </span>
            </div>

            <div className="req-detail-field">
              <span className="req-detail-label">
                <Calendar size={13} /> Fecha de solicitud
              </span>
              <span className="req-detail-value">
                {request.requestDate
                  ? formatSuggestedDate(request.requestDate)
                  : 'No disponible'}
              </span>
            </div>

            <div className="req-detail-field">
              <span className="req-detail-label">
                <Calendar size={13} /> Fecha sugerida de recogida
              </span>
              <span className="req-detail-value">
                {request.suggestedDate
                  ? formatSuggestedDate(request.suggestedDate)
                  : 'Inmediata'}
              </span>
            </div>

            <div className="req-detail-field">
              <span className="req-detail-label">
                <MapPin size={13} /> Lugar de recogida
              </span>
              <span className="req-detail-value">
                {request.pickupLocation || 'Mostrador Principal'}
              </span>
            </div>

            {request.notes && (
              <div className="req-detail-field req-detail-field--full">
                <span className="req-detail-label">
                  <FileText size={13} /> Notas del solicitante
                </span>
                <span className="req-detail-value req-detail-notes">{request.notes}</span>
              </div>
            )}

            {/* Estado procesado */}
            {isProcessed && (
              <div className="req-detail-field req-detail-field--full">
                <span className="req-detail-label">Resultado</span>
                <span className="req-detail-value">
                  {request.status === 'APPROVED'
                    ? 'Solicitud aprobada. Se gestionó el préstamo correspondiente.'
                    : 'Solicitud rechazada por la biblioteca.'}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* ── B. INFORMACIÓN DEL SOLICITANTE ─────────────────────── */}
        <section className="req-detail-section">
          <h3 className="req-detail-section-title">Solicitante</h3>
          <div className="req-detail-user-card">
            <div className="req-detail-user-avatar" aria-hidden="true">
              <User size={22} />
            </div>
            <div className="req-detail-user-info">
              <span className="req-detail-user-name">{request.userName}</span>
              {request.userEmail && (
                <span className="req-detail-user-email">
                  <Mail size={13} />
                  {request.userEmail}
                </span>
              )}
              {request.userId && (
                <span className="req-detail-user-id">
                  ID: <code>{request.userId.slice(0, 16)}{request.userId.length > 16 ? '…' : ''}</code>
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ── C. INFORMACIÓN DEL LIBRO ───────────────────────────── */}
        <section className="req-detail-section">
          <h3 className="req-detail-section-title">Libro solicitado</h3>
          <div className="req-detail-book-card">
            <div className="req-detail-book-cover" aria-hidden="true">
              <BookOpen size={28} />
            </div>
            <div className="req-detail-book-info">
              <span className="req-detail-book-title">{request.bookTitle}</span>
              {request.bookId && (
                <span className="req-detail-book-id">
                  ID: <code>{request.bookId.slice(0, 20)}{request.bookId.length > 20 ? '…' : ''}</code>
                </span>
              )}
            </div>
          </div>
        </section>
      </div>
    </Modal>
  );
};
