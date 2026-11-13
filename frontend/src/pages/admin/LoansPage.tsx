import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, SearchX, CheckCircle2, BookOpen, Clock } from 'lucide-react';
import { LoansSummary } from '../../features/loans/components/LoansSummary';
import { LoansFilters } from '../../features/loans/components/LoansFilters';
import { LoansTable } from '../../features/loans/components/LoansTable';
import { LoansPagination } from '../../features/loans/components/LoansPagination';
import { LoanDetailModal } from '../../features/loans/components/LoanDetailModal';
import { ReturnLoanModal } from '../../features/loans/components/ReturnLoanModal';
import { RenewLoanModal } from '../../features/loans/components/RenewLoanModal';
import { AdminRequestsTable } from '../../features/loans/components/AdminRequestsTable';
import { Button } from '../../components/ui/Button';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { executeLoanReturn, formatDisplayDate } from '../../features/returns/returns.service';
import {
  MOCK_LOANS,
} from '../../features/loans/loans.mock';
import { fetchAdminLoans, fetchLoansSummary, updateAdminLoan } from '../../services/api/loans-admin.service';
import {
  getAllBorrowRequests,
  approveBorrowRequest,
  rejectBorrowRequest,
} from '../../features/loans/requests.service';
import type { BorrowRequest } from '../../types';
import type {
  Loan,
  LoansFilterState,
  LoansSummaryData,
} from '../../features/loans/loans.types';
import '../../features/loans/loans.css';

const INITIAL_SUMMARY: LoansSummaryData = {
  activeLoansCount: 0,
  activeTrend: '0 en circulación',
  dueSoonCount: 0,
  dueSoonSubtitle: 'Próximos a vencer',
  overdueCount: 0,
  overdueSubtitle: 'Sin adeudos',
  returnedThisMonthCount: 0,
  returnedTrend: 'Devueltos',
};

const INITIAL_FILTERS: LoansFilterState = {
  searchQuery: '',
  status: '',
  userCategory: '',
  dateFilter: '',
};

