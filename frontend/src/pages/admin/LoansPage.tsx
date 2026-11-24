import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plus, SearchX, CheckCircle2, Inbox } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { LoansSummary } from '../../features/loans/components/LoansSummary';
import { LoansFilters } from '../../features/loans/components/LoansFilters';
import { LoansTable } from '../../features/loans/components/LoansTable';
import { LoansPagination } from '../../features/loans/components/LoansPagination';
import { LoanDetailModal } from '../../features/loans/components/LoanDetailModal';
import { ReturnLoanModal } from '../../features/loans/components/ReturnLoanModal';
import { RenewLoanModal } from '../../features/loans/components/RenewLoanModal';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { executeLoanReturn, formatDisplayDate } from '../../features/returns/returns.service';
import {
  MOCK_LOANS,
} from '../../features/loans/loans.mock';
import { updateAdminLoan } from '../../services/api/loans-admin.service';
import {
  useAdminLoans,
  deriveLoansSummary,
  invalidateAdminLoans,
  ADMIN_LOANS_KEY,
} from '../../features/loans/admin-loans.query';
import { ADMIN_RETURNS_KEY } from '../../features/returns/returns.query';
import type {
  Loan,
  LoansFilterState,
  LoanStatus,
} from '../../features/loans/loans.types';
import '../../features/loans/loans.css';

