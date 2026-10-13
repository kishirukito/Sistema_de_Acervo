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
import { MOCK_QUICK_REPORTS } from '../reports.mock';
import type { QuickReportItem } from '../reports.types';

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
        {MOCK_QUICK_REPORTS.map((report) => (
          <div
            key={report.id}
            onClick={() => onDownloadReport(report)}
            className="reports-quick-item"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onDownloadReport(report);
              }
            }}
            aria-label={`Descargar reporte ${report.title}`}
          >
            <div className="reports-quick-item-left">
              <div
                className="reports-quick-item-icon"
                style={{ backgroundColor: report.iconBgColor }}
                aria-hidden="true"
              >
                {renderIcon(report.iconName, report.iconColor)}
              </div>
              <span className="reports-quick-item-name">{report.title}</span>
            </div>

            <Download size={15} className="reports-quick-item-download" aria-hidden="true" />
          </div>
        ))}
      </div>

      <p className="reports-quick-footer-note">Periodo actual: sep. 2026</p>
    </div>
  );
};
