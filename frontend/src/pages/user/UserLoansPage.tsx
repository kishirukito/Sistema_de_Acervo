import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ClipboardCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Search,
  RotateCw,
  Info,
  BookOpen,
  Code,
  Infinity as InfinityIcon,
  X,
  MapPin,
  Mail,
  Phone,
  Bookmark,
} from 'lucide-react';
import { fetchMyLoans } from '../../services/api/loans.service';
import { booksService } from '../../services/api/books.service';
import type { Book, Loan } from '../../types';
import { resolveCategory } from '../../constants';
import './UserLoansPage.css';

interface CoverVisualMetadata {
  gradient: string;
  symbol: React.ReactNode;
  tag: string;
}

/**
 * Visual generator for book covers matching the user portal identity.
 */
const getBookCoverVisual = (book?: Book | null): CoverVisualMetadata => {
  if (!book) {
    return {
      gradient: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
      symbol: <BookOpen size={18} color="#FFFFFF" strokeWidth={2.2} />,
      tag: 'BIBLIOTECA',
    };
  }

  if (book.id === 'book-python') {
    return {
      gradient: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 55%, #60A5FA 100%)',
      symbol: <Code size={18} color="#FFFFFF" strokeWidth={2.3} />,
      tag: 'BIBLIOTECA',
    };
  }

  if (book.id === 'book-soledad') {
    return {
      gradient: 'linear-gradient(135deg, #065F46 0%, #059669 44%, #EAB308 76%, #F59E0B 100%)',
      symbol: <InfinityIcon size={18} color="#FFFFFF" strokeWidth={2.3} />,
      tag: 'BIBLIOTECA',
    };
  }

  if (book.id === 'book-principito') {
    return {
      gradient: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 42%, #F59E0B 75%, #D97706 100%)',
      symbol: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
          <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" />
        </svg>
      ),
      tag: 'BIBLIOTECA',
    };
  }

  if (book.id === 'book-quijote') {
    return {
      gradient: 'linear-gradient(145deg, #78350F 0%, #9A3412 50%, #B45309 100%)',
      symbol: <Search size={18} color="#FFFFFF" strokeWidth={2.3} />,
      tag: 'BIBLIOTECA',
    };
  }

  if (book.id === 'book-fundamentos-prog') {
    return {
      gradient: 'linear-gradient(145deg, #312E81 0%, #4338CA 50%, #6366F1 100%)',
      symbol: (
        <span
          style={{
            fontSize: '0.9375rem',
            fontWeight: 700,
            fontFamily: 'monospace',
            color: '#FFF',
            lineHeight: 1,
          }}
        >
          {'{ }'}
        </span>
      ),
      tag: 'BIBLIOTECA',
    };
  }

  // Fallback based on Dewey category
  const cat = resolveCategory(book.category);
  const code = cat?.code || '000';

  switch (code) {
    case '000':
    case '600':
      return {
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
        symbol: <Code size={18} color="#FFFFFF" strokeWidth={2.2} />,
        tag: 'BIBLIOTECA',
      };
    default:
      return {
        gradient: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
        symbol: <BookOpen size={18} color="#FFFFFF" strokeWidth={2.2} />,
        tag: 'BIBLIOTECA',
      };
  }
};

/**
 * Formats a date string (YYYY-MM-DD) into standard Spanish display ("20 sep. 2026").
 */
const formatDisplayDate = (dateStr?: string): string => {
  if (!dateStr) return '—';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return dateStr;

  const date = new Date(year, month - 1, day);
  const dayStr = String(day).padStart(2, '0');
  const monthNames = [
    'ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.',
    'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.',
  ];
  return `${dayStr} ${monthNames[date.getMonth()]} ${year}`;
};

/**
 * Evaluates loan urgency and visual status relative to system simulation date (2026-10-05).
 */
const REFERENCE_DATE_STR = '2026-10-05';

