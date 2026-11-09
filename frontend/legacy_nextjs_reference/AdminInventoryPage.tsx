import React from 'react';
import { PlusCircle, FileText, Database } from 'lucide-react';

export const AdminInventoryPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2><Database size={22} /> Administración del Acervo e Inventario</h2>
        <button className="btn-primary" onClick={() => alert('Abrir modal de nuevo libro')}>
          <PlusCircle size={16} /> Registrar Nuevo Libro
        </button>
      </div>

      <div className="admin-grid">
        <div className="stat-box">
          <h3>Total de Títulos</h3>
          <p className="big-number">1,240</p>
        </div>
        <div className="stat-box">
          <h3>Total Ejemplares</h3>
          <p className="big-number">3,850</p>
        </div>
        <div className="stat-box">
          <h3>Préstamos Activos</h3>
          <p className="big-number">48</p>
        </div>
        <div className="stat-box">
          <h3>Resúmenes con IA</h3>
          <p className="big-number">892</p>
        </div>
      </div>
    </div>
  );
};
