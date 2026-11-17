import React, { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  Tag,
  PlusCircle,
  Search,
  Pencil,
  Trash2,
  Power,
  PowerOff,
  Loader2,
  AlertTriangle,
  FolderOpen,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useCategories, invalidateCategories } from '../../features/categories/categories.query';
import { categoriesService } from '../../features/categories/categories.service';
import { CategoryFormModal } from '../../features/categories/CategoryFormModal';
import { DeleteCategoryModal } from '../../features/categories/DeleteCategoryModal';
import type { Tema } from '../../features/categories/categories.service';
import './AdminCategoriesPage.css';

const STATUS_OPTIONS = [
  { label: 'Todas', value: 'all' },
  { label: 'Activas', value: 'active' },
  { label: 'Inactivas', value: 'inactive' },
];

export const AdminCategoriesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: temas, isLoading, isError, error } = useCategories();

  // Filtros
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal de alta/edición
  const [formOpen, setFormOpen] = useState(false);
  const [editingTema, setEditingTema] = useState<Tema | null>(null);

  // Modal de eliminación
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingTema, setDeletingTema] = useState<Tema | null>(null);

  // Feedback inline de acciones rápidas (toggle)
  const [pendingToggle, setPendingToggle] = useState<number | null>(null);
  const [toggleError, setToggleError] = useState<string | null>(null);

  /* ── Filtrado reactivo ── */
  const filtered = useMemo(() => {
    if (!temas) return [];
    const q = search.trim().toLowerCase();
    return temas.filter((t) => {
      const matchSearch =
        !q ||
        t.nombre.toLowerCase().includes(q) ||
        (t.codigo ?? '').toLowerCase().includes(q);
      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && t.activa) ||
        (statusFilter === 'inactive' && !t.activa);
      return matchSearch && matchStatus;
    });
  }, [temas, search, statusFilter]);

  /* ── Handlers ── */
  const handleOpenNew = () => {
    setEditingTema(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (t: Tema) => {
    setEditingTema(t);
    setFormOpen(true);
  };

  const handleOpenDelete = (t: Tema) => {
    setDeletingTema(t);
    setDeleteOpen(true);
  };

  const handleSave = async (payload: any) => {
    if (editingTema) {
      await categoriesService.update(editingTema.id, payload);
    } else {
      await categoriesService.create(payload);
    }
    await invalidateCategories(queryClient);
  };

  const handleConfirmDelete = async (id: number) => {
    const result = await categoriesService.delete(id);
    if (!result.success) {
      throw new Error(result.error || 'Error al eliminar');
    }
    await invalidateCategories(queryClient);
  };

  const handleConfirmDeactivate = async (id: number) => {
    await categoriesService.toggle(id, false);
    await invalidateCategories(queryClient);
  };

  const handleToggle = async (t: Tema) => {
    setToggleError(null);
    setPendingToggle(t.id);
    try {
      await categoriesService.toggle(t.id, !t.activa);
      await invalidateCategories(queryClient);
    } catch (err: any) {
      setToggleError(err?.message || 'Error al cambiar el estado.');
    } finally {
      setPendingToggle(null);
    }
  };

  /* ── Render ── */
  return (
    <div className="page-container categories-page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">Categorías</h1>
          <p className="page-subtitle">
            Gestión del catálogo de categorías y temas bibliográficos del acervo.
          </p>
        </div>
        <div className="page-actions">
          <Button variant="primary" leftIcon={<PlusCircle size={16} />} onClick={handleOpenNew}>
            Nueva categoría
          </Button>
        </div>
      </div>

      {/* Toolbar de filtros */}
      <div className="categories-toolbar">
        <div className="categories-search">
          <Input
            placeholder="Buscar por código o nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search size={15} />}
          />
        </div>
        <div className="categories-filter-status">
          <Select
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Error de toggle rápido */}
      {toggleError && (
        <div
          role="alert"
          style={{
            padding: '10px 14px',
            borderRadius: 6,
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            color: '#B91C1C',
            fontSize: '0.875rem',
            display: 'flex',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <AlertTriangle size={16} style={{ flexShrink: 0 }} />
          {toggleError}
        </div>
      )}

      {/* Estados: cargando / error / vacío / tabla */}
      {isLoading && (
        <div className="categories-state">
          <Loader2 size={32} className="categories-state__icon" style={{ animation: 'spin 1s linear infinite' }} />
          <p className="categories-state__desc">Cargando categorías…</p>
        </div>
      )}

      {isError && !isLoading && (
        <div className="categories-state categories-state--error">
          <AlertTriangle size={32} className="categories-state__icon" style={{ color: '#FCA5A5' }} />
          <p className="categories-state__title">No se pudo cargar el catálogo de categorías</p>
          <p className="categories-state__desc">
            {(error as Error)?.message?.includes('no disponible')
              ? 'Gestión de categorías no disponible — pendiente de migración de base de datos.'
              : (error as Error)?.message || 'Error de conexión con el servidor.'}
          </p>
        </div>
      )}

      {!isLoading && !isError && temas && filtered.length === 0 && (
        <div className="categories-state">
          <FolderOpen size={32} className="categories-state__icon" />
          <p className="categories-state__title">
            {search || statusFilter !== 'all'
              ? 'Sin resultados para los filtros aplicados'
              : 'No hay categorías registradas'}
          </p>
          <p className="categories-state__desc">
            {search || statusFilter !== 'all'
              ? 'Ajusta la búsqueda o el filtro de estado.'
              : 'Pulsa "Nueva categoría" para agregar la primera.'}
          </p>
        </div>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <div className="categories-table-wrapper">
          <table className="categories-table" aria-label="Listado de categorías bibliográficas">
            <thead>
              <tr>
                <th scope="col">Código</th>
                <th scope="col">Nombre</th>
                <th scope="col">Tipo</th>
                <th scope="col">Estado</th>
                <th scope="col" style={{ textAlign: 'right' }}>Libros</th>
                <th scope="col" style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className={!t.activa ? 'row--inactive' : ''}>
                  {/* Código */}
                  <td>
                    {t.codigo ? (
                      <span className="code-pill">{t.codigo}</span>
                    ) : (
                      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>—</span>
                    )}
                  </td>

                  {/* Nombre */}
                  <td style={{ maxWidth: 300, wordBreak: 'break-word' }}>{t.nombre}</td>

                  {/* Tipo */}
                  <td>
                    {t.tipo === 'categoria' ? (
                      <span className="badge badge--dewey">
                        <Tag size={11} />
                        Dewey
                      </span>
                    ) : (
                      <span className="badge badge--tema">Tema</span>
                    )}
                  </td>

                  {/* Estado */}
                  <td>
                    {t.activa ? (
                      <span className="badge badge--active">Activa</span>
                    ) : (
                      <span className="badge badge--inactive">Inactiva</span>
                    )}
                  </td>

                  {/* Libros */}
                  <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {t.booksCount ?? 0}
                  </td>

                  {/* Acciones */}
                  <td>
                    <div className="cat-actions">
                      <button
                        className="cat-action-btn"
                        title="Editar"
                        onClick={() => handleOpenEdit(t)}
                        aria-label={`Editar ${t.nombre}`}
                      >
                        <Pencil size={13} />
                        Editar
                      </button>

                      <button
                        className={`cat-action-btn ${t.activa ? 'cat-action-btn--deactivate' : 'cat-action-btn--activate'}`}
                        title={t.activa ? 'Desactivar' : 'Activar'}
                        onClick={() => handleToggle(t)}
                        disabled={pendingToggle === t.id}
                        aria-label={t.activa ? `Desactivar ${t.nombre}` : `Activar ${t.nombre}`}
                      >
                        {pendingToggle === t.id ? (
                          <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />
                        ) : t.activa ? (
                          <PowerOff size={13} />
                        ) : (
                          <Power size={13} />
                        )}
                        {t.activa ? 'Desactivar' : 'Activar'}
                      </button>

                      <button
                        className="cat-action-btn cat-action-btn--danger"
                        title="Eliminar"
                        onClick={() => handleOpenDelete(t)}
                        aria-label={`Eliminar ${t.nombre}`}
                      >
                        <Trash2 size={13} />
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modales */}
      <CategoryFormModal
        open={formOpen}
        tema={editingTema}
        existingTemas={temas ?? []}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
      />

      <DeleteCategoryModal
        open={deleteOpen}
        tema={deletingTema}
        onClose={() => setDeleteOpen(false)}
        onConfirmDelete={handleConfirmDelete}
        onConfirmDeactivate={handleConfirmDeactivate}
      />
    </div>
  );
};
