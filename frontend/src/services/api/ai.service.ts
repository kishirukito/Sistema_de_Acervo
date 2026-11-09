/**
 * AI Service Client — Connects to the FastAPI microservice for summaries,
 * with automatic fallback between the Vite proxy and direct backend URL.
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

export async function requestAISummary(params: GenerateAISummaryParams): Promise<AISummaryResult> {
  const payload = JSON.stringify({
    titulo: params.titulo.trim(),
    autor: params.autor ? params.autor.trim() : 'Autor especializado',
    sinopsis_o_tema: params.sinopsis_o_tema || 'Ciencias e Ingeniería',
    libro_id: params.libro_id || undefined,
  });

  // 1. Try local proxy first
  try {
    const res = await fetch('/api/v1/ai/resumen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    headers: { 'Content-Type': 'application/json' },
    body: payload,
  });

  if (!directRes.ok) {
    const errText = await directRes.text();
    throw new Error(`Microservicio de IA error ${directRes.status}: ${errText}`);
  }

  return await directRes.json();
}
