import React, { useState } from 'react';
import { X, DollarSign, Calendar, Monitor, AlertCircle, Save, Loader2 } from 'lucide-react';
import type { CatalogosReportes } from '../reports.types';
import {
  createSancion,
  createReservaEspacio,
  createSesionComputo,
  updateEjemplarEstado,
} from '../../../services/api/reports.service';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  catalogos: CatalogosReportes;
  initialTab?: 'sancion' | 'espacio' | 'computo' | 'baja';
}

export const ReportDataEntryModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  catalogos,
  initialTab = 'sancion',
}) => {
  const [activeTab, setActiveTab] = useState<'sancion' | 'espacio' | 'computo' | 'baja'>(initialTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  // 1. Sanción
  const [sancionUser, setSancionUser] = useState(catalogos.usuarios[0]?.id || '');
  const [sancionTipo, setSancionTipo] = useState('multa');
  const [sancionMonto, setSancionMonto] = useState('25.00');
  const [sancionEstado, setSancionEstado] = useState('pendiente');
  const [sancionMotivo, setSancionMotivo] = useState('');

  // 2. Reserva de espacio
  const [espacioId, setEspacioId] = useState(String(catalogos.espacios[0]?.id || '1'));
  const [espacioUser, setEspacioUser] = useState(catalogos.usuarios[0]?.id || '');
  const [espacioInicio, setEspacioInicio] = useState(new Date().toISOString().slice(0, 16));
  const [espacioFin, setEspacioFin] = useState(
    new Date(Date.now() + 2 * 3600 * 1000).toISOString().slice(0, 16)
  );
  const [espacioEstado, setEspacioEstado] = useState('concluida');

  // 3. Sesión de cómputo
  const [computoEquipoId, setComputoEquipoId] = useState(String(catalogos.equipos[0]?.id || '1'));
  const [computoUser, setComputoUser] = useState(catalogos.usuarios[0]?.id || '');
  const [computoDuracion, setComputoDuracion] = useState('120');

  // 4. Baja de ejemplar
  const [bajaEjemplarId, setBajaEjemplarId] = useState(catalogos.ejemplares[0]?.id || '');
  const [bajaEstado, setBajaEstado] = useState('baja');
  const [bajaMotivo, setBajaMotivo] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (activeTab === 'sancion') {
        if (!sancionUser) throw new Error('Seleccione un usuario');
        if (!sancionMotivo.trim()) throw new Error('Ingrese el motivo de la sanción');
        await createSancion({
          usuario_id: sancionUser,
          tipo_sancion: sancionTipo,
          monto_multa: sancionTipo === 'multa' ? parseFloat(sancionMonto) || 0 : 0,
          estado_pago: sancionEstado,
          motivo: sancionMotivo.trim(),
        });
        onSuccess('Sanción / multa registrada correctamente en la base de datos');
      } else if (activeTab === 'espacio') {
        if (!espacioUser) throw new Error('Seleccione un usuario');
        await createReservaEspacio({
          usuario_id: espacioUser,
          espacio_id: parseInt(espacioId, 10),
          inicio: new Date(espacioInicio).toISOString(),
          fin: new Date(espacioFin).toISOString(),
          estado: espacioEstado,
        });
        onSuccess('Ocupación de espacio / cubículo registrada con éxito');
      } else if (activeTab === 'computo') {
        if (!computoUser) throw new Error('Seleccione un usuario');
        await createSesionComputo({
          usuario_id: computoUser,
          equipo_id: parseInt(computoEquipoId, 10),
          duracion_minutos: parseInt(computoDuracion, 10) || 60,
        });
        onSuccess('Sesión de uso de equipo de cómputo guardada');
      } else if (activeTab === 'baja') {
        if (!bajaEjemplarId) throw new Error('Seleccione un ejemplar');
        await updateEjemplarEstado({
          ejemplar_id: bajaEjemplarId,
          estado: bajaEstado,
          observaciones: bajaMotivo.trim() || undefined,
        });
        onSuccess(`Estado del ejemplar actualizado a '${bajaEstado}'`);
      }
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Error al guardar en el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="siabuc-modal-backdrop" onClick={onClose}>
      <div
        className="siabuc-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '560px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#111827' }}>
              Capturar Datos Estadísticos (SIABUC)
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#6B7280' }}>
              Ingreso directo de registros reales a la base de datos
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#9CA3AF',
              padding: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab selection */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#F9FAFB',
            borderBottom: '1px solid #E5E7EB',
            padding: '0.5rem 1rem',
            gap: '8px',
          }}
        >
          <button
            type="button"
            className={`siabuc-tab-btn ${activeTab === 'sancion' ? 'active' : ''}`}
            onClick={() => setActiveTab('sancion')}
            style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}
          >
            <DollarSign size={14} /> Sanción/Multa
          </button>
          <button
            type="button"
            className={`siabuc-tab-btn ${activeTab === 'espacio' ? 'active' : ''}`}
            onClick={() => setActiveTab('espacio')}
            style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}
          >
            <Calendar size={14} /> Espacio
          </button>
          <button
            type="button"
            className={`siabuc-tab-btn ${activeTab === 'computo' ? 'active' : ''}`}
            onClick={() => setActiveTab('computo')}
            style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}
          >
            <Monitor size={14} /> Cómputo
          </button>
          <button
            type="button"
            className={`siabuc-tab-btn ${activeTab === 'baja' ? 'active' : ''}`}
            onClick={() => setActiveTab('baja')}
            style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}
          >
            <AlertCircle size={14} /> Baja/Inventario
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          {error && (
            <div
              style={{
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                padding: '0.75rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* TAB 1: SANCIÓN */}
          {activeTab === 'sancion' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Usuario sancionado:
                </label>
                <select
                  value={sancionUser}
                  onChange={(e) => setSancionUser(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                  required
                >
                  <option value="">-- Seleccionar usuario --</option>
                  {catalogos.usuarios.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nombre} ({u.email})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Tipo de sanción:
                  </label>
                  <select
                    value={sancionTipo}
                    onChange={(e) => setSancionTipo(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                  >
                    <option value="multa">Multa económica</option>
                    <option value="amonestacion">Amonestación verbal / escrita</option>
                    <option value="suspension">Suspensión de servicio</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Monto ($ MXN):
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    disabled={sancionTipo !== 'multa'}
                    value={sancionMonto}
                    onChange={(e) => setSancionMonto(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Estado de pago:
                </label>
                <select
                  value={sancionEstado}
                  onChange={(e) => setSancionEstado(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                >
                  <option value="pendiente">Pendiente de cobro</option>
                  <option value="pagado">Pagado en caja</option>
                  <option value="condonado">Condonado / Justificado</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Motivo / Observación:
                </label>
                <textarea
                  value={sancionMotivo}
                  onChange={(e) => setSancionMotivo(e.target.value)}
                  placeholder="Ej. Retraso de 2 días en entrega de libro..."
                  rows={2}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                  required
                />
              </div>
            </div>
          )}

          {/* TAB 2: ESPACIO */}
          {activeTab === 'espacio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Cubículo o Sala:
                </label>
                <select
                  value={espacioId}
                  onChange={(e) => setEspacioId(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                  required
                >
                  {catalogos.espacios.map((esp) => (
                    <option key={esp.id} value={esp.id}>
                      {esp.nombre} ({esp.tipo})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Usuario solicitante:
                </label>
                <select
                  value={espacioUser}
                  onChange={(e) => setEspacioUser(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                  required
                >
                  <option value="">-- Seleccionar usuario --</option>
                  {catalogos.usuarios.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Hora de inicio:
                  </label>
                  <input
                    type="datetime-local"
                    value={espacioInicio}
                    onChange={(e) => setEspacioInicio(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                    Hora de fin:
                  </label>
                  <input
                    type="datetime-local"
                    value={espacioFin}
                    onChange={(e) => setEspacioFin(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Estado de la sesión:
                </label>
                <select
                  value={espacioEstado}
                  onChange={(e) => setEspacioEstado(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                >
                  <option value="concluida">Concluida (histórica)</option>
                  <option value="activa">Activa en este momento</option>
                </select>
              </div>
            </div>
          )}

          {/* TAB 3: COMPUTO */}
          {activeTab === 'computo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Equipo de cómputo:
                </label>
                <select
                  value={computoEquipoId}
                  onChange={(e) => setComputoEquipoId(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                  required
                >
                  {catalogos.equipos.map((eq) => (
                    <option key={eq.id} value={eq.id}>
                      {eq.codigo} ({eq.ubicacion})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Usuario:
                </label>
                <select
                  value={computoUser}
                  onChange={(e) => setComputoUser(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                  required
                >
                  <option value="">-- Seleccionar usuario --</option>
                  {catalogos.usuarios.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Duración de la sesión (minutos de internet):
                </label>
                <input
                  type="number"
                  min="15"
                  step="15"
                  value={computoDuracion}
                  onChange={(e) => setComputoDuracion(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                  required
                />
              </div>
            </div>
          )}

          {/* TAB 4: BAJA/INVENTARIO */}
          {activeTab === 'baja' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Ejemplar físico:
                </label>
                <select
                  value={bajaEjemplarId}
                  onChange={(e) => setBajaEjemplarId(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                  required
                >
                  <option value="">-- Seleccionar ejemplar --</option>
                  {catalogos.ejemplares.map((ej) => (
                    <option key={ej.id} value={ej.id}>
                      {ej.codigo} (actualmente: {ej.estado})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Nuevo estado:
                </label>
                <select
                  value={bajaEstado}
                  onChange={(e) => setBajaEstado(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                >
                  <option value="baja">Baja definitiva (deterioro o descarte)</option>
                  <option value="extraviado">Extraviado / No localizado</option>
                  <option value="mantenimiento">En reparación / Mantenimiento</option>
                  <option value="disponible">Reincorporar a Disponible</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>
                  Observaciones / Dictamen:
                </label>
                <textarea
                  value={bajaMotivo}
                  onChange={(e) => setBajaMotivo(e.target.value)}
                  placeholder="Ej. Daño severo en encuadernación por humedad..."
                  rows={2}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #D1D5DB' }}
                />
              </div>
            </div>
          )}

          {/* Footer actions */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid #F3F4F6',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: '1px solid #D1D5DB',
                backgroundColor: '#FFFFFF',
                color: '#374151',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.5rem 1.25rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Guardar en Base de Datos</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
