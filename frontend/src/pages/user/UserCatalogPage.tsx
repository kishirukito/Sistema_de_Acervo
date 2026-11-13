import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import {
  Search,
  Check,
  Clock,
  Ban,
  X,
  Filter,
  BookOpen,
  Sparkles,
  Infinity as InfinityIcon,
  Code,
} from 'lucide-react';
import clsx from 'clsx';
import { booksService } from '../../services/api/books.service';
import type { Book } from '../../types';
import {
  BIBLIOGRAPHIC_CATEGORIES,
  resolveCategory,
  getCategoryName,
} from '../../constants';
import { CustomSelect } from '../../components/ui/CustomSelect';
import { useRealtimeTable } from '../../hooks/useRealtimeTable';
import './UserCatalogPage.css';

const ITEMS_PER_PAGE = 6;

type SortOption =
  | 'relevance'
  | 'title-asc'
  | 'title-desc'
  | 'year-desc'
  | 'year-asc'
  | 'available-desc';

type SearchScope = 'ALL' | 'title' | 'author' | 'category' | 'isbn';

/** Normalize accents and lowercase for fuzzy text search */
const normalizeText = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

interface BookCoverMetadata {
  gradient: string;
  symbol: React.ReactNode;
  badgeLabel: string;
  badgeVariant: 'blue' | 'purple' | 'yellow' | 'green' | 'teal';
}

/** Get aesthetic gradient and symbol matching Figma design */
const getBookCoverMetadata = (book: Book): BookCoverMetadata => {
  // Specific covers matching Figma reference
  if (book.id === 'book-python') {
    return {
      gradient: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 55%, #60A5FA 100%)',
      symbol: <Code size={36} color="#FFFFFF" strokeWidth={2.5} />,
      badgeLabel: 'TECNOLOGÍA',
      badgeVariant: 'blue',
    };
  }

  if (book.id === 'book-soledad') {
    return {
      gradient: 'linear-gradient(135deg, #065F46 0%, #059669 44%, #EAB308 76%, #F59E0B 100%)',
      symbol: <InfinityIcon size={36} color="#FFFFFF" strokeWidth={2.5} />,
      badgeLabel: 'NOVELA',
      badgeVariant: 'purple',
    };
  }

  if (book.id === 'book-principito') {
    return {
      gradient: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 42%, #F59E0B 75%, #D97706 100%)',
      symbol: <Sparkles size={34} color="#FFFFFF" />,
      badgeLabel: 'INFANTIL',
      badgeVariant: 'yellow',
    };
  }

  if (book.id === 'book-historia-mexico') {
    return {
      gradient: 'linear-gradient(145deg, #78350F 0%, #9A3412 50%, #C2410C 100%)',
      symbol: <span className="catalog-card-cover-symbol">MX</span>,
      badgeLabel: 'HISTORIA',
      badgeVariant: 'blue',
    };
  }

  if (book.id === 'book-fundamentos-prog') {
    return {
      gradient: 'linear-gradient(145deg, #312E81 0%, #4338CA 50%, #6366F1 100%)',
      symbol: <span className="catalog-card-cover-symbol">{'{ }'}</span>,
      badgeLabel: 'TECNOLOGÍA',
      badgeVariant: 'blue',
    };
  }

  if (book.id === 'book-admin-empresas') {
    return {
      gradient: 'linear-gradient(145deg, #134E4A 0%, #0F766E 50%, #14B8A6 100%)',
      symbol: <span className="catalog-card-cover-symbol">A+</span>,
      badgeLabel: 'ADMINISTRACIÓN',
      badgeVariant: 'blue',
    };
  }

  // Deterministic fallbacks for remaining library items based on Dewey Category
  const cat = resolveCategory(book.category);
  const code = cat?.code || '000';

  switch (code) {
    case '000':
      return {
        gradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
        symbol: <Code size={34} color="#FFFFFF" strokeWidth={2.2} />,
        badgeLabel: 'TECNOLOGÍA',
        badgeVariant: 'blue',
      };
    case '100':
      return {
        gradient: 'linear-gradient(135deg, #7C2D12 0%, #D97706 100%)',
        symbol: <Sparkles size={34} color="#FFFFFF" />,
        badgeLabel: 'FILOSOFÍA',
        badgeVariant: 'purple',
      };
    case '200':
      return {
        gradient: 'linear-gradient(135deg, #4C1D95 0%, #8B5CF6 100%)',
        symbol: <Sparkles size={34} color="#FFFFFF" />,
        badgeLabel: 'RELIGIÓN',
        badgeVariant: 'purple',
      };
    case '300':
      return {
        gradient: 'linear-gradient(135deg, #0369A1 0%, #0284C7 100%)',
        symbol: <span className="catalog-card-cover-symbol">§</span>,
        badgeLabel: 'CIENCIAS SOCIALES',
        badgeVariant: 'blue',
      };
    case '400':
      return {
        gradient: 'linear-gradient(135deg, #B45309 0%, #F59E0B 100%)',
        symbol: <span className="catalog-card-cover-symbol">Aa</span>,
        badgeLabel: 'LENGUAS',
        badgeVariant: 'yellow',
      };
    case '500':
      return {
        gradient: 'linear-gradient(135deg, #047857 0%, #10B981 100%)',
        symbol: <span className="catalog-card-cover-symbol">⚗</span>,
        badgeLabel: 'CIENCIAS',
        badgeVariant: 'green',
      };
    case '600':
      return {
        gradient: 'linear-gradient(135deg, #0E7490 0%, #06B6D4 100%)',
        symbol: <span className="catalog-card-cover-symbol">⚙</span>,
        badgeLabel: 'TECNOLOGÍA',
        badgeVariant: 'teal',
      };
    case '700':
      return {
        gradient: 'linear-gradient(135deg, #BE185D 0%, #F43F5E 100%)',
        symbol: <span className="catalog-card-cover-symbol">◈</span>,
        badgeLabel: 'ARTES',
        badgeVariant: 'purple',
      };
    case '800':
      return {
        gradient: 'linear-gradient(135deg, #1D4ED8 0%, #D97706 100%)',
        symbol: <InfinityIcon size={34} color="#FFFFFF" strokeWidth={2} />,
        badgeLabel: 'LITERATURA',
        badgeVariant: 'purple',
      };
    case '900':
    default:
      return {
        gradient: 'linear-gradient(135deg, #9A3412 0%, #EA580C 100%)',
        symbol: <span className="catalog-card-cover-symbol">MX</span>,
        badgeLabel: 'HISTORIA',
        badgeVariant: 'blue',
      };
  }
};

