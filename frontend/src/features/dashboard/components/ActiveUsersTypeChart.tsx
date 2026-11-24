import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  School,
  ShieldCheck,
  UserCheck,
  UserX,
  PieChart as PieChartIcon,
  BarChart3,
  Users,
} from 'lucide-react';
import type { ActiveUserTypeData, UserTypeId } from '../dashboard.types';

interface ActiveUsersTypeChartProps {
  data: ActiveUserTypeData[];
  title?: string;
  subtitle?: string;
}

const TYPE_ICONS: Record<UserTypeId, React.ComponentType<{ size?: number; className?: string }>> = {
  STUDENT: GraduationCap,
  TEACHER: School,
  ADMINISTRATIVE: ShieldCheck,
  GRADUATE: UserCheck,
  EXTERNAL: UserX,
};

export const ActiveUsersTypeChart: React.FC<ActiveUsersTypeChartProps> = ({
  data,
  title = 'Usuarios activos por tipo',
  subtitle = 'Distribución de la comunidad lectora',
}) => {
  const [viewMode, setViewMode] = useState<'donut' | 'bar'>('donut');
  const [selectedType, setSelectedType] = useState<UserTypeId | null>(null);
  const [hoveredType, setHoveredType] = useState<UserTypeId | null>(null);

  const activeFocus = hoveredType || selectedType;

  const totalActive = useMemo(() => {
    return data.reduce((sum, item) => sum + item.count, 0);
  }, [data]);

  // Cálculo geométrico de sectores del Donut (SVG)
  const donutSlices = useMemo(() => {
    if (totalActive === 0) return [];

    const size = 200;
    const center = size / 2;
    const radius = 76;
    const innerRadius = 52;

    let cumulativeAngle = -Math.PI / 2; // Iniciar arriba (12 en punto)

    return data
      .filter((item) => item.count > 0)
      .map((item) => {
        const sliceAngle = (item.count / totalActive) * 2 * Math.PI;
        const startAngle = cumulativeAngle;
        const endAngle = cumulativeAngle + sliceAngle;
        cumulativeAngle += sliceAngle;

        const isHovered = activeFocus === item.id;
        const currentRadius = isHovered ? radius + 5 : radius;

        // Puntos exteriores e interiores
        const x1 = center + currentRadius * Math.cos(startAngle);
        const y1 = center + currentRadius * Math.sin(startAngle);
        const x2 = center + currentRadius * Math.cos(endAngle);
        const y2 = center + currentRadius * Math.sin(endAngle);

        const x3 = center + innerRadius * Math.cos(endAngle);
        const y3 = center + innerRadius * Math.sin(endAngle);
        const x4 = center + innerRadius * Math.cos(startAngle);
        const y4 = center + innerRadius * Math.sin(startAngle);

        const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

        // Path SVG para el sector de la dona
        const pathData = [
          `M ${x1} ${y1}`,
          `A ${currentRadius} ${currentRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
          `L ${x3} ${y3}`,
          `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
          'Z',
        ].join(' ');

        return {
          ...item,
          pathData,
          startAngle,
          endAngle,
          isHovered,
        };
      });
  }, [data, totalActive, activeFocus]);

  const focusedItem = useMemo(() => {
    if (!activeFocus) return null;
    return data.find((item) => item.id === activeFocus) || null;
  }, [data, activeFocus]);

  return (
    <div className="dashboard-card active-users-side-card">
      {/* Header de la gráfica con título y controles */}
      <div className="active-users-side-header">
        <div className="active-users-title-block">
          <div className="active-users-title-row">
            <h3 className="dashboard-card-title">{title}</h3>
            <span className="active-users-badge-total" title="Total de usuarios activos registrados">
              {totalActive} {totalActive === 1 ? 'activo' : 'activos'}
            </span>
          </div>
          <span className="active-users-subtitle">{subtitle}</span>
        </div>

        {/* Toggle para cambiar entre Anillo y Barras */}
        <div className="active-users-view-controls" role="group" aria-label="Modo de visualización">
          <button
            type="button"
            className={`active-users-toggle-btn ${viewMode === 'donut' ? 'active' : ''}`}
            onClick={() => setViewMode('donut')}
            title="Vista circular de anillo (Donut)"
            aria-label="Ver gráfica circular"
          >
            <PieChartIcon size={14} />
            <span>Anillo</span>
          </button>
          <button
            type="button"
            className={`active-users-toggle-btn ${viewMode === 'bar' ? 'active' : ''}`}
            onClick={() => setViewMode('bar')}
            title="Vista de barras de progreso"
            aria-label="Ver gráfica de barras"
          >
            <BarChart3 size={14} />
            <span>Barras</span>
          </button>
        </div>
      </div>

      {totalActive === 0 ? (
        <div className="active-users-empty-state">
          <Users size={32} color="#94A3B8" />
          <p>No hay usuarios activos registrados actualmente.</p>
        </div>
      ) : (
        <div className="active-users-side-body">
          {/* MODO 1: ANILLO CON NOMBRES DEBAJO */}
          {viewMode === 'donut' && (
            <div className="active-users-vertical-layout">
              {/* Gráfica de anillo centrada arriba */}
              <div className="active-users-center-svg-wrap">
                <svg
                  viewBox="0 0 200 200"
                  className="active-users-donut-svg"
                  aria-label="Gráfica de distribución de usuarios activos"
                >
                  {donutSlices.map((slice) => (
                    <path
                      key={slice.id}
                      d={slice.pathData}
                      fill={slice.color}
                      opacity={activeFocus && !slice.isHovered ? 0.35 : 1}
                      stroke="#FFFFFF"
                      strokeWidth={slice.isHovered ? 2.5 : 1.5}
                      className="active-users-slice-path"
                      onMouseEnter={() => setHoveredType(slice.id)}
                      onMouseLeave={() => setHoveredType(null)}
                      onClick={() =>
                        setSelectedType((prev) => (prev === slice.id ? null : slice.id))
                      }
                      role="button"
                      tabIndex={0}
                      aria-label={`${slice.label}: ${slice.count} (${slice.percentage}%)`}
                    />
                  ))}

                  {/* Círculo interno blanco */}
                  <circle cx="100" cy="100" r="51" fill="#FFFFFF" />
                </svg>

                {/* Centro dinámico del Donut */}
                <div
                  className="active-users-donut-center"
                  onClick={() => setSelectedType(null)}
                  title="Haz clic para restablecer vista general"
                >
                  {focusedItem ? (
                    <>
                      <span
                        className="active-users-center-badge"
                        style={{ color: focusedItem.color }}
                      >
                        {focusedItem.percentage}%
                      </span>
                      <span className="active-users-center-name">{focusedItem.label}</span>
                      <span className="active-users-center-count">
                        {focusedItem.count} {focusedItem.count === 1 ? 'usuario' : 'usuarios'}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="active-users-center-val">{totalActive}</span>
                      <span className="active-users-center-sub">Total activos</span>
                    </>
                  )}
                </div>
              </div>

              {/* Nombres y categorías colocadas DEBAJO de la gráfica de anillo */}
              <div className="active-users-categories-bottom">
                {data.map((item) => {
                  const Icon = TYPE_ICONS[item.id] || Users;
                  const isHovered = activeFocus === item.id;
                  const isDimmed = Boolean(activeFocus && !isHovered);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`active-users-category-row ${isHovered ? 'active' : ''} ${
                        isDimmed ? 'dimmed' : ''
                      }`}
                      onMouseEnter={() => setHoveredType(item.id)}
                      onMouseLeave={() => setHoveredType(null)}
                      onClick={() =>
                        setSelectedType((prev) => (prev === item.id ? null : item.id))
                      }
                    >
                      <div className="active-users-cat-left">
                        <div
                          className="active-users-cat-icon"
                          style={{ backgroundColor: item.bgLight, color: item.color }}
                        >
                          <Icon size={14} />
                        </div>
                        <span className="active-users-cat-name">{item.label}</span>
                      </div>

                      <div className="active-users-cat-right">
                        <span className="active-users-cat-count" style={{ color: item.color }}>
                          {item.count}
                        </span>
                        <span className="active-users-cat-pct">({item.percentage}%)</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* MODO 2: BARRAS HORIZONTALES */}
          {viewMode === 'bar' && (
            <div className="active-users-bars-layout">
              {data.map((item) => {
                const Icon = TYPE_ICONS[item.id] || Users;
                const isHovered = activeFocus === item.id;
                const isDimmed = Boolean(activeFocus && !isHovered);

                return (
                  <div
                    key={item.id}
                    className={`active-users-bar-item ${isHovered ? 'active' : ''} ${
                      isDimmed ? 'dimmed' : ''
                    }`}
                    onMouseEnter={() => setHoveredType(item.id)}
                    onMouseLeave={() => setHoveredType(null)}
                    onClick={() =>
                      setSelectedType((prev) => (prev === item.id ? null : item.id))
                    }
                  >
                    <div className="active-users-bar-info">
                      <div className="active-users-bar-title-group">
                        <div
                          className="active-users-bar-icon"
                          style={{ backgroundColor: item.bgLight, color: item.color }}
                        >
                          <Icon size={13} />
                        </div>
                        <span className="active-users-bar-name">{item.label}</span>
                      </div>
                      <div className="active-users-bar-numbers">
                        <strong style={{ color: item.color }}>{item.count}</strong>
                        <span className="active-users-bar-sub">({item.percentage}%)</span>
                      </div>
                    </div>

                    <div className="active-users-bar-track">
                      <div
                        className="active-users-bar-fill"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