const INITIAL_FILTERS: LoansFilterState = {
  searchQuery: '',
  status: '',
  userCategory: '',
  dateFilter: '',
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

function checkDateFilter(rawDateStr?: string, formattedStr?: string, filter?: string): boolean {
  if (!filter) return true;
  if (filter === 'OVERDUE_ONLY') return true;

  const d = parseDateRobust(rawDateStr, formattedStr);
  if (!d) return false;

  const now = new Date();
  if (filter === 'TODAY') {
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
  if (filter === 'LAST_MONTH') {
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return d.getFullYear() === lastMonth.getFullYear() && d.getMonth() === lastMonth.getMonth();
  }
  if (filter === 'SEP_2026') {
    return d.getFullYear() === 2026 && d.getMonth() === 8;
  }
  return true;
}

export const LoansPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // ── React Query: préstamos admin con caché de 2 minutos ──────────────────
  const { data: loansList = [], isLoading } = useAdminLoans();

  // KPIs derivados de la misma consulta — sin segunda petición a /api/v1/data/prestamos
  const loansSummary = useMemo(() => deriveLoansSummary(loansList), [loansList]);

  // Inicializar filtros a partir de query params (ej. desde alertas: ?status=DUE_SOON)
  const initialStatusParam = (searchParams.get('status') || '') as '' | LoanStatus;
  const initialDateParam = searchParams.get('dateFilter') || '';
  const initialSearchParam = searchParams.get('q') || searchParams.get('search') || '';

  const [filters, setFilters] = useState<LoansFilterState>({
    searchQuery: initialSearchParam,
    status: initialStatusParam,
    userCategory: '',
    dateFilter: initialDateParam,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sincronizar filtros reactivamente cuando cambien los searchParams
  useEffect(() => {
    const statusParam = searchParams.get('status') as '' | LoanStatus | null;
    const dateParam = searchParams.get('dateFilter');
    const searchParam = searchParams.get('q') || searchParams.get('search');

    if (statusParam !== null || dateParam !== null || searchParam !== null) {
      setFilters((prev) => ({
        ...prev,
        status: statusParam !== null ? statusParam : prev.status,
        dateFilter: dateParam !== null ? dateParam : prev.dateFilter,
        searchQuery: searchParam !== null ? searchParam : prev.searchQuery,
      }));
      setCurrentPage(1);
    }
  }, [searchParams]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedLoanForDetail, setSelectedLoanForDetail] = useState<Loan | null>(null);
  const [selectedLoanForReturn, setSelectedLoanForReturn] = useState<Loan | null>(null);
  const [selectedLoanForRenew, setSelectedLoanForRenew] = useState<Loan | null>(null);
  
  const itemsPerPage = 5;

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3500);
  };

  const handleFilterChange = (newFilters: LoansFilterState) => {
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

  const filteredLoans = useMemo(() => {
    return loansList.filter((loan) => {
      // 1. Search Query (folio, user name, book title, author, resourceId)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesFolio = loan.folio.toLowerCase().includes(query);
        const matchesUser = loan.userName.toLowerCase().includes(query);
        const matchesTitle = loan.resourceTitle.toLowerCase().includes(query);
        const matchesAuthor = loan.resourceAuthor.toLowerCase().includes(query);
        const matchesResource = loan.resourceId.toLowerCase().includes(query);

        if (!matchesFolio && !matchesUser && !matchesTitle && !matchesAuthor && !matchesResource) {
          return false;
        }
      }

      // 2. Status Filter
      if (filters.status) {
        if (filters.status === 'DUE_SOON') {
          if (loan.status === 'RETURNED') return false;
          const isDue =
            loan.status === 'DUE_SOON' ||
            (loan.status === 'ACTIVE' && Boolean(loan.dueDateNote?.includes('Vence')));
          if (!isDue) return false;
        } else if (filters.status === 'OVERDUE') {
          if (loan.status === 'RETURNED') return false;
          const isOverdue =
            loan.status === 'OVERDUE' || Boolean(loan.dueDateNote?.includes('vencido'));
          if (!isOverdue) return false;
        } else if (loan.status !== filters.status) {
          return false;
        }
      }

      // 3. User Category Filter
      if (filters.userCategory) {
        if (loan.userCategory !== filters.userCategory) {
          return false;
        }
      }

      // 4. Date Filter
      if (filters.dateFilter) {
        if (filters.dateFilter === 'OVERDUE_ONLY') {
          if (loan.status === 'RETURNED') return false;
          const isOverdue =
            loan.status === 'OVERDUE' || Boolean(loan.dueDateNote?.includes('vencido'));
          if (!isOverdue) return false;
        } else if (!checkDateFilter(loan.rawCheckoutDate, loan.checkoutDate, filters.dateFilter)) {
          return false;
        }
      }

      return true;
    });
  }, [loansList, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredLoans.length / itemsPerPage));

  const paginatedLoans = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLoans.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLoans, currentPage, itemsPerPage]);

  const handleViewLoan = (loan: Loan) => {
    setSelectedLoanForDetail(loan);
  };

  const handleReturnLoan = (loan: Loan) => {
    if (loan.status === 'RETURNED') {
      showToast(`El préstamo ${loan.folio} ya se encuentra devuelto.`);
      return;
    }
    setSelectedLoanForReturn(loan);
  };

  const handleConfirmReturnLoan = async (
    loan: Loan,
    details: { returnDate: string; notes?: string }
  ) => {
    // details.returnDate llega en formato ISO 8601 (YYYY-MM-DDTHH:MM:SSZ)
    await updateAdminLoan(loan.id, {
      returnDate: details.returnDate,
      status: 'devuelto',
      notes: details.notes,
    });

    executeLoanReturn(loan.id, details);

    // Invalidar caché de préstamos y devoluciones para reflejar el cambio
    // en ambos listados sin necesidad de recargar la página.
    invalidateAdminLoans(queryClient);
    queryClient.invalidateQueries({ queryKey: [ADMIN_RETURNS_KEY] });

    setSelectedLoanForReturn(null);
    showToast(`Devolución registrada correctamente. Préstamo ${loan.folio} cerrado.`);
    // ✅ No se navega: el administrador permanece en Préstamos.
  };

  const handleRenewLoan = (loan: Loan) => {
    setSelectedLoanForRenew(loan);
  };

  const handleConfirmRenewLoan = async (
    loan: Loan,
    details: { newDueDate: string; dueDateNote: string }
  ) => {
    const nextCount = loan.renewalCount + 1;
    const formattedDisplay = formatDisplayDate(details.newDueDate);

    // details.newDueDate llega en formato ISO 8601 (YYYY-MM-DDTHH:MM:SSZ)
    // Persistir renovación en Supabase mediante backend protegido
    await updateAdminLoan(loan.id, {
      dueDate: details.newDueDate,
      status: 'renovado',
    });

    // Actualización optimista en caché RQ — las métricas se recalculan automáticamente
    queryClient.setQueryData<Loan[]>([ADMIN_LOANS_KEY], (prev = []) =>
      prev.map((l) =>
        l.id === loan.id
          ? {
              ...l,
              dueDate: formattedDisplay,
              dueDateNote: details.dueDateNote,
              renewalCount: nextCount,
              status: 'ACTIVE',
            }
          : l
      )
    );

    // Confirmar desde servidor en segundo plano
    invalidateAdminLoans(queryClient);

    // Synchronize in-memory MOCK_LOANS
    const mockIdx = MOCK_LOANS.findIndex((l) => l.id === loan.id);
    if (mockIdx !== -1) {
      MOCK_LOANS[mockIdx] = {
        ...MOCK_LOANS[mockIdx],
        dueDate: formattedDisplay,
        dueDateNote: details.dueDateNote,
        renewalCount: nextCount,
        status: 'ACTIVE',
      };
    }

    showToast(
      `Préstamo ${loan.folio} renovado correctamente hasta el ${formattedDisplay}.`
    );
  };

  const handleNewLoan = () => {
    navigate('/admin/loans/new');
  };

  return (
    <div className="loans-page-container">
      {/* Page Header */}
      <div className="loans-header">
        <div className="loans-header-titles">
          <h1 className="loans-title">Gestión de préstamos</h1>
          <p className="loans-subtitle">
            Controla los préstamos activos, devoluciones y fechas de vencimiento.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => navigate('/admin/solicitudes')}
            className="loans-header-requests-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.65rem 1.15rem',
              backgroundColor: '#FFFFFF',
              color: '#1E3A5F',
              border: '1.5px solid #CBD5E1',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            aria-label="Ir a solicitudes de alumnos"
            title="Ver solicitudes de préstamo pendientes de alumnos"
          >
            <Inbox size={18} color="#2563EB" />
            <span>Solicitudes de alumnos</span>
          </button>

          <button
            type="button"
            onClick={handleNewLoan}
            className="loans-new-btn"
            aria-label="Registrar un nuevo préstamo"
          >
            <Plus size={18} />
            <span>Nuevo préstamo</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <LoansSummary
        summary={loansSummary}
        activeFilter={filters.status}
        onSelectFilter={(status) => handleFilterChange({ ...filters, status })}
      />

      {/* Filters Toolbar */}
          <LoansFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            totalFilteredCount={filteredLoans.length}
            currentPage={currentPage}
            totalPages={totalPages}
          />

          {/* Main Table / Empty State */}
          {isLoading ? (
            <div style={{ padding: '3rem 0' }}>
              <LoadingSpinner center size="lg" text="Cargando préstamos..." />
            </div>
          ) : filteredLoans.length === 0 ? (
            <div className="loans-empty-card" role="region" aria-label="Sin resultados de préstamos">
              <div className="loans-empty-icon" aria-hidden="true">
                <SearchX size={28} />
              </div>
              <h2 className="loans-empty-title">No se encontraron préstamos</h2>
              <p className="loans-empty-desc">
                No hay registros que coincidan con los criterios de búsqueda o filtros seleccionados.
              </p>
              <Button variant="primary" size="sm" onClick={handleClearFilters}>
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <>
              <LoansTable
                loans={paginatedLoans}
                onViewLoan={handleViewLoan}
                onReturnLoan={handleReturnLoan}
                onRenewLoan={handleRenewLoan}
              />

              <LoansPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredLoans.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="loans-toast-banner" role="status" aria-live="polite">
          <CheckCircle2 size={18} color="#27AE60" />
          <span>{toastMessage}</span>
        </div>
      )}


      {/* View Loan Detail Modal */}
      <LoanDetailModal
        loan={selectedLoanForDetail}
        onClose={() => setSelectedLoanForDetail(null)}
      />

      {/* Return Loan Confirmation Modal */}
      <ReturnLoanModal
        loan={selectedLoanForReturn}
        onClose={() => setSelectedLoanForReturn(null)}
        onConfirm={handleConfirmReturnLoan}
      />

      {/* Renew Loan Confirmation Modal */}
      <RenewLoanModal
        loan={selectedLoanForRenew}
        onClose={() => setSelectedLoanForRenew(null)}
        onConfirm={handleConfirmRenewLoan}
      />
    </div>
  );
};
