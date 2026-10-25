import React from 'react';
import type { CategoryLoanMetric } from '../reports.types';
import { getCategoryCode, getCategoryFullLabel } from '../../../constants';

interface CategoriesBarChartProps {
  categories: CategoryLoanMetric[];
}

export const CategoriesBarChart: React.FC<CategoriesBarChartProps> = ({ categories }) => {
  const maxVal = 100;
  const yTicks = [100, 75, 50, 25, 0];

  return (
    <div className="reports-chart-card">
      <div className="reports-chart-header">
        <h3 className="reports-chart-title">Categorías más solicitadas</h3>
        <p className="reports-chart-subtitle">Número de préstamos por categoría</p>
      </div>

      <div className="reports-chart-content" style={{ height: '220px' }}>
        <div className="reports-vbar-container">
          <div className="reports-vbar-chart-area">
            {/* Horizontal dashed grid lines with Y ticks */}
            <div className="reports-vbar-grid-lines">
              {yTicks.map((tick) => (
                <div key={tick} className="reports-vbar-grid-tick">
                  <span className="reports-vbar-grid-tick-label">{tick}</span>
                </div>
              ))}
            </div>

            {/* Vertical Bars */}
            {categories.map((cat) => {
              const heightPercent = Math.min((cat.count / maxVal) * 100, 100);
              const fullLabel = getCategoryFullLabel(cat.category);

              return (
                <div key={cat.category} className="reports-vbar-column">
                  <div
                    className="reports-vbar-pill"
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: cat.color,
                    }}
                    title={`${fullLabel}: ${cat.count} préstamos`}
                  />
                </div>
              );
            })}
          </div>

          {/* X Axis Labels */}
          <div className="reports-vbar-x-axis">
            {categories.map((cat) => {
              const code = getCategoryCode(cat.category) || cat.category;
              const fullLabel = getCategoryFullLabel(cat.category);

              return (
                <span
                  key={cat.category}
                  className="reports-vbar-x-label"
                  title={fullLabel}
                  style={{ fontWeight: 600, color: '#1E293B' }}
                >
                  {code}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Accessible Legend showing full category names without truncation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8, borderTop: '1px solid #F1F5F9', paddingTop: 10 }}>
        {categories.map((cat) => {
          const fullLabel = getCategoryFullLabel(cat.category);

          return (
            <div
              key={cat.category}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                gap: 8,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: cat.color,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    color: '#374151',
                    lineHeight: 1.35,
                    wordBreak: 'normal',
                    overflowWrap: 'break-word',
                  }}
                >
                  {fullLabel}
                </span>
              </div>
              <strong style={{ color: '#111827', flexShrink: 0 }}>{cat.count}</strong>
            </div>
          );
        })}
      </div>
    </div>
  );
};
