import React, { useMemo, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, AlertCircle, Clock } from 'lucide-react';
import { getLoanReturnData } from '../../features/returns/returns.service';
import { ReturnSuccessSummary } from '../../features/returns/components/ReturnSuccessSummary';
import { ReturnSuccessActions } from '../../features/returns/components/ReturnSuccessActions';
import '../../features/returns/components/ReturnSuccess.css';

export const ReturnSuccessPage: React.FC = () => {
  const { loanId } = useParams<{ loanId: string }>();
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Retrieve resolved loan return data with localStorage & state fallbacks
  const loanData = useMemo(() => {
    if (!loanId) return null;
    return getLoanReturnData(loanId);
  }, [loanId]);

  // Set focus on primary heading on mount for screen-reader accessibility
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, [loanData]);

  // Navigation handlers
  const handleBackToReturns = () => {
    navigate('/admin/returns');
  };

  const handleNewReturn = () => {
    // Navigates to returns with state to automatically trigger loan search modal
    navigate('/admin/returns', { state: { openSearchModal: true } });
  };

  // STATE 1: Loan Not Found
  if (!loanData) {
    return (
      <div className="return-success-page">
        <div
          className="return-success-state-card"
          role="alert"
          aria-live="assertive"
        >
          <div className="return-success-state-icon return-success-state-icon--error" aria-hidden="true">
            <AlertCircle size={32} />
          </div>

          <h1
            ref={headingRef}
            tabIndex={-1}
            className="return-success-state-title"
          >
            Devolución no encontrada
          </h1>

          <p className="return-success-state-desc">
            No fue posible localizar la devolución solicitada. Verifica el folio o regresa al listado de devoluciones.
          </p>

          <button
            type="button"
            className="return-success-btn-secondary"
            onClick={handleBackToReturns}
            style={{ maxWidth: 240 }}
          >
            Volver a devoluciones
          </button>
        </div>
      </div>
    );
  }

  // STATE 2: Loan Not Yet Returned
  if (loanData.status !== 'RETURNED') {
    return (
      <div className="return-success-page">
        <div
          className="return-success-state-card"
          role="region"
          aria-live="polite"
        >
          <div className="return-success-state-icon return-success-state-icon--warning" aria-hidden="true">
            <Clock size={32} />
          </div>

          <h1
            ref={headingRef}
            tabIndex={-1}
            className="return-success-state-title"
          >
            La devolución aún no ha sido confirmada
          </h1>

          <p className="return-success-state-desc">
            El préstamo con folio <strong>{loanData.folio}</strong> todavía se encuentra registrado como activo y requiere confirmación previa.
          </p>

          <div className="return-success-state-actions">
            <button
              type="button"
              className="return-success-btn-secondary"
              onClick={handleBackToReturns}
            >
              Volver a devoluciones
            </button>

            <button
              type="button"
              className="return-success-btn-primary"
              onClick={() => navigate(`/admin/returns/${loanData.loanId}`)}
            >
              Volver al registro de devolución
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STATE 3: Success Screen matching Figma with high fidelity
  return (
    <div className="return-success-page">
      <main
        className="return-success-card"
        role="region"
        aria-labelledby="return-success-heading"
      >
        {/* Double-circle Success Checkmark Icon matching Figma */}
        <div className="return-success-icon-outer" aria-hidden="true">
          <div className="return-success-icon-inner">
            <Check size={24} strokeWidth={2.8} className="return-success-icon-svg" />
          </div>
        </div>

        {/* Primary Success Heading */}
        <h1
          id="return-success-heading"
          ref={headingRef}
          tabIndex={-1}
          className="return-success-title"
        >
          ¡Devolución registrada!
        </h1>

        {/* Supporting description with highlighted folio and title */}
        <p className="return-success-desc">
          El préstamo <strong>{loanData.folio}</strong> fue cerrado correctamente. El libro{' '}
          <strong>{loanData.resourceTitle}</strong> está ahora disponible en el catálogo.
        </p>

        {/* Mint green Summary Card */}
        <ReturnSuccessSummary
          userName={loanData.userName}
          resourceTitle={loanData.resourceTitle}
          returnDate={loanData.returnDate}
          overdueDaysText={loanData.overdueDaysText}
        />

        {/* Action Buttons: Volver a devoluciones | Nueva devolución */}
        <ReturnSuccessActions
          onBackToReturns={handleBackToReturns}
          onNewReturn={handleNewReturn}
        />
      </main>
    </div>
  );
};
