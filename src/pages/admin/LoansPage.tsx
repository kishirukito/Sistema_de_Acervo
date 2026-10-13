import React, { useState, useMemo } from 'react';
import { Plus, SearchX, CheckCircle2 } from 'lucide-react';
import { LoansSummary } from '../../features/loans/components/LoansSummary';
import { LoansFilters } from '../../features/loans/components/LoansFilters';
import { LoansTable } from '../../features/loans/components/LoansTable';
import { LoansPagination } from '../../features/loans/components/LoansPagination';
import { RegisterLoanModal } from '../../features/loans/components/RegisterLoanModal';
import { LoanDetailModal } from '../../features/loans/components/LoanDetailModal';
import { ReturnLoanModal } from '../../features/loans/components/ReturnLoanModal';
import { RenewLoanModal } from '../../features/loans/components/RenewLoanModal';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { MOCK_RESOURCES } from '../../features/catalog/catalog.mock';
import {
  MOCK_LOANS,
  MOCK_LOANS_SUMMARY,
} from '../../features/loans/loans.mock';
import type {
  Loan,
  LoansFilterState,
  LoansSummaryData,
} from '../../features/loans/loans.types';
import '../../features/loans/loans.css';

const INITIAL_FILTERS: LoansFilterState = {
  searchQuery: '',
  status: '',
  userCategory: '',
  dateFilter: '',
};

export const LoansPage: React.FC = () => {
  const [loansList, setLoansList] = useState<Loan[]>(() => [...MOCK_LOANS]);
  const [loansSummary, setLoansSummary] = useState<LoansSummaryData>(() => ({
    ...MOCK_LOANS_SUMMARY,
  }));
  const [filters, setFilters] = useState<LoansFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
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
        if (loan.status !== filters.status) {
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
        if (filters.dateFilter === 'OVERDUE_ONLY' && loan.status !== 'OVERDUE') {
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

  const handleConfirmReturnLoan = (
    loan: Loan,
    details: { returnDate: string; notes?: string }
  ) => {
    const updatedNotes = details.notes
      ? loan.notes
        ? `${loan.notes} | ${details.notes}`
        : details.notes
      : loan.notes;

    // 1. Update local loans list
    setLoansList((prev) =>
      prev.map((l) =>
        l.id === loan.id
          ? {
              ...l,
              status: 'RETURNED',
              returnDate: details.returnDate,
              dueDateNote: '—',
              notes: updatedNotes,
            }
          : l
      )
    );

    // 2. Synchronize in-memory MOCK_LOANS
    const mockIdx = MOCK_LOANS.findIndex((l) => l.id === loan.id);
    if (mockIdx !== -1) {
      MOCK_LOANS[mockIdx] = {
        ...MOCK_LOANS[mockIdx],
        status: 'RETURNED',
        returnDate: details.returnDate,
        dueDateNote: '—',
        notes: updatedNotes,
      };
    }

    // 3. Synchronize MOCK_RESOURCES copies in memory
    const matchedResource = MOCK_RESOURCES.find(
      (r) =>
        r.id === loan.resourceId ||
        r.id === loan.resourceId.replace('-00', '-') ||
        r.id === loan.resourceId.replace('-0', '-') ||
        r.title.toLowerCase().trim() === loan.resourceTitle.toLowerCase().trim()
    );
    if (matchedResource) {
      matchedResource.availableCopies = Math.min(
        matchedResource.totalCopies,
        matchedResource.availableCopies + 1
      );
    }

    // 4. Update loansSummary metrics
    setLoansSummary((prev) => ({
      ...prev,
      activeLoansCount: Math.max(0, prev.activeLoansCount - 1),
      returnedThisMonthCount: prev.returnedThisMonthCount + 1,
      overdueCount:
        loan.status === 'OVERDUE'
          ? Math.max(0, prev.overdueCount - 1)
          : prev.overdueCount,
      dueSoonCount:
        loan.status === 'DUE_SOON'
          ? Math.max(0, prev.dueSoonCount - 1)
          : prev.dueSoonCount,
    }));

    showToast(`Devolución registrada correctamente.`);
  };

  const handleRenewLoan = (loan: Loan) => {
    setSelectedLoanForRenew(loan);
  };

  const handleConfirmRenewLoan = (
    loan: Loan,
    details: { newDueDate: string; dueDateNote: string }
  ) => {
    const nextCount = loan.renewalCount + 1;

    // 1. Update local loans list
    setLoansList((prev) =>
      prev.map((l) =>
        l.id === loan.id
          ? {
              ...l,
              dueDate: details.newDueDate,
              dueDateNote: details.dueDateNote,
              renewalCount: nextCount,
              status: 'ACTIVE',
            }
          : l
      )
    );

    // 2. Synchronize in-memory MOCK_LOANS
    const mockIdx = MOCK_LOANS.findIndex((l) => l.id === loan.id);
    if (mockIdx !== -1) {
      MOCK_LOANS[mockIdx] = {
        ...MOCK_LOANS[mockIdx],
        dueDate: details.newDueDate,
        dueDateNote: details.dueDateNote,
        renewalCount: nextCount,
        status: 'ACTIVE',
      };
    }

    // 3. Update summary metrics if previously overdue or due soon
    if (loan.status === 'OVERDUE') {
      setLoansSummary((prev) => ({
        ...prev,
        overdueCount: Math.max(0, prev.overdueCount - 1),
      }));
    } else if (loan.status === 'DUE_SOON') {
      setLoansSummary((prev) => ({
        ...prev,
        dueSoonCount: Math.max(0, prev.dueSoonCount - 1),
      }));
    }

    showToast(
      `Préstamo ${loan.folio} renovado correctamente hasta el ${details.newDueDate}.`
    );
  };

  const handleNewLoan = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCreateLoanSuccess = (newLoan: Loan) => {
    setLoansList((prev) => [newLoan, ...prev]);

    // Keep in-memory mock synchronized
    MOCK_LOANS.unshift(newLoan);

    // Update summary metrics
    setLoansSummary((prev) => ({
      ...prev,
      activeLoansCount: prev.activeLoansCount + 1,
    }));

    // Reset pagination to first page
    setCurrentPage(1);

    showToast(`Préstamo registrado exitosamente con folio ${newLoan.folio}`);
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

      {/* Summary KPI Cards */}
      <LoansSummary summary={loansSummary} />

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

      {/* Register New Loan Modal */}
      <RegisterLoanModal
        open={isRegisterModalOpen}
        existingLoans={loansList}
        onClose={() => setIsRegisterModalOpen(false)}
        onSuccess={handleCreateLoanSuccess}
      />

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
