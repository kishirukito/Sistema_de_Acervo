import React, { useRef } from 'react';
import { Trash2, AlertTriangle, AlertCircle } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import type { Resource } from '../catalog.types';
import './DeleteBookModal.css';

export interface DeleteBookModalProps {
  /** The resource currently selected for deletion confirmation */
  resource: Resource | null;
  /** Request closing modal without performing deletion */
  onClose: () => void;
  /** Confirm and execute deletion */
  onConfirm: (resource: Resource) => void;
}

export const DeleteBookModal: React.FC<DeleteBookModalProps> = ({
  resource,
  onClose,
  onConfirm,
}) => {
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  if (!resource) return null;

  // Active loans calculation: total copies minus currently available
  const activeLoansCount = Math.max(
    0,
    resource.totalCopies - resource.availableCopies
  );
  const hasActiveLoans = activeLoansCount > 0;

  const handleConfirmDelete = () => {
    onConfirm(resource);
    onClose();
  };

  return (
    <Modal
      open={Boolean(resource)}
      onClose={onClose}
      size="small"
      role="alertdialog"
      closeOnBackdrop={false}
      closeOnEscape={true}
      title="¿Eliminar este libro?"
      description="Esta acción requiere confirmación administrativa."
      icon={
        <div
          style={{
            color: hasActiveLoans ? 'var(--color-warning, #D97706)' : 'var(--color-danger, #EB5757)',
          }}
          aria-hidden="true"
        >
          {hasActiveLoans ? <AlertTriangle size={20} /> : <Trash2 size={20} />}
        </div>
      }
      closeButtonAriaLabel="Cancelar y cerrar diálogo"
      initialFocusRef={cancelBtnRef}
      footer={
        <div className="delete-modal-footer-actions">
          {hasActiveLoans ? (
            <Button
              type="button"
              variant="primary"
              ref={cancelBtnRef}
              onClick={onClose}
            >
              Entendido
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                ref={cancelBtnRef}
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                variant="danger"
                leftIcon={<Trash2 size={16} />}
                onClick={handleConfirmDelete}
              >
                Eliminar
              </Button>
            </>
          )}
        </div>
      }
    >
      <div className="delete-modal-content">
        {/* Identified Book Preview */}
        <div className="delete-modal-preview">
          <div
            className="delete-modal-thumb"
            style={{ backgroundColor: resource.coverColor || '#2F80ED' }}
            aria-hidden="true"
          >
            {resource.coverInitials || resource.title.slice(0, 2).toUpperCase()}
          </div>
          <div className="delete-modal-preview-info">
            <h4 className="delete-modal-preview-title">{resource.title}</h4>
            <p className="delete-modal-preview-sub">
              {resource.author} • {resource.isbn}
            </p>
          </div>
        </div>

        {/* Informative / consequence explanation */}
        {hasActiveLoans ? (
          <div className="delete-modal-loan-alert" role="alert">
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <strong>No es posible retirar este ejemplar:</strong>
              <div style={{ marginTop: 4 }}>
                Actualmente cuenta con {activeLoansCount} ejemplar(es) en préstamo activo.
                Para retirarlo del catálogo, todos los ejemplares deben haber sido devueltos a la biblioteca.
              </div>
            </div>
          </div>
        ) : (
          <p className="delete-modal-warning-text">
            El libro dejará de aparecer en el catálogo y no estará disponible para nuevas búsquedas ni préstamos.
          </p>
        )}
      </div>
    </Modal>
  );
};
