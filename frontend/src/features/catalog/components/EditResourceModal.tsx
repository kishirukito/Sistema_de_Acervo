import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Pencil,
  Save,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ImageIcon,
} from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { MOCK_BOOKS } from '../../../mocks/data';
import type { Resource, ResourceStatus, EjemplarItem } from '../catalog.types';
import { requestAISummary } from '../../../services/api/ai.service';
import { BIBLIOGRAPHIC_CATEGORIES, resolveCategory } from '../../../constants';
import { useActiveCategoriesForSelect } from '../../categories/categories.query';
import './EditResourceModal.css';

export type EditBookDestination = 'ESTANTERIA' | 'SALA' | 'OTRA_BIBLIOTECA';

export const EDIT_BOOK_DESTINATION_OPTIONS = [
  { value: 'ESTANTERIA', label: 'En estantería (Biblioteca general / Acervo)' },
  { value: 'SALA', label: 'En sala (Consulta interna de lectura)' },
  { value: 'OTRA_BIBLIOTECA', label: 'En otra biblioteca (Convenio interbibliotecario)' },
];

const getEditionLabel = (index: number): string => {
  let n = index;
  let letters = '';
  while (n >= 0) {
    letters = String.fromCharCode(65 + (n % 26)) + letters;
    n = Math.floor(n / 26) - 1;
  }
  return `Edición ${letters}`;
};

export interface EditEjemplarItem {
  id?: string;
  codigo_inventario: string;
  destination: EditBookDestination;
  location: string;
  estado: string;
}

const inferDestinationFromLocation = (loc?: string): EditBookDestination => {
  const l = (loc || '').toLowerCase();
  if (l.includes('sala')) return 'SALA';
  if (l.includes('otra') || l.includes('convenio') || l.includes('inter')) return 'OTRA_BIBLIOTECA';
  return 'ESTANTERIA';
};

