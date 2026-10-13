import { MOCK_RETURN_RECORDS, MOCK_RETURNS_SUMMARY } from './returns.mock';
import { MOCK_LOANS, MOCK_LOANS_SUMMARY } from '../loans/loans.mock';
import { MOCK_RESOURCES } from '../catalog/catalog.mock';

export interface ReturnExecutionDetails {
  returnDate: string; // Formatted date string, e.g. "13 oct. 2026"
  notes?: string;
}

export function getTodayIsoString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(isoDateStr: string): string {
  if (!isoDateStr) return '';
  const [year, month, day] = isoDateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const dayStr = String(day).padStart(2, '0');
  const monthNames = [
    'ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.',
    'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.',
  ];
  return `${dayStr} ${monthNames[date.getMonth()]} ${year}`;
}

export function parseDisplayOrIsoDate(dateStr: string): number | null {
  if (!dateStr) return null;
  // Case 1: ISO YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim())) {
    const [y, m, d] = dateStr.trim().split('-').map(Number);
    return new Date(y, m - 1, d).getTime();
  }
  // Case 2: Display format like "25 sep. 2026"
  const monthMap: Record<string, number> = {
    'ene.': 0, 'feb.': 1, 'mar.': 2, 'abr.': 3, 'may.': 4, 'jun.': 5,
    'jul.': 6, 'ago.': 7, 'sep.': 8, 'oct.': 9, 'nov.': 10, 'dic.': 11,
    'ene': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'may': 4, 'jun': 5,
    'jul': 6, 'ago': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11,
  };
  const parts = dateStr.trim().split(' ');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const monthKey = parts[1].toLowerCase();
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && monthMap[monthKey] !== undefined && !isNaN(year)) {
      return new Date(year, monthMap[monthKey], day).getTime();
    }
  }
  return null;
}

/**
 * Executes a loan return in the mock store, synchronizing:
 * - MOCK_RETURN_RECORDS
 * - MOCK_LOANS
 * - MOCK_RESOURCES copies and status
 * - MOCK_RETURNS_SUMMARY metrics
 * - MOCK_LOANS_SUMMARY metrics
 */
export function executeLoanReturn(loanId: string, details: ReturnExecutionDetails): boolean {
  // 1. Locate in return records
  const returnRecord = MOCK_RETURN_RECORDS.find(
    (r) => r.loanId === loanId || r.id === loanId || r.folio === loanId
  );

  // 2. Locate in loans list
  const loan = MOCK_LOANS.find(
    (l) => l.id === loanId || l.folio === loanId || (returnRecord && l.id === returnRecord.loanId)
  );

  if (!returnRecord && !loan) {
    return false;
  }

  const prevStatus = loan?.status || returnRecord?.status;
  const isOverdue = prevStatus === 'OVERDUE' || returnRecord?.isOverdue;

  // 3. Update loan in MOCK_LOANS
  if (loan) {
    loan.status = 'RETURNED';
    loan.returnDate = details.returnDate;
    loan.dueDateNote = '—';
    if (details.notes?.trim()) {
      loan.notes = loan.notes
        ? `${loan.notes} | ${details.notes.trim()}`
        : details.notes.trim();
    }
  }

  // 4. Update record in MOCK_RETURN_RECORDS
  if (returnRecord) {
    returnRecord.status = 'RETURNED';
    returnRecord.returnDate = details.returnDate;
    returnRecord.isOverdue = false;
    returnRecord.daysDiffText = 'Devuelto';
    returnRecord.daysDiffType = 'remaining';
  }

  // 5. Update resource availability in MOCK_RESOURCES
  const resId = loan?.resourceId || returnRecord?.resourceId;
  const resTitle = loan?.resourceTitle || returnRecord?.resourceTitle;
  const matchedResource = MOCK_RESOURCES.find(
    (r) =>
      r.id === resId ||
      r.id === resId?.replace('-00', '-') ||
      r.id === resId?.replace('-0', '-') ||
      (r.title && r.title.toLowerCase().trim() === resTitle?.toLowerCase().trim())
  );
  if (matchedResource) {
    matchedResource.availableCopies = Math.min(
      matchedResource.totalCopies,
      matchedResource.availableCopies + 1
    );
    if (matchedResource.status === 'LOANED' && matchedResource.availableCopies > 0) {
      matchedResource.status =
        matchedResource.availableCopies === matchedResource.totalCopies
          ? 'AVAILABLE'
          : 'LOW_STOCK';
    }
  }

  // 6. Update returns metrics
  MOCK_RETURNS_SUMMARY.pendingReturnsCount = Math.max(
    0,
    MOCK_RETURNS_SUMMARY.pendingReturnsCount - 1
  );
  MOCK_RETURNS_SUMMARY.returnedTodayCount += 1;
  if (isOverdue) {
    MOCK_RETURNS_SUMMARY.overdueCount = Math.max(0, MOCK_RETURNS_SUMMARY.overdueCount - 1);
  }

  // 7. Update loans metrics
  MOCK_LOANS_SUMMARY.activeLoansCount = Math.max(
    0,
    MOCK_LOANS_SUMMARY.activeLoansCount - 1
  );
  MOCK_LOANS_SUMMARY.returnedThisMonthCount += 1;
  if (isOverdue) {
    MOCK_LOANS_SUMMARY.overdueCount = Math.max(0, MOCK_LOANS_SUMMARY.overdueCount - 1);
  } else if (prevStatus === 'DUE_SOON') {
    MOCK_LOANS_SUMMARY.dueSoonCount = Math.max(0, MOCK_LOANS_SUMMARY.dueSoonCount - 1);
  }

  return true;
}
