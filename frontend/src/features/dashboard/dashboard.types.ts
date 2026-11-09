export interface MetricData {
  id: string;
  title: string;
  value: string | number;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  iconType: 'book' | 'book-open' | 'clipboard' | 'clock';
  accentColor: string;
  badgeBgColor: string;
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
}

export interface MonthlyLoanData {
  month: string;
  loans: number;
}

export interface CategoryConsultData {
  category: string;
  count: number;
}
