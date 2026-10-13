import { MOCK_LOANS, MOCK_LOANS_SUMMARY } from './loans.mock';
import { MOCK_RETURN_RECORDS, MOCK_RETURNS_SUMMARY } from '../returns/returns.mock';
import type { Loan, NormalUserCategory } from './loans.types';
import type { ManagedUser } from '../users/users.types';
import type { Resource } from '../catalog/catalog.types';

export const CREATED_LOANS_STORAGE_KEY = 'acervo_created_loans';

export interface CreateLoanParams {
  user: ManagedUser;
  resource: Resource;
  checkoutDateIso: string;
  dueDateIso: string;
  notes?: string;
}

export function getTodayIsoString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const dayStr = String(day).padStart(2, '0');
  const monthNames = [
    'ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.',
    'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.',
  ];
  return `${dayStr} ${monthNames[date.getMonth()]} ${year}`;
}

export function calculateDueNote(checkoutIso: string, dueIso: string): string {
  if (!checkoutIso || !dueIso) return '14d restantes';
  const cDate = new Date(checkoutIso);
  const dDate = new Date(dueIso);
  const diffTime = dDate.getTime() - cDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? `${diffDays}d restantes` : 'Vence hoy';
}

export function getUserInitials(name: string, fallback?: string): string {
  if (fallback) return fallback;
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return 'US';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function getPersistedCreatedLoans(): Record<string, Loan> {
  try {
    const raw = localStorage.getItem(CREATED_LOANS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function persistCreatedLoan(loan: Loan): void {
  try {
    const all = getPersistedCreatedLoans();
    all[loan.id] = loan;
    if (loan.folio) {
      all[loan.folio] = loan;
    }
    localStorage.setItem(CREATED_LOANS_STORAGE_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('Error saving created loan to localStorage:', e);
  }
}

export function getNextLoanFolioAndId(): { folio: string; id: string } {
  const persisted = Object.values(getPersistedCreatedLoans());
  const allKnownLoans = [...MOCK_LOANS, ...persisted];

  const nextNum =
    Math.max(
      ...allKnownLoans.map((l) => {
        const match = l.folio.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      }),
      0
    ) + 1;

  const nextFolio = `PR-${String(nextNum).padStart(3, '0')}`;
  const nextId = `loan-${String(nextNum).padStart(3, '0')}`;
  return { folio: nextFolio, id: nextId };
}

/**
 * Central function to execute the creation of a new loan.
 * Synchronizes:
 * - MOCK_LOANS
 * - MOCK_LOANS_SUMMARY
 * - MOCK_RESOURCES available copies and status
 * - User active loans count
 * - MOCK_RETURN_RECORDS
 * - localStorage persistent state (for reload stability)
 */
export function executeCreateLoan(params: CreateLoanParams): Loan {
  const { user, resource, checkoutDateIso, dueDateIso, notes } = params;
  const { folio, id } = getNextLoanFolioAndId();

  const userCategory =
    user.kind === 'NORMAL' ? (user.category as NormalUserCategory) : 'STUDENT';

  const newLoan: Loan = {
    id,
    folio,
    userId: user.id,
    userName: user.fullName,
    userKind: user.kind,
    userCategory,
    userInitials: user.avatarInitials || getUserInitials(user.fullName),
    userAvatarColor: user.avatarColor || '#1E3A5F',
    resourceId: resource.id,
    resourceTitle: resource.title,
    resourceAuthor: resource.author,
    checkoutDate: formatDisplayDate(checkoutDateIso),
    dueDate: formatDisplayDate(dueDateIso),
    dueDateNote: calculateDueNote(checkoutDateIso, dueDateIso),
    status: 'ACTIVE',
    renewalCount: 0,
    renewalLimit: 2,
    notes: notes?.trim() || undefined,
  };

  // 1. Update resource in mock
  resource.availableCopies = Math.max(0, resource.availableCopies - 1);
  if (resource.availableCopies === 0) {
    resource.status = 'LOANED';
  }

  // 2. Update user active loans in mock
  user.activeLoans = (user.activeLoans || 0) + 1;

  // 3. Synchronize in-memory MOCK_LOANS
  const existingIdx = MOCK_LOANS.findIndex((l) => l.id === newLoan.id || l.folio === newLoan.folio);
  if (existingIdx !== -1) {
    MOCK_LOANS[existingIdx] = newLoan;
  } else {
    MOCK_LOANS.unshift(newLoan);
  }

  // 4. Update loans summary
  MOCK_LOANS_SUMMARY.activeLoansCount += 1;

  // 5. Synchronize in-memory MOCK_RETURN_RECORDS
  const retId = `ret-${newLoan.id.replace('loan-', '')}`;
  const returnIdx = MOCK_RETURN_RECORDS.findIndex((r) => r.loanId === newLoan.id || r.folio === newLoan.folio);
  const returnRecord = {
    id: retId,
    loanId: newLoan.id,
    folio: newLoan.folio,
    userId: newLoan.userId,
    userName: newLoan.userName,
    userEmail: user.email || '',
    userCategory,
    userInitials: newLoan.userInitials,
    userAvatarColor: newLoan.userAvatarColor,
    resourceId: newLoan.resourceId,
    resourceTitle: newLoan.resourceTitle,
    resourceAuthor: newLoan.resourceAuthor,
    isbn: resource.isbn,
    checkoutDate: newLoan.checkoutDate,
    dueDate: newLoan.dueDate,
    isOverdue: false,
    daysDiffText: newLoan.dueDateNote || '14d restantes',
    daysDiffType: 'remaining' as const,
    status: 'ACTIVE' as const,
  };

  if (returnIdx !== -1) {
    MOCK_RETURN_RECORDS[returnIdx] = returnRecord;
  } else {
    MOCK_RETURN_RECORDS.unshift(returnRecord);
    MOCK_RETURNS_SUMMARY.pendingReturnsCount += 1;
  }

  // 6. Persist to localStorage
  persistCreatedLoan(newLoan);

  return newLoan;
}

/**
 * Retrieves a loan by ID or Folio, with localStorage fallback.
 */
export function getLoanData(loanId: string): Loan | null {
  if (!loanId) return null;

  // 1. Search in MOCK_LOANS
  const found = MOCK_LOANS.find(
    (l) => l.id === loanId || l.folio === loanId
  );
  if (found) return found;

  // 2. Search in localStorage
  const persisted = getPersistedCreatedLoans();
  const persistedLoan = persisted[loanId];
  if (persistedLoan) {
    // Synchronize into MOCK_LOANS if missing
    if (!MOCK_LOANS.some((l) => l.id === persistedLoan.id)) {
      MOCK_LOANS.unshift(persistedLoan);
    }
    return persistedLoan;
  }

  return null;
}
