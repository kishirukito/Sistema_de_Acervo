import React from 'react';
import { BookOpen, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { LoansSummaryData } from '../loans.types';

interface LoansSummaryProps {
  summary: LoansSummaryData;
}

export const LoansSummary: React.FC<LoansSummaryProps> = ({ summary }) => {
  return (
    <div className="loans-summary-grid">
      {/* 1. Préstamos activos */}
      <div className="loans-summary-card">
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
      <div className="loans-summary-card">
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
      <div className="loans-summary-card">
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
      <div className="loans-summary-card">
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
