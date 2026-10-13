import React from 'react';
import type { LoanStatus } from '../loans.types';

interface LoanStatusBadgeProps {
  status: LoanStatus;
}

export const LoanStatusBadge: React.FC<LoanStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'ACTIVE':
      return (
        <span className="loan-status-badge loan-status-badge--active">
          <span className="loan-status-dot" aria-hidden="true" />
          <span>Activo</span>
        </span>
      );
    case 'DUE_SOON':
      return (
        <span className="loan-status-badge loan-status-badge--due-soon">
          <span className="loan-status-dot" aria-hidden="true" />
          <span>Próximo a vencer</span>
        </span>
      );
    case 'OVERDUE':
      return (
        <span className="loan-status-badge loan-status-badge--overdue">
          <span className="loan-status-dot" aria-hidden="true" />
          <span>Vencido</span>
        </span>
      );
    case 'RETURNED':
      return (
        <span className="loan-status-badge loan-status-badge--returned">
          <span className="loan-status-dot" aria-hidden="true" />
          <span>Devuelto</span>
        </span>
      );
    default:
      return <span className="loan-status-badge">{status}</span>;
  }
};
