import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { MOCK_REQUESTS, MOCK_BOOKS } from '../../mocks/data';

export const UserRequestDetailPage: React.FC = () => {
  const { requestId } = useParams<{ requestId: string }>();
  const navigate = useNavigate();

  const req = MOCK_REQUESTS.find((r) => r.id === requestId);
  const book = req ? MOCK_BOOKS.find((b) => b.id === req.bookId || b.title === req.bookTitle) : null;

  if (!req) {
    return (
      <div className="page-container">
        <Card>
          <CardBody>
            <EmptyState
              title="Solicitud no encontrada"
              description="No encontramos el número de solicitud especificado."
              action={
                <Link to="/user/requests">
                  <Button variant="primary">Volver a Solicitudes</Button>
                </Link>
              }
            />
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">Detalle de Solicitud #{req.id}</h1>
          <p className="page-subtitle">Información del trámite y estado de asignación física</p>
        </div>
        <div className="page-actions">
          <Button
            variant="outline"
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => navigate('/user/requests')}
          >
            Volver a Mis Solicitudes
          </Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
        <Card>
          <CardHeader
            title="Datos del Préstamo Solicitado"
            subtitle="Libro y fechas registradas"
          />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Título:</span>
                <span style={{ fontWeight: 600 }}>{req.bookTitle}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Fecha de solicitud:</span>
                <span>{req.requestDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Estado:</span>
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
                    ? 'Aprobada para entrega'
                    : 'Rechazada'}
                </Badge>
              </div>
              {req.notes && (
                <div style={{ marginTop: 8 }}>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>Notas:</span>
                  <p style={{ fontSize: '0.875rem', marginTop: 4 }}>{req.notes}</p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Instrucciones para Entrega"
            subtitle="Pasos a seguir para recoger el volumen físico"
          />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary-dark)' }}>
                  1. Presenta tu credencial universitaria vigente
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                  Debes mostrar tu identificación con código o matrícula en el mostrador del acervo.
                </div>
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary-dark)' }}>
                  2. Horario de atención del acervo
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                  Lunes a Viernes de 8:00 AM a 7:00 PM. Ventanilla central de biblioteca.
                </div>
              </div>

              {book && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                  <MapPin size={16} color="var(--color-primary)" />
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text)' }}>
                    Ubicación en estante: <strong>{book.location}</strong>
                  </span>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
