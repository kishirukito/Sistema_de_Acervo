import React from 'react';
import type { LoanStatus } from '../returns.types';

interface ReturnStatusBadgeProps {
  status: LoanStatus;
}

export const ReturnStatusBadge: React.FC<ReturnStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'ACTIVE':
      return (
        <span className="return-status-badge return-status-badge--active">
          <span className="return-status-dot" aria-hidden="true" />
          <span>Activo</span>
        </span>
      );
    case 'DUE_SOON':
      return (
        <span className="return-status-badge return-status-badge--due-soon">
          <span className="return-status-dot" aria-hidden="true" />
          <span>Próximo a vencer</span>
        </span>
      );
    case 'OVERDUE':
      return (
        <span className="return-status-badge return-status-badge--overdue">
          <span className="return-status-dot" aria-hidden="true" />
          <span>Vencido</span>
        </span>
      );
    case 'RETURNED':
      return (
        <span className="return-status-badge return-status-badge--returned">
          <span className="return-status-dot" aria-hidden="true" />
          <span>Devuelto</span>
        </span>
      );
    default:
      return <span className="return-status-badge">{status}</span>;
  }
};
