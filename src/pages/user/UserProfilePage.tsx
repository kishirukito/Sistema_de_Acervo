import React from 'react';
import { Mail, GraduationCap, IdCard } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../features/auth/AuthContext';
import { CATEGORY_LABELS } from '../../constants';

export const UserProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">Mi Perfil</h1>
          <p className="page-subtitle">
            Información de tu registro universitario y estado de cuenta en biblioteca
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
        <Card>
          <CardHeader
            title="Datos del Lector"
            subtitle="Información institucional asociada"
          />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: '#EBF3FC',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    border: '1px solid #D0E1F9',
                  }}
                >
                  {user?.name?.slice(0, 2).toUpperCase() || 'AL'}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{user?.name}</h3>
                  <Badge variant="info" size="sm">
                    {user?.category ? CATEGORY_LABELS[user.category] : 'Alumno'}
                  </Badge>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', marginTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--color-text)' }}>
                  <Mail size={16} color="var(--color-text-muted)" />
                  <span style={{ fontSize: '0.875rem' }}>{user?.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--color-text)' }}>
                  <IdCard size={16} color="var(--color-text-muted)" />
                  <span style={{ fontSize: '0.875rem' }}>Matrícula / ID: {user?.identifierCode || '2023-TI-0482'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--color-text)' }}>
                  <GraduationCap size={16} color="var(--color-text-muted)" />
                  <span style={{ fontSize: '0.875rem' }}>Carrera / Programa: {user?.departmentOrCareer || 'Ingeniería'}</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Condiciones de Préstamo"
            subtitle="Reglamento y derechos aplicables a tu categoría"
          />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#FAFAFA',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-primary-dark)' }}>
                  Límite de Ejemplares Simultáneos
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                  Hasta 3 volúmenes por un período de 14 días naturales con derecho a 1 renovación.
                </div>
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#FAFAFA',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-primary-dark)' }}>
                  Estatus de la Cuenta
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                  Cuenta al corriente, sin multas ni adeudos pendientes en el acervo.
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
