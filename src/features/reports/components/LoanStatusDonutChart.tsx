import React from 'react';
import type { LoanStatusDistribution } from '../reports.types';

interface LoanStatusDonutChartProps {
  data: LoanStatusDistribution[];
  total?: number;
}

export const LoanStatusDonutChart: React.FC<LoanStatusDonutChartProps> = ({ data, total }) => {
  // Compute sum of categories and dynamic percentages
  const sumTotal = data.reduce((acc, curr) => acc + (curr.count || 0), 0);
  const displayTotal = total !== undefined && total > 0 ? total : sumTotal;

  const dataWithStats = data.map((item) => {
    const percentage = displayTotal > 0 ? Math.round((item.count / displayTotal) * 100) : 0;
    return {
      ...item,
      calculatedPercentage: percentage,
    };
  });

  // SVG Donut geometry
  const size = 140;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Gap of ~4px between segments along the circumference for visible white separation
  const gapPx = displayTotal > 0 && dataWithStats.filter((d) => d.count > 0).length > 1 ? 4 : 0;

  // Compute stroke-dasharray and offsets for segments
  let accumulatedLength = 0;
  const segments = dataWithStats.map((item) => {
    if (displayTotal === 0 || item.count <= 0) {
      return {
        ...item,
        strokeDasharray: `0 ${circumference}`,
        strokeDashoffset: 0,
      };
    }
    const arcLength = (item.count / displayTotal) * circumference;
    const visibleLength = Math.max(arcLength - gapPx, 1);
    const strokeDasharray = `${visibleLength} ${circumference - visibleLength}`;
    const strokeDashoffset = -accumulatedLength;
    accumulatedLength += arcLength;

    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="reports-chart-card">
      <div className="reports-chart-header">
        <h3 className="reports-chart-title">Estado de préstamos</h3>
        <p className="reports-chart-subtitle">Distribución del periodo actual</p>
      </div>

      <div className="reports-chart-content">
        <div className="reports-donut-layout">
          {/* Donut SVG */}
          <div className="reports-donut-chart-box">
            <svg
              width={size}
              height={size}
              viewBox={`0 0 ${size} ${size}`}
              aria-label="Gráfica circular de distribución de estados de préstamos"
            >
              {displayTotal === 0 && (
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="#F3F4F6"
                  strokeWidth={strokeWidth}
                />
              )}

              <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
                {segments.map((seg) => (
                  <circle
                    key={seg.status}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={seg.strokeDasharray}
                    strokeDashoffset={seg.strokeDashoffset}
                    strokeLinecap="butt"
                    style={{ transition: 'stroke-dasharray 0.4s ease, stroke-dashoffset 0.4s ease' }}
                  >
                    <title>{`${seg.label}: ${seg.count} (${seg.calculatedPercentage}%)`}</title>
                  </circle>
                ))}
              </g>
            </svg>
          </div>

          {/* Legend and Progress Breakdown */}
          <div className="reports-donut-legend-col">
            {dataWithStats.map((item) => (
              <div key={item.status} className="reports-donut-legend-item">
                <div className="reports-donut-legend-header">
                  <div className="reports-donut-legend-label">
                    <span
                      className="reports-donut-legend-dot"
                      style={{ backgroundColor: item.color }}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </div>
                  <div className="reports-donut-legend-values">
                    <span>{item.count}</span>
                    <span className="reports-donut-legend-percent">({item.calculatedPercentage}%)</span>
                  </div>
                </div>

                <div className="reports-donut-progress-track">
                  <div
                    className="reports-donut-progress-bar"
                    style={{
                      width: `${item.calculatedPercentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}

            <div className="reports-donut-total-row">
              <span className="reports-donut-total-label">Total</span>
              <span className="reports-donut-total-bold">{displayTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

