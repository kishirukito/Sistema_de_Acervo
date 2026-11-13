import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  BookOpen,
  Laptop,
  Brain,
  Users,
  Languages,
  FlaskConical,
  Cpu,
  Palette,
  Globe,
  ArrowRight,
  ChevronRight,
  Bookmark,
  ClipboardCheck,
  X,
  Code,
} from 'lucide-react';
import { BIBLIOGRAPHIC_CATEGORIES, getCategoryFullLabel } from '../../constants';
import { useAllBooks } from '../../features/catalog/books.query';
import './UserHomePage.css';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  '000': Laptop,
  '100': Brain,
  '200': Sparkles,
  '300': Users,
  '400': Languages,
  '500': FlaskConical,
  '600': Cpu,
  '700': Palette,
  '800': BookOpen,
  '900': Globe,
};

interface CategoryItem {
  code: string;
  name: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  param: string;
}

const CATEGORIES: CategoryItem[] = BIBLIOGRAPHIC_CATEGORIES.map((c) => ({
  code: c.code,
  name: c.name,
  label: c.label,
  icon: CATEGORY_ICONS[c.code] || BookOpen,
  param: c.code,
}));

export const UserHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [coverErrors, setCoverErrors] = useState<Record<string, boolean>>({});

  // ── React Query: reutiliza caché de libros si ya fue cargada ─────────────
  // Primera visita: lanza la petición y la guarda en caché 2 min.
  // Regreso a Home desde Catálogo: datos disponibles inmediatamente.
  const { data: liveBooks = [] } = useAllBooks();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      navigate(`/user/catalog?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/user/catalog');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleCategoryClick = (categoryParam: string) => {
    navigate(`/user/catalog?category=${encodeURIComponent(categoryParam)}`);
  };

  return (
    <div className="reader-home-container">
      {/* 1. Hero Search Banner */}
      <section className="reader-hero" aria-label="Búsqueda y bienvenida">
        <div className="reader-hero-content">
          <div className="reader-hero-badge" aria-label="Acervo Bibliográfico Digital y Físico">
            <Sparkles size={14} className="reader-hero-badge-icon" aria-hidden="true" />
            <span>{liveBooks.length} libros disponibles en el acervo</span>
          </div>

          <h2 className="reader-hero-title">Encuentra tu próxima lectura</h2>
          <p className="reader-hero-subtitle">
            Consulta la disponibilidad de los libros y solicita tu préstamo en línea.
          </p>

          {/* Search bar */}
          <form className="reader-hero-search-form" onSubmit={handleSearchSubmit} role="search">
            <div className="reader-hero-search-input-wrapper">
              <Search size={18} className="reader-hero-search-icon" aria-hidden="true" />
              <input
                type="text"
                className="reader-hero-search-input"
                placeholder="Busca por título, autor, tema o ISBN"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Buscar libros por título, autor, tema o ISBN"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="reader-hero-search-clear"
                  onClick={handleClearSearch}
                  aria-label="Limpiar término de búsqueda"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button type="submit" className="reader-hero-search-btn">
              Buscar
            </button>
          </form>
        </div>

        {/* Stack of books illustration */}
        <div className="reader-hero-graphic" aria-hidden="true">
          <svg
            className="reader-hero-books-svg"
            viewBox="0 0 340 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="210" cy="120" r="110" fill="white" fillOpacity="0.08" />
            <g transform="translate(60, 160)">
              <rect x="0" y="0" width="220" height="28" rx="5" fill="#1E3A8A" fillOpacity="0.9" />
              <rect x="8" y="4" width="204" height="20" rx="3" fill="#E0F2FE" />
              <path d="M0 0 L14 -6 L234 -6 L220 0 Z" fill="#2563EB" />
            </g>
            <g transform="translate(75, 130)">
              <rect x="0" y="0" width="195" height="25" rx="5" fill="#0284C7" />
              <rect x="8" y="4" width="180" height="17" rx="3" fill="#F0F9FF" />
              <path d="M0 0 L12 -6 L207 -6 L195 0 Z" fill="#38BDF8" />
            </g>
            <g transform="translate(90, 102)">
              <rect x="0" y="0" width="175" height="24" rx="4" fill="#0F766E" />
              <rect x="8" y="4" width="160" height="16" rx="3" fill="#F8FAFC" />
              <path d="M0 0 L12 -5 L187 -5 L175 0 Z" fill="#14B8A6" />
            </g>
          </svg>
        </div>
      </section>

      {/* 2. Explora por categoría */}
      <section className="reader-section" aria-labelledby="cat-heading">
        <div className="reader-section-header">
          <div>
            <h3 id="cat-heading" className="reader-section-title">
              Explora por categoría
            </h3>
            <p className="reader-section-subtitle">
              Encuentra libros para cada interés
            </p>
          </div>
        </div>

        <div className="reader-category-grid">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.code}
                type="button"
                className="reader-category-card"
                onClick={() => handleCategoryClick(cat.param)}
                aria-label={`Explorar categoría ${cat.label}`}
                title={cat.label}
              >
                <div className="reader-category-icon-box" aria-hidden="true">
                  <Icon size={20} />
                </div>
                <span className="reader-category-code-tag">{cat.code}</span>
                <span className="reader-category-label">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Libros recomendados de Supabase */}
      <section className="reader-section" aria-labelledby="rec-heading">
        <div className="reader-section-header">
          <div>
            <h3 id="rec-heading" className="reader-section-title">
              Libros en acervo
            </h3>
            <p className="reader-section-subtitle">
              Títulos registrados en la biblioteca
            </p>
          </div>
          <Link to="/user/catalog" className="reader-section-link">
            <span>Ver catálogo completo</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="reader-books-grid">
          {liveBooks.map((book) => {
            const hasCoverImg = Boolean(book.coverUrl) && !coverErrors[book.id];
            const fullCategory = getCategoryFullLabel(book.category);

            return (
              <article key={book.id} className="reader-book-card">
                <div className="reader-book-cover" aria-label={`Portada del libro ${book.title}`}>
                  {hasCoverImg ? (
                    <img
                      src={book.coverUrl}
                      alt={`Portada del libro ${book.title}`}
                      className="reader-book-cover-img"
                      onError={() => setCoverErrors((prev) => ({ ...prev, [book.id]: true }))}
                    />
                  ) : (
                    <div
                      className="reader-book-cover-fallback"
                      style={{
                        background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 55%, #60A5FA 100%)',
                      }}
                    >
                      <span className="reader-cover-tag">BIBLIOTECA</span>
                      <div className="reader-cover-art" aria-hidden="true">
                        <Code size={34} className="reader-cover-icon" />
                      </div>
                      <span className="reader-cover-title-overlay" title={book.title}>
                        {book.title}
                      </span>
                    </div>
                  )}
                </div>

                <div className="reader-book-info">
                  <span className="reader-book-category" title={fullCategory}>
                    {fullCategory}
                  </span>
                  <h4 className="reader-book-title" title={book.title}>
                    {book.title}
                  </h4>
                  <p className="reader-book-author" title={book.author}>
                    {book.author}
                  </p>

                  <div className="reader-book-availability">
                    <span className="reader-availability-badge">
                      <span className="reader-availability-dot" aria-hidden="true" />
                      <span>{book.availableCopies > 0 ? `${book.availableCopies} disponible(s)` : 'Prestado'}</span>
                    </span>
                  </div>

                  <Link
                    to={`/user/catalog/${book.id}`}
                    state={{ from: '/user/home' }}
                    className="reader-book-action-btn"
                    aria-label={`Ver libro ${book.title}`}
                  >
                    Ver libro
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 4. Bottom Two-Column: Novedades & Tus accesos rápidos */}
      <div className="reader-bottom-columns">
        <section className="reader-column-novedades" aria-labelledby="nov-heading">
          <div className="reader-section-header">
            <div>
              <h3 id="nov-heading" className="reader-section-title">
                Novedades en la biblioteca
              </h3>
              <p className="reader-section-subtitle">
                Títulos recién incorporados
              </p>
            </div>
            <Link to="/user/catalog" className="reader-section-link">
              <span>Ver todos</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="reader-novedades-grid">
            {liveBooks.slice(0, 3).map((book) => {
              const fullCategory = getCategoryFullLabel(book.category);
              return (
                <Link
                  key={book.id}
                  to={`/user/catalog/${book.id}`}
                  state={{ from: '/user/home' }}
                  className="reader-novedad-card"
                  aria-label={`Ver novedad ${book.title}`}
                >
                  <div className="reader-novedad-icon-box reader-novedad-icon--blue" aria-hidden="true">
                    <BookOpen size={20} color="#FFFFFF" />
                  </div>
                  <div className="reader-novedad-info">
                    <span className="reader-novedad-category" title={fullCategory}>{fullCategory}</span>
                    <h4 className="reader-novedad-title" title={book.title}>{book.title}</h4>
                    <p className="reader-novedad-author" title={book.author}>{book.author}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="reader-column-accesos" aria-labelledby="accesos-heading">
          <div className="reader-section-header">
            <div>
              <h3 id="accesos-heading" className="reader-section-title">
                Tus accesos rápidos
              </h3>
              <p className="reader-section-subtitle">
                Todo a un clic de distancia
              </p>
            </div>
          </div>

          <div className="reader-accesos-list">
            <Link to="/user/catalog" className="reader-acceso-card">
              <div className="reader-acceso-icon-box" aria-hidden="true">
                <BookOpen size={18} />
              </div>
              <div className="reader-acceso-info">
                <h4 className="reader-acceso-title">Explorar catálogo</h4>
                <p className="reader-acceso-desc">Descubre todos los títulos</p>
              </div>
              <ChevronRight size={18} className="reader-acceso-chevron" aria-hidden="true" />
            </Link>

            <Link to="/user/requests" className="reader-acceso-card">
              <div className="reader-acceso-icon-box" aria-hidden="true">
                <Bookmark size={18} />
              </div>
              <div className="reader-acceso-info">
                <h4 className="reader-acceso-title">Mis solicitudes</h4>
                <p className="reader-acceso-desc">Consulta el estado de tus pedidos</p>
              </div>
              <ChevronRight size={18} className="reader-acceso-chevron" aria-hidden="true" />
            </Link>

            <Link to="/user/loans" className="reader-acceso-card">
              <div className="reader-acceso-icon-box" aria-hidden="true">
                <ClipboardCheck size={18} />
              </div>
              <div className="reader-acceso-info">
                <h4 className="reader-acceso-title">Mis préstamos</h4>
                <p className="reader-acceso-desc">Revisa fechas y renovaciones</p>
              </div>
              <ChevronRight size={18} className="reader-acceso-chevron" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
