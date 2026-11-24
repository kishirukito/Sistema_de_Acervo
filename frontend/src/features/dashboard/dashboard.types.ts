export interface MetricData {
  id: string;
  title: string;
  value: string | number;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  iconType: 'book' | 'book-open' | 'clipboard' | 'clock' | 'inbox';
  accentColor: string;
  badgeBgColor: string;
  navigateTo?: string;
}

export interface QuickActionItem {
  id: string;
  label: string;
  actionKey: string;
  isHighlight?: boolean;
}

export type ActivityStatus = 'Activo' | 'Devuelto' | 'Vencido' | 'Pendiente';

export interface RecentActivityItem {
  id: string;
  type: string;
  user: string;
  resource: string;
  date: string;
  status: ActivityStatus;
}

export type AlertType = 'error' | 'warning' | 'success';

export interface DashboardAlert {
  id: string;
  title: string;
  text: string;
  type: AlertType;
  actionUrl?: string;
  actionText?: string;
}

export interface MonthlyLoanData {
  month: string;
  loans: number;
}

export interface CategoryConsultData {
  category: string;
  count: number;
}

export type UserTypeId = 'STUDENT' | 'TEACHER' | 'ADMINISTRATIVE' | 'GRADUATE' | 'EXTERNAL';

export interface ActiveUserTypeData {
  id: UserTypeId;
  label: string;
  count: number;
  percentage: number;
  color: string;
  bgLight: string;
}
