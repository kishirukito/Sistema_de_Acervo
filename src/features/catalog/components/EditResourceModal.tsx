import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Pencil,
  Save,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { MOCK_BOOKS } from '../../../mocks/data';
import type { Resource, ResourceStatus, ResourceCategory } from '../catalog.types';
import './EditResourceModal.css';

const CATEGORY_OPTIONS = [
  { label: 'Literatura', value: 'Literatura' },
  { label: 'Infantil', value: 'Infantil' },
  { label: 'Clásicos', value: 'Clásicos' },
  { label: 'Historia', value: 'Historia' },
  { label: 'Ciencia ficción', value: 'Ciencia ficción' },
  { label: 'Tecnología', value: 'Tecnología' },
  { label: 'Administración', value: 'Administración' },
];

const editResourceSchema = z.object({
  title: z.string().min(2, 'El título debe tener al menos 2 caracteres'),
  author: z.string().min(2, 'El autor es obligatorio'),
  isbn: z.string().min(10, 'El código ISBN debe tener al menos 10 caracteres'),
  publisher: z.string().optional(),
  publicationYear: z.coerce
    .number()
    .min(1000, 'Ingresa un año válido')
    .max(2035, 'El año no puede ser superior a 2035'),
  category: z.string().min(2, 'Selecciona una categoría válida'),
  totalCopies: z.coerce
    .number()
    .min(1, 'El número total de ejemplares debe ser al menos 1'),
  location: z.string().min(2, 'La ubicación física es requerida (ej. Estante A-1)'),
  description: z.string().optional(),
});

type EditResourceFormData = z.infer<typeof editResourceSchema>;

interface EditResourceModalProps {
  /** The resource currently selected for quick edition */
  resource: Resource | null;
  /** Request modal close */
  onClose: () => void;
  /** Persist updated resource locally */
  onSave: (updated: Resource) => void;
}

