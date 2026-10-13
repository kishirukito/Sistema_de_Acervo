import React from 'react';
import { Link } from 'react-router-dom';
import { BookMarked, Clock, Search, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../features/auth/AuthContext';
import { CATEGORY_LABELS } from '../../constants';
import { MOCK_BOOKS, MOCK_LOANS, MOCK_REQUESTS } from '../../mocks/data';

export const UserHomePage: React.FC = () => {
  const { user } = useAuth();
  const myLoans = MOCK_LOANS.filter((l) => l.userId === user?.id || l.userEmail === user?.email);
  const myRequests = MOCK_REQUESTS.filter((r) => r.userId === user?.id || r.userEmail === user?.email);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">Bienvenido, {user?.name}</h1>
          <p className="page-subtitle">
            Portal de consulta bibliográfica y gestión de préstamos personales
          </p>
        </div>
        <div className="page-actions">
          <Link to="/user/catalog">
            <Button variant="primary" leftIcon={<Search size={16} />}>
              Explorar Catálogo
            </Button>
          </Link>
        </div>
      </div>

      {/* User Status Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          width: '100%',
        }}
      >
        <Card compact>
          <CardBody>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Categoría de Usuario</span>
              <Badge variant="info" size="sm">
                {user?.category ? CATEGORY_LABELS[user.category] : 'Estudiante'}
              </Badge>
            </div>
            <span style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-primary-dark)' }}>
              {user?.identifierCode || '2023-TI-0482'}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              {user?.departmentOrCareer || 'Ingeniería'}
            </span>
          </CardBody>
        </Card>

        <Card compact>
          <CardBody>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Préstamos Vigentes</span>
              <BookMarked size={20} color="var(--color-primary)" />
            </div>
            <span style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
              {myLoans.filter((l) => l.status === 'ACTIVE').length}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-success)' }}>
              Límite disponible: 3 ejemplares
            </span>
          </CardBody>
        </Card>

        <Card compact>
          <CardBody>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Solicitudes en Trámite</span>
              <Clock size={20} color="var(--color-warning)" />
            </div>
            <span style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
              {myRequests.length}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              Pendientes de entrega
            </span>
          </CardBody>
        </Card>
      </div>

      {/* Suggested reading & Quick catalog glance */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20 }}>
        <Card>
          <CardHeader
            title="Mis Libros en Préstamo"
            subtitle="Material que debes devolver próximamente en biblioteca"
            action={
              <Link to="/user/loans">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={14} />}>
                  Ver detalle
                </Button>
              </Link>
            }
          />
          <CardBody>
            {myLoans.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                No tienes préstamos activos actualmente.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
                {myLoans.map((loan) => (
                  <div
                    key={loan.id}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: '#FAFAFA',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{loan.bookTitle}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Fecha de entrega: {loan.dueDate}
                      </div>
                    </div>
                    <Badge variant={loan.status === 'ACTIVE' ? 'primary' : 'warning'} size="sm">
                      {loan.status === 'ACTIVE' ? 'En préstamo' : loan.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Libros Recomendados"
            subtitle="Títulos destacados disponibles para préstamo en sala o a domicilio"
            action={
              <Link to="/user/catalog">
                <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={14} />}>
                  Ver catálogo
                </Button>
              </Link>
            }
          />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
              {MOCK_BOOKS.slice(0, 3).map((book) => (
                <Link
                  key={book.id}
                  to={`/user/catalog/${book.id}`}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: '#FFFFFF',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    transition: 'border-color var(--transition-fast)',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-primary-dark)' }}>
                      {book.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {book.author} • {book.category}
                    </div>
                  </div>
                  <Badge variant={book.availableCopies > 0 ? 'success' : 'danger'} size="sm">
                    {book.availableCopies > 0 ? 'Disponible' : 'Agotado'}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
