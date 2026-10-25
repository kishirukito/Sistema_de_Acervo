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
  Infinity as InfinityIcon,
  Code,
} from 'lucide-react';
import { BIBLIOGRAPHIC_CATEGORIES } from '../../constants';
import './UserHomePage.css';

interface RecommendedBookItem {
  id: string;
  tag: string;
  title: string;
  author: string;
  gradientClass: string;
  symbolType: 'sparkle' | 'infinity' | 'code' | 'lens';
}

const RECOMMENDED_BOOKS: RecommendedBookItem[] = [
  {
    id: 'book-principito',
    tag: '800 — Literatura',
    title: 'El principito',
    author: 'Antoine de Saint-Exupéry',
    gradientClass: 'reader-cover--principito',
    symbolType: 'sparkle',
  },
  {
    id: 'book-soledad',
    tag: '800 — Literatura',
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    gradientClass: 'reader-cover--soledad',
    symbolType: 'infinity',
  },
  {
    id: 'book-python',
    tag: '000 — Ciencias de las Computadoras, Información y Obras Generales',
    title: 'Introducción a Python',
    author: 'Laura Méndez',
    gradientClass: 'reader-cover--python',
    symbolType: 'code',
  },
  {
    id: 'book-quijote',
    tag: '800 — Literatura',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    gradientClass: 'reader-cover--quijote',
    symbolType: 'lens',
  },
];

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
          {/* Discover badge */}
          <div className="reader-hero-badge" aria-label="Más de 12.000 libros para descubrir">
            <Sparkles size={14} className="reader-hero-badge-icon" aria-hidden="true" />
            <span>Más de 12.000 libros para descubrir</span>
          </div>

          <h2 className="reader-hero-title">Encuentra tu próxima lectura</h2>
          <p className="reader-hero-subtitle">
            Consulta la disponibilidad de miles de libros y solicita tu préstamo en línea.
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
            {/* Soft background glow */}
            <circle cx="210" cy="120" r="110" fill="white" fillOpacity="0.08" />

            {/* Stack of books viewed in perspective */}
            {/* Base Book 1 */}
            <g transform="translate(60, 160)">
              <rect x="0" y="0" width="220" height="28" rx="5" fill="#1E3A8A" fillOpacity="0.9" />
              <rect x="8" y="4" width="204" height="20" rx="3" fill="#E0F2FE" />
              <line x1="8" y1="9" x2="212" y2="9" stroke="#93C5FD" strokeWidth="1" />
              <line x1="8" y1="14" x2="212" y2="14" stroke="#93C5FD" strokeWidth="1" />
              <line x1="8" y1="19" x2="212" y2="19" stroke="#93C5FD" strokeWidth="1" />
              <path d="M0 0 L14 -6 L234 -6 L220 0 Z" fill="#2563EB" />
            </g>

            {/* Book 2 */}
            <g transform="translate(75, 130)">
              <rect x="0" y="0" width="195" height="25" rx="5" fill="#0284C7" />
              <rect x="8" y="4" width="180" height="17" rx="3" fill="#F0F9FF" />
              <line x1="8" y1="8" x2="188" y2="8" stroke="#BAE6FD" strokeWidth="1" />
              <line x1="8" y1="13" x2="188" y2="13" stroke="#BAE6FD" strokeWidth="1" />
              <line x1="8" y1="18" x2="188" y2="18" stroke="#BAE6FD" strokeWidth="1" />
              <path d="M0 0 L12 -6 L207 -6 L195 0 Z" fill="#38BDF8" />
            </g>

            {/* Book 3 */}
            <g transform="translate(90, 102)">
              <rect x="0" y="0" width="175" height="24" rx="4" fill="#0F766E" />
              <rect x="8" y="4" width="160" height="16" rx="3" fill="#F8FAFC" />
              <line x1="8" y1="8" x2="168" y2="8" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="8" y1="12" x2="168" y2="12" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="8" y1="16" x2="168" y2="16" stroke="#CBD5E1" strokeWidth="1" />
              <path d="M0 0 L12 -5 L187 -5 L175 0 Z" fill="#14B8A6" />
            </g>

            {/* Book 4 */}
            <g transform="translate(105, 76)">
              <rect x="0" y="0" width="155" height="22" rx="4" fill="#1E40AF" />
              <rect x="7" y="3" width="142" height="15" rx="3" fill="#EFF6FF" />
              <line x1="7" y1="7" x2="149" y2="7" stroke="#BFDBFE" strokeWidth="1" />
              <line x1="7" y1="11" x2="149" y2="11" stroke="#BFDBFE" strokeWidth="1" />
              <line x1="7" y1="15" x2="149" y2="15" stroke="#BFDBFE" strokeWidth="1" />
              <path d="M0 0 L10 -5 L165 -5 L155 0 Z" fill="#3B82F6" />
            </g>

            {/* Book 5 (Top book) */}
            <g transform="translate(120, 52)">
              <rect x="0" y="0" width="135" height="20" rx="4" fill="#2563EB" />
              <rect x="6" y="3" width="124" height="14" rx="2" fill="#FFFFFF" />
              <line x1="6" y1="7" x2="130" y2="7" stroke="#DBEAFE" strokeWidth="1" />
              <line x1="6" y1="11" x2="130" y2="11" stroke="#DBEAFE" strokeWidth="1" />
              <path d="M0 0 L10 -5 L145 -5 L135 0 Z" fill="#60A5FA" />
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

      {/* 3. Libros recomendados */}
      <section className="reader-section" aria-labelledby="rec-heading">
        <div className="reader-section-header">
          <div>
            <h3 id="rec-heading" className="reader-section-title">
              Libros recomendados
            </h3>
            <p className="reader-section-subtitle">
              Selecciones pensadas para ti
            </p>
          </div>
          <Link to="/user/catalog" className="reader-section-link">
            <span>Ver todos</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="reader-books-grid">
          {RECOMMENDED_BOOKS.map((book) => (
            <article key={book.id} className="reader-book-card">
              {/* Graphic Cover */}
              <div className={`reader-book-cover ${book.gradientClass}`}>
                <div className="reader-cover-tag">BIBLIOTECA</div>
                <div className="reader-cover-art" aria-hidden="true">
                  {book.symbolType === 'sparkle' && (
                    <Sparkles size={32} className="reader-cover-icon" />
                  )}
                  {book.symbolType === 'infinity' && (
                    <InfinityIcon size={34} className="reader-cover-icon" />
                  )}
                  {book.symbolType === 'code' && (
                    <Code size={34} className="reader-cover-icon" />
                  )}
                  {book.symbolType === 'lens' && (
                    <div className="reader-cover-circle-lens" />
                  )}
                </div>
                <div className="reader-cover-title-overlay">{book.title}</div>
              </div>

              {/* Book Metadata */}
              <div className="reader-book-info">
                <span className="reader-book-category">{book.tag}</span>
                <h4 className="reader-book-title">{book.title}</h4>
                <p className="reader-book-author">{book.author}</p>

                <div className="reader-book-availability">
                  <span className="reader-availability-badge">
                    <span className="reader-availability-dot" aria-hidden="true" />
                    <span>Disponible</span>
                  </span>
                </div>

                <Link
                  to={`/user/catalog/${book.id}`}
                  className="reader-book-action-btn"
                  aria-label={`Ver libro ${book.title}`}
                >
                  Ver libro
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Bottom Two-Column: Novedades & Tus accesos rápidos */}
      <div className="reader-bottom-columns">
        {/* Left Column: Novedades en la biblioteca */}
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
            {/* Item 1: Hábitos atómicos */}
            <Link
              to="/user/catalog/book-habitos-atomicos"
              className="reader-novedad-card"
              aria-label="Ver novedad Hábitos atómicos"
            >
              <div className="reader-novedad-icon-box reader-novedad-icon--amber" aria-hidden="true">
                <BookOpen size={20} color="#FFFFFF" />
              </div>
              <div className="reader-novedad-info">
                <span className="reader-novedad-category">100 — Filosofía y Psicología</span>
                <h4 className="reader-novedad-title">Hábitos atómicos</h4>
                <p className="reader-novedad-author">James Clear</p>
              </div>
            </Link>

            {/* Item 2: Breve historia del tiempo */}
            <Link
              to="/user/catalog/book-breve-historia"
              className="reader-novedad-card"
              aria-label="Ver novedad Breve historia del tiempo"
            >
              <div className="reader-novedad-icon-box reader-novedad-icon--purple" aria-hidden="true">
                <FlaskConical size={20} color="#FFFFFF" />
              </div>
              <div className="reader-novedad-info">
                <span className="reader-novedad-category">500 — Ciencias</span>
                <h4 className="reader-novedad-title">Breve historia del tiempo</h4>
                <p className="reader-novedad-author">Stephen Hawking</p>
              </div>
            </Link>

            {/* Item 3: Diseño de interfaces */}
            <Link
              to="/user/catalog/book-diseno-interfaces"
              className="reader-novedad-card"
              aria-label="Ver novedad Diseño de interfaces"
            >
              <div className="reader-novedad-icon-box reader-novedad-icon--blue" aria-hidden="true">
                <Laptop size={20} color="#FFFFFF" />
              </div>
              <div className="reader-novedad-info">
                <span className="reader-novedad-category">000 — Ciencias de las Computadoras, Información y Obras Generales</span>
                <h4 className="reader-novedad-title">Diseño de interfaces</h4>
                <p className="reader-novedad-author">María Ortega</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Right Column: Tus accesos rápidos */}
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
            {/* Quick 1: Explorar catálogo */}
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

            {/* Quick 2: Mis solicitudes */}
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

            {/* Quick 3: Mis préstamos */}
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
