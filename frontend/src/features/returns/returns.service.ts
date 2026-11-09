import { MOCK_RETURN_RECORDS, MOCK_RETURNS_SUMMARY } from './returns.mock';
import { MOCK_LOANS, MOCK_LOANS_SUMMARY } from '../loans/loans.mock';
import { MOCK_RESOURCES } from '../catalog/catalog.mock';
import type {
  LoanStatus,
  ReturnedLoanPersistedData,
  LoanReturnResolvedData,
} from './returns.types';

export const RETURNED_LOANS_STORAGE_KEY = 'acervo_returned_loans';

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

export function getPersistedReturnedLoans(): Record<string, ReturnedLoanPersistedData> {
  try {
    const raw = localStorage.getItem(RETURNED_LOANS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function persistLoanReturn(data: ReturnedLoanPersistedData): void {
  try {
    const all = getPersistedReturnedLoans();
    all[data.loanId] = data;
    if (data.folio) {
      all[data.folio] = data;
    }
    localStorage.setItem(RETURNED_LOANS_STORAGE_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('Error saving returned loan to localStorage:', e);
  }
}

export function calculateOverdueDays(dueDateStr?: string, returnDateStr?: string): number {
  if (!dueDateStr) return 0;
  const dueTime = parseDisplayOrIsoDate(dueDateStr);
  if (!dueTime) return 0;
  const returnTime = returnDateStr ? parseDisplayOrIsoDate(returnDateStr) : Date.now();
  if (!returnTime) return 0;

  const diffMs = returnTime - dueTime;
  if (diffMs <= 0) return 0;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function formatOverdueDays(days: number): string {
  if (days <= 0) return '0 días';
  return `${days} ${days === 1 ? 'día' : 'días'}`;
}

/**
 * Executes a loan return in the mock store, synchronizing:
 * - MOCK_RETURN_RECORDS
 * - MOCK_LOANS
 * - MOCK_RESOURCES copies and status
 * - MOCK_RETURNS_SUMMARY metrics
 * - MOCK_LOANS_SUMMARY metrics
 * - localStorage persistent state (for reload stability)
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

  // 8. Persist to localStorage for page-reload support
  const targetId = loan?.id || returnRecord?.loanId || loanId;
  const folio = loan?.folio || returnRecord?.folio || loanId;
  persistLoanReturn({
    loanId: targetId,
    folio,
    returnDate: details.returnDate,
    notes: details.notes,
    returnedAt: new Date().toISOString(),
  });

  return true;
}

/**
 * Retrieves comprehensive data for a loan return, synthesizing memory state
 * and localStorage fallbacks so page reloads accurately display the return outcome.
 */
export function getLoanReturnData(loanId: string): LoanReturnResolvedData | null {
  if (!loanId) return null;

  // Check persistent storage
  const persistedMap = getPersistedReturnedLoans();
  const persisted = persistedMap[loanId];

  // Search in return records
  const returnRecord = MOCK_RETURN_RECORDS.find(
    (r) => r.loanId === loanId || r.id === loanId || r.folio === loanId
  );

  // Search in loans
  const loan = MOCK_LOANS.find(
    (l) => l.id === loanId || l.folio === loanId || (returnRecord && l.id === returnRecord.loanId)
  );

  if (!returnRecord && !loan && !persisted) {
    return null;
  }

  // Determine return status and return date
  const isPersistedReturned = Boolean(persisted);
  const status: LoanStatus = isPersistedReturned
    ? 'RETURNED'
    : (loan?.status || returnRecord?.status || 'ACTIVE');

  const returnDate =
    persisted?.returnDate ||
    loan?.returnDate ||
    returnRecord?.returnDate ||
    (status === 'RETURNED' ? formatDisplayDate(getTodayIsoString()) : '');

  // Synchronize memory records if persisted as RETURNED
  if (isPersistedReturned) {
    if (loan && loan.status !== 'RETURNED') {
      loan.status = 'RETURNED';
      loan.returnDate = returnDate;
    }
    if (returnRecord && returnRecord.status !== 'RETURNED') {
      returnRecord.status = 'RETURNED';
      returnRecord.returnDate = returnDate;
    }
  }

  const folio = returnRecord?.folio || loan?.folio || persisted?.folio || loanId;
  const userId = returnRecord?.userId || loan?.userId || '';
  const userName = returnRecord?.userName || loan?.userName || 'Usuario';
  const userEmail = returnRecord?.userEmail || '';
  const userCategory = returnRecord?.userCategory || loan?.userCategory || 'STUDENT';
  const userInitials =
    returnRecord?.userInitials ||
    loan?.userInitials ||
    (userName ? userName.slice(0, 2).toUpperCase() : 'U');
  const userAvatarColor =
    returnRecord?.userAvatarColor || loan?.userAvatarColor || '#1E3A5F';

  const resourceId = returnRecord?.resourceId || loan?.resourceId || '';
  const resourceTitle = returnRecord?.resourceTitle || loan?.resourceTitle || 'Recurso';
  const resourceAuthor = returnRecord?.resourceAuthor || loan?.resourceAuthor || '';
  const isbn = returnRecord?.isbn;
  const checkoutDate = returnRecord?.checkoutDate || loan?.checkoutDate || '';
  const dueDate = returnRecord?.dueDate || loan?.dueDate || '';

  const overdueDays = calculateOverdueDays(dueDate, returnDate);
  const overdueDaysText = formatOverdueDays(overdueDays);
  const isOverdue = overdueDays > 0;
  const notes = persisted?.notes || loan?.notes;

  return {
    loanId: returnRecord?.loanId || loan?.id || persisted?.loanId || loanId,
    folio,
    status,
    userId,
    userName,
    userEmail,
    userCategory,
    userInitials,
    userAvatarColor,
    resourceId,
    resourceTitle,
    resourceAuthor,
    isbn,
    checkoutDate,
    dueDate,
    returnDate,
    isOverdue,
    overdueDays,
    overdueDaysText,
    notes,
  };
}
