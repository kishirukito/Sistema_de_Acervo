import React, { useMemo, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, AlertCircle, Clock } from 'lucide-react';
import { getLoanData } from '../../features/loans/loans.service';
import { CATEGORY_LABELS } from '../../constants';
import './LoanSuccessPage.css';

export const LoanSuccessPage: React.FC = () => {
  const { loanId } = useParams<{ loanId: string }>();
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Retrieve resolved loan data with memory and localStorage fallbacks
  const loanData = useMemo(() => {
    if (!loanId) return null;
    return getLoanData(loanId);
  }, [loanId]);

  // Set focus on primary heading on mount for accessibility
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, [loanData]);

  // Navigation handlers
  const handleBackToLoans = () => {
    navigate('/admin/loans');
  };

  const handleRegisterAnother = () => {
    navigate('/admin/loans/new');
  };

  // STATE 1: Loan Not Found
  if (!loanData) {
    return (
      <div className="loan-success-page">
        <div
          className="loan-success-state-card"
          role="alert"
          aria-live="assertive"
        >
          <div className="loan-success-state-icon loan-success-state-icon--error" aria-hidden="true">
            <AlertCircle size={32} />
          </div>

          <h1
            ref={headingRef}
            tabIndex={-1}
            className="loan-success-state-title"
          >
            Préstamo no encontrado
          </h1>

          <p className="loan-success-state-desc">
            No fue posible localizar el préstamo solicitado. Verifica el folio o regresa a la lista de préstamos.
          </p>

          <button
            type="button"
            className="loan-success-btn-secondary"
            onClick={handleBackToLoans}
            style={{ maxWidth: 240 }}
          >
            Volver a préstamos
          </button>
        </div>
      </div>
    );
  }

  // STATE 2: Loan Not Active (e.g. already returned or invalid)
  if (loanData.status !== 'ACTIVE') {
    return (
      <div className="loan-success-page">
        <div
          className="loan-success-state-card"
          role="region"
          aria-live="polite"
        >
          <div className="loan-success-state-icon loan-success-state-icon--warning" aria-hidden="true">
            <Clock size={32} />
          </div>

          <h1
            ref={headingRef}
            tabIndex={-1}
            className="loan-success-state-title"
          >
            El préstamo no se encuentra activo
          </h1>

          <p className="loan-success-state-desc">
            El préstamo con folio <strong>{loanData.folio}</strong> tiene estado actual:{' '}
            <strong>{loanData.status}</strong>.
          </p>

          <div className="loan-success-state-actions">
            <button
              type="button"
              className="loan-success-btn-secondary"
              onClick={handleBackToLoans}
            >
              Ver préstamos
            </button>
            <button
              type="button"
              className="loan-success-btn-primary"
              onClick={handleRegisterAnother}
            >
              Registrar nuevo préstamo
            </button>
          </div>
        </div>
      </div>
    );
  }

  const userCategoryLabel =
    CATEGORY_LABELS[loanData.userCategory] || loanData.userCategory;

  // STATE 3: Success Screen matching Figma with high fidelity
  return (
    <div className="loan-success-page">
      <main
        className="loan-success-card"
        role="region"
        aria-labelledby="loan-success-heading"
      >
        {/* Double-circle Success Checkmark Icon matching Figma identity */}
        <div className="loan-success-icon-outer" aria-hidden="true">
          <div className="loan-success-icon-inner">
            <Check size={24} strokeWidth={2.8} className="loan-success-icon-svg" />
          </div>
        </div>

        {/* Primary Success Heading */}
        <h1
          id="loan-success-heading"
          ref={headingRef}
          tabIndex={-1}
          className="loan-success-title"
        >
          Préstamo registrado correctamente
        </h1>

        {/* Supporting description with highlighted user and folio */}
        <p className="loan-success-desc">
          El recurso fue asignado a <strong>{loanData.userName}</strong> y el préstamo quedó
          registrado con folio <strong>{loanData.folio}</strong>.
        </p>

        {/* Mint green Summary Card */}
        <div
          className="loan-success-summary-box"
          role="region"
          aria-label="Detalles del préstamo registrado"
        >
          <dl className="loan-success-summary-list">
            <div className="loan-success-summary-row">
              <dt className="loan-success-summary-label">Folio del préstamo</dt>
              <dd className="loan-success-summary-value">
                <span>{loanData.folio}</span>
                <span className="loan-success-badge-active">Activo</span>
              </dd>
            </div>

            <div className="loan-success-summary-row">
              <dt className="loan-success-summary-label">Usuario</dt>
              <dd className="loan-success-summary-value">
                {loanData.userName} ({userCategoryLabel})
              </dd>
            </div>

            <div className="loan-success-summary-row">
              <dt className="loan-success-summary-label">Recurso prestado</dt>
              <dd className="loan-success-summary-value">{loanData.resourceTitle}</dd>
            </div>

            <div className="loan-success-summary-row">
              <dt className="loan-success-summary-label">Fecha de entrega</dt>
              <dd className="loan-success-summary-value">{loanData.checkoutDate}</dd>
            </div>

            <div className="loan-success-summary-row">
              <dt className="loan-success-summary-label">Fecha límite</dt>
              <dd className="loan-success-summary-value">
                {loanData.dueDate}{' '}
                {loanData.dueDateNote ? `(${loanData.dueDateNote})` : ''}
              </dd>
            </div>

            {loanData.notes && (
              <div className="loan-success-summary-row">
                <dt className="loan-success-summary-label">Observaciones</dt>
                <dd className="loan-success-summary-value" style={{ fontWeight: 500 }}>
                  {loanData.notes}
                </dd>
              </div>
            )}
          </dl>
        </div>

        {/* Action Buttons: Ver préstamos | Registrar otro préstamo */}
        <div className="loan-success-actions">
          <button
            type="button"
            className="loan-success-btn-secondary"
            onClick={handleBackToLoans}
            aria-label="Volver a la lista de préstamos"
          >
            Ver préstamos
          </button>

          <button
            type="button"
            className="loan-success-btn-primary"
            onClick={handleRegisterAnother}
            aria-label="Registrar otro préstamo"
          >
            Registrar otro préstamo
          </button>
        </div>
      </main>
    </div>
  );
};
