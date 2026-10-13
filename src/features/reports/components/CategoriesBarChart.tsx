import React from 'react';
import type { CategoryLoanMetric } from '../reports.types';

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

              return (
                <div key={cat.category} className="reports-vbar-column">
                  <div
                    className="reports-vbar-pill"
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: cat.color,
                    }}
                    title={`${cat.category}: ${cat.count} préstamos`}
                  />
                </div>
              );
            })}
          </div>

          {/* X Axis Labels */}
          <div className="reports-vbar-x-axis">
            {categories.map((cat) => (
              <span key={cat.category} className="reports-vbar-x-label" title={cat.category}>
                {cat.category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
