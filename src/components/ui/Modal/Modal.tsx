import React, {
  useEffect,
  useRef,
  useId,
  type ReactNode,
  type RefObject,
} from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import './Modal.css';

export type ModalSize = 'small' | 'medium' | 'large' | 'sm' | 'md' | 'lg';

export interface ModalProps {
  /** Controls whether the modal dialog is open */
  open: boolean;
  /** Callback triggered when the dialog requests to close */
  onClose: () => void;
  /** Dialog header title */
  title?: ReactNode;
  /** Optional subtitle or description associated via aria-describedby */
  description?: ReactNode;
  /** Optional icon displayed next to the title */
  icon?: ReactNode;
  /** Dialog content body */
  children: ReactNode;
  /** Optional footer container for dialog action buttons */
  footer?: ReactNode;
  /** Sizing of the dialog: small (440px), medium (560px), large (720px) */
  size?: ModalSize;
  /** Whether clicking the backdrop closes the dialog. Defaults to true */
  closeOnBackdrop?: boolean;
  /** Whether pressing Escape key closes the dialog. Defaults to true */
  closeOnEscape?: boolean;
  /** Whether to show the top-right close button. Defaults to true */
  showCloseButton?: boolean;
  /** Accessible label for the close button */
  closeButtonAriaLabel?: string;
  /** Custom CSS class names applied to the dialog element */
  className?: string;
  /** Optional element to receive focus when dialog opens */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** ARIA role for sensitive confirmation dialogs. Defaults to undefined (implicit dialog) */
  role?: 'dialog' | 'alertdialog';
}

// Global modal counter to manage body scroll lock across multiple modal instances
let openModalsCount = 0;

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  size = 'medium',
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  closeButtonAriaLabel = 'Cerrar diálogo',
  className,
  initialFocusRef,
  role,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const isBackdropClickPending = useRef(false);

  const generatedId = useId();
  const titleId = `modal-title-${generatedId}`;
  const descriptionId = `modal-desc-${generatedId}`;

  // Map size aliases to canonical class names
  const normalizedSize =
    size === 'sm' || size === 'small'
      ? 'small'
      : size === 'lg' || size === 'large'
      ? 'large'
      : 'medium';

  // Synchronize open state with native <dialog> showModal() and close()
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      // Save previously focused element to return focus when modal closes
      if (document.activeElement instanceof HTMLElement) {
        previousActiveElement.current = document.activeElement;
      }

      // Open natively with showModal() to activate top layer and native focus trap
      if (!dialog.open) {
        try {
          dialog.showModal();
        } catch (e) {
          console.error('Error opening dialog:', e);
        }
      }

      // Handle body scroll lock safely across multiple instances
      if (openModalsCount === 0) {
        document.body.style.overflow = 'hidden';
      }
      openModalsCount++;

      // Focus management: custom initial focus or let the browser autofocus
      if (initialFocusRef?.current) {
        requestAnimationFrame(() => {
          initialFocusRef.current?.focus();
        });
      }

      return () => {
        // Cleanup when closing or unmounting while open
        openModalsCount = Math.max(0, openModalsCount - 1);
        if (openModalsCount === 0) {
          document.body.style.overflow = '';
        }

        if (dialog.open) {
          dialog.close();
        }

        // Restore focus to previous active element
        if (previousActiveElement.current && document.contains(previousActiveElement.current)) {
          previousActiveElement.current.focus();
        }
      };
    } else {
      // If open is false and dialog is still open natively, close it
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [open, initialFocusRef]);

  // Handle native cancel event (triggered by Escape key)
  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    if (!closeOnEscape) {
      e.preventDefault();
      return;
    }
    // Prevent default browser close so React state remains single source of truth
    e.preventDefault();
    onClose();
  };

  // Helper to determine if a mouse event occurred on the backdrop (outside dialog bounds)
  const isClickOnBackdrop = (e: React.MouseEvent<HTMLDialogElement>): boolean => {
    const dialog = dialogRef.current;
    if (!dialog) return false;
    const rect = dialog.getBoundingClientRect();
    return (
      e.target === dialog &&
      (e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom)
    );
  };

  // Detect backdrop clicks safely without triggering when selecting or dragging inside
  const handleMouseDown = (e: React.MouseEvent<HTMLDialogElement>) => {
    isBackdropClickPending.current = isClickOnBackdrop(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (isBackdropClickPending.current && isClickOnBackdrop(e)) {
      if (closeOnBackdrop) {
        onClose();
      }
    }
    isBackdropClickPending.current = false;
  };

  // Only render when open or when native dialog needs to manage its transition
  if (!open) {
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      className={clsx(
        'ui-modal-dialog',
        `ui-modal-dialog--${normalizedSize}`,
        className
      )}
      onCancel={handleCancel}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      role={role}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
    >
      <div className="ui-modal-container">
        {/* Modal Header */}
        {(title || showCloseButton) && (
          <header className="ui-modal-header">
            <div className="ui-modal-header-info">
              {icon && (
                <div className="ui-modal-header-icon" aria-hidden="true">
                  {icon}
                </div>
              )}
              <div className="ui-modal-header-titles">
                {title && (
                  <h2 id={titleId} className="ui-modal-title">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id={descriptionId} className="ui-modal-description">
                    {description}
                  </p>
                )}
              </div>
            </div>

            {showCloseButton && (
              <button
                type="button"
                className="ui-modal-close-btn"
                onClick={onClose}
                aria-label={closeButtonAriaLabel}
                title={closeButtonAriaLabel}
              >
                <X size={18} />
              </button>
            )}
          </header>
        )}

        {/* Modal Body */}
        <div className="ui-modal-body">{children}</div>

        {/* Optional Modal Footer */}
        {footer && <footer className="ui-modal-footer">{footer}</footer>}
      </div>
    </dialog>
  );
};
