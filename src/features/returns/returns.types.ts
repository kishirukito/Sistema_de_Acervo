export type LoanStatus = 'ACTIVE' | 'DUE_SOON' | 'OVERDUE' | 'RETURNED';

export type NormalUserCategory =
  | 'TEACHER'
  | 'STUDENT'
  | 'EXTERNAL'
  | 'ROOM'
  | 'GRADUATE';

export interface ReturnRecord {
  id: string;
  loanId: string;
  folio: string;
  userId: string;
  userName: string;
  userEmail: string;
  userCategory: NormalUserCategory;
  userInitials: string;
  userAvatarColor: string;
  resourceId: string;
  resourceTitle: string;
  resourceAuthor: string;
  isbn?: string;
  checkoutDate: string;  // e.g. "25 sep. 2026"
  dueDate: string;       // e.g. "02 oct. 2026"
  isOverdue: boolean;
  daysDiffText: string;  // e.g. "3 días restantes", "7 días de retraso"
  daysDiffType: 'remaining' | 'overdue' | 'due-soon';
  status: LoanStatus;
  returnDate?: string;
}

export interface ReturnsFilterState {
  searchQuery: string;
  status: '' | LoanStatus;
  dueDateFilter: string;
  userCategory: '' | NormalUserCategory;
}

export interface ReturnsSummaryData {
  pendingReturnsCount: number;
  overdueCount: number;
  returnedTodayCount: number;
}
