import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CatalogPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const CatalogPagination: React.FC<CatalogPaginationProps> = ({
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
    <div className="catalog-pagination-row">
      <div className="catalog-pagination-info">
        {startItem}–{endItem} de {totalItems} resultados
      </div>

      <div className="catalog-pagination-controls" aria-label="Paginación de resultados">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="catalog-page-btn"
          aria-label="Página anterior"
        >
          <ChevronLeft size={16} />
          <span>Anterior</span>
        </button>

        {pagesArray.map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={`catalog-page-btn ${
              pageNum === currentPage ? 'catalog-page-btn--active' : ''
            }`}
            aria-current={pageNum === currentPage ? 'page' : undefined}
          >
            {pageNum}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="catalog-page-btn"
          aria-label="Página siguiente"
        >
          <span>Siguiente</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
