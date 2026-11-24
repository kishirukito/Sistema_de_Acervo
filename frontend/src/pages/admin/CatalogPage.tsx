import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, SearchX, CheckCircle, X, FileSpreadsheet, Library, BookOpen, Building2 } from 'lucide-react';
import { CatalogToolbar } from '../../features/catalog/components/CatalogToolbar';
import { ResourceTable } from '../../features/catalog/components/ResourceTable';
import { CatalogPagination } from '../../features/catalog/components/CatalogPagination';
import { BookDetailModal } from '../../features/search/components/BookDetailModal';
import { EditResourceModal } from '../../features/catalog/components/EditResourceModal';
import { DeleteBookModal } from '../../features/catalog/components/DeleteBookModal';
import { BulkImportBooksModal } from '../../features/catalog/components/BulkImportBooksModal';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { MOCK_RESOURCES } from '../../features/catalog/catalog.mock';
import { fetchCatalogResources, deleteResource, updateResource } from '../../services/api/catalog.service';
import { useAdminLoans } from '../../features/loans/admin-loans.query';
import { useRealtimeTable } from '../../hooks/useRealtimeTable';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { CatalogFilterState, Resource } from '../../features/catalog/catalog.types';
import { resolveCategory } from '../../constants';
import '../../features/catalog/catalog.css';

const INITIAL_FILTERS: CatalogFilterState = {
  searchQuery: '',
  category: '',
  status: '',
  publicationYear: '',
};

/** Clave compartida del catálogo admin. staleTime: 2 min. */
export const ADMIN_CATALOG_KEY = 'admin-catalog' as const;

export type CatalogMetricFilter = 'acervo' | 'sala' | 'otras' | null;

