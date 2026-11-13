import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Clock,
  Info,
  CheckCircle2,
  Code,
  Sparkles,
  BookOpen,
  Infinity as InfinityIcon,
  AlertCircle,
} from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { MOCK_BOOKS } from '../../mocks/data';
import { booksService } from '../../services/api/books.service';
import type { Book } from '../../types';
import { resolveCategory, getCategoryName } from '../../constants';
import { useAuth } from '../../features/auth/AuthContext';
import {
  createBorrowRequest,
  formatSuggestedDate,
} from '../../features/loans/requests.service';
import { USER_SOLICITUDES_KEY } from '../../features/loans/solicitudes.query';
import { EmptyState } from '../../components/ui/EmptyState';
import { CustomSelect } from '../../components/ui/CustomSelect';
import './UserBorrowRequestPage.css';

interface CoverVisualMetadata {
  gradient: string;
  symbol: React.ReactNode;
  tag: string;
}

/**
 * Generates aesthetic gradients and symbolic icons matching project identity and references.
 */
const getBookCoverVisual = (book: Book): CoverVisualMetadata => {
  if (book.id === 'book-python') {
    return {
      gradient: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 55%, #60A5FA 100%)',
      symbol: <Code size={40} color="#FFFFFF" strokeWidth={2.5} />,
      tag: 'BIBLIOTECA INTELIGENTE',
    };
  }

  if (book.id === 'book-soledad') {
    return {
      gradient: 'linear-gradient(135deg, #065F46 0%, #059669 44%, #EAB308 76%, #F59E0B 100%)',
      symbol: <InfinityIcon size={40} color="#FFFFFF" strokeWidth={2.5} />,
      tag: 'BIBLIOTECA',
    };
  }

  if (book.id === 'book-principito') {
    return {
      gradient: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 42%, #F59E0B 75%, #D97706 100%)',
      symbol: <Sparkles size={38} color="#FFFFFF" />,
      tag: 'BIBLIOTECA',
    };
  }

  if (book.id === 'book-fundamentos-prog') {
    return {
      gradient: 'linear-gradient(145deg, #312E81 0%, #4338CA 50%, #6366F1 100%)',
      symbol: <span style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'monospace' }}>{'{ }'}</span>,
      tag: 'BIBLIOTECA',
    };
  }

  if (book.id === 'book-js') {
    return {
      gradient: 'linear-gradient(145deg, #78350F 0%, #B45309 50%, #F59E0B 100%)',
      symbol: <span style={{ fontSize: '2rem', fontWeight: 800 }}>JS</span>,
      tag: 'BIBLIOTECA',
    };
  }

  // Fallback based on Dewey category
  const cat = resolveCategory(book.category);
  const code = cat?.code || '000';

  switch (code) {
    case '000':
      return {
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
        symbol: <Code size={36} color="#FFFFFF" strokeWidth={2.2} />,
        tag: 'BIBLIOTECA',
      };
    case '600':
      return {
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 55%, #60A5FA 100%)',
        symbol: <Code size={40} color="#FFFFFF" strokeWidth={2.5} />,
        tag: 'BIBLIOTECA INTELIGENTE',
      };
    default:
      return {
        gradient: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
        symbol: <BookOpen size={36} color="#FFFFFF" />,
        tag: 'BIBLIOTECA',
      };
  }
};

const PICKUP_LOCATIONS = [
  'Biblioteca principal',
  'Biblioteca campus norte',
  'Sala de lectura especializada',
];

