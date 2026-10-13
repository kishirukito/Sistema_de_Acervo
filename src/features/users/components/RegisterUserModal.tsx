import React, { useState, useRef, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  UserPlus,
  ShieldCheck,
  User,
  AlertCircle,
  AlertTriangle,
  RotateCcw,
  SquarePen,
  Save,
} from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import type {
  ManagedUser,
  AdministrativeRole,
  NormalUserCategory,
} from '../users.types';
import './RegisterUserModal.css';

const registerUserSchema = z
  .object({
    kind: z.enum(['NORMAL', 'ADMINISTRATIVE']),
    fullName: z
      .string()
      .trim()
      .min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: z
      .string()
      .trim()
      .email('Ingresa un correo electrónico válido (ej. usuario@biblioteca.edu)'),
    phone: z.string().trim().optional(),
    borrowerCode: z
      .string()
      .trim()
      .min(3, 'El código o matrícula es obligatorio'),
    role: z.enum(['LIBRARIAN', 'ADMIN']).optional(),
    category: z
      .enum(['STUDENT', 'TEACHER', 'GRADUATE', 'EXTERNAL', 'ROOM'])
      .optional(),
    roomResponsibleName: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.kind === 'ADMINISTRATIVE' && !data.role) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Selecciona el rol administrativo del usuario',
        path: ['role'],
      });
    }
    if (data.kind === 'NORMAL') {
      if (!data.category) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Selecciona la categoría de usuario',
          path: ['category'],
        });
      }
      if (
        data.category === 'ROOM' &&
        (!data.roomResponsibleName || data.roomResponsibleName.length < 3)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'El nombre del responsable de sala es obligatorio',
          path: ['roomResponsibleName'],
        });
      }
    }
  });

type RegisterUserFormData = z.infer<typeof registerUserSchema>;

const NORMAL_CATEGORY_OPTIONS = [
  { label: 'Lector (Estudiante)', value: 'STUDENT' },
  { label: 'Docente', value: 'TEACHER' },
  { label: 'Egresado', value: 'GRADUATE' },
  { label: 'Persona externa', value: 'EXTERNAL' },
  { label: 'Sala de lectura / Cómputo', value: 'ROOM' },
];

const ADMIN_ROLE_OPTIONS = [
  { label: 'Bibliotecario', value: 'LIBRARIAN' },
  { label: 'Administrador del sistema', value: 'ADMIN' },
];

const AVATAR_PALETTE = [
  '#1E3A5F',
  '#2F80ED',
  '#059669',
  '#7C3AED',
  '#C05621',
  '#0D9488',
  '#D97706',
];

function getAvatarColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[index];
}

function getUserInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return 'US';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function getFormattedDate(): string {
  const now = new Date();
  return `Desde ${now.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })}`;
}

export type UserFormMode = 'create' | 'edit';

export interface RegisterUserModalProps {
  /** Controls open state of the modal */
  open: boolean;
  /** Modal mode: 'create' for new user, 'edit' for updating existing user */
  mode?: UserFormMode;
  /** Existing user to edit (required when mode is 'edit') */
  user?: ManagedUser | null;
  /** Callback triggered when modal requests to close */
  onClose: () => void;
  /** Callback executed when user is successfully registered or edited */
  onSuccess: (user: ManagedUser) => void;
}

