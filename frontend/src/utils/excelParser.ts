import * as XLSX from 'xlsx';

/**
 * Normaliza una cadena de texto para comparación de cabeceras:
 * minúsculas, sin acentos ni caracteres especiales, sin espacios dobles.
 */
function normalizeKey(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/[\s_\-]+/g, '_');
}

/**
 * Mapeo de sinónimos comunes para cabeceras de Libros
 */
const BOOK_HEADER_MAP: Record<string, string> = {
  isbn: 'isbn',
  codigo_isbn: 'isbn',
  titulo: 'titulo',
  title: 'titulo',
  nombre_libro: 'titulo',
  autor: 'autor',
  autores: 'autor',
  author: 'autor',
  editorial: 'editorial',
  publisher: 'editorial',
  anio: 'anio_publicacion',
  ano: 'anio_publicacion',
  anio_publicacion: 'anio_publicacion',
  ano_publicacion: 'anio_publicacion',
  year: 'anio_publicacion',
  publish_year: 'anio_publicacion',
  categoria: 'categoria',
  dewey: 'categoria',
  clasificacion: 'categoria',
  clasificacion_dewey: 'categoria',
  category: 'categoria',
  ejemplares: 'ejemplares_iniciales',
  copias: 'ejemplares_iniciales',
  total_copias: 'ejemplares_iniciales',
  cantidad: 'ejemplares_iniciales',
  ejemplares_iniciales: 'ejemplares_iniciales',
  ubicacion: 'ubicacion',
  estante: 'ubicacion',
  location: 'ubicacion',
  edicion: 'edicion',
  edition: 'edicion',
  resumen: 'resumen',
  descripcion: 'resumen',
  description: 'resumen',
  summary: 'resumen',
};

/**
 * Mapeo de sinónimos comunes para cabeceras de Usuarios / Alumnos
 */
const USER_HEADER_MAP: Record<string, string> = {
  matricula: 'matricula_o_nomina',
  codigo: 'matricula_o_nomina',
  matricula_o_nomina: 'matricula_o_nomina',
  clave: 'matricula_o_nomina',
  borrower_code: 'matricula_o_nomina',
  nombre: 'nombre_completo',
  nombre_completo: 'nombre_completo',
  full_name: 'nombre_completo',
  alumno: 'nombre_completo',
  usuario: 'nombre_completo',
  email: 'email',
  correo: 'email',
  correo_electronico: 'email',
  correo_institucional: 'email',
  telefono: 'telefono',
  phone: 'telefono',
  celular: 'telefono',
  rol: 'rol',
  role: 'rol',
  tipo: 'rol',
  tipo_usuario: 'rol',
  carrera: 'dependencia_o_area',
  carrera_id: 'carrera_id',
  programa: 'dependencia_o_area',
  facultad: 'dependencia_o_area',
  dependencia: 'dependencia_o_area',
  dependencia_o_area: 'dependencia_o_area',
};

/**
 * Parsea un archivo subido (.xlsx, .xls, .csv, .tsv) y devuelve filas normalizadas en JSON.
 */
export async function parseSpreadsheetFile(
  file: File,
  type: 'books' | 'users'
): Promise<Array<Record<string, any>>> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });

  if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
    throw new Error('El archivo no contiene hojas de cálculo válidas.');
  }

  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  // Convertir a array de objetos con cabeceras originales
  const rawRows: Array<Record<string, any>> = XLSX.utils.sheet_to_json(worksheet, {
    defval: '',
    raw: false,
  });

  if (!rawRows || rawRows.length === 0) {
    throw new Error('La hoja de cálculo está vacía.');
  }

  const map = type === 'books' ? BOOK_HEADER_MAP : USER_HEADER_MAP;

  // Normalizar nombres de columnas para cada fila
  return rawRows.map((row) => {
    const normalizedRow: Record<string, any> = {};
    for (const [key, val] of Object.entries(row)) {
      const cleanKey = normalizeKey(key);
      const targetField = map[cleanKey] || cleanKey;
      normalizedRow[targetField] = typeof val === 'string' ? val.trim() : val;
    }
    return normalizedRow;
  });
}

/**
 * Genera y descarga una plantilla oficial con ejemplos listos para rellenar.
 */
export function downloadTemplate(type: 'books' | 'users', format: 'xlsx' | 'csv' = 'xlsx') {
  let sampleData: Record<string, any>[] = [];
  let fileName = '';

  if (type === 'books') {
    fileName = `plantilla_carga_libros.${format}`;
    sampleData = [
      {
        isbn: '978-607-15-0001-4',
        titulo: 'Cálculo Diferencial e Integral',
        autor: 'James Stewart',
        editorial: 'Cengage Learning',
        anio_publicacion: 2024,
        categoria: '510 - Matemáticas',
        ejemplares: 3,
        ubicacion: 'Estante A-1, Nivel 2',
        edicion: '8va Edición',
        resumen: 'Texto fundamental de cálculo para estudiantes de ingeniería.',
      },
      {
        isbn: '978-013-11-0362-7',
        titulo: 'The C Programming Language',
        autor: 'Brian W. Kernighan, Dennis M. Ritchie',
        editorial: 'Prentice Hall',
        anio_publicacion: 2023,
        categoria: '004 - Computación',
        ejemplares: 2,
        ubicacion: 'Estante B-3, Nivel 1',
        edicion: '2da Edición',
        resumen: 'Referencia clásica y canónica de programación en lenguaje C.',
      },
    ];
  } else {
    fileName = `plantilla_carga_alumnos.${format}`;
    sampleData = [
      {
        matricula: '2303150001',
        nombre_completo: 'Carlos Eduardo Mendoza Soto',
        email: 'c.mendoza.isw@unipolidgo.edu.mx',
        telefono: '618 123 4567',
        rol: 'Alumno',
        carrera: 'Ingeniería en Software',
      },
      {
        matricula: '2303150002',
        nombre_completo: 'Mariana Paulina Silva Torres',
        email: 'm.silva.ita@unipolidgo.edu.mx',
        telefono: '618 987 6543',
        rol: 'Alumno',
        carrera: 'Ingeniería en Telemática',
      },
      {
        matricula: 'EMP-014',
        nombre_completo: 'Mtro. Roberto Carlos Morales',
        email: 'r.morales@upd.edu.mx',
        telefono: '618 555 1234',
        rol: 'Docente',
        carrera: 'División de Tecnologías de Información',
      },
    ];
  }

  const worksheet = XLSX.utils.json_to_sheet(sampleData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

  if (format === 'csv') {
    XLSX.writeFile(workbook, fileName, { bookType: 'csv' });
  } else {
    XLSX.writeFile(workbook, fileName, { bookType: 'xlsx' });
  }
}
