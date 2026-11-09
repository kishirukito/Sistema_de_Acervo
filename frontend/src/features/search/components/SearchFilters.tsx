import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import type { SearchFilterState } from '../search.types';
import { BIBLIOGRAPHIC_CATEGORIES, getCategoryFullLabel } from '../../../constants';
import { CustomSelect } from '../../../components/ui/CustomSelect';

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
        <CustomSelect
          value={filters.category}
          onChange={(val) => onFilterChange('category', val)}
          options={[
            { value: '', label: 'Todas las categorías' },
            ...BIBLIOGRAPHIC_CATEGORIES.map((cat) => ({
              value: cat.code,
              label: cat.label,
            })),
          ]}
          size="sm"
          aria-label="Filtrar por categoría"
        />

        {/* Autor */}
        <CustomSelect
          value={filters.author}
          onChange={(val) => onFilterChange('author', val)}
          options={[
            { value: '', label: 'Autor' },
            ...authors.map((auth) => ({
              value: auth,
              label: auth,
            })),
          ]}
          size="sm"
          aria-label="Filtrar por autor"
        />

        {/* Año de publicación */}
        <CustomSelect
          value={filters.publicationYear}
          onChange={(val) => onFilterChange('publicationYear', val)}
          options={[
            { value: '', label: 'Año de publicación' },
            ...years.map((year) => ({
              value: String(year),
              label: String(year),
            })),
          ]}
          size="sm"
          aria-label="Filtrar por año de publicación"
        />

        {/* Disponibilidad */}
        <CustomSelect
          value={filters.availability}
          onChange={(val) => onFilterChange('availability', val)}
          options={[
            { value: '', label: 'Disponibilidad' },
            { value: 'AVAILABLE', label: 'Disponible' },
            { value: 'BORROWED', label: 'En préstamo' },
          ]}
          size="sm"
          aria-label="Filtrar por disponibilidad"
        />
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
