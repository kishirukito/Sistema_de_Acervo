import { NextRequest } from 'next/server';
import { aiClient } from '@/lib/ai-client';
import { successResponse, errorResponse, handleApiError } from '@/lib/errors';

/**
 * POST /api/ai/sugerencias
 * Orquesta la petición hacia el microservicio de IA en Python para búsqueda temática.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return errorResponse('El parámetro query es obligatorio.', 400);
    }

    const resultado = await aiClient.sugerirTopicos(query);
    return successResponse(resultado);
  } catch (error) {
    return handleApiError(error, 'Fallo al solicitar sugerencias al microservicio de IA');
  }
}
