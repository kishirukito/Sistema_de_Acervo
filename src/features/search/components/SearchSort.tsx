import React from 'react';
import type { SortOption } from '../search.types';

interface SearchSortProps {
  query: string;
  totalResults: number;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const SearchSort: React.FC<SearchSortProps> = ({
  query,
  totalResults,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="search-results-header">
      <div className="search-results-info">
        <h2 className="search-results-query-title">
          Resultados para:{' '}
          <span className="search-query-highlight">
            &quot;{query.trim() ? query : 'Todos los recursos'}&quot;
          </span>
        </h2>
        <p className="search-results-count-sub">
          Se encontraron{' '}
          <strong className="search-results-count-number">{totalResults}</strong> libros
          relacionados
        </p>
      </div>

      <div className="search-sort-group">
        <label htmlFor="search-sort-select" className="search-sort-label">
          Ordenar por:
        </label>
        <select
          id="search-sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="search-sort-select"
          aria-label="Ordenar resultados"
        >
          <option value="relevance">Relevancia</option>
          <option value="title">Título</option>
          <option value="recent">Más recientes</option>
        </select>
      </div>
    </div>
  );
};
