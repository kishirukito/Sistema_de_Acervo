import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { MOCK_REQUESTS } from '../../mocks/data';
import { useAuth } from '../../features/auth/AuthContext';

export const UserRequestsPage: React.FC = () => {
  const { user } = useAuth();
  const myRequests = MOCK_REQUESTS.filter(
    (r) => r.userId === user?.id || r.userEmail === user?.email
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">Mis Solicitudes</h1>
          <p className="page-subtitle">
            Seguimiento de pedidos de libros solicitados para préstamo
          </p>
        </div>
        <div className="page-actions">
          <Link to="/user/catalog">
            <Button variant="primary" leftIcon={<BookOpen size={16} />}>
              Nueva Solicitud
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader
          title={`Solicitudes Registradas (${myRequests.length})`}
          subtitle="Estado del trámite en biblioteca"
        />
        <CardBody>
          {myRequests.length === 0 ? (
            <EmptyState
              icon={<Clock size={32} />}
              title="No tienes solicitudes activas"
              description="Explora el catálogo y solicita el material que necesites para tus materias."
              action={
                <Link to="/user/catalog">
                  <Button variant="primary">Explorar Catálogo</Button>
                </Link>
              }
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
              {myRequests.map((req) => (
                <div
                  key={req.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#FAFAFA',
                    width: '100%',
                    flexWrap: 'wrap',
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--color-primary-dark)' }}>
                      {req.bookTitle}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 4 }}>
                      Código de trámite: {req.id} • Solicitado: {req.requestDate}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Badge
                      variant={
                        req.status === 'PENDING'
                          ? 'warning'
                          : req.status === 'APPROVED'
                          ? 'success'
                          : 'danger'
                      }
                      size="md"
                      dot
                    >
                      {req.status === 'PENDING'
                        ? 'En revisión'
                        : req.status === 'APPROVED'
                        ? 'Lista para recoger'
                        : 'Rechazada'}
                    </Badge>
                    <Link to={`/user/requests/${req.id}`}>
                      <Button variant="outline" size="sm" rightIcon={<ArrowRight size={14} />}>
                        Detalles
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
