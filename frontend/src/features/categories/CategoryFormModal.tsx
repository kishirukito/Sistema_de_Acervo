import React, { useState, useEffect } from 'react';
import { X, Library } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import type { Tema, CreateTemaPayload, UpdateTemaPayload } from './categories.service';

interface CategoryFormModalProps {
  open: boolean;
  /** Si se pasa un tema, el modal está en modo edición; si no, en modo alta. */
  tema: Tema | null;
  /** Lista de temas existentes para validación de duplicados en cliente. */
  existingTemas: Tema[];
  onClose: () => void;
  onSave: (payload: CreateTemaPayload | UpdateTemaPayload) => Promise<void>;
}

const TIPO_OPTIONS = [
  { label: 'Categoría principal (Dewey)', value: 'categoria' },
  { label: 'Tema específico', value: 'tema' },
];

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  open,
  tema,
  existingTemas,
  onClose,
  onSave,
}) => {
  const isEdit = Boolean(tema);

  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState<'categoria' | 'tema'>('tema');
  const [activa] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Poblar campos al abrir en modo edición
  useEffect(() => {
    if (open) {
      if (tema) {
        setNombre(tema.nombre);
        setCodigo(tema.codigo ?? '');
        setDescripcion(tema.descripcion ?? '');
        setTipo(tema.tipo === 'categoria' ? 'categoria' : 'tema');
      } else {
        setNombre('');
        setCodigo('');
        setDescripcion('');
        setTipo('tema');
      }
      setErrors({});
      setSubmitError(null);
    }
  }, [open, tema]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    const trimNombre = nombre.trim();
    const trimCodigo = codigo.trim();

    if (!trimNombre) {
      errs.nombre = 'El nombre es obligatorio.';
    } else if (trimNombre.length > 100) {
      errs.nombre = 'El nombre no puede superar los 100 caracteres.';
    } else {
      // Detectar nombre duplicado (case-insensitive, ignorando espacios)
      const normalizedNew = trimNombre.toLowerCase().replace(/\s+/g, ' ');
      const dup = existingTemas.find((t) => {
        if (isEdit && tema && t.id === tema.id) return false;
        return t.nombre.toLowerCase().replace(/\s+/g, ' ') === normalizedNew;
      });
      if (dup) {
        errs.nombre = `Ya existe una categoría con este nombre: "${dup.nombre}".`;
      }
    }

    if (trimCodigo) {
      if (trimCodigo.length > 20) {
        errs.codigo = 'El código no puede superar los 20 caracteres.';
      } else {
        // Detectar código duplicado (case-insensitive)
        const dup = existingTemas.find((t) => {
          if (isEdit && tema && t.id === tema.id) return false;
          return t.codigo?.toLowerCase() === trimCodigo.toLowerCase();
        });
        if (dup) {
          errs.codigo = `Ya existe una categoría con el código "${dup.codigo}".`;
        }
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitError(null);
    setIsSubmitting(true);

    const payload: CreateTemaPayload | UpdateTemaPayload = {
      nombre: nombre.trim(),
      codigo: codigo.trim() || undefined,
      descripcion: descripcion.trim() || undefined,
      ...(isEdit ? {} : { tipo, activa }),
    };

    try {
      await onSave(payload);
      onClose();
    } catch (err: any) {
      // Conservar datos capturados en caso de error
      setSubmitError(err?.message || 'Error al guardar la categoría. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="medium"
      title={isEdit ? 'Editar categoría' : 'Nueva categoría'}
      description={
        isEdit
          ? `Modifica los datos de "${tema?.nombre}"`
          : 'Agrega una nueva categoría al catálogo del acervo'
      }
      icon={<Library size={18} />}
      footer={
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button
            type="submit"
            form="category-form"
            variant="primary"
            isLoading={isSubmitting}
          >
            {isEdit ? 'Guardar cambios' : 'Crear categoría'}
          </Button>
        </div>
      }
    >
      <form id="category-form" onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input
            label="Nombre de la categoría"
            placeholder="Ej. Ciencias de las Computadoras, Información y Obras Generales"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            error={errors.nombre}
            required
          />

          <Input
            label="Código"
            placeholder="Ej. 000 (preserva ceros iniciales)"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            error={errors.codigo}
            helperText="Código Dewey u otro esquema. Se guarda como texto para conservar ceros iniciales."
          />

          {!isEdit && (
            <Select
              label="Tipo"
              options={TIPO_OPTIONS}
              value={tipo}
              onChange={(e) => setTipo(e.target.value as 'categoria' | 'tema')}
            />
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label
              style={{
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: 'var(--color-text)',
              }}
            >
              Descripción{' '}
              <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>(opcional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Breve descripción del alcance temático de esta categoría..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              style={{
                width: '100%',
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
                resize: 'vertical',
              }}
            />
          </div>

          {submitError && (
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
              {submitError}
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
};