export const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<CatalogFilterState>(INITIAL_FILTERS);
  const [metricFilter, setMetricFilter] = useState<CatalogMetricFilter>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // ── React Query: catálogo admin con caché ─────────────────────────────────
  // Regreso a la pantalla en < 2 min: datos visibles sin esperar red.
  const { data: resourcesList = [], isLoading } = useQuery<Resource[]>({
    queryKey: [ADMIN_CATALOG_KEY],
    queryFn: fetchCatalogResources,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // ── React Query: préstamos admin para cálculo de libros en sala y en otras bibliotecas ──
  const { data: loansList = [] } = useAdminLoans();

  const invalidateCatalog = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [ADMIN_CATALOG_KEY], refetchType: 'active' });
  }, [queryClient]);

  // ── Métricas de libros: Acervo (Biblioteca), En sala y En otras bibliotecas ──
  const catalogMetrics = useMemo(() => {
    // 1. Préstamos activos en el sistema (no devueltos)
    const activeLoans = loansList.filter((l) => l.status !== 'RETURNED');

    // 2. Préstamos interinstitucionales activos (en otras bibliotecas en convenio)
    const prestamosOtrasBibliotecas = activeLoans.filter(
      (l) => l.tipoPrestamoClave === 'interbibliotecario' || Boolean(l.institucionId)
    ).length;

    // 3. Préstamos en sala activos (consulta interna de lectura)
    const prestamosEnSala = activeLoans.filter(
      (l) => l.tipoPrestamoClave === 'sala'
    ).length;

    // 4. Conteo de ejemplares desde los libros
    let totalDisponibles = 0;
    let ejemplaresEnSalaFisicos = 0;
    let ejemplaresEnOtrasBibliotecasFisicos = 0;

    for (const book of resourcesList) {
      totalDisponibles += book.availableCopies || 0;
      const bookLoc = (book.location || '').toLowerCase();
      const isBookInSala = bookLoc.includes('sala');
      const isBookInOther =
        bookLoc.includes('otra') || bookLoc.includes('convenio') || bookLoc.includes('inter');

      if (Array.isArray(book.ejemplares) && book.ejemplares.length > 0) {
        for (const ej of book.ejemplares) {
          const ubicacion = (ej.ubicacion_estante || book.location || '').toLowerCase();
          const estado = (ej.estado || '').toLowerCase();

          // Ejemplar ubicado en sala y disponible para consulta interna
          if (ubicacion.includes('sala') && estado === 'disponible') {
            ejemplaresEnSalaFisicos++;
          }
          // Ejemplar en convenio con otra institución
          if (
            (ubicacion.includes('otra') || ubicacion.includes('convenio') || ubicacion.includes('inter')) &&
            (estado === 'prestado' || estado === 'disponible')
          ) {
            ejemplaresEnOtrasBibliotecasFisicos++;
          }
        }
      } else {
        if (isBookInSala) {
          ejemplaresEnSalaFisicos += book.availableCopies || 1;
        } else if (isBookInOther) {
          ejemplaresEnOtrasBibliotecasFisicos += book.availableCopies || 1;
        }
      }
    }

    const totalEnSala = prestamosEnSala + ejemplaresEnSalaFisicos;
    const totalEnOtrasBibliotecas = Math.max(prestamosOtrasBibliotecas, ejemplaresEnOtrasBibliotecasFisicos);
    const totalEnAcervo = Math.max(
      0,
      totalDisponibles - ejemplaresEnSalaFisicos - ejemplaresEnOtrasBibliotecasFisicos
    );

    return {
      acervo: totalEnAcervo,
      sala: totalEnSala,
      otrasBibliotecas: totalEnOtrasBibliotecas,
    };
  }, [resourcesList, loansList]);

  // ── Realtime: invalidar caché cuando cambia un libro o ejemplar ──────────
  useRealtimeTable('libros', {
    onInsert: invalidateCatalog,
    onUpdate: invalidateCatalog,
    onDelete: invalidateCatalog,
  });

  useRealtimeTable('ejemplares', {
    onInsert: invalidateCatalog,
    onUpdate: invalidateCatalog,
  });
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [deletingResource, setDeletingResource] = useState<Resource | null>(null);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState<boolean>(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);
  const itemsPerPage = 5;

  const handleToggleMetricFilter = (target: 'acervo' | 'sala' | 'otras') => {
    setMetricFilter((prev) => (prev === target ? null : target));
    setCurrentPage(1);
  };

  const filteredResources = useMemo(() => {
    return resourcesList.filter((resource) => {
      // 0. Filtro superior de métricas interactivas (Acervo, Sala, Otras bibliotecas)
      if (metricFilter === 'acervo') {
        const bookLoc = (resource.location || '').toLowerCase();
        const isSpecialLoc =
          bookLoc.includes('sala') ||
          bookLoc.includes('otra') ||
          bookLoc.includes('convenio') ||
          bookLoc.includes('inter');

        const hasAvailableAcervo =
          resource.availableCopies > 0 &&
          !isSpecialLoc &&
          (!resource.ejemplares ||
            resource.ejemplares.length === 0 ||
            resource.ejemplares.some(
              (ej) =>
                ej.estado === 'disponible' &&
                !(ej.ubicacion_estante || '').toLowerCase().includes('sala') &&
                !(ej.ubicacion_estante || '').toLowerCase().includes('otra') &&
                !(ej.ubicacion_estante || '').toLowerCase().includes('convenio') &&
                !(ej.ubicacion_estante || '').toLowerCase().includes('inter')
            ));
        if (!hasAvailableAcervo) return false;
      } else if (metricFilter === 'sala') {
        const hasLoanInSala = loansList.some(
          (l) =>
            l.resourceId === resource.id &&
            l.status !== 'RETURNED' &&
            l.tipoPrestamoClave === 'sala'
        );
        const hasEjemplarInSala =
          Boolean(
            resource.ejemplares?.some((ej) =>
              (ej.ubicacion_estante || '').toLowerCase().includes('sala')
            )
          ) || (resource.location || '').toLowerCase().includes('sala');

        if (!hasLoanInSala && !hasEjemplarInSala) return false;
      } else if (metricFilter === 'otras') {
        const hasLoanInOther = loansList.some(
          (l) =>
            l.resourceId === resource.id &&
            l.status !== 'RETURNED' &&
            (l.tipoPrestamoClave === 'interbibliotecario' || Boolean(l.institucionId))
        );
        const hasEjemplarInOther =
          Boolean(
            resource.ejemplares?.some((ej) => {
              const u = (ej.ubicacion_estante || '').toLowerCase();
              return u.includes('otra') || u.includes('convenio') || u.includes('inter');
            })
          ) ||
          (resource.location || '').toLowerCase().includes('otra') ||
          (resource.location || '').toLowerCase().includes('convenio') ||
          (resource.location || '').toLowerCase().includes('inter');

        if (!hasLoanInOther && !hasEjemplarInOther) return false;
      }

      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesTitle = resource.title.toLowerCase().includes(query);
        const matchesAuthor = resource.author.toLowerCase().includes(query);
        const matchesIsbn = resource.isbn.toLowerCase().includes(query);
        const matchesCode = resource.code.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAuthor && !matchesIsbn && !matchesCode) {
          return false;
        }
      }

      if (filters.category) {
        const targetCat = resolveCategory(filters.category);
        const resCat = resolveCategory(resource.category) || resolveCategory(resource.categoryLabel);
        if (targetCat && resCat) {
          if (targetCat.code !== resCat.code) return false;
        } else {
          const q = filters.category.toLowerCase();
          const matchLabel = resource.categoryLabel.toLowerCase().includes(q);
          const matchCat = String(resource.category).toLowerCase().includes(q);
          if (!matchLabel && !matchCat) return false;
        }
      }

      if (filters.status) {
        if (resource.status !== filters.status) {
          return false;
        }
      }

      if (filters.publicationYear) {
        const year = resource.publicationYear;
        if (filters.publicationYear === '2020+' && year < 2020) return false;
        if (
          filters.publicationYear === '2000-2019' &&
          (year < 2000 || year > 2019)
        )
          return false;
        if (filters.publicationYear === 'PRE-2000' && year >= 2000) return false;
      }

      return true;
    });
  }, [filters, resourcesList, metricFilter, loansList]);

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage) || 1;

  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredResources.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredResources, currentPage, itemsPerPage]);

  const handleFilterChange = (newFilters: CatalogFilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setMetricFilter(null);
    setCurrentPage(1);
  };

  const handleSaveResource = async (updated: Resource) => {
    // Actualización optimista inmediata en la caché para visualización instantánea en la tabla
    queryClient.setQueryData<Resource[]>([ADMIN_CATALOG_KEY], (prev = []) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );

    try {
      await updateResource(updated.id, updated);

      // Invalidar caché → React Query re-fetch en background para mantener consistencia
      invalidateCatalog();

      setFeedbackToast(`El libro "${updated.title}" y sus ejemplares se actualizaron correctamente.`);
    } catch (err: any) {
      console.error('[CatalogPage] Error updating resource:', err);
      invalidateCatalog();
      setFeedbackToast(err?.message || `Error al actualizar el libro "${updated.title}".`);
    }

    setTimeout(() => {
      setFeedbackToast(null);
    }, 4500);
  };

  const handleDeleteResource = async (target: Resource): Promise<boolean> => {
    // Optimistic removal from table cache
    queryClient.setQueryData<Resource[]>([ADMIN_CATALOG_KEY], (prev = []) =>
      prev.filter((item) => item.id !== target.id)
    );

    try {
      const result = await deleteResource(target.id);
      if (!result.success) {
        invalidateCatalog();
        setFeedbackToast(`No se pudo eliminar el libro: ${result.error}`);
        setTimeout(() => setFeedbackToast(null), 5000);
        return false;
      }

      // Invalidar caché → React Query refetch en background
      invalidateCatalog();

      // Keep in-memory mock synchronized if it existed
      const mockIdx = MOCK_RESOURCES.findIndex((item) => item.id === target.id);
      if (mockIdx !== -1) {
        MOCK_RESOURCES.splice(mockIdx, 1);
      }

      // Ensure pagination stays valid
      const remainingCount = filteredResources.length - 1;
      const newTotalPages = Math.ceil(remainingCount / itemsPerPage) || 1;
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }

      setFeedbackToast(result.message || `El libro "${target.title}" fue retirado exitosamente del acervo.`);
      setTimeout(() => {
        setFeedbackToast((current) =>
          current?.includes(target.title) ? null : current
        );
      }, 4500);

      return true;
    } catch (err: any) {
      setFeedbackToast(`Error al eliminar: ${err?.message || 'Error de comunicación'}`);
      setTimeout(() => setFeedbackToast(null), 5000);
      return false;
    }
  };

  const hasResults = filteredResources.length > 0;

  return (
    <div className="catalog-container">
      <header className="catalog-header">
        <div className="catalog-header-titles">
          <h1 className="catalog-title">Gestión de libros</h1>
          <p className="catalog-subtitle">
            Consulta, organiza y administra los libros de la biblioteca.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            type="button"
            className="catalog-import-btn"
            onClick={() => setIsBulkImportOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1.125rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-primary-dark, #1E3A5F)',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border, #CBD5E1)',
              borderRadius: 'var(--radius-md, 10px)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <FileSpreadsheet size={18} />
            <span>Carga masiva</span>
          </button>

          <button
            type="button"
            className="catalog-add-btn"
            onClick={() => navigate('/admin/catalog/new')}
          >
            <Plus size={18} />
            <span>Agregar libro</span>
          </button>
        </div>
      </header>

      {/* Success feedback toast */}
      {feedbackToast && (
        <div className="catalog-toast-banner" role="status" aria-live="polite">
          <div className="catalog-toast-content">
            <CheckCircle size={18} aria-hidden="true" />
            <span>{feedbackToast}</span>
          </div>
          <button
            type="button"
            className="catalog-toast-close"
            onClick={() => setFeedbackToast(null)}
            aria-label="Cerrar notificación"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Tarjetas de métricas de acervo: En acervo (biblioteca), En sala, En otras bibliotecas */}
      <section className="catalog-metrics-grid" aria-label="Filtros rápidos por distribución de libros en acervo y préstamos">
        {/* 1. En acervo (biblioteca) */}
        <div
          role="button"
          tabIndex={0}
          aria-pressed={metricFilter === 'acervo'}
          className={`catalog-metric-card ${metricFilter === 'acervo' ? 'catalog-metric-card--active-acervo' : ''}`}
          onClick={() => handleToggleMetricFilter('acervo')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggleMetricFilter('acervo');
            }
          }}
          title={metricFilter === 'acervo' ? 'Clic para quitar filtro de acervo' : 'Clic para filtrar solo libros en acervo'}
        >
          {metricFilter === 'acervo' && (
            <span className="catalog-metric-pill catalog-metric-pill--acervo">FILTRADO</span>
          )}
          <div className="catalog-metric-icon-wrap catalog-metric-icon-wrap--acervo" aria-hidden="true">
            <Library size={22} />
          </div>
          <div className="catalog-metric-info">
            <span className="catalog-metric-value">{catalogMetrics.acervo}</span>
            <span className="catalog-metric-label">En acervo (biblioteca)</span>
            <span className="catalog-metric-subtext">Disponibles en estantería</span>
          </div>
        </div>

        {/* 2. En sala */}
        <div
          role="button"
          tabIndex={0}
          aria-pressed={metricFilter === 'sala'}
          className={`catalog-metric-card ${metricFilter === 'sala' ? 'catalog-metric-card--active-sala' : ''}`}
          onClick={() => handleToggleMetricFilter('sala')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggleMetricFilter('sala');
            }
          }}
          title={metricFilter === 'sala' ? 'Clic para quitar filtro de sala' : 'Clic para filtrar solo libros en sala'}
        >
          {metricFilter === 'sala' && (
            <span className="catalog-metric-pill catalog-metric-pill--sala">FILTRADO</span>
          )}
          <div className="catalog-metric-icon-wrap catalog-metric-icon-wrap--sala" aria-hidden="true">
            <BookOpen size={22} />
          </div>
          <div className="catalog-metric-info">
            <span className="catalog-metric-value">{catalogMetrics.sala}</span>
            <span className="catalog-metric-label">En sala</span>
            <span className="catalog-metric-subtext">Consulta interna de lectura</span>
          </div>
        </div>

        {/* 3. En otras bibliotecas */}
        <div
          role="button"
          tabIndex={0}
          aria-pressed={metricFilter === 'otras'}
          className={`catalog-metric-card ${metricFilter === 'otras' ? 'catalog-metric-card--active-otras' : ''}`}
          onClick={() => handleToggleMetricFilter('otras')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggleMetricFilter('otras');
            }
          }}
          title={metricFilter === 'otras' ? 'Clic para quitar filtro de otras bibliotecas' : 'Clic para filtrar solo libros en otras bibliotecas'}
        >
          {metricFilter === 'otras' && (
            <span className="catalog-metric-pill catalog-metric-pill--otras">FILTRADO</span>
          )}
          <div className="catalog-metric-icon-wrap catalog-metric-icon-wrap--otras" aria-hidden="true">
            <Building2 size={22} />
          </div>
          <div className="catalog-metric-info">
            <span className="catalog-metric-value">{catalogMetrics.otrasBibliotecas}</span>
            <span className="catalog-metric-label">En otras bibliotecas</span>
            <span className="catalog-metric-subtext">Convenio interbibliotecario</span>
          </div>
        </div>
      </section>

      <CatalogToolbar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalFilteredCount={filteredResources.length}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {/* Table / Results / Empty State */}
      {isLoading ? (
        <div style={{ padding: '3rem 0' }}>
          <LoadingSpinner center size="lg" text="Cargando libros del acervo..." />
        </div>
      ) : hasResults ? (
        <div className="catalog-results-block">
          <ResourceTable
            resources={paginatedResources}
            onViewDetail={(res) => setSelectedResource(res)}
            onEdit={(res) => setEditingResource(res)}
            onDelete={(res) => setDeletingResource(res)}
          />
          <CatalogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredResources.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      ) : (
        <div className="catalog-empty-state" role="status">
          <div className="catalog-empty-icon">
            <SearchX size={28} />
          </div>
          <h2 className="catalog-empty-title">No se encontraron recursos</h2>
          <p className="catalog-empty-text">
            No hay libros que coincidan con la búsqueda o los filtros aplicados. Intenta modificar tus criterios.
          </p>
          <button
            type="button"
            className="catalog-clear-btn"
            onClick={handleClearFilters}
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Reusable Book Detail Modal */}
      <BookDetailModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
      />

      {/* Quick Edit Modal */}
      <EditResourceModal
        resource={editingResource}
        onClose={() => setEditingResource(null)}
        onSave={handleSaveResource}
      />

      {/* Delete Confirmation Modal */}
      <DeleteBookModal
        resource={deletingResource}
        onClose={() => setDeletingResource(null)}
        onConfirm={handleDeleteResource}
      />

      {/* Bulk Import Books Modal */}
      <BulkImportBooksModal
        open={isBulkImportOpen}
        onClose={() => setIsBulkImportOpen(false)}
        onSuccess={(count) => {
          invalidateCatalog();
          setFeedbackToast(`Se importaron ${count} libros exitosamente al catálogo.`);
          setTimeout(() => setFeedbackToast(null), 5000);
        }}
      />
    </div>
  );
};
