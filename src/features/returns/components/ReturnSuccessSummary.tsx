import React from 'react';
import './ReturnSuccess.css';

export interface ReturnSuccessSummaryProps {
  userName: string;
  resourceTitle: string;
  returnDate: string;
  overdueDaysText: string;
}

export const ReturnSuccessSummary: React.FC<ReturnSuccessSummaryProps> = ({
  userName,
  resourceTitle,
  returnDate,
  overdueDaysText,
}) => {
  return (
    <div
      className="return-success-summary-box"
      role="region"
      aria-label="Detalles de la devolución registrada"
    >
      <dl className="return-success-summary-list">
        <div className="return-success-summary-row">
          <dt className="return-success-summary-label">Usuario</dt>
          <dd className="return-success-summary-value">{userName || '—'}</dd>
        </div>

        <div className="return-success-summary-row">
          <dt className="return-success-summary-label">Libro devuelto</dt>
          <dd className="return-success-summary-value">{resourceTitle || '—'}</dd>
        </div>

        <div className="return-success-summary-row">
          <dt className="return-success-summary-label">Fecha de devolución</dt>
          <dd className="return-success-summary-value">{returnDate || '—'}</dd>
        </div>

        <div className="return-success-summary-row">
          <dt className="return-success-summary-label">Días de retraso</dt>
          <dd className="return-success-summary-value">{overdueDaysText || '0 días'}</dd>
        </div>
      </dl>
    </div>
  );
};