export interface LoanUrgencyInfo {
  category: 'ACTIVE' | 'DUE_SOON' | 'OVERDUE' | 'RETURNED';
  badgeLabel: string;
  badgeClass: string;
  hintText: string;
  hintClass: string;
  isOverdue: boolean;
  isDueSoon: boolean;
  isReturned: boolean;
}

const getLoanUrgencyInfo = (loan: Loan): LoanUrgencyInfo => {
  if (loan.status === 'RETURNED' || loan.returnDate) {
    return {
      category: 'RETURNED',
      badgeLabel: 'Devuelto',
      badgeClass: 'user-loans-badge--returned',
      hintText: loan.returnDate ? `Devuelto el ${formatDisplayDate(loan.returnDate)}` : 'Devuelto a tiempo',
      hintClass: 'user-loans-status-subtext',
      isOverdue: false,
      isDueSoon: false,
      isReturned: true,
    };
  }

  // Parse dueDate YYYY-MM-DD
  const [dYear, dMonth, dDay] = loan.dueDate.split('-').map(Number);
  const [rYear, rMonth, rDay] = REFERENCE_DATE_STR.split('-').map(Number);
  const dueDate = new Date(dYear, dMonth - 1, dDay);
  const refDate = new Date(rYear, rMonth - 1, rDay);

  const diffTime = dueDate.getTime() - refDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0 || loan.status === 'OVERDUE') {
    const overdueDays = Math.abs(diffDays);
    return {
      category: 'OVERDUE',
      badgeLabel: 'Vencido',
      badgeClass: 'user-loans-badge--overdue',
      hintText: `Tienes ${overdueDays} ${overdueDays === 1 ? 'día' : 'días'} de retraso`,
      hintClass: 'user-loans-status-subtext user-loans-status-subtext--overdue',
      isOverdue: true,
      isDueSoon: false,
      isReturned: false,
    };
  }

  if (diffDays <= 3) {
    return {
      category: 'DUE_SOON',
      badgeLabel: 'Próximo a vencer',
      badgeClass: 'user-loans-badge--due-soon',
      hintText: diffDays === 1 ? 'Devuélvelo en 1 día' : diffDays === 0 ? 'Devuélvelo hoy' : `Devuélvelo en ${diffDays} días`,
      hintClass: 'user-loans-status-subtext user-loans-status-subtext--due-soon',
      isOverdue: false,
      isDueSoon: true,
      isReturned: false,
    };
  }

  return {
    category: 'ACTIVE',
    badgeLabel: 'Activo',
    badgeClass: 'user-loans-badge--active',
    hintText: `Faltan ${diffDays} días para devolverlo`,
    hintClass: 'user-loans-status-subtext',
    isOverdue: false,
    isDueSoon: false,
    isReturned: false,
  };
};

type LoanTabKey = 'active' | 'due-soon' | 'overdue' | 'history';

const TAB_OPTIONS: { key: LoanTabKey; label: string }[] = [
  { key: 'active', label: 'Activos' },
  { key: 'due-soon', label: 'Próximos a vencer' },
  { key: 'overdue', label: 'Vencidos' },
  { key: 'history', label: 'Historial' },
];

const PAGE_SIZE = 4;

