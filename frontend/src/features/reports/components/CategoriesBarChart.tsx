import React from 'react';
import type { CategoryLoanMetric } from '../reports.types';
import { getCategoryFullLabel } from '../../../constants';

interface CategoriesBarChartProps {
  categories: CategoryLoanMetric[];
}

export const CategoriesBarChart: React.FC<CategoriesBarChartProps> = ({ categories }) => {
  const maxCount = categories && categories.length > 0 ? Math.max(...categories.map((c) => c.count), 0) : 0;
  const maxVal = maxCount > 0 ? Math.max(maxCount, 4) : 4;
  const yTicks = [maxVal, Math.round(maxVal * 0.75), Math.round(maxVal * 0.5), Math.round(maxVal * 0.25), 0];

  return (
    <div className="reports-chart-card">
      <div className="reports-chart-header">
        <h3 className="reports-chart-title">Categorías / Clasificaciones</h3>
        <p className="reports-chart-subtitle">Libros y préstamos por área</p>
      </div>

      <div className="reports-chart-content" style={{ height: '220px' }}>
        {categories.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9CA3AF', fontSize: '0.875rem' }}>
            No hay clasificaciones registradas.
          </div>
        ) : (
          <div className="reports-vbar-container">
            <div className="reports-vbar-chart-area">
              {/* Horizontal dashed grid lines with Y ticks */}
              <div className="reports-vbar-grid-lines">
                {yTicks.map((tick, idx) => (
                  <div key={idx} className="reports-vbar-grid-tick">
                    <span className="reports-vbar-grid-tick-label">{tick}</span>
                  </div>
                ))}
              </div>

              {/* Vertical Bars */}
              {categories.map((cat, idx) => {
                const heightPercent = Math.min((cat.count / maxVal) * 100, 100);
                const fullLabel = getCategoryFullLabel(cat.category) || cat.category;

                return (
                  <div key={idx} className="reports-vbar-column">
                    <div
                      className="reports-vbar-pill"
                      style={{
                        height: `${Math.max(heightPercent, cat.count > 0 ? 8 : 4)}%`,
                        backgroundColor: cat.color || '#2F80ED',
                      }}
                      title={`${fullLabel}: ${cat.count} unidades`}
                    />
                  </div>
                );
              })}
            </div>

            {/* X Axis labels */}
            <div className="reports-vbar-x-axis">
              {categories.map((cat, idx) => {
                const shortLabel = cat.category.length > 12 ? cat.category.slice(0, 10) + '...' : cat.category;
                return (
                  <span key={idx} className="reports-vbar-x-label" title={cat.category}>
                    {shortLabel}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
