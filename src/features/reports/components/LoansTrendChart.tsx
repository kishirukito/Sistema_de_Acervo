import React, { useState } from 'react';
import type { MonthlyLoanTrend } from '../reports.types';

interface LoansTrendChartProps {
  data: MonthlyLoanTrend[];
}

export const LoansTrendChart: React.FC<LoansTrendChartProps> = ({ data }) => {
  const [hoveredPoint, setHoveredPoint] = useState<{ index: number; x: number; y: number } | null>(
    null
  );

  // SVG Chart Dimensions
  const width = 500;
  const height = 180;
  const paddingLeft = 35;
  const paddingRight = 20;
  const paddingTop = 15;
  const paddingBottom = 25;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const maxVal = 100;

  // Calculate coordinates for each data point
  const points = data.map((d, index) => {
    const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (d.count / maxVal) * chartHeight;
    return { x, y, ...d };
  });

  // Build a smooth cubic bezier SVG path
  const buildSmoothPath = () => {
    if (points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const linePath = buildSmoothPath();
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    paddingTop + chartHeight
  } L ${points[0].x} ${paddingTop + chartHeight} Z`;

  // Y-axis ticks
  const yTicks = [100, 75, 50, 25, 0];

  return (
    <div className="reports-chart-card">
      <div className="reports-chart-header">
        <h3 className="reports-chart-title">Préstamos por mes</h3>
        <p className="reports-chart-subtitle">Abril – Septiembre 2026</p>
      </div>

      <div className="reports-chart-content">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="reports-line-chart-svg"
          aria-label="Gráfica de préstamos por mes"
        >
          <defs>
            <linearGradient id="blueGradientArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2F80ED" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#2F80ED" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines and Y-axis labels */}
          {yTicks.map((tick) => {
            const y = paddingTop + chartHeight - (tick / maxVal) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  className="reports-chart-grid-line"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  className="reports-chart-axis-text"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Area gradient under curve */}
          <path d={areaPath} className="reports-chart-area" />

          {/* Curved Line */}
          <path d={linePath} className="reports-chart-line" />

          {/* Data Points and X-axis labels */}
          {points.map((p, index) => (
            <g key={p.shortMonth}>
              <text
                x={p.x}
                y={height - 6}
                textAnchor="middle"
                className="reports-chart-axis-text"
              >
                {p.shortMonth}
              </text>

              <circle
                cx={p.x}
                cy={p.y}
                r={4}
                className="reports-chart-point"
                onMouseEnter={() => setHoveredPoint({ index, x: p.x, y: p.y })}
                onMouseLeave={() => setHoveredPoint(null)}
                aria-label={`${p.month}: ${p.count} préstamos`}
              />
            </g>
          ))}

          {/* Tooltip on hover */}
          {hoveredPoint !== null && (
            <g transform={`translate(${hoveredPoint.x}, ${hoveredPoint.y - 12})`}>
              <rect
                x="-30"
                y="-24"
                width="60"
                height="22"
                rx="4"
                fill="#1E3A5F"
                fillOpacity="0.95"
              />
              <text
                x="0"
                y="-10"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="600"
              >
                {data[hoveredPoint.index].count} prést.
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
