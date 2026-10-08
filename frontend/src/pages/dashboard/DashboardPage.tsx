import React from 'react';
import { LayoutDashboard, TrendingUp, Users, BookOpen } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h2><LayoutDashboard size={22} /> Métricas y Estadísticas de Biblioteca</h2>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <div className="card-title"><TrendingUp size={18} /> Libros más prestados</div>
          <ol className="rank-list">
            <li>Cálculo Diferencial e Integral (Stewart) - 45 préstamos</li>
            <li>Clean Code (Robert C. Martin) - 38 préstamos</li>
            <li>Fundamentos de Circuitos Eléctricos (Sadiku) - 29 préstamos</li>
          </ol>
        </div>

        <div className="card">
          <div className="card-title"><Users size={18} /> Actividad por Carrera</div>
          <ul className="stats-list">
            <li>Ing. en Software: 42%</li>
            <li>Ing. Mecatrónica: 28%</li>
            <li>Ing. en Redes y Telecomunicaciones: 18%</li>
            <li>Otras: 12%</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
