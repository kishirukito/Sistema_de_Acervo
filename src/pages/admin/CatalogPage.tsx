import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, SearchX, CheckCircle, X } from 'lucide-react';
import { CatalogToolbar } from '../../features/catalog/components/CatalogToolbar';
import { ResourceTable } from '../../features/catalog/components/ResourceTable';
import { CatalogPagination } from '../../features/catalog/components/CatalogPagination';
import { BookDetailModal } from '../../features/search/components/BookDetailModal';
import { EditResourceModal } from '../../features/catalog/components/EditResourceModal';
import { DeleteBookModal } from '../../features/catalog/components/DeleteBookModal';
import { MOCK_RESOURCES } from '../../features/catalog/catalog.mock';
import type { CatalogFilterState, Resource } from '../../features/catalog/catalog.types';
import { resolveCategory } from '../../constants';
import '../../features/catalog/catalog.css';

const INITIAL_FILTERS: CatalogFilterState = {
  searchQuery: '',
  category: '',
  status: '',
  publicationYear: '',
};

export const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<CatalogFilterState>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resourcesList, setResourcesList] = useState<Resource[]>(() => [...MOCK_RESOURCES]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [deletingResource, setDeletingResource] = useState<Resource | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);
  const itemsPerPage = 5;

  const filteredResources = useMemo(() => {
    return resourcesList.filter((resource) => {
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
  }, [filters, resourcesList]);

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
    setCurrentPage(1);
  };

  const handleSaveResource = (updated: Resource) => {
    setResourcesList((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    // Keep in-memory mock synchronized
    const mockIdx = MOCK_RESOURCES.findIndex((item) => item.id === updated.id);
    if (mockIdx !== -1) {
      MOCK_RESOURCES[mockIdx] = updated;
    }
    setFeedbackToast(`El libro "${updated.title}" se actualizó correctamente.`);
    setTimeout(() => {
      setFeedbackToast((current) =>
        current?.includes(updated.title) ? null : current
      );
    }, 4500);
  };

  const handleDeleteResource = (target: Resource) => {
    setResourcesList((prev) => prev.filter((item) => item.id !== target.id));

    // Keep in-memory mock synchronized
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

    setFeedbackToast(`El libro "${target.title}" fue retirado del catálogo.`);
    setTimeout(() => {
      setFeedbackToast((current) =>
        current?.includes(target.title) ? null : current
      );
    }, 4500);
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

        <button
          type="button"
          className="catalog-add-btn"
          onClick={() => navigate('/admin/catalog/new')}
        >
          <Plus size={18} />
          <span>Agregar libro</span>
        </button>
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

      <CatalogToolbar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        totalFilteredCount={filteredResources.length}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {hasResults && (
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
      )}

      {!hasResults && (
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
    </div>
  );
};
