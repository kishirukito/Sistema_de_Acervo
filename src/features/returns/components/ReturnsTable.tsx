import React from 'react';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { ReturnStatusBadge } from './ReturnStatusBadge';
import type { ReturnRecord } from '../returns.types';

interface ReturnsTableProps {
  records: ReturnRecord[];
  onProcessReturn: (record: ReturnRecord) => void;
}

export const ReturnsTable: React.FC<ReturnsTableProps> = ({
  records,
  onProcessReturn,
}) => {
  return (
    <div className="returns-table-card">
      <div className="returns-table-wrapper">
        <table className="returns-table" aria-label="Tabla de préstamos pendientes de devolución">
          <colgroup>
            <col style={{ width: '5.5%' }} />
            <col style={{ width: '13.5%' }} />
            <col style={{ width: '16.5%' }} />
            <col style={{ width: '13%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '17%' }} />
            <col style={{ width: '10.5%' }} />
            <col style={{ width: '14%' }} />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">FOLIO</th>
              <th scope="col">USUARIO</th>
              <th scope="col">LIBRO</th>
              <th scope="col">FECHA DE PRÉSTAMO</th>
              <th scope="col">FECHA LÍMITE</th>
              <th scope="col">DÍAS RESTANTES / RETRASO</th>
              <th scope="col">ESTADO</th>
              <th scope="col" className="returns-th-center">ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => {
              const isOverdue = record.isOverdue || record.status === 'OVERDUE';

              return (
                <tr key={record.id} className="returns-table-row">
                  {/* FOLIO */}
                  <td className="returns-td-folio">
                    <span className="returns-folio-badge">{record.folio}</span>
                  </td>

                  {/* USUARIO */}
                  <td className="returns-td-user">
                    <div className="returns-user-cell">
                      <div
                        className="returns-avatar"
                        style={{ backgroundColor: record.userAvatarColor }}
                        aria-hidden="true"
                      >
                        {record.userInitials}
                      </div>
                      <div className="returns-user-info">
                        <span className="returns-user-name" title={record.userName}>
                          {record.userName}
                        </span>
                        <span className="returns-user-email" title={record.userEmail}>
                          {record.userEmail}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* LIBRO */}
                  <td className="returns-td-book">
                    <div className="returns-book-cell">
                      <span className="returns-book-title" title={record.resourceTitle}>
                        {record.resourceTitle}
                      </span>
                      <span className="returns-book-author" title={record.resourceAuthor}>
                        {record.resourceAuthor}
                      </span>
                    </div>
                  </td>

                  {/* FECHA DE PRÉSTAMO */}
                  <td className="returns-td-date">
                    <span className="returns-date-text">{record.checkoutDate}</span>
                  </td>

                  {/* FECHA LÍMITE */}
                  <td className="returns-td-due">
                    <span
                      className={`returns-due-date ${
                        isOverdue ? 'returns-due-date--overdue' : ''
                      }`}
                    >
                      {record.dueDate}
                    </span>
                  </td>

                  {/* DÍAS RESTANTES / RETRASO */}
                  <td className="returns-td-days">
                    <span
                      className={`returns-days-pill returns-days-pill--${record.daysDiffType}`}
                    >
                      {record.daysDiffType === 'overdue' ? (
                        <AlertTriangle size={13} className="returns-days-icon" />
                      ) : (
                        <Clock size={13} className="returns-days-icon" />
                      )}
                      <span>{record.daysDiffText}</span>
                    </span>
                  </td>

                  {/* ESTADO */}
                  <td className="returns-td-status">
                    <ReturnStatusBadge status={record.status} />
                  </td>

                  {/* ACCIÓN */}
                  <td className="returns-td-center">
                    <button
                      type="button"
                      onClick={() => onProcessReturn(record)}
                      className="returns-action-btn"
                      aria-label={`Registrar devolución para el folio ${record.folio} de ${record.userName}`}
                      title="Registrar devolución del libro"
                    >
                      <CheckCircle2 size={14} />
                      <span>Registrar devolución</span>
                    </button>
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
