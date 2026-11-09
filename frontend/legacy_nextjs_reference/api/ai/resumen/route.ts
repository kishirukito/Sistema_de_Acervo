import { NextRequest } from 'next/server';
import { aiClient } from '@/lib/ai-client';
import { successResponse, errorResponse, handleApiError } from '@/lib/errors';

/**
 * POST /api/ai/resumen
 * Orquesta la petición hacia el microservicio de IA en Python para generar resumen.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { titulo, autor, sinopsis_o_tema } = body;

    if (!titulo || !autor) {
      return errorResponse('Se requiere título y autor para generar el resumen IA.', 400);
    }

    const resultado = await aiClient.generarResumen(titulo, autor, sinopsis_o_tema);
    return successResponse(resultado);
  } catch (error) {
    return handleApiError(error, 'Fallo al solicitar resumen al microservicio de IA');
  }
}
