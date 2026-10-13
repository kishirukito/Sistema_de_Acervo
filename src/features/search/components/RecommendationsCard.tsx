import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { MOCK_RECOMMENDED_BOOKS } from '../search.mock';
import type { RecommendedBook } from '../search.types';

interface RecommendationsCardProps {
  onSelectRecommendation: (book: RecommendedBook) => void;
}

export const RecommendationsCard: React.FC<RecommendationsCardProps> = ({
  onSelectRecommendation,
}) => {
  return (
    <aside className="search-aside-col" aria-label="Recomendaciones sugeridas">
      <div className="search-recs-card">
        <div className="search-recs-header">
          <div className="search-recs-icon-box" aria-hidden="true">
            <BookOpen size={16} />
          </div>
          <span>También te puede interesar</span>
        </div>

        <div className="search-recs-list">
          {MOCK_RECOMMENDED_BOOKS.map((book) => (
            <div
              key={book.id}
              onClick={() => onSelectRecommendation(book)}
              className="search-rec-item"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectRecommendation(book);
                }
              }}
              aria-label={`Ver sugerencia ${book.title} de ${book.author}`}
            >
              <div
                className="search-rec-cover"
                style={{
                  background: `linear-gradient(135deg, ${book.coverGradient.from} 0%, ${book.coverGradient.to} 100%)`,
                }}
                aria-hidden="true"
              >
                <span className="search-rec-initials">{book.coverInitials}</span>
              </div>

              <div className="search-rec-info">
                <h4 className="search-rec-title" title={book.title}>
                  {book.title}
                </h4>
                <p className="search-rec-author" title={book.author}>
                  {book.author}
                </p>
                <span className="search-rec-badge">{book.category}</span>
              </div>

              <ChevronRight size={16} className="search-rec-chevron" aria-hidden="true" />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            const firstRec = MOCK_RECOMMENDED_BOOKS[0];
            if (firstRec) onSelectRecommendation(firstRec);
          }}
          className="search-recs-footer-link"
        >
          Ver más recomendaciones →
        </button>
      </div>
    </aside>
  );
};
