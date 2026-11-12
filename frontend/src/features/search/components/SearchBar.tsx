import React from 'react';
import { Search, X, Sparkles, Loader2 } from 'lucide-react';
import { SUGGESTED_SEARCHES } from '../search.mock';

interface SearchBarProps {
  query: string;
  onQueryChange: (val: string) => void;
  onSearch: (val: string) => void;
  onClear: () => void;
  aiSuggestions?: string[];
  isLoadingSuggestions?: boolean;
  aiError?: string | null;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  onSearch,
  onClear,
  aiSuggestions = [],
  isLoadingSuggestions = false,
  aiError = null,
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

        {/* Dynamic AI Suggestions from /api/v1/ai/sugerencias */}
        <div
          className="search-suggestions-container"
          style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Sparkles size={14} color="#2563EB" />
            <span className="search-suggestions-label" style={{ color: '#1E40AF', fontWeight: 600 }}>
              Sugerencias de IA:
            </span>
            {isLoadingSuggestions && (
              <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Loader2 size={12} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                Consultando modelo...
              </span>
            )}
          </div>

          {aiSuggestions && aiSuggestions.length > 0 ? (
            <div className="search-suggestions-chips" role="group" aria-label="Sugerencias generadas por IA">
              {aiSuggestions.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => handleChipClick(sug)}
                  className="search-chip"
                  style={{
                    backgroundColor: '#EFF6FF',
                    borderColor: '#BFDBFE',
                    color: '#1E40AF',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Sparkles size={12} color="#3B82F6" />
                  <span>{sug}</span>
                </button>
              ))}
            </div>
          ) : aiError ? (
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
              {aiError}
            </span>
          ) : (
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              Escribe un término y pulsa Buscar para obtener sugerencias temáticas con IA.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
