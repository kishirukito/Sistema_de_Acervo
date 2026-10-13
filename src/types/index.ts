export type UserKind = 'ADMINISTRATIVE' | 'NORMAL';

export type AdministrativeRole = 'ADMIN' | 'LIBRARIAN';

export type NormalUserCategory = 'TEACHER' | 'STUDENT' | 'EXTERNAL' | 'ROOM' | 'GRADUATE';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface User {
  id: string;
  name: string;
  email: string;
  kind: UserKind;
  role?: AdministrativeRole;
  category?: NormalUserCategory;
  status: UserStatus;
  avatarUrl?: string;
  identifierCode?: string; // Matricula or employee ID
  departmentOrCareer?: string;
  createdAt: string;
}

export type BookStatus = 'AVAILABLE' | 'BORROWED' | 'MAINTENANCE' | 'RESERVED';

export interface Book {
  id: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  publishYear: number;
  category: string;
  totalCopies: number;
  availableCopies: number;
  location: string; // e.g. "Estante A-3, Nivel 2"
  coverUrl?: string;
  description?: string;
}

export type LoanStatus = 'ACTIVE' | 'RETURNED' | 'OVERDUE';

export interface Loan {
  id: string;
  bookId: string;
  bookTitle: string;
  bookIsbn: string;
  userId: string;
  userName: string;
  userEmail: string;
  loanDate: string;
  dueDate: string;
  returnDate?: string;
  status: LoanStatus;
  renewalsCount: number;
  notes?: string;
}

export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';

export interface BorrowRequest {
  id: string;
  bookId: string;
  bookTitle: string;
  userId: string;
  userName: string;
  userEmail: string;
  requestDate: string;
  status: RequestStatus;
  notes?: string;
}

export interface SmartSearchResult {
  answer: string;
  suggestedTerms: string[];
}
