import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { successResponse, errorResponse, handleApiError } from '@/lib/errors';
import { registrarAuditoria } from '@/lib/audit';

interface Params {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/books/[id]
 * Detalle completo de una obra, sus ejemplares físicos y su análisis de IA.
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const { data: book, error } = await supabaseAdmin
      .from('libros')
      .select('*, ejemplares(*), resumenes_ia(*), libro_temas(temas(*))')
      .eq('id', id)
      .single();

    if (error || !book) {
      return errorResponse('Libro no encontrado en el acervo', 404);
    }

    return successResponse(book);
  } catch (error) {
    return handleApiError(error, 'Fallo al obtener ficha técnica del libro');
  }
}

/**
 * PUT /api/books/[id]
 * Edición de información bibliográfica de un libro existente.
 */
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { titulo, autor, editorial, anio_publicacion, edicion, portada_url, isbn, usuario_id } = body;

    // Verificar existencia previa
    const { data: previousBook, error: findError } = await supabaseAdmin
      .from('libros')
      .select('*')
      .eq('id', id)
      .single();

    if (findError || !previousBook) {
      return errorResponse('El libro a actualizar no existe.', 404);
    }

    const updatePayload: Record<string, any> = {};
    if (titulo !== undefined) updatePayload.titulo = titulo.trim();
    if (autor !== undefined) updatePayload.autor = autor.trim();
    if (editorial !== undefined) updatePayload.editorial = editorial?.trim() || null;
    if (anio_publicacion !== undefined) updatePayload.anio_publicacion = anio_publicacion ? parseInt(anio_publicacion, 10) : null;
    if (edicion !== undefined) updatePayload.edicion = edicion?.trim() || null;
    if (portada_url !== undefined) updatePayload.portada_url = portada_url;
    if (isbn !== undefined) updatePayload.isbn = isbn.trim();

    const { data: updatedBook, error: updateError } = await supabaseAdmin
      .from('libros')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (updateError || !updatedBook) {
      return errorResponse(`Error al actualizar el libro: ${updateError?.message}`, 500);
    }

    // Registrar en auditoría
    await registrarAuditoria({
      usuario_id: usuario_id || null,
      accion: 'UPDATE_BOOK',
      tabla_afectada: 'libros',
      registro_id: id,
      detalle_cambio: {
        antes: previousBook,
        despues: updatedBook,
      },
    });

    return successResponse(updatedBook);
  } catch (error) {
    return handleApiError(error, 'Fallo al actualizar el libro');
  }
}

/**
 * DELETE /api/books/[id]
 * Eliminación o baja del libro. Valida que no tenga ejemplares con préstamos activos.
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const usuario_id = searchParams.get('usuario_id');

    // Verificar si tiene ejemplares en préstamo activo
    const { data: activeLoans } = await supabaseAdmin
      .from('prestamos')
      .select('id, ejemplares!inner(libro_id)')
      .eq('ejemplares.libro_id', id)
      .eq('estado', 'activo');

    if (activeLoans && activeLoans.length > 0) {
      return errorResponse('No se puede dar de baja el libro porque tiene ejemplares en préstamo activo.', 400);
    }

    // Obtener datos antes de eliminar para el log
    const { data: bookToDelete } = await supabaseAdmin
      .from('libros')
      .select('isbn, titulo')
      .eq('id', id)
      .single();

    const { error: deleteError } = await supabaseAdmin
      .from('libros')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return errorResponse(`Error al eliminar libro: ${deleteError.message}`, 500);
    }

    // Registrar en auditoría
    await registrarAuditoria({
      usuario_id: usuario_id || null,
      accion: 'DELETE_BOOK',
      tabla_afectada: 'libros',
      registro_id: id,
      detalle_cambio: { eliminado: bookToDelete || { id } },
    });

    return successResponse({ mensaje: 'Libro y sus relaciones eliminados correctamente', id });
  } catch (error) {
    return handleApiError(error, 'Fallo al eliminar el libro');
  }
}
