import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  CalendarCog,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Users,
  Info,
  Loader2,
} from 'lucide-react';
import { CustomSelect } from '../../../components/ui/CustomSelect';
import { Button } from '../../../components/ui/Button';
import {
  extractGeneration,
  getAvailableGenerations,
  checkUserAdeudos,
} from '../users.generation';
import {
  updateManagedUser,
  fetchPendingSanctionsUserIds,
} from '../../../services/api/users-managed.service';
import type { ManagedUser } from '../users.types';
import './GenerationConfigModal.css';

interface GenerationConfigModalProps {
  open: boolean;
  onClose: () => void;
  users: ManagedUser[];
  onSuccess: (count: number, generationYear: number) => void;
}

export const GenerationConfigModal: React.FC<GenerationConfigModalProps> = ({
  open,
  onClose,
  users,
  onSuccess,
}) => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  // Lista de generaciones disponibles en el sistema con usuarios activos
  const availableYears = useMemo(
    () => getAvailableGenerations(users, { onlyActive: true }),
    [users]
  );

  // Generación seleccionada (por defecto la generación pasada más reciente si existe)
  const defaultSelectedYear = useMemo(() => {
    const pastYears = availableYears.filter((y) => y < currentYear);
    return pastYears.length > 0 ? String(pastYears[0]) : availableYears.length > 0 ? String(availableYears[0]) : '';
  }, [availableYears, currentYear]);

  const [selectedYearStr, setSelectedYearStr] = useState<string>(defaultSelectedYear);
  const [pendingSanctionsSet, setPendingSanctionsSet] = useState<Set<string>>(new Set());
  const [isLoadingSanctions, setIsLoadingSanctions] = useState<boolean>(false);

  // Estados del flujo de confirmación y ejecución
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressText, setProgressText] = useState<string>('');
  const [operationResult, setOperationResult] = useState<{
    success: boolean;
    deactivatedCount: number;
    errorCount: number;
    errorMessage?: string;
  } | null>(null);

  // Cargar sanciones pendientes de pago al abrir el modal
  useEffect(() => {
    if (open) {
      setSelectedYearStr(defaultSelectedYear);
      setIsConfirming(false);
      setOperationResult(null);
      setIsLoadingSanctions(true);
      fetchPendingSanctionsUserIds()
        .then((set) => setPendingSanctionsSet(set))
        .catch(() => setPendingSanctionsSet(new Set()))
        .finally(() => setIsLoadingSanctions(false));
    }
  }, [open, defaultSelectedYear]);

  // Manejo de tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open && !isProcessing) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, isProcessing, onClose]);

  const selectedYear = parseInt(selectedYearStr, 10);
  const isPastGeneration = !isNaN(selectedYear) && selectedYear < currentYear;

  // Filtrar los usuarios pertenecientes a la generación seleccionada
  const usersInGeneration = useMemo(() => {
    if (isNaN(selectedYear)) return [];
    return users.filter((u) => {
      const gen = extractGeneration(u.matricula || u.borrowerCode);
      return gen && gen.year === selectedYear;
    });
  }, [users, selectedYear]);

  // Clasificar usuarios según su estado y adeudos
  const { eligibleUsers, protectedUsers, alreadyInactiveUsers } = useMemo(() => {
    const eligible: ManagedUser[] = [];
    const protectedWithDebts: { user: ManagedUser; reasons: string[] }[] = [];
    const inactive: ManagedUser[] = [];

    for (const u of usersInGeneration) {
      if (u.status === 'INACTIVE') {
        inactive.push(u);
        continue;
      }

      const adeudoCheck = checkUserAdeudos(u, pendingSanctionsSet);
      if (adeudoCheck.hasAdeudo) {
        protectedWithDebts.push({ user: u, reasons: adeudoCheck.reasons });
      } else {
        eligible.push(u);
      }
    }

    return {
      eligibleUsers: eligible,
      protectedUsers: protectedWithDebts,
      alreadyInactiveUsers: inactive,
    };
  }, [usersInGeneration, pendingSanctionsSet]);

  if (!open) return null;

  // Ejecución segura de la desactivación
  const handleExecuteDeactivation = async () => {
    if (!isPastGeneration || eligibleUsers.length === 0 || isProcessing) {
      return;
    }

    setIsProcessing(true);
    setProgressText(`Preparando desactivación de ${eligibleUsers.length} usuarios...`);

    let deactivatedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < eligibleUsers.length; i++) {
      const u = eligibleUsers[i];
      setProgressText(`Desactivando (${i + 1} de ${eligibleUsers.length}): ${u.fullName}...`);

      try {
        const success = await updateManagedUser(u.id, { status: 'INACTIVE' });
        if (success) {
          deactivatedCount++;
        } else {
          errorCount++;
        }
      } catch {
        errorCount++;
      }
    }

    setIsProcessing(false);

    if (errorCount === 0 && deactivatedCount > 0) {
      setOperationResult({
        success: true,
        deactivatedCount,
        errorCount: 0,
      });
      onSuccess(deactivatedCount, selectedYear);
    } else if (deactivatedCount > 0) {
      setOperationResult({
        success: true,
        deactivatedCount,
        errorCount,
        errorMessage: `Se desactivaron ${deactivatedCount} usuarios, pero ${errorCount} no pudieron procesarse.`,
      });
      onSuccess(deactivatedCount, selectedYear);
    } else {
      setOperationResult({
        success: false,
        deactivatedCount: 0,
        errorCount,
        errorMessage: 'No se pudo desactivar ningún usuario. Verifica la conexión con el servidor.',
      });
    }
  };

  return (
    <div className="gen-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="gen-modal-title">
      <div className="gen-modal-card">
        {/* Encabezado */}
        <div className="gen-modal-header">
          <div className="gen-modal-header-icon" aria-hidden="true">
            <CalendarCog size={22} />
          </div>
          <div className="gen-modal-header-text">
            <h2 id="gen-modal-title" className="gen-modal-title">
              Configuración de generaciones
            </h2>
            <p className="gen-modal-subtitle">
              Revisión y desactivación segura de alumnos de generaciones pasadas.
            </p>
          </div>
          <button
            type="button"
            className="gen-modal-close-btn"
            onClick={onClose}
            disabled={isProcessing}
            aria-label="Cerrar ventana"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="gen-modal-body">
          {/* Pantalla de Resultado Posterior a la Operación */}
          {operationResult ? (
            <div className="gen-result-card">
              <div
                className={`gen-result-icon ${
                  operationResult.success ? 'gen-result-icon--success' : 'gen-result-icon--error'
                }`}
              >
                {operationResult.success ? <CheckCircle2 size={36} /> : <AlertTriangle size={36} />}
              </div>
              <h3 className="gen-result-title">
                {operationResult.success
                  ? 'Operación completada con éxito'
                  : 'Fallo al procesar la operación'}
              </h3>
              <p className="gen-result-desc">
                {operationResult.success
                  ? `Se desactivaron ${operationResult.deactivatedCount} usuarios de la Generación ${selectedYear}. Los usuarios con adeudos o préstamos activos se conservaron intactos.`
                  : operationResult.errorMessage}
              </p>
              <div className="gen-modal-actions" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
                <Button variant="primary" onClick={onClose}>
                  Aceptar y cerrar
                </Button>
              </div>
            </div>
          ) : isConfirming ? (
            /* Pantalla de Confirmación Explícita */
            <div className="gen-confirm-step">
              <div className="gen-confirm-banner">
                <AlertTriangle size={24} className="gen-confirm-warn-icon" />
                <div>
                  <h4 className="gen-confirm-heading">¿Confirmas la desactivación de esta generación?</h4>
                  <p className="gen-confirm-subtext">
                    Esta acción actualizará el estado a <strong>Inactivo</strong> para los alumnos de la{' '}
                    <strong>Generación {selectedYear}</strong> que <em>no</em> tengan adeudos registrados.
                  </p>
                </div>
              </div>

              <div className="gen-confirm-summary-box">
                <div className="gen-summary-row">
                  <span>Generación seleccionada:</span>
                  <strong>{selectedYear} (Pasada)</strong>
                </div>
                <div className="gen-summary-row gen-summary-row--highlight">
                  <span>Usuarios que serán desactivados:</span>
                  <strong style={{ color: '#2563EB' }}>{eligibleUsers.length} alumnos</strong>
                </div>
                <div className="gen-summary-row gen-summary-row--protected">
                  <span>Usuarios protegidos (con adeudos/préstamos):</span>
                  <strong style={{ color: '#DC2626' }}>{protectedUsers.length} alumnos</strong>
                </div>
                <div className="gen-summary-row">
                  <span>Usuarios previamente inactivos:</span>
                  <span>{alreadyInactiveUsers.length} alumnos</span>
                </div>
              </div>

              {protectedUsers.length > 0 && (
                <div className="gen-protected-list-box">
                  <span className="gen-protected-list-title">
                    <ShieldAlert size={14} /> Alumnos protegidos con adeudos o préstamos activos:
                  </span>
                  <ul className="gen-protected-items">
                    {protectedUsers.map(({ user, reasons }) => (
                      <li key={user.id}>
                        <strong>{user.fullName}</strong> ({user.borrowerCode}): {reasons.join(', ')}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {isProcessing && (
                <div className="gen-progress-banner">
                  <Loader2 size={18} className="gen-spinner" />
                  <span>{progressText}</span>
                </div>
              )}

              <div className="gen-modal-actions">
                <Button
                  variant="outline"
                  onClick={() => setIsConfirming(false)}
                  disabled={isProcessing}
                >
                  Volver a revisar
                </Button>
                <Button
                  variant="primary"
                  onClick={handleExecuteDeactivation}
                  disabled={isProcessing || eligibleUsers.length === 0}
                  className="gen-confirm-execute-btn"
                >
                  {isProcessing ? 'Procesando...' : `Confirmar y desactivar ${eligibleUsers.length} usuarios`}
                </Button>
              </div>
            </div>
          ) : (
            /* Pantalla Principal de Configuración y Selección */
            <>
              {/* Selector de Generación */}
              <div className="gen-selector-group">
                <label htmlFor="gen-select-input" className="gen-field-label">
                  Selecciona la generación de alumnos a consultar:
                </label>
                {availableYears.length === 0 ? (
                  <p className="gen-empty-notice">
                    No se detectaron generaciones en las matrículas de los usuarios registrados.
                  </p>
                ) : (
                  <CustomSelect
                    id="gen-select-input"
                    value={selectedYearStr}
                    onChange={(val) => setSelectedYearStr(val)}
                    options={availableYears.map((y) => ({
                      value: String(y),
                      label: `Generación ${y} ${y < currentYear ? '(Pasada / Concluida)' : '(En curso)'}`,
                    }))}
                    fullWidth
                  />
                )}
              </div>

              {/* Tarjetas de Indicadores de la Generación */}
              <div className="gen-kpi-grid">
                <div className="gen-kpi-card">
                  <div className="gen-kpi-icon gen-kpi-icon--total">
                    <Users size={18} />
                  </div>
                  <div>
                    <span className="gen-kpi-value">{usersInGeneration.length}</span>
                    <span className="gen-kpi-label">Total en generación</span>
                  </div>
                </div>

                <div className="gen-kpi-card">
                  <div className="gen-kpi-icon gen-kpi-icon--eligible">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <span className="gen-kpi-value">{eligibleUsers.length}</span>
                    <span className="gen-kpi-label">Activos sin adeudos</span>
                  </div>
                </div>

                <div className="gen-kpi-card">
                  <div className="gen-kpi-icon gen-kpi-icon--protected">
                    <ShieldAlert size={18} />
                  </div>
                  <div>
                    <span className="gen-kpi-value">{protectedUsers.length}</span>
                    <span className="gen-kpi-label">Con adeudos (Protegidos)</span>
                  </div>
                </div>
              </div>

              {/* Mensajes de Validación y Reglas de Negocio */}
              {!isPastGeneration ? (
                <div className="gen-alert-card gen-alert-card--info">
                  <Info size={18} className="gen-alert-icon" />
                  <div>
                    <strong>Generación en curso ({selectedYear})</strong>
                    <p>
                      Esta generación corresponde al ciclo escolar activo actual. La desactivación masiva
                      está restringida a generaciones concluidas o pasadas para evitar deshabilitar estudiantes
                      activos.
                    </p>
                  </div>
                </div>
              ) : eligibleUsers.length === 0 ? (
                <div className="gen-alert-card gen-alert-card--neutral">
                  <Info size={18} className="gen-alert-icon" />
                  <div>
                    <strong>No hay usuarios elegibles para desactivar</strong>
                    <p>
                      Todos los alumnos de esta generación ya se encuentran inactivos o tienen préstamos activos
                      y adeudos que impiden su desactivación.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="gen-alert-card gen-alert-card--ready">
                  <CheckCircle2 size={18} className="gen-alert-icon" />
                  <div>
                    <strong>{eligibleUsers.length} alumnos elegibles para desactivación segura</strong>
                    <p>
                      Ninguno de estos {eligibleUsers.length} alumnos tiene adeudos ni préstamos pendientes.
                      {protectedUsers.length > 0 &&
                        ` Los ${protectedUsers.length} usuarios con préstamos activos se conservarán intactos.`}
                    </p>
                  </div>
                </div>
              )}

              {/* Lista previa de usuarios de la generación */}
              {usersInGeneration.length > 0 && (
                <div className="gen-preview-section">
                  <span className="gen-preview-title">
                    Detalle de alumnos ({usersInGeneration.length}):
                  </span>
                  <div className="gen-preview-table-wrap">
                    <table className="gen-preview-table">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Matrícula</th>
                          <th>Estado actual</th>
                          <th>Préstamos activos</th>
                          <th>Acción / Diagnóstico</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersInGeneration.map((u) => {
                          const adeudo = checkUserAdeudos(u, pendingSanctionsSet);
                          const isEligible = isPastGeneration && u.status === 'ACTIVE' && !adeudo.hasAdeudo;

                          return (
                            <tr key={u.id}>
                              <td>{u.fullName}</td>
                              <td style={{ fontFamily: 'monospace' }}>{u.borrowerCode}</td>
                              <td>
                                <span
                                  className={`gen-status-pill ${
                                    u.status === 'ACTIVE' ? 'gen-status-pill--active' : 'gen-status-pill--inactive'
                                  }`}
                                >
                                  {u.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                                </span>
                              </td>
                              <td>
                                {u.activeLoans > 0 ? (
                                  <span className="gen-loans-tag gen-loans-tag--debt">
                                    {u.activeLoans} activo(s)
                                  </span>
                                ) : (
                                  <span className="gen-loans-tag">0</span>
                                )}
                              </td>
                              <td>
                                {isEligible ? (
                                  <span className="gen-eligibility-badge gen-eligibility-badge--eligible">
                                    Elegible para desactivar
                                  </span>
                                ) : adeudo.hasAdeudo ? (
                                  <span className="gen-eligibility-badge gen-eligibility-badge--protected">
                                    Protegido: {adeudo.reasons[0]}
                                  </span>
                                ) : (
                                  <span className="gen-eligibility-badge gen-eligibility-badge--neutral">
                                    Ya inactivo
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Botones de Acción */}
              <div className="gen-modal-actions">
                <Button variant="outline" onClick={onClose}>
                  Cerrar
                </Button>
                <Button
                  variant="primary"
                  disabled={!isPastGeneration || eligibleUsers.length === 0 || isLoadingSanctions}
                  onClick={() => setIsConfirming(true)}
                >
                  Proceder a desactivar ({eligibleUsers.length} usuarios)
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
