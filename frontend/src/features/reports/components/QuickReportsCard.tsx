import React from 'react';
import { FileSpreadsheet, ArrowRight, Calendar } from 'lucide-react';

interface QuickReportsCardProps {
  onOpenMasterModal: (initialReportId?: string) => void;
}

export const QuickReportsCard: React.FC<QuickReportsCardProps> = ({
  onOpenMasterModal,
}) => {
  return (
    <div
      className="reports-compact-card"
      onClick={() => onOpenMasterModal('rep-carreras')}
      role="button"
      tabIndex={0}
      aria-label="Abrir generador de reportes y exportación"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenMasterModal('rep-carreras');
        }
      }}
    >
      <div className="reports-compact-header">
        <div className="reports-compact-icon" aria-hidden="true">
          <FileSpreadsheet size={18} />
        </div>
        <div className="reports-compact-titles">
          <h3 className="reports-compact-title">Reportes y Exportación</h3>
          <p className="reports-compact-subtitle">
            Informes ejecutivos en Excel (.xlsx) y PDF por rango de fechas
          </p>
        </div>
      </div>

      <button
        type="button"
        className="reports-compact-main-btn"
        onClick={(e) => {
          e.stopPropagation();
          onOpenMasterModal('rep-carreras');
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={15} />
          <span>Generar y previsualizar reporte</span>
        </span>
        <ArrowRight size={15} />
      </button>
    </div>
  );
};
