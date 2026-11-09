import React from 'react';
import { BookX, RotateCcw } from 'lucide-react';
import { ResourceCard } from './ResourceCard';
import { SearchPagination } from './SearchPagination';
import type { ResourceSearchResult } from '../search.types';

interface SearchResultsProps {
  resources: ResourceSearchResult[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onViewDetail: (resource: ResourceSearchResult) => void;
  onViewAISummary: (resource: ResourceSearchResult) => void;
  onClearFilters: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  resources,
  currentPage,
  totalPages,
  onPageChange,
  onViewDetail,
  onViewAISummary,
  onClearFilters,
}) => {
  if (resources.length === 0) {
    return (
      <div className="search-empty-state">
        <div className="search-empty-icon" aria-hidden="true">
          <BookX size={28} />
        </div>
        <h3 className="search-empty-title">No se encontraron libros</h3>
        <p className="search-empty-desc">
          No encontramos resultados que coincidan con los criterios y filtros seleccionados.
          Prueba con otros términos de búsqueda o restablece los filtros.
        </p>
        <button
          type="button"
          onClick={onClearFilters}
          className="search-btn-outline"
          style={{ height: '38px', gap: '6px' }}
        >
          <RotateCcw size={14} />
          <span>Restablecer filtros</span>
        </button>
      </div>
    );
  }

  return (
    <div className="search-results-col">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onViewDetail={onViewDetail}
            onViewAISummary={onViewAISummary}
          />
        ))}
      </div>

      <SearchPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};
