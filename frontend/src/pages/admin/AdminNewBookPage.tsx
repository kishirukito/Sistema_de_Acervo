import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, BookPlus, Sparkles, ImageOff } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { booksService } from '../../services/api/books.service';
import { requestAISummary } from '../../services/api/ai.service';
import { BIBLIOGRAPHIC_CATEGORIES, resolveCategory } from '../../constants';
import { useActiveCategoriesForSelect } from '../../features/categories/categories.query';

export type BookDestination = 'ESTANTERIA' | 'SALA' | 'OTRA_BIBLIOTECA';

export const BOOK_DESTINATION_OPTIONS = [
  { value: 'ESTANTERIA', label: 'En estantería (Biblioteca general / Acervo)' },
  { value: 'SALA', label: 'En sala (Consulta interna de lectura)' },
  { value: 'OTRA_BIBLIOTECA', label: 'En otra biblioteca (Convenio interbibliotecario)' },
];

export interface NewBookEjemplarItem {
  id: string;
  copiaLetra: string;
  destination: BookDestination;
  location: string;
}

const getCopyLetter = (index: number): string => {
  if (index < 26) return String.fromCharCode(65 + index);
  return String(index + 1);
};

const bookSchema = z.object({
  isbn: z.string().min(10, 'El ISBN debe tener al menos 10 caracteres'),
  title: z.string().min(2, 'El título es obligatorio'),
  author: z.string().min(2, 'El autor es obligatorio'),
  publisher: z.string().min(2, 'La editorial es obligatoria'),
  publishYear: z.coerce.number().min(1000, 'Año inválido').max(2035, 'Año no válido'),
  category: z.string().min(1, 'Selecciona una categoría válida'),
  destination: z.enum(['ESTANTERIA', 'SALA', 'OTRA_BIBLIOTECA']).default('ESTANTERIA'),
  totalCopies: z.coerce.number().min(1, 'Debe haber al menos 1 ejemplar'),
  location: z.string().min(2, 'La ubicación física es requerida (ej. Estante A-1)'),
  coverUrl: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === '') return true;
        const trimmed = val.trim();
        try {
          const parsed = new URL(trimmed);
          return parsed.protocol === 'http:' || parsed.protocol === 'https:';
        } catch {
          return false;
        }
      },
      {
        message: 'Ingresa una URL válida que comience con http:// o https://',
      }
    ),
  description: z.string().optional(),
});

type BookFormData = z.infer<typeof bookSchema>;

