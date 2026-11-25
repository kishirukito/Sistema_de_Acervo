import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getPaginationItems } from '../../../utils/pagination';

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

  const paginationItems = getPaginationItems(currentPage, totalPages);

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

        {paginationItems.map((item) =>
          typeof item === 'number' ? (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={`catalog-page-btn ${
                item === currentPage ? 'catalog-page-btn--active' : ''
              }`}
              aria-current={item === currentPage ? 'page' : undefined}
            >
              {item}
            </button>
          ) : (
            <span
              key={item}
              className="catalog-page-ellipsis"
              aria-hidden="true"
            >
              …
            </span>
          )
        )}

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
