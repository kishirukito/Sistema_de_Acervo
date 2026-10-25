import React, { useState, useMemo, useEffect } from 'react';
import { SearchBar } from '../../features/search/components/SearchBar';
import { SearchFilters } from '../../features/search/components/SearchFilters';
import { SearchSort } from '../../features/search/components/SearchSort';
import { SearchResults } from '../../features/search/components/SearchResults';
import { RecommendationsCard } from '../../features/search/components/RecommendationsCard';
import { AIFooterNote } from '../../features/search/components/AIFooterNote';
import { AISummaryModal } from '../../features/search/components/AISummaryModal';
import { BookDetailModal } from '../../features/search/components/BookDetailModal';
import { MOCK_SEARCH_RESULTS } from '../../features/search/search.mock';
import type {
  ResourceSearchResult,
  SearchFilterState,
  SortOption,
  RecommendedBook,
} from '../../features/search/search.types';
import { resolveCategory } from '../../constants';
import '../../features/search/search.css';

const PAGE_SIZE = 3;

export const SearchPage: React.FC = () => {
  // Initial search query matching the Figma reference capture exactly
  const [query, setQuery] = useState('Libros para aprender programación');
  const [activeSearchTerm, setActiveSearchTerm] = useState('Libros para aprender programación');

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

  // Distinct filter options extracted from mock data
  const categories = useMemo(() => {
    const set = new Set(MOCK_SEARCH_RESULTS.map((r) => r.category));
    return Array.from(set).sort();
  }, []);

  const authors = useMemo(() => {
    const set = new Set(MOCK_SEARCH_RESULTS.map((r) => r.author));
    return Array.from(set).sort();
  }, []);

  const years = useMemo(() => {
    const set = new Set(MOCK_SEARCH_RESULTS.map((r) => r.publicationYear));
    return Array.from(set).sort((a, b) => b - a);
  }, []);

  // Filter and search logic
  const filteredResults = useMemo(() => {
    const term = activeSearchTerm.trim().toLowerCase();

    return MOCK_SEARCH_RESULTS.filter((resource) => {
      // 1. Keyword search (matches title, author, subjects, description, ISBN, category)
      if (term) {
        const titleMatch = resource.title.toLowerCase().includes(term);
        const authorMatch = resource.author.toLowerCase().includes(term);
        const descMatch = resource.description.toLowerCase().includes(term);
        const isbnMatch = resource.isbn.toLowerCase().includes(term);
        const subjectMatch = resource.subjects.some((s) => s.toLowerCase().includes(term));
        const resCat = resolveCategory(resource.category);
        const categoryMatch =
          resource.category.toLowerCase().includes(term) ||
          Boolean(resCat && resCat.label.toLowerCase().includes(term));

        // Also check if any word from multi-word search term matches (fuzzy support)
        const words = term.split(/\s+/).filter((w) => w.length > 2);
        const wordMatch =
          words.length > 0 &&
          words.some(
            (w) =>
              resource.title.toLowerCase().includes(w) ||
              resource.subjects.some((s) => s.toLowerCase().includes(w)) ||
              resource.description.toLowerCase().includes(w)
          );

        if (!titleMatch && !authorMatch && !descMatch && !isbnMatch && !subjectMatch && !categoryMatch && !wordMatch) {
          return false;
        }
      }

      // 2. Category filter
      if (filters.category) {
        const filterCatCode = resolveCategory(filters.category)?.code || filters.category;
        const resCatCode = resolveCategory(resource.category)?.code || resource.category;
        if (resCatCode !== filterCatCode) {
          return false;
        }
      }

      // 3. Author filter
      if (filters.author && resource.author !== filters.author) {
        return false;
      }

      // 4. Publication year filter
      if (filters.publicationYear && String(resource.publicationYear) !== filters.publicationYear) {
        return false;
      }

      // 5. Availability filter
      if (filters.availability && resource.availability !== filters.availability) {
        return false;
      }

      return true;
    });
  }, [activeSearchTerm, filters]);

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
      {/* Hero Header + Main Search Card + Suggested Queries */}
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        onClear={handleClearQuery}
      />

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
        <SearchResults
          resources={paginatedResults}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onViewDetail={(r) => setSelectedForDetail(r)}
          onViewAISummary={(r) => setSelectedForAI(r)}
          onClearFilters={handleClearFilters}
        />

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
