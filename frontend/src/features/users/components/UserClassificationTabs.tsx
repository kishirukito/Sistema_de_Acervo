import React from 'react';
import { Users, GraduationCap, School, ShieldCheck, UserCheck, UserX } from 'lucide-react';
import type { UserClassification, ManagedUser } from '../users.types';

interface ClassificationTabItem {
  id: UserClassification;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const CLASSIFICATION_ITEMS: ClassificationTabItem[] = [
  { id: 'ALL', label: 'Todos', icon: Users },
  { id: 'STUDENT', label: 'Alumnos', icon: GraduationCap },
  { id: 'TEACHER', label: 'Docentes', icon: School },
  { id: 'ADMINISTRATIVE', label: 'Administrativos', icon: ShieldCheck },
  { id: 'GRADUATE', label: 'Egresados', icon: UserCheck },
  { id: 'EXTERNAL', label: 'Externos', icon: UserX },
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
  // Calcular contadores reales para cada clasificación
  const counts = React.useMemo(() => {
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
      className="users-classification-bar"
      role="tablist"
      aria-label="Clasificación por tipo de usuario"
    >
      <div className="users-classification-track">
        {CLASSIFICATION_ITEMS.map((item) => {
          const isActive = activeClassification === item.id;
          const count = counts[item.id] || 0;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`users-class-tab${isActive ? ' users-class-tab--active' : ''}`}
              onClick={() => onChange(item.id)}
            >
              <IconComponent size={16} className="users-class-tab-icon" />
              <span className="users-class-tab-label">{item.label}</span>
              <span className="users-class-tab-badge" aria-label={`${count} usuarios`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
