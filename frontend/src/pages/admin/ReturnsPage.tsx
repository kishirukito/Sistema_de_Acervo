import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { CheckCircle2, SearchX } from 'lucide-react';
import { ReturnsSummary } from '../../features/returns/components/ReturnsSummary';
import { ReturnsFilters } from '../../features/returns/components/ReturnsFilters';
import { ReturnsTable } from '../../features/returns/components/ReturnsTable';
import { ReturnsPagination } from '../../features/returns/components/ReturnsPagination';
import { SearchReturnLoanModal } from '../../features/returns/components/SearchReturnLoanModal';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import {
  useAdminReturns,
  deriveReturnsSummary,
  isDateToday,
} from '../../features/returns/returns.query';
import type {
  ReturnRecord,
  ReturnsFilterState,
  ReturnFilterStatus,
} from '../../features/returns/returns.types';
import '../../features/returns/returns.css';

const INITIAL_FILTERS: ReturnsFilterState = {
  searchQuery: '',
  status: '',
  dueDateFilter: '',
  userCategory: '',
};

function parseDateRobust(rawStr?: string, formattedStr?: string): Date | null {
  if (rawStr) {
    const match = String(rawStr).match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);
      return new Date(year, month, day, 12, 0, 0, 0);
    }
    const d = new Date(rawStr);
    if (!isNaN(d.getTime())) return d;
  }
  if (formattedStr) {
    const match = String(formattedStr).match(/(\d{1,2})\s+([a-zA-Záéíóúñ\.]+)\s+(\d{4})/i);
    if (match) {
      const day = parseInt(match[1], 10);
      const monthStr = match[2].toLowerCase().replace('.', '');
      const monthMap: Record<string, number> = {
        ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5,
        jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11,
      };
      const month = monthMap[monthStr.slice(0, 3)] ?? 0;
      const year = parseInt(match[3], 10);
      return new Date(year, month, day, 12, 0, 0, 0);
    }
  }
  return null;
}

function checkDueDateFilter(rawDueDateStr?: string, formattedStr?: string, filter?: string): boolean {
  if (!filter) return true;
  if (filter === 'OVERDUE_ONLY') return true;

  const d = parseDateRobust(rawDueDateStr, formattedStr);
  if (!d) return false;

  const now = new Date();
  if (filter === 'DUE_TODAY') {
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  }
  if (filter === 'THIS_WEEK') {
    const dayOfWeek = (now.getDay() + 6) % 7; // Lunes = 0, ..., Domingo = 6
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek, 0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + 6, 23, 59, 59, 999);

    if (d >= startOfWeek && d <= endOfWeek) return true;

    // Próximos 7 días a partir de hoy
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const endOfNext7Days = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 23, 59, 59, 999);
    if (d >= startOfToday && d <= endOfNext7Days) return true;

    return false;
  }
  if (filter === 'THIS_MONTH') {
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }
  if (filter === 'OCT_2026') {
    return d.getFullYear() === 2026 && d.getMonth() === 9;
  }
  return true;
}

export const ReturnsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // ── React Query: registros de devolución con caché de 2 minutos ───────────
  const { data: recordsList = [], isLoading } = useAdminReturns();

  // KPIs derivados de la misma consulta — sin segunda petición a /api/v1/data/prestamos
  const returnsSummary = useMemo(() => deriveReturnsSummary(recordsList), [recordsList]);

  // Inicializar filtros a partir de searchParams (ej. desde alertas: ?status=OVERDUE)
  const initialStatusParam = (searchParams.get('status') || '') as '' | ReturnFilterStatus;
  const initialDueDateParam = searchParams.get('dueDateFilter') || (initialStatusParam === 'OVERDUE' ? 'OVERDUE_ONLY' : '');
  const initialSearchParam = searchParams.get('q') || searchParams.get('search') || '';

  const [filters, setFilters] = useState<ReturnsFilterState>({
    searchQuery: initialSearchParam,
    status: initialStatusParam,
    dueDateFilter: initialDueDateParam,
    userCategory: '',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(
    (location.state as { toastMessage?: string } | null)?.toastMessage || null
  );

  // Sincronizar filtros reactivamente cuando cambien los searchParams
  useEffect(() => {
    const statusParam = searchParams.get('status') as '' | ReturnFilterStatus | null;
    const dueDateParam = searchParams.get('dueDateFilter');
    const searchParam = searchParams.get('q') || searchParams.get('search');

    if (statusParam !== null || dueDateParam !== null || searchParam !== null) {
      setFilters((prev) => ({
        ...prev,
        status: statusParam !== null ? statusParam : prev.status,
        dueDateFilter: dueDateParam !== null
          ? dueDateParam
          : (statusParam === 'OVERDUE' ? 'OVERDUE_ONLY' : prev.dueDateFilter),
        searchQuery: searchParam !== null ? searchParam : prev.searchQuery,
      }));
      setCurrentPage(1);
    }
  }, [searchParams]);

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

  const itemsPerPage = 5;

  const handleFilterChange = (newFilters: ReturnsFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
    if (searchParams.toString()) {
      setSearchParams({}, { replace: true });
    }
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
        if (filters.status === 'OVERDUE') {
          // Un préstamo devuelto NUNCA es un préstamo vencido activo
          if (record.status !== 'OVERDUE') {
            return false;
          }
        } else if (filters.status === 'RETURNED_TODAY') {
          // SOLO libros devueltos el día de hoy (fecha actual)
          if (record.status !== 'RETURNED') {
            return false;
          }
          if (!isDateToday(record.rawReturnDate, record.returnDate)) {
            return false;
          }
        } else if (filters.status === 'RETURNED') {
          if (record.status !== 'RETURNED') {
            return false;
          }
        } else if (filters.status === 'ACTIVE') {
          // Pendientes activos no vencidos ni devueltos
          if (record.status !== 'ACTIVE') {
            return false;
          }
        } else if (filters.status === 'DUE_SOON') {
          if (record.status !== 'DUE_SOON') {
            return false;
          }
        } else if (record.status !== filters.status) {
          return false;
        }
      } else {
        // Por defecto en Devoluciones solo mostrar préstamos pendientes (no devueltos)
        if (record.status === 'RETURNED') {
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
        if (filters.dueDateFilter === 'OVERDUE_ONLY') {
          if (record.status !== 'OVERDUE') return false;
        } else if (!checkDueDateFilter(record.rawDueDate, record.dueDate, filters.dueDateFilter)) {
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
    // Navigates to full page return confirmation route with preloaded record in state
    navigate(`/admin/returns/${record.loanId}`, { state: { record } });
  };

  const handleHeaderAction = () => {
    setIsSearchModalOpen(true);
  };

  const handleSelectLoanForReturn = (loanId: string) => {
    const matched = recordsList.find(
      (r) => r.loanId === loanId || r.id === loanId || r.folio === loanId
    );
    navigate(`/admin/returns/${loanId}`, { state: { record: matched } });
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
      <ReturnsSummary
        summary={returnsSummary}
        activeFilter={filters.status}
        onSelectFilter={(status) => handleFilterChange({ ...filters, status })}
      />

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
