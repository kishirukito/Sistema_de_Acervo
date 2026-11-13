import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  RotateCcw,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  User,
  Info,
  Clock,
  Tag,
  MapPin,
  Barcode,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ReturnStatusBadge } from '../../features/returns/components/ReturnStatusBadge';
import { MOCK_RETURN_RECORDS } from '../../features/returns/returns.mock';
import { MOCK_LOANS } from '../../features/loans/loans.mock';
import { MOCK_RESOURCES } from '../../features/catalog/catalog.mock';
import { MOCK_MANAGED_USERS } from '../../features/users/users.mock';
import { CATEGORY_LABELS } from '../../constants';
import { ADMIN_RETURNS_KEY } from '../../features/returns/returns.query';
import { ADMIN_LOANS_KEY } from '../../features/loans/admin-loans.query';
import {
  getTodayIsoString,
  formatDisplayDate,
  parseDisplayOrIsoDate,
  executeLoanReturn,
} from '../../features/returns/returns.service';
import { fetchReturnRecordById } from '../../services/api/returns-admin.service';
import { fetchAdminLoanById, updateAdminLoan } from '../../services/api/loans-admin.service';
import type { ReturnRecord } from '../../features/returns/returns.types';
import './AdminReturnConfirmationPage.css';

export const AdminReturnConfirmationPlaceholderPage: React.FC = () => {
  const { loanId } = useParams<{ loanId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  // Registro pasado por navegación si vino de la tabla
  const passedRecord: ReturnRecord | undefined = (location.state as any)?.record;

  const [apiRecord, setApiRecord] = useState<ReturnRecord | null>(passedRecord || null);
  const [isLoading, setIsLoading] = useState<boolean>(!passedRecord);

  useEffect(() => {
    if (!loanId) return;

    if (apiRecord && (apiRecord.loanId === loanId || apiRecord.id === loanId || apiRecord.folio.toLowerCase() === loanId.toLowerCase())) {
      setIsLoading(false);
      return;
    }

    let active = true;
    setIsLoading(true);

    fetchReturnRecordById(loanId)
      .then((record) => {
        if (!active) return;
        if (record) {
          setApiRecord(record);
        } else {
          return fetchAdminLoanById(loanId).then((loan) => {
            if (active && loan) {
              setApiRecord({
                id: loan.id,
                loanId: loan.id,
                folio: loan.folio,
                userId: loan.userId,
                userName: loan.userName,
                userEmail: '',
                userCategory: loan.userCategory,
                userInitials: loan.userInitials,
                userAvatarColor: loan.userAvatarColor,
                resourceId: loan.resourceId,
                resourceTitle: loan.resourceTitle,
                resourceAuthor: loan.resourceAuthor,
                checkoutDate: loan.checkoutDate,
                dueDate: loan.dueDate,
                isOverdue: loan.status === 'OVERDUE',
                daysDiffText: loan.dueDateNote || '',
                daysDiffType: loan.status === 'OVERDUE' ? 'overdue' : 'remaining',
                status: loan.status,
                returnDate: loan.returnDate,
                notes: loan.notes,
              });
            }
          });
        }
      })
      .catch((err) => {
        console.warn('[AdminReturnConfirmation] Error fetching loan data:', err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [loanId]);

  // Find corresponding return record and loan
  const returnRecord = useMemo(() => {
    if (apiRecord) return apiRecord;
    if (!loanId) return undefined;
    return MOCK_RETURN_RECORDS.find(
      (r) => r.loanId === loanId || r.id === loanId || r.folio === loanId
    );
  }, [apiRecord, loanId]);

  const loanData = useMemo(() => {
    if (!loanId) return undefined;
    return MOCK_LOANS.find(
      (l) =>
        l.id === loanId ||
        l.folio === loanId ||
        (returnRecord && l.id === returnRecord.loanId)
    );
  }, [loanId, returnRecord]);

  // Unified identifiers
  const folio = returnRecord?.folio || loanData?.folio || loanId || '';
  const currentStatus = loanData?.status || returnRecord?.status;
  const isAlreadyReturned = currentStatus === 'RETURNED';

  // Cross-reference user data
  const userId = returnRecord?.userId || loanData?.userId;
  const userName = returnRecord?.userName || loanData?.userName || '';
  const userEmail = returnRecord?.userEmail || '';
  const userCategory = returnRecord?.userCategory || loanData?.userCategory || 'STUDENT';
  const userInitials =
    returnRecord?.userInitials ||
    loanData?.userInitials ||
    userName.slice(0, 2).toUpperCase() ||
    'U';
  const userAvatarColor =
    returnRecord?.userAvatarColor || loanData?.userAvatarColor || '#1E3A5F';

  const matchedUser = useMemo(() => {
    return (
      MOCK_MANAGED_USERS.find(
        (u) =>
          u.id === userId ||
          (u.fullName && u.fullName.trim().toLowerCase() === userName.trim().toLowerCase())
      ) || null
    );
  }, [userId, userName]);

  // Cross-reference resource data
  const resourceId = returnRecord?.resourceId || loanData?.resourceId;
  const resourceTitle = returnRecord?.resourceTitle || loanData?.resourceTitle || '';
  const resourceAuthor = returnRecord?.resourceAuthor || loanData?.resourceAuthor || '';
  const isbn = returnRecord?.isbn;

  const matchedResource = useMemo(() => {
    return (
      MOCK_RESOURCES.find(
        (r) =>
          r.id === resourceId ||
          r.id === resourceId?.replace('-00', '-') ||
          r.id === resourceId?.replace('-0', '-') ||
          (r.title && r.title.trim().toLowerCase() === resourceTitle.trim().toLowerCase())
      ) || null
    );
  }, [resourceId, resourceTitle]);

  const checkoutDate = returnRecord?.checkoutDate || loanData?.checkoutDate || '';
  const dueDate = returnRecord?.dueDate || loanData?.dueDate || '';
  const isOverdue =
    currentStatus === 'OVERDUE' ||
    Boolean(returnRecord?.isOverdue) ||
    Boolean(loanData?.dueDateNote?.includes('vencido'));
  const daysDiffText = returnRecord?.daysDiffText || loanData?.dueDateNote || '';

  // Form states
  const initialDate = getTodayIsoString();
  const [returnDate, setReturnDate] = useState<string>(initialDate);
  const [notes, setNotes] = useState<string>('');
  const [dateError, setDateError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState<boolean>(false);

  const dateInputRef = useRef<HTMLInputElement>(null);

  // Validation function
  const validateDate = (newDateStr: string): boolean => {
    if (!newDateStr) {
      setDateError('La fecha de devolución es obligatoria.');
      return false;
    }

    if (checkoutDate) {
      const checkoutTime = parseDisplayOrIsoDate(checkoutDate);
      const returnTime = parseDisplayOrIsoDate(newDateStr);

      if (checkoutTime !== null && returnTime !== null && returnTime < checkoutTime) {
        setDateError(
          `La fecha de devolución no puede ser anterior a la fecha de préstamo (${checkoutDate}).`
        );
        return false;
      }
    }

    setDateError(null);
    return true;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setReturnDate(val);
    validateDate(val);
  };

  // Check for unsaved changes before exiting
  const hasUnsavedChanges = (): boolean => {
    return returnDate !== initialDate || notes.trim().length > 0;
  };

  const handleCancel = () => {
    if (hasUnsavedChanges()) {
      setIsDiscardModalOpen(true);
    } else {
      navigate('/admin/returns');
    }
  };

  const handleConfirmDiscard = () => {
    setIsDiscardModalOpen(false);
    navigate('/admin/returns');
  };

  const handleConfirmReturn = async () => {
    if (isSubmitting || isAlreadyReturned) return;

    const isValid = validateDate(returnDate);
    if (!isValid) {
      if (dateInputRef.current) {
        dateInputRef.current.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const targetId = returnRecord?.loanId || loanData?.id || loanId || '';
    // Formato ISO 8601 UTC timestamptz para Supabase / backend API
    const isoReturnDate = `${returnDate}T00:00:00Z`;

    try {
      await updateAdminLoan(targetId, {
        returnDate: isoReturnDate,
        status: 'devuelto',
        notes: notes.trim() || undefined,
      });

      executeLoanReturn(targetId, {
        returnDate: isoReturnDate,
        notes: notes.trim() || undefined,
      });

      // Invalidar caché de devoluciones y préstamos para que el listado
      // refleje el cambio sin necesidad de recargar la página.
      queryClient.invalidateQueries({ queryKey: [ADMIN_RETURNS_KEY] });
      queryClient.invalidateQueries({ queryKey: [ADMIN_LOANS_KEY] });

      // Navigate to dedicated success screen
      navigate(`/admin/returns/${targetId}/success`, {
        state: {
          loanId: targetId,
          returnDate: formatDisplayDate(returnDate),
          notes: notes.trim() || undefined,
        },
        replace: true,
      });
    } catch (err: any) {
      console.error('[AdminReturnConfirmation] Error returning loan:', err);
      setSubmitError(err?.message || 'Error al procesar la devolución en el servidor.');
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="return-confirm-page">
        <nav aria-label="Miga de pan" className="return-confirm-breadcrumb">
          <Link to="/admin/returns" className="return-confirm-breadcrumb-link">
            Devoluciones
          </Link>
          <span className="return-confirm-breadcrumb-sep">/</span>
          <span className="return-confirm-breadcrumb-current">Registrar devolución</span>
        </nav>

        <Card>
          <CardBody>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem 1rem' }}>
              <LoadingSpinner text="Cargando información del préstamo..." />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  // STATE 1: Loan Not Found
  if (!returnRecord && !loanData) {
    return (
      <div className="return-confirm-page">
        <nav aria-label="Miga de pan" className="return-confirm-breadcrumb">
          <Link to="/admin/returns" className="return-confirm-breadcrumb-link">
            Devoluciones
          </Link>
          <span className="return-confirm-breadcrumb-sep">/</span>
          <span className="return-confirm-breadcrumb-current">Registrar devolución</span>
        </nav>

        <Card>
          <CardBody>
            <EmptyState
              icon={<RotateCcw size={32} />}
              title="Préstamo no encontrado"
              description="No fue posible localizar el préstamo solicitado. Verifica el folio o regresa a la lista."
              action={
                <Button
                  variant="primary"
                  leftIcon={<ArrowLeft size={16} />}
                  onClick={() => navigate('/admin/returns')}
                >
                  Volver a devoluciones
                </Button>
              }
            />
          </CardBody>
        </Card>
      </div>
    );
  }

  // STATE 2: Loan Already Returned
  if (isAlreadyReturned) {
    const closedReturnDate =
      loanData?.returnDate || returnRecord?.returnDate || 'Fecha no registrada';

    return (
      <div className="return-confirm-page">
        <nav aria-label="Miga de pan" className="return-confirm-breadcrumb">
          <Link to="/admin/returns" className="return-confirm-breadcrumb-link">
            Devoluciones
          </Link>
          <span className="return-confirm-breadcrumb-sep">/</span>
          <span className="return-confirm-breadcrumb-current">Registrar devolución</span>
        </nav>

        <Card>
          <CardBody>
            <div className="return-confirm-already-card">
              <div className="return-confirm-already-icon" aria-hidden="true">
                <CheckCircle2 size={36} />
              </div>

              <h2 className="return-confirm-already-title">Devolución ya registrada</h2>
              <p className="return-confirm-already-desc">
                Este préstamo ya fue finalizado y el recurso fue devuelto al acervo bibliográfico.
                No es posible registrar una segunda devolución sobre este folio.
              </p>

              <div className="return-confirm-already-summary">
                <div>
                  <strong>Folio:</strong> {folio}
                </div>
                <div>
                  <strong>Recurso:</strong> {resourceTitle}
                </div>
                <div>
                  <strong>Usuario:</strong> {userName}
                </div>
                <div>
                  <strong>Estado:</strong>{' '}
                  <span style={{ color: '#16A34A', fontWeight: 600 }}>Devuelto</span>
                </div>
                <div>
                  <strong>Fecha de devolución:</strong> {closedReturnDate}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '0.75rem' }}>
                <Button
                  variant="outline"
                  leftIcon={<ArrowLeft size={16} />}
                  onClick={() => navigate('/admin/returns')}
                >
                  Volver a devoluciones
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/admin/returns/${folio || loanId}/success`)}
                >
                  Ver comprobante
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  // STATE 3: Eligible Loan Confirmation Screen
  const borrowerCategoryLabel =
    CATEGORY_LABELS[userCategory] || userCategory;
  const borrowerCode =
    returnRecord?.borrowerCode ||
    matchedUser?.borrowerCode ||
    (userId ? `ID-${userId.slice(0, 8).toUpperCase()}` : '—');
  const inventoryCode =
    returnRecord?.inventoryCode ||
    matchedResource?.code ||
    returnRecord?.resourceId ||
    '—';
  const coverColor = matchedResource?.coverColor || '#1E3A5F';
  const coverInitials =
    matchedResource?.coverInitials ||
    (resourceTitle ? resourceTitle.slice(0, 2).toUpperCase() : 'AC');

  return (
    <div className="return-confirm-page">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Miga de pan" className="return-confirm-breadcrumb">
        <button
          type="button"
          onClick={handleCancel}
          className="return-confirm-breadcrumb-link"
        >
          Devoluciones
        </button>
        <span className="return-confirm-breadcrumb-sep">/</span>
        <span className="return-confirm-breadcrumb-current">Registrar devolución</span>
      </nav>

      {/* Page Header */}
      <div className="return-confirm-header">
        <div className="return-confirm-header-titles">
          <h1 className="return-confirm-title">Registrar devolución</h1>
          <p className="return-confirm-subtitle">
            Revisa la información del préstamo y confirma la recepción del recurso.
          </p>
        </div>

        <Button
          variant="outline"
          leftIcon={<ArrowLeft size={16} />}
          onClick={handleCancel}
          aria-label="Volver a la lista de devoluciones"
        >
          Volver a devoluciones
        </Button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="return-confirm-grid">
        {/* Left Column: Loan Summary, Resource & User Details */}
        <div className="return-confirm-col-main">
          {/* Card 1: Loan & Resource Summary */}
          <Card>
            <CardHeader
              title={`Préstamo — ${folio}`}
              subtitle="Material bibliográfico en proceso de devolución"
              action={
                currentStatus && (
                  <ReturnStatusBadge status={currentStatus} />
                )
              }
            />
            <CardBody>
              <div className="return-confirm-resource-card-content">
                {/* Dates & Temporal Meta Grid */}
                <div className="return-confirm-meta-grid">
                  <div className="return-confirm-meta-item">
                    <span className="return-confirm-meta-label">Fecha de préstamo</span>
                    <span className="return-confirm-meta-value">
                      <Calendar size={15} color="#6B7280" />
                      {checkoutDate || '—'}
                    </span>
                  </div>

                  <div className="return-confirm-meta-item">
                    <span className="return-confirm-meta-label">Fecha límite</span>
                    <span className="return-confirm-meta-value">
                      <Clock size={15} color={isOverdue ? '#B42318' : '#6B7280'} />
                      {dueDate || '—'}
                    </span>
                  </div>

                  <div className="return-confirm-meta-item">
                    <span className="return-confirm-meta-label">Situación</span>
                    <span
                      className="return-confirm-meta-value"
                      style={{ color: isOverdue ? '#B42318' : '#1E3A5F' }}
                    >
                      {daysDiffText || (isOverdue ? 'Retrasado' : 'En plazo')}
                    </span>
                  </div>
                </div>

                {/* Overdue Warning if applicable */}
                {isOverdue && (
                  <div
                    className="return-confirm-overdue-alert"
                    role="alert"
                    aria-live="polite"
                  >
                    <AlertTriangle size={18} color="#DC2626" />
                    <span>
                      Este préstamo ha superado la fecha límite estipulada ({daysDiffText}).
                    </span>
                  </div>
                )}

                {/* Received Resource Information */}
                <div className="return-confirm-resource-header">
                  <div
                    className="return-confirm-resource-cover"
                    style={{ backgroundColor: coverColor }}
                    aria-hidden="true"
                  >
                    {coverInitials}
                  </div>

                  <div className="return-confirm-resource-info">
                    <h2 className="return-confirm-resource-title">{resourceTitle}</h2>
                    <p className="return-confirm-resource-author">{resourceAuthor}</p>

                    <div className="return-confirm-resource-badges">
                      {(matchedResource?.code || inventoryCode !== '—') && (
                        <span className="return-confirm-tag">
                          <Barcode size={13} />
                          {matchedResource?.code || inventoryCode}
                        </span>
                      )}
                      {matchedResource?.categoryLabel && (
                        <span className="return-confirm-tag">
                          <Tag size={13} />
                          {matchedResource.categoryLabel}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Resource Metadata Details */}
                <div className="return-confirm-details-list">
                  {isbn && (
                    <div className="return-confirm-detail-row">
                      <span className="return-confirm-detail-label">ISBN</span>
                      <span className="return-confirm-detail-value">{isbn}</span>
                    </div>
                  )}

                  {(matchedResource?.location || returnRecord?.location) && (
                    <div className="return-confirm-detail-row">
                      <span className="return-confirm-detail-label">Ubicación en estante</span>
                      <span className="return-confirm-detail-value">
                        <MapPin size={13} style={{ display: 'inline', marginRight: 4 }} />
                        {matchedResource?.location || returnRecord?.location}
                      </span>
                    </div>
                  )}

                  <div className="return-confirm-detail-row">
                    <span className="return-confirm-detail-label">ID del Recurso</span>
                    <span className="return-confirm-detail-value">{resourceId || '—'}</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Card 2: Borrower User Details */}
          <Card>
            <CardHeader
              title="Usuario prestatario"
              subtitle="Persona responsable registrada en el préstamo"
            />
            <CardBody>
              <div className="return-confirm-user-content">
                <div
                  className="return-confirm-user-avatar"
                  style={{ backgroundColor: userAvatarColor }}
                  aria-hidden="true"
                >
                  {userInitials}
                </div>

                <div className="return-confirm-user-info">
                  <h3 className="return-confirm-user-name">
                    {userName}
                    <span className="return-confirm-tag" style={{ fontWeight: 500 }}>
                      <User size={13} />
                      {borrowerCategoryLabel}
                    </span>
                  </h3>

                  <div className="return-confirm-user-sub">
                    {borrowerCode !== '—' && (
                      <span>
                        <strong>Matrícula:</strong> {borrowerCode}
                      </span>
                    )}
                    {userEmail && (
                      <span>
                        <strong>Correo:</strong> {userEmail}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Column: Reception & Confirmation Form */}
        <div className="return-confirm-col-side">
          <Card>
            <CardHeader
              title="Recepción de devolución"
              subtitle="Confirma la entrega del material físico"
            />
            <CardBody>
              <form
                className="return-confirm-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleConfirmReturn();
                }}
              >
                {/* Field: Return Date */}
                <div className="return-confirm-field-group">
                  <label
                    htmlFor="return-date-input"
                    className="return-confirm-label"
                  >
                    Fecha de devolución <span className="return-confirm-label-req">*</span>
                  </label>
                  <input
                    ref={dateInputRef}
                    id="return-date-input"
                    type="date"
                    value={returnDate}
                    onChange={handleDateChange}
                    className={`return-confirm-input ${
                      dateError ? 'return-confirm-input--error' : ''
                    }`}
                    aria-invalid={Boolean(dateError)}
                    aria-describedby={dateError ? 'return-date-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {dateError && (
                    <span
                      id="return-date-error"
                      className="return-confirm-error-msg"
                      role="alert"
                    >
                      <AlertTriangle size={13} />
                      {dateError}
                    </span>
                  )}
                </div>

                {/* Field: Observations Notes */}
                <div className="return-confirm-field-group">
                  <label
                    htmlFor="return-notes-input"
                    className="return-confirm-label"
                  >
                    Observaciones (opcional)
                  </label>
                  <textarea
                    id="return-notes-input"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Notas sobre el estado de entrega o recepción..."
                    className="return-confirm-textarea"
                    rows={3}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Operational Notice */}
                <div className="return-confirm-notice-banner">
                  <Info size={18} className="return-confirm-notice-icon" />
                  <span>
                    Al confirmar, el préstamo se marcará como devuelto y el ejemplar se
                    reintegrará al acervo.
                  </span>
                </div>

                {/* Error Banner */}
                {submitError && (
                  <div
                    className="return-confirm-error-alert"
                    role="alert"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 14px',
                      backgroundColor: '#FEE2E2',
                      color: '#991B1B',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      marginBottom: '1rem',
                    }}
                  >
                    <AlertTriangle size={16} />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="return-confirm-actions">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    leftIcon={<RotateCcw size={16} />}
                    className="return-confirm-submit-btn"
                    disabled={isSubmitting || Boolean(dateError) || !returnDate}
                    isLoading={isSubmitting}
                    aria-label="Confirmar devolución del recurso"
                  >
                    Confirmar devolución
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="return-confirm-cancel-btn"
                    aria-label="Cancelar y volver a devoluciones"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Discard Changes Modal */}
      <Modal
        open={isDiscardModalOpen}
        onClose={() => setIsDiscardModalOpen(false)}
        role="alertdialog"
        size="small"
        title="¿Descartar cambios?"
        description="Se perderá la información capturada."
        icon={<AlertTriangle size={18} />}
        closeButtonAriaLabel="Cerrar confirmación"
        footer={
          <div className="return-confirm-discard-footer">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsDiscardModalOpen(false)}
            >
              Seguir editando
            </Button>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={handleConfirmDiscard}
            >
              Descartar cambios
            </Button>
          </div>
        }
      >
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#4B5563' }}>
          Has modificado los datos de la devolución. Si sales ahora, los cambios no se guardarán.
        </p>
      </Modal>
    </div>
  );
};

export const AdminReturnConfirmationPage = AdminReturnConfirmationPlaceholderPage;