export const AdminNewBookPage: React.FC = () => {
  const navigate = useNavigate();
  const categoryOptions = useActiveCategoriesForSelect();
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiNotice, setAiNotice] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema) as any,
    defaultValues: {
      isbn: '',
      title: '',
      author: '',
      publisher: '',
      publishYear: new Date().getFullYear(),
      category: '000',
      destination: 'ESTANTERIA',
      totalCopies: 3,
      location: 'Estante A-1, Nivel 1',
      coverUrl: '',
      description: '',
    },
  });

  const currentTitle = watch('title');
  const currentAuthor = watch('author');
  const currentCategory = watch('category');
  const currentCoverUrl = watch('coverUrl');
  const currentDescription = watch('description');
  const currentTotalCopies = watch('totalCopies');

  // Estado para gestión individualizada de ejemplares
  const [ejemplaresList, setEjemplaresList] = useState<NewBookEjemplarItem[]>([
    { id: 'copy-0', copiaLetra: 'A', destination: 'ESTANTERIA', location: 'Estante A-1, Nivel 1' },
    { id: 'copy-1', copiaLetra: 'B', destination: 'ESTANTERIA', location: 'Estante A-1, Nivel 1' },
    { id: 'copy-2', copiaLetra: 'C', destination: 'ESTANTERIA', location: 'Estante A-1, Nivel 1' },
  ]);

  // Sincronizar cantidad de ejemplares cuando cambie totalCopies
  useEffect(() => {
    const count = Math.max(1, Math.min(50, Number(currentTotalCopies) || 1));
    setEjemplaresList((prev) => {
      if (prev.length === count) return prev;
      if (prev.length < count) {
        const toAdd: NewBookEjemplarItem[] = [];
        for (let i = prev.length; i < count; i++) {
          const letra = getCopyLetter(i);
          toAdd.push({
            id: `copy-${i}`,
            copiaLetra: letra,
            destination: 'ESTANTERIA',
            location: 'Estante A-1, Nivel 1',
          });
        }
        return [...prev, ...toAdd];
      }
      return prev.slice(0, count);
    });
  }, [currentTotalCopies]);

  const handleEjemplarDestinationChange = (index: number, newDest: BookDestination) => {
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

  const descriptionRegister = register('description');
  const descriptionTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustDescriptionHeight = useCallback(() => {
    const textarea = descriptionTextareaRef.current;
    if (!textarea) return;

    // Reset height to 'auto' first so scrollHeight accurately shrinks when content is deleted or shortened
    textarea.style.height = 'auto';

    // Calculate content height accounting for border-box
    const minHeight = 88; // Initial comfortable height (~3.5 lines + padding)
    const borderOffset = textarea.offsetHeight - textarea.clientHeight;
    const scrollHeight = textarea.scrollHeight;
    const targetHeight = Math.max(minHeight, scrollHeight + borderOffset);

    textarea.style.height = `${targetHeight}px`;
  }, []);

  // Recalculate height whenever description value changes (e.g. AI generation or form reset)
  useEffect(() => {
    adjustDescriptionHeight();
  }, [currentDescription, adjustDescriptionHeight]);

  // Recalculate height on window resize (line wrapping adjusts with viewport width)
  useEffect(() => {
    const handleResize = () => {
      adjustDescriptionHeight();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [adjustDescriptionHeight]);

  const trimmedCoverUrl = (currentCoverUrl || '').trim();

  const isValidPreviewUrl = useMemo(() => {
    if (!trimmedCoverUrl) return false;
    try {
      const parsed = new URL(trimmedCoverUrl);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }, [trimmedCoverUrl]);

  useEffect(() => {
    setPreviewError(false);
  }, [trimmedCoverUrl]);

  const handleGenerateAISummary = async () => {
    if (!currentTitle || currentTitle.trim().length < 2) {
      setAiNotice('Escribe primero el título del libro para generar el resumen.');
      return;
    }
    setAiNotice(null);
    setIsGeneratingAI(true);
    try {
      const data = await requestAISummary({
        titulo: currentTitle.trim(),
        autor: currentAuthor ? currentAuthor.trim() : 'Autor especializado',
        sinopsis_o_tema: currentCategory || 'Ciencias e Ingeniería',
      });

      if (data?.resumen) {
        setValue('description', data.resumen, { shouldDirty: true });
        setAiNotice('¡Resumen generado con éxito mediante IA!');
        // Extra frame request to ensure DOM paint has applied value
        requestAnimationFrame(() => {
          adjustDescriptionHeight();
        });
      } else {
        setAiNotice('No se obtuvo texto de resumen del microservicio.');
      }
    } catch (err: any) {
      console.error(err);
      setAiNotice(err?.message || 'Error al invocar el microservicio de IA.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const onSubmit = async (data: BookFormData) => {
    const resolvedCat = resolveCategory(data.category) || BIBLIOGRAPHIC_CATEGORIES[0];
    const cleanedCoverUrl = data.coverUrl ? data.coverUrl.trim() : undefined;

    // Normalizar cada ejemplar según su destino asignado
    const finalEjemplares = ejemplaresList.map((ej) => {
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
        codigo_inventario: `CIU-${data.isbn.replace(/[^A-Za-z0-9]/g, '').slice(-4) || '001'}-${ej.copiaLetra}`,
        ubicacion_estante: loc,
        estado: 'disponible',
      };
    });

    const primaryLocation = finalEjemplares[0]?.ubicacion_estante || data.location.trim();

    const createdBook = await booksService.create({
      ...data,
      totalCopies: finalEjemplares.length,
      availableCopies: finalEjemplares.length,
      location: primaryLocation,
      coverUrl: cleanedCoverUrl || undefined,
      category: resolvedCat.code,
      ejemplares: finalEjemplares,
      ejemplares_items: finalEjemplares,
    } as any);

    navigate(`/admin/catalog/${createdBook.id || 'new'}/success`, {
      state: { book: createdBook },
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">Registrar Nuevo Título</h1>
          <p className="page-subtitle">
            Alta de material bibliográfico en el inventario del acervo
          </p>
        </div>
        <div className="page-actions">
          <Button
            variant="outline"
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => navigate('/admin/catalog')}
          >
            Volver al Catálogo
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader
          title="Ficha Bibliográfica"
          subtitle="Completa todos los campos para catalogar el volumen"
        />
        <CardBody>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 16,
                width: '100%',
              }}
            >
              <Input
                label="Título del Libro"
                placeholder="Ej. Introducción a los Algoritmos"
                error={errors.title?.message}
                {...register('title')}
              />

              <Input
                label="Autor(es)"
                placeholder="Ej. Thomas H. Cormen"
                error={errors.author?.message}
                {...register('author')}
              />

              <Input
                label="Código ISBN"
                placeholder="Ej. 978-0262033848"
                error={errors.isbn?.message}
                {...register('isbn')}
              />

              <Input
                label="Editorial"
                placeholder="Ej. MIT Press"
                error={errors.publisher?.message}
                {...register('publisher')}
              />

              <Input
                label="Año de Publicación"
                type="number"
                error={errors.publishYear?.message}
                {...register('publishYear')}
              />

              <Select
                label="Categoría Temática"
                options={categoryOptions}
                error={errors.category?.message}
                {...register('category')}
              />

              <Input
                label="Número de Ejemplares"
                type="number"
                min={1}
                max={50}
                error={errors.totalCopies?.message}
                {...register('totalCopies')}
              />

              {/* Sección de Ubicación y Destino por Ejemplar */}
              <div
                style={{
                  gridColumn: '1 / -1',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  padding: '16px',
                  backgroundColor: '#F8FAFC',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '12px',
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
                      Asignación y ubicación por ejemplar ({ejemplaresList.length} copias)
                    </h4>
                    <p
                      style={{
                        margin: '2px 0 0 0',
                        fontSize: '0.8125rem',
                        color: '#64748B',
                      }}
                    >
                      Configura si cada copia física estará en estantería general, en sala de lectura o en otra biblioteca en convenio.
                    </p>
                  </div>
                  {ejemplaresList.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleApplyToAllCopies(0)}
                      title="Copia el destino y ubicación del Ejemplar A a todos los demás"
                    >
                      Copiar ubicación del Ejemplar A a todos
                    </Button>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
                  {ejemplaresList.map((ej, index) => (
                    <div
                      key={ej.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '90px 1.2fr 1.8fr',
                        gap: 12,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            backgroundColor: '#EFF6FF',
                            color: '#2563EB',
                            fontWeight: 700,
                            fontSize: '0.8125rem',
                          }}
                        >
                          {ej.copiaLetra}
                        </span>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#334155' }}>
                          Copia {ej.copiaLetra}
                        </span>
                      </div>

                      <Select
                        label=""
                        options={BOOK_DESTINATION_OPTIONS}
                        value={ej.destination}
                        onChange={(e) =>
                          handleEjemplarDestinationChange(index, e.target.value as BookDestination)
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
                            : 'Ej. Estante A-1, Nivel 1'
                        }
                        onChange={(e) => handleEjemplarLocationChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Input
                  label="URL de la portada"
                  placeholder="https://ejemplo.com/portada.jpg"
                  helperText="Ingresa la dirección de una imagen para utilizarla como portada."
                  error={errors.coverUrl?.message}
                  {...register('coverUrl')}
                />

                {isValidPreviewUrl && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '10px 14px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      width: 'fit-content',
                      maxWidth: '100%',
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 72,
                        borderRadius: 6,
                        overflow: 'hidden',
                        backgroundColor: '#E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        border: '1px solid #CBD5E1',
                        position: 'relative',
                      }}
                    >
                      {!previewError ? (
                        <img
                          src={trimmedCoverUrl}
                          alt="Vista previa de portada"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={() => setPreviewError(true)}
                        />
                      ) : (
                        <ImageOff size={22} color="#94A3B8" />
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1E293B' }}>
                        Vista previa de portada
                      </span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: previewError ? '#DC2626' : '#64748B',
                        }}
                      >
                        {!previewError
                          ? 'Imagen cargada correctamente'
                          : 'No se pudo cargar la imagen desde este enlace'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-text)' }}>
                  Descripción o Reseña
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
                    padding: '4px 10px',
                    height: '28px',
                  }}
                >
                  {isGeneratingAI ? 'Generando...' : 'Generar resumen con IA'}
                </Button>
              </div>
              <textarea
                ref={(el) => {
                  descriptionRegister.ref(el);
                  descriptionTextareaRef.current = el;
                }}
                rows={3}
                placeholder="Breve sinopsis del contenido o pulsa 'Generar resumen con IA'..."
                style={{
                  width: '100%',
                  minHeight: '88px',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  fontFamily: 'inherit',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  outline: 'none',
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  boxSizing: 'border-box',
                  resize: 'none',
                  overflowY: 'hidden',
                  transition: 'border-color 0.15s ease',
                }}
                name={descriptionRegister.name}
                onBlur={(e) => {
                  descriptionRegister.onBlur(e);
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary, #2563EB)';
                }}
                onChange={(e) => {
                  descriptionRegister.onChange(e);
                  adjustDescriptionHeight();
                }}
              />
              {aiNotice && (
                <span style={{ fontSize: '0.75rem', color: aiNotice.includes('éxito') ? '#10B981' : '#F59E0B' }}>
                  {aiNotice}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/catalog')}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                leftIcon={<BookPlus size={16} />}
              >
                Guardar en Acervo
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
