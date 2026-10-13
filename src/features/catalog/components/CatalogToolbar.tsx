import React from 'react';
import { Search } from 'lucide-react';
import type { CatalogFilterState } from '../catalog.types';

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
        <select
          value={filters.category}
          onChange={(e) =>
            onFilterChange({ ...filters, category: e.target.value })
          }
          className="catalog-select"
          aria-label="Filtrar por categoría"
        >
          <option value="">Categoría</option>
          <option value="Literatura">Literatura</option>
          <option value="Infantil">Infantil</option>
          <option value="Clásicos">Clásicos</option>
          <option value="Historia">Historia</option>
          <option value="Ciencia ficción">Ciencia ficción</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Administración">Administración</option>
        </select>

        {/* Availability Status Dropdown */}
        <select
          value={filters.status}
          onChange={(e) =>
            onFilterChange({ ...filters, status: e.target.value })
          }
          className="catalog-select"
          aria-label="Filtrar por disponibilidad"
        >
          <option value="">Disponibilidad</option>
          <option value="AVAILABLE">Disponible</option>
          <option value="LOW_STOCK">Pocos ejemplares</option>
          <option value="LOANED">Prestado</option>
          <option value="UNAVAILABLE">No disponible</option>
        </select>

        {/* Publication Year Dropdown */}
        <select
          value={filters.publicationYear}
          onChange={(e) =>
            onFilterChange({ ...filters, publicationYear: e.target.value })
          }
          className="catalog-select"
          aria-label="Filtrar por año de publicación"
        >
          <option value="">Año de publicación</option>
          <option value="2020+">2020 - Actual</option>
          <option value="2000-2019">2000 - 2019</option>
          <option value="PRE-2000">Antes de 2000</option>
        </select>

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
