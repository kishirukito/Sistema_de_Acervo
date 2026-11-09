import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { successResponse, errorResponse, handleApiError } from '@/lib/errors';
import { registrarAuditoria } from '@/lib/audit';

interface Params {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/books/[id]/ejemplares
 * Registra un ejemplar físico asociado a la obra bibliográfica.
 */
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id: bookId } = await params;
    const body = await request.json();
    const { codigo_inventario, ubicacion_estante, observaciones, usuario_id } = body;

    if (!codigo_inventario || !ubicacion_estante) {
      return errorResponse('El código de inventario y la ubicación en estante son obligatorios.', 400);
    }

    // Verificar que el libro exista
    const { data: book } = await supabaseAdmin.from('libros').select('id').eq('id', bookId).single();
    if (!book) {
      return errorResponse('El libro no existe.', 404);
    }

    // Verificar unicidad del código de inventario físico
    const { data: existingCopy } = await supabaseAdmin
      .from('ejemplares')
      .select('id')
      .eq('codigo_inventario', codigo_inventario.trim())
      .single();

    if (existingCopy) {
      return errorResponse(`Ya existe un ejemplar con el código de inventario ${codigo_inventario}.`, 409);
    }

    const { data: newEjemplar, error: insertError } = await supabaseAdmin
      .from('ejemplares')
      .insert({
        libro_id: bookId,
        codigo_inventario: codigo_inventario.trim(),
        ubicacion_estante: ubicacion_estante.trim(),
        estado: 'disponible',
        observaciones: observaciones?.trim() || null,
      })
      .select()
      .single();

    if (insertError || !newEjemplar) {
      return errorResponse(`Error al registrar ejemplar: ${insertError?.message}`, 500);
    }

    await registrarAuditoria({
      usuario_id: usuario_id || null,
      accion: 'CREATE_EJEMPLAR',
      tabla_afectada: 'ejemplares',
      registro_id: newEjemplar.id,
      detalle_cambio: {
        libro_id: bookId,
        codigo_inventario: newEjemplar.codigo_inventario,
        ubicacion: newEjemplar.ubicacion_estante,
      },
    });

    return successResponse(newEjemplar, 201);
  } catch (error) {
    return handleApiError(error, 'Fallo al agregar ejemplar al libro');
  }
}
