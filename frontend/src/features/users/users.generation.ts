/**
 * users.generation.ts — Lógica de derivación de generación y validación de adeudos
 * para el módulo de Gestión de Usuarios.
 *
 * REGLA INSTITUCIONAL:
 * - Los primeros 2 dígitos de la matrícula corresponden al año de ingreso (ej. 23 -> 2023).
 * - Los siguientes 2 dígitos corresponden al cuatrimestre o periodo de ingreso (ej. 03 -> periodo 3).
 *
 * VALIDACIONES ESTRICTAS:
 * - Solo se calcula si la matrícula tiene formato numérico institucional confiable (al menos 6 dígitos).
 * - Si está vacía, no existe o es código de empleado / nómina (ej. "EMP-014"), retorna null ("No disponible").
 * - No modifica la base de datos ni altera registros.
 */

import type { ManagedUser } from './users.types';

export interface UserGeneration {
  year: number;          // ej. 2023
  period: string;        // ej. "03"
  periodNumber: number;  // ej. 3
  label: string;         // "2023"
  fullLabel: string;     // "Generación 2023 (Cuatrimestre 03)"
  isPast: boolean;       // verdadero si el año es menor al año calendario actual
}

export interface UserAdeudoCheck {
  hasAdeudo: boolean;
  reasons: string[];
}

/**
 * Deriva de forma segura la generación y periodo de ingreso a partir de la matrícula.
 * Retorna null si la matrícula no permite identificarla de forma confiable.
 */
export function extractGeneration(matriculaOrCode?: string | null): UserGeneration | null {
  if (!matriculaOrCode || typeof matriculaOrCode !== 'string') {
    return null;
  }

  const clean = matriculaOrCode.trim();

  // Las matrículas de alumnos en la UP Durango tienen entre 8 y 10 dígitos numéricos (ej. 2303150021).
  // Exigir al menos 6 dígitos puramente numéricos al inicio para descartar UUIDs, folios cortos o claves como "EMP-014".
  if (!/^\d{6,}$/.test(clean)) {
    return null;
  }

  const yy = parseInt(clean.slice(0, 2), 10);
  const periodStr = clean.slice(2, 4);
  const periodNum = parseInt(periodStr, 10);

  // Validación de rango: año de 2 dígitos y periodo cuatrimestral razonable (1 a 3 en cuatrimestral, hasta 12)
  if (isNaN(yy) || isNaN(periodNum) || periodNum < 1 || periodNum > 12) {
    return null;
  }

  // Conversión a 4 dígitos para años universitarios (2000-2099)
  const year = 2000 + yy;
  const currentYear = new Date().getFullYear();

  return {
    year,
    period: periodStr,
    periodNumber: periodNum,
    label: `${year}`,
    fullLabel: `Generación ${year} (Cuatrimestre ${periodStr})`,
    isPast: year < currentYear,
  };
}

export interface GetAvailableGenerationsOptions {
  /**
   * Si es true (por defecto), solo considera usuarios con estado 'ACTIVE' o 'SUSPENDED'.
   * Excluye a los usuarios 'INACTIVE' (eliminados de las generaciones vigentes del sistema).
   */
  onlyActive?: boolean;
  /**
   * Opcionalmente filtrar por categoría institucional (ej. 'STUDENT').
   */
  category?: string;
}

/**
 * Obtiene la lista de años de generación únicos presentes actualmente en el sistema,
 * ordenados de mayor a menor (los más recientes primero).
 * Se actualiza reactivamente al agregar nuevos alumnos o al desactivar/eliminar generaciones viejas.
 */
export function getAvailableGenerations(
  users: ManagedUser[],
  options?: GetAvailableGenerationsOptions
): number[] {
  const onlyActive = options?.onlyActive ?? true;
  const yearsSet = new Set<number>();

  for (const u of users) {
    // Si se requieren solo las generaciones presentes y vigentes, excluir usuarios inactivos
    if (onlyActive && u.status === 'INACTIVE') {
      continue;
    }

    if (options?.category && u.category && u.category !== options.category) {
      continue;
    }

    const gen = extractGeneration(u.matricula || u.borrowerCode);
    if (gen) {
      yearsSet.add(gen.year);
    }
  }

  return Array.from(yearsSet).sort((a, b) => b - a);
}

/**
 * Verifica si un usuario tiene algún adeudo, préstamo activo o sanción que impida su desactivación.
 * REGLA: Los usuarios con adeudos o préstamos activos NUNCA deben desactivarse.
 */
export function checkUserAdeudos(
  user: ManagedUser,
  pendingSanctionsSet?: Set<string>
): UserAdeudoCheck {
  const reasons: string[] = [];

  if (user.activeLoans > 0) {
    reasons.push(`${user.activeLoans} préstamo(s) activo(s)`);
  }

  if (user.hasOverdueLoan) {
    reasons.push('Préstamo con vencimiento o atraso');
  }

  if (user.status === 'SUSPENDED') {
    reasons.push('Usuario con suspensión administrativa');
  }

  if (pendingSanctionsSet && pendingSanctionsSet.has(user.id)) {
    reasons.push('Multa o sanción pendiente de pago');
  }

  return {
    hasAdeudo: reasons.length > 0,
    reasons,
  };
}
