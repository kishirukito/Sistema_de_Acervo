import React from 'react';
import { BookMarked } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { MOCK_LOANS } from '../../mocks/data';
import { useAuth } from '../../features/auth/AuthContext';

export const UserLoansPage: React.FC = () => {
  const { user } = useAuth();
  const myLoans = MOCK_LOANS.filter(
    (l) => l.userId === user?.id || l.userEmail === user?.email
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">Mis Préstamos</h1>
          <p className="page-subtitle">
            Control de libros en posesión, fechas límite de entrega y devoluciones registradas
          </p>
        </div>
      </div>

      <Card>
        <CardHeader
          title={`Historial de Préstamos (${myLoans.length})`}
          subtitle="Registros de material retirado del acervo bibliográfico"
        />
        <CardBody>
          {myLoans.length === 0 ? (
            <EmptyState
              icon={<BookMarked size={32} />}
              title="Sin registros de préstamo"
              description="Aún no has retirado libros de la biblioteca."
            />
          ) : (
            <div style={{ width: '100%', overflowX: 'auto' }}>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
                    <th style={{ padding: '12px 8px' }}>Libro</th>
                    <th style={{ padding: '12px 8px' }}>ISBN</th>
                    <th style={{ padding: '12px 8px' }}>Fecha de Préstamo</th>
                    <th style={{ padding: '12px 8px' }}>Fecha Límite</th>
                    <th style={{ padding: '12px 8px' }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {myLoans.map((loan) => (
                    <tr key={loan.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '14px 8px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--color-primary-dark)' }}>
                          {loan.bookTitle}
                        </div>
                      </td>
                      <td style={{ padding: '14px 8px', fontSize: '0.8125rem' }}>{loan.bookIsbn}</td>
                      <td style={{ padding: '14px 8px', fontSize: '0.8125rem' }}>{loan.loanDate}</td>
                      <td style={{ padding: '14px 8px', fontSize: '0.8125rem', fontWeight: 600 }}>
                        {loan.dueDate}
                      </td>
                      <td style={{ padding: '14px 8px' }}>
                        <Badge
                          variant={
                            loan.status === 'ACTIVE'
                              ? 'primary'
                              : loan.status === 'OVERDUE'
                              ? 'danger'
                              : 'success'
                          }
                          size="sm"
                          dot
                        >
                          {loan.status === 'ACTIVE'
                            ? 'Vigente'
                            : loan.status === 'OVERDUE'
                            ? 'Vencido'
                            : 'Devuelto'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
