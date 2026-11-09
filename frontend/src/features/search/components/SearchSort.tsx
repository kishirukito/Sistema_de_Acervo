import React from 'react';
import type { SortOption } from '../search.types';
import { CustomSelect } from '../../../components/ui/CustomSelect';

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
        <span className="search-sort-label">Ordenar por:</span>
        <CustomSelect
          id="search-sort-select"
          variant="inline"
          value={sortBy}
          onChange={(val) => onSortChange(val as SortOption)}
          options={[
            { value: 'relevance', label: 'Relevancia' },
            { value: 'title', label: 'Título' },
            { value: 'recent', label: 'Más recientes' },
          ]}
          fullWidth={false}
          align="right"
          aria-label="Ordenar resultados"
        />
      </div>
    </div>
  );
};
