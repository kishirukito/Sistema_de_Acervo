import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any;
  timestamp: string;
}

/**
 * Genera una respuesta exitosa estandarizada en JSON.
 */
export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * Genera una respuesta de error estandarizada en JSON y registra el log en consola.
 */
export function errorResponse(message: string, status = 400, details?: any) {
  const timestamp = new Date().toISOString();
  console.error(`[API ERROR ${status}] ${timestamp}: ${message}`, details || '');

  return NextResponse.json(
    {
      success: false,
      error: message,
      details,
      timestamp,
    },
    { status }
  );
}

/**
 * Manejador centralizado de excepciones para Route Handlers.
 */
export function handleApiError(error: unknown, contextMessage = 'Error interno del servidor') {
  const timestamp = new Date().toISOString();
  const errorMessage = error instanceof Error ? error.message : String(error);

  console.error(`[UNHANDLED ERROR] ${timestamp} - ${contextMessage}:`, error);

  return NextResponse.json(
    {
      success: false,
      error: contextMessage,
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      timestamp,
    },
    { status: 500 }
  );
}
