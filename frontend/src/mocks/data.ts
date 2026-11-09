import type { User, Book, Loan, BorrowRequest } from '../types';

export const MOCK_ADMIN_USER: User = {
  id: 'usr-admin-01',
  name: 'Administrador CIU',
  email: 'admin@upd.edu.mx',
  kind: 'ADMINISTRATIVE',
  role: 'ADMIN',
  status: 'ACTIVE',
  identifierCode: 'ADM-2024-001',
  departmentOrCareer: 'Dirección de Biblioteca',
  createdAt: '2024-01-15T08:00:00Z',
};

export const MOCK_STUDENT_USER: User = {
  id: 'usr-std-02',
  name: 'Alumno Prueba',
  email: 'alumno.prueba@upd.edu.mx',
  kind: 'NORMAL',
  category: 'STUDENT',
  status: 'ACTIVE',
  identifierCode: '2024-TI-001',
  departmentOrCareer: 'Ingeniería en Sistemas',
  createdAt: '2024-09-01T10:30:00Z',
};

export const MOCK_USERS: User[] = [MOCK_ADMIN_USER, MOCK_STUDENT_USER];

export const MOCK_BOOKS: Book[] = [];

export const MOCK_LOANS: Loan[] = [];

export const MOCK_BORROW_REQUESTS: BorrowRequest[] = [];

export const MOCK_REQUESTS: BorrowRequest[] = [];
