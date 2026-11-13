import React from 'react';
import type { MonthlyLoanData, CategoryConsultData } from '../dashboard.types';
import { getCategoryCode, getCategoryFullLabel } from '../../../constants';

interface LineChartProps {
  data: MonthlyLoanData[];
  title: string;
  subtitle: string;
}

export const MonthlyLoansChart: React.FC<LineChartProps> = ({ data, title, subtitle }) => {
  const width = 500;
  const height = 180;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = Math.max(...data.map((d) => d.loans), 0);
  const maxY = maxVal <= 4 ? 4 : maxVal <= 10 ? 10 : maxVal <= 20 ? 20 : maxVal <= 50 ? 50 : Math.ceil(maxVal / 20) * 20;
  const rawTicks = [0, Math.round(maxY * 0.25), Math.round(maxY * 0.5), Math.round(maxY * 0.75), maxY];
  const yTicks = Array.from(new Set(rawTicks)).sort((a, b) => a - b);

  const points = data.map((d, index) => {
    const divisor = data.length > 1 ? data.length - 1 : 1;
    const x = paddingLeft + (index / divisor) * chartWidth;
    const y = paddingTop + chartHeight - (d.loans / maxY) * chartHeight;
    return { x, y, label: d.month, value: d.loans };
  });

  // Build SVG path
  const pathD = points.reduce((acc, point, i, a) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = a[i - 1];
    const cp1x = prev.x + (point.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (point.x - prev.x) / 2;
    const cp2y = point.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
  }, '');

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3 className="chart-card-title">{title}</h3>
        <span className="chart-card-subtitle">{subtitle}</span>
      </div>
      <div className="chart-svg-container">
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" preserveAspectRatio="none">
          {/* Y Gridlines and labels */}
          {yTicks.map((tick) => {
            const y = paddingTop + chartHeight - (tick / maxY) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F3F4F6"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  fill="#9CA3AF"
                  fontSize="11"
                  textAnchor="end"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Smooth Line */}
          <path d={pathD} fill="none" stroke="#2F80ED" strokeWidth="2.5" strokeLinecap="round" />

          {/* Data Points */}
          {points.map((pt, i) => (
            <g key={i}>
              <circle cx={pt.x} cy={pt.y} r="4" fill="#FFFFFF" stroke="#2F80ED" strokeWidth="2.5" />
              <text
                x={pt.x}
                y={height - 8}
                fill="#9CA3AF"
                fontSize="11"
                textAnchor="middle"
              >
                {pt.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

interface BarChartProps {
  data: CategoryConsultData[];
  title: string;
  subtitle: string;
}

export const CategoryConsultsChart: React.FC<BarChartProps> = ({ data, title, subtitle }) => {
  const width = 500;
  const height = 180;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxCount = Math.max(...data.map((d) => d.count), 0);
  const maxY = maxCount <= 4 ? 4 : maxCount <= 8 ? 8 : maxCount <= 20 ? 20 : Math.ceil(maxCount / 5) * 5;
  const rawTicks = [0, Math.round(maxY * 0.25), Math.round(maxY * 0.5), Math.round(maxY * 0.75), maxY];
  const yTicks = Array.from(new Set(rawTicks)).sort((a, b) => a - b);
  const barWidth = 18;

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3 className="chart-card-title">{title}</h3>
        <span className="chart-card-subtitle">{subtitle}</span>
      </div>
      <div className="chart-svg-container">
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" preserveAspectRatio="none">
          {/* Y Gridlines and labels */}
          {yTicks.map((tick) => {
            const y = paddingTop + chartHeight - (tick / maxY) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F3F4F6"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  fill="#9CA3AF"
                  fontSize="11"
                  textAnchor="end"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Vertical Bars */}
          {data.map((item, index) => {
            const slotWidth = chartWidth / data.length;
            const x = paddingLeft + index * slotWidth + (slotWidth - barWidth) / 2;
            const barH = (item.count / maxY) * chartHeight;
            const y = paddingTop + chartHeight - barH;
            const fullLabel = getCategoryFullLabel(item.category);
            const code = getCategoryCode(item.category) || item.category;

            return (
              <g key={item.category}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barH}
                  rx="4"
                  fill="#2F80ED"
                >
                  <title>{`${fullLabel}: ${item.count} consultas`}</title>
                </rect>
                <text
                  x={x + barWidth / 2}
                  y={height - 8}
                  fill="#9CA3AF"
                  fontSize="11"
                  textAnchor="middle"
                >
                  {code}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Accessible legend preventing label overlap */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px', marginTop: 10, fontSize: '0.75rem', color: '#64748B' }}>
        {data.map((item) => (
          <span key={item.category} title={`${getCategoryFullLabel(item.category)}: ${item.count} consultas`}>
            <strong style={{ color: '#1E293B' }}>{getCategoryCode(item.category)}</strong> — {getCategoryFullLabel(item.category).replace(/^\d{3}\s*—\s*/, '')} ({item.count})
          </span>
        ))}
      </div>
    </div>
  );
};
