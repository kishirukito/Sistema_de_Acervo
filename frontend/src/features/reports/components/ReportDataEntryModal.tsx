import React, { useState, useMemo } from 'react';
import { X, DollarSign, Calendar, Monitor, AlertCircle, Save, Loader2 } from 'lucide-react';
import type { CatalogosReportes } from '../reports.types';
import {
  createSancion,
  createReservaEspacio,
  createSesionComputo,
  updateEjemplarEstado,
} from '../../../services/api/reports.service';
import { CustomSelect, type CustomSelectOption } from '../../../components/ui/CustomSelect';
import '../reports.css';

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

  // Dropdown options
  const usuariosFullOptions = useMemo<CustomSelectOption[]>(() => [
    { value: '', label: '-- Seleccionar usuario --' },
    ...catalogos.usuarios.map((u) => ({
      value: u.id,
      label: `${u.nombre} (${u.email})`,
    })),
  ], [catalogos.usuarios]);

  const usuariosShortOptions = useMemo<CustomSelectOption[]>(() => [
    { value: '', label: '-- Seleccionar usuario --' },
    ...catalogos.usuarios.map((u) => ({
      value: u.id,
      label: u.nombre,
    })),
  ], [catalogos.usuarios]);

  const sancionTipoOptions: CustomSelectOption[] = [
    { value: 'multa', label: 'Multa económica' },
    { value: 'amonestacion', label: 'Amonestación verbal / escrita' },
    { value: 'suspension', label: 'Suspensión de servicio' },
  ];

  const sancionEstadoOptions: CustomSelectOption[] = [
    { value: 'pendiente', label: 'Pendiente de cobro' },
    { value: 'pagado', label: 'Pagado en caja' },
    { value: 'condonado', label: 'Condonado / Justificado' },
  ];

  const espaciosOptions = useMemo<CustomSelectOption[]>(() =>
    catalogos.espacios.map((esp) => ({
      value: String(esp.id),
      label: `${esp.nombre} (${esp.tipo})`,
    })),
    [catalogos.espacios]
  );

  const espacioEstadoOptions: CustomSelectOption[] = [
    { value: 'concluida', label: 'Concluida (histórica)' },
    { value: 'activa', label: 'Activa en este momento' },
  ];

  const equiposOptions = useMemo<CustomSelectOption[]>(() =>
    catalogos.equipos.map((eq) => ({
      value: String(eq.id),
      label: `${eq.codigo} (${eq.ubicacion})`,
    })),
    [catalogos.equipos]
  );

  const ejemplaresOptions = useMemo<CustomSelectOption[]>(() => [
    { value: '', label: '-- Seleccionar ejemplar --' },
    ...catalogos.ejemplares.map((ej) => ({
      value: ej.id,
      label: `${ej.codigo} (actualmente: ${ej.estado})`,
    })),
  ], [catalogos.ejemplares]);

  const bajaEstadoOptions: CustomSelectOption[] = [
    { value: 'baja', label: 'Baja definitiva (deterioro o descarte)' },
    { value: 'extraviado', label: 'Extraviado / No localizado' },
    { value: 'mantenimiento', label: 'En reparación / Mantenimiento' },
    { value: 'disponible', label: 'Reincorporar a Disponible' },
  ];

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
          overflow: 'visible',
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
              Capturar Datos Estadísticos
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
        <form onSubmit={handleSubmit}>
          <div className="rde-form-body">
            {error && (
              <div className="rde-error-banner" style={{ marginBottom: '1rem' }}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* TAB 1: SANCIÓN */}
            {activeTab === 'sancion' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="rde-field">
                  <CustomSelect
                    label="Usuario sancionado:"
                    value={sancionUser}
                    onChange={(val) => setSancionUser(val)}
                    options={usuariosFullOptions}
                    placeholder="-- Seleccionar usuario --"
                  />
                </div>

                <div className="rde-grid-2">
                  <div className="rde-field">
                    <CustomSelect
                      label="Tipo de sanción:"
                      value={sancionTipo}
                      onChange={(val) => setSancionTipo(val)}
                      options={sancionTipoOptions}
                    />
                  </div>

                  <div className="rde-field">
                    <label className="rde-label">Monto ($ MXN):</label>
                    <input
                      className="rde-input"
                      type="number"
                      step="0.5"
                      min="0"
                      disabled={sancionTipo !== 'multa'}
                      value={sancionMonto}
                      onChange={(e) => setSancionMonto(e.target.value)}
                    />
                  </div>
                </div>

                <div className="rde-field">
                  <CustomSelect
                    label="Estado de pago:"
                    value={sancionEstado}
                    onChange={(val) => setSancionEstado(val)}
                    options={sancionEstadoOptions}
                  />
                </div>

                <div className="rde-field">
                  <label className="rde-label">Motivo / Observación:</label>
                  <textarea
                    className="rde-textarea"
                    value={sancionMotivo}
                    onChange={(e) => setSancionMotivo(e.target.value)}
                    placeholder="Ej. Retraso de 2 días en entrega de libro..."
                    rows={2}
                    required
                  />
                </div>
              </div>
            )}

            {/* TAB 2: ESPACIO */}
            {activeTab === 'espacio' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="rde-field">
                  <CustomSelect
                    label="Cubículo o Sala:"
                    value={espacioId}
                    onChange={(val) => setEspacioId(val)}
                    options={espaciosOptions}
                    placeholder="-- Seleccionar espacio --"
                  />
                </div>

                <div className="rde-field">
                  <CustomSelect
                    label="Usuario solicitante:"
                    value={espacioUser}
                    onChange={(val) => setEspacioUser(val)}
                    options={usuariosShortOptions}
                    placeholder="-- Seleccionar usuario --"
                  />
                </div>

                <div className="rde-grid-2">
                  <div className="rde-field">
                    <label className="rde-label">Hora de inicio:</label>
                    <input
                      className="rde-input"
                      type="datetime-local"
                      value={espacioInicio}
                      onChange={(e) => setEspacioInicio(e.target.value)}
                      required
                    />
                  </div>
                  <div className="rde-field">
                    <label className="rde-label">Hora de fin:</label>
                    <input
                      className="rde-input"
                      type="datetime-local"
                      value={espacioFin}
                      onChange={(e) => setEspacioFin(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="rde-field">
                  <CustomSelect
                    label="Estado de la sesión:"
                    value={espacioEstado}
                    onChange={(val) => setEspacioEstado(val)}
                    options={espacioEstadoOptions}
                  />
                </div>
              </div>
            )}

            {/* TAB 3: COMPUTO */}
            {activeTab === 'computo' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="rde-field">
                  <CustomSelect
                    label="Equipo de cómputo:"
                    value={computoEquipoId}
                    onChange={(val) => setComputoEquipoId(val)}
                    options={equiposOptions}
                    placeholder="-- Seleccionar equipo --"
                  />
                </div>

                <div className="rde-field">
                  <CustomSelect
                    label="Usuario:"
                    value={computoUser}
                    onChange={(val) => setComputoUser(val)}
                    options={usuariosShortOptions}
                    placeholder="-- Seleccionar usuario --"
                  />
                </div>

                <div className="rde-field">
                  <label className="rde-label">Duración de la sesión (minutos):</label>
                  <input
                    className="rde-input"
                    type="number"
                    min="15"
                    step="15"
                    value={computoDuracion}
                    onChange={(e) => setComputoDuracion(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {/* TAB 4: BAJA/INVENTARIO */}
            {activeTab === 'baja' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="rde-field">
                  <CustomSelect
                    label="Ejemplar físico:"
                    value={bajaEjemplarId}
                    onChange={(val) => setBajaEjemplarId(val)}
                    options={ejemplaresOptions}
                    placeholder="-- Seleccionar ejemplar --"
                  />
                </div>

                <div className="rde-field">
                  <CustomSelect
                    label="Nuevo estado:"
                    value={bajaEstado}
                    onChange={(val) => setBajaEstado(val)}
                    options={bajaEstadoOptions}
                  />
                </div>

                <div className="rde-field">
                  <label className="rde-label">Observaciones / Dictamen:</label>
                  <textarea
                    className="rde-textarea"
                    value={bajaMotivo}
                    onChange={(e) => setBajaMotivo(e.target.value)}
                    placeholder="Ej. Daño severo en encuadernación por humedad..."
                    rows={2}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="rde-footer" style={{ padding: '0 1.5rem 1.25rem' }}>
            <button
              type="button"
              className="rde-btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rde-btn-save"
              disabled={loading}
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
