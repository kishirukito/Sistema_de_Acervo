import React from 'react';
import { Search } from 'lucide-react';
import { UsersFilters } from './UsersFilters';
import type { UsersFilterState } from '../users.types';

interface UsersToolbarProps {
  filters: UsersFilterState;
  onFilterChange: (filters: UsersFilterState) => void;
  onClearFilters: () => void;
  totalFilteredCount: number;
  currentPage: number;
  totalPages: number;
}

export const UsersToolbar: React.FC<UsersToolbarProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  totalFilteredCount,
  currentPage,
  totalPages,
}) => {
  return (
    <div className="users-toolbar-card">
      <div className="users-toolbar-inputs-row">
        {/* Input de Búsqueda */}
        <div className="users-search-wrapper">
          <Search size={18} className="users-search-icon" aria-hidden="true" />
          <input
            type="text"
            placeholder="Buscar por nombre, correo o teléfono"
            value={filters.searchQuery}
            onChange={(e) =>
              onFilterChange({ ...filters, searchQuery: e.target.value })
            }
            className="users-search-input"
            aria-label="Buscar por nombre, correo, teléfono o código"
          />
        </div>

        {/* Dropdowns de Filtro */}
        <UsersFilters
          filters={filters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
        />
      </div>

      {/* Fila de Resumen: Mostrando X usuarios | Página X de Y */}
      <div className="users-toolbar-summary-row">
        <span className="users-summary-text">
          Mostrando <strong className="users-summary-count">{totalFilteredCount}</strong> usuarios
        </span>
        <span className="users-page-indicator">
          Página {totalPages === 0 ? 0 : currentPage} de {totalPages}
        </span>
      </div>
    </div>
  );
};
