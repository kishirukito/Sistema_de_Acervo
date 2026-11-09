import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LoansPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const LoansPagination: React.FC<LoansPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="loans-pagination-row">
      <div className="loans-pagination-info">
        {startItem}–{endItem} de {totalItems} resultados
      </div>

      <div className="loans-pagination-controls" aria-label="Controles de paginación">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="loans-page-nav-btn"
          aria-label="Ir a la página anterior"
        >
          <ChevronLeft size={16} />
          <span>Anterior</span>
        </button>

        {pagesArray.map((pageNum) => {
          const isActive = pageNum === currentPage;
          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`loans-page-number-btn ${
                isActive ? 'loans-page-number-btn--active' : ''
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Página ${pageNum}`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="loans-page-nav-btn"
          aria-label="Ir a la página siguiente"
        >
          <span>Siguiente</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
