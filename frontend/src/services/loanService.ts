import { api } from './api';
import { Loan } from '../types';

export const loanService = {
  async getLoans(estado?: string): Promise<Loan[]> {
    const params = estado ? { estado } : {};
    const { data } = await api.get<Loan[]>('/loans', { params });
    return data;
  },

  async createLoan(libro_id: string, usuario_id: string, dias_prestamo: number = 7): Promise<Loan> {
    const { data } = await api.post<Loan>('/loans', { libro_id, usuario_id, dias_prestamo });
    return data;
  },

  async returnLoan(loan_id: string, observaciones?: string): Promise<Loan> {
    const { data } = await api.post<Loan>(`/loans/${loan_id}/return`, { observaciones });
    return data;
  }
};
