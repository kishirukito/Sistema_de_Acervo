import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  BookOpen,
  User,
  MapPin,
  Calendar,
  AlertCircle,
  Search,
} from 'lucide-react';
import type { BorrowRequest } from '../../../types';
import { formatSuggestedDate } from '../requests.service';
import './AdminRequestsTable.css';

interface AdminRequestsTableProps {
  requests: BorrowRequest[];
  onApprove: (request: BorrowRequest) => void;
  onReject: (request: BorrowRequest) => void;
}

export const AdminRequestsTable: React.FC<AdminRequestsTableProps> = ({
  requests,
  onApprove,
  onReject,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');

  const filteredRequests = requests.filter((req) => {
    if (statusFilter !== 'ALL' && req.status !== statusFilter) {
      return false;
    }
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase().trim();
      const matchFolio = req.id.toLowerCase().includes(q);
      const matchUser = req.userName.toLowerCase().includes(q) || (req.userEmail || '').toLowerCase().includes(q);
      const matchBook = req.bookTitle.toLowerCase().includes(q);
      return matchFolio || matchUser || matchBook;
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="req-badge req-badge-pending">
            <Clock size={12} />
            <span>Pendiente</span>
          </span>
        );
      case 'APPROVED':
        return (
          <span className="req-badge req-badge-approved">
            <CheckCircle2 size={12} />
            <span>Aprobada</span>
          </span>
        );
      case 'REJECTED':
        return (
          <span className="req-badge req-badge-rejected">
            <XCircle size={12} />
            <span>Rechazada</span>
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="req-badge req-badge-cancelled">
            <AlertCircle size={12} />
            <span>Cancelada</span>
          </span>
        );
      default:
        return <span className="req-badge">{status}</span>;
    }
  };

  return (
    <div className="admin-requests-wrapper">
      {/* Barra de Búsqueda y Filtros de Solicitudes */}
      <div className="admin-requests-toolbar">
        <div className="admin-requests-search">
          <Search size={16} className="admin-requests-search-icon" />
          <input
            type="text"
            className="admin-requests-search-input"
            placeholder="Buscar por folio, alumno o libro solicitado..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
        </div>

        <div className="admin-requests-filter-pills">
          <button
            type="button"
            className={`admin-requests-pill ${statusFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setStatusFilter('ALL')}
          >
            Todas ({requests.length})
          </button>
          <button
            type="button"
            className={`admin-requests-pill ${statusFilter === 'PENDING' ? 'active' : ''}`}
            onClick={() => setStatusFilter('PENDING')}
          >
            Pendientes ({requests.filter((r) => r.status === 'PENDING').length})
          </button>
          <button
            type="button"
            className={`admin-requests-pill ${statusFilter === 'APPROVED' ? 'active' : ''}`}
            onClick={() => setStatusFilter('APPROVED')}
          >
            Aprobadas ({requests.filter((r) => r.status === 'APPROVED').length})
          </button>
          <button
            type="button"
            className={`admin-requests-pill ${statusFilter === 'REJECTED' ? 'active' : ''}`}
            onClick={() => setStatusFilter('REJECTED')}
          >
            Rechazadas ({requests.filter((r) => r.status === 'REJECTED').length})
          </button>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="admin-requests-empty">
          <Clock size={32} color="#94A3B8" />
          <h3>No hay solicitudes en esta sección</h3>
          <p>
            {requests.length === 0
              ? 'Cuando los alumnos soliciten libros desde su portal de lector, aparecerán aquí para tu revisión.'
              : 'No hay solicitudes que coincidan con los filtros aplicados.'}
          </p>
        </div>
      ) : (
        <div className="admin-requests-table-container">
          <table className="admin-requests-table">
            <thead>
              <tr>
                <th>FOLIO</th>
                <th>ALUMNO / SOLICITANTE</th>
                <th>LIBRO SOLICITADO</th>
                <th>FECHA SUGERIDA</th>
                <th>RECOGIDA EN</th>
                <th>ESTADO</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id}>
                  <td className="req-cell-folio">{req.id}</td>
                  <td>
                    <div className="req-user-info">
                      <div className="req-user-avatar">
                        <User size={15} />
                      </div>
                      <div>
                        <div className="req-user-name">{req.userName}</div>
                        <div className="req-user-email">{req.userEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="req-book-info">
                      <BookOpen size={16} className="req-book-icon" />
                      <span className="req-book-title">{req.bookTitle}</span>
                    </div>
                  </td>
                  <td>
                    <div className="req-date-cell">
                      <Calendar size={14} />
                      <span>{req.suggestedDate ? formatSuggestedDate(req.suggestedDate) : 'Inmediata'}</span>
                    </div>
                  </td>
                  <td>
                    <div className="req-location-cell">
                      <MapPin size={14} />
                      <span>{req.pickupLocation || 'Mostrador Principal'}</span>
                    </div>
                  </td>
                  <td>{getStatusBadge(req.status)}</td>
                  <td>
                    {req.status === 'PENDING' ? (
                      <div className="req-actions-buttons">
                        <button
                          type="button"
                          className="req-btn-accept"
                          title="Aprobar y registrar préstamo"
                          onClick={() => onApprove(req)}
                        >
                          <CheckCircle2 size={16} />
                          <span>Aceptar</span>
                        </button>
                        <button
                          type="button"
                          className="req-btn-reject"
                          title="Rechazar solicitud"
                          onClick={() => onReject(req)}
                        >
                          <XCircle size={16} />
                          <span>Rechazar</span>
                        </button>
                      </div>
                    ) : (
                      <span className="req-actions-completed">
                        {req.status === 'APPROVED' ? 'Préstamo gestionado' : 'Solicitud finalizada'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

