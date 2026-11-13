/**
 * AI Service Client — Connects to the FastAPI microservice for summaries and smart search suggestions,
 * with automatic fallback between the Vite proxy and direct backend URL, and JWT authorization.
 */

export interface GenerateAISummaryParams {
  titulo: string;
  autor: string;
  sinopsis_o_tema?: string;
  libro_id?: string;
}

export interface AISummaryResult {
  resumen: string;
  palabras_clave?: string;
  modelo?: string;
  proveedor?: string;
  guardado_en_db?: boolean;
}

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('acervo_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function requestAISummary(params: GenerateAISummaryParams): Promise<AISummaryResult> {
  const payload = JSON.stringify({
    titulo: params.titulo.trim(),
    autor: params.autor ? params.autor.trim() : 'Autor especializado',
    sinopsis_o_tema: params.sinopsis_o_tema || 'Ciencias e Ingeniería',
    libro_id: params.libro_id || undefined,
  });

  const headers = getAuthHeaders();

  // 1. Try local proxy first
  try {
    const res = await fetch('/api/v1/ai/resumen', {
      method: 'POST',
      headers,
      body: payload,
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (proxyErr) {
    console.warn('[AIService] Proxy fetch failed, attempting direct 127.0.0.1:8000 connection:', proxyErr);
  }

  // 2. Direct connection to FastAPI (CORS is enabled on backend)
  const directRes = await fetch('http://127.0.0.1:8000/api/v1/ai/resumen', {
    method: 'POST',
    headers,
    body: payload,
  });

  if (!directRes.ok) {
    const errText = await directRes.text();
    throw new Error(`Microservicio de IA error ${directRes.status}: ${errText}`);
  }

  return await directRes.json();
}

/**
 * CORRECCIÓN 4: Conexión de búsqueda inteligente con el endpoint /api/v1/ai/sugerencias.
 * Genera tópicos, conceptos y términos relacionados mediante el modelo local de IA.
 */
export async function requestAISuggestions(query: string): Promise<string[]> {
  if (!query || !query.trim()) return [];

  const payload = JSON.stringify({ query: query.trim() });
  const headers = getAuthHeaders();

  // 1. Try local Vite proxy first
  try {
    const res = await fetch('/api/v1/ai/sugerencias', {
      method: 'POST',
      headers,
      body: payload,
    });
    if (res.ok) {
      const data = await res.json();
      return Array.isArray(data.topicos_relacionados) ? data.topicos_relacionados : [];
    }
  } catch (proxyErr) {
    console.warn('[AIService] Proxy sugerencias falló, intentando directo:', proxyErr);
  }

  // 2. Direct connection fallback
  try {
    const directRes = await fetch('http://127.0.0.1:8000/api/v1/ai/sugerencias', {
      method: 'POST',
      headers,
      body: payload,
    });

    if (directRes.ok) {
      const data = await directRes.json();
      return Array.isArray(data.topicos_relacionados) ? data.topicos_relacionados : [];
    }
  } catch (directErr) {
    console.warn('[AIService] Direct sugerencias falló:', directErr);
  }

  return [];
}

export interface SmartSearchResultItem {
  id: string;
  titulo: string;
  autores: string[];
  isbn?: string;
  ubicacion?: string;
  temas: string[];
  sinopsis?: string;
  ejemplares_disponibles: number;
  total_ejemplares: number;
  porcentaje_coincidencia: number;
  match_level: 'high' | 'medium' | 'standard';
  explicacion: string;
}

export interface SmartSearchResponse {
  query: string;
  total_encontrados: number;
  mensaje: string;
  resultados: SmartSearchResultItem[];
}

export async function requestSmartSearch(query: string, topK: number = 5): Promise<SmartSearchResponse> {
  const payload = JSON.stringify({ query: query.trim(), top_k: topK });
  const headers = getAuthHeaders();

  // 1. Try local proxy first
  try {
    const res = await fetch('/api/v1/ai/busqueda-inteligente', {
      method: 'POST',
      headers,
      body: payload,
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (proxyErr) {
    console.warn('[AIService] Proxy busqueda-inteligente failed, attempting direct:', proxyErr);
  }

  // 2. Direct connection fallback
  const directRes = await fetch('http://127.0.0.1:8000/api/v1/ai/busqueda-inteligente', {
    method: 'POST',
    headers,
    body: payload,
  });

  if (!directRes.ok) {
    const errText = await directRes.text();
    throw new Error(`Error en Búsqueda Inteligente (${directRes.status}): ${errText}`);
  }

  return await directRes.json();
}

export async function requestIndexAcervo(): Promise<{ indexados: number; total_libros: number; mensaje: string }> {
  const headers = getAuthHeaders();

  try {
    const res = await fetch('/api/v1/ai/indexar-acervo', {
      method: 'POST',
      headers,
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (proxyErr) {
    console.warn('[AIService] Proxy indexar-acervo failed, attempting direct:', proxyErr);
  }

  const directRes = await fetch('http://127.0.0.1:8000/api/v1/ai/indexar-acervo', {
    method: 'POST',
    headers,
  });

  if (!directRes.ok) {
    const errText = await directRes.text();
    throw new Error(`Error al indexar acervo (${directRes.status}): ${errText}`);
  }

  return await directRes.json();
}
