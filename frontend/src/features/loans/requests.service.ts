import type { BorrowRequest } from '../../types';
import { MOCK_REQUESTS } from '../../mocks/data';

export const USER_REQUESTS_STORAGE_KEY = 'acervo_user_requests';

export interface CreateBorrowRequestParams {
  bookId: string;
  bookTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  pickupLocation: string;
  suggestedDate: string;
  notes?: string;
}

/**
 * Retrieves persisted user borrow requests from localStorage.
 */
export function getPersistedBorrowRequests(): BorrowRequest[] {
  try {
    const raw = localStorage.getItem(USER_REQUESTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading borrow requests from localStorage:', err);
    return [];
  }
}

/**
 * Persists a new borrow request to localStorage and updates in-memory MOCK_REQUESTS.
 */
export function persistBorrowRequest(request: BorrowRequest): void {
  try {
    const existing = getPersistedBorrowRequests();
    const updated = [request, ...existing.filter((r: any) => r.id !== request.id)];
    localStorage.setItem(USER_REQUESTS_STORAGE_KEY, JSON.stringify(updated));

    // Also update in-memory MOCK_REQUESTS if not already present
    const existsInMock = MOCK_REQUESTS.some((r: any) => r.id === request.id);
    if (!existsInMock) {
      MOCK_REQUESTS.unshift(request);
    }
  } catch (err) {
    console.error('Error saving borrow request to localStorage:', err);
  }
}

/**
 * Initializes and synchronizes MOCK_REQUESTS with any persisted requests.
 */
export function initializeBorrowRequests(): void {
  const persisted = getPersistedBorrowRequests();
  persisted.forEach((req) => {
    if (!MOCK_REQUESTS.some((r: any) => r.id === req.id)) {
      MOCK_REQUESTS.unshift(req);
    }
  });
}

// Automatically sync on module evaluation
initializeBorrowRequests();

/**
 * Generates the next sequential request folio (e.g. "SOL-2026-0148").
 */
export function getNextRequestFolio(): string {
  const all = [...MOCK_REQUESTS, ...getPersistedBorrowRequests()];
  const numbers = all
    .map((r) => {
      const match = r.id.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    })
    .filter(Boolean);

  const maxNum = numbers.length > 0 ? Math.max(...numbers) : 147;
  const nextNum = maxNum + 1;
  return `SOL-2026-${String(nextNum).padStart(4, '0')}`;
}

/**
 * Retrieves a borrow request by its identifier from persisted or mock requests.
 */
export function getBorrowRequestById(id: string): BorrowRequest | undefined {
  if (!id) return undefined;
  const all = [...getPersistedBorrowRequests(), ...MOCK_REQUESTS];
  return all.find((r) => r.id.toLowerCase() === id.toLowerCase());
}

/**
 * Formats a Date object or YYYY-MM-DD string to Spanish display: e.g. "06 oct. 2026"
 */
export function formatSuggestedDate(dateInput: Date | string): string {
  let date: Date;
  if (typeof dateInput === 'string') {
    if (dateInput.includes('-')) {
      const [year, month, day] = dateInput.split('-').map(Number);
      date = new Date(year, month - 1, day);
    } else {
      date = new Date(dateInput);
    }
  } else {
    date = dateInput;
  }

  if (isNaN(date.getTime())) {
    date = new Date();
  }

  const dayStr = String(date.getDate()).padStart(2, '0');
  const monthNames = [
    'ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.',
    'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.',
  ];
  const monthStr = monthNames[date.getMonth()];
  const yearStr = date.getFullYear();

  return `${dayStr} ${monthStr} ${yearStr}`;
}

/**
 * Creates and registers a new BorrowRequest with PENDING status.
 * NOTE: This does NOT approve the loan, mark copies as borrowed, or reduce stock.
 */
export function createBorrowRequest(params: CreateBorrowRequestParams): BorrowRequest {
  const id = getNextRequestFolio();
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const requestDate = `${yyyy}-${mm}-${dd}`;

  const newRequest: BorrowRequest = {
    id,
    bookId: params.bookId,
    bookTitle: params.bookTitle,
    userId: params.userId,
    userName: params.userName,
    userEmail: params.userEmail,
    requestDate,
    status: 'PENDING',
    notes: params.notes?.trim() || undefined,
    pickupLocation: params.pickupLocation,
    suggestedDate: params.suggestedDate,
  };

  persistBorrowRequest(newRequest);
  return newRequest;
}

/**
 * Retrieves all borrow requests belonging to a specific user (by id or email).
 * Merges localStorage-persisted items and in-memory MOCK_REQUESTS, deduplicating by ID.
 */
export function getUserBorrowRequests(
  user?: { id?: string; email?: string } | null
): BorrowRequest[] {
  if (!user) return [];
  const persisted = getPersistedBorrowRequests();
  const all = [...persisted, ...MOCK_REQUESTS];
  const map = new Map<string, BorrowRequest>();

  all.forEach((req) => {
    if (!map.has(req.id)) {
      map.set(req.id, req);
    }
  });

  return Array.from(map.values()).filter((req) => {
    const matchId = user.id && req.userId === user.id;
    const matchEmail = user.email && req.userEmail?.toLowerCase() === user.email.toLowerCase();
    return Boolean(matchId || matchEmail);
  });
}

/**
 * Cancels a pending borrow request on behalf of the authorized user.
 * Only requests in 'PENDING' state can be cancelled.
 */
export function cancelBorrowRequest(
  requestId: string,
  user?: { id?: string; email?: string } | null
): BorrowRequest | null {
  if (!requestId || !user) return null;

  const target = getBorrowRequestById(requestId);
  if (!target) return null;

  // Authorization check
  const isOwner =
    (user.id && target.userId === user.id) ||
    (user.email && target.userEmail?.toLowerCase() === user.email.toLowerCase());

  if (!isOwner) {
    console.error('Unauthorized attempt to cancel request:', requestId);
    return null;
  }

  // Only PENDING requests can be cancelled
  if (target.status !== 'PENDING') {
    console.warn(`Request ${requestId} cannot be cancelled because its status is ${target.status}`);
    return null;
  }

  const updated: BorrowRequest = {
    ...target,
    status: 'CANCELLED',
    notes: 'Cancelada por el usuario',
  };

  persistBorrowRequest(updated);
  return updated;
}
