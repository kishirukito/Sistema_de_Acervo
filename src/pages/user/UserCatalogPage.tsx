import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, ArrowRight } from 'lucide-react';
import { Card, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { MOCK_BOOKS } from '../../mocks/data';

export const UserCatalogPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', ...Array.from(new Set(MOCK_BOOKS.map((b) => b.category)))];

  const filteredBooks = MOCK_BOOKS.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.includes(search);
    const matchesCat = selectedCategory === 'ALL' || b.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-header-info">
          <h1 className="page-title">Explorar Catálogo</h1>
          <p className="page-subtitle">
            Consulta el acervo disponible para consulta en sala y préstamo a domicilio
          </p>
        </div>
      </div>

      <Card>
        <CardBody>
          <div style={{ display: 'flex', gap: 16, width: '100%', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <Input
                placeholder="Buscar por título, autor o tema..."
                leftIcon={<Search size={18} />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'ALL' ? 'Todos' : cat}
                </Button>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      {filteredBooks.length === 0 ? (
        <Card>
          <CardBody>
            <EmptyState
              icon={<BookOpen size={32} />}
              title="No encontramos coincidencias"
              description="Intenta buscar con otros términos clave o seleccionar otra categoría."
            />
          </CardBody>
        </Card>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
            width: '100%',
          }}
        >
          {filteredBooks.map((book) => (
            <Card key={book.id} hoverable>
              <CardBody>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'flex-start' }}>
                  <Badge variant="neutral" size="sm">{book.category}</Badge>
                  <Badge variant={book.availableCopies > 0 ? 'success' : 'danger'} size="sm" dot>
                    {book.availableCopies > 0 ? `${book.availableCopies} disponibles` : 'Sin ejemplares'}
                  </Badge>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--color-primary-dark)', lineHeight: 1.3 }}>
                    {book.title}
                  </h3>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                    Por {book.author} ({book.publishYear})
                  </span>
                </div>

                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  {book.description?.slice(0, 110)}...
                </p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    paddingTop: 12,
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Ubicación: <strong>{book.location}</strong>
                  </span>
                  <Link to={`/user/catalog/${book.id}`}>
                    <Button variant="outline" size="sm" rightIcon={<ArrowRight size={14} />}>
                      Ver Ficha
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
