import React from 'react';
import { Search, X } from 'lucide-react';
import type { LoansFilterState, LoanStatus, NormalUserCategory } from '../loans.types';
import { CustomSelect } from '../../../components/ui/CustomSelect';

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
          <CustomSelect
            value={filters.status}
            onChange={(val) =>
              onFilterChange({ ...filters, status: val as '' | LoanStatus })
            }
            options={[
              { value: '', label: 'Estado' },
              { value: 'ACTIVE', label: 'Activo' },
              { value: 'DUE_SOON', label: 'Próximo a vencer' },
              { value: 'OVERDUE', label: 'Vencido' },
              { value: 'RETURNED', label: 'Devuelto' },
            ]}
            fullWidth={false}
            aria-label="Filtrar por estado"
          />

          {/* Dropdown 2: Fecha de préstamo */}
          <CustomSelect
            value={filters.dateFilter}
            onChange={(val) =>
              onFilterChange({ ...filters, dateFilter: val })
            }
            options={[
              { value: '', label: 'Fecha de préstamo' },
              { value: 'SEP_2026', label: 'Septiembre 2026' },
              { value: 'THIS_MONTH', label: 'Este mes' },
              { value: 'LAST_MONTH', label: 'Mes anterior' },
            ]}
            fullWidth={false}
            aria-label="Filtrar por fecha de préstamo"
          />

          {/* Dropdown 3: Fecha límite / Categoría */}
          <CustomSelect
            value={filters.userCategory}
            onChange={(val) =>
              onFilterChange({
                ...filters,
                userCategory: val as '' | NormalUserCategory,
              })
            }
            options={[
              { value: '', label: 'Fecha límite / Categoría' },
              { value: 'STUDENT', label: 'Alumnos' },
              { value: 'TEACHER', label: 'Docentes' },
              { value: 'ROOM', label: 'Salas' },
              { value: 'EXTERNAL', label: 'Personas externas' },
              { value: 'GRADUATE', label: 'Egresados' },
            ]}
            fullWidth={false}
            aria-label="Filtrar por fecha límite o categoría"
          />

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
