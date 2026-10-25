import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import type { SearchFilterState } from '../search.types';
import { BIBLIOGRAPHIC_CATEGORIES, getCategoryFullLabel } from '../../../constants';

interface SearchFiltersProps {
  filters: SearchFilterState;
  onFilterChange: <K extends keyof SearchFilterState>(key: K, value: SearchFilterState[K]) => void;
  onClearFilters: () => void;
  categories?: string[];
  authors: string[];
  years: number[];
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  authors,
  years,
}) => {
  const hasActiveFilters =
    Boolean(filters.category) ||
    Boolean(filters.author) ||
    Boolean(filters.publicationYear) ||
    Boolean(filters.availability);

  return (
    <div className="search-filters-card">
      <div className="search-filters-row">
        {/* Categoría */}
        <div className="search-filter-select-wrapper">
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className={`search-filter-select ${filters.category ? 'search-filter-select--has-value' : ''}`}
            aria-label="Filtrar por categoría"
          >
            <option value="">Todas las categorías</option>
            {BIBLIOGRAPHIC_CATEGORIES.map((cat) => (
              <option key={cat.code} value={cat.code}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Autor */}
        <div className="search-filter-select-wrapper">
          <select
            value={filters.author}
            onChange={(e) => onFilterChange('author', e.target.value)}
            className={`search-filter-select ${filters.author ? 'search-filter-select--has-value' : ''}`}
            aria-label="Filtrar por autor"
          >
            <option value="">Autor</option>
            {authors.map((auth) => (
              <option key={auth} value={auth}>
                {auth}
              </option>
            ))}
          </select>
        </div>

        {/* Año de publicación */}
        <div className="search-filter-select-wrapper">
          <select
            value={filters.publicationYear}
            onChange={(e) => onFilterChange('publicationYear', e.target.value)}
            className={`search-filter-select ${filters.publicationYear ? 'search-filter-select--has-value' : ''}`}
            aria-label="Filtrar por año de publicación"
          >
            <option value="">Año de publicación</option>
            {years.map((year) => (
              <option key={year} value={String(year)}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Disponibilidad */}
        <div className="search-filter-select-wrapper">
          <select
            value={filters.availability}
            onChange={(e) => onFilterChange('availability', e.target.value)}
            className={`search-filter-select ${filters.availability ? 'search-filter-select--has-value' : ''}`}
            aria-label="Filtrar por disponibilidad"
          >
            <option value="">Disponibilidad</option>
            <option value="AVAILABLE">Disponible</option>
            <option value="BORROWED">En préstamo</option>
          </select>
        </div>
      </div>

      {/* Active filter badges row if any filter is set */}
      {hasActiveFilters && (
        <div className="search-active-filters-row">
          <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 500 }}>
            Filtros aplicados:
          </span>

          {filters.category && (
            <span className="search-active-pill">
              Categoría: <strong>{getCategoryFullLabel(filters.category)}</strong>
              <button
                type="button"
                onClick={() => onFilterChange('category', '')}
                className="search-active-pill-remove"
                aria-label={`Quitar filtro de categoría ${getCategoryFullLabel(filters.category)}`}
              >
                <X size={12} />
              </button>
            </span>
          )}

          {filters.author && (
            <span className="search-active-pill">
              Autor: <strong>{filters.author}</strong>
              <button
                type="button"
                onClick={() => onFilterChange('author', '')}
                className="search-active-pill-remove"
                aria-label={`Quitar filtro de autor ${filters.author}`}
              >
                <X size={12} />
              </button>
            </span>
          )}

          {filters.publicationYear && (
            <span className="search-active-pill">
              Año: <strong>{filters.publicationYear}</strong>
              <button
                type="button"
                onClick={() => onFilterChange('publicationYear', '')}
                className="search-active-pill-remove"
                aria-label={`Quitar filtro de año ${filters.publicationYear}`}
              >
                <X size={12} />
              </button>
            </span>
          )}

          {filters.availability && (
            <span className="search-active-pill">
              Disponibilidad:{' '}
              <strong>
                {filters.availability === 'AVAILABLE' ? 'Disponible' : 'En préstamo'}
              </strong>
              <button
                type="button"
                onClick={() => onFilterChange('availability', '')}
                className="search-active-pill-remove"
                aria-label="Quitar filtro de disponibilidad"
              >
                <X size={12} />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={onClearFilters}
            className="search-clear-all-filters-btn"
            title="Limpiar todos los filtros"
          >
            <RotateCcw size={12} />
            <span>Limpiar filtros</span>
          </button>
        </div>
      )}
    </div>
  );
};
