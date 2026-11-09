import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';
import { Card, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: 'var(--color-background)',
      }}
    >
      <div style={{ maxWidth: 460, width: '100%' }}>
        <Card>
          <CardBody>
            <EmptyState
              icon={<FileQuestion size={40} />}
              title="404 - Página No Encontrada"
              description="La ruta solicitada no existe o no se encuentra disponible en el Sistema de Acervo."
              action={
                <Link to="/login">
                  <Button variant="primary" leftIcon={<Home size={16} />}>
                    Ir al Inicio / Iniciar Sesión
                  </Button>
                </Link>
              }
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
