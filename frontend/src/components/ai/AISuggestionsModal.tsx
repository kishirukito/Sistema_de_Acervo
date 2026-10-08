import React from 'react';
import { Sparkles, X, Lightbulb } from 'lucide-react';
import { AISearchResult } from '../../types';

interface AISuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestions: AISearchResult | null;
  onSelectTopic: (topic: string) => void;
}

export const AISuggestionsModal: React.FC<AISuggestionsModalProps> = ({
  isOpen,
  onClose,
  suggestions,
  onSelectTopic,
}) => {
  if (!isOpen || !suggestions) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <div className="modal-title">
            <Sparkles size={18} />
            <h3>Sugerencias Temáticas Inteligentes</h3>
          </div>
          <button onClick={onClose} className="btn-close"><X size={18} /></button>
        </div>

        <div className="modal-body">
          <p>Para el término <strong>"{suggestions.query}"</strong>, la IA sugiere explorar:</p>
          <div className="topics-list">
            {suggestions.topicos_relacionados.map((topic, index) => (
              <button
                key={index}
                className="topic-badge-btn"
                onClick={() => {
                  onSelectTopic(topic);
                  onClose();
                }}
              >
                <Lightbulb size={14} /> {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
