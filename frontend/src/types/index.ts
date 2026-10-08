export type UserRole = 'alumno' | 'personal' | 'administrador';

export interface User {
  id: string;
  email: string;
  nombre_completo: string;
  matricula_o_nomina?: string;
  carrera_o_depto?: string;
  rol: UserRole;
  activo: boolean;
  creado_en?: string;
}

export interface Book {
  id: string;
  titulo: string;
  autor: string;
  isbn?: string;
  editorial?: string;
  año_edicion?: number;
  categoria?: string;
  sinopsis?: string;
  portada_url?: string;
  total_ejemplares: number;
  disponibles: number;
  resumen_ia?: string;
  palabras_clave_ia?: string;
}

export interface Loan {
  id: string;
  libro_id: string;
  libro_titulo?: string;
  usuario_id: string;
  usuario_nombre?: string;
  fecha_prestamo: string;
  fecha_devolucion_esperada: string;
  fecha_devolucion_real?: string;
  estado: 'activo' | 'devuelto' | 'vencido';
  observaciones?: string;
}

export interface AISummary {
  resumen: string;
  palabras_clave: string;
  modelo: string;
  proveedor: string;
}

export interface AISearchResult {
  query: string;
  topicos_relacionados: string[];
  total: number;
}
