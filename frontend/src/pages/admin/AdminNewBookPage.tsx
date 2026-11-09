import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, BookPlus } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { booksService } from '../../services/api/books.service';
import { CATEGORY_SELECT_OPTIONS, BIBLIOGRAPHIC_CATEGORIES, resolveCategory } from '../../constants';

const bookSchema = z.object({
  isbn: z.string().min(10, 'El ISBN debe tener al menos 10 caracteres'),
  title: z.string().min(2, 'El título es obligatorio'),
  author: z.string().min(2, 'El autor es obligatorio'),
  publisher: z.string().min(2, 'La editorial es obligatoria'),
  publishYear: z.coerce.number().min(1000, 'Año inválido').max(2035, 'Año no válido'),
  category: z.string().min(1, 'Selecciona una categoría válida'),
  totalCopies: z.coerce.number().min(1, 'Debe haber al menos 1 ejemplar'),
  location: z.string().min(2, 'La ubicación física es requerida (ej. Estante A-1)'),
  description: z.string().optional(),
});

type BookFormData = z.infer<typeof bookSchema>;

export const AdminNewBookPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
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
      totalCopies: 3,
      location: 'Estante A-1, Nivel 1',
      description: '',
    },
  });

  const onSubmit = async (data: BookFormData) => {
    const resolvedCat = resolveCategory(data.category) || BIBLIOGRAPHIC_CATEGORIES[0];
    await booksService.create({
      ...data,
      category: resolvedCat.code,
      availableCopies: data.totalCopies,
    });
    navigate('/admin/catalog');
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
                options={CATEGORY_SELECT_OPTIONS}
                error={errors.category?.message}
                {...register('category')}
              />

              <Input
                label="Número de Ejemplares"
                type="number"
                error={errors.totalCopies?.message}
                {...register('totalCopies')}
              />

              <Input
                label="Ubicación Física"
                placeholder="Ej. Estante A-3, Pasillo Central"
                error={errors.location?.message}
                {...register('location')}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: '100%' }}>
              <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--color-text)' }}>
                Descripción o Reseña
              </label>
              <textarea
                rows={3}
                placeholder="Breve sinopsis del contenido y temas principales..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  fontFamily: 'inherit',
                  fontSize: '0.875rem',
                  outline: 'none',
                  backgroundColor: 'var(--color-surface)',
                }}
                {...register('description')}
              />
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
