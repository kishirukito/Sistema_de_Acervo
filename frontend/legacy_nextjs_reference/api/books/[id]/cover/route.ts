import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { successResponse, errorResponse, handleApiError } from '@/lib/errors';
import { subirPortadaLibro, validarArchivoPortada } from '@/lib/storage';
import { registrarAuditoria } from '@/lib/audit';

interface Params {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/books/[id]/cover
 * Endpoint para subir la imagen de portada de un libro a Supabase Storage y asociarla al registro.
 */
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id: bookId } = await params;

    // Verificar que el libro exista
    const { data: book, error: bookError } = await supabaseAdmin
      .from('libros')
      .select('id, titulo')
      .eq('id', bookId)
      .single();

    if (bookError || !book) {
      return errorResponse('El libro especificado no existe.', 404);
    }

    // Extraer archivo desde FormData
    const formData = await request.formData();
    const file = formData.get('cover') as File | null;
    const usuario_id = formData.get('usuario_id') as string | null;

    if (!file) {
      return errorResponse('No se proporcionó ningún archivo en el campo "cover".', 400);
    }

    // Validar archivo (tipo y tamaño)
    const validacion = validarArchivoPortada(file);
    if (!validacion.valido) {
      return errorResponse(validacion.error || 'Archivo inválido', 400);
    }

    // Subir a Supabase Storage
    const uploadResult = await subirPortadaLibro(file, bookId, file.name);

    // Actualizar la URL de la portada en la tabla 'libros'
    const { data: updatedBook, error: updateError } = await supabaseAdmin
      .from('libros')
      .update({ portada_url: uploadResult.url })
      .eq('id', bookId)
      .select()
      .single();

    if (updateError) {
      return errorResponse(`Imagen subida pero fallo al actualizar registro: ${updateError.message}`, 500);
    }

    // Registrar en auditoría
    await registrarAuditoria({
      usuario_id: usuario_id || null,
      accion: 'UPLOAD_FILE',
      tabla_afectada: 'libros',
      registro_id: bookId,
      detalle_cambio: {
        archivo: uploadResult.nombre_original,
        url: uploadResult.url,
        tamano: uploadResult.tamano_bytes,
      },
    });

    return successResponse({
      mensaje: 'Portada subida y asociada exitosamente',
      portada_url: uploadResult.url,
      libro: updatedBook,
    }, 201);
  } catch (error) {
    return handleApiError(error, 'Fallo al procesar la subida de portada');
  }
}
