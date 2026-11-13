import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  CheckCircle,
  Ban,
  Star,
  Landmark,
  Clock,
  Sparkles,
  Code,
  Infinity as InfinityIcon,
  X,
  Info,
} from 'lucide-react';
import clsx from 'clsx';
import { MOCK_BOOKS } from '../../mocks/data';
import type { Book } from '../../types';
import { resolveCategory, getCategoryName } from '../../constants';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { useAllBooks } from '../../features/catalog/books.query';
import './UserBookDetailPage.css';

interface CoverVisualMetadata {
  gradient: string;
  symbol: React.ReactNode;
  tag: string;
}

/**
 * Generates aesthetic gradients and symbolic icons matching Figma designs.
 */
const getBookCoverVisual = (book: Book): CoverVisualMetadata => {
  if (book.id === 'book-python') {
    return {
      gradient: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 55%, #60A5FA 100%)',
      symbol: <Code size={48} color="#FFFFFF" strokeWidth={2.5} />,
      tag: 'BIBLIOTECA INTELIGENTE',
    };
  }

  if (book.id === 'book-soledad') {
    return {
      gradient: 'linear-gradient(135deg, #065F46 0%, #059669 44%, #EAB308 76%, #F59E0B 100%)',
      symbol: <InfinityIcon size={48} color="#FFFFFF" strokeWidth={2.5} />,
      tag: 'BIBLIOTECA',
    };
  }

  if (book.id === 'book-principito') {
    return {
      gradient: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 42%, #F59E0B 75%, #D97706 100%)',
      symbol: <Sparkles size={46} color="#FFFFFF" />,
      tag: 'BIBLIOTECA',
    };
  }

  if (book.id === 'book-fundamentos-prog') {
    return {
      gradient: 'linear-gradient(145deg, #312E81 0%, #4338CA 50%, #6366F1 100%)',
      symbol: <span style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'monospace' }}>{'{ }'}</span>,
      tag: 'BIBLIOTECA',
    };
  }

  if (book.id === 'book-js') {
    return {
      gradient: 'linear-gradient(145deg, #78350F 0%, #B45309 50%, #F59E0B 100%)',
      symbol: <span style={{ fontSize: '2.4rem', fontWeight: 800 }}>JS</span>,
      tag: 'BIBLIOTECA',
    };
  }

  if (book.id === 'book-algoritmos') {
    return {
      gradient: 'linear-gradient(145deg, #134E4A 0%, #0F766E 50%, #14B8A6 100%)',
      symbol: <span style={{ fontSize: '2.4rem', fontWeight: 800 }}>01</span>,
      tag: 'BIBLIOTECA',
    };
  }

  // Fallback visual based on Dewey Category
  const cat = resolveCategory(book.category);
  const code = cat?.code || '000';

  switch (code) {
    case '000':
      return {
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
        symbol: <Code size={44} color="#FFFFFF" strokeWidth={2.2} />,
        tag: 'BIBLIOTECA',
      };
    case '100':
      return {
        gradient: 'linear-gradient(135deg, #7C2D12 0%, #D97706 100%)',
        symbol: <Sparkles size={44} color="#FFFFFF" />,
        tag: 'BIBLIOTECA',
      };
    case '200':
      return {
        gradient: 'linear-gradient(135deg, #4C1D95 0%, #8B5CF6 100%)',
        symbol: <Sparkles size={44} color="#FFFFFF" />,
        tag: 'BIBLIOTECA',
      };
    case '300':
      return {
        gradient: 'linear-gradient(135deg, #0369A1 0%, #0284C7 100%)',
        symbol: <span style={{ fontSize: '2.4rem', fontWeight: 700 }}>§</span>,
        tag: 'BIBLIOTECA',
      };
    case '400':
      return {
        gradient: 'linear-gradient(135deg, #B45309 0%, #F59E0B 100%)',
        symbol: <span style={{ fontSize: '2.4rem', fontWeight: 700 }}>Aa</span>,
        tag: 'BIBLIOTECA',
      };
    case '500':
      return {
        gradient: 'linear-gradient(135deg, #047857 0%, #10B981 100%)',
        symbol: <span style={{ fontSize: '2.4rem', fontWeight: 700 }}>⚗</span>,
        tag: 'BIBLIOTECA',
      };
    case '600':
      return {
        gradient: 'linear-gradient(135deg, #0E7490 0%, #06B6D4 100%)',
        symbol: <span style={{ fontSize: '2.4rem', fontWeight: 700 }}>⚙</span>,
        tag: 'BIBLIOTECA',
      };
    case '700':
      return {
        gradient: 'linear-gradient(135deg, #BE185D 0%, #F43F5E 100%)',
        symbol: <span style={{ fontSize: '2.4rem', fontWeight: 700 }}>◈</span>,
        tag: 'BIBLIOTECA',
      };
    case '800':
      return {
        gradient: 'linear-gradient(135deg, #1D4ED8 0%, #D97706 100%)',
        symbol: <InfinityIcon size={44} color="#FFFFFF" strokeWidth={2} />,
        tag: 'BIBLIOTECA',
      };
    case '900':
    default:
      return {
        gradient: 'linear-gradient(135deg, #9A3412 0%, #EA580C 100%)',
        symbol: <span style={{ fontSize: '2.2rem', fontWeight: 800 }}>MX</span>,
        tag: 'BIBLIOTECA',
      };
  }
};

