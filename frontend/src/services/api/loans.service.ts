import { apiClient } from './client';
import type { Loan, LoanStatus } from '../../types';
import { MOCK_LOANS } from '../../mocks/data';

export const loansService = {
  async getAll(): Promise<Loan[]> {
    try {
      const response = await apiClient.get<Loan[]>('/loans');
      return response.data;
    } catch {
      return MOCK_LOANS;
    }
  },

  async getByUser(userId: string): Promise<Loan[]> {
    try {
      const response = await apiClient.get<Loan[]>(`/loans/user/${userId}`);
      return response.data;
    } catch {
      return MOCK_LOANS.filter((l) => l.userId === userId);
    }
  },

  async updateStatus(loanId: string, status: LoanStatus): Promise<Loan> {
    try {
      const response = await apiClient.patch<Loan>(`/loans/${loanId}/status`, { status });
      return response.data;
    } catch {
      const loan = MOCK_LOANS.find((l) => l.id === loanId);
      if (loan) {
        loan.status = status;
        if (status === 'RETURNED') {
          loan.returnDate = new Date().toISOString().split('T')[0];
        }
        return loan;
      }
      throw new Error('Loan not found');
    }
  },
};
