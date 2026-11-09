import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import type { Resource } from '../catalog.types';
import { ResourceStatusBadge } from './ResourceStatusBadge';

interface ResourceTableProps {
  resources: Resource[];
  onViewDetail?: (resource: Resource) => void;
  onEdit?: (resource: Resource) => void;
  onDelete?: (resource: Resource) => void;
}

export const ResourceTable: React.FC<ResourceTableProps> = ({
  resources,
  onViewDetail,
  onEdit,
  onDelete,
}) => {
  const getCopiesColorClass = (available: number, total: number) => {
    if (available === 0) return 'copies-available--red';
    if (available === 1 && total > 2) return 'copies-available--orange';
    return 'copies-available--green';
  };

  return (
    <div className="catalog-table-card">
      <div className="catalog-table-wrapper">
        <table className="catalog-table">
          <thead>
            <tr>
              <th>PORTADA</th>
              <th>TÍTULO</th>
              <th>AUTOR</th>
              <th>CATEGORÍA</th>
              <th>ISBN</th>
              <th>DISPONIBLES</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((item) => (
              <tr key={item.id}>
                {/* Cover Thumbnail */}
                <td>
                  <div
                    className="book-cover-thumb"
                    style={{ backgroundColor: item.coverColor || '#2F80ED' }}
                    aria-label={`Portada de ${item.title}`}
                  >
                    {item.coverInitials || item.title.slice(0, 2).toUpperCase()}
                  </div>
                </td>

                {/* Title and Publication Year */}
                <td>
                  <div className="book-title-cell">
                    <span className="book-title-name">{item.title}</span>
                    <span className="book-title-year">{item.publicationYear}</span>
                  </div>
                </td>

                {/* Author */}
                <td>{item.author}</td>

                {/* Category Pill */}
                <td>
                  <span className="category-pill">{item.categoryLabel}</span>
                </td>

                {/* ISBN */}
                <td className="isbn-cell">{item.isbn}</td>

                {/* Copies available vs total */}
                <td className="copies-cell">
                  <span
                    className={getCopiesColorClass(
                      item.availableCopies,
                      item.totalCopies
                    )}
                  >
                    {item.availableCopies}
                  </span>{' '}
                  <span className="copies-total">de {item.totalCopies}</span>
                </td>

                {/* Status Badge */}
                <td>
                  <ResourceStatusBadge status={item.status} />
                </td>

                {/* Action Icon Buttons */}
                <td>
                  <div className="catalog-actions-cell">
                    <button
                      type="button"
                      className="catalog-action-btn catalog-action-btn--view"
                      title="Ver detalle"
                      aria-label={`Ver detalle de ${item.title}`}
                      onClick={() =>
                        onViewDetail
                          ? onViewDetail(item)
                          : alert(`Ver detalle de "${item.title}"`)
                      }
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      type="button"
                      className="catalog-action-btn catalog-action-btn--edit"
                      title="Editar"
                      aria-label={`Editar ${item.title}`}
                      onClick={() =>
                        onEdit
                          ? onEdit(item)
                          : alert(`Editar recurso "${item.title}"`)
                      }
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      className="catalog-action-btn catalog-action-btn--delete"
                      title="Eliminar"
                      aria-label={`Eliminar ${item.title}`}
                      onClick={() =>
                        onDelete
                          ? onDelete(item)
                          : alert(`Eliminar recurso "${item.title}"`)
                      }
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
