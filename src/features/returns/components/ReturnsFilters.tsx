import React from 'react';
import { Search, X } from 'lucide-react';
import type { ReturnsFilterState, LoanStatus, NormalUserCategory } from '../returns.types';

interface ReturnsFiltersProps {
  filters: ReturnsFilterState;
  onFilterChange: (filters: ReturnsFilterState) => void;
  onClearFilters: () => void;
  totalFilteredCount: number;
  currentPage: number;
  totalPages: number;
}

export const ReturnsFilters: React.FC<ReturnsFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  totalFilteredCount,
  currentPage,
  totalPages,
}) => {
  const hasActiveFilters =
    Boolean(filters.searchQuery) ||
    Boolean(filters.status) ||
    Boolean(filters.dueDateFilter) ||
    Boolean(filters.userCategory);

  return (
    <div className="returns-toolbar-card">
      <div className="returns-toolbar-inputs-row">
        {/* Search input */}
        <div className="returns-search-wrapper">
          <Search size={18} className="returns-search-icon" aria-hidden="true" />
          <input
            type="text"
            placeholder="Buscar por folio, usuario, ISBN o título del libro"
            value={filters.searchQuery}
            onChange={(e) =>
              onFilterChange({ ...filters, searchQuery: e.target.value })
            }
            className="returns-search-input"
            aria-label="Buscar por folio, usuario, ISBN o título del libro"
          />
        </div>

        {/* Dropdowns group matching Figma layout: Estado, Fecha límite, Usuario */}
        <div className="returns-filters-group">
          {/* Dropdown 1: Estado */}
          <select
            value={filters.status}
            onChange={(e) =>
              onFilterChange({ ...filters, status: e.target.value as '' | LoanStatus })
            }
            className="returns-select"
            aria-label="Filtrar por estado"
          >
            <option value="">Estado</option>
            <option value="ACTIVE">Activo</option>
            <option value="DUE_SOON">Próximo a vencer</option>
            <option value="OVERDUE">Vencido</option>
          </select>

          {/* Dropdown 2: Fecha límite */}
          <select
            value={filters.dueDateFilter}
            onChange={(e) =>
              onFilterChange({ ...filters, dueDateFilter: e.target.value })
            }
            className="returns-select"
            aria-label="Filtrar por fecha límite"
          >
            <option value="">Fecha límite</option>
            <option value="OVERDUE_ONLY">Solo vencidos</option>
            <option value="THIS_WEEK">Esta semana</option>
            <option value="OCT_2026">Octubre 2026</option>
          </select>

          {/* Dropdown 3: Usuario / Categoría */}
          <select
            value={filters.userCategory}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                userCategory: e.target.value as '' | NormalUserCategory,
              })
            }
            className="returns-select"
            aria-label="Filtrar por tipo o categoría de usuario"
          >
            <option value="">Usuario</option>
            <option value="STUDENT">Alumno</option>
            <option value="TEACHER">Docente</option>
            <option value="EXTERNAL">Persona externa</option>
            <option value="ROOM">Sala</option>
            <option value="GRADUATE">Egresado</option>
          </select>

          {/* Limpiar filtros */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="returns-clear-btn"
              aria-label="Limpiar filtros de devoluciones"
            >
              <X size={14} />
              <span>Limpiar</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-row: Mostrando X préstamos | Página X de Y */}
      <div className="returns-toolbar-summary-row">
        <span className="returns-summary-count-text">
          Mostrando <strong className="returns-summary-count-bold">{totalFilteredCount}</strong> préstamos
        </span>
        <span className="returns-summary-page-indicator">
          Página {totalPages === 0 ? 0 : currentPage} de {totalPages}
        </span>
      </div>
    </div>
  );
};
