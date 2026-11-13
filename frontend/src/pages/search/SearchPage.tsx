import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles, Database, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { SearchBar } from '../../features/search/components/SearchBar';
import { SearchFilters } from '../../features/search/components/SearchFilters';
import { SearchSort } from '../../features/search/components/SearchSort';
import { SearchResults } from '../../features/search/components/SearchResults';
import { RecommendationsCard } from '../../features/search/components/RecommendationsCard';
import { AIFooterNote } from '../../features/search/components/AIFooterNote';
import { AISummaryModal } from '../../features/search/components/AISummaryModal';
import { BookDetailModal } from '../../features/search/components/BookDetailModal';
import { searchBooks } from '../../services/api/search.service';
import { requestAISuggestions, requestSmartSearch, requestIndexAcervo } from '../../services/api/ai.service';
import { useAuth } from '../../features/auth/AuthContext';
import type {
  ResourceSearchResult,
  SearchFilterState,
  SortOption,
  RecommendedBook,
  AvailabilityStatus,
  MatchLevel,
} from '../../features/search/search.types';
import { resolveCategory } from '../../constants';
import '../../features/search/search.css';

const PAGE_SIZE = 4;

const GRADIENTS = [
  { from: '#1E3A5F', to: '#2F80ED' },
  { from: '#D97706', to: '#F59E0B' },
  { from: '#15803D', to: '#22C55E' },
  { from: '#7C3AED', to: '#A855F7' },
  { from: '#1E40AF', to: '#3B82F6' },
  { from: '#0284C7', to: '#38BDF8' },
  { from: '#059669', to: '#10B981' },
  { from: '#4F46E5', to: '#6366F1' },
];

function getInitials(title: string): string {
  const words = title.split(' ').filter((w) => w.length > 0);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return (title.slice(0, 2) || 'LB').toUpperCase();
}