export const RegisterUserModal: React.FC<RegisterUserModalProps> = ({
  open,
  mode = 'create',
  user = null,
  onClose,
  onSuccess,
}) => {
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const fullNameRef = useRef<HTMLInputElement>(null);

  const isEdit = mode === 'edit';

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserSchema) as any,
    defaultValues: {
      kind: 'NORMAL',
      category: 'STUDENT',
      role: 'LIBRARIAN',
      fullName: '',
      email: '',
      phone: '',
      borrowerCode: '',
      roomResponsibleName: '',
    },
  });

  const selectedKind = useWatch({ control, name: 'kind' });
  const selectedCategory = useWatch({ control, name: 'category' });

  // Reset form when modal opens or user/mode changes
  useEffect(() => {
    if (open) {
      if (mode === 'edit' && user) {
        reset({
          kind: user.kind,
          category: user.kind === 'NORMAL' ? user.category : 'STUDENT',
          role: user.kind === 'ADMINISTRATIVE' ? user.role : 'LIBRARIAN',
          fullName: user.fullName,
          email: user.email,
          phone: user.phone || '',
          borrowerCode: user.borrowerCode,
          roomResponsibleName:
            user.kind === 'NORMAL' && user.category === 'ROOM'
              ? user.roomResponsibleName || ''
              : '',
        });
      } else {
        reset({
          kind: 'NORMAL',
          category: 'STUDENT',
          role: 'LIBRARIAN',
          fullName: '',
          email: '',
          phone: '',
          borrowerCode: '',
          roomResponsibleName: '',
        });
      }
      setShowDiscardConfirm(false);
    }
  }, [open, mode, user, reset]);

  if (!open) return null;

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

  const onSubmit = (data: RegisterUserFormData) => {
    const initials = getUserInitials(data.fullName);

    if (mode === 'edit' && user) {
      let updatedUser: ManagedUser;
      if (data.kind === 'ADMINISTRATIVE') {
        updatedUser = {
          id: user.id,
          status: user.status,
          activeLoans: user.activeLoans,
          createdAt: user.createdAt,
          hasOverdueLoan: user.hasOverdueLoan,
          avatarColor: user.avatarColor,
          kind: 'ADMINISTRATIVE',
          role: data.role as AdministrativeRole,
          fullName: data.fullName.trim(),
          email: data.email.trim().toLowerCase(),
          phone: data.phone?.trim() || undefined,
          borrowerCode: data.borrowerCode.trim().toUpperCase(),
          avatarInitials: initials,
        };
      } else {
        updatedUser = {
          id: user.id,
          status: user.status,
          activeLoans: user.activeLoans,
          createdAt: user.createdAt,
          hasOverdueLoan: user.hasOverdueLoan,
          avatarColor: user.avatarColor,
          kind: 'NORMAL',
          category: data.category as NormalUserCategory,
          fullName: data.fullName.trim(),
          email: data.email.trim().toLowerCase(),
          phone: data.phone?.trim() || undefined,
          borrowerCode: data.borrowerCode.trim().toUpperCase(),
          avatarInitials: initials,
          roomResponsibleName:
            data.category === 'ROOM'
              ? data.roomResponsibleName?.trim() || undefined
              : undefined,
        };
      }

      onSuccess(updatedUser);
      onClose();
      return;
    }

    const chosenColor = getAvatarColor(data.fullName || data.borrowerCode);
    const formattedDate = getFormattedDate();

    let newUser: ManagedUser;
    if (data.kind === 'ADMINISTRATIVE') {
      newUser = {
        id: `usr-${Date.now()}`,
        fullName: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone?.trim() || undefined,
        status: 'ACTIVE',
        activeLoans: 0,
        borrowerCode: data.borrowerCode.trim().toUpperCase(),
        createdAt: formattedDate,
        kind: 'ADMINISTRATIVE',
        role: data.role as AdministrativeRole,
        avatarColor: chosenColor,
        avatarInitials: initials,
      };
    } else {
      newUser = {
        id: `usr-${Date.now()}`,
        fullName: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone?.trim() || undefined,
        status: 'ACTIVE',
        activeLoans: 0,
        borrowerCode: data.borrowerCode.trim().toUpperCase(),
        createdAt: formattedDate,
        kind: 'NORMAL',
        category: data.category as NormalUserCategory,
        roomResponsibleName:
          data.category === 'ROOM'
            ? data.roomResponsibleName?.trim()
            : undefined,
        avatarColor: chosenColor,
        avatarInitials: initials,
      };
    }

    onSuccess(newUser);
    onClose();
  };

  const { ref: formNameRef, ...nameRegisterProps } = register('fullName');

  const modalTitle = isEdit ? 'Editar usuario' : 'Registrar usuario';
  const modalDescription = isEdit
    ? `Modifica los datos del usuario ${user?.fullName || ''}`
    : 'Ingresa los datos para dar de alta a un usuario en el acervo institucional';
  const modalIcon = isEdit ? <SquarePen size={18} /> : <UserPlus size={18} />;
  const closeButtonLabel = isEdit
    ? 'Cerrar edición de usuario'
    : 'Cerrar modal de registro';

  return (
    <Modal
      open={open}
      onClose={handleRequestClose}
      size="large"
      title={modalTitle}
      description={modalDescription}
      icon={modalIcon}
      closeButtonAriaLabel={closeButtonLabel}
      initialFocusRef={fullNameRef}
      footer={
        <div className="register-user-footer-actions">
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
            form="register-user-form"
            variant="primary"
            isLoading={isSubmitting}
            leftIcon={isEdit ? <Save size={16} /> : <UserPlus size={16} />}
          >
            {isEdit ? 'Guardar cambios' : 'Registrar usuario'}
          </Button>
        </div>
      }
    >
      <div style={{ position: 'relative' }}>
        <form
          id="register-user-form"
          className="register-user-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Account Kind Selection: Prestatario vs Personal Administrativo */}
          <div className="register-user-full-width">
            <span
              id="account-type-label"
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--color-text, #1F2937)',
                display: 'block',
                marginBottom: 6,
              }}
            >
              Tipo de cuenta
            </span>
            <div
              className="register-user-type-selector"
              role="radiogroup"
              aria-labelledby="account-type-label"
            >
              {/* Option 1: Normal Borrower */}
              <label
                className={`register-user-type-card ${
                  selectedKind === 'NORMAL'
                    ? 'register-user-type-card--active'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  value="NORMAL"
                  checked={selectedKind === 'NORMAL'}
                  onChange={() => {
                    setValue('kind', 'NORMAL', { shouldDirty: true });
                  }}
                  className="register-user-type-radio"
                />
                <div className="register-user-type-info">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <User size={15} color="var(--color-primary, #2F80ED)" />
                    <span className="register-user-type-title">
                      Lector / Prestatario
                    </span>
                  </div>
                  <span className="register-user-type-desc">
                    Estudiantes, docentes, egresados, externos y salas de lectura.
                  </span>
                </div>
              </label>

              {/* Option 2: Administrative Staff */}
              <label
                className={`register-user-type-card ${
                  selectedKind === 'ADMINISTRATIVE'
                    ? 'register-user-type-card--admin-active'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  value="ADMINISTRATIVE"
                  checked={selectedKind === 'ADMINISTRATIVE'}
                  onChange={() => {
                    setValue('kind', 'ADMINISTRATIVE', { shouldDirty: true });
                  }}
                  className="register-user-type-radio"
                />
                <div className="register-user-type-info">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <ShieldCheck size={15} color="#059669" />
                    <span className="register-user-type-title">
                      Personal Administrativo
                    </span>
                  </div>
                  <span className="register-user-type-desc">
                    Personal de biblioteca con acceso a gestión del sistema.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Administrative Security Warning */}
          {selectedKind === 'ADMINISTRATIVE' && (
            <div className="register-user-admin-warning" role="alert">
              <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <strong>Permisos de gestión administrativa:</strong>
                <div style={{ marginTop: 2 }}>
                  Esta cuenta tendrá acceso a la administración del acervo,
                  registro de préstamos y configuración de usuarios.
                </div>
              </div>
            </div>
          )}

          <div className="register-user-grid">
            {/* Conditional Role / Category */}
            {selectedKind === 'NORMAL' ? (
              <Select
                label="Categoría de prestatario"
                options={NORMAL_CATEGORY_OPTIONS}
                error={errors.category?.message}
                {...register('category')}
              />
            ) : (
              <Select
                label="Rol administrativo"
                options={ADMIN_ROLE_OPTIONS}
                error={errors.role?.message}
                {...register('role')}
              />
            )}

            {/* Borrower code */}
            <Input
              label={
                selectedKind === 'NORMAL'
                  ? 'Matrícula o código de prestatario'
                  : 'Folio o clave de empleado'
              }
              placeholder={
                selectedKind === 'NORMAL' ? 'Ej. ALU-2025-045' : 'Ej. ADM-2025-010'
              }
              error={errors.borrowerCode?.message}
              {...register('borrowerCode')}
            />

            {/* Full Name / Room Name */}
            <div className="register-user-full-width">
              <Input
                label={
                  selectedKind === 'NORMAL' && selectedCategory === 'ROOM'
                    ? 'Nombre de la sala de lectura o cómputo'
                    : 'Nombre completo'
                }
                placeholder={
                  selectedKind === 'NORMAL' && selectedCategory === 'ROOM'
                    ? 'Ej. Sala de Cómputo 2'
                    : 'Ej. Laura Patricia Sánchez Morales'
                }
                error={errors.fullName?.message}
                ref={(node) => {
                  formNameRef(node);
                  (fullNameRef as any).current = node;
                }}
                {...nameRegisterProps}
              />
            </div>

            {/* Conditional Room Responsible Name */}
            {selectedKind === 'NORMAL' && selectedCategory === 'ROOM' && (
              <div className="register-user-full-width">
                <Input
                  label="Nombre del responsable de la sala"
                  placeholder="Ej. Mtro. Roberto Gómez"
                  helperText="Persona a cargo de los ejemplares solicitados por esta sala"
                  error={errors.roomResponsibleName?.message}
                  {...register('roomResponsibleName')}
                />
              </div>
            )}

            {/* Email */}
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="Ej. usuario@biblioteca.edu"
              error={errors.email?.message}
              {...register('email')}
            />

            {/* Phone */}
            <Input
              label="Teléfono de contacto (opcional)"
              type="tel"
              placeholder="Ej. +52 55 1234 5678"
              error={errors.phone?.message}
              {...register('phone')}
            />
          </div>
        </form>

        {/* Discard Confirmation Overlay */}
        {showDiscardConfirm && (
          <div
            className="register-user-discard-overlay"
            role="alertdialog"
            aria-labelledby="discard-register-title"
            aria-describedby="discard-register-desc"
          >
            <div className="register-user-discard-card">
              <div className="register-user-discard-header">
                <div
                  className="register-user-discard-icon"
                  aria-hidden="true"
                >
                  <AlertTriangle size={20} />
                </div>
                <h4
                  id="discard-register-title"
                  className="register-user-discard-title"
                >
                  {isEdit ? '¿Descartar cambios?' : '¿Descartar datos ingresados?'}
                </h4>
              </div>
              <p
                id="discard-register-desc"
                className="register-user-discard-text"
              >
                {isEdit
                  ? 'Has realizado cambios en los datos del usuario. Si cierras la ventana ahora, los cambios no se guardarán.'
                  : 'Has ingresado datos en el formulario de registro. Si cierras la ventana ahora, la información se perderá.'}
              </p>
              <div className="register-user-discard-actions">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCancelDiscard}
                >
                  {isEdit ? 'Seguir editando' : 'Continuar editando'}
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  leftIcon={<RotateCcw size={14} />}
                  onClick={handleConfirmDiscard}
                >
                  {isEdit ? 'Descartar cambios' : 'Descartar y salir'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export const UserFormModal = RegisterUserModal;

