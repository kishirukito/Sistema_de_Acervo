import React from 'react';
import { BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { ReturnsSummaryData, ReturnFilterStatus } from '../returns.types';

interface ReturnsSummaryProps {
  summary: ReturnsSummaryData;
  activeFilter?: string;
  onSelectFilter?: (status: '' | ReturnFilterStatus) => void;
}

export const ReturnsSummary: React.FC<ReturnsSummaryProps> = ({
  summary,
  activeFilter,
  onSelectFilter,
}) => {
  const handleCardClick = (targetStatus: ReturnFilterStatus) => {
    if (!onSelectFilter) return;
    if (activeFilter === targetStatus) {
      onSelectFilter('');
    } else {
      onSelectFilter(targetStatus);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, targetStatus: ReturnFilterStatus) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(targetStatus);
    }
  };

  return (
    <div className="returns-summary-grid">
      {/* 1. Pendientes de devolución */}
      <div
        className={`returns-summary-card returns-summary-card--interactive ${
          activeFilter === 'ACTIVE' ? 'returns-summary-card--active-selected' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={() => handleCardClick('ACTIVE')}
        onKeyDown={(e) => handleKeyDown(e, 'ACTIVE')}
        title="Clic para filtrar préstamos pendientes de devolución"
        aria-pressed={activeFilter === 'ACTIVE'}
      >
        {activeFilter === 'ACTIVE' && (
          <span className="returns-summary-filter-pill">Filtrado</span>
        )}
        <div className="returns-summary-icon-wrap returns-summary-icon-wrap--active" aria-hidden="true">
          <BookOpen size={20} color="#2F80ED" />
        </div>
        <div className="returns-summary-content">
          <span className="returns-summary-value">{summary.pendingReturnsCount}</span>
          <span className="returns-summary-label">Pendientes de devolución</span>
        </div>
      </div>

      {/* 2. Préstamos vencidos */}
      <div
        className={`returns-summary-card returns-summary-card--interactive ${
          activeFilter === 'OVERDUE' ? 'returns-summary-card--active-selected' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={() => handleCardClick('OVERDUE')}
        onKeyDown={(e) => handleKeyDown(e, 'OVERDUE')}
        title="Clic para filtrar por préstamos vencidos"
        aria-pressed={activeFilter === 'OVERDUE'}
      >
        {activeFilter === 'OVERDUE' && (
          <span className="returns-summary-filter-pill">Filtrado</span>
        )}
        <div className="returns-summary-icon-wrap returns-summary-icon-wrap--danger" aria-hidden="true">
          <AlertTriangle size={20} color="#DC2626" />
        </div>
        <div className="returns-summary-content">
          <span className="returns-summary-value">{summary.overdueCount}</span>
          <span className="returns-summary-label">Préstamos vencidos</span>
        </div>
      </div>

      {/* 3. Devueltos hoy */}
      <div
        className={`returns-summary-card returns-summary-card--interactive ${
          activeFilter === 'RETURNED_TODAY' ? 'returns-summary-card--active-selected' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={() => handleCardClick('RETURNED_TODAY')}
        onKeyDown={(e) => handleKeyDown(e, 'RETURNED_TODAY')}
        title="Clic para filtrar libros devueltos el día de hoy"
        aria-pressed={activeFilter === 'RETURNED_TODAY'}
      >
        {activeFilter === 'RETURNED_TODAY' && (
          <span className="returns-summary-filter-pill">Filtrado</span>
        )}
        <div className="returns-summary-icon-wrap returns-summary-icon-wrap--success" aria-hidden="true">
          <CheckCircle2 size={20} color="#27AE60" />
        </div>
        <div className="returns-summary-content">
          <span className="returns-summary-value">{summary.returnedTodayCount}</span>
          <span className="returns-summary-label">Devueltos hoy</span>
        </div>
      </div>
    </div>
  );
};