export const SearchPage: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.kind === 'ADMINISTRATIVE' || (user as any)?.rol === 'admin' || (user as any)?.role === 'ADMIN';

  // Initial search query
  const [query, setQuery] = useState('POO');
  const [activeSearchTerm, setActiveSearchTerm] = useState('POO');

  // Filters state
  const [filters, setFilters] = useState<SearchFilterState>({
    category: '',
    author: '',
    publicationYear: '',
    availability: '',
  });

  // Sorting and pagination state
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [selectedForDetail, setSelectedForDetail] = useState<ResourceSearchResult | null>(null);
  const [selectedForAI, setSelectedForAI] = useState<ResourceSearchResult | null>(null);

  // AI Suggestions state from /api/v1/ai/sugerencias
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  // Smart Search state
  const [searchResultsList, setSearchResultsList] = useState<ResourceSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [serverMessage, setServerMessage] = useState<string>('');

  // Indexing State
  const [isIndexing, setIsIndexing] = useState<boolean>(false);
  const [indexingFeedback, setIndexingFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Re-index trigger handler
  const handleReindex = async () => {
    setIsIndexing(true);
    setIndexingFeedback(null);
    try {
      const res = await requestIndexAcervo();
      setIndexingFeedback({
        type: 'success',
        message: `Acervo indexado con éxito (${res.indexados} de ${res.total_libros} libros actualizados).`,
      });
      // Re-trigger current search
      if (activeSearchTerm.trim()) {
        executeSmartSearch(activeSearchTerm);
      }
    } catch (err: any) {
      setIndexingFeedback({
        type: 'error',
        message: err.message || 'Error al re-indexar el acervo.',
      });
    } finally {
      setIsIndexing(false);
    }
  };

  // Main search function using RAG Smart Search with fallback to searchBooks
  const executeSmartSearch = async (term: string) => {
    const cleanTerm = term.trim();
    if (!cleanTerm) {
      // Load general catalogue when search is empty
      setIsSearching(true);
      try {
        const data = await searchBooks('');
        setSearchResultsList(data || []);
        setServerMessage('');
      } catch {
        setSearchResultsList([]);
      } finally {
        setIsSearching(false);
      }
      return;
    }

    setIsSearching(true);
    setServerMessage('');
    try {
      const res = await requestSmartSearch(cleanTerm, 8);
      setServerMessage(res.mensaje || '');

      if (res.resultados && res.resultados.length > 0) {
        const mapped: ResourceSearchResult[] = res.resultados.map((item, idx) => {
          let matchLevel: MatchLevel = 'low';
          if (item.porcentaje_coincidencia >= 80) matchLevel = 'high';
          else if (item.porcentaje_coincidencia >= 60) matchLevel = 'medium';

          const isAvailable = item.ejemplares_disponibles > 0;
          const availability: AvailabilityStatus = isAvailable
            ? 'AVAILABLE'
            : item.total_ejemplares > 0
            ? 'BORROWED'
            : 'UNAVAILABLE';

          return {
            id: item.id,
            title: item.titulo,
            author: item.autores && item.autores.length > 0 ? item.autores.join(', ') : 'Autor académico',
            publicationYear: 2024,
            pages: 0,
            category: item.temas?.[0] || '000',
            resourceType: 'Libro impreso',
            subjects: item.temas || [],
            description: item.sinopsis || `Libro: ${item.titulo}`,
            location: item.ubicacion || 'Biblioteca Central CIU',
            isbn: item.isbn || '',
            totalCopies: item.total_ejemplares,
            availableCopies: item.ejemplares_disponibles,
            availability,
            matchLevel,
            relevanceScore: item.porcentaje_coincidencia,
            aiExplanation: item.explicacion,
            coverGradient: GRADIENTS[idx % GRADIENTS.length],
            coverInitials: getInitials(item.titulo),
            aiSummary: item.sinopsis || 'Resumen no disponible.',
          };
        });
        setSearchResultsList(mapped);
      } else {
        setSearchResultsList([]);
      }
    } catch (smartErr) {
      console.warn('[SearchPage] Smart search failed, fallback to keyword search:', smartErr);
      const data = await searchBooks(cleanTerm);
      setSearchResultsList(data || []);
      setServerMessage('');
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    executeSmartSearch(activeSearchTerm);
  }, [activeSearchTerm]);

  // CORRECCIÓN 4: Solicitar sugerencias a la IA mediante el microservicio
  useEffect(() => {
    let active = true;
    if (!activeSearchTerm || activeSearchTerm.trim().length < 2) {
      setAiSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);
    setAiError(null);
    requestAISuggestions(activeSearchTerm)
      .then((topics) => {
        if (!active) return;
        setAiSuggestions(topics);
      })
      .catch(() => {
        if (!active) return;
        setAiError('Sugerencias de IA no disponibles temporalmente.');
      })
      .finally(() => {
        if (active) setIsLoadingSuggestions(false);
      });

    return () => {
      active = false;
    };
  }, [activeSearchTerm]);

  // Distinct filter options extracted from mock data
  const categories = useMemo(() => {
    const set = new Set(searchResultsList.map((r) => r.category));
    return Array.from(set).sort();
  }, []);

  const authors = useMemo(() => {
    const set = new Set(searchResultsList.map((r) => r.author));
    return Array.from(set).sort();
  }, []);

  const years = useMemo(() => {
    const set = new Set(searchResultsList.map((r) => r.publicationYear));
    return Array.from(set).sort((a, b) => b - a);
  }, []);

  // Filter and search logic
  const filteredResults = useMemo(() => {
    return searchResultsList.filter((resource) => {
      // 1. Category filter
      if (filters.category) {
        const filterCatCode = resolveCategory(filters.category)?.code || filters.category;
        const resCatCode = resolveCategory(resource.category)?.code || resource.category;
        if (resCatCode !== filterCatCode) {
          return false;
        }
      }

      // 2. Author filter
      if (filters.author && resource.author !== filters.author) {
        return false;
      }

      // 3. Publication year filter
      if (filters.publicationYear && String(resource.publicationYear) !== filters.publicationYear) {
        return false;
      }

      // 4. Availability filter
      if (filters.availability && resource.availability !== filters.availability) {
        return false;
      }

      return true;
    });
  }, [searchResultsList, filters]);

  // Sort logic
  const sortedResults = useMemo(() => {
    const list = [...filteredResults];

    if (sortBy === 'relevance') {
      const matchScore = (r: ResourceSearchResult) => {
        if (r.matchLevel === 'high') return 3;
        if (r.matchLevel === 'medium') return 2;
        return 1;
      };
      list.sort((a, b) => matchScore(b) - matchScore(a));
    } else if (sortBy === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'recent') {
      list.sort((a, b) => b.publicationYear - a.publicationYear);
    }

    return list;
  }, [filteredResults, sortBy]);

  // Pagination calculation
  const totalResults = sortedResults.length;
  const totalPages = Math.ceil(totalResults / PAGE_SIZE) || 1;

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return sortedResults.slice(startIndex, startIndex + PAGE_SIZE);
  }, [sortedResults, currentPage]);

  // Reset page when search term, filters, or sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSearchTerm, filters, sortBy]);

  // Handlers
  const handleSearch = (searchTerm: string) => {
    setActiveSearchTerm(searchTerm);
  };

  const handleClearQuery = () => {
    setQuery('');
    setActiveSearchTerm('');
  };

  const handleFilterChange = <K extends keyof SearchFilterState>(
    key: K,
    val: SearchFilterState[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      author: '',
      publicationYear: '',
      availability: '',
    });
  };

  const handleSelectRecommendation = (book: RecommendedBook) => {
    // When a recommendation is clicked, search for that title
    setQuery(book.title);
    setActiveSearchTerm(book.title);
  };

  return (
    <div className="search-page-container">
      {/* Top Admin Action Bar for Vector Indexing */}
      {isAdmin && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            marginBottom: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: '#475569' }}>
            <Database size={16} style={{ color: '#0284c7' }} />
            <span>
              <strong>Panel Admin:</strong> Índice Vectorial de Búsqueda Semántica RAG (Ollama nomic-embed-text).
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {indexingFeedback && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.8rem',
                  color: indexingFeedback.type === 'success' ? '#15803d' : '#b91c1c',
                }}
              >
                {indexingFeedback.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                {indexingFeedback.message}
              </span>
            )}
            <button
              type="button"
              onClick={handleReindex}
              disabled={isIndexing}
              className="search-btn-outline"
              style={{
                height: '32px',
                padding: '0 12px',
                fontSize: '0.8rem',
                gap: '6px',
                borderColor: '#cbd5e1',
                backgroundColor: '#ffffff',
              }}
            >
              {isIndexing ? (
                <>
                  <Loader2 size={14} className="search-spin-icon" />
                  <span>Indexando...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} style={{ color: '#7c3aed' }} />
                  <span>Re-indexar Acervo IA</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Hero Header + Main Search Card + Suggested Queries */}
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        onClear={handleClearQuery}
        aiSuggestions={aiSuggestions}
        isLoadingSuggestions={isLoadingSuggestions}
        aiError={aiError}
      />

      {/* Institutional Message when no results or specific RAG notice */}
      {serverMessage && !isSearching && (
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: paginatedResults.length > 0 ? '#f0fdf4' : '#fffbeb',
            border: `1px solid ${paginatedResults.length > 0 ? '#bbf7d0' : '#fef3c7'}`,
            borderRadius: '8px',
            color: paginatedResults.length > 0 ? '#166534' : '#92400e',
            fontSize: '0.875rem',
            margin: '1rem 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {paginatedResults.length > 0 ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{serverMessage}</span>
        </div>
      )}

      {/* 4 Dropdown Filters Bar */}
      <SearchFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        categories={categories}
        authors={authors}
        years={years}
      />

      {/* Results Header: Query title, count, and Sort By */}
      <SearchSort
        query={activeSearchTerm}
        totalResults={totalResults}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Two-Column Layout: Results (left) and Recommendations (right) */}
      <div className="search-main-layout">
        {isSearching ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '260px',
              width: '100%',
              gap: '12px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              padding: '2rem',
            }}
          >
            <Loader2 size={32} className="search-spin-icon" style={{ color: '#0284c7' }} />
            <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}>
              Consultando acervo con Búsqueda Inteligente RAG...
            </p>
          </div>
        ) : (
          <SearchResults
            resources={paginatedResults}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onViewDetail={(r) => setSelectedForDetail(r)}
            onViewAISummary={(r) => setSelectedForAI(r)}
            onClearFilters={handleClearFilters}
          />
        )}

        <RecommendationsCard onSelectRecommendation={handleSelectRecommendation} />
      </div>

      {/* Bottom Info Banner */}
      <AIFooterNote />

      {/* Modals */}
      <AISummaryModal
        resource={selectedForAI}
        onClose={() => setSelectedForAI(null)}
      />

      <BookDetailModal
        resource={selectedForDetail}
        onClose={() => setSelectedForDetail(null)}
      />
    </div>
  );
};
export default SearchPage;
