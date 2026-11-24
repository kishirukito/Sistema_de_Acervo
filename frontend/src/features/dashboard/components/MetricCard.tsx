import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, BookOpen, ClipboardCheck, Clock, Inbox } from 'lucide-react';
import type { MetricData } from '../dashboard.types';

interface MetricCardProps {
  data: MetricData;
}

export const MetricCard: React.FC<MetricCardProps> = ({ data }) => {
  const navigate = useNavigate();

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
      case 'inbox':
        return <Inbox {...iconProps} />;
      default:
        return <Book {...iconProps} />;
    }
  };

  const handleClick = () => {
    if (data.navigateTo) {
      navigate(data.navigateTo);
    }
  };

  const isClickable = Boolean(data.navigateTo);

  return (
    <div
      className={`metric-card ${isClickable ? 'metric-card--clickable' : ''}`}
      onClick={handleClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
      title={isClickable ? `Ver ${data.title.toLowerCase()} en su tabla de información` : undefined}
      aria-label={`${data.title}: ${data.value}`}
    >
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
