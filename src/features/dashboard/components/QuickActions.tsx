import React from 'react';

export const QuickActions: React.FC = () => {
  const handleAction = (label: string) => {
    // Temporary notification feedback
    alert(`Acción rápida seleccionada: "${label}". Esta funcionalidad estará disponible en su correspondiente módulo.`);
  };

  return (
    <div className="dashboard-quick-actions" aria-label="Acciones rápidas">
      <button
        type="button"
        className="dashboard-btn-outline"
        onClick={() => handleAction('Agregar libro')}
      >
        <span>+ Agregar libro</span>
      </button>

      <button
        type="button"
        className="dashboard-btn-outline"
        onClick={() => handleAction('Registrar usuario')}
      >
        <span>+ Registrar usuario</span>
      </button>

      <button
        type="button"
        className="dashboard-btn-highlight"
        onClick={() => handleAction('Nuevo préstamo')}
      >
        <span>+ Nuevo préstamo</span>
      </button>

      <button
        type="button"
        className="dashboard-btn-outline"
        onClick={() => handleAction('Registrar devolución')}
      >
        <span>Registrar devolución</span>
      </button>
    </div>
  );
};
