import type { Loan, LoansSummaryData } from './loans.types';

export const MOCK_LOANS_SUMMARY: LoansSummaryData = {
  activeLoansCount: 0,
  activeTrend: '0 préstamos vigentes',
  dueSoonCount: 0,
  dueSoonSubtitle: '0 próximos a vencer',
  overdueCount: 0,
  overdueSubtitle: '0 con retraso',
  returnedThisMonthCount: 0,
  returnedTrend: '0 devueltos',
};

export const MOCK_LOANS: Loan[] = [];
