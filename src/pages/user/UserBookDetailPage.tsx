import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle, Clock } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { MOCK_BOOKS, MOCK_REQUESTS } from '../../mocks/data';
import { useAuth } from '../../features/auth/AuthContext';

export const UserBookDetailPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [requested, setRequested] = useState(false);

  const book = MOCK_BOOKS.find((b) => b.id === bookId);

  if (!book) {
    return (
      <div className="page-container">
        <Card>
          <CardBody>
            <EmptyState
              title="Libro no encontrado"
              description="El título solicitado no existe en la base de datos del acervo."
              action={
                <Link to="/user/catalog">
                  <Button variant="primary">Volver al Catálogo</Button>
                </Link>
              }
            />
          </CardBody>
        </Card>
      </div>
    );
  }

  const handleRequestLoan = () => {
    if (!user) return;
    MOCK_REQUESTS.unshift({
      id: `req-${Date.now()}`,
      bookId: book.id,
      bookTitle: book.title,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'PENDING',
      notes: 'Solicitud enviada desde el portal web',
    });
    setRequested(true);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">{book.title}</h1>
          <p className="page-subtitle">Ficha técnica y disponibilidad física del ejemplar</p>
        </div>
        <div className="page-actions">
          <Button
            variant="outline"
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => navigate('/user/catalog')}
          >
            Regresar
          </Button>
        </div>
      </div>

      {requested && (
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #B8E8CE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CheckCircle size={22} />
            <span>
              ¡Solicitud registrada con éxito! Acude a ventanilla de biblioteca para recoger tu libro.
            </span>
          </div>
          <Link to="/user/requests">
            <Button variant="primary" size="sm">
              Ver Mis Solicitudes
            </Button>
          </Link>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
        <Card>
          <CardHeader
            title="Información General"
            subtitle="Metadatos bibliográficos normalizados"
          />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Autor:</span>
                <span style={{ fontWeight: 600 }}>{book.author}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>ISBN:</span>
                <span>{book.isbn}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Editorial:</span>
                <span>{book.publisher}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Año de publicación:</span>
                <span>{book.publishYear}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Categoría temática:</span>
                <Badge variant="primary" size="sm">{book.category}</Badge>
              </div>
              <div style={{ marginTop: 10 }}>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', display: 'block', marginBottom: 4 }}>
                  Sinopsis del libro:
                </span>
                <p style={{ lineHeight: 1.6, fontSize: '0.875rem' }}>{book.description}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Existencia e Inventario"
            subtitle="Condición actual en salas de acervo"
          />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
              <div
                style={{
                  padding: '14px',
                  backgroundColor: '#FAFAFA',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <MapPin size={24} color="var(--color-primary)" />
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Ubicación en estantería:</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{book.location}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Ejemplares disponibles:</span>
                <Badge variant={book.availableCopies > 0 ? 'success' : 'danger'} size="md" dot>
                  {book.availableCopies} de {book.totalCopies} disponibles
                </Badge>
              </div>

              <Button
                variant="primary"
                fullWidth
                size="lg"
                disabled={book.availableCopies === 0 || requested}
                onClick={handleRequestLoan}
                leftIcon={<Clock size={18} />}
              >
                {requested ? 'Solicitud Enviada' : 'Solicitar Préstamo'}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
