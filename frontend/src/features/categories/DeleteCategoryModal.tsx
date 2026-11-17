import React, { useState } from 'react';
import { AlertTriangle, X, PowerOff } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import type { Tema } from './categories.service';

interface DeleteCategoryModalProps {
  open: boolean;
  tema: Tema | null;
  onClose: () => void;
  onConfirmDelete: (id: number) => Promise<void>;
  onConfirmDeactivate: (id: number) => Promise<void>;
}

export const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  open,
  tema,
  onClose,
  onConfirmDelete,
  onConfirmDeactivate,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!tema) return null;

  const booksCount = tema.booksCount ?? 0;
  const hasBooks = booksCount > 0;
  const displayName = tema.codigo ? `${tema.codigo} — ${tema.nombre}` : tema.nombre;

  const handleDelete = async () => {
    setError(null);
    setIsDeleting(true);
    try {
      await onConfirmDelete(tema.id);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Error al eliminar. Intenta nuevamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeactivate = async () => {
    setError(null);
    setIsDeactivating(true);
    try {
      await onConfirmDeactivate(tema.id);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Error al desactivar. Intenta nuevamente.');
    } finally {
      setIsDeactivating(false);
    }
  };

  const isPending = isDeleting || isDeactivating;

  return (
    <Modal
      open={open}
      onClose={isPending ? () => {} : onClose}
      size="small"
      title={hasBooks ? 'No se puede eliminar' : 'Eliminar categoría'}
      icon={<AlertTriangle size={18} color={hasBooks ? '#D97706' : '#DC2626'} />}
      footer={
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
          >
            Cancelar
          </Button>
          {hasBooks ? (
            <Button
              type="button"
              variant="outline"
              leftIcon={<PowerOff size={15} />}
              isLoading={isDeactivating}
              disabled={isPending}
              onClick={handleDeactivate}
              style={{ color: '#D97706', borderColor: '#FCD34D' }}
            >
              Desactivar en su lugar
            </Button>
          ) : (
            <Button
              type="button"
              variant="danger"
              isLoading={isDeleting}
              disabled={isPending}
              onClick={handleDelete}
            >
              Eliminar
            </Button>
          )}
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-text)', margin: 0 }}>
          {hasBooks ? (
            <>
              La categoría{' '}
              <strong>"{displayName}"</strong> tiene{' '}
              <strong>{booksCount} libro{booksCount !== 1 ? 's' : ''} asociado{booksCount !== 1 ? 's' : ''}</strong>{' '}
              y no puede eliminarse directamente.
            </>
          ) : (
            <>
              ¿Estás seguro de que deseas eliminar la categoría{' '}
              <strong>"{displayName}"</strong>? Esta acción no se puede deshacer.
            </>
          )}
        </p>

        {hasBooks && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 6,
              backgroundColor: '#FFFBEB',
              border: '1px solid #FCD34D',
              color: '#92400E',
              fontSize: '0.8125rem',
            }}
          >
            Puedes <strong>desactivarla</strong> para que no aparezca en nuevas asignaciones,
            pero los libros que ya la usan conservarán su categoría.
          </div>
        )}

        {error && (
          <div
            role="alert"
            style={{
              padding: '10px 14px',
              borderRadius: 6,
              backgroundColor: '#FEF2F2',
              border: '1px solid #FCA5A5',
              color: '#B91C1C',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <X size={16} style={{ flexShrink: 0 }} />
            {error}
          </div>
        )}
      </div>
    </Modal>
  );
};
