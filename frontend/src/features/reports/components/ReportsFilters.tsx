import React, { useState, useRef, useEffect } from 'react';
import { Clock, Filter, Download, ChevronDown, Check } from 'lucide-react';
import type { ReportsFilterState } from '../reports.types';
import { BIBLIOGRAPHIC_CATEGORIES } from '../../../constants';
import { CustomSelect } from '../../../components/ui/CustomSelect';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showDateDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDateDropdown(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowDateDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showDateDropdown]);

  const datePresets = [
    { label: 'Periodo Completo (Todos los registros)', start: '', end: '' },
    { label: 'Noviembre 2026 (Mes actual)', start: '2026-11-01', end: '2026-11-30' },
    { label: 'Octubre 2026 (Mes anterior)', start: '2026-10-01', end: '2026-10-31' },
    { label: 'Últimos 30 días', start: '2026-10-07', end: '2026-11-06' },
    { label: 'Año 2026 completo', start: '2026-01-01', end: '2026-12-31' },
  ];

  return (
    <div className="reports-toolbar-card" role="toolbar" aria-label="Filtros de reportes">
      <div className="reports-toolbar-left">
        {/* Date Range Picker Trigger */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className={`reports-date-picker-btn ${showDateDropdown ? 'reports-date-picker-btn--active' : ''}`}
            aria-label="Seleccionar rango de fechas"
            aria-expanded={showDateDropdown}
            aria-haspopup="menu"
            title="Cambiar periodo de análisis"
          >
            <Clock size={15} color="#6B7280" />
            <span>{filters.dateRange || 'Periodo Completo'}</span>
            <ChevronDown size={14} color="#6B7280" />
          </button>

          {showDateDropdown && (
            <div
              className="reports-date-dropdown-menu"
              role="menu"
              aria-label="Rangos de fecha predefinidos"
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                zIndex: 60,
                minWidth: '290px',
              }}
            >
              {datePresets.map((preset) => {
                const isSelected = filters.startDate === preset.start && filters.endDate === preset.end;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      onFilterChange('dateRange', preset.label.split(' (')[0]);
                      onFilterChange('startDate', preset.start);
                      onFilterChange('endDate', preset.end);
                      setShowDateDropdown(false);
                    }}
                    className={`reports-date-preset-item ${isSelected ? 'reports-date-preset-item--selected' : ''}`}
                  >
                    <span>{preset.label}</span>
                    {isSelected && <Check size={14} color="#2563EB" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Categoría */}
        <CustomSelect
          value={filters.category}
          onChange={(val) => onFilterChange('category', val)}
          options={[
            { value: '', label: 'Todas las categorías' },
            ...BIBLIOGRAPHIC_CATEGORIES.map((cat) => ({
              value: cat.code,
              label: cat.label,
            })),
          ]}
          fullWidth={false}
          aria-label="Filtrar por categoría"
        />

        {/* Usuario */}
        <CustomSelect
          value={filters.userType}
          onChange={(val) => onFilterChange('userType', val)}
          options={[
            { value: '', label: 'Usuario' },
            { value: 'STUDENT', label: 'Alumno' },
            { value: 'TEACHER', label: 'Docente' },
            { value: 'GRADUATE', label: 'Egresado' },
            { value: 'EXTERNAL', label: 'Persona externa' },
          ]}
          fullWidth={false}
          aria-label="Filtrar por tipo de usuario"
        />

        {/* Estado préstamo */}
        <CustomSelect
          value={filters.loanStatus}
          onChange={(val) => onFilterChange('loanStatus', val)}
          options={[
            { value: '', label: 'Estado préstamo' },
            { value: 'ACTIVE', label: 'Activo' },
            { value: 'RETURNED', label: 'Devuelto' },
            { value: 'OVERDUE', label: 'Vencido' },
          ]}
          fullWidth={false}
          aria-label="Filtrar por estado del préstamo"
        />
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
