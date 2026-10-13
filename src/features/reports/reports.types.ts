export interface ReportSummaryMetrics {
  totalLoans: number;
  totalLoansGrowth: string;
  activeLoans: number;
  returnedLoans: number;
  returnedGrowth: string;
  overdueLoans: number;
  overdueDifference: string;
}

export interface MonthlyLoanTrend {
  month: string;
  shortMonth: string;
  count: number;
}

export interface TopBorrowedBook {
  id: string;
  title: string;
  count: number;
}

export interface LoanStatusDistribution {
  status: 'RETURNED' | 'ACTIVE' | 'OVERDUE';
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface CategoryLoanMetric {
  category: string;
  count: number;
  color: string;
}

export interface OverdueLoanItem {
  id: string;
  folio: string;
  userName: string;
  userInitials: string;
  userAvatarColor: string;
  bookTitle: string;
  dueDate: string;
  daysOverdue: number;
  status: 'OVERDUE';
}

export interface QuickReportItem {
  id: string;
  title: string;
  iconName: string;
  iconBgColor: string;
  iconColor: string;
  fileName: string;
}

export interface ReportsFilterState {
  dateRange: string;
  startDate: string;
  endDate: string;
  category: string;
  userType: string;
  loanStatus: string;
}