export const UserBookDetailPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top upon navigating to a new book
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [bookId]);

  // ── React Query: obtiene todos los libros desde caché compartida ──────────
  // Si UserCatalogPage o UserHomePage ya cargaron los datos, no hay petición nueva.
  // El selector extrae el libro que interesa sin re-render por los demás.
  const { data: allCatalogBooks = MOCK_BOOKS, isLoading: loadingAll } = useAllBooks();

  const book: Book | null = useMemo(
    () => allCatalogBooks.find((b) => b.id === bookId) ?? MOCK_BOOKS.find((b) => b.id === bookId) ?? null,
    [allCatalogBooks, bookId]
  );

  // isLoading solo en primera visita (caché fría); en regreso es false inmediatamente
  const loading = loadingAll && !book;

  // Favorite toggle state
  const [isFavorite, setIsFavorite] = useState(false);

  // In-development notification for "Solicitar préstamo"
  const [showLoanNotice, setShowLoanNotice] = useState(false);

  // Fallback for image loading error
  const [coverImageError, setCoverImageError] = useState(false);

  // Determine back navigation target
  const originFromState = (location.state as { from?: string } | null)?.from;
  const backTargetUrl =
    originFromState && originFromState.startsWith('/user/')
      ? originFromState
      : '/user/catalog';

  const backLinkText = useMemo(() => {
    if (!originFromState) return 'Volver al catálogo';
    if (originFromState.startsWith('/user/home')) return 'Volver a inicio';
    if (originFromState.startsWith('/user/requests')) return 'Volver a mis solicitudes';
    if (originFromState.startsWith('/user/loans')) return 'Volver a mis préstamos';
    if (originFromState.startsWith('/user/catalog')) return 'Volver al catálogo';
    return 'Volver al catálogo';
  }, [originFromState]);

  // Find up to 3 similar books
  const similarBooks = useMemo(() => {
    if (!book) return [];
    const bookCatCode = resolveCategory(book.category)?.code || '000';

    // 1. Books with same category code
    const sameCategory = allCatalogBooks.filter(
      (b) => b.id !== book.id && resolveCategory(b.category)?.code === bookCatCode
    );

    // 2. Fallbacks if fewer than 3
    const others = allCatalogBooks.filter(
      (b) => b.id !== book.id && resolveCategory(b.category)?.code !== bookCatCode
    );

    return [...sameCategory, ...others].slice(0, 3);
  }, [book, allCatalogBooks]);

  // Loading state while fetching book from database
  if (loading) {
    return (
      <div className="book-detail-page" role="main">
        <nav aria-label="Ruta de navegación">
          <Link
            to={backTargetUrl}
            state={location.state}
            className="book-detail-back-link"
            aria-label={backLinkText}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>{backLinkText}</span>
          </Link>
        </nav>

        <Card>
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem', gap: '1rem', color: '#6B7280' }}>
              <div style={{ width: '36px', height: '36px', border: '3px solid #E5E7EB', borderTopColor: '#2563EB', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 500 }}>Cargando información del acervo...</p>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  // If book does not exist in catalog
  if (!book) {
    return (
      <div className="book-detail-page" role="main">
        <nav aria-label="Ruta de navegación">
          <Link
            to={backTargetUrl}
            state={location.state}
            className="book-detail-back-link"
            aria-label={backLinkText}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>{backLinkText}</span>
          </Link>
        </nav>

        <Card>
          <CardBody>
            <EmptyState
              title="Libro no encontrado"
              description={`El recurso con identificador "${bookId || ''}" no existe o fue retirado del acervo bibliográfico.`}
              action={
                <Button
                  variant="primary"
                  onClick={() => navigate(backTargetUrl, { state: location.state })}
                >
                  {backLinkText}
                </Button>
              }
            />
          </CardBody>
        </Card>
      </div>
    );
  }

  const isAvailable = book.availableCopies > 0;
  const borrowedCopies = Math.max(0, book.totalCopies - book.availableCopies);
  const categoryName = getCategoryName(book.category) || 'Tecnología';
  const coverVisual = getBookCoverVisual(book);

  const rating = book.rating ?? 4.5;
  const reviewsCount = book.reviewsCount ?? 28;
  const topics = book.topics && book.topics.length > 0
    ? book.topics
    : [categoryName, 'Programación', 'Desarrollo web', 'Tecnología'];

  const handleRequestLoanClick = () => {
    if (!isAvailable) return;
    navigate(`/user/catalog/${book.id}/request`);
  };

  return (
    <article className="book-detail-page" aria-labelledby="book-detail-title">
      {/* Back button */}
      <nav aria-label="Navegación de retorno">
        <Link
          to={backTargetUrl}
          state={location.state}
          className="book-detail-back-link"
          aria-label={backLinkText}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>{backLinkText}</span>
        </Link>
      </nav>

      {/* Loan Feature Notification */}
      {showLoanNotice && (
        <aside
          className="book-detail-notice"
          role="status"
          aria-live="polite"
        >
          <div className="book-detail-notice-content">
            <Info size={20} aria-hidden="true" />
            <span>
              La funcionalidad de solicitud de préstamo en línea se habilitará próximamente.
              Por favor, acude con tu credencial al mostrador de biblioteca para tramitar este ejemplar.
            </span>
          </div>
          <button
            type="button"
            className="book-detail-notice-close"
            onClick={() => setShowLoanNotice(false)}
            aria-label="Cerrar aviso informativo"
          >
            <X size={16} />
          </button>
        </aside>
      )}

      {/* 1. Hero Section Card */}
      <section className="book-detail-hero-card" aria-label="Ficha principal del libro">
        {/* Left: Book Cover */}
        <div
          className="book-detail-cover-wrapper"
          style={{ background: coverVisual.gradient }}
          aria-label={`Portada del libro ${book.title}`}
        >
          {book.coverUrl && !coverImageError ? (
            <img
              src={book.coverUrl}
              alt={`Portada de ${book.title}`}
              className="book-detail-cover-img"
              onError={() => setCoverImageError(true)}
            />
          ) : (
            <>
              {/* Header inside cover */}
              <div className="book-detail-cover-tag">{coverVisual.tag}</div>

              {/* Central Graphic Symbol */}
              <div className="book-detail-cover-center" aria-hidden="true">
                {coverVisual.symbol}
              </div>

              {/* Bottom Metadata inside cover */}
              <div className="book-detail-cover-footer">
                <div className="book-detail-cover-title">{book.title}</div>
                <div className="book-detail-cover-author">{book.author}</div>
              </div>
            </>
          )}

          {/* Bookmark Round Button */}
          <button
            type="button"
            className="book-detail-cover-bookmark-btn"
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            title={isFavorite ? 'Guardado en favoritos' : 'Guardar en favoritos'}
          >
            <Bookmark
              size={18}
              fill={isFavorite ? '#2563EB' : 'transparent'}
              color="#2563EB"
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Right: Book Information & Actions */}
        <div className="book-detail-hero-info">
          {/* Category Pill Tag */}
          <span className="book-detail-category-badge">{categoryName}</span>

          {/* Title */}
          <h1 id="book-detail-title" className="book-detail-title">
            {book.title}
          </h1>

          {/* Author & Year Line */}
          <div className="book-detail-byline">
            <span>por</span>
            <span className="book-detail-author-highlight">{book.author}</span>
            <span aria-hidden="true">·</span>
            <span>{book.publishYear ? book.publishYear : 'No disponible'}</span>
          </div>

          {/* Rating */}
          <div className="book-detail-rating-row" aria-label={`Calificación ${rating} de 5 estrellas`}>
            <div className="book-detail-stars" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((starIndex) => {
                const isFilled = starIndex <= Math.floor(rating);
                return (
                  <Star
                    key={starIndex}
                    size={16}
                    fill={isFilled ? '#F59E0B' : 'transparent'}
                    stroke={isFilled ? '#F59E0B' : '#CBD5E1'}
                    strokeWidth={1.5}
                  />
                );
              })}
            </div>
            <span className="book-detail-rating-score">{rating}</span>
            <span className="book-detail-rating-count">({reviewsCount} valoraciones)</span>
          </div>

          {/* Availability Status */}
          <div className="book-detail-availability-row">
            <span
              className={clsx(
                'book-detail-status-pill',
                isAvailable
                  ? 'book-detail-status-pill--available'
                  : 'book-detail-status-pill--unavailable'
              )}
            >
              {isAvailable ? (
                <>
                  <CheckCircle size={15} aria-hidden="true" />
                  <span>Disponible</span>
                </>
              ) : (
                <>
                  <Ban size={15} aria-hidden="true" />
                  <span>No disponible</span>
                </>
              )}
            </span>
            <span className="book-detail-copies-text">
              {book.availableCopies} de {book.totalCopies} ejemplares disponibles
            </span>
          </div>

          {/* Action 1: Solicitar préstamo */}
          <button
            type="button"
            className={clsx(
              'book-detail-request-btn',
              !isAvailable && 'book-detail-request-btn--disabled'
            )}
            disabled={!isAvailable}
            aria-disabled={!isAvailable ? 'true' : undefined}
            title={
              !isAvailable
                ? 'No hay ejemplares disponibles para préstamo en este momento'
                : 'Solicitar préstamo de este ejemplar'
            }
            onClick={handleRequestLoanClick}
          >
            <BookOpen size={18} aria-hidden="true" />
            <span>Solicitar préstamo</span>
          </button>

          {/* Helper notice text */}
          <p className="book-detail-helper-text">
            Tu solicitud será revisada por el personal de la biblioteca.
          </p>

          {/* Action 2: Guardar en favoritos */}
          <button
            type="button"
            className={clsx(
              'book-detail-favorite-btn',
              isFavorite && 'book-detail-favorite-btn--active'
            )}
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          >
            <Bookmark
              size={18}
              fill={isFavorite ? '#2563EB' : 'transparent'}
              color="#2563EB"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span>{isFavorite ? 'Guardado en favoritos' : 'Guardar en favoritos'}</span>
          </button>
        </div>
      </section>

      {/* 2. Middle Section: Descripción and Disponibilidad y ubicación */}
      <section className="book-detail-middle-grid" aria-label="Sinopsis y ubicación">
        {/* Left Card: Descripción */}
        <div className="book-detail-card">
          <h2 className="book-detail-card-title">Descripción</h2>
          <p className="book-detail-desc-text">
            {book.description || 'Sinopsis no disponible para este ejemplar.'}
          </p>

          <hr className="book-detail-divider" />

          <h3 className="book-detail-topics-subtitle">Temas relacionados</h3>
          <div className="book-detail-topics-grid">
            {topics.map((topic, idx) => (
              <span key={idx} className="book-detail-topic-tag">
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Right Card: Disponibilidad y ubicación */}
        <div className="book-detail-card">
          <h2 className="book-detail-card-title">Disponibilidad y ubicación</h2>

          {/* 3 Stat Boxes */}
          <div className="book-detail-stats-row">
            <div className="book-detail-stat-box">
              <span className="book-detail-stat-number">{book.totalCopies}</span>
              <span className="book-detail-stat-label">Ejemplares totales</span>
            </div>
            <div className="book-detail-stat-box">
              <span className="book-detail-stat-number">{book.availableCopies}</span>
              <span className="book-detail-stat-label">Disponibles</span>
            </div>
            <div className="book-detail-stat-box">
              <span className="book-detail-stat-number">{borrowedCopies}</span>
              <span className="book-detail-stat-label">Prestados</span>
            </div>
          </div>

          {/* Location & Schedule Info */}
          <div className="book-detail-location-group">
            <div className="book-detail-info-row">
              <div className="book-detail-info-icon" aria-hidden="true">
                <Landmark size={20} />
              </div>
              <div className="book-detail-info-content">
                <span className="book-detail-info-label">UBICACIÓN</span>
                <span className="book-detail-info-value">
                  {book.location || 'Estante de consulta general'}
                </span>
              </div>
            </div>

            <div className="book-detail-info-row">
              <div className="book-detail-info-icon" aria-hidden="true">
                <Clock size={20} />
              </div>
              <div className="book-detail-info-content">
                <span className="book-detail-info-label">HORARIO DE CONSULTA</span>
                <span className="book-detail-info-value">
                  {book.schedule || 'Lunes a viernes, 8:00 a 15:00'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Lower Section: Información bibliográfica */}
      <section className="book-detail-card" aria-label="Información bibliográfica completa">
        <h2 className="book-detail-card-title">Información bibliográfica</h2>

        <div className="book-detail-biblio-grid">
          <div className="book-detail-biblio-item">
            <span className="book-detail-biblio-label">ISBN</span>
            <span className="book-detail-biblio-val">{book.isbn || 'No disponible'}</span>
          </div>

          <div className="book-detail-biblio-item">
            <span className="book-detail-biblio-label">EDITORIAL</span>
            <span className="book-detail-biblio-val">{book.publisher || 'No disponible'}</span>
          </div>

          <div className="book-detail-biblio-item">
            <span className="book-detail-biblio-label">IDIOMA</span>
            <span className="book-detail-biblio-val">{book.language || 'Español'}</span>
          </div>

          <div className="book-detail-biblio-item">
            <span className="book-detail-biblio-label">AÑO</span>
            <span className="book-detail-biblio-val">
              {book.publishYear ? String(book.publishYear) : 'No disponible'}
            </span>
          </div>

          <div className="book-detail-biblio-item">
            <span className="book-detail-biblio-label">CATEGORÍA</span>
            <span className="book-detail-biblio-val">{categoryName}</span>
          </div>

          <div className="book-detail-biblio-item">
            <span className="book-detail-biblio-label">TIPO DE MATERIAL</span>
            <span className="book-detail-biblio-val">{book.materialType || 'Libro físico'}</span>
          </div>
        </div>
      </section>

      {/* 4. Bottom Section: Libros similares */}
      {similarBooks.length > 0 && (
        <section className="book-detail-similar-section" aria-label="Libros similares">
          <h2 className="book-detail-similar-title">Libros similares</h2>
          <p className="book-detail-similar-subtitle">También podrían interesarte</p>

          <div className="book-detail-similar-grid">
            {similarBooks.map((simBook) => {
              const simCover = getBookCoverVisual(simBook);
              const simAvailable = simBook.availableCopies > 0;

              return (
                <article key={simBook.id} className="book-detail-similar-card">
                  {/* Thumbnail Cover */}
                  <div
                    className="book-detail-similar-thumb"
                    style={{ background: simCover.gradient }}
                    aria-hidden="true"
                  >
                    <span className="book-detail-similar-thumb-tag">BIBLIOTECA</span>
                    <div className="book-detail-similar-thumb-sym">{simCover.symbol}</div>
                    <span className="book-detail-similar-thumb-title">
                      {simBook.title.split(' ').slice(0, 2).join(' ')}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="book-detail-similar-body">
                    <div className="book-detail-similar-info">
                      <h3 className="book-detail-similar-name" title={simBook.title}>
                        {simBook.title}
                      </h3>
                      <p className="book-detail-similar-author">{simBook.author}</p>
                      <span
                        className={clsx(
                          'book-detail-similar-status-pill',
                          simAvailable
                            ? 'book-detail-similar-status-pill--available'
                            : 'book-detail-similar-status-pill--unavailable'
                        )}
                      >
                        {simAvailable ? 'Disponible' : 'No disponible'}
                      </span>
                    </div>

                    <Link
                      to={`/user/catalog/${simBook.id}`}
                      state={{ from: backTargetUrl }}
                      className="book-detail-similar-btn"
                      aria-label={`Ver libro ${simBook.title}`}
                    >
                      Ver libro
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
};