export const EditResourceModal: React.FC<EditResourceModalProps> = ({
  resource,
  onClose,
  onSave,
}) => {
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<EditResourceFormData>({
    resolver: zodResolver(editResourceSchema) as any,
  });

  // Populate form with current resource values when opened
  useEffect(() => {
    if (resource) {
      const matchedBook = MOCK_BOOKS.find(
        (b) =>
          (resource.isbn &&
            b.isbn.replace(/-/g, '') === resource.isbn.replace(/-/g, '')) ||
          b.title.trim().toLowerCase() === resource.title.trim().toLowerCase()
      );

      reset({
        title: resource.title,
        author: resource.author,
        isbn: resource.isbn,
        publisher: resource.publisher || matchedBook?.publisher || '',
        publicationYear: resource.publicationYear,
        category: resource.categoryLabel || 'Tecnología',
        totalCopies: resource.totalCopies,
        location: resource.location,
        description: resource.description || matchedBook?.description || '',
      });
    }
  }, [resource, reset]);

  if (!resource) return null;

  // Intercept close requests to verify unsaved changes
  const handleRequestClose = () => {
    if (isDirty) {
      setShowDiscardConfirm(true);
    } else {
      onClose();
    }
  };

  const handleConfirmDiscard = () => {
    reset();
    setShowDiscardConfirm(false);
    onClose();
  };

  const handleCancelDiscard = () => {
    setShowDiscardConfirm(false);
  };

  const mapCategoryCode = (label: string): ResourceCategory => {
    switch (label) {
      case 'Infantil':
        return 'CHILDREN';
      case 'Historia':
        return 'HISTORY';
      case 'Tecnología':
        return 'TECHNOLOGY';
      case 'Administración':
        return 'ADMINISTRATION';
      case 'Literatura':
      case 'Clásicos':
      case 'Ciencia ficción':
      default:
        return 'NOVEL';
    }
  };

  const onSubmit = (data: EditResourceFormData) => {
    const diff = data.totalCopies - resource.totalCopies;
    const newAvailableCopies = Math.max(
      0,
      Math.min(data.totalCopies, resource.availableCopies + diff)
    );

    let newStatus: ResourceStatus = resource.status;
    if (newAvailableCopies === 0) {
      newStatus = 'LOANED';
    } else if (newAvailableCopies === 1 && data.totalCopies > 2) {
      newStatus = 'LOW_STOCK';
    } else {
      newStatus = 'AVAILABLE';
    }

    const updatedResource: Resource = {
      ...resource,
      title: data.title.trim(),
      author: data.author.trim(),
      isbn: data.isbn.trim(),
      publisher: data.publisher?.trim() || undefined,
      publicationYear: Number(data.publicationYear),
      category: mapCategoryCode(data.category),
      categoryLabel: data.category,
      totalCopies: Number(data.totalCopies),
      availableCopies: newAvailableCopies,
      location: data.location.trim(),
      status: newStatus,
      description: data.description?.trim() || undefined,
      coverInitials: data.title.trim().slice(0, 2).toUpperCase(),
    };

    onSave(updatedResource);
    onClose();
  };

  const { ref: formTitleRef, ...titleRegisterProps } = register('title');

  return (
    <Modal
      open={Boolean(resource)}
      onClose={handleRequestClose}
      size="large"
      title="Editar libro"
      description={`Modifica los metadatos y disponibilidad de "${resource.title}"`}
      icon={<Pencil size={18} />}
      closeButtonAriaLabel="Cerrar modal de edición"
      initialFocusRef={titleInputRef}
      footer={
        <div className="edit-modal-footer-actions">
          <Button
            type="button"
            variant="outline"
            onClick={handleRequestClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="edit-resource-form"
            variant="primary"
            isLoading={isSubmitting}
            leftIcon={<Save size={16} />}
          >
            Guardar cambios
          </Button>
        </div>
      }
    >
      <div style={{ position: 'relative' }}>
        <form
          id="edit-resource-form"
          className="edit-modal-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="edit-modal-grid">
            {/* Title */}
            <div className="edit-modal-col-span-2">
              <Input
                label="Título del libro"
                placeholder="Ej. Clean Code"
                error={errors.title?.message}
                ref={(node) => {
                  formTitleRef(node);
                  (titleInputRef as any).current = node;
                }}
                {...titleRegisterProps}
              />
            </div>

            {/* Author */}
            <Input
              label="Autor(es)"
              placeholder="Ej. Robert C. Martin"
              error={errors.author?.message}
              {...register('author')}
            />

            {/* ISBN */}
            <Input
              label="Código ISBN"
              placeholder="Ej. 978-0-132-35088-4"
              error={errors.isbn?.message}
              {...register('isbn')}
            />

            {/* Publisher */}
            <Input
              label="Editorial"
              placeholder="Ej. Prentice Hall"
              error={errors.publisher?.message}
              {...register('publisher')}
            />

            {/* Publication Year */}
            <Input
              label="Año de publicación"
              type="number"
              placeholder="Ej. 2008"
              error={errors.publicationYear?.message}
              {...register('publicationYear')}
            />

            {/* Category */}
            <Select
              label="Categoría temática"
              options={CATEGORY_OPTIONS}
              error={errors.category?.message}
              {...register('category')}
            />

            {/* Total Copies */}
            <Input
              label="Ejemplares totales"
              type="number"
              placeholder="Ej. 5"
              helperText={`Disponibles actualmente: ${resource.availableCopies} de ${resource.totalCopies}`}
              error={errors.totalCopies?.message}
              {...register('totalCopies')}
            />

            {/* Location */}
            <div className="edit-modal-col-span-2">
              <Input
                label="Ubicación física en acervo"
                placeholder="Ej. Estante D-3, Nivel 3"
                error={errors.location?.message}
                {...register('location')}
              />
            </div>

            {/* Description / Synopsis */}
            <div className="edit-modal-col-span-2 edit-modal-textarea-group">
              <label htmlFor="edit-book-desc" className="edit-modal-textarea-label">
                Descripción o sinopsis
              </label>
              <textarea
                id="edit-book-desc"
                rows={3}
                placeholder="Breve reseña del libro y contenido temático..."
                className="edit-modal-textarea"
                {...register('description')}
              />
              {errors.description && (
                <span className="ui-input-error" role="alert">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>
        </form>

        {/* Discard Confirmation Overlay */}
        {showDiscardConfirm && (
          <div
            className="edit-modal-discard-overlay"
            role="alertdialog"
            aria-labelledby="discard-confirm-title"
            aria-describedby="discard-confirm-desc"
          >
            <div className="edit-modal-discard-card">
              <div className="edit-modal-discard-header">
                <div className="edit-modal-discard-icon" aria-hidden="true">
                  <AlertTriangle size={20} />
                </div>
                <h4 id="discard-confirm-title" className="edit-modal-discard-title">
                  ¿Descartar cambios sin guardar?
                </h4>
              </div>
              <p id="discard-confirm-desc" className="edit-modal-discard-text">
                Has realizado modificaciones en la ficha de este libro. Si cierras la
                ventana ahora, los cambios no se guardarán.
              </p>
              <div className="edit-modal-discard-actions">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCancelDiscard}
                >
                  Continuar editando
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  leftIcon={<RotateCcw size={14} />}
                  onClick={handleConfirmDiscard}
                >
                  Descartar y salir
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
