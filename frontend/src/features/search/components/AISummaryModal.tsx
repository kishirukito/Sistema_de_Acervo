import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, MapPin, RefreshCw, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { ResourceSearchResult } from '../search.types';
import { requestAISummary, pollAISummaryStatus } from '../../../services/api/ai.service';
import './AISummaryModal.css';

interface AISummaryModalProps {
  resource: ResourceSearchResult | null;
  onClose: () => void;
}

export const AISummaryModal: React.FC<AISummaryModalProps> = ({ resource, onClose }) => {
  const [currentSummary, setCurrentSummary] = useState(resource?.aiSummary || '');
  const [currentSubjects, setCurrentSubjects] = useState<string[]>(resource?.subjects || []);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [currentModel, setCurrentModel] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (resource) {
      setCurrentSummary(resource.aiSummary);
      setCurrentSubjects(resource.subjects);
      setNotice(null);
      setIsPolling(false);
      setCurrentModel(null);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [resource]);

  if (!resource) return null;

  const stopPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    setIsPolling(false);
  };

  const startPolling = (libroId: string) => {
    setIsPolling(true);
    let attempts = 0;
    const MAX_ATTEMPTS = 36; // 36 × 5s = 3 minutos máximo

    pollRef.current = setInterval(async () => {
      attempts++;
      try {
        const status = await pollAISummaryStatus(libroId);
        if (status.estado === 'completado') {
          stopPolling();
          setIsGenerating(false);
          if (status.resumen) {
            setCurrentSummary(status.resumen);
            resource.aiSummary = status.resumen;
            if (status.palabras_clave) {
              const tags = status.palabras_clave.split(',').map((s: string) => s.trim()).filter(Boolean);
              setCurrentSubjects(tags);
              resource.subjects = tags;
            }
            setCurrentModel(status.modelo || null);
            setNotice('✅ Resumen IA generado y guardado en la base de datos.');
          }
        } else if (attempts >= MAX_ATTEMPTS) {
          stopPolling();
          setIsGenerating(false);
          setNotice('⚠️ El modelo tardó demasiado. Se muestra el resumen heurístico guardado.');
        }
      } catch {
        // No interrumpir el polling por errores de red transitorios
      }
    }, 5000);
  };

  const handleGenerateOrRefresh = async () => {
    stopPolling();
    setIsGenerating(true);
    setNotice(null);
    setCurrentModel(null);
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
        setCurrentModel(data.modelo || null);

        // Si el backend devolvió estado "generando_ia", iniciar polling
        if (data.estado === 'generando_ia' && data.job_id) {
          setIsGenerating(false);
          setNotice('⏳ Resumen heurístico guardado. El modelo IA está generando una versión mejorada en segundo plano...');
          startPolling(data.job_id);
        } else {
          setIsGenerating(false);
          setNotice('✅ Resumen generado y guardado en la base de datos.');
        }
      } else {
        setIsGenerating(false);
        setNotice('No se pudo generar el resumen.');
      }
    } catch (e: any) {
      console.error(e);
      setIsGenerating(false);
      setNotice(e?.message || 'Error al conectar con el microservicio de IA.');
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
                disabled={isGenerating || isPolling}
                className="ai-summary-refresh-btn"
                aria-label={isGenerating ? 'Generando resumen...' : 'Generar o actualizar resumen con IA'}
              >
                <RefreshCw
                  size={12}
                  className={isGenerating ? 'ai-summary-refresh-icon--spinning' : undefined}
                  aria-hidden="true"
                />
                {isGenerating ? 'Enviando...' : 'Generar / Actualizar con IA'}
              </button>
            </div>

            <p className={`ai-summary-synopsis-text${!currentSummary ? ' ai-summary-synopsis-empty' : ''}`}>
              {currentSummary || 'Sin resumen disponible. Usa el botón para generar uno con IA.'}
            </p>

            {/* Badge de polling en progreso */}
            {isPolling && (
              <div role="status" className="ai-summary-notice ai-summary-notice--polling">
                <Loader2 size={13} className="ai-summary-refresh-icon--spinning" aria-hidden="true" />
                Mejorando con IA en segundo plano… (actualización automática cada 5s)
              </div>
            )}

            {/* Badge de modelo usado */}
            {currentModel && !isPolling && (
              <div className="ai-summary-model-badge" title={`Generado por: ${currentModel}`}>
                <Sparkles size={10} aria-hidden="true" />
                {currentModel.startsWith('heuristico') ? 'Resumen heurístico' : `Modelo: ${currentModel}`}
              </div>
            )}

            {notice && (
              <div
                role="status"
                className={`ai-summary-notice ${
                  notice.startsWith('✅')
                    ? 'ai-summary-notice--success'
                    : notice.startsWith('⏳')
                    ? 'ai-summary-notice--info'
                    : 'ai-summary-notice--warning'
                }`}
              >
                {notice.startsWith('✅') ? (
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
