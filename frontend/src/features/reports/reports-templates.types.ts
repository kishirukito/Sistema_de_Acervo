export interface ReportKpiItem {
  label: string;
  value: string | number;
  highlight?: boolean;
}

export interface ReportChartSeries {
  label: string;
  value: number;
  color?: string;
  sublabel?: string;
}

export interface ReportColumnDef {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
  minWidth?: string;
  badge?: (val: any) => { text: string; bg: string; color: string } | null;
}

export interface ReportTemplateData {
  id: string;
  code: string;
  title: string;
  categoryBadge: string;
  periodLabel: string;
  description: string;
  kpis: ReportKpiItem[];
  trendChartTitle: string;
  trendChartSubtitle: string;
  trendSeries: ReportChartSeries[];
  rankingChartTitle: string;
  rankingChartSubtitle: string;
  rankingSeries: ReportChartSeries[];
  columns: ReportColumnDef[];
  rows: Record<string, any>[];
  totalSummaryRow?: Record<string, any>;
  defaultFileName: string;
}
