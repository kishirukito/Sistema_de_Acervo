import React from 'react';
import {
  BarChart3,
  Download,
  BookOpen,
  ClipboardCheck,
  Users,
  RotateCcw,
  FileSpreadsheet,
} from 'lucide-react';
import type { QuickReportItem } from '../reports.types';

export const QUICK_REPORT_TEMPLATES: QuickReportItem[] = [
  {
    id: 'rep-circulacion',
    title: 'Reporte de Préstamos por Carrera',
    iconName: 'BookOpen',
    iconBgColor: '#EFF6FF',
    iconColor: '#2F80ED',
    fileName: 'reporte_prestamos_carreras.csv',
  },
  {
    id: 'rep-sanciones',
    title: 'Reporte Contable de Multas y Sanciones',
    iconName: 'ClipboardCheck',
    iconBgColor: '#FFFBEB',
    iconColor: '#D97706',
    fileName: 'reporte_contable_multas.csv',
  },
  {
    id: 'rep-inventario',
    title: 'Estado Físico de Ejemplares e Inventario',
    iconName: 'Users',
    iconBgColor: '#F0FDF4',
    iconColor: '#27AE60',
    fileName: 'reporte_inventario_ejemplares.csv',
  },
  {
    id: 'rep-acervo',
    title: 'Frecuencia de Consulta del Acervo',
    iconName: 'RotateCcw',
    iconBgColor: '#FAF5FF',
    iconColor: '#8B5CF6',
    fileName: 'reporte_frecuencia_acervo.csv',
  },
];

interface QuickReportsCardProps {
  onDownloadReport: (report: QuickReportItem) => void;
}

export const QuickReportsCard: React.FC<QuickReportsCardProps> = ({ onDownloadReport }) => {
  const renderIcon = (name: string, color: string) => {
    switch (name) {
      case 'BookOpen':
        return <BookOpen size={15} color={color} />;
      case 'ClipboardCheck':
        return <ClipboardCheck size={15} color={color} />;
      case 'Users':
        return <Users size={15} color={color} />;
      case 'RotateCcw':
        return <RotateCcw size={15} color={color} />;
      case 'FileSpreadsheet':
      default:
        return <FileSpreadsheet size={15} color={color} />;
    }
  };

  return (
    <div className="reports-quick-card">
      <div className="reports-quick-header">
        <div className="reports-quick-icon-box" aria-hidden="true">
          <BarChart3 size={18} />
        </div>
        <div>
          <h3 className="reports-quick-title">Reportes rápidos</h3>
          <p className="reports-quick-subtitle">Descarga en un clic</p>
        </div>
      </div>

      <div className="reports-quick-list">
        {QUICK_REPORT_TEMPLATES.map((report) => (
          <div
            key={report.id}
            className="reports-quick-item"
            onClick={() => onDownloadReport(report)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onDownloadReport(report);
              }
            }}
          >
            <div
              className="reports-quick-item-icon"
              style={{ backgroundColor: report.iconBgColor }}
              aria-hidden="true"
            >
              {renderIcon(report.iconName, report.iconColor)}
            </div>

            <span className="reports-quick-item-title">{report.title}</span>

            <div className="reports-quick-download-btn" aria-hidden="true">
              <Download size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
