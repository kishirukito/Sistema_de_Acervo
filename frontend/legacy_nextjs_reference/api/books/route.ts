import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { successResponse, errorResponse, handleApiError } from '@/lib/errors';
import { registrarAuditoria } from '@/lib/audit';
import { aiClient } from '@/lib/ai-client';

/**
 * GET /api/books
 * Consulta el catálogo con paginación, búsqueda por título/autor/ISBN e inclusión de ejemplares.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.trim();
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    let query = supabaseAdmin
      .from('libros')
      .select('*, ejemplares(*), resumenes_ia(*)', { count: 'exact' });

    if (search) {
      query = query.or(`titulo.ilike.%${search}%,autor.ilike.%${search}%,isbn.ilike.%${search}%`);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return errorResponse(`Error al consultar catálogo: ${error.message}`, 500);
    }

    return successResponse({
      libros: data || [],
      total: count || 0,
      limit,
      offset,
    });
  } catch (error) {
    return handleApiError(error, 'Fallo al obtener libros del catálogo');
  }
}

/**
 * POST /api/books
 * Registra un nuevo libro en el catálogo, genera resumen IA en segundo plano y registra auditoría.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { isbn, titulo, autor, editorial, anio_publicacion, edicion, portada_url, tema_ids, usuario_id } = body;

    // Validaciones de negocio
    if (!isbn || !titulo || !autor) {
      return errorResponse('Los campos ISBN, título y autor son estrictamente obligatorios.', 400);
    }

    // Verificar unicidad de ISBN
    const { data: existingBook } = await supabaseAdmin
      .from('libros')
      .select('id')
      .eq('isbn', isbn.trim())
      .single();

    if (existingBook) {
      return errorResponse(`Ya existe un libro registrado con el ISBN ${isbn}.`, 409);
    }

    // Insertar libro
    const { data: newBook, error: insertError } = await supabaseAdmin
      .from('libros')
      .insert({
        isbn: isbn.trim(),
        titulo: titulo.trim(),
        autor: autor.trim(),
        editorial: editorial?.trim() || null,
        anio_publicacion: anio_publicacion ? parseInt(anio_publicacion, 10) : null,
        edicion: edicion?.trim() || null,
        portada_url: portada_url || null,
      })
      .select()
      .single();

    if (insertError || !newBook) {
      return errorResponse(`Error al registrar libro: ${insertError?.message}`, 500);
    }

    // Asociar temas/materias si se especifican
    if (Array.isArray(tema_ids) && tema_ids.length > 0) {
      const relData = tema_ids.map((temaId: number) => ({
        libro_id: newBook.id,
        tema_id: temaId,
      }));
      await supabaseAdmin.from('libro_temas').insert(relData);
    }

    // Invocar al microservicio de IA en Python para generar resumen
    try {
      const aiSummary = await aiClient.generarResumen(newBook.titulo, newBook.autor);
      await supabaseAdmin.from('resumenes_ia').insert({
        libro_id: newBook.id,
        resumen_texto: aiSummary.resumen,
        palabras_clave: aiSummary.palabras_clave,
        modelo_usado: aiSummary.modelo,
      });
    } catch (aiErr) {
      console.warn('[AI GENERATION NOTICE] El resumen IA se generará posteriormente:', aiErr);
    }

    // Registrar en bitácora de auditoría
    await registrarAuditoria({
      usuario_id: usuario_id || null,
      accion: 'CREATE_BOOK',
      tabla_afectada: 'libros',
      registro_id: newBook.id,
      detalle_cambio: { isbn: newBook.isbn, titulo: newBook.titulo, autor: newBook.autor },
    });

    return successResponse(newBook, 201);
  } catch (error) {
    return handleApiError(error, 'Fallo al crear libro');
  }
}
