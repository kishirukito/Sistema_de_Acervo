import { apiClient } from './client';
import type { SiabucReportData } from '../../features/reports/reports.types';

export const DEFAULT_SIABUC_DATA: SiabucReportData = {
  circulacion: {
    total_prestamos: 0,
    prestamos_sala: 0,
    prestamos_domicilio: 0,
    renovaciones: 0,
    prestamos_por_tipo_usuario: [],
    prestamos_por_carrera: [],
    frecuencia_acervo: [],
    sanciones: {
      usuarios_sancionados: 0,
      total_sanciones: 0,
      monto_total: 0,
      monto_pendiente: 0,
      monto_recaudado: 0,
      por_tipo: [],
      detalle: [],
    },
  },
  procesos_tecnicos: {
    total_titulos: 0,
    total_ejemplares: 0,
    productividad_catalogador: [],
    altas_por_periodo: [],
  },
  inventario: {
    existencias_totales: 0,
    distribucion_estados: [],
    existencias_dewey: [],
    perdidos_o_bajas: 0,
  },
  servicios: {
    espacios: {
      total_espacios: 0,
      total_reservas: 0,
      uso_por_espacio: [],
      detalle_reservas: [],
    },
    computo: {
      total_equipos: 0,
      total_sesiones: 0,
      minutos_totales: 0,
      horas_totales: 0,
      detalle_sesiones: [],
    },
  },
  resumen_ejecutivo: {
    metricas: {
      totalLoans: 0,
      totalLoansGrowth: '0 registros',
      activeLoans: 0,
      returnedLoans: 0,
      returnedGrowth: '0 devueltos',
      overdueLoans: 0,
      overdueDifference: 'Sin retrasos',
    },
    tendencia_mensual: [],
    libros_top: [],
    distribucion_estados: [],
    categorias_solicitadas: [],
    actividad_reciente: [],
    alertas: {
      ejemplares_no_disponibles: 0,
      multas_pendientes: 0,
      prestamos_vencidos: 0,
    },
  },
  catalogos: {
    usuarios: [],
    espacios: [],
    equipos: [],
    ejemplares: [],
  },
};

export async function fetchSiabucReports(): Promise<SiabucReportData> {
  try {
    const res = await apiClient.get<SiabucReportData>('/v1/reports/siabuc');
    if (res.data && res.data.circulacion) {
      return res.data;
    }
  } catch (error) {
    console.warn('apiClient get failed, trying fallback /api/v1/reports/siabuc...', error);
    try {
      const fallbackRes = await fetch('/api/v1/reports/siabuc');
      if (fallbackRes.ok) {
        const json = await fallbackRes.json();
        if (json && json.circulacion) {
          return json;
        }
      }
    } catch (e2) {
      console.error('Error fetching SIABUC reports:', e2);
    }
  }

  return DEFAULT_SIABUC_DATA;
}

export async function createSancion(data: {
  usuario_id: string;
  tipo_sancion: string;
  monto_multa: number;
  estado_pago: string;
  motivo: string;
}) {
  const res = await fetch('/api/v1/reports/sancion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createReservaEspacio(data: {
  usuario_id: string;
  espacio_id: number;
  inicio: string;
  fin: string;
  estado?: string;
}) {
  const res = await fetch('/api/v1/reports/reserva-espacio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function createSesionComputo(data: {
  usuario_id: string;
  equipo_id: number;
  duracion_minutos: number;
}) {
  const res = await fetch('/api/v1/reports/sesion-computo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function updateEjemplarEstado(data: {
  ejemplar_id: string;
  estado: string;
  observaciones?: string;
}) {
  const res = await fetch('/api/v1/reports/ejemplar-estado', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
