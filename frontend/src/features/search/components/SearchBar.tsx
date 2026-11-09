import React from 'react';
import { Search, X } from 'lucide-react';
import { SUGGESTED_SEARCHES } from '../search.mock';

interface SearchBarProps {
  query: string;
  onQueryChange: (val: string) => void;
  onSearch: (val: string) => void;
  onClear: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  onSearch,
  onClear,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChipClick = (suggestion: string) => {
    onQueryChange(suggestion);
    onSearch(suggestion);
  };

  return (
    <div className="search-hero-section">
      {/* Centered Hero Header */}
      <div className="search-hero">
        <h1 className="search-hero-title">Encuentra el libro que necesitas</h1>
        <p className="search-hero-subtitle">
          Busca por título, autor, tema o escribe una pregunta en lenguaje natural.
        </p>
      </div>

      {/* Main Search Card */}
      <div className="search-card">
        <form onSubmit={handleSubmit} className="search-bar-row">
          <div className="search-input-wrapper">
            <Search size={18} className="search-input-icon" aria-hidden="true" />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Busca por título, autor, tema o escribe una pregunta en lenguaje natural."
              className="search-input"
              aria-label="Buscar libros en el acervo"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="search-clear-btn"
                aria-label="Borrar consulta de búsqueda"
                title="Borrar consulta"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="search-submit-btn"
            aria-label="Ejecutar búsqueda de libros"
          >
            <Search size={16} />
            <span>Buscar</span>
          </button>
        </form>

        {/* Suggested Queries */}
        <div className="search-suggestions-container">
          <span className="search-suggestions-label">Búsquedas sugeridas:</span>
          <div className="search-suggestions-chips" role="group" aria-label="Sugerencias de búsqueda rápida">
            {SUGGESTED_SEARCHES.map((suggestion) => {
              const isSelected = query.trim().toLowerCase() === suggestion.toLowerCase();
              return (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleChipClick(suggestion)}
                  className={`search-chip ${isSelected ? 'search-chip--active' : ''}`}
                >
                  {suggestion}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
