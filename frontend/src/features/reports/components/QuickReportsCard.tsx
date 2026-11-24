import React from 'react';
import {
  BarChart3,
  Download,
  BookOpen,
  ClipboardCheck,
  Package,
  RotateCcw,
  AlertTriangle,
  Building2,
  FileSpreadsheet,
  Eye,
} from 'lucide-react';
import type { QuickReportItem } from '../reports.types';
import { ALL_QUICK_REPORT_TEMPLATES } from '../reports-templates.data';

interface QuickReportsCardProps {
  onDownloadReport: (report: QuickReportItem) => void;
  onViewTemplate?: (report: QuickReportItem) => void;
}

export const QuickReportsCard: React.FC<QuickReportsCardProps> = ({
  onDownloadReport,
  onViewTemplate,
}) => {
  const renderIcon = (name: string, color: string) => {
    switch (name) {
      case 'BookOpen':
        return <BookOpen size={16} color={color} />;
      case 'ClipboardCheck':
        return <ClipboardCheck size={16} color={color} />;
      case 'Package':
        return <Package size={16} color={color} />;
      case 'RotateCcw':
        return <RotateCcw size={16} color={color} />;
      case 'AlertTriangle':
        return <AlertTriangle size={16} color={color} />;
      case 'Building2':
        return <Building2 size={16} color={color} />;
      case 'BarChart3':
        return <BarChart3 size={16} color={color} />;
      default:
        return <FileSpreadsheet size={16} color={color} />;
    }
  };

  return (
    <div className="reports-quick-card">
      <div className="reports-quick-header">
        <div className="reports-quick-icon-box" aria-hidden="true">
          <BarChart3 size={18} />
        </div>
        <div>
          <h3 className="reports-quick-title">Reportes Rápidos y Plantillas Oficiales</h3>
          <p className="reports-quick-subtitle">
            Formatos ejecutivos estandarizados (SIABUC / Acreditación) con descarga en un clic
          </p>
        </div>
      </div>

      <div className="reports-quick-list">
        {ALL_QUICK_REPORT_TEMPLATES.map((report) => (
          <div
            key={report.id}
            className="reports-quick-item"
            onClick={() => onViewTemplate && onViewTemplate(report)}
            role="button"
            tabIndex={0}
            title={`Ver plantilla ejecutiva de ${report.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onViewTemplate && onViewTemplate(report);
              }
            }}
          >
            <div className="reports-quick-item-left">
              <div
                className="reports-quick-item-icon"
                style={{ backgroundColor: report.iconBgColor }}
                aria-hidden="true"
              >
                {renderIcon(report.iconName, report.iconColor)}
              </div>

              <div className="reports-quick-item-text-group">
                <div className="reports-quick-item-title-row">
                  <span className="reports-quick-item-name">{report.title}</span>
                  <span className="reports-quick-item-badge">{report.badge}</span>
                </div>
                <p className="reports-quick-item-desc">{report.description}</p>
              </div>
            </div>

            <div className="reports-quick-item-actions">
              <button
                type="button"
                className="reports-quick-btn-view"
                title="Abrir plantilla interactiva"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewTemplate && onViewTemplate(report);
                }}
              >
                <Eye size={14} />
                <span>Ver plantilla</span>
              </button>

              <button
                type="button"
                className="reports-quick-btn-download"
                title="Descargar archivo CSV / Excel enriquecido"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownloadReport(report);
                }}
              >
                <Download size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
