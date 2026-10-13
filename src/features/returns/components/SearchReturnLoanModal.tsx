import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  RotateCcw,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  SearchX,
  ArrowRight,
} from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { ReturnStatusBadge } from './ReturnStatusBadge';
import { MOCK_RESOURCES } from '../../catalog/catalog.mock';
import { MOCK_LOANS } from '../../loans/loans.mock';
import type { ReturnRecord } from '../returns.types';
import './SearchReturnLoanModal.css';

export interface SearchReturnLoanModalProps {
  /** Controls if the search modal is open */
  open: boolean;
  /** Callback triggered when modal requests to close */
  onClose: () => void;
  /** Callback triggered when a pending loan is selected, receiving the loanId to navigate */
  onSelectLoan: (loanId: string) => void;
  /** Available return records list */
  records: ReturnRecord[];
}

export const SearchReturnLoanModal: React.FC<SearchReturnLoanModalProps> = ({
  open,
  onClose,
  onSelectLoan,
  records,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Reset search when modal opens
  useEffect(() => {
    if (open) {
      setSearchQuery('');
    }
  }, [open]);

  // Filter only pending return records (exclude any marked RETURNED)
  const pendingRecords = useMemo(() => {
    return records.filter((r) => r.status !== 'RETURNED');
  }, [records]);

  // Filtered results based on search query
  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return pendingRecords;
    }

    return pendingRecords.filter((record) => {
      const matchesFolio = record.folio.toLowerCase().includes(query);
      const matchesTitle = record.resourceTitle.toLowerCase().includes(query);
      const matchesAuthor = record.resourceAuthor.toLowerCase().includes(query);
      const matchesUser = record.userName.toLowerCase().includes(query);
      const matchesEmail = record.userEmail.toLowerCase().includes(query);
      const matchesIsbn = Boolean(record.isbn && record.isbn.toLowerCase().includes(query));
      const matchesResourceId = record.resourceId.toLowerCase().includes(query);

      // Cross-reference catalog resource code (e.g. LIB-001, LIB-002)
      const matchedRes = MOCK_RESOURCES.find(
        (r) =>
          r.id === record.resourceId ||
          r.id === record.resourceId.replace('-00', '-') ||
          r.id === record.resourceId.replace('-0', '-') ||
          r.title.toLowerCase().trim() === record.resourceTitle.toLowerCase().trim()
      );
      const matchesCode = Boolean(matchedRes?.code && matchedRes.code.toLowerCase().includes(query));

      return (
        matchesFolio ||
        matchesTitle ||
        matchesAuthor ||
        matchesUser ||
        matchesEmail ||
        matchesIsbn ||
        matchesResourceId ||
        matchesCode
      );
    });
  }, [pendingRecords, searchQuery]);

  // Check if search matches an already returned loan from MOCK_LOANS
  const alreadyReturnedMatch = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return null;

    return (
      MOCK_LOANS.find(
        (l) =>
          l.status === 'RETURNED' &&
          (l.folio.toLowerCase().includes(query) ||
            l.resourceTitle.toLowerCase().includes(query) ||
            l.userName.toLowerCase().includes(query))
      ) || null
    );
  }, [searchQuery]);

  const handleSelect = (loanId: string) => {
    onSelectLoan(loanId);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults.length === 1) {
        handleSelect(filteredResults[0].loanId);
      }
    }
  };

  const hasQuery = searchQuery.trim().length > 0;
  const isNoResults = filteredResults.length === 0;

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="medium"
      title="Registrar devolución"
      description="Busca un préstamo pendiente por folio, código del recurso, título o usuario."
      icon={<RotateCcw size={18} />}
      closeButtonAriaLabel="Cerrar búsqueda de préstamos"
      initialFocusRef={searchInputRef}
      footer={
        <div className="search-return-footer">
          <span className="search-return-footer-hint">
            {filteredResults.length} préstamo
            {filteredResults.length === 1 ? '' : 's'} pendiente
            {filteredResults.length === 1 ? '' : 's'} disponible
            {filteredResults.length === 1 ? '' : 's'}
          </span>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            aria-label="Cancelar y cerrar modal de búsqueda"
          >
            Cancelar
          </Button>
        </div>
      }
    >
      <div className="search-return-modal-body">
        {/* Search Input */}
        <div className="search-return-search-wrap">
          <label htmlFor="search-return-input" className="search-return-label">
            Localizar préstamo pendiente
          </label>
          <div className="search-return-input-container">
            <Search size={18} className="search-return-input-icon" aria-hidden="true" />
            <input
              ref={searchInputRef}
              id="search-return-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ingresa folio, código, título o usuario"
              className="search-return-input"
              aria-label="Buscar préstamo pendiente por folio, código, título o usuario"
              autoComplete="off"
            />
            {hasQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="search-return-clear-btn"
                aria-label="Limpiar campo de búsqueda"
                title="Limpiar búsqueda"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Results Header / Guide */}
        <div className="search-return-results-header">
          <span>
            {hasQuery
              ? `Resultados encontrados (${filteredResults.length}):`
              : `Préstamos pendientes para devolución (${pendingRecords.length}):`}
          </span>
        </div>

        {/* Already Returned Notice */}
        {isNoResults && alreadyReturnedMatch && (
          <div className="search-return-returned-banner" role="status">
            <CheckCircle2 size={20} className="search-return-returned-icon" aria-hidden="true" />
            <div className="search-return-returned-info">
              <h4 className="search-return-returned-title">
                Préstamo ya devuelto ({alreadyReturnedMatch.folio})
              </h4>
              <p className="search-return-returned-desc">
                El préstamo de «{alreadyReturnedMatch.resourceTitle}» asignado a {alreadyReturnedMatch.userName} ya fue devuelto y cerrado previamente. No requiere registro de devolución.
              </p>
            </div>
          </div>
        )}

        {/* Empty State when no matches and not already returned */}
        {isNoResults && !alreadyReturnedMatch && (
          <div className="search-return-empty-state" role="region" aria-label="Sin coincidencias">
            <div className="search-return-empty-icon" aria-hidden="true">
              <SearchX size={24} />
            </div>
            <h4 className="search-return-empty-title">
              No encontramos préstamos pendientes
            </h4>
            <p className="search-return-empty-desc">
              Verifica el folio, código del recurso o nombre del usuario.
            </p>
          </div>
        )}

        {/* Results List */}
        {!isNoResults && (
          <div
            className="search-return-results-list"
            role="listbox"
            aria-label="Lista de préstamos pendientes encontrados"
          >
            {filteredResults.map((record) => {
              const isOverdue = record.isOverdue || record.status === 'OVERDUE';
              const isDueSoon = record.status === 'DUE_SOON';

              return (
                <div
                  key={record.id}
                  className="search-return-result-item"
                  role="option"
                  aria-selected="false"
                  tabIndex={0}
                  onClick={() => handleSelect(record.loanId)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(record.loanId);
                    }
                  }}
                  aria-label={`Seleccionar préstamo ${record.folio} de ${record.resourceTitle} para devolución`}
                >
                  <div className="search-return-item-main">
                    <div className="search-return-item-top">
                      <span className="search-return-item-folio">{record.folio}</span>
                      <h4 className="search-return-item-title" title={record.resourceTitle}>
                        {record.resourceTitle}
                      </h4>
                      <ReturnStatusBadge status={record.status} />
                    </div>

                    <span className="search-return-item-author">
                      por {record.resourceAuthor}
                    </span>

                    <div className="search-return-item-bottom">
                      <span className="search-return-item-user">
                        <User size={12} aria-hidden="true" />
                        {record.userName}
                      </span>

                      <span
                        className={`search-return-item-date ${
                          isOverdue
                            ? 'search-return-item-due-overdue'
                            : isDueSoon
                            ? 'search-return-item-due-soon'
                            : ''
                        }`}
                      >
                        {isOverdue ? (
                          <AlertTriangle size={12} aria-hidden="true" />
                        ) : (
                          <Clock size={12} aria-hidden="true" />
                        )}
                        <span>Vence: {record.dueDate} ({record.daysDiffText})</span>
                      </span>
                    </div>
                  </div>

                  <div className="search-return-item-action">
                    <button
                      type="button"
                      className="search-return-select-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(record.loanId);
                      }}
                      aria-label={`Seleccionar préstamo ${record.folio} de ${record.resourceTitle} para devolución`}
                    >
                      <span>Seleccionar</span>
                      <ArrowRight size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};