export const UserCatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Live books state from Supabase
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadBooks = useCallback(() => {
    setIsLoading(true);
    booksService
      .getAll()
      .then((data: Book[]) => {
        if (Array.isArray(data)) setBooksList(data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // ── Realtime: actualizar catálogo del alumno cuando cambia disponibilidad ──
  useRealtimeTable('libros', { onInsert: loadBooks, onUpdate: loadBooks, onDelete: loadBooks });
  useRealtimeTable('ejemplares', { onUpdate: loadBooks });

  // Search state
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'ALL';

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [appliedSearch, setAppliedSearch] = useState(initialSearch);
  const [searchScope, setSearchScope] = useState<SearchScope>('ALL');

  // Filter states
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedAuthor, setSelectedAuthor] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedLocation, setSelectedLocation] = useState('ALL');

  // Sorting & Pagination
  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile drawer state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Synchronize URL search params when they change externally
  useEffect(() => {
    const s = searchParams.get('search');
    if (s !== null) {
      setSearchInput(s);
      setAppliedSearch(s);
    }
    const c = searchParams.get('category');
    if (c !== null) {
      setSelectedCategory(c);
    }
  }, [searchParams]);

  // Unique authors, publication years and locations from MOCK_BOOKS
  const uniqueAuthors = useMemo(() => {
    const authors = Array.from(new Set(booksList.map((b) => b.author))).sort();
    return authors;
  }, [booksList]);

  const uniqueYears = useMemo(() => {
    const years = Array.from(new Set(booksList.map((b) => b.publishYear))).sort(
      (a, b) => b - a
    );
    return years;
  }, [booksList]);

  const uniqueLocations = useMemo(() => {
    const locs = Array.from(new Set(booksList.map((b) => b.location))).sort();
    return locs;
  }, [booksList]);

  // Memoized options for CustomSelect components
  const categoryOptions = useMemo(
    () => [
      { value: 'ALL', label: 'Todas' },
      ...BIBLIOGRAPHIC_CATEGORIES.map((cat) => ({
        value: cat.code,
        label: cat.label,
      })),
    ],
    []
  );

  const authorOptions = useMemo(
    () => [
      { value: 'ALL', label: 'Todos' },
      ...uniqueAuthors.map((author) => ({ value: author, label: author })),
    ],
    [uniqueAuthors]
  );

  const yearOptions = useMemo(
    () => [
      { value: 'ALL', label: 'Todos' },
      ...uniqueYears.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      })),
    ],
    [uniqueYears]
  );

  const locationOptions = useMemo(
    () => [
      { value: 'ALL', label: 'Todas' },
      ...uniqueLocations.map((loc) => ({ value: loc, label: loc })),
    ],
    [uniqueLocations]
  );

  const sortOptions = useMemo(
    () => [
      { value: 'relevance', label: 'Relevancia' },
      { value: 'title-asc', label: 'Título (A - Z)' },
      { value: 'title-desc', label: 'Título (Z - A)' },
      { value: 'year-desc', label: 'Año (Más reciente)' },
      { value: 'year-asc', label: 'Año (Más antiguo)' },
      { value: 'available-desc', label: 'Disponibilidad' },
    ],
    []
  );

  const scopeOptions = useMemo(
    () => [
      { value: 'ALL', label: 'Todo' },
      { value: 'title', label: 'Título' },
      { value: 'author', label: 'Autor' },
      { value: 'category', label: 'Tema / Categoría' },
      { value: 'isbn', label: 'ISBN' },
    ],
    []
  );

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (onlyAvailable) count++;
    if (selectedCategory !== 'ALL') count++;
    if (selectedAuthor !== 'ALL') count++;
    if (selectedYear !== 'ALL') count++;
    if (selectedLocation !== 'ALL') count++;
    return count;
  }, [onlyAvailable, selectedCategory, selectedAuthor, selectedYear, selectedLocation]);

  // Execute search submit
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedSearch(searchInput);
    setCurrentPage(1);

    const newParams = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      newParams.set('search', searchInput.trim());
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setAppliedSearch('');
    setCurrentPage(1);

    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams, { replace: true });
  };

  // Reset all sidebar filters
  const handleResetFilters = () => {
    setOnlyAvailable(false);
    setSelectedCategory('ALL');
    setSelectedAuthor('ALL');
    setSelectedYear('ALL');
    setSelectedLocation('ALL');
    setCurrentPage(1);

    const newParams = new URLSearchParams(searchParams);
    newParams.delete('category');
    setSearchParams(newParams, { replace: true });
  };

  // Reset everything including search
  const handleResetAll = () => {
    handleResetFilters();
    handleClearSearch();
  };

  // Category filter change
  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setCurrentPage(1);

    const newParams = new URLSearchParams(searchParams);
    if (val === 'ALL') {
      newParams.delete('category');
    } else {
      newParams.set('category', val);
    }
    setSearchParams(newParams, { replace: true });
  };

  // Filter and sort books
  const filteredAndSortedBooks = useMemo(() => {
    const normQuery = normalizeText(appliedSearch);

    const filtered = booksList.filter((book) => {
      // 1. Search Query
      if (normQuery) {
        const normTitle = normalizeText(book.title);
        const normAuthor = normalizeText(book.author);
        const normIsbn = normalizeText(book.isbn);
        const normDesc = normalizeText(book.description || '');
        const normCatName = normalizeText(getCategoryName(book.category));

        if (searchScope === 'title') {
          if (!normTitle.includes(normQuery)) return false;
        } else if (searchScope === 'author') {
          if (!normAuthor.includes(normQuery)) return false;
        } else if (searchScope === 'isbn') {
          if (!normIsbn.includes(normQuery)) return false;
        } else if (searchScope === 'category') {
          if (!normCatName.includes(normQuery) && !normDesc.includes(normQuery))
            return false;
        } else {
          // 'ALL'
          const matchesAny =
            normTitle.includes(normQuery) ||
            normAuthor.includes(normQuery) ||
            normIsbn.includes(normQuery) ||
            normDesc.includes(normQuery) ||
            normCatName.includes(normQuery);
          if (!matchesAny) return false;
        }
      }

      // 2. Only Available Filter
      if (onlyAvailable && book.availableCopies <= 0) {
        return false;
      }

      // 3. Category Filter
      if (selectedCategory !== 'ALL') {
        const resolvedBookCat = resolveCategory(book.category);
        const resolvedFilterCat = resolveCategory(selectedCategory);
        const filterCode = resolvedFilterCat?.code || selectedCategory;

        if (!resolvedBookCat || resolvedBookCat.code !== filterCode) {
          return false;
        }
      }

      // 4. Author Filter
      if (selectedAuthor !== 'ALL' && book.author !== selectedAuthor) {
        return false;
      }

      // 5. Publication Year Filter
      if (
        selectedYear !== 'ALL' &&
        book.publishYear.toString() !== selectedYear
      ) {
        return false;
      }

      // 6. Location Filter
      if (selectedLocation !== 'ALL' && book.location !== selectedLocation) {
        return false;
      }

      return true;
    });

    // Sort items
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'year-desc':
          return b.publishYear - a.publishYear;
        case 'year-asc':
          return a.publishYear - b.publishYear;
        case 'available-desc':
          return b.availableCopies - a.availableCopies;
        case 'relevance':
        default:
          return 0; // Natural mock order
      }
    });

    return sorted;
  }, [
    appliedSearch,
    searchScope,
    onlyAvailable,
    selectedCategory,
    selectedAuthor,
    selectedYear,
    selectedLocation,
    sortOption,
    booksList,
  ]);

  // Pagination calculation
  const totalItems = filteredAndSortedBooks.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const displayedBooks = filteredAndSortedBooks.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="catalog-container">
      {/* 1. Header */}
      <header className="user-catalog-header">
        <h1 className="user-catalog-title">Encuentra tu próxima lectura</h1>
      </header>

      {/* 2. Top Search Bar */}
      <form
        className="catalog-search-card user-catalog-search-card"
        onSubmit={handleSearchSubmit}
        role="search"
        aria-label="Buscador del catálogo"
      >
        <div className="catalog-search-field-container user-catalog-search-field-container">
          <Search size={18} className="catalog-search-icon user-catalog-search-icon" aria-hidden="true" />
          <input
            type="text"
            className="catalog-search-input user-catalog-search-input"
            placeholder="Busca por título, autor o tema..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            aria-label="Término de búsqueda"
          />
          {searchInput.length > 0 && (
            <button
              type="button"
              className="catalog-search-clear-btn user-catalog-search-clear-btn"
              onClick={handleClearSearch}
              aria-label="Borrar búsqueda"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button type="submit" className="catalog-search-submit-btn user-catalog-search-submit-btn">
          Buscar
        </button>

        <div className="catalog-search-scope-box user-catalog-search-scope-box">
          <label
            htmlFor="catalog-search-scope-select"
            className="catalog-search-scope-label user-catalog-search-scope-label"
          >
            Buscar por
          </label>
          <CustomSelect
            id="catalog-search-scope-select"
            variant="scope"
            value={searchScope}
            onChange={(val) => {
              setSearchScope(val as SearchScope);
              setCurrentPage(1);
            }}
            options={scopeOptions}
            fullWidth={false}
          />
        </div>
      </form>

      {/* 3. Main Content Row: Sidebar Filters + Results */}
      <div className="catalog-layout-row">
        {/* Left Column: Filters Sidebar (Desktop) */}
        <aside
          className="catalog-filters-sidebar"
          aria-label="Filtros de búsqueda de catálogo"
        >
          <div className="catalog-filters-header">
            <h2 className="catalog-filters-title">Filtrar resultados</h2>
            <button
              type="button"
              className="catalog-filters-clear-btn"
              onClick={handleResetFilters}
            >
              Limpiar filtros
            </button>
          </div>

          {/* Toggle: Solo libros disponibles */}
          <label className="catalog-toggle-row">
            <span className="catalog-toggle-label">Solo libros disponibles</span>
            <div
              className={clsx(
                'catalog-toggle-switch',
                onlyAvailable && 'catalog-toggle-switch--active'
              )}
              aria-hidden="true"
            >
              <div className="catalog-toggle-thumb" />
            </div>
            <input
              type="checkbox"
              className="sr-only"
              checked={onlyAvailable}
              onChange={(e) => {
                setOnlyAvailable(e.target.checked);
                setCurrentPage(1);
              }}
            />
          </label>

          {/* Filter 1: Categoría */}
          <div className="catalog-filter-group">
            <CustomSelect
              id="filter-category"
              label="Categoría"
              value={selectedCategory}
              onChange={handleCategoryChange}
              options={categoryOptions}
              defaultOpen={typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('openCategory') === '1'}
            />
          </div>

          {/* Filter 2: Autor */}
          <div className="catalog-filter-group">
            <CustomSelect
              id="filter-author"
              label="Autor"
              value={selectedAuthor}
              onChange={(val) => {
                setSelectedAuthor(val);
                setCurrentPage(1);
              }}
              options={authorOptions}
            />
          </div>

          {/* Filter 3: Año de publicación */}
          <div className="catalog-filter-group">
            <CustomSelect
              id="filter-year"
              label="Año de publicación"
              value={selectedYear}
              onChange={(val) => {
                setSelectedYear(val);
                setCurrentPage(1);
              }}
              options={yearOptions}
            />
          </div>

          {/* Filter 4: Ubicación */}
          <div className="catalog-filter-group">
            <CustomSelect
              id="filter-location"
              label="Ubicación"
              value={selectedLocation}
              onChange={(val) => {
                setSelectedLocation(val);
                setCurrentPage(1);
              }}
              options={locationOptions}
            />
          </div>
        </aside>

        {/* Right Column: Results & Grid */}
        <section
          className="catalog-results-column"
          aria-label="Resultados del catálogo"
        >
          {/* Results Topbar */}
          <div className="catalog-results-topbar">
            <div className="catalog-results-count-group">
              <h3 className="catalog-results-title">
                Mostrando {totalItems} {totalItems === 1 ? 'libro' : 'libros'}
              </h3>
              <p className="catalog-results-subtitle">
                {displayedBooks.length}{' '}
                {displayedBooks.length === 1 ? 'resultado' : 'resultados'} en esta
                página · Actualizado hoy
              </p>
            </div>

            <div className="catalog-results-controls">
              {/* Mobile Filter Trigger Button */}
              <button
                type="button"
                className="catalog-mobile-filter-btn"
                onClick={() => setMobileFiltersOpen(true)}
                aria-label="Abrir panel de filtros"
              >
                <Filter size={16} />
                <span>Filtros</span>
                {activeFiltersCount > 0 && (
                  <span className="catalog-mobile-filter-badge">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Sort by dropdown */}
              <div className="catalog-sort-wrapper">
                <span className="catalog-sort-label">Ordenar por:</span>
                <CustomSelect
                  id="catalog-sort-select"
                  variant="inline"
                  value={sortOption}
                  onChange={(val) => {
                    setSortOption(val as SortOption);
                    setCurrentPage(1);
                  }}
                  options={sortOptions}
                  fullWidth={false}
                  align="right"
                />
              </div>
            </div>
          </div>

          {/* Skeleton Loader / Empty State / Grid */}
          {isLoading ? (
            <div className="catalog-grid" aria-busy="true" aria-label="Cargando libros del catálogo">
              {[1, 2, 3, 4, 5, 6].map((sk) => (
                <div
                  key={sk}
                  className="catalog-card"
                  style={{
                    minHeight: 380,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    border: '1px solid #E2E8F0',
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      height: 180,
                      backgroundColor: '#F1F5F9',
                      borderRadius: 8,
                      marginBottom: 16,
                    }}
                  />
                  <div
                    style={{
                      height: 20,
                      backgroundColor: '#E2E8F0',
                      borderRadius: 4,
                      marginBottom: 10,
                      width: '75%',
                    }}
                  />
                  <div
                    style={{
                      height: 14,
                      backgroundColor: '#F1F5F9',
                      borderRadius: 4,
                      marginBottom: 12,
                      width: '45%',
                    }}
                  />
                  <div
                    style={{
                      height: 38,
                      backgroundColor: '#F1F5F9',
                      borderRadius: 8,
                      marginTop: 'auto',
                    }}
                  />
                </div>
              ))}
            </div>
          ) : displayedBooks.length === 0 ? (
            <div className="catalog-empty-card">
              <div className="catalog-empty-icon" aria-hidden="true">
                <BookOpen size={28} />
              </div>
              <h4 className="catalog-empty-title">No se encontraron libros</h4>
              <p className="catalog-empty-desc">
                No encontramos coincidencias para los filtros o términos de
                búsqueda seleccionados. Intenta restablecer los criterios.
              </p>
              <button
                type="button"
                className="catalog-empty-reset-btn"
                onClick={handleResetAll}
              >
                Restablecer búsqueda y filtros
              </button>
            </div>
          ) : (
            <>
              {/* 3x2 Book Grid */}
              <div className="catalog-grid">
                {displayedBooks.map((book) => {
                  const meta = getBookCoverMetadata(book);

                  return (
                    <article key={book.id} className="catalog-card">
                      {/* Top Cover */}
                      <div
                        className="catalog-card-cover"
                        style={{ background: meta.gradient }}
                      >
                        {book.coverUrl && (
                          <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="catalog-card-cover-img"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        )}
                        <span className="catalog-card-cover-tag">
                          BIBLIOTECA
                        </span>

                        <div
                          className="catalog-card-cover-art"
                          aria-hidden="true"
                        >
                          {meta.symbol}
                        </div>

                        <div className="catalog-card-cover-decor" aria-hidden="true" />

                        <div className="catalog-card-cover-title">
                          {book.title}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="catalog-card-body">
                        <div className="catalog-card-top-info">
                          {/* Category Badge & Year */}
                          <div className="catalog-card-tag-row">
                            <span
                              className={clsx(
                                'catalog-card-category-badge',
                                `catalog-card-category-badge--${meta.badgeVariant}`
                              )}
                            >
                              {meta.badgeLabel}
                            </span>
                            <span className="catalog-card-year">
                              {book.publishYear}
                            </span>
                          </div>

                          {/* Book Title & Author */}
                          <h4 className="catalog-card-title" title={book.title}>
                            {book.title}
                          </h4>
                          <p className="catalog-card-author" title={book.author}>
                            {book.author}
                          </p>

                          {/* Availability Badge & Copies */}
                          <div className="catalog-card-status-group">
                            {book.availableCopies >= 2 && (
                              <span className="catalog-status-badge catalog-status-badge--available">
                                <Check size={12} strokeWidth={3} />
                                <span>Disponible</span>
                              </span>
                            )}
                            {book.availableCopies === 1 && (
                              <span className="catalog-status-badge catalog-status-badge--low">
                                <Clock size={12} strokeWidth={2.5} />
                                <span>Pocos ejemplares</span>
                              </span>
                            )}
                            {book.availableCopies === 0 && (
                              <span className="catalog-status-badge catalog-status-badge--unavailable">
                                <Ban size={12} strokeWidth={2.5} />
                                <span>No disponible</span>
                              </span>
                            )}

                            <span className="catalog-card-copies-text">
                              {book.availableCopies} de {book.totalCopies}{' '}
                              disponibles
                            </span>
                          </div>
                        </div>

                        {/* Action: Ver detalle */}
                        <Link
                          to={`/user/catalog/${book.id}`}
                          state={{ from: `${location.pathname}${location.search}` }}
                          className="catalog-card-action-btn"
                          aria-label={`Ver detalle de ${book.title}`}
                        >
                          Ver detalle
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* 4. Pagination */}
              {totalPages > 1 && (
                <nav
                  className="catalog-pagination"
                  aria-label="Páginas del catálogo"
                >
                  <button
                    type="button"
                    className="catalog-page-btn"
                    disabled={safeCurrentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    aria-label="Página anterior"
                  >
                    Anterior
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        className={clsx(
                          'catalog-page-btn',
                          pageNum === safeCurrentPage && 'catalog-page-btn--active'
                        )}
                        onClick={() => setCurrentPage(pageNum)}
                        aria-current={
                          pageNum === safeCurrentPage ? 'page' : undefined
                        }
                      >
                        {pageNum}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    className="catalog-page-btn"
                    disabled={safeCurrentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    aria-label="Página siguiente"
                  >
                    Siguiente
                  </button>
                </nav>
              )}
            </>
          )}
        </section>
      </div>

      {/* 5. Mobile Filter Drawer / Modal */}
      {mobileFiltersOpen && (
        <>
          <div
            className="catalog-drawer-backdrop"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden="true"
          />
          <div
            className="catalog-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-drawer-title"
          >
            <div className="catalog-drawer-header">
              <h3 id="mobile-drawer-title" className="catalog-drawer-title">
                Filtrar resultados
              </h3>
              <button
                type="button"
                className="catalog-drawer-close-btn"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Cerrar filtros"
              >
                <X size={20} />
              </button>
            </div>

            <div className="catalog-drawer-body">
              {/* Toggle: Solo libros disponibles */}
              <label className="catalog-toggle-row">
                <span className="catalog-toggle-label">
                  Solo libros disponibles
                </span>
                <div
                  className={clsx(
                    'catalog-toggle-switch',
                    onlyAvailable && 'catalog-toggle-switch--active'
                  )}
                  aria-hidden="true"
                >
                  <div className="catalog-toggle-thumb" />
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={onlyAvailable}
                  onChange={(e) => {
                    setOnlyAvailable(e.target.checked);
                    setCurrentPage(1);
                  }}
                />
              </label>

              {/* Categoría */}
              <div className="catalog-filter-group">
                <CustomSelect
                  id="mobile-filter-category"
                  label="Categoría"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  options={categoryOptions}
                />
              </div>

              {/* Autor */}
              <div className="catalog-filter-group">
                <CustomSelect
                  id="mobile-filter-author"
                  label="Autor"
                  value={selectedAuthor}
                  onChange={(val) => {
                    setSelectedAuthor(val);
                    setCurrentPage(1);
                  }}
                  options={authorOptions}
                />
              </div>

              {/* Año de publicación */}
              <div className="catalog-filter-group">
                <CustomSelect
                  id="mobile-filter-year"
                  label="Año de publicación"
                  value={selectedYear}
                  onChange={(val) => {
                    setSelectedYear(val);
                    setCurrentPage(1);
                  }}
                  options={yearOptions}
                />
              </div>

              {/* Ubicación */}
              <div className="catalog-filter-group">
                <CustomSelect
                  id="mobile-filter-location"
                  label="Ubicación"
                  value={selectedLocation}
                  onChange={(val) => {
                    setSelectedLocation(val);
                    setCurrentPage(1);
                  }}
                  options={locationOptions}
                />
              </div>
            </div>

            <div className="catalog-drawer-footer">
              <button
                type="button"
                className="catalog-drawer-reset-btn"
                onClick={handleResetFilters}
              >
                Limpiar
              </button>
              <button
                type="button"
                className="catalog-drawer-apply-btn"
                onClick={() => setMobileFiltersOpen(false)}
              >
                Ver resultados ({totalItems})
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
