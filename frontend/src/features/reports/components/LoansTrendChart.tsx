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
  
  // Dynamic scale based on real data
  const maxDataVal = data && data.length > 0 ? Math.max(...data.map((d) => d.count), 0) : 0;
  const maxVal = maxDataVal > 0 ? Math.max(maxDataVal + 1, 5) : 5;

  // Calculate coordinates for each data point
  const points = (data || []).map((d, index) => {
    const x = paddingLeft + (data.length > 1 ? (index / (data.length - 1)) * chartWidth : chartWidth / 2);
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
  const areaPath = points.length >= 2
    ? `${linePath} L ${points[points.length - 1].x} ${
        paddingTop + chartHeight
      } L ${points[0].x} ${paddingTop + chartHeight} Z`
    : '';

  // Y-axis ticks
  const yTicks = [maxVal, Math.round(maxVal * 0.75), Math.round(maxVal * 0.5), Math.round(maxVal * 0.25), 0];

  return (
    <div className="reports-chart-card">
      <div className="reports-chart-header">
        <h3 className="reports-chart-title">Préstamos por mes</h3>
        <p className="reports-chart-subtitle">Histórico real del sistema</p>
      </div>

      <div className="reports-chart-content">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="reports-line-chart-svg"
          aria-label="Gráfica de préstamos por mes"
        >
          <defs>
            <linearGradient id="blueGradientArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2F80ED" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2F80ED" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines and Y-axis labels */}
          {yTicks.map((tick, i) => {
            const y = paddingTop + (i / (yTicks.length - 1)) * chartHeight;
            return (
              <g key={i}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F3F4F6"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#9CA3AF"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Gradient Filled Area */}
          {areaPath && <path d={areaPath} fill="url(#blueGradientArea)" />}

          {/* Main Curve Line */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#2F80ED"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data Points and X labels */}
          {points.map((pt, index) => (
            <g key={index}>
              {/* Outer circle */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="4.5"
                fill="#FFFFFF"
                stroke="#2F80ED"
                strokeWidth="2.5"
                style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                onMouseEnter={() => setHoveredPoint({ index, x: pt.x, y: pt.y })}
                onMouseLeave={() => setHoveredPoint(null)}
              />

              {/* X Axis Month Label */}
              <text
                x={pt.x}
                y={height - 6}
                textAnchor="middle"
                fontSize="11"
                fill="#6B7280"
              >
                {pt.shortMonth}
              </text>
            </g>
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint !== null && (
          <div
            className="reports-chart-tooltip"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100}%`,
            }}
          >
            <strong>{data[hoveredPoint.index].count}</strong> préstamos
          </div>
        )}
      </div>
    </div>
  );
};
