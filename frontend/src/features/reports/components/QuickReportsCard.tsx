import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Calendar,
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Package,
  RotateCcw,
  AlertTriangle,
  Building2,
  BarChart3,
} from 'lucide-react';
import { ALL_QUICK_REPORT_TEMPLATES } from '../reports-templates.data';

interface QuickReportsCardProps {
  onOpenMasterModal: (initialReportId?: string) => void;
}

export const QuickReportsCard: React.FC<QuickReportsCardProps> = ({
  onOpenMasterModal,
}) => {
  const [selectedQuickId, setSelectedQuickId] = useState<string>('rep-carreras');

  return (
    <div className="reports-compact-card">
      {/* Encabezado Compacto */}
      <div className="reports-compact-header">
        <div className="reports-compact-icon" aria-hidden="true">
          <FileSpreadsheet size={18} />
        </div>
        <div className="reports-compact-titles">
          <h3 className="reports-compact-title">Módulo de Reportes y Exportación</h3>
          <p className="reports-compact-subtitle">
            Formatos oficiales ejecutivos (SIABUC / Acreditación) con rango de fechas
          </p>
        </div>
      </div>

      {/* Selector rápido y vista de chips compactos */}
      <div className="reports-compact-body">
        <label className="reports-compact-label" htmlFor="quick-report-select">
          Seleccionar plantilla a generar:
        </label>
        <div className="reports-compact-select-row">
          <select
            id="quick-report-select"
            className="reports-compact-select"
            value={selectedQuickId}
            onChange={(e) => setSelectedQuickId(e.target.value)}
          >
            {ALL_QUICK_REPORT_TEMPLATES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} ({item.badge})
              </option>
            ))}
          </select>
        </div>

        {/* Chips de Categorías Rápidas */}
        <div className="reports-compact-chips-grid">
          <button
            type="button"
            className={`reports-compact-chip ${selectedQuickId === 'rep-carreras' ? 'active' : ''}`}
            onClick={() => { setSelectedQuickId('rep-carreras'); onOpenMasterModal('rep-carreras'); }}
            title="Préstamos por Carrera"
          >
            <BookOpen size={12} />
            <span>Carreras</span>
          </button>
          <button
            type="button"
            className={`reports-compact-chip ${selectedQuickId === 'rep-sanciones' ? 'active' : ''}`}
            onClick={() => { setSelectedQuickId('rep-sanciones'); onOpenMasterModal('rep-sanciones'); }}
            title="Multas y Sanciones"
          >
            <ClipboardCheck size={12} />
            <span>Sanciones</span>
          </button>
          <button
            type="button"
            className={`reports-compact-chip ${selectedQuickId === 'rep-inventario' ? 'active' : ''}`}
            onClick={() => { setSelectedQuickId('rep-inventario'); onOpenMasterModal('rep-inventario'); }}
            title="Control Patrimonial"
          >
            <Package size={12} />
            <span>Inventario</span>
          </button>
          <button
            type="button"
            className={`reports-compact-chip ${selectedQuickId === 'rep-acervo' ? 'active' : ''}`}
            onClick={() => { setSelectedQuickId('rep-acervo'); onOpenMasterModal('rep-acervo'); }}
            title="Rotación de Acervo"
          >
            <RotateCcw size={12} />
            <span>Rotación</span>
          </button>
          <button
            type="button"
            className={`reports-compact-chip ${selectedQuickId === 'rep-morosidad' ? 'active' : ''}`}
            onClick={() => { setSelectedQuickId('rep-morosidad'); onOpenMasterModal('rep-morosidad'); }}
            title="Morosidad y Vencidos"
          >
            <AlertTriangle size={12} />
            <span>Morosidad</span>
          </button>
          <button
            type="button"
            className={`reports-compact-chip ${selectedQuickId === 'rep-convenios' ? 'active' : ''}`}
            onClick={() => { setSelectedQuickId('rep-convenios'); onOpenMasterModal('rep-convenios'); }}
            title="Convenios Interbibliotecarios"
          >
            <Building2 size={12} />
            <span>Convenios</span>
          </button>
          <button
            type="button"
            className={`reports-compact-chip ${selectedQuickId === 'rep-cedula' ? 'active' : ''}`}
            onClick={() => { setSelectedQuickId('rep-cedula'); onOpenMasterModal('rep-cedula'); }}
            title="Cédula Oficial"
          >
            <BarChart3 size={12} />
            <span>Cédula</span>
          </button>
        </div>

        {/* Botón Principal de Apertura */}
        <button
          type="button"
          className="reports-compact-main-btn"
          onClick={() => onOpenMasterModal(selectedQuickId)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={16} />
            <span>Configurar fechas y previsualizar reporte</span>
          </div>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
