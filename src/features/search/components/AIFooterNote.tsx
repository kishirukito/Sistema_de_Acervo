import React from 'react';
import { Info } from 'lucide-react';

export const AIFooterNote: React.FC = () => {
  return (
    <div className="search-ai-note-banner" role="note" aria-label="Aviso informativo sobre asistencia de IA">
      <Info size={18} className="search-ai-note-icon" aria-hidden="true" />
      <p className="search-ai-note-text">
        <strong className="search-ai-note-strong">Nota sobre la IA: </strong>
        Las sugerencias y resúmenes se generan con apoyo de inteligencia artificial. Consulta el
        libro original para obtener información completa y verificada.
      </p>
    </div>
  );
};
