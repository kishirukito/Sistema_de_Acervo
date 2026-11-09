import React, { useMemo, useEffect, useRef } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';
import { MOCK_BOOKS } from '../../mocks/data';
import {
  getBorrowRequestById,
  formatSuggestedDate,
} from '../../features/loans/requests.service';
import type { BorrowRequest, Book } from '../../types';
import './UserRequestSuccessPage.css';

interface LocationState {
  request?: BorrowRequest;
  book?: Book;
}

export const UserRequestSuccessPage: React.FC = () => {
  const { bookId, requestId } = useParams<{ bookId?: string; requestId?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const state = (location.state as LocationState) || {};

  // Retrieve request either by direct ID lookup (persisted or mock) or from route state
  const resolvedRequest = useMemo<BorrowRequest | null>(() => {
    if (requestId) {
      const found = getBorrowRequestById(requestId);
      if (found) return found;
    }
    if (state.request && (!requestId || state.request.id === requestId)) {
      return state.request;
    }
    return null;
  }, [requestId, state.request]);

  // Authorization check: Verify request belongs to the authenticated user
  const isAuthorized = useMemo(() => {
    if (!resolvedRequest) return false;
    if (!user) return true; // fallback if session is relaxed
    // Administrative users or owners can view
    if (user.kind === 'ADMINISTRATIVE') return true;
    return (
      resolvedRequest.userId === user.id ||
      resolvedRequest.userEmail === user.email ||
      resolvedRequest.userName === user.name
    );
  }, [resolvedRequest, user]);

  // Resolve corresponding book
  const resolvedBook = useMemo<Book | null>(() => {
    const targetBookId = bookId || resolvedRequest?.bookId || state.book?.id;
    if (targetBookId) {
      const found = MOCK_BOOKS.find((b) => b.id === targetBookId);
      if (found) return found;
    }
    if (state.book) return state.book;
    if (resolvedRequest?.bookTitle) {
      const foundByTitle = MOCK_BOOKS.find((b) => b.title === resolvedRequest.bookTitle);
      if (foundByTitle) return foundByTitle;
    }
    return null;
  }, [bookId, resolvedRequest, state.book]);

  // Focus management for accessibility on mount
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
  }, [resolvedRequest, isAuthorized]);

  // NEUTRAL / NOT FOUND / UNAUTHORIZED STATE
  // Shown when reloading without a persistent request, accessing directly with invalid ID, or unauthorized
  if (!resolvedRequest || !isAuthorized) {
    return (
      <div className="user-request-success-page">
        <main
          className="user-request-success-card user-request-success-card--neutral"
          role="region"
          aria-labelledby="user-request-neutral-heading"
        >
          <div className="user-request-success-icon-neutral" aria-hidden="true">
            <AlertCircle size={32} />
          </div>

          <h1
            id="user-request-neutral-heading"
            ref={headingRef}
            tabIndex={-1}
            className="user-request-success-title"
          >
            No fue posible recuperar la confirmación
          </h1>

          <p className="user-request-success-desc">
            No se encontró un registro activo de la solicitud o no dispones de los permisos
            para consultarla. Puedes revisar el estado en tu lista de solicitudes o continuar
            explorando el catálogo.
          </p>

          <div className="user-request-success-actions">
            <button
              type="button"
              className="user-request-success-btn-secondary"
              onClick={() => navigate('/user/catalog')}
            >
              Volver al catálogo
            </button>
            <button
              type="button"
              className="user-request-success-btn-primary"
              onClick={() => navigate('/user/requests')}
            >
              Ver mis solicitudes
            </button>
          </div>
        </main>
      </div>
    );
  }

  // Display fields derived strictly from data
  const bookTitle = resolvedBook?.title || resolvedRequest.bookTitle || 'el recurso solicitado';
  const folio = resolvedRequest.id;
  const statusLabel =
    resolvedRequest.status === 'PENDING'
      ? 'Pendiente de revisión'
      : resolvedRequest.status === 'APPROVED'
      ? 'Aprobada'
      : resolvedRequest.status === 'REJECTED'
      ? 'Rechazada'
      : resolvedRequest.status;

  const pickupLocation = resolvedRequest.pickupLocation || 'Biblioteca principal';
  const formattedDate = formatSuggestedDate(
    resolvedRequest.suggestedDate || resolvedRequest.requestDate
  );
  const applicantName = resolvedRequest.userName || user?.name || 'Camila Flores';

  return (
    <div className="user-request-success-page">
      <main
        className="user-request-success-card"
        role="region"
        aria-labelledby="user-request-success-heading"
      >
        {/* Success Icon Badge matching reference */}
        <div className="user-request-success-icon-container" aria-hidden="true">
          <Check size={30} strokeWidth={2.8} className="user-request-success-icon-svg" />
        </div>

        {/* Main Heading */}
        <h1
          id="user-request-success-heading"
          ref={headingRef}
          tabIndex={-1}
          className="user-request-success-title"
        >
          Solicitud enviada correctamente
        </h1>

        {/* Subtitle with dynamic book title in bold */}
        <p className="user-request-success-desc">
          Recibimos tu solicitud para <strong>{bookTitle}</strong>. Te notificaremos cuando
          el personal de la biblioteca la revise.
        </p>

        {/* Summary Card with divider and 2x2 grid */}
        <div
          className="user-request-summary-box"
          role="region"
          aria-label="Detalles de la solicitud registrada"
        >
          {/* Top Row: Folio header */}
          <div className="user-request-summary-header">
            <span className="user-request-summary-header-label">Número de solicitud</span>
            <span className="user-request-summary-header-folio">{folio}</span>
          </div>

          <hr className="user-request-summary-divider" aria-hidden="true" />

          {/* 2x2 Grid of details */}
          <div className="user-request-summary-grid">
            <div className="user-request-summary-cell">
              <span className="user-request-summary-cell-label">ESTADO</span>
              <span className="user-request-summary-cell-value">{statusLabel}</span>
            </div>

            <div className="user-request-summary-cell">
              <span className="user-request-summary-cell-label">RECOGIDA</span>
              <span className="user-request-summary-cell-value">{pickupLocation}</span>
            </div>

            <div className="user-request-summary-cell">
              <span className="user-request-summary-cell-label">FECHA SUGERIDA</span>
              <span className="user-request-summary-cell-value">{formattedDate}</span>
            </div>

            <div className="user-request-summary-cell">
              <span className="user-request-summary-cell-label">SOLICITANTE</span>
              <span className="user-request-summary-cell-value">{applicantName}</span>
            </div>
          </div>
        </div>

        {/* Discreet Simulation Notice */}
        <div className="user-request-mock-notice" aria-label="Aviso del entorno de prueba">
          Simulación local • Solicitud registrada en entorno de prueba
        </div>

        {/* Action Buttons: Volver al inicio | Ver mis solicitudes */}
        <div className="user-request-success-actions">
          <Link to="/user/home" className="user-request-success-btn-secondary">
            Volver al inicio
          </Link>

          <Link to="/user/requests" className="user-request-success-btn-primary">
            Ver mis solicitudes
          </Link>
        </div>
      </main>
    </div>
  );
};
