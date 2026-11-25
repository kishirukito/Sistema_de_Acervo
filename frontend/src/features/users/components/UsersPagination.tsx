import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getPaginationItems } from '../../../utils/pagination';

interface UsersPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const UsersPagination: React.FC<UsersPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <div className="users-pagination-row">
      <div className="users-pagination-info">
        {startItem}–{endItem} de {totalItems} resultados
      </div>

      <div className="users-pagination-controls" aria-label="Controles de paginación">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="users-page-nav-btn"
          aria-label="Ir a la página anterior"
        >
          <ChevronLeft size={16} />
          <span>Anterior</span>
        </button>

        {paginationItems.map((item) => {
          if (typeof item !== 'number') {
            return (
              <span
                key={item}
                aria-hidden="true"
                style={{ padding: '0 6px', color: '#9CA3AF', userSelect: 'none' }}
              >
                …
              </span>
            );
          }
          const isActive = item === currentPage;
          return (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={`users-page-number-btn ${
                isActive ? 'users-page-number-btn--active' : ''
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Página ${item}`}
            >
              {item}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="users-page-nav-btn"
          aria-label="Ir a la página siguiente"
        >
          <span>Siguiente</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
