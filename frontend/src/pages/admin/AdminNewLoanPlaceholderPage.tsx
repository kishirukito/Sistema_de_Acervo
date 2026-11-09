import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookMarked } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';

export const AdminNewLoanPlaceholderPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ maxWidth: 800, margin: '0 auto', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<ArrowLeft size={16} />}
          onClick={() => navigate('/admin/loans')}
        >
          Volver a Préstamos
        </Button>
      </div>

      <Card>
        <CardHeader
          title="Registrar Nuevo Préstamo"
          subtitle="Formulario administrativo para asignación de ejemplares a usuarios habilitados"
        />
        <CardBody>
          <div
            style={{
              padding: '2.5rem 1.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                backgroundColor: '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2F80ED',
              }}
              aria-hidden="true"
            >
              <BookMarked size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#1E3A5F', margin: 0, fontWeight: 600 }}>
              Módulo de Registro de Préstamos
            </h3>
            <p style={{ color: '#6B7280', maxWidth: 480, margin: 0, fontSize: '0.875rem' }}>
              Este formulario se encuentra en fase de desarrollo. La vista principal de préstamos ya está disponible con datos en vivo.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/admin/loans')}
              style={{ marginTop: 8 }}
            >
              Regresar al Directorio de Préstamos
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
