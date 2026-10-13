import React from 'react';
import { X } from 'lucide-react';
import type { UsersFilterState, UserKind, UserStatus } from '../users.types';

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
      <select
        value={filters.roleOrCategory}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            roleOrCategory: e.target.value,
          })
        }
        className="users-select"
        aria-label="Filtrar por rol o categoría"
      >
        <option value="">Rol</option>
        {(!filters.kind || filters.kind === 'ADMINISTRATIVE') && (
          <optgroup label="Administrativos">
            <option value="ADMIN">Administrador</option>
            <option value="LIBRARIAN">Bibliotecario</option>
          </optgroup>
        )}
        {(!filters.kind || filters.kind === 'NORMAL') && (
          <optgroup label="Usuarios Normales">
            <option value="TEACHER">Docente</option>
            <option value="STUDENT">Lector</option>
            <option value="EXTERNAL">Persona externa</option>
            <option value="ROOM">Sala</option>
            <option value="GRADUATE">Egresado</option>
          </optgroup>
        )}
      </select>

      {/* 2. Estado (as in Figma) */}
      <select
        value={filters.status}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            status: e.target.value as '' | UserStatus | 'OVERDUE',
          })
        }
        className="users-select"
        aria-label="Filtrar por estado"
      >
        <option value="">Estado</option>
        <option value="ACTIVE">Activo</option>
        <option value="INACTIVE">Inactivo</option>
        <option value="SUSPENDED">Suspendido</option>
        <option value="OVERDUE">Préstamo vencido</option>
      </select>

      {/* 3. Tipo de usuario */}
      <select
        value={filters.kind}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            kind: e.target.value as '' | UserKind,
            roleOrCategory: '',
          })
        }
        className="users-select"
        aria-label="Filtrar por tipo de usuario"
      >
        <option value="">Tipo</option>
        <option value="ADMINISTRATIVE">Administrativo</option>
        <option value="NORMAL">Usuario normal</option>
      </select>

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
