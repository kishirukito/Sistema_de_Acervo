import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, SearchX } from 'lucide-react';
import { ReturnsSummary } from '../../features/returns/components/ReturnsSummary';
import { ReturnsFilters } from '../../features/returns/components/ReturnsFilters';
import { ReturnsTable } from '../../features/returns/components/ReturnsTable';
import { ReturnsPagination } from '../../features/returns/components/ReturnsPagination';
import { SearchReturnLoanModal } from '../../features/returns/components/SearchReturnLoanModal';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import {
  MOCK_RETURN_RECORDS,
  MOCK_RETURNS_SUMMARY,
} from '../../features/returns/returns.mock';
import type {
  ReturnRecord,
  ReturnsFilterState,
} from '../../features/returns/returns.types';
import '../../features/returns/returns.css';

const INITIAL_FILTERS: ReturnsFilterState = {
  searchQuery: '',
  status: '',
  dueDateFilter: '',
  userCategory: '',
};

export const ReturnsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [recordsList, setRecordsList] = useState<ReturnRecord[]>(() => [...MOCK_RETURN_RECORDS]);
  const [filters, setFilters] = useState<ReturnsFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(
    (location.state as { toastMessage?: string } | null)?.toastMessage || null
  );

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      window.history.replaceState({}, document.title);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    const state = location.state as { toastMessage?: string; openSearchModal?: boolean } | null;
    if (state?.openSearchModal) {
      setIsSearchModalOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    setRecordsList([...MOCK_RETURN_RECORDS]);
  }, []);

  const itemsPerPage = 5;

  const handleFilterChange = (newFilters: ReturnsFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  const filteredRecords = useMemo(() => {
    return recordsList.filter((record) => {
      // 1. Search Query (folio, user name, email, book title, author, isbn, resourceId)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesFolio = record.folio.toLowerCase().includes(query);
        const matchesUser = record.userName.toLowerCase().includes(query);
        const matchesEmail = record.userEmail.toLowerCase().includes(query);
        const matchesTitle = record.resourceTitle.toLowerCase().includes(query);
        const matchesAuthor = record.resourceAuthor.toLowerCase().includes(query);
        const matchesIsbn = Boolean(record.isbn && record.isbn.includes(query));
        const matchesResource = record.resourceId.toLowerCase().includes(query);

        if (
          !matchesFolio &&
          !matchesUser &&
          !matchesEmail &&
          !matchesTitle &&
          !matchesAuthor &&
          !matchesIsbn &&
          !matchesResource
        ) {
          return false;
        }
      }

      // 2. Status Filter
      if (filters.status) {
        if (record.status !== filters.status) {
          return false;
        }
      }

      // 3. User Category Filter
      if (filters.userCategory) {
        if (record.userCategory !== filters.userCategory) {
          return false;
        }
      }

      // 4. Due Date Filter
      if (filters.dueDateFilter) {
        if (filters.dueDateFilter === 'OVERDUE_ONLY' && !record.isOverdue && record.status !== 'OVERDUE') {
          return false;
        }
      }

      return true;
    });
  }, [recordsList, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / itemsPerPage));

  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRecords, currentPage, itemsPerPage]);

  const handleProcessReturn = (record: ReturnRecord) => {
    // Navigates to full page return confirmation route (NOT a modal)
    navigate(`/admin/returns/${record.loanId}`);
  };

  const handleHeaderAction = () => {
    setIsSearchModalOpen(true);
  };

  const handleSelectLoanForReturn = (loanId: string) => {
    navigate(`/admin/returns/${loanId}`);
  };

  return (
    <div className="returns-page-container">
      {/* Page Header */}
      <div className="returns-header">
        <div className="returns-header-titles">
          <h1 className="returns-title">Registro de devoluciones</h1>
          <p className="returns-subtitle">
            Consulta los préstamos pendientes y registra la devolución de los libros.
          </p>
        </div>

        <button
          type="button"
          onClick={handleHeaderAction}
          className="returns-header-action-btn"
          aria-label="Iniciar registro de devolución"
        >
          <CheckCircle2 size={18} />
          <span>Registrar devolución</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <ReturnsSummary summary={MOCK_RETURNS_SUMMARY} />

      {/* Filters Toolbar */}
      <ReturnsFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalFilteredCount={filteredRecords.length}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {/* Main Table / Empty State */}
      {isLoading ? (
        <div style={{ padding: '3rem 0' }}>
          <LoadingSpinner center size="lg" text="Cargando devoluciones pendientes..." />
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="returns-empty-card" role="region" aria-label="Sin resultados de devoluciones">
          <div className="returns-empty-icon" aria-hidden="true">
            <SearchX size={28} />
          </div>
          <h2 className="returns-empty-title">No se encontraron préstamos pendientes</h2>
          <p className="returns-empty-desc">
            No hay registros pendientes que coincidan con los criterios de búsqueda o filtros seleccionados.
          </p>
          <Button variant="primary" size="sm" onClick={handleClearFilters}>
            Limpiar filtros
          </Button>
        </div>
      ) : (
        <>
          <ReturnsTable
            records={paginatedRecords}
            onProcessReturn={handleProcessReturn}
          />

          <ReturnsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredRecords.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="returns-toast-banner" role="status" aria-live="polite">
          <CheckCircle2 size={18} color="#27AE60" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Search and Select Return Loan Modal */}
      <SearchReturnLoanModal
        open={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectLoan={handleSelectLoanForReturn}
        records={recordsList}
      />
    </div>
  );
};
