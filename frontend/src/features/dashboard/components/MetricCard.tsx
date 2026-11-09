import React from 'react';
import { Book, BookOpen, ClipboardCheck, Clock } from 'lucide-react';
import type { MetricData } from '../dashboard.types';

interface MetricCardProps {
  data: MetricData;
}

export const MetricCard: React.FC<MetricCardProps> = ({ data }) => {
  const renderIcon = () => {
    const iconProps = { size: 20, color: data.accentColor };
    switch (data.iconType) {
      case 'book':
        return <Book {...iconProps} />;
      case 'book-open':
        return <BookOpen {...iconProps} />;
      case 'clipboard':
        return <ClipboardCheck {...iconProps} />;
      case 'clock':
        return <Clock {...iconProps} />;
      default:
        return <Book {...iconProps} />;
    }
  };

  return (
    <div className="metric-card">
      <div className="metric-info">
        <span className="metric-title">{data.title}</span>
        <span className="metric-value">{data.value}</span>
        {data.trend && <span className="metric-trend">{data.trend}</span>}
      </div>
      <div
        className="metric-badge-icon"
        style={{ backgroundColor: data.badgeBgColor }}
        aria-hidden="true"
      >
        {renderIcon()}
      </div>
    </div>
  );
};
