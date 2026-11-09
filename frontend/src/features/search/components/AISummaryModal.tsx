import React, { useState, useEffect } from 'react';
import { Sparkles, X, MapPin, RefreshCw } from 'lucide-react';
import type { ResourceSearchResult } from '../search.types';

interface AISummaryModalProps {
  resource: ResourceSearchResult | null;
  onClose: () => void;
}

export const AISummaryModal: React.FC<AISummaryModalProps> = ({ resource, onClose }) => {
  const [currentSummary, setCurrentSummary] = useState(resource?.aiSummary || '');
  const [currentSubjects, setCurrentSubjects] = useState<string[]>(resource?.subjects || []);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (resource) {
      setCurrentSummary(resource.aiSummary);
      setCurrentSubjects(resource.subjects);
      setNotice(null);
    }
  }, [resource]);

  if (!resource) return null;

  const handleGenerateOrRefresh = async () => {
    setIsGenerating(true);
    setNotice(null);
    try {
      const res = await fetch('/api/v1/ai/resumen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: resource.title,
          autor: resource.author,
          sinopsis_o_tema: resource.category || '',
          libro_id: resource.id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.resumen) {
          setCurrentSummary(data.resumen);
          resource.aiSummary = data.resumen;
          if (data.palabras_clave) {
            const tags = data.palabras_clave.split(',').map((s: string) => s.trim()).filter(Boolean);
            setCurrentSubjects(tags);
            resource.subjects = tags;
          }
          setNotice('¡Resumen generado y guardado en la base de datos!');
        }
      } else {
        setNotice('No se pudo generar el resumen.');
      }
    } catch (e) {
      console.error(e);
      setNotice('Error al conectar con el microservicio de IA.');
    } finally {
      setIsGenerating(false);
    }
  };

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <p style={{ margin: 0, fontWeight: 600, color: '#1E3A5F' }}>
                Síntesis del contenido:
              </p>
              <button
                type="button"
                onClick={handleGenerateOrRefresh}
                disabled={isGenerating}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#2F80ED',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #BFDBFE',
                  borderRadius: '6px',
                  padding: '3px 8px',
                  cursor: isGenerating ? 'not-allowed' : 'pointer',
                }}
              >
                <RefreshCw size={12} style={{ animation: isGenerating ? 'spin 1s linear infinite' : 'none' }} />
                {isGenerating ? 'Generando...' : 'Generar / Actualizar con IA'}
              </button>
            </div>
            <p style={{ margin: 0 }}>{currentSummary}</p>
            {notice && (
              <p style={{ margin: '8px 0 0', fontSize: '0.75rem', color: notice.includes('éxito') || notice.includes('guardado') ? '#10B981' : '#F59E0B' }}>
                {notice}
              </p>
            )}
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
              {currentSubjects.map((sub) => (
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
