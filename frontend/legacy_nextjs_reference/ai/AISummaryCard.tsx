import React from 'react';
import { Sparkles, Tag, Bot } from 'lucide-react';
import { AISummary } from '../../types';

interface AISummaryCardProps {
  summary: AISummary | null;
  loading: boolean;
  onGenerate: () => void;
}

export const AISummaryCard: React.FC<AISummaryCardProps> = ({ summary, loading, onGenerate }) => {
  return (
    <div className="ai-summary-card">
      <div className="ai-card-header">
        <h4><Sparkles size={16} /> Resumen Generado por IA</h4>
        {!summary && (
          <button onClick={onGenerate} disabled={loading} className="btn-ai">
            {loading ? 'Analizando libro...' : 'Generar con IA'}
          </button>
        )}
      </div>

      {loading && <div className="ai-loading">Consultando modelo de IA local...</div>}

      {summary && (
        <div className="ai-card-body">
          <p className="summary-text">{summary.resumen}</p>
          <div className="keywords-section">
            <Tag size={14} />
            <span><strong>Palabras clave:</strong> {summary.palabras_clave}</span>
          </div>
          <div className="model-info">
            <Bot size={12} /> Modelo: {summary.modelo} ({summary.proveedor})
          </div>
        </div>
      )}
    </div>
  );
};
