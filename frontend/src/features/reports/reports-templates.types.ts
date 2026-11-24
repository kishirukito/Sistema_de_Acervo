export interface ReportCatalogItem {
  id: string;
  code: string;
  title: string;
  badge: string;
  description: string;
  orientation: 'landscape' | 'portrait';
}

export interface ReportKpiItem {
  label: string;
  value: string | number;
  numeric_value: number | null;
  format: 'int' | 'float' | 'currency' | 'percent' | 'text';
  highlight?: boolean;
}

export interface ReportChartSpec {
  id: string;
  type: 'bar' | 'line';
  title: string;
  subtitle: string;
  categories: string[];
  series_name: string;
  values: number[];
  value_format: 'int' | 'float' | 'currency' | 'percent';
}

export interface ReportColumnDef {
  key: string;
  header: string;
  type: 'text' | 'int' | 'float' | 'currency' | 'percent' | 'date';
  width_hint?: number;
  align?: 'left' | 'center' | 'right';
}

export interface ReportFilterApplied {
  label: string;
  value: string;
}

export interface ReportMethodology {
  definitions: string[];
  formulas: string[];
  rules: string[];
  scope: string[];
  limitations: string[];
}

export interface ReportModel {
  id: string;
  code: string;
  title: string;
  badge: string;
  description: string;
  period_label: string;
  start_date: string;
  end_date: string;
  filters_applied: ReportFilterApplied[];
  generated_at: string;
  cutoff_date: string;
  pdf_orientation: 'landscape' | 'portrait';
  kpis: ReportKpiItem[];
  charts: ReportChartSpec[];
  columns: ReportColumnDef[];
  rows: Record<string, any>[];
  total_row?: Record<string, any>;
  recommendations: string[];
  methodology: ReportMethodology;
  default_file_name: string;
}
