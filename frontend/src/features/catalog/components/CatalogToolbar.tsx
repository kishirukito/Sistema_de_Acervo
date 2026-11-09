import React from 'react';
import { Search } from 'lucide-react';
import type { CatalogFilterState } from '../catalog.types';
import { BIBLIOGRAPHIC_CATEGORIES } from '../../../constants';
import { CustomSelect } from '../../../components/ui/CustomSelect';

interface CatalogToolbarProps {
  filters: CatalogFilterState;
  onFilterChange: (filters: CatalogFilterState) => void;
  onClearFilters: () => void;
  totalFilteredCount: number;
  currentPage: number;
  totalPages: number;
}

export const CatalogToolbar: React.FC<CatalogToolbarProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  totalFilteredCount,
  currentPage,
  totalPages,
}) => {
  const hasActiveFilters =
    Boolean(filters.searchQuery) ||
    Boolean(filters.category) ||
    Boolean(filters.status) ||
    Boolean(filters.publicationYear);

  return (
    <div className="catalog-filter-card">
      <div className="catalog-toolbar-row">
        {/* Search Input */}
        <div className="catalog-search-wrapper">
          <Search size={18} className="catalog-search-icon" aria-hidden="true" />
          <input
            type="text"
            placeholder="Buscar por título, autor o ISBN"
            value={filters.searchQuery}
            onChange={(e) =>
              onFilterChange({ ...filters, searchQuery: e.target.value })
            }
            className="catalog-search-input"
            aria-label="Buscar por título, autor o ISBN"
          />
        </div>

        {/* Category Dropdown */}
        <CustomSelect
          value={filters.category}
          onChange={(val) => onFilterChange({ ...filters, category: val })}
          options={[
            { value: '', label: 'Todas las categorías' },
            ...BIBLIOGRAPHIC_CATEGORIES.map((cat) => ({
              value: cat.code,
              label: cat.label,
            })),
          ]}
          fullWidth={false}
          aria-label="Filtrar por categoría"
        />

        {/* Availability Status Dropdown */}
        <CustomSelect
          value={filters.status}
          onChange={(val) => onFilterChange({ ...filters, status: val })}
          options={[
            { value: '', label: 'Disponibilidad' },
            { value: 'AVAILABLE', label: 'Disponible' },
            { value: 'LOW_STOCK', label: 'Pocos ejemplares' },
            { value: 'LOANED', label: 'Prestado' },
            { value: 'UNAVAILABLE', label: 'No disponible' },
          ]}
          fullWidth={false}
          aria-label="Filtrar por disponibilidad"
        />

        {/* Publication Year Dropdown */}
        <CustomSelect
          value={filters.publicationYear}
          onChange={(val) => onFilterChange({ ...filters, publicationYear: val })}
          options={[
            { value: '', label: 'Año de publicación' },
            { value: '2020+', label: '2020 - Actual' },
            { value: '2000-2019', label: '2000 - 2019' },
            { value: 'PRE-2000', label: 'Antes de 2000' },
          ]}
          fullWidth={false}
          aria-label="Filtrar por año de publicación"
        />

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            className="catalog-clear-btn"
            onClick={onClearFilters}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Summary info row */}
      <div className="catalog-summary-row">
        <span>Mostrando {totalFilteredCount} libros</span>
        <span>
          Página {currentPage} de {totalPages || 1}
        </span>
      </div>
    </div>
  );
};
