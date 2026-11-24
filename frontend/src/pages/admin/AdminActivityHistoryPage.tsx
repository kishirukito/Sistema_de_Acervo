import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  BookOpen,
  RotateCcw,
  Clock,
  AlertCircle,
  CheckCircle2,
  Eye,
  Filter,
  FileSpreadsheet,
} from 'lucide-react';
import { useAdminLoans } from '../../features/loans/admin-loans.query';
import { LoanDetailModal } from '../../features/loans/components/LoanDetailModal';
import { LoanStatusBadge } from '../../features/loans/components/LoanStatusBadge';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import type { Loan } from '../../features/loans/loans.types';
import './AdminActivityHistoryPage.css';

export const AdminActivityHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: loansList = [], isLoading } = useAdminLoans();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'LOAN' | 'RETURN'>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);

  const itemsPerPage = 10;

  // KPIs calculados sobre el listado total
  const summary = useMemo(() => {
    let totalLoans = 0;
    let activeLoans = 0;
    let overdueLoans = 0;
    let returnedLoans = 0;

    loansList.forEach((loan) => {
      totalLoans++;
      if (loan.status === 'RETURNED') {
        returnedLoans++;
      } else {
        activeLoans++;
        if (loan.status === 'OVERDUE') {
          overdueLoans++;
        }
      }
    });

    return { totalLoans, activeLoans, overdueLoans, returnedLoans };
  }, [loansList]);

  // Filtrado de movimientos
  const filteredLoans = useMemo(() => {
    return loansList.filter((loan) => {
      // 1. Filtro por tipo
      const isReturned = loan.status === 'RETURNED' || Boolean(loan.returnDate);
      if (filterType === 'LOAN' && isReturned) return false;
      if (filterType === 'RETURN' && !isReturned) return false;

      // 2. Filtro por estado
      if (filterStatus !== 'ALL') {
        if (loan.status !== filterStatus) return false;
      }

      // 3. Filtro por texto
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesFolio = loan.folio.toLowerCase().includes(q);
        const matchesUser = loan.userName.toLowerCase().includes(q);
        const matchesBook = loan.resourceTitle.toLowerCase().includes(q);
        const matchesAuthor = loan.resourceAuthor.toLowerCase().includes(q);
        return matchesFolio || matchesUser || matchesBook || matchesAuthor;
      }

      return true;
    });
  }, [loansList, filterType, filterStatus, searchQuery]);

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filteredLoans.length / itemsPerPage));
  const paginatedLoans = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLoans.slice(start, start + itemsPerPage);
  }, [filteredLoans, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFilterTypeChange = (type: 'ALL' | 'LOAN' | 'RETURN') => {
    setFilterType(type);
    setCurrentPage(1);
  };

  const handleFilterStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterType('ALL');
    setFilterStatus('ALL');
    setCurrentPage(1);
  };

  return (
    <div className="activity-history-page">
      {/* Encabezado */}
      <header className="activity-history-header">
        <div className="activity-history-header-top">
          <button
            type="button"
            className="activity-back-btn"
            onClick={() => navigate('/admin/dashboard')}
            aria-label="Volver al dashboard"
          >
            <ArrowLeft size={18} />
            <span>Volver al Dashboard</span>
          </button>
        </div>

        <div className="activity-history-title-row">
          <div>
            <h1 className="activity-history-title">Historial completo de circulación</h1>
            <p className="activity-history-subtitle">
              Consulta y audita la totalidad de préstamos y devoluciones registrados en el acervo.
            </p>
          </div>
          <button
            type="button"
            className="activity-export-btn"
            onClick={() => navigate('/admin/reports')}
            title="Exportar reporte de circulación"
          >
            <FileSpreadsheet size={16} />
            <span>Generar reporte</span>
          </button>
        </div>
      </header>

      {/* Tarjetas de Resumen KPI */}
      <section className="activity-kpi-grid" aria-label="Métricas de historial">
        <div className="activity-kpi-card">
          <div className="activity-kpi-icon activity-kpi-icon--total">
            <BookOpen size={20} />
          </div>
          <div className="activity-kpi-content">
            <span className="activity-kpi-value">{summary.totalLoans}</span>
            <span className="activity-kpi-label">Movimientos totales</span>
          </div>
        </div>

        <div className="activity-kpi-card">
          <div className="activity-kpi-icon activity-kpi-icon--active">
            <Clock size={20} />
          </div>
          <div className="activity-kpi-content">
            <span className="activity-kpi-value">{summary.activeLoans}</span>
            <span className="activity-kpi-label">Préstamos en curso</span>
          </div>
        </div>

        <div className="activity-kpi-card">
          <div className="activity-kpi-icon activity-kpi-icon--overdue">
            <AlertCircle size={20} />
          </div>
          <div className="activity-kpi-content">
            <span className="activity-kpi-value">{summary.overdueLoans}</span>
            <span className="activity-kpi-label">Préstamos vencidos</span>
          </div>
        </div>

        <div className="activity-kpi-card">
          <div className="activity-kpi-icon activity-kpi-icon--returned">
            <CheckCircle2 size={20} />
          </div>
          <div className="activity-kpi-content">
            <span className="activity-kpi-value">{summary.returnedLoans}</span>
            <span className="activity-kpi-label">Devoluciones registradas</span>
          </div>
        </div>
      </section>

      {/* Barra de Filtros y Búsqueda */}
      <section className="activity-filters-card">
        <div className="activity-search-box">
          <Search size={18} className="activity-search-icon" />
          <input
            type="text"
            className="activity-search-input"
            placeholder="Buscar por folio, usuario, título del libro o autor..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button
              type="button"
              className="activity-search-clear"
              onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
            >
              ×
            </button>
          )}
        </div>

        <div className="activity-filters-group">
          {/* Tipo de movimiento */}
          <div className="activity-type-tabs">
            <button
              type="button"
              className={`activity-type-tab ${filterType === 'ALL' ? 'active' : ''}`}
              onClick={() => handleFilterTypeChange('ALL')}
            >
              Todos
            </button>
            <button
              type="button"
              className={`activity-type-tab ${filterType === 'LOAN' ? 'active' : ''}`}
              onClick={() => handleFilterTypeChange('LOAN')}
            >
              Préstamos
            </button>
            <button
              type="button"
              className={`activity-type-tab ${filterType === 'RETURN' ? 'active' : ''}`}
              onClick={() => handleFilterTypeChange('RETURN')}
            >
              Devoluciones
            </button>
          </div>

          {/* Filtro de Estado */}
          <div className="activity-select-wrapper">
            <Filter size={15} className="activity-select-icon" />
            <select
              className="activity-select"
              value={filterStatus}
              onChange={handleFilterStatusChange}
              aria-label="Filtrar por estado"
            >
              <option value="ALL">Todos los estados</option>
              <option value="ACTIVE">Activos</option>
              <option value="DUE_SOON">Próximos a vencer</option>
              <option value="OVERDUE">Vencidos</option>
              <option value="RETURNED">Devueltos</option>
            </select>
          </div>
        </div>
      </section>

      {/* Tabla de Historial */}
      <section className="activity-table-card">
        <div className="activity-table-header-info">
          <span className="activity-count-text">
            Mostrando <strong>{filteredLoans.length}</strong> movimiento(s)
            {(searchQuery || filterType !== 'ALL' || filterStatus !== 'ALL') && (
              <button type="button" className="activity-reset-filters-btn" onClick={clearFilters}>
                Limpiar filtros
              </button>
            )}
          </span>
          <span className="activity-page-indicator">
            Página {currentPage} de {totalPages}
          </span>
        </div>

        {isLoading ? (
          <div className="activity-loading-state">
            <LoadingSpinner size="lg" text="Cargando historial de circulación..." />
          </div>
        ) : filteredLoans.length === 0 ? (
          <div className="activity-empty-state">
            <RotateCcw size={48} className="activity-empty-icon" />
            <h3 className="activity-empty-title">No se encontraron movimientos</h3>
            <p className="activity-empty-subtitle">
              {searchQuery || filterType !== 'ALL' || filterStatus !== 'ALL'
                ? 'Prueba modificando tus términos de búsqueda o filtros seleccionados.'
                : 'Aún no se han generado registros de circulación en el sistema.'}
            </p>
            {(searchQuery || filterType !== 'ALL' || filterStatus !== 'ALL') && (
              <button type="button" className="activity-btn-primary" onClick={clearFilters}>
                Restablecer filtros
              </button>
            )}
          </div>
        ) : (
          <div className="activity-table-responsive">
            <table className="activity-data-table">
              <thead>
                <tr>
                  <th style={{ minWidth: '100px' }}>FOLIO</th>
                  <th style={{ minWidth: '110px' }}>TIPO</th>
                  <th style={{ minWidth: '220px' }}>USUARIO</th>
                  <th style={{ minWidth: '240px' }}>LIBRO</th>
                  <th style={{ minWidth: '130px' }}>FECHA PRÉSTAMO</th>
                  <th style={{ minWidth: '140px' }}>FECHA LÍMITE / DEV.</th>
                  <th style={{ minWidth: '140px' }}>ESTADO</th>
                  <th style={{ minWidth: '120px', textAlign: 'center' }}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLoans.map((loan) => {
                  const isReturned = loan.status === 'RETURNED' || Boolean(loan.returnDate);
                  return (
                    <tr key={loan.id}>
                      {/* Folio */}
                      <td>
                        <span className="activity-folio-tag">{loan.folio}</span>
                      </td>

                      {/* Tipo */}
                      <td>
                        {isReturned ? (
                          <span className="activity-badge-type activity-badge-type--return">
                            <CheckCircle2 size={12} />
                            Devolución
                          </span>
                        ) : (
                          <span className="activity-badge-type activity-badge-type--loan">
                            <BookOpen size={12} />
                            Préstamo
                          </span>
                        )}
                      </td>

                      {/* Usuario */}
                      <td>
                        <div className="activity-user-cell">
                          <div
                            className="activity-user-avatar"
                            style={{ backgroundColor: loan.userAvatarColor || '#2F80ED' }}
                          >
                            {loan.userInitials}
                          </div>
                          <div className="activity-user-info">
                            <span className="activity-user-name">{loan.userName}</span>
                            <span className="activity-user-sub">
                              {loan.userCareerName || (loan.userCategory === 'TEACHER' ? 'Docente' : 'Alumno')}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Libro */}
                      <td>
                        <div className="activity-book-cell">
                          <span className="activity-book-title" title={loan.resourceTitle}>
                            {loan.resourceTitle}
                          </span>
                          <span className="activity-book-author">{loan.resourceAuthor}</span>
                        </div>
                      </td>

                      {/* Fecha de Préstamo */}
                      <td>
                        <span className="activity-date-text">{loan.checkoutDate || '—'}</span>
                      </td>

                      {/* Fecha Límite / Devolución */}
                      <td>
                        {isReturned ? (
                          <span className="activity-date-text activity-date-text--returned">
                            {loan.returnDate || loan.dueDate || '—'}
                          </span>
                        ) : (
                          <div className="activity-due-cell">
                            <span className="activity-date-text">{loan.dueDate || '—'}</span>
                            {loan.dueDateNote && (
                              <span className={`activity-due-sub ${loan.status === 'OVERDUE' ? 'activity-due-sub--overdue' : ''}`}>
                                {loan.dueDateNote}
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Estado */}
                      <td>
                        <LoanStatusBadge status={loan.status} />
                      </td>

                      {/* Acciones */}
                      <td style={{ textAlign: 'center' }}>
                        <div className="activity-action-btns">
                          <button
                            type="button"
                            className="activity-icon-btn"
                            title="Ver detalle del movimiento"
                            onClick={() => setSelectedLoan(loan)}
                          >
                            <Eye size={16} />
                          </button>
                          {!isReturned && (
                            <button
                              type="button"
                              className="activity-text-action-btn"
                              title="Registrar devolución de este libro"
                              onClick={() => navigate('/admin/returns')}
                            >
                              Devolver
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Paginación */}
        {filteredLoans.length > 0 && (
          <div className="activity-pagination">
            <span className="activity-pagination-info">
              {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredLoans.length)} de {filteredLoans.length} resultados
            </span>

            <div className="activity-pagination-controls">
              <button
                type="button"
                className="activity-pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ‹ Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`activity-pagination-num ${currentPage === page ? 'active' : ''}`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                className="activity-pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente ›
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Modal de Detalle */}
      {selectedLoan && (
        <LoanDetailModal
          loan={selectedLoan}
          onClose={() => setSelectedLoan(null)}
        />
      )}
    </div>
  );
};
