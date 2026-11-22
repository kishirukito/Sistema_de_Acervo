import React, { useState, useRef } from 'react';
import {
  FileSpreadsheet,
  UploadCloud,
  FileDown,
  CheckCircle2,
  AlertTriangle,
  X,
  FileText,
  Users,
} from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { parseSpreadsheetFile, downloadTemplate } from '../../../utils/excelParser';
import { importUsersBulk, type BulkImportResponse } from '../../../services/api/bulk-import.service';
import '../../catalog/components/BulkImportBooksModal.css';

interface BulkImportUsersModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (count: number) => void;
}

export const BulkImportUsersModal: React.FC<BulkImportUsersModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedRows, setParsedRows] = useState<Array<Record<string, any>>>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<BulkImportResponse | null>(null);

  const handleReset = () => {
    setSelectedFile(null);
    setParsedRows([]);
    setParseError(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleModalClose = () => {
    if (isSubmitting) return;
    handleReset();
    onClose();
  };

  const processFile = async (file: File) => {
    try {
      setParseError(null);
      setResult(null);
      setSelectedFile(file);
      const rows = await parseSpreadsheetFile(file, 'users');
      setParsedRows(rows);
    } catch (err: any) {
      setParseError(err?.message || 'Error al procesar el archivo.');
      setSelectedFile(null);
      setParsedRows([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  // Pre-evaluación de filas de alumnos/usuarios
  const evaluatedRows = parsedRows.map((row, idx) => {
    const matricula = String(row.matricula_o_nomina || '').trim();
    const nombre = String(row.nombre_completo || '').trim();
    const email = String(row.email || '').trim().toLowerCase();
    const rol = String(row.rol || 'Alumno').trim();
    const carrera = String(row.dependencia_o_area || '').trim();

    const issues: string[] = [];
    if (!nombre) issues.push('Falta nombre');
    if (!email || !email.includes('@')) issues.push('Correo inválido');
    if (!matricula) issues.push('Falta matrícula');

    const isValid = issues.length === 0;

    return {
      index: idx + 1,
      matricula: matricula || 'N/A',
      nombre: nombre || '(Sin nombre)',
      email: email || 'N/A',
      rol,
      carrera: carrera || 'N/A',
      telefono: row.telefono || 'N/A',
      isValid,
      issues: issues.join(', '),
      data: row,
    };
  });

  const validCount = evaluatedRows.filter((r) => r.isValid).length;
  const invalidCount = evaluatedRows.filter((r) => !r.isValid).length;

  const handleConfirmImport = async () => {
    const rowsToImport = evaluatedRows.filter((r) => r.isValid).map((r) => r.data);
    if (rowsToImport.length === 0) return;

    setIsSubmitting(true);
    setParseError(null);

    try {
      const resp = await importUsersBulk(rowsToImport);
      setResult(resp);
      if (resp.successful_count > 0) {
        onSuccess(resp.successful_count);
      }
    } catch (err: any) {
      setParseError(err?.message || 'Error de comunicación al importar usuarios.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      size="large"
      title="Carga masiva de alumnos y usuarios"
      description="Sube un archivo de Excel (.xlsx) o CSV con el listado institucional de alumnos o docentes para registrarlos simultáneamente."
      icon={<Users size={22} color="var(--color-primary, #1E40AF)" />}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', width: '100%' }}>
          <Button variant="outline" onClick={handleModalClose} disabled={isSubmitting}>
            {result ? 'Cerrar' : 'Cancelar'}
          </Button>

          {!result && (
            <Button
              variant="primary"
              disabled={validCount === 0 || isSubmitting}
              isLoading={isSubmitting}
              leftIcon={<UploadCloud size={16} />}
              onClick={handleConfirmImport}
            >
              {isSubmitting
                ? 'Importando usuarios...'
                : `Importar ${validCount} usuario${validCount === 1 ? '' : 's'}`}
            </Button>
          )}
        </div>
      }
    >
      <div className="bulk-import-container">
        {/* Plantillas de descarga */}
        <div className="bulk-import-templates">
          <div className="bulk-import-templates-info">
            <FileText size={18} color="var(--color-primary, #1E40AF)" />
            <span>Descarga el formato oficial para importar alumnos y usuarios:</span>
          </div>
          <div className="bulk-import-templates-actions">
            <button
              type="button"
              className="bulk-import-template-btn"
              onClick={() => downloadTemplate('users', 'xlsx')}
              title="Descargar plantilla de alumnos en Excel"
            >
              <FileDown size={14} />
              <span>Plantilla Excel (.xlsx)</span>
            </button>
            <button
              type="button"
              className="bulk-import-template-btn"
              onClick={() => downloadTemplate('users', 'csv')}
              title="Descargar plantilla de alumnos en CSV"
            >
              <FileDown size={14} />
              <span>Plantilla CSV</span>
            </button>
          </div>
        </div>

        {/* Zona de Drop o Selección */}
        {!selectedFile ? (
          <div
            className="bulk-import-dropzone"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls, .csv, text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <div className="bulk-import-dropzone-icon">
              <UploadCloud size={26} />
            </div>
            <h4 className="bulk-import-dropzone-title">
              Arrastra tu archivo aquí o haz clic para examinar
            </h4>
            <p className="bulk-import-dropzone-hint">
              Formatos aceptados: Microsoft Excel (.xlsx, .xls) o archivo delimitado por comas (.csv)
            </p>
          </div>
        ) : (
          <div className="bulk-import-file-badge">
            <div className="bulk-import-file-info">
              <FileSpreadsheet size={20} />
              <span>{selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
            </div>
            {!isSubmitting && !result && (
              <button
                type="button"
                className="bulk-import-file-remove"
                onClick={handleReset}
                aria-label="Quitar archivo"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}

        {/* Errores de lectura */}
        {parseError && (
          <div className="bulk-import-results bulk-import-results--warning">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B45309', fontWeight: 600 }}>
              <AlertTriangle size={18} />
              <span>Advertencia: {parseError}</span>
            </div>
          </div>
        )}

        {/* Previsualización previa */}
        {parsedRows.length > 0 && !result && (
          <>
            <div className="bulk-import-metrics">
              <div className="bulk-import-metric-card">
                <span className="bulk-import-metric-label">Filas en archivo</span>
                <span className="bulk-import-metric-value">{parsedRows.length}</span>
              </div>
              <div className="bulk-import-metric-card bulk-import-metric-card--success">
                <span className="bulk-import-metric-label">Listos para importar</span>
                <span className="bulk-import-metric-value">{validCount}</span>
              </div>
              <div className="bulk-import-metric-card bulk-import-metric-card--danger">
                <span className="bulk-import-metric-label">Incompletos</span>
                <span className="bulk-import-metric-value">{invalidCount}</span>
              </div>
            </div>

            <div className="bulk-import-table-wrapper">
              <table className="bulk-import-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Matrícula / Clave</th>
                    <th>Nombre completo</th>
                    <th>Correo institucional</th>
                    <th>Rol / Tipo</th>
                    <th>Carrera / Área</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluatedRows.slice(0, 100).map((row) => (
                    <tr
                      key={row.index}
                      className={row.isValid ? 'bulk-import-row--valid' : 'bulk-import-row--invalid'}
                    >
                      <td>{row.index}</td>
                      <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{row.matricula}</td>
                      <td style={{ fontWeight: 600 }}>{row.nombre}</td>
                      <td>{row.email}</td>
                      <td>{row.rol}</td>
                      <td>{row.carrera}</td>
                      <td>
                        {row.isValid ? (
                          <span className="bulk-import-status-tag bulk-import-status-tag--ok">
                            <CheckCircle2 size={12} />
                            Válido
                          </span>
                        ) : (
                          <span className="bulk-import-status-tag bulk-import-status-tag--err" title={row.issues}>
                            <AlertTriangle size={12} />
                            {row.issues}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {parsedRows.length > 100 && (
              <p style={{ fontSize: '0.75rem', color: '#64748B', margin: 0, textAlign: 'right' }}>
                Mostrando los primeros 100 registros de {parsedRows.length}.
              </p>
            )}
          </>
        )}

        {/* Resultados del proceso */}
        {result && (
          <div
            className={`bulk-import-results ${
              result.failed_count === 0
                ? 'bulk-import-results--success'
                : 'bulk-import-results--warning'
            }`}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
              <CheckCircle2 size={20} color={result.failed_count === 0 ? '#15803D' : '#D97706'} />
              <span>
                Carga masiva finalizada: {result.successful_count} usuario(s) registrado(s) exitosamente.
                {result.failed_count > 0 && ` (${result.failed_count} con observaciones)`}
              </span>
            </div>

            {result.failed.length > 0 && (
              <div style={{ marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#92400E' }}>
                  Detalle de registros no importados:
                </span>
                <ul className="bulk-import-errors-list">
                  {result.failed.map((err, i) => (
                    <li key={i}>
                      <strong>Fila {err.row} ({err.identifier}):</strong> {err.error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};
