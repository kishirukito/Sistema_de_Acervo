import React, { useState, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  FileText,
  RotateCcw,
  Search,
  AlertCircle,
  Code,
  BookOpen,
  Infinity as InfinityIcon,
  Bookmark,
} from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';
import { MOCK_BOOKS } from '../../mocks/data';
import type { Book, BorrowRequest, RequestStatus } from '../../types';
import {
  getUserBorrowRequests,
  cancelBorrowRequest,
  formatSuggestedDate,
} from '../../features/loans/requests.service';
import { resolveCategory } from '../../constants';
import { CustomSelect } from '../../components/ui/CustomSelect';
import './UserRequestsPage.css';

interface CoverVisualMetadata {
  gradient: string;
  symbol: React.ReactNode;
  tag: string;
}

/**
 * Generates aesthetic gradients and symbolic icons matching project identity.
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
      symbol: <span style={{ fontSize: '0.9375rem', fontWeight: 700, fontFamily: 'monospace', color: '#FFF', lineHeight: 1 }}>{'{ }'}</span>,
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

type FilterTabKey = 'all' | 'pending' | 'ready' | 'approved' | 'rejected' | 'cancelled';

const FILTER_TABS: { key: FilterTabKey; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'pending', label: 'Pendientes' },
  { key: 'ready', label: 'Listas para recoger' },
  { key: 'approved', label: 'Aprobadas' },
  { key: 'rejected', label: 'Rechazadas' },
  { key: 'cancelled', label: 'Canceladas' },
];

const PAGE_SIZE = 4;

export const UserRequestsPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const returnState = (location.state as {
    returnState?: {
      selectedTab?: FilterTabKey;
      sortOrder?: 'recent' | 'oldest';
      currentPage?: number;
    };
  } | null)?.returnState;

  // Active filter tab & sorting
  const [selectedTab, setSelectedTab] = useState<FilterTabKey>(returnState?.selectedTab || 'all');
  const [sortOrder, setSortOrder] = useState<'recent' | 'oldest'>(returnState?.sortOrder || 'recent');
  const [currentPage, setCurrentPage] = useState<number>(returnState?.currentPage || 1);

  // Cancellation modal state
  const [cancellingRequest, setCancellingRequest] = useState<BorrowRequest | null>(null);
  const [cancelFeedback, setCancelFeedback] = useState<string | null>(null);

  // Retrieve all user requests (merges persisted and in-memory mock items)
  const allUserRequests = useMemo(() => {
    return getUserBorrowRequests(user);
  }, [user, cancelFeedback]);

  // Metric counts (calculated globally from all user requests)
  const metrics = useMemo(() => {
    const pending = allUserRequests.filter((r) => r.status === 'PENDING').length;
    const ready = allUserRequests.filter((r) => r.status === 'READY_FOR_PICKUP').length;
    const approved = allUserRequests.filter((r) => r.status === 'APPROVED').length;
    const finished = allUserRequests.filter(
      (r) => r.status === 'REJECTED' || r.status === 'CANCELLED' || r.status === 'EXPIRED'
    ).length;

    return { pending, ready, approved, finished };
  }, [allUserRequests]);

  // Tab filtering logic
  const filteredRequests = useMemo(() => {
    let list = [...allUserRequests];

    if (selectedTab === 'pending') {
      list = list.filter((r) => r.status === 'PENDING');
    } else if (selectedTab === 'ready') {
      list = list.filter((r) => r.status === 'READY_FOR_PICKUP');
    } else if (selectedTab === 'approved') {
      list = list.filter((r) => r.status === 'APPROVED');
    } else if (selectedTab === 'rejected') {
      list = list.filter((r) => r.status === 'REJECTED');
    } else if (selectedTab === 'cancelled') {
      list = list.filter((r) => r.status === 'CANCELLED' || r.status === 'EXPIRED');
    }

    // Sort by request date
    list.sort((a, b) => {
      const dateA = new Date(a.requestDate).getTime() || 0;
      const dateB = new Date(b.requestDate).getTime() || 0;
      return sortOrder === 'recent' ? dateB - dateA : dateA - dateB;
    });

    return list;
  }, [allUserRequests, selectedTab, sortOrder]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / PAGE_SIZE));
  const currentRequests = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredRequests.slice(start, start + PAGE_SIZE);
  }, [filteredRequests, currentPage]);

  // Handle Tab switch
  const handleTabChange = (tab: FilterTabKey) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  // Open cancellation confirmation dialog
  const handleOpenCancel = (req: BorrowRequest) => {
    setCancellingRequest(req);
  };

  // Confirm cancellation
  const handleConfirmCancel = useCallback(() => {
    if (!cancellingRequest) return;
    const result = cancelBorrowRequest(cancellingRequest.id, user);
    if (result) {
      setCancelFeedback(`La solicitud ${cancellingRequest.id} fue cancelada correctamente.`);
    }
    setCancellingRequest(null);
  }, [cancellingRequest, user]);

  // Helper to render status badge
  const renderStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="user-requests-badge user-requests-badge--pending">
            <span className="user-requests-badge-dot" aria-hidden="true" />
            <span>Pendiente de revisión</span>
          </span>
        );
      case 'READY_FOR_PICKUP':
        return (
          <span className="user-requests-badge user-requests-badge--ready">
            <span className="user-requests-badge-dot" aria-hidden="true" />
            <span>Listo para recoger</span>
          </span>
        );
      case 'APPROVED':
        return (
          <span className="user-requests-badge user-requests-badge--approved">
            <span className="user-requests-badge-dot" aria-hidden="true" />
            <span>Aprobada</span>
          </span>
        );
      case 'REJECTED':
        return (
          <span className="user-requests-badge user-requests-badge--rejected">
            <span className="user-requests-badge-dot" aria-hidden="true" />
            <span>Rechazada</span>
          </span>
        );
      case 'CANCELLED':
      case 'EXPIRED':
      default:
        return (
          <span className="user-requests-badge user-requests-badge--cancelled">
            <span className="user-requests-badge-dot" aria-hidden="true" />
            <span>Cancelada</span>
          </span>
        );
    }
  };

  // Helper to get status contextual message
  const getStatusHint = (req: BorrowRequest): string => {
    if (req.notes && req.status !== 'CANCELLED') {
      return req.notes;
    }
    switch (req.status) {
      case 'PENDING':
        return 'Tu solicitud será revisada próximamente.';
      case 'READY_FOR_PICKUP':
        return 'Recógelo antes del 10 oct. 2026';
      case 'APPROVED':
        return 'Estamos preparando tu ejemplar.';
      case 'REJECTED':
        return 'No hay ejemplares disponibles actualmente.';
      case 'CANCELLED':
        return 'Solicitud cancelada por el usuario.';
      case 'EXPIRED':
        return 'El plazo para recoger el libro ha expirado.';
      default:
        return '';
    }
  };

  return (
    <div className="user-requests-page">
      {/* 1. Page Header */}
      <header className="user-requests-header">
        <div className="user-requests-header-info">
          <h1 className="user-requests-title">Mis solicitudes</h1>
          <p className="user-requests-subtitle">
            Consulta el estado de los libros que has solicitado.
          </p>
        </div>

        <Link to="/user/catalog" className="user-requests-btn-catalog">
          <Search size={16} aria-hidden="true" />
          <span>Explorar catálogo</span>
        </Link>
      </header>

      {/* 2. Metric Counters Grid (4 Cards in a row) */}
      <section className="user-requests-metrics-grid" aria-label="Resumen de solicitudes por estado">
        {/* Card 1: Pendientes */}
        <div className="user-requests-metric-card">
          <div className="user-requests-metric-icon-box user-requests-metric-icon--pending" aria-hidden="true">
            <Clock size={22} strokeWidth={2.4} />
          </div>
          <div className="user-requests-metric-content">
            <div className="user-requests-metric-number">{metrics.pending}</div>
            <div className="user-requests-metric-label">Pendientes</div>
          </div>
        </div>

        {/* Card 2: Listas para recoger */}
        <div className="user-requests-metric-card">
          <div className="user-requests-metric-icon-box user-requests-metric-icon--ready" aria-hidden="true">
            <CheckCircle2 size={22} strokeWidth={2.4} />
          </div>
          <div className="user-requests-metric-content">
            <div className="user-requests-metric-number">{metrics.ready}</div>
            <div className="user-requests-metric-label">Listas para recoger</div>
          </div>
        </div>

        {/* Card 3: Aprobadas */}
        <div className="user-requests-metric-card">
          <div className="user-requests-metric-icon-box user-requests-metric-icon--approved" aria-hidden="true">
            <FileText size={22} strokeWidth={2.4} />
          </div>
          <div className="user-requests-metric-content">
            <div className="user-requests-metric-number">{metrics.approved}</div>
            <div className="user-requests-metric-label">Aprobadas</div>
          </div>
        </div>

        {/* Card 4: Finalizadas */}
        <div className="user-requests-metric-card">
          <div className="user-requests-metric-icon-box user-requests-metric-icon--finished" aria-hidden="true">
            <RotateCcw size={22} strokeWidth={2.4} />
          </div>
          <div className="user-requests-metric-content">
            <div className="user-requests-metric-number">{metrics.finished}</div>
            <div className="user-requests-metric-label">Finalizadas</div>
          </div>
        </div>
      </section>

      {/* 3. Main Container Card (Tabs, List, Pagination) */}
      <main className="user-requests-main-card">
        {/* Toolbar: Filter Tabs & Sorting */}
        <div className="user-requests-toolbar">
          <nav className="user-requests-tabs" aria-label="Filtro de solicitudes">
            {FILTER_TABS.map((tab) => {
              const isActive = selectedTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  className={`user-requests-tab-btn ${isActive ? 'user-requests-tab-btn--active' : ''}`}
                  onClick={() => handleTabChange(tab.key)}
                  aria-pressed={isActive}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="user-requests-sort-wrapper">
            <span className="user-requests-sort-label">Ordenar por:</span>
            <CustomSelect
              id="user-requests-sort-select"
              variant="inline"
              value={sortOrder}
              onChange={(val) => {
                setSortOrder(val as 'recent' | 'oldest');
                setCurrentPage(1);
              }}
              options={[
                { value: 'recent', label: 'Más recientes' },
                { value: 'oldest', label: 'Más antiguas' },
              ]}
              fullWidth={false}
              align="right"
            />
          </div>
        </div>

        {/* List of Requests */}
        {allUserRequests.length === 0 ? (
          <div className="user-requests-empty-container">
            <Bookmark size={40} color="#94A3B8" aria-hidden="true" style={{ marginBottom: 12 }} />
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1E293B', margin: '0 0 6px 0' }}>
              Todavía no tienes solicitudes
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#64748B', maxWidth: 400, margin: 0 }}>
              Explora el catálogo y solicita el material que necesites para tus materias.
            </p>
            <Link to="/user/catalog" className="user-requests-empty-btn">
              <BookOpen size={16} />
              <span>Explorar catálogo</span>
            </Link>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="user-requests-empty-container">
            <AlertCircle size={36} color="#94A3B8" aria-hidden="true" style={{ marginBottom: 12 }} />
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#1E293B', margin: '0 0 6px 0' }}>
              No hay solicitudes en esta sección
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#64748B', margin: '0 0 16px 0' }}>
              No se encontraron solicitudes con el filtro seleccionado.
            </p>
            <button
              type="button"
              className="user-requests-tab-btn user-requests-tab-btn--active"
              onClick={() => handleTabChange('all')}
            >
              Ver todas las solicitudes
            </button>
          </div>
        ) : (
          <div className="user-requests-list" role="feed" aria-label="Lista de solicitudes de préstamo">
            {currentRequests.map((req) => {
              const book = MOCK_BOOKS.find((b) => b.id === req.bookId || b.title === req.bookTitle);
              const author = book?.author || 'Autor registrado en biblioteca';
              const coverVisual = getBookCoverVisual(book);
              const formattedDate = formatSuggestedDate(req.requestDate);
              const pickupLocation = req.pickupLocation || 'Biblioteca principal';
              const hintText = getStatusHint(req);
              const bookTitle = req.bookTitle || book?.title || 'Libro sin título';
              const validBookId = req.bookId?.trim() || book?.id;

              return (
                <article key={req.id} className="user-requests-item">
                  {/* Column 1: Book Info & Thumbnail */}
                  <div className="user-requests-book-col">
                    <div
                      className="user-requests-cover-thumb"
                      style={{ background: coverVisual.gradient }}
                      aria-hidden="true"
                    >
                      {book?.coverUrl ? (
                        <img
                          src={book.coverUrl}
                          alt={`Portada de ${bookTitle}`}
                          className="user-requests-cover-img"
                        />
                      ) : (
                        <>
                          <div className="user-requests-cover-tag">{coverVisual.tag}</div>
                          <div className="user-requests-cover-center">{coverVisual.symbol}</div>
                          <div className="user-requests-cover-title">{bookTitle}</div>
                        </>
                      )}
                    </div>

                    <div className="user-requests-book-meta">
                      <span className="user-requests-folio">{req.id}</span>
                      {validBookId ? (
                        <Link
                          to={`/user/catalog/${encodeURIComponent(validBookId)}`}
                          state={{
                            from: `${location.pathname}${location.search}`,
                            returnState: { selectedTab, sortOrder, currentPage },
                          }}
                          className="user-requests-book-title-link"
                          title={`Ver detalles del libro ${bookTitle}`}
                        >
                          <h2 className="user-requests-book-title">{bookTitle}</h2>
                        </Link>
                      ) : (
                        <h2 className="user-requests-book-title">{bookTitle}</h2>
                      )}
                      <p className="user-requests-book-author">{author}</p>
                    </div>
                  </div>

                  {/* Column 2: Date & Pickup Location */}
                  <div className="user-requests-details-col">
                    <div className="user-requests-meta-block">
                      <span className="user-requests-meta-label">Fecha de solicitud</span>
                      <span className="user-requests-meta-value">{formattedDate}</span>
                    </div>

                    <div className="user-requests-meta-block">
                      <span className="user-requests-meta-label">Lugar de recogida</span>
                      <span className="user-requests-meta-value">{pickupLocation}</span>
                    </div>
                  </div>

                  {/* Column 3: Status Badge, Hint & Actions */}
                  <div className="user-requests-status-col">
                    <div className="user-requests-status-info">
                      {renderStatusBadge(req.status)}
                      {hintText && <p className="user-requests-status-hint">{hintText}</p>}
                    </div>

                    <div className="user-requests-action-box">
                      {req.status === 'PENDING' && (
                        <button
                          type="button"
                          className="user-requests-btn-cancel-req"
                          onClick={() => handleOpenCancel(req)}
                          aria-label={`Cancelar solicitud ${req.id} para ${req.bookTitle}`}
                        >
                          Cancelar solicitud
                        </button>
                      )}

                      {(req.status === 'READY_FOR_PICKUP' || req.status === 'APPROVED') && (
                        validBookId ? (
                          <Link
                            to={`/user/catalog/${encodeURIComponent(validBookId)}`}
                            state={{
                              from: `${location.pathname}${location.search}`,
                              returnState: { selectedTab, sortOrder, currentPage },
                            }}
                            className="user-requests-btn-detail"
                            aria-label={`Ver detalle del libro ${bookTitle}`}
                          >
                            Ver detalle
                          </Link>
                        ) : (
                          <button
                            type="button"
                            className="user-requests-btn-detail user-requests-btn-detail--disabled"
                            disabled
                            aria-disabled="true"
                            title="Recurso bibliográfico no disponible o sin identificador válido"
                            aria-label={`Recurso no disponible para la solicitud ${req.id}`}
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

        {/* 4. Footer: Status Legend & Pagination */}
        <footer className="user-requests-footer">
          {/* Status Legend */}
          <div className="user-requests-legend" aria-label="Leyenda de estados">
            <span className="user-requests-legend-title">ESTADOS</span>

            <span className="user-requests-legend-item">
              <span className="user-requests-legend-dot" style={{ backgroundColor: '#F59E0B' }} aria-hidden="true" />
              <span>Pendiente</span>
            </span>

            <span className="user-requests-legend-item">
              <span className="user-requests-legend-dot" style={{ backgroundColor: '#3B82F6' }} aria-hidden="true" />
              <span>Aprobada</span>
            </span>

            <span className="user-requests-legend-item">
              <span className="user-requests-legend-dot" style={{ backgroundColor: '#16A34A' }} aria-hidden="true" />
              <span>Lista para recoger</span>
            </span>

            <span className="user-requests-legend-item">
              <span className="user-requests-legend-dot" style={{ backgroundColor: '#EF4444' }} aria-hidden="true" />
              <span>Rechazada</span>
            </span>

            <span className="user-requests-legend-item">
              <span className="user-requests-legend-dot" style={{ backgroundColor: '#94A3B8' }} aria-hidden="true" />
              <span>Cancelada</span>
            </span>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <nav className="user-requests-pagination" aria-label="Paginación de solicitudes">
              <button
                type="button"
                className="user-requests-page-nav-btn"
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
                  className={`user-requests-page-num-btn ${
                    currentPage === pageNum ? 'user-requests-page-num-btn--active' : ''
                  }`}
                  onClick={() => setCurrentPage(pageNum)}
                  aria-current={currentPage === pageNum ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                className="user-requests-page-nav-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                aria-label="Página siguiente"
              >
                Siguiente
              </button>
            </nav>
          )}
        </footer>
      </main>

      {/* 5. Cancel Confirmation Modal */}
      {cancellingRequest && (
        <div
          className="user-requests-modal-overlay"
          onClick={() => setCancellingRequest(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-dialog-title"
        >
          <div className="user-requests-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="user-requests-modal-icon" aria-hidden="true">
              <AlertCircle size={28} />
            </div>

            <h3 id="cancel-dialog-title" className="user-requests-modal-title">
              ¿Cancelar solicitud de préstamo?
            </h3>

            <p className="user-requests-modal-desc">
              ¿Estás seguro de que deseas cancelar la solicitud para{' '}
              <strong>{cancellingRequest.bookTitle}</strong> (Folio{' '}
              <strong>{cancellingRequest.id}</strong>)? Esta acción no se puede deshacer y su
              estado pasará a <strong>Cancelada</strong>.
            </p>

            <div className="user-requests-modal-actions">
              <button
                type="button"
                className="user-requests-modal-btn-cancel"
                onClick={() => setCancellingRequest(null)}
              >
                No, conservar
              </button>
              <button
                type="button"
                className="user-requests-modal-btn-confirm"
                onClick={handleConfirmCancel}
              >
                Sí, cancelar solicitud
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
