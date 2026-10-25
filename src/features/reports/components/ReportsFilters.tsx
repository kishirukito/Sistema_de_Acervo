import React, { useState } from 'react';
import { Clock, Filter, Download, ChevronDown } from 'lucide-react';
import type { ReportsFilterState } from '../reports.types';
import { BIBLIOGRAPHIC_CATEGORIES } from '../../../constants';

interface ReportsFiltersProps {
  filters: ReportsFilterState;
  onFilterChange: <K extends keyof ReportsFilterState>(key: K, value: ReportsFilterState[K]) => void;
  onApplyFilters: () => void;
  onExportReport: () => void;
}

export const ReportsFilters: React.FC<ReportsFiltersProps> = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onExportReport,
}) => {
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const datePresets = [
    { label: '01 sep. 2026 — 29 sep. 2026 (Este mes)', start: '2026-09-01', end: '2026-09-29' },
    { label: 'Últimos 7 días', start: '2026-09-23', end: '2026-09-29' },
    { label: 'Últimos 30 días', start: '2026-08-30', end: '2026-09-29' },
    { label: 'Agosto 2026 (Mes anterior)', start: '2026-08-01', end: '2026-08-31' },
    { label: 'Año 2026 completo', start: '2026-01-01', end: '2026-12-31' },
  ];

  return (
    <div className="reports-toolbar-card" role="toolbar" aria-label="Filtros de reportes">
      <div className="reports-toolbar-left">
        {/* Date Range Picker Trigger */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className="reports-date-picker-btn"
            aria-label="Seleccionar rango de fechas"
            title="Cambiar periodo de análisis"
          >
            <Clock size={15} color="#6B7280" />
            <span>{filters.dateRange || '01 sep. 2026  —  29 sep. 2026'}</span>
            <ChevronDown size={14} color="#6B7280" />
          </button>

          {showDateDropdown && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                zIndex: 50,
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                minWidth: '280px',
                padding: '6px 0',
              }}
            >
              {datePresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    onFilterChange('dateRange', '01 sep. 2026  —  29 sep. 2026');
                    onFilterChange('startDate', preset.start);
                    onFilterChange('endDate', preset.end);
                    setShowDateDropdown(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 14px',
                    fontSize: '0.8125rem',
                    color: '#374151',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Categoría */}
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="reports-select"
          aria-label="Filtrar por categoría"
        >
          <option value="">Todas las categorías</option>
          {BIBLIOGRAPHIC_CATEGORIES.map((cat) => (
            <option key={cat.code} value={cat.code}>
              {cat.label}
            </option>
          ))}
        </select>

        {/* Usuario */}
        <select
          value={filters.userType}
          onChange={(e) => onFilterChange('userType', e.target.value)}
          className="reports-select"
          aria-label="Filtrar por tipo de usuario"
        >
          <option value="">Usuario</option>
          <option value="STUDENT">Alumno</option>
          <option value="TEACHER">Docente</option>
          <option value="GRADUATE">Egresado</option>
          <option value="EXTERNAL">Persona externa</option>
        </select>

        {/* Estado préstamo */}
        <select
          value={filters.loanStatus}
          onChange={(e) => onFilterChange('loanStatus', e.target.value)}
          className="reports-select"
          aria-label="Filtrar por estado del préstamo"
        >
          <option value="">Estado préstamo</option>
          <option value="ACTIVE">Activo</option>
          <option value="RETURNED">Devuelto</option>
          <option value="OVERDUE">Vencido</option>
        </select>
      </div>

      <div className="reports-toolbar-right">
        <button
          type="button"
          onClick={onApplyFilters}
          className="reports-btn-primary"
          aria-label="Aplicar filtros de reportes"
        >
          <Filter size={15} />
          <span>Aplicar filtros</span>
        </button>

        <button
          type="button"
          onClick={onExportReport}
          className="reports-btn-outline"
          aria-label="Exportar informe de reporte"
        >
          <Download size={15} />
          <span>Exportar reporte</span>
        </button>
      </div>
    </div>
  );
};