export const LoansPage: React.FC = () => {
  const navigate = useNavigate();
  const [loansList, setLoansList] = useState<Loan[]>([]);
  const [loansSummary, setLoansSummary] = useState<LoansSummaryData>(INITIAL_SUMMARY);
  const [filters, setFilters] = useState<LoansFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedLoanForDetail, setSelectedLoanForDetail] = useState<Loan | null>(null);
  const [selectedLoanForReturn, setSelectedLoanForReturn] = useState<Loan | null>(null);
  const [selectedLoanForRenew, setSelectedLoanForRenew] = useState<Loan | null>(null);
  
  // Pestañas: 'LOANS' (Préstamos activos/registrados) o 'REQUESTS' (Solicitudes de alumnos)
  const [activeTab, setActiveTab] = useState<'LOANS' | 'REQUESTS'>('LOANS');
  const [borrowRequests, setBorrowRequests] = useState<BorrowRequest[]>([]);

  const loadRequests = async () => {
    try {
      const token = localStorage.getItem('acervo_token');
      const headers: Record<string, string> = token
        ? { Authorization: `Bearer ${token}` }
        : {};
      const res = await fetch('/api/v1/data/solicitudes', { headers });
      if (res.ok) {
        const data: any[] = await res.json();
        const mapped: BorrowRequest[] = data.map((s: any) => ({
          supabaseId: s.id,
          id: s.folio || s.id,
          bookId: s.libro_id ?? '',
          bookTitle: s.libros?.titulo ?? 'Sin título',
          userId: s.usuario_id ?? '',
          userName: s.usuarios?.nombre_completo ?? 'Usuario',
          userEmail: s.usuarios?.email ?? '',
          requestDate: s.fecha_solicitud ?? s.created_at ?? '',
          status: (s.estado as any) ?? 'PENDING',
          notes: s.notas ?? '',
          pickupLocation: s.lugar_recogida ?? 'Mostrador Principal',
          suggestedDate: s.fecha_sugerida ?? '',
        }));
        setBorrowRequests(mapped);
        return;
      }
    } catch (_) {
      // fallback
    }
    setBorrowRequests(getAllBorrowRequests());
  };

  useEffect(() => {
    loadRequests();
  }, []);

  React.useEffect(() => {
    let active = true;
    Promise.all([fetchAdminLoans(), fetchLoansSummary()]).then(([loans, summary]) => {
      if (active) {
        if (Array.isArray(loans)) setLoansList(loans);
        if (summary) setLoansSummary(summary);
      }
    });
    return () => { active = false; };
  }, []);

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

    fetchAdminLoans().then((loans) => {
      if (loans && loans.length > 0) setLoansList(loans);
    });

    setSelectedLoanForReturn(null);
    showToast(`Préstamo ${loan.folio} devuelto exitosamente.`);
    navigate(`/admin/returns/${loan.id}/success`, {
      state: {
        loanId: loan.id,
        returnDate: formatDisplayDate(details.returnDate),
        notes: details.notes,
      },
    });
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

    // 1. Update local loans list
    setLoansList((prev) =>
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

    // Refresh loans from backend
    fetchAdminLoans().then((loans) => {
      if (loans && loans.length > 0) setLoansList(loans);
    });

    // 2. Synchronize in-memory MOCK_LOANS
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
      `Préstamo ${loan.folio} renovado correctamente hasta el ${formattedDisplay}.`
    );
  };

  const handleApproveRequest = async (req: BorrowRequest) => {
    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // 1. PATCH solicitud en Supabase → APPROVED
    if (req.supabaseId) {
      try {
        await fetch(`/api/v1/data/solicitudes/${req.supabaseId}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ estado: 'APPROVED', notas: `Aprobada por el administrador.` }),
        });
      } catch (_) {}
    }

    // 2. Intentar registrar el préstamo formal en el backend si el libro tiene ID
    try {
      const catRes = await fetch('/api/v1/data/libros', { headers });
      if (catRes.ok) {
        const books = await catRes.json();
        const targetBook = books.find((b: any) => b.id === req.bookId || b.titulo?.toLowerCase() === req.bookTitle?.toLowerCase());
        const availCopy = targetBook?.ejemplares?.find((ej: any) => ej.estado === 'disponible');

        if (availCopy && req.userId) {
          await fetch('/api/v1/data/prestamos', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              usuario_id: req.userId,
              ejemplar_id: availCopy.id,
              notas: `Aprobado desde solicitud web ${req.id}. Recogida: ${req.pickupLocation || 'Mostrador'}`
            }),
          });
          fetchAdminLoans().then((loans) => { if (loans) setLoansList(loans); });
          fetchLoansSummary().then((sum) => { if (sum) setLoansSummary(sum); });
        }
      }
    } catch (err) {
      console.warn('Registro automático en backend omitido o con advertencia:', err);
    }

    // 3. Marcar solicitud como Aprobada en localStorage (fallback)
    approveBorrowRequest(req.id);
    await loadRequests();
    showToast(`Solicitud ${req.id} aprobada con éxito. El libro está listo para entrega.`);
  };

  const handleRejectRequest = async (req: BorrowRequest) => {
    const token = localStorage.getItem('acervo_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    // PATCH solicitud en Supabase → REJECTED
    if (req.supabaseId) {
      try {
        await fetch(`/api/v1/data/solicitudes/${req.supabaseId}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ estado: 'REJECTED', notas: 'Rechazada por la biblioteca.' }),
        });
      } catch (_) {}
    }

    rejectBorrowRequest(req.id, 'Rechazada por la biblioteca.');
    await loadRequests();
    showToast(`Solicitud ${req.id} rechazada.`);
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

      {/* Pestañas de Navegación: Préstamos Activos vs Solicitudes de Alumnos */}
      <div className="loans-tabs-container">
        <button
          type="button"
          className={`loans-tab-button ${activeTab === 'LOANS' ? 'active' : ''}`}
          onClick={() => setActiveTab('LOANS')}
        >
          <BookOpen size={17} />
          <span>Préstamos registrados</span>
          <span className="loans-tab-badge">{loansList.length}</span>
        </button>

        <button
          type="button"
          className={`loans-tab-button ${activeTab === 'REQUESTS' ? 'active' : ''}`}
          onClick={() => setActiveTab('REQUESTS')}
        >
          <Clock size={17} />
          <span>Solicitudes de alumnos</span>
          <span className={`loans-tab-badge ${borrowRequests.filter((r) => r.status === 'PENDING').length > 0 ? 'badge-highlight' : ''}`}>
            {borrowRequests.filter((r) => r.status === 'PENDING').length} pendientes
          </span>
        </button>
      </div>

      {activeTab === 'REQUESTS' ? (
        <AdminRequestsTable
          requests={borrowRequests}
          onApprove={handleApproveRequest}
          onReject={handleRejectRequest}
        />
      ) : (
        <>
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
