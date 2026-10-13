import React from 'react';
import './ReturnSuccess.css';

export interface ReturnSuccessActionsProps {
  onBackToReturns: () => void;
  onNewReturn: () => void;
}

export const ReturnSuccessActions: React.FC<ReturnSuccessActionsProps> = ({
  onBackToReturns,
  onNewReturn,
}) => {
  return (
    <div className="return-success-actions">
      <button
        type="button"
        className="return-success-btn-secondary"
        onClick={onBackToReturns}
        aria-label="Volver a la lista de devoluciones"
      >
        Volver a devoluciones
      </button>

      <button
        type="button"
        className="return-success-btn-primary"
        onClick={onNewReturn}
        aria-label="Registrar nueva devolución"
      >
        Nueva devolución
      </button>
    </div>
  );
};
