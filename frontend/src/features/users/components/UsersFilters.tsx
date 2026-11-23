import React from 'react';
import { X } from 'lucide-react';
import type { UsersFilterState, UserStatus } from '../users.types';
import { CustomSelect } from '../../../components/ui/CustomSelect';

interface UsersFiltersProps {
  filters: UsersFilterState;
  onFilterChange: (filters: UsersFilterState) => void;
  onClearFilters: () => void;
  availableGenerations?: number[];
}

export const UsersFilters: React.FC<UsersFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  availableGenerations = [],
}) => {
  const hasActiveFilters =
    Boolean(filters.searchQuery) ||
    Boolean(filters.classification && filters.classification !== 'ALL') ||
    Boolean(filters.generation) ||
    Boolean(filters.status);

  return (
    <div className="users-filters-row">
      {/* 1. Filtro por Generación (derivada de la matrícula) */}
      <CustomSelect
        value={filters.generation}
        onChange={(val) =>
          onFilterChange({
            ...filters,
            generation: val,
          })
        }
        options={[
          { value: '', label: 'Generación' },
          ...availableGenerations.map((year) => ({
            value: String(year),
            label: `Generación ${year}`,
          })),
        ]}
        fullWidth={false}
        aria-label="Filtrar por generación"
      />

      {/* 2. Filtro por Estado */}
      <CustomSelect
        value={filters.status}
        onChange={(val) =>
          onFilterChange({
            ...filters,
            status: val as '' | UserStatus | 'OVERDUE',
          })
        }
        options={[
          { value: '', label: 'Estado' },
          { value: 'ACTIVE', label: 'Activo' },
          { value: 'INACTIVE', label: 'Inactivo' },
          { value: 'SUSPENDED', label: 'Suspendido' },
          { value: 'OVERDUE', label: 'Préstamo vencido' },
        ]}
        fullWidth={false}
        aria-label="Filtrar por estado"
      />

      {/* Botón Limpiar filtros cuando hay filtros aplicados */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="users-clear-filters-btn"
          aria-label="Limpiar filtros de búsqueda"
        >
          <X size={14} />
          <span>Limpiar</span>
        </button>
      )}
    </div>
  );
};