export const UserLoansPage: React.FC = () => {
  const location = useLocation();

  const returnState = (location.state as {
    returnState?: {
      selectedTab?: LoanTabKey;
      currentPage?: number;
    };
  } | null)?.returnState;

  // Active filter tab & pagination
  const [selectedTab, setSelectedTab] = useState<LoanTabKey>(returnState?.selectedTab || 'active');
  const [currentPage, setCurrentPage] = useState<number>(returnState?.currentPage || 1);

  // Modals state
  const [selectedLoanForRenewal, setSelectedLoanForRenewal] = useState<Loan | null>(null);
  const [isRenewAllModalOpen, setIsRenewAllModalOpen] = useState<boolean>(false);
  const [contactLoan, setContactLoan] = useState<Loan | null>(null);

  // Live loans from /api/v1/data/mis-prestamos (filtered securely on backend)
  const [myLoans, setMyLoans] = useState<Loan[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadLoans = React.useCallback(() => {
    let active = true;
    setIsLoading(true);
    setErrorMsg(null);

    Promise.all([
      fetchMyLoans(),
      booksService.getAll(),
    ])
      .then(([loansData, booksData]) => {
        if (!active) return;
        setMyLoans(loansData || []);
        if (booksData && booksData.length > 0) {
          setAllBooks(booksData);
        }
      })
      .catch((err: any) => {
        if (!active) return;
        console.error('[UserLoansPage] Error cargando préstamos:', err);
        setErrorMsg(err?.message || 'No fue posible cargar tus préstamos en este momento.');
        setMyLoans([]);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  React.useEffect(() => {
    return loadLoans();
  }, [loadLoans]);

  // Metric counts (calculated globally from all user loans)
  const metrics = useMemo(() => {
    let active = 0;
    let dueSoon = 0;
    let overdue = 0;
    let returnedThisYear = 0;

    myLoans.forEach((loan) => {
      const urgency = getLoanUrgencyInfo(loan);
      if (loan.status === 'RETURNED' || loan.returnDate) {
        returnedThisYear += 1;
      } else {
        active += 1;
        if (urgency.isDueSoon) dueSoon += 1;
        if (urgency.isOverdue) overdue += 1;
      }
    });

    return { active, dueSoon, overdue, returnedThisYear };
  }, [myLoans]);

  // Tab filtering logic
  const filteredLoans = useMemo(() => {
    let list = [...myLoans];

    if (selectedTab === 'active') {
      list = list.filter((l) => l.status !== 'RETURNED' && !l.returnDate);
    } else if (selectedTab === 'due-soon') {
      list = list.filter((l) => {
        if (l.status === 'RETURNED' || l.returnDate) return false;
        const u = getLoanUrgencyInfo(l);
        return u.isDueSoon;
      });
    } else if (selectedTab === 'overdue') {
      list = list.filter((l) => {
        if (l.status === 'RETURNED' || l.returnDate) return false;
        const u = getLoanUrgencyInfo(l);
        return u.isOverdue;
      });
    } else if (selectedTab === 'history') {
      list = list.filter((l) => l.status === 'RETURNED' || !!l.returnDate);
    }

    // Stable sort: for active/overdue, by due date asc; for history, by return date desc
    list.sort((a, b) => {
      if (selectedTab === 'history') {
        const dateA = new Date(a.returnDate || a.dueDate).getTime() || 0;
        const dateB = new Date(b.returnDate || b.dueDate).getTime() || 0;
        return dateB - dateA;
      }
      const dateA = new Date(a.dueDate).getTime() || 0;
      const dateB = new Date(b.dueDate).getTime() || 0;
      return dateA - dateB;
    });

    return list;
  }, [myLoans, selectedTab]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredLoans.length / PAGE_SIZE));
  const currentLoans = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredLoans.slice(start, start + PAGE_SIZE);
  }, [filteredLoans, currentPage]);

  const handleTabChange = (tab: LoanTabKey) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="user-loans-page">
      {/* 1. Page Header */}
      <header className="user-loans-header">
        <div className="user-loans-header-info">
          <h1 className="user-loans-title">Mis préstamos</h1>
          <p className="user-loans-subtitle">
            Consulta tus libros prestados y sus fechas de devolución.
          </p>
        </div>

        <Link to="/user/catalog" className="user-loans-btn-catalog">
          <Search size={16} aria-hidden="true" />
          <span>Explorar catálogo</span>
        </Link>
      </header>

      {/* 2. Metric Counters Grid (4 Cards in a row) */}
      <section className="user-loans-metrics-grid" aria-label="Resumen de préstamos por estado">
        {/* Card 1: Préstamos activos */}
        <div className="user-loans-metric-card">
          <div className="user-loans-metric-icon-box user-loans-metric-icon--active" aria-hidden="true">
            <ClipboardCheck size={22} strokeWidth={2.3} />
          </div>
          <div className="user-loans-metric-content">
            <div className="user-loans-metric-number">{metrics.active}</div>
            <div className="user-loans-metric-label">Préstamos activos</div>
          </div>
        </div>

        {/* Card 2: Próximos a vencer */}
        <div className="user-loans-metric-card">
          <div className="user-loans-metric-icon-box user-loans-metric-icon--due-soon" aria-hidden="true">
            <Clock size={22} strokeWidth={2.3} />
          </div>
          <div className="user-loans-metric-content">
            <div className="user-loans-metric-number">{metrics.dueSoon}</div>
            <div className="user-loans-metric-label">Próximos a vencer</div>
          </div>
        </div>

        {/* Card 3: Vencidos */}
        <div className="user-loans-metric-card">
          <div className="user-loans-metric-icon-box user-loans-metric-icon--overdue" aria-hidden="true">
            <AlertTriangle size={22} strokeWidth={2.3} />
          </div>
          <div className="user-loans-metric-content">
            <div className="user-loans-metric-number">{metrics.overdue}</div>
            <div className="user-loans-metric-label">Vencidos</div>
          </div>
        </div>

        {/* Card 4: Devueltos este año */}
        <div className="user-loans-metric-card">
          <div className="user-loans-metric-icon-box user-loans-metric-icon--returned" aria-hidden="true">
            <CheckCircle2 size={22} strokeWidth={2.3} />
          </div>
          <div className="user-loans-metric-content">
            <div className="user-loans-metric-number">{metrics.returnedThisYear}</div>
            <div className="user-loans-metric-label">Devueltos este año</div>
          </div>
        </div>
      </section>

      {/* 3. Main Container Card */}
      <main className="user-loans-main-card">
        {/* Toolbar: Tabs & Renew All */}
        <div className="user-loans-toolbar">
          <nav className="user-loans-tabs" aria-label="Filtro de préstamos">
            {TAB_OPTIONS.map((tab) => {
              const isActive = selectedTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  className={`user-loans-tab-btn ${isActive ? 'user-loans-tab-btn--active' : ''}`}
                  onClick={() => handleTabChange(tab.key)}
                  aria-pressed={isActive}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            className="user-loans-btn-renew-all"
            onClick={() => setIsRenewAllModalOpen(true)}
            aria-label="Renovar todos los préstamos activos"
          >
            <RotateCw size={14} aria-hidden="true" />
            <span>Renovar todos</span>
          </button>
        </div>

        {/* List of Loans */}
        {isLoading ? (
          <div className="user-loans-empty-container">
            <RotateCw
              size={36}
              color="#2563EB"
              style={{ marginBottom: 12, animation: 'spin 1s linear infinite' }}
              aria-hidden="true"
            />
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1E293B', margin: '0 0 6px 0' }}>
              Cargando tus préstamos...
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#64748B', maxWidth: 420, margin: 0 }}>
              Consultando tus registros activos en la base de datos de la biblioteca.
            </p>
          </div>
        ) : errorMsg ? (
          <div className="user-loans-empty-container">
            <AlertTriangle size={36} color="#DC2626" aria-hidden="true" style={{ marginBottom: 12 }} />
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#991B1B', margin: '0 0 6px 0' }}>
              No se pudieron cargar los préstamos
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#64748B', maxWidth: 420, margin: '0 0 16px 0' }}>
              {errorMsg}
            </p>
            <button
              type="button"
              className="user-loans-tab-btn user-loans-tab-btn--active"
              onClick={loadLoans}
            >
              Reintentar consulta
            </button>
          </div>
        ) : myLoans.length === 0 ? (
          <div className="user-loans-empty-container">
            <Bookmark size={40} color="#94A3B8" aria-hidden="true" style={{ marginBottom: 12 }} />
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1E293B', margin: '0 0 6px 0' }}>
              Todavía no tienes préstamos
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#64748B', maxWidth: 420, margin: 0 }}>
              Cuando retires libros físicos del acervo, aparecerán registrados aquí con sus fechas de devolución.
            </p>
            <Link to="/user/catalog" className="user-loans-empty-btn">
              <BookOpen size={16} />
              <span>Explorar catálogo</span>
            </Link>
          </div>
        ) : filteredLoans.length === 0 ? (
          <div className="user-loans-empty-container">
            <Clock size={36} color="#94A3B8" aria-hidden="true" style={{ marginBottom: 12 }} />
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#1E293B', margin: '0 0 6px 0' }}>
              No hay préstamos en esta sección
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#64748B', margin: '0 0 16px 0' }}>
              No se encontraron préstamos que coincidan con la pestaña seleccionada.
            </p>
            <button
              type="button"
              className="user-loans-tab-btn user-loans-tab-btn--active"
              onClick={() => handleTabChange('active')}
            >
              Ver préstamos activos
            </button>
          </div>
        ) : (
          <div className="user-loans-list" role="feed" aria-label="Lista de préstamos de libros">
            {currentLoans.map((loan) => {
              const book = allBooks.find((b) => b.id === loan.bookId || b.title === loan.bookTitle);
              const author = book?.author || 'Autor registrado en biblioteca';
              const coverVisual = getBookCoverVisual(book);
              const urgency = getLoanUrgencyInfo(loan);
              const formattedCheckout = formatDisplayDate(loan.loanDate);
              const formattedDue = formatDisplayDate(loan.dueDate);
              const bookTitle = loan.bookTitle || book?.title || 'Libro sin título';
              const validBookId = loan.bookId?.trim() || book?.id;

              return (
                <article key={loan.id} className="user-loans-item">
                  {/* Column 1: Book Info & Thumbnail */}
                  <div className="user-loans-book-col">
                    <div
                      className="user-loans-cover-thumb"
                      style={{ background: coverVisual.gradient }}
                      aria-hidden="true"
                    >
                      {book?.coverUrl ? (
                        <img
                          src={book.coverUrl}
                          alt={`Portada de ${bookTitle}`}
                          className="user-loans-cover-img"
                        />
                      ) : (
                        <>
                          <div className="user-loans-cover-tag">{coverVisual.tag}</div>
                          <div className="user-loans-cover-center">{coverVisual.symbol}</div>
                          <div className="user-loans-cover-title">{bookTitle}</div>
                        </>
                      )}
                    </div>

                    <div className="user-loans-book-meta">
                      <span className="user-loans-folio">{loan.id}</span>
                      {validBookId ? (
                        <Link
                          to={`/user/catalog/${encodeURIComponent(validBookId)}`}
                          state={{
                            from: `${location.pathname}${location.search}`,
                            returnState: { selectedTab, currentPage },
                          }}
                          className="user-loans-book-title"
                          title={`Ver detalles del libro ${bookTitle}`}
                        >
                          {bookTitle}
                        </Link>
                      ) : (
                        <h2 className="user-loans-book-title" style={{ cursor: 'default' }}>
                          {bookTitle}
                        </h2>
                      )}
                      <p className="user-loans-book-author">{author}</p>
                    </div>
                  </div>

                  {/* Column 2: Dates */}
                  <div className="user-loans-dates-col">
                    <div className="user-loans-date-block">
                      <span className="user-loans-date-label">FECHA DE PRÉSTAMO</span>
                      <span className="user-loans-date-val">{formattedCheckout}</span>
                    </div>

                    <div className="user-loans-date-block">
                      <span className="user-loans-date-label">
                        {urgency.isReturned ? 'FECHA DE DEVOLUCIÓN' : 'FECHA LÍMITE'}
                      </span>
                      <span className="user-loans-date-val user-loans-date-val--bold">
                        {urgency.isReturned && loan.returnDate
                          ? formatDisplayDate(loan.returnDate)
                          : formattedDue}
                      </span>
                    </div>
                  </div>

                  {/* Column 3: Status Badge, Hint & Actions */}
                  <div className="user-loans-status-col">
                    <div className="user-loans-status-header">
                      <span className={`user-loans-badge ${urgency.badgeClass}`}>
                        <span className="user-loans-badge-dot" aria-hidden="true" />
                        <span>{urgency.badgeLabel}</span>
                      </span>
                      <p className={urgency.hintClass}>{urgency.hintText}</p>
                    </div>

                    <div className="user-loans-action-row">
                      {urgency.isOverdue ? (
                        <button
                          type="button"
                          className="user-loans-btn-contact"
                          onClick={() => setContactLoan(loan)}
                          aria-label={`Contactar a biblioteca para préstamo vencido ${loan.id}`}
                        >
                          Contactar biblioteca
                        </button>
                      ) : !urgency.isReturned ? (
                        <>
                          <button
                            type="button"
                            className="user-loans-btn-renew"
                            onClick={() => setSelectedLoanForRenewal(loan)}
                            aria-label={`Renovar préstamo ${loan.id}`}
                          >
                            <RotateCw size={13} aria-hidden="true" />
                            <span>Renovar préstamo</span>
                          </button>

                          {validBookId ? (
                            <Link
                              to={`/user/catalog/${encodeURIComponent(validBookId)}`}
                              state={{
                                from: `${location.pathname}${location.search}`,
                                returnState: { selectedTab, currentPage },
                              }}
                              className="user-loans-btn-detail"
                              aria-label={`Ver detalle del libro ${bookTitle}`}
                            >
                              Ver detalle
                            </Link>
                          ) : (
                            <button
                              type="button"
                              className="user-loans-btn-detail user-loans-btn-detail--disabled"
                              disabled
                              aria-disabled="true"
                              title="Recurso bibliográfico no disponible o sin identificador válido"
                              aria-label={`Recurso no disponible para el préstamo ${loan.id}`}
                            >
                              Ver detalle
                            </button>
                          )}
                        </>
                      ) : (
                        validBookId ? (
                          <Link
                            to={`/user/catalog/${encodeURIComponent(validBookId)}`}
                            state={{
                              from: `${location.pathname}${location.search}`,
                              returnState: { selectedTab, currentPage },
                            }}
                            className="user-loans-btn-detail"
                            aria-label={`Ver detalle del libro devuelto ${bookTitle}`}
                          >
                            Ver detalle
                          </Link>
                        ) : (
                          <button
                            type="button"
                            className="user-loans-btn-detail user-loans-btn-detail--disabled"
                            disabled
                            aria-disabled="true"
                            title="Recurso bibliográfico no disponible o sin identificador válido"
                            aria-label={`Recurso no disponible para el préstamo devuelto ${loan.id}`}
                          >
                            Ver detalle
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* 4. Informational Banner */}
        <aside className="user-loans-info-banner" aria-label="Aviso de renovación de libros">
          <Info size={20} className="user-loans-info-icon" aria-hidden="true" />
          <p className="user-loans-info-text">
            Puedes renovar un préstamo si el libro no ha sido solicitado por otra persona y si no tienes adeudos pendientes.
          </p>
        </aside>

        {/* 5. Pagination */}
        {totalPages > 1 && (
          <footer className="user-loans-footer">
            <nav className="user-loans-pagination" aria-label="Paginación de préstamos">
              <button
                type="button"
                className="user-loans-page-nav-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                aria-label="Página anterior"
              >
                Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  className={`user-loans-page-num-btn ${
                    currentPage === pageNum ? 'user-loans-page-num-btn--active' : ''
                  }`}
                  onClick={() => setCurrentPage(pageNum)}
                  aria-current={currentPage === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                className="user-loans-page-nav-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                aria-label="Página siguiente"
              >
                Siguiente
              </button>
            </nav>
          </footer>
        )}
      </main>

      {/* Modal: Solicitar Renovación Individual */}
      {selectedLoanForRenewal && (
        <div
          className="user-loans-modal-overlay"
          onClick={() => setSelectedLoanForRenewal(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="loan-renew-dialog-title"
        >
          <div className="user-loans-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="user-loans-modal-header">
              <h3 id="loan-renew-dialog-title" className="user-loans-modal-title">
                Renovación de Préstamo #{selectedLoanForRenewal.id}
              </h3>
              <button
                type="button"
                className="user-loans-modal-close-btn"
                onClick={() => setSelectedLoanForRenewal(null)}
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="user-loans-modal-body">
              <p style={{ margin: 0 }}>
                Estás solicitando la extensión del plazo para{' '}
                <strong>{selectedLoanForRenewal.bookTitle}</strong>.
              </p>
              <div className="user-loans-modal-meta-grid">
                <div className="user-loans-modal-meta-item">
                  <span className="user-loans-modal-meta-label">Fecha Límite Actual</span>
                  <span className="user-loans-modal-meta-val">
                    {formatDisplayDate(selectedLoanForRenewal.dueDate)}
                  </span>
                </div>
                <div className="user-loans-modal-meta-item">
                  <span className="user-loans-modal-meta-label">Renovaciones Disponibles</span>
                  <span className="user-loans-modal-meta-val">
                    {Math.max(0, 2 - selectedLoanForRenewal.renewalsCount)} disponibles
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0 }}>
                El trámite de renovación directa en línea se encuentra en validación por el departamento de biblioteca. Por favor confirma la solicitud en el mostrador central con tu credencial universitaria.
              </p>
            </div>

            <div className="user-loans-modal-actions">
              <button
                type="button"
                className="user-loans-modal-btn-primary"
                onClick={() => setSelectedLoanForRenewal(null)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Modal: Renovar Todos */}
      {isRenewAllModalOpen && (
        <div
          className="user-loans-modal-overlay"
          onClick={() => setIsRenewAllModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="renew-all-dialog-title"
        >
          <div className="user-loans-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="user-loans-modal-header">
              <h3 id="renew-all-dialog-title" className="user-loans-modal-title">
                Renovación Masiva de Préstamos
              </h3>
              <button
                type="button"
                className="user-loans-modal-close-btn"
                onClick={() => setIsRenewAllModalOpen(false)}
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="user-loans-modal-body">
              <p style={{ margin: 0 }}>
                Tienes <strong>{metrics.active}</strong> libros en posesión activa.
              </p>
              <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0 }}>
                La renovación en bloque evalúa automáticamente que cada título no cuente con lista de espera de otros estudiantes y que no existan adeudos pendientes en tu cuenta bibliotecaria.
              </p>
            </div>

            <div className="user-loans-modal-actions">
              <button
                type="button"
                className="user-loans-modal-btn-primary"
                onClick={() => setIsRenewAllModalOpen(false)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Modal: Contactar Biblioteca */}
      {contactLoan && (
        <div
          className="user-loans-modal-overlay"
          onClick={() => setContactLoan(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-library-title"
        >
          <div className="user-loans-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="user-loans-modal-header">
              <h3 id="contact-library-title" className="user-loans-modal-title">
                Atención a Préstamo Vencido
              </h3>
              <button
                type="button"
                className="user-loans-modal-close-btn"
                onClick={() => setContactLoan(null)}
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="user-loans-modal-body">
              <p style={{ margin: 0 }}>
                El préstamo del libro <strong>{contactLoan.bookTitle}</strong> (Folio <strong>{contactLoan.id}</strong>) presenta días de retraso. Para regularizar tu estatus y evitar restricciones en nuevas solicitudes, favor de contactar al departamento de biblioteca:
              </p>

              <div className="user-loans-modal-meta-grid" style={{ gridTemplateColumns: '1fr' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem' }}>
                  <MapPin size={16} color="#2563EB" />
                  <span>Ventanilla central de biblioteca, Edificio A (Planta baja)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem' }}>
                  <Clock size={16} color="#2563EB" />
                  <span>Lunes a viernes de 8:00 a 19:00 hrs</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem' }}>
                  <Mail size={16} color="#2563EB" />
                  <span>biblioteca@acervo.edu.mx</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem' }}>
                  <Phone size={16} color="#2563EB" />
                  <span>(618) 123-4567 ext. 204</span>
                </div>
              </div>
            </div>

            <div className="user-loans-modal-actions">
              <button
                type="button"
                className="user-loans-modal-btn-primary"
                onClick={() => setContactLoan(null)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
