import React from 'react';
import type { TopBorrowedBook } from '../reports.types';

interface TopBooksBarChartProps {
  books: TopBorrowedBook[];
}

export const TopBooksBarChart: React.FC<TopBooksBarChartProps> = ({ books }) => {
  const maxScale = 60;
  const ticks = [0, 15, 30, 45, 60];

  return (
    <div className="reports-chart-card">
      <div className="reports-chart-header">
        <h3 className="reports-chart-title">Libros más prestados</h3>
        <p className="reports-chart-subtitle">Top 5 · Periodo actual</p>
      </div>

      <div className="reports-chart-content" style={{ height: '220px' }}>
        <div className="reports-hbar-container">
          {books.map((book) => {
            const percentage = Math.min((book.count / maxScale) * 100, 100);

            return (
              <div key={book.id} className="reports-hbar-item">
                <span className="reports-hbar-label" title={book.title}>
                  {book.title}
                </span>

                <div className="reports-hbar-track">
                  <div
                    className="reports-hbar-fill"
                    style={{ width: `${percentage}%` }}
                    title={`${book.title}: ${book.count} préstamos`}
                  />
                </div>
              </div>
            );
          })}

          {/* X Axis ticks */}
          <div className="reports-hbar-axis-row">
            {ticks.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
