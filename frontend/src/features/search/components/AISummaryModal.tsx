import React, { useState, useEffect } from 'react';
import { Sparkles, X, MapPin, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import type { ResourceSearchResult } from '../search.types';
import { requestAISummary } from '../../../services/api/ai.service';
import './AISummaryModal.css';

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
      const data = await requestAISummary({
        titulo: resource.title,
        autor: resource.author,
        sinopsis_o_tema: resource.category || '',
        libro_id: resource.id,
      });

      if (data?.resumen) {
        setCurrentSummary(data.resumen);
        resource.aiSummary = data.resumen;
        if (data.palabras_clave) {
          const tags = data.palabras_clave.split(',').map((s: string) => s.trim()).filter(Boolean);
          setCurrentSubjects(tags);
          resource.subjects = tags;
        }
        setNotice('¡Resumen generado y guardado en la base de datos!');
      } else {
        setNotice('No se pudo generar el resumen.');
      }
    } catch (e: any) {
      console.error(e);
      setNotice(e?.message || 'Error al conectar con el microservicio de IA.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="ai-summary-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-summary-modal-title"
    >
      <div className="ai-summary-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="ai-summary-header">
          <div className="ai-summary-title-group">
            <div className="ai-summary-icon-badge" aria-hidden="true">
              <Sparkles size={18} />
            </div>
            <div className="ai-summary-title-text">
              <h3 id="ai-summary-modal-title" className="ai-summary-title">
                Resumen Asistido por IA
              </h3>
              <span className="ai-summary-subtitle">{resource.title}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ai-summary-close-btn"
            aria-label="Cerrar modal de resumen IA"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Body ──────────────────────────────────────────────────── */}
        <div className="ai-summary-body">

          {/* Synopsis Box */}
          <div className="ai-summary-synopsis-box">
            <div className="ai-summary-synopsis-toolbar">
              <p className="ai-summary-synopsis-label">Síntesis del contenido:</p>
              <button
                type="button"
                onClick={handleGenerateOrRefresh}
                disabled={isGenerating}
                className="ai-summary-refresh-btn"
                aria-label={isGenerating ? 'Generando resumen...' : 'Generar o actualizar resumen con IA'}
              >
                <RefreshCw
                  size={12}
                  className={isGenerating ? 'ai-summary-refresh-icon--spinning' : undefined}
                  aria-hidden="true"
                />
                {isGenerating ? 'Generando...' : 'Generar / Actualizar con IA'}
              </button>
            </div>

            <p className={`ai-summary-synopsis-text${!currentSummary ? ' ai-summary-synopsis-empty' : ''}`}>
              {currentSummary || 'Sin resumen disponible. Usa el botón para generar uno con IA.'}
            </p>

            {notice && (
              <div
                role="status"
                className={`ai-summary-notice ${
                  notice.includes('éxito') || notice.includes('guardado')
                    ? 'ai-summary-notice--success'
                    : 'ai-summary-notice--warning'
                }`}
              >
                {notice.includes('éxito') || notice.includes('guardado') ? (
                  <CheckCircle2 size={13} aria-hidden="true" />
                ) : (
                  <AlertCircle size={13} aria-hidden="true" />
                )}
                {notice}
              </div>
            )}
          </div>

          {/* Tags / Subjects */}
          <div className="ai-summary-tags-section">
            <span className="ai-summary-tags-label">Temas clave detectados</span>
            {currentSubjects.length > 0 ? (
              <div className="ai-summary-tags-list">
                {currentSubjects.map((sub) => (
                  <span key={sub} className="ai-summary-tag">{sub}</span>
                ))}
              </div>
            ) : (
              <span className="ai-summary-tags-empty">Sin temas detectados.</span>
            )}
          </div>

          {/* Metadata Grid */}
          <div className="ai-summary-meta-grid">
            <div className="ai-summary-meta-item">
              <span className="ai-summary-meta-label">Autor principal</span>
              <span className="ai-summary-meta-val">{resource.author}</span>
            </div>
            <div className="ai-summary-meta-item">
              <span className="ai-summary-meta-label">Año de publicación</span>
              <span className="ai-summary-meta-val">{resource.publicationYear}</span>
            </div>
            <div className="ai-summary-meta-item">
              <span className="ai-summary-meta-label">Ubicación en biblioteca</span>
              <span className="ai-summary-meta-val">
                <MapPin size={12} aria-hidden="true" />
                {resource.location}
              </span>
            </div>
            <div className="ai-summary-meta-item">
              <span className="ai-summary-meta-label">Disponibilidad actual</span>
              <span className="ai-summary-meta-val">
                {resource.availableCopies} de {resource.totalCopies} copias
              </span>
            </div>
          </div>
        </div>

        {/* ── Footer ────────────────────────────────────────────────── */}
        <div className="ai-summary-footer">
          <button
            type="button"
            onClick={onClose}
            className="ai-summary-close-action-btn"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
