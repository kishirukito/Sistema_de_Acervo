import React from 'react';
import { AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';
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

        <div className="reports-overdue-badge-pill" style={{ backgroundColor: totalOverdueCount > 0 ? '#FEE2E2' : '#DCFCE7', color: totalOverdueCount > 0 ? '#DC2626' : '#16A34A' }}>
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
            {overdueLoans.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#10B981' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={28} />
                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Sin préstamos vencidos</span>
                    <span style={{ color: '#6B7280', fontSize: '0.85rem' }}>Todos los préstamos activos se encuentran dentro de su fecha reglamentaria.</span>
                  </div>
                </td>
              </tr>
            ) : (
              overdueLoans.map((loan) => (
                <tr key={loan.id}>
                  {/* Folio */}
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

                  {/* Due Date */}
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
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="reports-overdue-footer">
        <button
          type="button"
          className="reports-overdue-link-btn"
          onClick={() => navigate('/admin/loans?status=OVERDUE')}
        >
          <span>Ir a módulo de Préstamos</span>
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
