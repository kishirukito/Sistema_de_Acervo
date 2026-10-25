import React from 'react';
import {
  BookOpen,
  MapPin,
  Hash,
  Calendar,
  Layers,
  Building2,
  CheckCircle2,
  Barcode,
} from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { MOCK_BOOKS } from '../../../mocks/data';
import type { ResourceSearchResult } from '../search.types';
import type { Resource } from '../../catalog/catalog.types';
import { getCategoryFullLabel } from '../../../constants';
import './BookDetailModal.css';

export type BookDetailItem = ResourceSearchResult | Resource;

export interface BookDetailModalProps {
  /** Resource from either Search results or Catalog inventory */
  resource: BookDetailItem | null;
  /** Callback triggered when modal requests closing */
  onClose: () => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({
  resource,
  onClose,
}) => {
  if (!resource) return null;

  // Cross-reference with standard book mocks if additional metadata (publisher/description) is absent
  const matchedBook = MOCK_BOOKS.find(
    (b) =>
      (resource.isbn &&
        b.isbn.replace(/-/g, '') === resource.isbn.replace(/-/g, '')) ||
      b.title.trim().toLowerCase() === resource.title.trim().toLowerCase()
  );

  // Derived metadata
  const description =
    ('description' in resource && resource.description) ||
    matchedBook?.description ||
    '';

  const publisher =
    ('publisher' in resource && (resource as any).publisher) ||
    matchedBook?.publisher ||
    null;

  const isbn = resource.isbn || '—';
  const publicationYear = resource.publicationYear || matchedBook?.publishYear || '—';
  const location = resource.location || '—';
  const totalCopies = resource.totalCopies ?? matchedBook?.totalCopies ?? 0;
  const availableCopies = resource.availableCopies ?? matchedBook?.availableCopies ?? 0;

  // Cover styling
  const coverBackground =
    'coverGradient' in resource && resource.coverGradient
      ? `linear-gradient(135deg, ${resource.coverGradient.from} 0%, ${resource.coverGradient.to} 100%)`
      : 'coverColor' in resource && resource.coverColor
      ? resource.coverColor
      : '#2F80ED';

  const coverInitials =
    resource.coverInitials || resource.title.slice(0, 2).toUpperCase();

  // Category and secondary badges
  const rawCat =
    'categoryLabel' in resource && resource.categoryLabel
      ? resource.categoryLabel
      : resource.category || '';
  const categoryLabel = getCategoryFullLabel(rawCat);

  const resourceCode = 'code' in resource && resource.code ? resource.code : null;
  const resourceType =
    'resourceType' in resource && resource.resourceType
      ? resource.resourceType
      : resourceCode;

  const pages = 'pages' in resource && resource.pages ? resource.pages : null;

  return (
    <Modal
      open={Boolean(resource)}
      onClose={onClose}
      size="medium"
      title="Ficha Bibliográfica"
      description="Sistema de Acervo Institucional"
      icon={<BookOpen size={18} />}
      closeButtonAriaLabel="Cerrar ficha bibliográfica"
      footer={
        <button
          type="button"
          onClick={onClose}
          className="book-detail-close-btn"
          aria-label="Cerrar ficha de libro"
        >
          Cerrar ficha
        </button>
      }
    >
      <div className="book-detail-modal-body">
        {/* Header summary: Cover + Title + Badges */}
        <div className="book-detail-header-card">
          <div
            className="book-detail-cover"
            style={{ background: coverBackground }}
            aria-hidden="true"
          >
            <span className="book-detail-cover-initials">{coverInitials}</span>
          </div>

          <div className="book-detail-info">
            <h3 className="book-detail-title">{resource.title}</h3>
            <p className="book-detail-author">por {resource.author}</p>

            <div className="book-detail-badges">
              <span className="book-detail-badge book-detail-badge--primary">
                {categoryLabel}
              </span>
              {resourceType && (
                <span className="book-detail-badge book-detail-badge--neutral">
                  {resourceType}
                </span>
              )}
              <span
                className={`book-detail-badge ${
                  availableCopies > 0
                    ? 'book-detail-badge--status-avail'
                    : 'book-detail-badge--status-loaned'
                }`}
              >
                {availableCopies > 0 ? 'Disponible' : 'Sin existencias'}
              </span>
            </div>
          </div>
        </div>

        {/* Synopsis / Description */}
        {description ? (
          <p className="book-detail-description">{description}</p>
        ) : (
          <p className="book-detail-description book-detail-description--empty">
            Sin sinopsis registrada para este título.
          </p>
        )}

        {/* Metadata Grid */}
        <div className="book-detail-meta-grid">
          {/* ISBN */}
          <div className="book-detail-meta-item">
            <span className="book-detail-meta-label">
              <Hash size={11} aria-hidden="true" /> ISBN
            </span>
            <span className="book-detail-meta-val">{isbn}</span>
          </div>

          {/* Publication Year */}
          <div className="book-detail-meta-item">
            <span className="book-detail-meta-label">
              <Calendar size={11} aria-hidden="true" /> Publicación
            </span>
            <span className="book-detail-meta-val">{publicationYear}</span>
          </div>

          {/* Editorial (if available) or Inventory Code */}
          {publisher ? (
            <div className="book-detail-meta-item">
              <span className="book-detail-meta-label">
                <Building2 size={11} aria-hidden="true" /> Editorial
              </span>
              <span className="book-detail-meta-val">{publisher}</span>
            </div>
          ) : resourceCode ? (
            <div className="book-detail-meta-item">
              <span className="book-detail-meta-label">
                <Barcode size={11} aria-hidden="true" /> Código
              </span>
              <span className="book-detail-meta-val">{resourceCode}</span>
            </div>
          ) : null}

          {/* Pages (if available) */}
          {pages ? (
            <div className="book-detail-meta-item">
              <span className="book-detail-meta-label">
                <Layers size={11} aria-hidden="true" /> Páginas
              </span>
              <span className="book-detail-meta-val">{pages} págs.</span>
            </div>
          ) : null}

          {/* Location */}
          <div className="book-detail-meta-item">
            <span className="book-detail-meta-label">
              <MapPin size={11} aria-hidden="true" /> Ubicación
            </span>
            <span className="book-detail-meta-val">{location}</span>
          </div>

          {/* Availability and Copies */}
          <div className="book-detail-meta-item">
            <span className="book-detail-meta-label">
              <CheckCircle2 size={11} aria-hidden="true" /> Disponibilidad
            </span>
            <span className="book-detail-meta-val">
              {availableCopies} de {totalCopies} disponibles
            </span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
