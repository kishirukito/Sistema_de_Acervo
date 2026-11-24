import React from 'react';
import type { TopBorrowedBook } from '../reports.types';

interface TopBooksBarChartProps {
  books: TopBorrowedBook[];
}

export const TopBooksBarChart: React.FC<TopBooksBarChartProps> = ({ books }) => {
  const maxCount = books && books.length > 0 ? Math.max(...books.map((b) => b.count), 0) : 0;
  const maxScale = maxCount > 0 ? Math.max(maxCount, 4) : 4;

  // Generate 5 distinct ticks: e.g. [0, 1, 2, 3, 4]
  const ticks = [
    0,
    Math.round(maxScale * 0.25),
    Math.round(maxScale * 0.5),
    Math.round(maxScale * 0.75),
    maxScale,
  ];

  return (
    <div className="reports-chart-card">
      <div className="reports-chart-header">
        <h3 className="reports-chart-title">Libros más prestados</h3>
        <p className="reports-chart-subtitle">Top acervo · Datos reales</p>
      </div>

      <div className="reports-chart-content" style={{ height: '220px' }}>
        {books.length === 0 ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#9CA3AF',
              fontSize: '0.875rem',
            }}
          >
            No hay registros de préstamos en el periodo.
          </div>
        ) : (
          <div className="reports-hbar-container">
            <div className="reports-hbar-list">
              {books.map((book, idx) => {
                const percentage = Math.min((book.count / maxScale) * 100, 100);

                return (
                  <div key={book.id || idx} className="reports-hbar-item">
                    <div className="reports-hbar-label-wrap">
                      <span className="reports-hbar-rank" title={`Posición #${idx + 1}`}>
                        {idx + 1}
                      </span>
                      <span className="reports-hbar-label" title={book.title}>
                        {book.title}
                      </span>
                    </div>

                    <div className="reports-hbar-track">
                      <div
                        className="reports-hbar-fill"
                        style={{ width: `${Math.max(percentage, book.count > 0 ? 8 : 0)}%` }}
                        title={`${book.title}: ${book.count} préstamo(s)`}
                      />
                    </div>

                    <span className="reports-hbar-count" title={`${book.count} préstamo(s)`}>
                      {book.count}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* X Axis ticks aligned strictly with the bar tracks */}
            <div className="reports-hbar-axis-grid">
              <div aria-hidden="true" />
              <div className="reports-hbar-axis-ticks">
                {ticks.map((t, idx) => (
                  <span key={idx} className="reports-hbar-tick">
                    {t}
                  </span>
                ))}
              </div>
              <div aria-hidden="true" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
