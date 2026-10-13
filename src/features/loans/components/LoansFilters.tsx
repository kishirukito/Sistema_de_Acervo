import React from 'react';
import { Search, X } from 'lucide-react';
import type { LoansFilterState, LoanStatus, NormalUserCategory } from '../loans.types';

interface LoansFiltersProps {
  filters: LoansFilterState;
  onFilterChange: (filters: LoansFilterState) => void;
  onClearFilters: () => void;
  totalFilteredCount: number;
  currentPage: number;
  totalPages: number;
}

export const LoansFilters: React.FC<LoansFiltersProps> = ({
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
    Boolean(filters.userCategory) ||
    Boolean(filters.dateFilter);

  return (
    <div className="loans-toolbar-card">
      <div className="loans-toolbar-inputs-row">
        {/* Search input */}
        <div className="loans-search-wrapper">
          <Search size={18} className="loans-search-icon" aria-hidden="true" />
          <input
            type="text"
            placeholder="Buscar por folio, usuario o título del libro"
            value={filters.searchQuery}
            onChange={(e) =>
              onFilterChange({ ...filters, searchQuery: e.target.value })
            }
            className="loans-search-input"
            aria-label="Buscar por folio, usuario o título del libro"
          />
        </div>

        {/* Filter dropdowns matching Figma layout: Estado, Fecha de préstamo, Fecha límite */}
        <div className="loans-filters-group">
          {/* Dropdown 1: Estado */}
          <select
            value={filters.status}
            onChange={(e) =>
              onFilterChange({ ...filters, status: e.target.value as '' | LoanStatus })
            }
            className="loans-select"
            aria-label="Filtrar por estado"
          >
            <option value="">Estado</option>
            <option value="ACTIVE">Activo</option>
            <option value="DUE_SOON">Próximo a vencer</option>
            <option value="OVERDUE">Vencido</option>
            <option value="RETURNED">Devuelto</option>
          </select>

          {/* Dropdown 2: Fecha de préstamo */}
          <select
            value={filters.dateFilter}
            onChange={(e) =>
              onFilterChange({ ...filters, dateFilter: e.target.value })
            }
            className="loans-select"
            aria-label="Filtrar por fecha de préstamo"
          >
            <option value="">Fecha de préstamo</option>
            <option value="SEP_2026">Septiembre 2026</option>
            <option value="THIS_MONTH">Este mes</option>
            <option value="LAST_MONTH">Mes anterior</option>
          </select>

          {/* Dropdown 3: Fecha límite / Categoría */}
          <select
            value={filters.userCategory}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                userCategory: e.target.value as '' | NormalUserCategory,
              })
            }
            className="loans-select"
            aria-label="Filtrar por fecha límite o categoría"
          >
            <option value="">Fecha límite</option>
            <optgroup label="Filtrar por Categoría">
              <option value="STUDENT">Alumnos</option>
              <option value="TEACHER">Docentes</option>
              <option value="ROOM">Salas</option>
              <option value="EXTERNAL">Personas externas</option>
              <option value="GRADUATE">Egresados</option>
            </optgroup>
          </select>

          {/* Limpiar filtros */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="loans-clear-btn"
              aria-label="Limpiar filtros de préstamos"
            >
              <X size={14} />
              <span>Limpiar</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-row: Mostrando X préstamos | Página X de Y */}
      <div className="loans-toolbar-summary-row">
        <span className="loans-summary-count-text">
          Mostrando <strong className="loans-summary-count-bold">{totalFilteredCount}</strong> préstamos
        </span>
        <span className="loans-summary-page-indicator">
          Página {totalPages === 0 ? 0 : currentPage} de {totalPages}
        </span>
      </div>
    </div>
  );
};
