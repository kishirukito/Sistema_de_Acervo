import React from 'react';
import { Eye, RotateCcw, CheckCheck, AlertCircle, Clock } from 'lucide-react';
import { LoanStatusBadge } from './LoanStatusBadge';
import type { Loan } from '../loans.types';

interface LoansTableProps {
  loans: Loan[];
  onViewLoan: (loan: Loan) => void;
  onReturnLoan: (loan: Loan) => void;
  onRenewLoan: (loan: Loan) => void;
}

export const LoansTable: React.FC<LoansTableProps> = ({
  loans,
  onViewLoan,
  onReturnLoan,
  onRenewLoan,
}) => {
  return (
    <div className="loans-table-card">
      <div className="loans-table-wrapper">
        <table className="loans-table" aria-label="Tabla de préstamos del sistema">
          <colgroup>
            <col style={{ width: '9%' }} />
            <col style={{ width: '19%' }} />
            <col style={{ width: '23%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '8%' }} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">FOLIO</th>
              <th scope="col">USUARIO</th>
              <th scope="col">LIBRO</th>
              <th scope="col">FECHA DE PRÉSTAMO</th>
              <th scope="col">FECHA LÍMITE</th>
              <th scope="col">ESTADO</th>
              <th scope="col" className="loans-th-center">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => {
              const isOverdue = loan.status === 'OVERDUE';
              const isDueSoon = loan.status === 'DUE_SOON';
              const isReturned = loan.status === 'RETURNED';
              const hasReachedRenewalLimit =
                typeof loan.renewalLimit === 'number' &&
                loan.renewalCount >= loan.renewalLimit;
              const canRenew = !isReturned && !hasReachedRenewalLimit;

              return (
                <tr key={loan.id} className="loans-table-row">
                  {/* FOLIO */}
                  <td className="loans-td-folio">
                    <span className="loans-folio-badge">{loan.folio}</span>
                  </td>

                  {/* USUARIO */}
                  <td className="loans-td-user">
                    <div className="loans-user-cell">
                      <div
                        className="loans-avatar"
                        style={{ backgroundColor: loan.userAvatarColor }}
                        aria-hidden="true"
                      >
                        {loan.userInitials}
                      </div>
                      <span className="loans-user-name" title={loan.userName}>
                        {loan.userName}
                      </span>
                    </div>
                  </td>

                  {/* LIBRO */}
                  <td className="loans-td-book">
                    <div className="loans-book-cell">
                      <span className="loans-book-title" title={loan.resourceTitle}>
                        {loan.resourceTitle}
                      </span>
                      <span className="loans-book-author" title={loan.resourceAuthor}>
                        {loan.resourceAuthor}
                      </span>
                    </div>
                  </td>

                  {/* FECHA DE PRÉSTAMO */}
                  <td className="loans-td-date">
                    <span className="loans-date-text">{loan.checkoutDate}</span>
                  </td>

                  {/* FECHA LÍMITE */}
                  <td className="loans-td-due">
                    <div className="loans-due-cell">
                      <span
                        className={`loans-due-date ${
                          isOverdue ? 'loans-due-date--overdue' : ''
                        }`}
                      >
                        {loan.dueDate}
                      </span>
                      {loan.dueDateNote && (
                        <span
                          className={`loans-due-sub ${
                            isOverdue
                              ? 'loans-due-sub--overdue'
                              : isDueSoon
                              ? 'loans-due-sub--warning'
                              : 'loans-due-sub--normal'
                          }`}
                        >
                          {isOverdue && <AlertCircle size={12} className="loans-due-icon" />}
                          {isDueSoon && <Clock size={12} className="loans-due-icon" />}
                          <span>{loan.dueDateNote}</span>
                        </span>
                      )}
                    </div>
                  </td>

                  {/* ESTADO */}
                  <td className="loans-td-status">
                    <LoanStatusBadge status={loan.status} />
                  </td>

                  {/* ACCIONES */}
                  <td className="loans-td-center">
                    <div className="loans-actions-group">
                      <button
                        type="button"
                        onClick={() => onViewLoan(loan)}
                        className="loans-action-btn"
                        aria-label={`Ver detalles del préstamo ${loan.folio}: ${loan.resourceTitle}`}
                        title="Ver detalles"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => !isReturned && onReturnLoan(loan)}
                        className={`loans-action-btn loans-action-btn--return ${
                          isReturned ? 'loans-action-btn--disabled' : ''
                        }`}
                        disabled={isReturned}
                        aria-disabled={isReturned ? 'true' : undefined}
                        aria-label={
                          isReturned
                            ? `Préstamo ${loan.folio} ya devuelto (${loan.resourceTitle})`
                            : `Registrar devolución de ${loan.resourceTitle} (Folio ${loan.folio})`
                        }
                        title={
                          isReturned
                            ? 'El préstamo ya se encuentra devuelto'
                            : 'Registrar devolución'
                        }
                      >
                        <RotateCcw size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRenewLoan(loan)}
                        className={`loans-action-btn loans-action-btn--renew ${
                          !canRenew ? 'loans-action-btn--disabled' : ''
                        }`}
                        disabled={!canRenew}
                        aria-disabled={!canRenew ? 'true' : undefined}
                        aria-label={
                          isReturned
                            ? `No es posible renovar el préstamo ${loan.folio} (${loan.resourceTitle}): ya devuelto`
                            : hasReachedRenewalLimit
                            ? `No es posible renovar el préstamo ${loan.folio} (${loan.resourceTitle}): límite alcanzado (${loan.renewalCount}/${loan.renewalLimit})`
                            : `Renovar préstamo de ${loan.resourceTitle} (Folio ${loan.folio})`
                        }
                        title={
                          isReturned
                            ? 'No es posible renovar: el préstamo ya fue devuelto'
                            : hasReachedRenewalLimit
                            ? 'No es posible renovar: límite de renovaciones alcanzado'
                            : 'Renovar préstamo'
                        }
                      >
                        <CheckCheck size={16} />
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
  );
};
