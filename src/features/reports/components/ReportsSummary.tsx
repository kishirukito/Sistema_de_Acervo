import React from 'react';
import { FileText, BookOpen, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { ReportSummaryMetrics } from '../reports.types';

interface ReportsSummaryProps {
  metrics: ReportSummaryMetrics;
}

export const ReportsSummary: React.FC<ReportsSummaryProps> = ({ metrics }) => {
  return (
    <div className="reports-summary-grid">
      {/* 1. TOTAL DE PRÉSTAMOS */}
      <div className="reports-summary-card">
        <div className="reports-summary-info">
          <span className="reports-summary-label">Total de préstamos</span>
          <div className="reports-summary-value">{metrics.totalLoans}</div>
          <span className="reports-summary-growth reports-summary-growth--blue">
            {metrics.totalLoansGrowth}
          </span>
        </div>
        <div
          className="reports-summary-icon-box"
          style={{ backgroundColor: '#EFF6FF', color: '#2F80ED' }}
          aria-hidden="true"
        >
          <FileText size={20} />
        </div>
      </div>

      {/* 2. PRÉSTAMOS ACTIVOS */}
      <div className="reports-summary-card">
        <div className="reports-summary-info">
          <span className="reports-summary-label">Préstamos activos</span>
          <div className="reports-summary-value">{metrics.activeLoans}</div>
        </div>
        <div
          className="reports-summary-icon-box"
          style={{ backgroundColor: '#EFF6FF', color: '#2F80ED' }}
          aria-hidden="true"
        >
          <BookOpen size={20} />
        </div>
      </div>

      {/* 3. DEVUELTOS */}
      <div className="reports-summary-card">
        <div className="reports-summary-info">
          <span className="reports-summary-label">Devueltos</span>
          <div className="reports-summary-value">{metrics.returnedLoans}</div>
          <span className="reports-summary-growth reports-summary-growth--green">
            {metrics.returnedGrowth}
          </span>
        </div>
        <div
          className="reports-summary-icon-box"
          style={{ backgroundColor: '#DCFCE7', color: '#16A34A' }}
          aria-hidden="true"
        >
          <CheckCircle2 size={20} />
        </div>
      </div>

      {/* 4. VENCIDOS */}
      <div className="reports-summary-card">
        <div className="reports-summary-info">
          <span className="reports-summary-label">Vencidos</span>
          <div className="reports-summary-value">{metrics.overdueLoans}</div>
          <span className="reports-summary-growth reports-summary-growth--red">
            {metrics.overdueDifference}
          </span>
        </div>
        <div
          className="reports-summary-icon-box"
          style={{ backgroundColor: '#FEE2E2', color: '#DC2626' }}
          aria-hidden="true"
        >
          <AlertTriangle size={20} />
        </div>
      </div>
    </div>
  );
};
