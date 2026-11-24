import React from 'react';
import { BookOpen, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { LoansSummaryData, LoanStatus } from '../loans.types';

interface LoansSummaryProps {
  summary: LoansSummaryData;
  activeFilter?: string;
  onSelectFilter?: (status: '' | LoanStatus) => void;
}

export const LoansSummary: React.FC<LoansSummaryProps> = ({
  summary,
  activeFilter,
  onSelectFilter,
}) => {
  const handleCardClick = (targetStatus: LoanStatus) => {
    if (!onSelectFilter) return;
    if (activeFilter === targetStatus) {
      onSelectFilter('');
    } else {
      onSelectFilter(targetStatus);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, targetStatus: LoanStatus) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(targetStatus);
    }
  };

  return (
    <div className="loans-summary-grid">
      {/* 1. Préstamos activos */}
      <div
        className={`loans-summary-card loans-summary-card--interactive ${
          activeFilter === 'ACTIVE' ? 'loans-summary-card--active-selected' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={() => handleCardClick('ACTIVE')}
        onKeyDown={(e) => handleKeyDown(e, 'ACTIVE')}
        title="Clic para filtrar por préstamos activos"
        aria-pressed={activeFilter === 'ACTIVE'}
      >
        {activeFilter === 'ACTIVE' && (
          <span className="loans-summary-filter-pill">Filtrado</span>
        )}
        <div className="loans-summary-icon-wrap loans-summary-icon-wrap--active" aria-hidden="true">
          <BookOpen size={20} color="#2F80ED" />
        </div>
        <div className="loans-summary-content">
          <span className="loans-summary-value">{summary.activeLoansCount}</span>
          <span className="loans-summary-label">Préstamos activos</span>
          <span className="loans-summary-sub loans-summary-sub--active">
            {summary.activeTrend}
          </span>
        </div>
      </div>

      {/* 2. Próximos a vencer */}
      <div
        className={`loans-summary-card loans-summary-card--interactive ${
          activeFilter === 'DUE_SOON' ? 'loans-summary-card--active-selected' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={() => handleCardClick('DUE_SOON')}
        onKeyDown={(e) => handleKeyDown(e, 'DUE_SOON')}
        title="Clic para filtrar por préstamos próximos a vencer"
        aria-pressed={activeFilter === 'DUE_SOON'}
      >
        {activeFilter === 'DUE_SOON' && (
          <span className="loans-summary-filter-pill">Filtrado</span>
        )}
        <div className="loans-summary-icon-wrap loans-summary-icon-wrap--warning" aria-hidden="true">
          <Clock size={20} color="#D97706" />
        </div>
        <div className="loans-summary-content">
          <span className="loans-summary-value">{summary.dueSoonCount}</span>
          <span className="loans-summary-label">Próximos a vencer</span>
          <span className="loans-summary-sub loans-summary-sub--warning">
            {summary.dueSoonSubtitle}
          </span>
        </div>
      </div>

      {/* 3. Préstamos vencidos */}
      <div
        className={`loans-summary-card loans-summary-card--interactive ${
          activeFilter === 'OVERDUE' ? 'loans-summary-card--active-selected' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={() => handleCardClick('OVERDUE')}
        onKeyDown={(e) => handleKeyDown(e, 'OVERDUE')}
        title="Clic para filtrar por préstamos vencidos"
        aria-pressed={activeFilter === 'OVERDUE'}
      >
        {activeFilter === 'OVERDUE' && (
          <span className="loans-summary-filter-pill">Filtrado</span>
        )}
        <div className="loans-summary-icon-wrap loans-summary-icon-wrap--danger" aria-hidden="true">
          <AlertTriangle size={20} color="#DC2626" />
        </div>
        <div className="loans-summary-content">
          <span className="loans-summary-value">{summary.overdueCount}</span>
          <span className="loans-summary-label">Préstamos vencidos</span>
          <span className="loans-summary-sub loans-summary-sub--danger">
            {summary.overdueSubtitle}
          </span>
        </div>
      </div>

      {/* 4. Devueltos este mes */}
      <div
        className={`loans-summary-card loans-summary-card--interactive ${
          activeFilter === 'RETURNED' ? 'loans-summary-card--active-selected' : ''
        }`}
        role="button"
        tabIndex={0}
        onClick={() => handleCardClick('RETURNED')}
        onKeyDown={(e) => handleKeyDown(e, 'RETURNED')}
        title="Clic para filtrar por préstamos devueltos"
        aria-pressed={activeFilter === 'RETURNED'}
      >
        {activeFilter === 'RETURNED' && (
          <span className="loans-summary-filter-pill">Filtrado</span>
        )}
        <div className="loans-summary-icon-wrap loans-summary-icon-wrap--success" aria-hidden="true">
          <CheckCircle2 size={20} color="#16A34A" />
        </div>
        <div className="loans-summary-content">
          <span className="loans-summary-value">{summary.returnedThisMonthCount}</span>
          <span className="loans-summary-label">Devueltos este mes</span>
          <span className="loans-summary-sub loans-summary-sub--success">
            {summary.returnedTrend}
          </span>
        </div>
      </div>
    </div>
  );
};
