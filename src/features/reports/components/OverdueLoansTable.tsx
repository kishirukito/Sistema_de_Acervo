import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { OverdueLoanItem } from '../reports.types';

interface OverdueLoansTableProps {
  overdueLoans: OverdueLoanItem[];
  totalOverdueCount: number;
}

export const OverdueLoansTable: React.FC<OverdueLoansTableProps> = ({
  overdueLoans,
  totalOverdueCount,
}) => {
  const navigate = useNavigate();

  return (
    <div className="reports-overdue-card">
      <div className="reports-overdue-header">
        <div className="reports-overdue-title-group">
          <div className="reports-overdue-icon-box" aria-hidden="true">
            <AlertTriangle size={18} />
          </div>
          <div>
            <h3 className="reports-overdue-title">Préstamos vencidos</h3>
            <p className="reports-overdue-subtitle">Requieren atención inmediata</p>
          </div>
        </div>

        <div className="reports-overdue-badge-pill">
          {totalOverdueCount} vencidos
        </div>
      </div>

      <div className="reports-overdue-table-wrapper">
        <table className="reports-overdue-table" aria-label="Tabla de préstamos vencidos prioritarios">
          <thead>
            <tr>
              <th scope="col">FOLIO</th>
              <th scope="col">USUARIO</th>
              <th scope="col">LIBRO</th>
              <th scope="col">FECHA LÍMITE</th>
              <th scope="col">DÍAS RETRASO</th>
              <th scope="col">ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {overdueLoans.map((loan) => (
              <tr key={loan.id}>
                {/* Folio in light red badge */}
                <td>
                  <span className="reports-folio-pill">{loan.folio}</span>
                </td>

                {/* User avatar + name */}
                <td>
                  <div className="reports-user-cell">
                    <div
                      className="reports-user-avatar"
                      style={{ backgroundColor: loan.userAvatarColor }}
                      aria-hidden="true"
                    >
                      {loan.userInitials}
                    </div>
                    <span className="reports-user-name">{loan.userName}</span>
                  </div>
                </td>

                {/* Book Title */}
                <td>
                  <span className="reports-book-title" title={loan.bookTitle}>
                    {loan.bookTitle}
                  </span>
                </td>

                {/* Due Date in red */}
                <td>
                  <span className="reports-due-date">{loan.dueDate}</span>
                </td>

                {/* Days delayed */}
                <td>
                  <span className="reports-days-delayed">{loan.daysOverdue}d</span>
                </td>

                {/* Status Badge */}
                <td>
                  <span className="reports-status-pill">
                    <span className="reports-status-dot" aria-hidden="true" />
                    <span>Vencido</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="reports-overdue-footer">
        <button
          type="button"
          onClick={() => navigate('/admin/loans')}
          className="reports-view-all-link"
          aria-label="Ver todos los préstamos vencidos en la sección de préstamos"
        >
          <span>Ver todos los vencidos</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};