const editResourceSchema = z.object({
  title: z.string().min(2, 'El título debe tener al menos 2 caracteres'),
  author: z.string().min(2, 'El autor es obligatorio'),
  isbn: z.string().min(10, 'El código ISBN debe tener al menos 10 caracteres'),
  publisher: z.string().optional(),
  publicationYear: z.coerce
    .number()
    .min(1000, 'Ingresa un año válido')
    .max(2035, 'El año no puede ser superior a 2035'),
  category: z.string().min(1, 'Selecciona una categoría válida'),
  destination: z.enum(['ESTANTERIA', 'SALA', 'OTRA_BIBLIOTECA']).default('ESTANTERIA'),
  totalCopies: z.coerce
    .number()
    .min(1, 'El número total de ejemplares debe ser al menos 1'),
  location: z.string().min(2, 'La ubicación física es requerida (ej. Estante A-1)'),
  description: z.string().optional(),
  coverUrl: z.string().url('Ingresa una URL válida (https://...)').optional().or(z.literal('')),
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
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiNotice, setAiNotice] = useState<string | null>(null);
  const [coverUrl, setCoverUrl] = useState('');
  const [coverPreviewError, setCoverPreviewError] = useState(false);
  const categoryOptions = useActiveCategoriesForSelect();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea al contenido
  const autoResizeTextarea = useCallback(() => {
    const el = descTextareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<EditResourceFormData>({
    resolver: zodResolver(editResourceSchema) as any,
  });

  const handleGenerateAISummary = async () => {
    if (!resource) return;
    setIsGeneratingAI(true);
    setAiNotice(null);
    try {
      const data = await requestAISummary({
        titulo: resource.title,
        autor: resource.author,
        sinopsis_o_tema: resource.categoryLabel || String(resource.category) || '',
        libro_id: resource.id,
      });

      if (data?.resumen) {
        setValue('description', data.resumen, { shouldDirty: true });
        setAiNotice('¡Resumen generado y guardado en la base de datos!');
        // Actualizar resize del textarea después del set
        setTimeout(autoResizeTextarea, 50);
      } else {
        setAiNotice('No se obtuvo texto de resumen del microservicio.');
      }
    } catch (err: any) {
      console.error(err);
      setAiNotice(err?.message || 'Error al generar resumen.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const [ejemplaresList, setEjemplaresList] = useState<EditEjemplarItem[]>([]);

  // Populate form with current resource values when opened
  useEffect(() => {
    if (resource) {
      const matchedBook = MOCK_BOOKS.find(
        (b) =>
          (resource.isbn &&
            b.isbn.replace(/-/g, '') === resource.isbn.replace(/-/g, '')) ||
          b.title.trim().toLowerCase() === resource.title.trim().toLowerCase()
      );

      const catCode =
        resolveCategory(resource.category)?.code ||
        resolveCategory(resource.categoryLabel)?.code ||
        '000';
      const initialDest = inferDestinationFromLocation(resource.location);

      // Cargar ejemplares individuales
      let initialEjemplares: EditEjemplarItem[] = [];
      if (Array.isArray(resource.ejemplares) && resource.ejemplares.length > 0) {
        initialEjemplares = resource.ejemplares.map((ej, idx) => ({
          id: ej.id,
          codigo_inventario:
            ej.codigo_inventario ||
            `CIU-${resource.isbn.replace(/[^A-Za-z0-9]/g, '').slice(-4) || '001'}-${String.fromCharCode(65 + idx)}`,
          destination: inferDestinationFromLocation(ej.ubicacion_estante || resource.location),
          location: ej.ubicacion_estante || resource.location || 'Estante A-1, Nivel 1',
          estado: ej.estado || 'disponible',
        }));
      } else {
        const total = Math.max(1, resource.totalCopies || 1);
        for (let i = 0; i < total; i++) {
          initialEjemplares.push({
            codigo_inventario: `CIU-${resource.isbn.replace(/[^A-Za-z0-9]/g, '').slice(-4) || '001'}-${String.fromCharCode(65 + i)}`,
            destination: inferDestinationFromLocation(resource.location),
            location: resource.location || 'Estante A-1, Nivel 1',
            estado: 'disponible',
          });
        }
      }
      setEjemplaresList(initialEjemplares);

      reset({
        title: resource.title,
        author: resource.author,
        isbn: resource.isbn,
        publisher: resource.publisher || matchedBook?.publisher || '',
        publicationYear: resource.publicationYear,
        category: catCode,
        destination: initialDest,
        totalCopies: resource.totalCopies,
        location: resource.location,
        description: resource.description || matchedBook?.description || '',
        coverUrl: resource.coverUrl || '',
      });
      setCoverUrl(resource.coverUrl || '');
      setCoverPreviewError(false);
      // Ajustar altura del textarea al contenido existente
      setTimeout(autoResizeTextarea, 80);
    }
  }, [resource, reset, autoResizeTextarea]);

  const currentTotalCopies = watch('totalCopies');
  useEffect(() => {
    if (!resource) return;
    const count = Math.max(1, Math.min(50, Number(currentTotalCopies) || 1));
    setEjemplaresList((prev) => {
      if (prev.length === count) return prev;
      if (prev.length < count) {
        const toAdd: EditEjemplarItem[] = [];
        for (let i = prev.length; i < count; i++) {
          const letra = i < 26 ? String.fromCharCode(65 + i) : String(i + 1);
          toAdd.push({
            codigo_inventario: `CIU-${resource.isbn.replace(/[^A-Za-z0-9]/g, '').slice(-4) || '001'}-${letra}`,
            destination: 'ESTANTERIA',
            location: 'Estante A-1, Nivel 1',
            estado: 'disponible',
          });
        }
        return [...prev, ...toAdd];
      }
      return prev.slice(0, count);
    });
  }, [currentTotalCopies, resource]);

  const handleEjemplarDestinationChange = (index: number, newDest: EditBookDestination) => {
    setEjemplaresList((prev) =>
      prev.map((item, idx) => {
        if (idx !== index) return item;
        let suggestedLoc = item.location;
        if (newDest === 'SALA' && !suggestedLoc.toLowerCase().includes('sala')) {
          suggestedLoc = 'Sala de lectura, Módulo central';
        } else if (
          newDest === 'OTRA_BIBLIOTECA' &&
          !suggestedLoc.toLowerCase().includes('otra') &&
          !suggestedLoc.toLowerCase().includes('convenio') &&
          !suggestedLoc.toLowerCase().includes('inter')
        ) {
          suggestedLoc = 'Otra biblioteca - Convenio interinstitucional';
        } else if (newDest === 'ESTANTERIA') {
          if (
            suggestedLoc.toLowerCase().includes('sala') ||
            suggestedLoc.toLowerCase().includes('otra') ||
            suggestedLoc.toLowerCase().includes('convenio') ||
            suggestedLoc.toLowerCase().includes('inter')
          ) {
            suggestedLoc = 'Estante A-1, Nivel 1';
          }
        }
        return { ...item, destination: newDest, location: suggestedLoc };
      })
    );
  };

  const handleEjemplarLocationChange = (index: number, newLoc: string) => {
    setEjemplaresList((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, location: newLoc } : item))
    );
  };

  const handleApplyToAllCopies = (sourceIndex: number) => {
    const src = ejemplaresList[sourceIndex];
    if (!src) return;
    setEjemplaresList((prev) =>
      prev.map((item) => ({
        ...item,
        destination: src.destination,
        location: src.location,
      }))
    );
  };

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

  const onSubmit = async (data: EditResourceFormData) => {
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

    const resolvedCat = resolveCategory(data.category) || BIBLIOGRAPHIC_CATEGORIES[0];

    // Normalizar cada ejemplar según su destino asignado
    const finalEjemplares: EjemplarItem[] = ejemplaresList.map((ej) => {
      let loc = ej.location.trim();
      if (ej.destination === 'SALA' && !loc.toLowerCase().includes('sala')) {
        loc = `Sala de lectura - ${loc}`;
      } else if (
        ej.destination === 'OTRA_BIBLIOTECA' &&
        !loc.toLowerCase().includes('otra') &&
        !loc.toLowerCase().includes('convenio') &&
        !loc.toLowerCase().includes('inter')
      ) {
        loc = `Otra biblioteca (Convenio) - ${loc}`;
      }
      return {
        id: ej.id || '',
        codigo_inventario: ej.codigo_inventario,
        ubicacion_estante: loc,
        estado: ej.estado || 'disponible',
      };
    });

    const primaryLocation = finalEjemplares[0]?.ubicacion_estante || data.location.trim();

    const updatedResource: Resource = {
      ...resource,
      title: data.title.trim(),
      author: data.author.trim(),
      isbn: data.isbn.trim(),
      publisher: data.publisher?.trim() || undefined,
      publicationYear: Number(data.publicationYear),
      category: resolvedCat.code,
      categoryLabel: resolvedCat.label,
      totalCopies: Number(data.totalCopies),
      availableCopies: newAvailableCopies,
      location: primaryLocation,
      status: newStatus,
      description: data.description?.trim() || undefined,
      coverUrl: coverUrl.trim() || resource.coverUrl,
      coverInitials: data.title.trim().slice(0, 2).toUpperCase(),
      ejemplares: finalEjemplares,
    };

    await onSave(updatedResource);
    onClose();
  };

  const { ref: formTitleRef, ...titleRegisterProps } = register('title');
  const { ref: descRegisterRef, ...descRegisterProps } = register('description');

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
              options={categoryOptions}
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

            {/* Sección de Ejemplares y Ubicaciones Individuales */}
            <div
              className="edit-modal-col-span-2"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                padding: '16px',
                backgroundColor: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                borderRadius: '12px',
                marginTop: '4px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                <div>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      color: '#1E293B',
                    }}
                  >
                    Distribución por ejemplar ({ejemplaresList.length} copias físicas)
                  </h4>
                  <p
                    style={{
                      margin: '2px 0 0 0',
                      fontSize: '0.8125rem',
                      color: '#64748B',
                    }}
                  >
                    Establece si cada copia física está en estantería general, sala de lectura o en préstamo interbibliotecario.
                  </p>
                </div>
                {ejemplaresList.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleApplyToAllCopies(0)}
                    title="Copia el destino y ubicación del primer ejemplar a todos"
                  >
                    Copiar ubicación del primer ejemplar a todos
                  </Button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
                {ejemplaresList.map((ej, index) => (
                  <div
                    key={ej.id || `ej-${index}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '120px 1.2fr 1.8fr',
                      gap: 12,
                      alignItems: 'center',
                      backgroundColor: '#FFFFFF',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span
                        title={ej.codigo_inventario}
                        style={{
                          fontSize: '0.8125rem',
                          fontWeight: 700,
                          color: '#1E293B',
                        }}
                      >
                        {getEditionLabel(index)}
                      </span>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          color: ej.estado === 'prestado' ? '#DC2626' : '#16A34A',
                        }}
                      >
                        {ej.estado === 'prestado' ? '● En préstamo' : '● Disponible'}
                      </span>
                    </div>

                    <Select
                      label=""
                      options={EDIT_BOOK_DESTINATION_OPTIONS}
                      value={ej.destination}
                      onChange={(e) =>
                        handleEjemplarDestinationChange(index, e.target.value as EditBookDestination)
                      }
                    />

                    <Input
                      label=""
                      value={ej.location}
                      placeholder={
                        ej.destination === 'SALA'
                          ? 'Ej. Sala de lectura, Mesa 3'
                          : ej.destination === 'OTRA_BIBLIOTECA'
                          ? 'Ej. Otra biblioteca - Convenio Universidad'
                          : 'Ej. Estante D-3, Nivel 3'
                      }
                      onChange={(e) => handleEjemplarLocationChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Cover Image URL */}
            <div className="edit-modal-col-span-2">
              <div className="edit-modal-cover-group">
                <label htmlFor="edit-book-cover" className="edit-modal-textarea-label">
                  <ImageIcon size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
                  URL de imagen de portada
                </label>
                <div className="edit-modal-cover-row">
                  <Input
                    id="edit-book-cover"
                    placeholder="https://ejemplo.com/portada.jpg"
                    value={coverUrl}
                    onChange={(e) => {
                      setCoverUrl(e.target.value);
                      setCoverPreviewError(false);
                    }}
                    style={{ flex: 1 }}
                  />
                  {coverUrl && !coverPreviewError && (
                    <img
                      src={coverUrl}
                      alt="Vista previa de portada"
                      className="edit-modal-cover-preview"
                      onError={() => setCoverPreviewError(true)}
                    />
                  )}
                  {coverUrl && coverPreviewError && (
                    <div className="edit-modal-cover-preview edit-modal-cover-preview--error">
                      <ImageIcon size={20} color="#9CA3AF" />
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '0.74rem', color: '#9CA3AF', marginTop: 2 }}>
                  Pega la URL directa de la imagen (JPG, PNG, WebP). Se mostrará como portada en el catálogo.
                </span>
              </div>
            </div>

            {/* Description / Synopsis */}
            <div className="edit-modal-col-span-2 edit-modal-textarea-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <label htmlFor="edit-book-desc" className="edit-modal-textarea-label" style={{ margin: 0 }}>
                  Descripción o sinopsis
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateAISummary}
                  isLoading={isGeneratingAI}
                  leftIcon={<Sparkles size={14} color="#2F80ED" />}
                  style={{
                    fontSize: '0.75rem',
                    color: '#2F80ED',
                    borderColor: '#BFDBFE',
                    backgroundColor: '#EFF6FF',
                    padding: '3px 8px',
                    height: '26px',
                  }}
                >
                  {isGeneratingAI ? 'Generando...' : 'Generar resumen con IA'}
                </Button>
              </div>
              <textarea
                id="edit-book-desc"
                rows={3}
                placeholder="Breve reseña del libro o pulsa 'Generar resumen con IA'..."
                className="edit-modal-textarea edit-modal-textarea--autoresize"
                ref={(node) => {
                  descRegisterRef(node);
                  (descTextareaRef as any).current = node;
                }}
                onInput={autoResizeTextarea}
                {...descRegisterProps}
              />
              {aiNotice && (
                <span style={{ fontSize: '0.75rem', color: aiNotice.includes('éxito') || aiNotice.includes('guardado') ? '#10B981' : '#F59E0B' }}>
                  {aiNotice}
                </span>
              )}
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
