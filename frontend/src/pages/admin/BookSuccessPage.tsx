import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Check, Plus, List } from 'lucide-react';
import { booksService } from '../../services/api/books.service';
import { getCategoryFullLabel } from '../../constants';
import type { Book } from '../../types';
import './BookSuccessPage.css';

export const BookSuccessPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const passedBook = (location.state as any)?.book as Book | undefined;
  const [book, setBook] = useState<Book | null>(passedBook || null);

  useEffect(() => {
    let isMounted = true;
    if (!passedBook && bookId && bookId !== 'new') {
      booksService.getById(bookId).then((b) => {
        if (isMounted && b) {
          setBook(b);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [bookId, passedBook]);

  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, [book]);

  const handleBackToCatalog = () => {
    navigate('/admin/catalog');
  };

  const handleRegisterAnother = () => {
    navigate('/admin/catalog/new');
  };

  const categoryLabel = book?.category ? getCategoryFullLabel(book.category) : 'General';
  const coverInitials = book?.title ? book.title.slice(0, 2).toUpperCase() : 'LI';

  return (
    <div className="book-success-page">
      <main
        className="book-success-card"
        role="region"
        aria-labelledby="book-success-heading"
      >
        {/* Double-circle Success Checkmark Icon */}
        <div className="book-success-icon-outer" aria-hidden="true">
          <div className="book-success-icon-inner">
            <Check size={26} strokeWidth={2.8} className="book-success-icon-svg" />
          </div>
        </div>

        {/* Primary Success Heading */}
        <h1
          id="book-success-heading"
          ref={headingRef}
          tabIndex={-1}
          className="book-success-title"
        >
          Título registrado correctamente
        </h1>

        <p className="book-success-desc">
          El material bibliográfico ha sido dado de alta exitosamente en el catálogo institucional y se encuentra disponible para consulta y préstamo.
        </p>

        {/* Summary Card */}
        <div
          className="book-success-summary-box"
          role="region"
          aria-label="Detalles del libro registrado"
        >
          {book && (
            <div className="book-success-preview-header">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={`Portada de ${book.title}`}
                  className="book-success-cover-thumb"
                  onError={(e) => {
                    // Fallback to initial box if image fails to load
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="book-success-cover-fallback" aria-hidden="true">
                  {coverInitials}
                </div>
              )}
              <div className="book-success-title-group">
                <h2 className="book-success-book-title">{book.title || 'Título registrado'}</h2>
                <p className="book-success-book-author">por {book.author || 'Autor'}</p>
              </div>
            </div>
          )}

          <dl className="book-success-summary-list">
            <div className="book-success-summary-row">
              <dt className="book-success-summary-label">Estado en acervo</dt>
              <dd className="book-success-summary-value">
                <span className="book-success-badge-active">Disponible</span>
              </dd>
            </div>

            {book?.isbn && (
              <div className="book-success-summary-row">
                <dt className="book-success-summary-label">ISBN / Código</dt>
                <dd className="book-success-summary-value">{book.isbn}</dd>
              </div>
            )}

            <div className="book-success-summary-row">
              <dt className="book-success-summary-label">Clasificación Dewey</dt>
              <dd className="book-success-summary-value">{categoryLabel}</dd>
            </div>

            {book?.publisher && (
              <div className="book-success-summary-row">
                <dt className="book-success-summary-label">Editorial y Año</dt>
                <dd className="book-success-summary-value">
                  {book.publisher} ({book.publishYear || '2024'})
                </dd>
              </div>
            )}

            <div className="book-success-summary-row">
              <dt className="book-success-summary-label">Ejemplares dados de alta</dt>
              <dd className="book-success-summary-value">
                {book?.totalCopies || 1} {((book?.totalCopies || 1) === 1) ? 'copia física' : 'copias físicas'}
              </dd>
            </div>

            {book?.location && (
              <div className="book-success-summary-row">
                <dt className="book-success-summary-label">Ubicación física</dt>
                <dd className="book-success-summary-value">{book.location}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Actions */}
        <div className="book-success-actions">
          <button
            type="button"
            className="book-success-btn-secondary"
            onClick={handleBackToCatalog}
          >
            <List size={16} />
            <span>Ver en el catálogo</span>
          </button>

          <button
            type="button"
            className="book-success-btn-primary"
            onClick={handleRegisterAnother}
          >
            <Plus size={16} />
            <span>Registrar otro título</span>
          </button>
        </div>
      </main>
    </div>
  );
};
