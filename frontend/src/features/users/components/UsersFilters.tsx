import React from 'react';
import { X } from 'lucide-react';
import type { UsersFilterState, UserKind, UserStatus } from '../users.types';
import { CustomSelect } from '../../../components/ui/CustomSelect';

interface UsersFiltersProps {
  filters: UsersFilterState;
  onFilterChange: (filters: UsersFilterState) => void;
  onClearFilters: () => void;
}

export const UsersFilters: React.FC<UsersFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const hasActiveFilters =
    Boolean(filters.searchQuery) ||
    Boolean(filters.kind) ||
    Boolean(filters.roleOrCategory) ||
    Boolean(filters.status);

  return (
    <div className="users-filters-row">
      {/* 1. Rol o categoría (labeled Rol as in Figma) */}
      <CustomSelect
        value={filters.roleOrCategory}
        onChange={(val) =>
          onFilterChange({
            ...filters,
            roleOrCategory: val,
          })
        }
        options={[
          { value: '', label: 'Rol' },
          ...((!filters.kind || filters.kind === 'ADMINISTRATIVE')
            ? [
                { value: 'ADMIN', label: 'Administrador' },
                { value: 'LIBRARIAN', label: 'Bibliotecario' },
              ]
            : []),
          ...((!filters.kind || filters.kind === 'NORMAL')
            ? [
                { value: 'TEACHER', label: 'Docente' },
                { value: 'STUDENT', label: 'Lector' },
                { value: 'EXTERNAL', label: 'Persona externa' },
                { value: 'ROOM', label: 'Sala' },
                { value: 'GRADUATE', label: 'Egresado' },
              ]
            : []),
        ]}
        fullWidth={false}
        aria-label="Filtrar por rol o categoría"
      />

      {/* 2. Estado (as in Figma) */}
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

      {/* 3. Tipo de usuario */}
      <CustomSelect
        value={filters.kind}
        onChange={(val) =>
          onFilterChange({
            ...filters,
            kind: val as '' | UserKind,
            roleOrCategory: '',
          })
        }
        options={[
          { value: '', label: 'Tipo' },
          { value: 'ADMINISTRATIVE', label: 'Administrativo' },
          { value: 'NORMAL', label: 'Usuario normal' },
        ]}
        fullWidth={false}
        aria-label="Filtrar por tipo de usuario"
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
