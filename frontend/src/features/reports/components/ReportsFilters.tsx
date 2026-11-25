import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Clock, Filter, ChevronDown, Check, Calendar, RotateCcw } from 'lucide-react';
import type { ReportsFilterState } from '../reports.types';
import { BIBLIOGRAPHIC_CATEGORIES } from '../../../constants';
import { CustomSelect } from '../../../components/ui/CustomSelect';

interface ReportsFiltersProps {
  filters: ReportsFilterState;
  onFilterChange: <K extends keyof ReportsFilterState>(key: K, value: ReportsFilterState[K]) => void;
  onApplyFilters: () => void;
  onExportReport?: () => void;
}

export const ReportsFilters: React.FC<ReportsFiltersProps> = ({
  filters,
  onFilterChange,
  onApplyFilters,
}) => {
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [customStart, setCustomStart] = useState(filters.startDate || '');
  const [customEnd, setCustomEnd] = useState(filters.endDate || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCustomStart(filters.startDate || '');
    setCustomEnd(filters.endDate || '');
  }, [filters.startDate, filters.endDate]);

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

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  // Cuatrimestres universitarios oficiales
  const cuatrimestresPresets = useMemo(() => [
    { label: '1er Cuatrimestre (Enero - Abril)', short: 'Ene - Abr', start: `${currentYear}-01-01`, end: `${currentYear}-04-30` },
    { label: '2do Cuatrimestre (Mayo - Agosto)', short: 'May - Ago', start: `${currentYear}-05-01`, end: `${currentYear}-08-31` },
    { label: '3er Cuatrimestre (Septiembre - Diciembre)', short: 'Sep - Dic', start: `${currentYear}-09-01`, end: `${currentYear}-12-31` },
  ], [currentYear]);

  // Periodos estándar
  const standardPresets = useMemo(() => [
    { label: 'Periodo Completo (Todos los registros)', short: 'Periodo Completo', start: '', end: '' },
    { label: `Mes actual (${currentYear})`, short: 'Mes actual', start: `${currentYear}-11-01`, end: `${currentYear}-11-30` },
    { label: `Año ${currentYear} completo`, short: `Año ${currentYear}`, start: `${currentYear}-01-01`, end: `${currentYear}-12-31` },
  ], [currentYear]);

  const handleSelectPreset = (preset: { label: string; short: string; start: string; end: string }) => {
    onFilterChange('dateRange', preset.short);
    onFilterChange('startDate', preset.start);
    onFilterChange('endDate', preset.end);
    setShowDateDropdown(false);
  };

  const handleApplyCustomDates = () => {
    if (!customStart && !customEnd) {
      onFilterChange('dateRange', 'Periodo Completo');
      onFilterChange('startDate', '');
      onFilterChange('endDate', '');
    } else {
      const label = customStart && customEnd
        ? `${customStart} al ${customEnd}`
        : customStart ? `Desde ${customStart}` : `Hasta ${customEnd}`;
      onFilterChange('dateRange', label);
      onFilterChange('startDate', customStart);
      onFilterChange('endDate', customEnd);
    }
    setShowDateDropdown(false);
  };

  return (
    <div className="reports-toolbar-card" role="toolbar" aria-label="Filtros de reportes">
      <div className="reports-toolbar-left">
        {/* Date Range Picker Trigger */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowDateDropdown(!showDateDropdown)}
            className={`reports-date-picker-btn ${showDateDropdown ? 'reports-date-picker-btn--active' : ''}`}
            aria-label="Seleccionar rango de fechas o cuatrimestre"
            aria-expanded={showDateDropdown}
            aria-haspopup="menu"
            title="Cambiar periodo o cuatrimestre de análisis"
          >
            <Clock size={15} color="#6B7280" />
            <span style={{ maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {filters.dateRange || 'Periodo Completo'}
            </span>
            <ChevronDown size={14} color="#6B7280" />
          </button>

          {showDateDropdown && (
            <div
              className="reports-date-dropdown-menu"
              role="menu"
              aria-label="Rangos de fecha y cuatrimestres"
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                zIndex: 60,
                minWidth: '320px',
                maxWidth: '360px',
                maxHeight: '440px',
                overflowY: 'auto',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.1)',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                padding: '8px',
              }}
            >
              {/* Header Cuatrimestres */}
              <div style={{ padding: '6px 10px 4px', fontSize: '0.6875rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Cuatrimestres Universitarios ({currentYear})
              </div>

              {cuatrimestresPresets.map((preset) => {
                const isSelected = filters.startDate === preset.start && filters.endDate === preset.end;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    role="menuitem"
                    onClick={() => handleSelectPreset(preset)}
                    className={`reports-date-preset-item ${isSelected ? 'reports-date-preset-item--selected' : ''}`}
                    style={{ padding: '7px 10px', fontSize: '0.8125rem' }}
                  >
                    <span>{preset.label}</span>
                    {isSelected && <Check size={14} color="#2563EB" aria-hidden="true" />}
                  </button>
                );
              })}

              {/* Header Periodos estándar */}
              <div style={{ padding: '10px 10px 4px', marginTop: '4px', borderTop: '1px solid #F1F5F9', fontSize: '0.6875rem', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Periodos Generales
              </div>

              {standardPresets.map((preset) => {
                const isSelected = (!filters.startDate && !filters.endDate && !preset.start && !preset.end) ||
                  (filters.startDate === preset.start && filters.endDate === preset.end);
                return (
                  <button
                    key={preset.label}
                    type="button"
                    role="menuitem"
                    onClick={() => handleSelectPreset(preset)}
                    className={`reports-date-preset-item ${isSelected ? 'reports-date-preset-item--selected' : ''}`}
                    style={{ padding: '7px 10px', fontSize: '0.8125rem' }}
                  >
                    <span>{preset.label}</span>
                    {isSelected && <Check size={14} color="#2563EB" aria-hidden="true" />}
                  </button>
                );
              })}

              {/* Selector de fechas personalizadas */}
              <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 4px 6px', fontSize: '0.75rem', fontWeight: 700, color: '#1E293B' }}>
                  <Calendar size={13} color="#2563EB" />
                  <span>Seleccionar fechas personalizadas</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '0 4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <label htmlFor="custom-start-date" style={{ fontSize: '0.75rem', color: '#64748B', minWidth: '40px' }}>
                      Desde:
                    </label>
                    <input
                      id="custom-start-date"
                      type="date"
                      value={customStart}
                      onChange={(e) => setCustomStart(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '4px 8px',
                        fontSize: '0.8125rem',
                        border: '1px solid #CBD5E1',
                        borderRadius: '6px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <label htmlFor="custom-end-date" style={{ fontSize: '0.75rem', color: '#64748B', minWidth: '40px' }}>
                      Hasta:
                    </label>
                    <input
                      id="custom-end-date"
                      type="date"
                      value={customEnd}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '4px 8px',
                        fontSize: '0.8125rem',
                        border: '1px solid #CBD5E1',
                        borderRadius: '6px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomStart('');
                        setCustomEnd('');
                        onFilterChange('dateRange', 'Periodo Completo');
                        onFilterChange('startDate', '');
                        onFilterChange('endDate', '');
                        setShowDateDropdown(false);
                      }}
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#64748B',
                        backgroundColor: '#F1F5F9',
                        border: '1px solid #E2E8F0',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                      }}
                    >
                      <RotateCcw size={12} />
                      <span>Limpiar</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleApplyCustomDates}
                      style={{
                        flex: 2,
                        padding: '6px 10px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        backgroundColor: '#2563EB',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      Aplicar rango
                    </button>
                  </div>
                </div>
              </div>
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
      </div>
    </div>
  );
};
