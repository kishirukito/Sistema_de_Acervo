import React, { useState, useEffect } from 'react';
import { loanService } from '../../services/loanService';
import { Loan } from '../../types';
import { Repeat, CheckCircle, Clock } from 'lucide-react';

export const LoansPage: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await loanService.getLoans();
        setLoans(data);
      } catch {
        setLoans([
          {
            id: '1',
            libro_id: '1',
            libro_titulo: 'Patrones de Diseño',
            usuario_id: 'u1',
            usuario_nombre: 'Irvin Ortiz',
            fecha_prestamo: '2026-10-01',
            fecha_devolucion_esperada: '2026-10-08',
            estado: 'activo'
          }
        ]);
      }
    };
    fetchLoans();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2><Repeat size={22} /> Control de Préstamos y Devoluciones</h2>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Libro</th>
              <th>Usuario</th>
              <th>Fecha Préstamo</th>
              <th>Vencimiento</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((l) => (
              <tr key={l.id}>
                <td><strong>{l.libro_titulo || l.libro_id}</strong></td>
                <td>{l.usuario_nombre || l.usuario_id}</td>
                <td>{l.fecha_prestamo}</td>
                <td>{l.fecha_devolucion_esperada}</td>
                <td>
                  <span className={`status-badge ${l.estado}`}>
                    {l.estado === 'activo' && <Clock size={12} />}
                    {l.estado === 'devuelto' && <CheckCircle size={12} />}
                    {l.estado.toUpperCase()}
                  </span>
                </td>
                <td>
                  {l.estado === 'activo' && (
                    <button className="btn-return" onClick={() => alert('Registrar devolución')}>
                      Devolver
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
