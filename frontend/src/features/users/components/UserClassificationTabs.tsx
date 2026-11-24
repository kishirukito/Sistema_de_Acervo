import React, { useMemo } from 'react';
import {
  Users,
  GraduationCap,
  School,
  ShieldCheck,
  UserCheck,
  UserX,
} from 'lucide-react';
import type { UserClassification, ManagedUser } from '../users.types';

interface ClassificationTabItem {
  id: UserClassification;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgLight: string;
}

const CLASSIFICATION_ITEMS: ClassificationTabItem[] = [
  {
    id: 'ALL',
    label: 'Todos',
    icon: Users,
    color: '#2563EB',
    bgLight: '#EFF6FF',
  },
  {
    id: 'STUDENT',
    label: 'Alumnos',
    icon: GraduationCap,
    color: '#7C3AED',
    bgLight: '#F5F3FF',
  },
  {
    id: 'TEACHER',
    label: 'Docentes',
    icon: School,
    color: '#4F46E5',
    bgLight: '#EEF2FF',
  },
  {
    id: 'ADMINISTRATIVE',
    label: 'Administrativos',
    icon: ShieldCheck,
    color: '#0284C7',
    bgLight: '#E0F2FE',
  },
  {
    id: 'GRADUATE',
    label: 'Egresados',
    icon: UserCheck,
    color: '#059669',
    bgLight: '#ECFDF5',
  },
  {
    id: 'EXTERNAL',
    label: 'Externos',
    icon: UserX,
    color: '#D97706',
    bgLight: '#FEF3C7',
  },
];

interface UserClassificationTabsProps {
  activeClassification: UserClassification;
  onChange: (classification: UserClassification) => void;
  users: ManagedUser[];
}

export const UserClassificationTabs: React.FC<UserClassificationTabsProps> = ({
  activeClassification,
  onChange,
  users,
}) => {
  // Contadores reales y precisos para cada clasificación de usuario
  const counts = useMemo(() => {
    let student = 0;
    let teacher = 0;
    let admin = 0;
    let graduate = 0;
    let external = 0;

    for (const u of users) {
      if (u.kind === 'ADMINISTRATIVE') {
        admin++;
      } else if (u.kind === 'NORMAL') {
        if (u.category === 'STUDENT' || !u.category) {
          student++;
        } else if (u.category === 'TEACHER') {
          teacher++;
        } else if (u.category === 'GRADUATE') {
          graduate++;
        } else if (u.category === 'EXTERNAL') {
          external++;
        }
      }
    }

    return {
      ALL: users.length,
      STUDENT: student,
      TEACHER: teacher,
      ADMINISTRATIVE: admin,
      GRADUATE: graduate,
      EXTERNAL: external,
    };
  }, [users]);

  return (
    <div
      className="users-classification-grid"
      role="tablist"
      aria-label="Clasificación interactiva de usuarios por categoría"
    >
      {CLASSIFICATION_ITEMS.map((item) => {
        const isActive = activeClassification === item.id;
        const count = counts[item.id] || 0;
        const IconComponent = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`tab-classification-${item.id}`}
            aria-selected={isActive}
            aria-label={`${item.label}: ${count} usuarios registrados${isActive ? ', pestaña seleccionada' : ''}`}
            className={`users-class-card${isActive ? ' users-class-card--active' : ''}`}
            onClick={() => onChange(item.id)}
          >
            <div className="users-class-card-top">
              <div
                className="users-class-card-icon-wrap"
                style={{
                  backgroundColor: item.bgLight,
                  color: item.color,
                }}
                aria-hidden="true"
              >
                <IconComponent size={20} />
              </div>
              {isActive && (
                <span className="users-class-card-active-pill" aria-hidden="true">
                  Activo
                </span>
              )}
            </div>

            <div className="users-class-card-content">
              <span className="users-class-card-value">
                {count}
              </span>
              <span className="users-class-card-title">
                {item.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
