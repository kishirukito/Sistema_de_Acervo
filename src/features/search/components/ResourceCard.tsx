import React, { useState } from 'react';
import { Bookmark, Sparkles } from 'lucide-react';
import type { ResourceSearchResult } from '../search.types';
import { getCategoryFullLabel } from '../../../constants';

interface ResourceCardProps {
  resource: ResourceSearchResult;
  onViewDetail: (resource: ResourceSearchResult) => void;
  onViewAISummary: (resource: ResourceSearchResult) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  onViewDetail,
  onViewAISummary,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const isAvailable = resource.availability === 'AVAILABLE';
  const matchLabel =
    resource.matchLevel === 'high'
      ? 'Coincidencia alta'
      : resource.matchLevel === 'medium'
      ? 'Coincidencia media'
      : 'Coincidencia estándar';

  return (
    <article className="search-resource-card" aria-label={`Libro ${resource.title}`}>
      {/* Cover Gradient Placeholder with Initials */}
      <div
        className="search-cover-block"
        style={{
          background: `linear-gradient(135deg, ${resource.coverGradient.from} 0%, ${resource.coverGradient.to} 100%)`,
        }}
        aria-hidden="true"
      >
        <span className="search-cover-initials">{resource.coverInitials}</span>
      </div>

      {/* Main Card Content */}
      <div className="search-card-content">
        {/* Top row with badges and bookmark */}
        <div className="search-card-top-row">
          <div className="search-card-badges">
            <span
              className={`search-match-badge search-match-badge--${resource.matchLevel}`}
            >
              <span className="search-match-dot" aria-hidden="true" />
              <span>{matchLabel}</span>
            </span>

            <span className="search-category-badge">{getCategoryFullLabel(resource.category)}</span>
          </div>

          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`search-bookmark-btn ${
              isBookmarked ? 'search-bookmark-btn--active' : ''
            }`}
            aria-label={
              isBookmarked
                ? `Quitar ${resource.title} de guardados`
                : `Guardar ${resource.title} en favoritos`
            }
            title={isBookmarked ? 'Guardado' : 'Guardar libro'}
          >
            <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Title */}
        <h3 className="search-book-title">{resource.title}</h3>

        {/* Metadata: Author · Year · Pages */}
        <p className="search-book-meta">
          {resource.author} · {resource.publicationYear} · {resource.pages} págs.
        </p>

        {/* Short description */}
        <p className="search-book-desc">{resource.description}</p>

        {/* Bottom row: Availability and Action Buttons */}
        <div className="search-card-bottom-row">
          <div
            className={`search-availability-pill search-availability-pill--${
              isAvailable ? 'available' : 'borrowed'
            }`}
          >
            <span className="search-availability-dot" aria-hidden="true" />
            <span>
              {isAvailable
                ? `Disponible (${resource.availableCopies}/${resource.totalCopies})`
                : `En préstamo (0/${resource.totalCopies})`}
            </span>
          </div>

          <div className="search-card-actions">
            <button
              type="button"
              onClick={() => onViewDetail(resource)}
              className="search-btn-outline"
              aria-label={`Ver detalles completos de ${resource.title}`}
            >
              Ver detalle
            </button>

            <button
              type="button"
              onClick={() => onViewAISummary(resource)}
              className="search-btn-ai"
              aria-label={`Ver resumen con asistencia de IA de ${resource.title}`}
            >
              <Sparkles size={14} />
              <span>Ver resumen IA</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
