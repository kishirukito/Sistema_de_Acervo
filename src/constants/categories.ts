/**
 * Fuente única de verdad para las categorías bibliográficas del Sistema de Acervo.
 * Basado en las 10 clases principales del Sistema Dewey de Clasificación.
 */

export interface BibliographicCategory {
  /** Código numérico de tres dígitos con ceros iniciales ("000", "100", etc.) */
  code: string;
  /** Nombre oficial de la categoría sin código */
  name: string;
  /** Etiqueta oficial combinada "CÓDIGO — NOMBRE" */
  label: string;
}

export const BIBLIOGRAPHIC_CATEGORIES: readonly BibliographicCategory[] = [
  {
    code: '000',
    name: 'Ciencias de las Computadoras, Información y Obras Generales',
    label: '000 — Ciencias de las Computadoras, Información y Obras Generales',
  },
  {
    code: '100',
    name: 'Filosofía y Psicología',
    label: '100 — Filosofía y Psicología',
  },
  {
    code: '200',
    name: 'Religión',
    label: '200 — Religión',
  },
  {
    code: '300',
    name: 'Ciencias Sociales',
    label: '300 — Ciencias Sociales',
  },
  {
    code: '400',
    name: 'Lenguas',
    label: '400 — Lenguas',
  },
  {
    code: '500',
    name: 'Ciencias',
    label: '500 — Ciencias',
  },
  {
    code: '600',
    name: 'Tecnología',
    label: '600 — Tecnología',
  },
  {
    code: '700',
    name: 'Artes y Recreación',
    label: '700 — Artes y Recreación',
  },
  {
    code: '800',
    name: 'Literatura',
    label: '800 — Literatura',
  },
  {
    code: '900',
    name: 'Historia y Geografía',
    label: '900 — Historia y Geografía',
  },
] as const;

export type BibliographicCategoryCode = (typeof BIBLIOGRAPHIC_CATEGORIES)[number]['code'];

export const VALID_CATEGORY_CODES: readonly string[] = BIBLIOGRAPHIC_CATEGORIES.map((c) => c.code);

/**
 * Mapa de correspondencias para migración y compatibilidad con categorías anteriores.
 */
export const LEGACY_CATEGORY_MAPPING: Record<string, string> = {
  // Informática y software -> 000
  'ingeniería de software': '000',
  'ingenieria de software': '000',
  'patrones de diseño': '000',
  'patrones de diseno': '000',
  'arquitectura de software': '000',
  'sistemas distribuidos': '000',
  'metodologías de desarrollo': '000',
  'metodologias de desarrollo': '000',
  'bases de datos': '000',
  'redes y telecomunicaciones': '000',
  'programación': '000',
  'programacion': '000',

  // Filosofía, psicología y desarrollo personal -> 100
  'filosofía': '100',
  'filosofia': '100',
  'psicología': '100',
  'psicologia': '100',
  'desarrollo personal': '100',
  'autoayuda': '100',

  // Religión -> 200
  'religión': '200',
  'religion': '200',
  'teología': '200',
  'teologia': '200',

  // Ciencias sociales -> 300
  'ciencias sociales': '300',
  'sociología': '300',
  'sociologia': '300',
  'política': '300',
  'politica': '300',
  'derecho': '300',
  'economía': '300',
  'economia': '300',

  // Lenguas -> 400
  'lenguas': '400',
  'idiomas': '400',
  'lingüística': '400',
  'linguistica': '400',

  // Ciencias -> 500
  'ciencias': '500',
  'ciencia': '500',
  'física': '500',
  'fisica': '500',
  'química': '500',
  'quimica': '500',
  'biología': '500',
  'biologia': '500',
  'matemáticas': '500',
  'matematicas': '500',

  // Tecnología y gestión -> 600
  'tecnología': '600',
  'tecnologia': '600',
  'technology': '600',
  'administración': '600',
  'administracion': '600',
  'administración de empresas': '600',
  'administracion de empresas': '600',
  'administration': '600',
  'medicina': '600',
  'ingeniería': '600',
  'ingenieria': '600',

  // Artes y recreación -> 700
  'arte': '700',
  'artes': '700',
  'artes y recreación': '700',
  'artes y recreacion': '700',
  'música': '700',
  'musica': '700',
  'deportes': '700',

  // Literatura, novela, ficción, infantil -> 800
  'literatura': '800',
  'literatura universal': '800',
  'novela': '800',
  'novel': '800',
  'infantil': '800',
  'children': '800',
  'clásicos': '800',
  'clasicos': '800',
  'ciencia ficción': '800',
  'ciencia ficcion': '800',
  'poesía': '800',
  'poesia': '800',

  // Historia y geografía -> 900
  'historia': '900',
  'history': '900',
  'geografía': '900',
  'geografia': '900',
  'historia de méxico': '900',
  'historia de mexico': '900',
};

/**
 * Resuelve una categoría bibliográfica a partir de un código ("000"), nombre o etiqueta legacy.
 */
export const resolveCategory = (input?: string | null): BibliographicCategory | undefined => {
  if (!input) return undefined;
  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();

  // 1. Coincidencia directa por código exacto ("000", "100", etc.)
  const byCode = BIBLIOGRAPHIC_CATEGORIES.find((c) => c.code === trimmed);
  if (byCode) return byCode;

  // 2. Coincidencia por nombre exacto o etiqueta completa ("000 — ...")
  const byNameOrLabel = BIBLIOGRAPHIC_CATEGORIES.find(
    (c) => c.name.toLowerCase() === lower || c.label.toLowerCase() === lower
  );
  if (byNameOrLabel) return byNameOrLabel;

  // 3. Coincidencia si el texto empieza con "XXX — " o "XXX - "
  const prefixMatch = trimmed.match(/^(\d{3})\s*[-—]/);
  if (prefixMatch && prefixMatch[1]) {
    const fromPrefix = BIBLIOGRAPHIC_CATEGORIES.find((c) => c.code === prefixMatch[1]);
    if (fromPrefix) return fromPrefix;
  }

  // 4. Mapeo de términos legados
  const mappedCode = LEGACY_CATEGORY_MAPPING[lower];
  if (mappedCode) {
    return BIBLIOGRAPHIC_CATEGORIES.find((c) => c.code === mappedCode);
  }

  return undefined;
};

/**
 * Devuelve la etiqueta oficial completa: "CÓDIGO — NOMBRE".
 */
export const getCategoryFullLabel = (input?: string | null): string => {
  const cat = resolveCategory(input);
  return cat ? cat.label : input || '';
};

/**
 * Devuelve solo el nombre de la categoría sin código.
 */
export const getCategoryName = (input?: string | null): string => {
  const cat = resolveCategory(input);
  return cat ? cat.name : input || '';
};

/**
 * Devuelve el código de tres dígitos de la categoría.
 */
export const getCategoryCode = (input?: string | null): string => {
  const cat = resolveCategory(input);
  return cat ? cat.code : input || '';
};

/**
 * Opciones preparadas para elementos <select> o listas desplegables.
 * Cada opción tiene label: "CÓDIGO — NOMBRE" y value: "CÓDIGO".
 */
export const CATEGORY_SELECT_OPTIONS = BIBLIOGRAPHIC_CATEGORIES.map((c) => ({
  label: c.label,
  value: c.code,
}));
