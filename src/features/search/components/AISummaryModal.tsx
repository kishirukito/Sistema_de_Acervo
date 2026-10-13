import React from 'react';
import { Sparkles, X, MapPin } from 'lucide-react';
import type { ResourceSearchResult } from '../search.types';

interface AISummaryModalProps {
  resource: ResourceSearchResult | null;
  onClose: () => void;
}

export const AISummaryModal: React.FC<AISummaryModalProps> = ({ resource, onClose }) => {
  if (!resource) return null;

  return (
    <div
      className="search-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-summary-modal-title"
    >
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <div className="search-modal-title-group">
            <div className="search-modal-icon-badge">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 id="ai-summary-modal-title" className="search-modal-title">
                Resumen Asistido por IA
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                {resource.title}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="search-modal-close-btn"
            aria-label="Cerrar modal de resumen IA"
          >
            <X size={18} />
          </button>
        </div>

        <div className="search-modal-body">
          <div className="search-modal-ai-box">
            <p style={{ margin: '0 0 0.5rem', fontWeight: 600, color: '#1E3A5F' }}>
              Síntesis del contenido:
            </p>
            <p style={{ margin: 0 }}>{resource.aiSummary}</p>
          </div>

          <div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Temas clave detectados
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
              {resource.subjects.map((sub) => (
                <span
                  key={sub}
                  style={{
                    backgroundColor: '#EFF6FF',
                    color: '#2F80ED',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    padding: '3px 8px',
                    borderRadius: '6px',
                  }}
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          <div className="search-modal-meta-grid">
            <div className="search-modal-meta-item">
              <span className="search-modal-meta-label">Autor principal</span>
              <span className="search-modal-meta-val">{resource.author}</span>
            </div>
            <div className="search-modal-meta-item">
              <span className="search-modal-meta-label">Año de publicación</span>
              <span className="search-modal-meta-val">{resource.publicationYear}</span>
            </div>
            <div className="search-modal-meta-item">
              <span className="search-modal-meta-label">Ubicación en biblioteca</span>
              <span className="search-modal-meta-val" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={12} color="#2F80ED" />
                {resource.location}
              </span>
            </div>
            <div className="search-modal-meta-item">
              <span className="search-modal-meta-label">Disponibilidad actual</span>
              <span className="search-modal-meta-val">
                {resource.availableCopies} de {resource.totalCopies} copias
              </span>
            </div>
          </div>
        </div>

        <div className="search-modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="search-btn-outline"
            style={{ height: '36px' }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