export const UserBorrowRequestPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Find book from shared data or async from Supabase
  const [book, setBook] = useState<Book | null>(() => {
    if (!bookId) return null;
    return MOCK_BOOKS.find((b) => b.id === bookId) || null;
  });
  const [loading, setLoading] = useState<boolean>(!book);

  useEffect(() => {
    let isMounted = true;
    if (!bookId) return;
    if (!book || book.id !== bookId) setLoading(true);

    booksService.getById(bookId).then((found) => {
      if (isMounted) {
        if (found) setBook(found);
        else setBook(MOCK_BOOKS.find((b) => b.id === bookId) || null);
        setLoading(false);
      }
    }).catch(() => {
      if (isMounted) {
        setBook(MOCK_BOOKS.find((b) => b.id === bookId) || null);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [bookId]);

  // Form states
  const [pickupLocation, setPickupLocation] = useState(PICKUP_LOCATIONS[0]);
  const [suggestedDateIso, setSuggestedDateIso] = useState('2026-10-06');
  const [observations, setObservations] = useState('');
  const [dateInputType, setDateInputType] = useState<'text' | 'date'>('text');
  const [dateError, setDateError] = useState<string | null>(null);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Applicant identity (Read-only as per specifications)
  const applicantName = user?.name || 'Camila Flores';
  const applicantEmail = user?.email || 'camila.flores@biblioteca.com';
  const applicantRole = 'Usuario';

  // Derived category & availability
  const categoryName = useMemo(() => {
    return book ? getCategoryName(book.category) : '';
  }, [book]);

  const coverVisual = useMemo(() => {
    return book ? getBookCoverVisual(book) : null;
  }, [book]);

  const isAvailable = (book?.availableCopies ?? 0) > 0;

  // Handle suggested date changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSuggestedDateIso(val);
    setDateError(null);
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting || !book) return;

    if (!isAvailable) {
      setDateError('Este libro no cuenta con ejemplares disponibles actualmente.');
      return;
    }

    if (!suggestedDateIso) {
      setDateError('Por favor selecciona una fecha sugerida para recoger el libro.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const created = createBorrowRequest({
        bookId: book.id,
        bookTitle: book.title,
        userId: user?.id || 'usr-std-02',
        userName: applicantName,
        userEmail: applicantEmail,
        pickupLocation,
        suggestedDate: suggestedDateIso,
        notes: observations,
      });

      // Invalidar el query del usuario para que al volver a Mis Solicitudes
      // se recarguen los datos desde el servidor y aparezca la solicitud nueva.
      queryClient.invalidateQueries({ queryKey: [USER_SOLICITUDES_KEY] });

      // Navigate to dedicated confirmation screen
      navigate(`/user/catalog/${book.id}/request/success/${created.id}`, {
        state: { request: created, book },
      });
    } catch (err) {
      console.error('Error registrando solicitud:', err);
      setSubmitError('Ocurrió un error inesperado al registrar la solicitud. Por favor intenta de nuevo.');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="borrow-request-page">
        <div className="borrow-request-card" style={{ textAlign: 'center', padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#6B7280' }}>
          <div style={{ width: '36px', height: '36px', border: '3px solid #E5E7EB', borderTopColor: '#2563EB', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 500 }}>Cargando información del libro...</p>
        </div>
      </div>
    );
  }

  // 1. Error state: Book Not Found
  if (!book || !coverVisual) {
    return (
      <div className="borrow-request-page">
        <nav className="borrow-request-back-nav" aria-label="Navegación de retorno">
          <Link to="/user/catalog" className="borrow-request-back-link">
            <ChevronLeft size={16} aria-hidden="true" />
            <span>Volver al catálogo</span>
          </Link>
        </nav>
        <div className="borrow-request-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <EmptyState
            icon={<AlertCircle size={40} color="#DC2626" />}
            title="Libro no encontrado"
            description="El libro solicitado no existe o el identificador en la dirección es incorrecto."
            action={
              <Link to="/user/catalog">
                <button type="button" className="borrow-request-btn-submit" style={{ margin: '0 auto' }}>
                  Explorar catálogo
                </button>
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  // 3. Main Form Screen (Pixel-perfect reproduction of Figma reference)
  return (
    <div className="borrow-request-page">
      {/* Back to Book Detail */}
      <nav className="borrow-request-back-nav" aria-label="Navegación de retorno">
        <Link
          to={`/user/catalog/${book.id}`}
          className="borrow-request-back-link"
          aria-label="Volver al detalle del libro"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          <span>Volver al detalle del libro</span>
        </Link>
      </nav>

      {/* Page Title & Subtitle */}
      <header className="borrow-request-header">
        <h1 className="borrow-request-title">Solicitar préstamo</h1>
        <p className="borrow-request-subtitle">
          Revisa la información y confirma tu solicitud de préstamo.
        </p>
      </header>

      {/* Two Column Grid */}
      <form onSubmit={handleSubmit}>
        <div className="borrow-request-grid">
          {/* Card 1: Libro seleccionado */}
          <section className="borrow-request-card" aria-labelledby="selected-book-heading">
            <h2 id="selected-book-heading" className="borrow-request-card-title">
              Libro seleccionado
            </h2>

            <div className="borrow-request-book-layout">
              {/* Cover Graphic / Thumbnail */}
              <div
                className="borrow-request-book-cover"
                style={{ background: coverVisual.gradient }}
                aria-label={`Portada de ${book.title}`}
              >
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt={`Portada de ${book.title}`}
                    className="borrow-request-cover-img"
                  />
                ) : (
                  <>
                    <div className="borrow-request-cover-tag">{coverVisual.tag}</div>
                    <div className="borrow-request-cover-center" aria-hidden="true">
                      {coverVisual.symbol}
                    </div>
                    <div className="borrow-request-cover-footer">
                      <div className="borrow-request-cover-title">{book.title}</div>
                    </div>
                  </>
                )}
              </div>

              {/* Book Metadata details */}
              <div className="borrow-request-book-details">
                {/* Category Pill Tag */}
                <span className="borrow-request-category-pill">{categoryName}</span>

                {/* Title */}
                <h3 className="borrow-request-book-title">{book.title}</h3>

                {/* Author */}
                <p className="borrow-request-book-author">{book.author}</p>

                {/* ISBN & Location */}
                <div className="borrow-request-meta-group">
                  <div className="borrow-request-meta-row">
                    <span>
                      <span className="borrow-request-meta-label">ISBN:</span>{' '}
                      <span className="borrow-request-meta-value">{book.isbn}</span>
                    </span>
                  </div>

                  <div className="borrow-request-meta-row">
                    <span className="borrow-request-meta-label">Ubicación:</span>
                    <span className="borrow-request-meta-value">{book.location}</span>
                  </div>
                </div>

                {/* Available Copies Badge */}
                <div className="borrow-request-avail-badge">
                  <CheckCircle2 size={14} aria-hidden="true" />
                  <span>{book.availableCopies} ejemplares disponibles</span>
                </div>
              </div>
            </div>
          </section>

          {/* Card 2: Datos de la solicitud */}
          <section className="borrow-request-card" aria-labelledby="request-data-heading">
            <h2 id="request-data-heading" className="borrow-request-card-title">
              Datos de la solicitud
            </h2>

            {/* Read-only Applicant Identity Block */}
            <div className="borrow-request-user-box" aria-label="Información del solicitante">
              <div className="borrow-request-user-box-title">Información del solicitante</div>

              <div className="borrow-request-user-field">
                <div className="borrow-request-user-label">Solicitante</div>
                <div className="borrow-request-user-value">{applicantName}</div>
              </div>

              <div className="borrow-request-user-field">
                <div className="borrow-request-user-label">Correo</div>
                <div className="borrow-request-user-value">{applicantEmail}</div>
              </div>

              <div className="borrow-request-user-field">
                <div className="borrow-request-user-label">Rol</div>
                <div className="borrow-request-user-value">{applicantRole}</div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="borrow-request-form">
              {/* Field 1: Lugar de recogida */}
              <div className="borrow-request-field-group">
                <CustomSelect
                  id="pickup-location"
                  label="Lugar de recogida"
                  value={pickupLocation}
                  onChange={(val) => setPickupLocation(val)}
                  options={PICKUP_LOCATIONS.map((loc) => ({ value: loc, label: loc }))}
                />
              </div>

              {/* Field 2: Fecha sugerida para recoger */}
              <div className="borrow-request-field-group">
                <label htmlFor="suggested-date" className="borrow-request-field-label">
                  Fecha sugerida para recoger
                </label>
                <div className="borrow-request-input-wrapper">
                  <input
                    id="suggested-date"
                    type={dateInputType}
                    className="borrow-request-input"
                    value={
                      dateInputType === 'text'
                        ? formatSuggestedDate(suggestedDateIso)
                        : suggestedDateIso
                    }
                    onFocus={() => setDateInputType('date')}
                    onBlur={() => setDateInputType('text')}
                    onChange={handleDateChange}
                    aria-label="Fecha sugerida para recoger"
                  />
                  <Clock size={18} className="borrow-request-input-icon" aria-hidden="true" />
                </div>
                {dateError && (
                  <span className="borrow-request-field-error" role="alert">
                    {dateError}
                  </span>
                )}
              </div>

              {/* Field 3: Observaciones (opcional) */}
              <div className="borrow-request-field-group">
                <label htmlFor="request-notes" className="borrow-request-field-label">
                  Observaciones
                  <span className="borrow-request-field-optional">(opcional)</span>
                </label>
                <textarea
                  id="request-notes"
                  className="borrow-request-textarea"
                  placeholder="Escribe alguna indicación para el bibliotecario"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Error Alert if submission fails */}
        {submitError && (
          <aside
            className="borrow-request-info-banner"
            role="alert"
            style={{ backgroundColor: '#FEF2F2', borderColor: '#FCA5A5', color: '#991B1B' }}
          >
            <AlertCircle size={20} color="#DC2626" aria-hidden="true" style={{ flexShrink: 0 }} />
            <p className="borrow-request-info-text" style={{ color: '#991B1B' }}>
              {submitError}
            </p>
          </aside>
        )}

        {/* Info Banner */}
        <aside className="borrow-request-info-banner" role="status" aria-live="polite">
          <Info size={20} className="borrow-request-info-icon" aria-hidden="true" />
          <p className="borrow-request-info-text">
            La solicitud será revisada por el personal de la biblioteca. Recibirás una notificación cuando el libro esté listo para recogerse.
          </p>
        </aside>

        {/* Resumen de condiciones */}
        <section className="borrow-request-conditions-card" aria-label="Resumen de condiciones">
          <h2 className="borrow-request-conditions-title">Resumen de condiciones</h2>
          <div className="borrow-request-conditions-list">
            <div className="borrow-request-condition-item">
              <CheckCircle2 size={16} className="borrow-request-condition-icon" aria-hidden="true" />
              <span>Puedes solicitar un libro disponible</span>
            </div>

            <div className="borrow-request-condition-item">
              <CheckCircle2 size={16} className="borrow-request-condition-icon" aria-hidden="true" />
              <span>La fecha de devolución se asignará al aprobarse la solicitud</span>
            </div>

            <div className="borrow-request-condition-item">
              <CheckCircle2 size={16} className="borrow-request-condition-icon" aria-hidden="true" />
              <span>Consulta el estado en Mis solicitudes</span>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="borrow-request-actions">
          <button
            type="button"
            className="borrow-request-btn-cancel"
            onClick={() => navigate(`/user/catalog/${book.id}`)}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="borrow-request-btn-submit"
            disabled={!isAvailable || isSubmitting}
          >
            <CheckCircle2 size={18} aria-hidden="true" />
            <span>{isSubmitting ? 'Enviando...' : 'Enviar solicitud'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
