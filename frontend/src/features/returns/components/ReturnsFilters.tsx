import React from 'react';
import { Search, X } from 'lucide-react';
import type { ReturnsFilterState, LoanStatus, NormalUserCategory } from '../returns.types';
import { CustomSelect } from '../../../components/ui/CustomSelect';

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
            ]}
            fullWidth={false}
            aria-label="Filtrar por estado"
          />

          {/* Dropdown 2: Fecha límite */}
          <CustomSelect
            value={filters.dueDateFilter}
            onChange={(val) =>
              onFilterChange({ ...filters, dueDateFilter: val })
            }
            options={[
              { value: '', label: 'Fecha límite' },
              { value: 'OVERDUE_ONLY', label: 'Solo vencidos' },
              { value: 'THIS_WEEK', label: 'Esta semana' },
              { value: 'OCT_2026', label: 'Octubre 2026' },
            ]}
            fullWidth={false}
            aria-label="Filtrar por fecha límite"
          />

          {/* Dropdown 3: Usuario / Categoría */}
          <CustomSelect
            value={filters.userCategory}
            onChange={(val) =>
              onFilterChange({
                ...filters,
                userCategory: val as '' | NormalUserCategory,
              })
            }
            options={[
              { value: '', label: 'Usuario' },
              { value: 'STUDENT', label: 'Alumno' },
              { value: 'TEACHER', label: 'Docente' },
              { value: 'EXTERNAL', label: 'Persona externa' },
              { value: 'ROOM', label: 'Sala' },
              { value: 'GRADUATE', label: 'Egresado' },
            ]}
            fullWidth={false}
            aria-label="Filtrar por tipo o categoría de usuario"
          />

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
