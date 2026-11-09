import React from 'react';
import { BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { ReturnsSummaryData } from '../returns.types';

interface ReturnsSummaryProps {
  summary: ReturnsSummaryData;
}

export const ReturnsSummary: React.FC<ReturnsSummaryProps> = ({ summary }) => {
  return (
    <div className="returns-summary-grid">
      {/* 1. Pendientes de devolución */}
      <div className="returns-summary-card">
        <div className="returns-summary-icon-wrap returns-summary-icon-wrap--active" aria-hidden="true">
          <BookOpen size={20} color="#2F80ED" />
        </div>
        <div className="returns-summary-content">
          <span className="returns-summary-value">{summary.pendingReturnsCount}</span>
          <span className="returns-summary-label">Pendientes de devolución</span>
        </div>
      </div>

      {/* 2. Préstamos vencidos */}
      <div className="returns-summary-card">
        <div className="returns-summary-icon-wrap returns-summary-icon-wrap--danger" aria-hidden="true">
          <AlertTriangle size={20} color="#DC2626" />
        </div>
        <div className="returns-summary-content">
          <span className="returns-summary-value">{summary.overdueCount}</span>
          <span className="returns-summary-label">Préstamos vencidos</span>
        </div>
      </div>

      {/* 3. Devueltos hoy */}
      <div className="returns-summary-card">
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
