import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const SearchPagination: React.FC<SearchPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="search-pagination-row" aria-label="Paginación de resultados de búsqueda">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="search-page-nav-btn"
        aria-label="Página anterior"
      >
        <ChevronLeft size={14} />
        <span>Anterior</span>
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={`search-page-num-btn ${
            currentPage === p ? 'search-page-num-btn--active' : ''
          }`}
          aria-label={`Página ${p}`}
          aria-current={currentPage === p ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="search-page-nav-btn"
        aria-label="Página siguiente"
      >
        <span>Siguiente</span>
        <ChevronRight size={14} />
      </button>
    </nav>
  );
};
