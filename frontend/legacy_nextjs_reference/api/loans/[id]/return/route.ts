import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { successResponse, errorResponse, handleApiError } from '@/lib/errors';
import { registrarAuditoria } from '@/lib/audit';

interface Params {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/loans/[id]/return
 * Registra la devolución de un ejemplar prestado y lo reintegra al inventario disponible.
 */
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id: loanId } = await params;
    const body = await request.json().catch(() => ({}));
    const { notas_devolucion, admin_usuario_id } = body;

    // 1. Obtener préstamo actual
    const { data: loan, error: loanError } = await supabaseAdmin
      .from('prestamos')
      .select('*, ejemplares(id, codigo_inventario, libro_id)')
      .eq('id', loanId)
      .single();

    if (loanError || !loan) {
      return errorResponse('El préstamo no fue encontrado.', 404);
    }

    if (loan.estado === 'devuelto') {
      return errorResponse('Este préstamo ya fue marcado como devuelto previamente.', 400);
    }

    const fechaDevolucion = new Date().toISOString();
    const notasActualizadas = [loan.notas, notas_devolucion ? `Devolución: ${notas_devolucion}` : 'Devuelto en buen estado']
      .filter(Boolean)
      .join(' | ');

    // 2. Actualizar estado del préstamo
    const { data: updatedLoan, error: updateError } = await supabaseAdmin
      .from('prestamos')
      .update({
        estado: 'devuelto',
        fecha_devolucion_real: fechaDevolucion,
        notas: notasActualizadas,
      })
      .eq('id', loanId)
      .select()
      .single();

    if (updateError || !updatedLoan) {
      return errorResponse(`Error al registrar devolución: ${updateError?.message}`, 500);
    }

    // 3. Reintegrar ejemplar a estado 'disponible'
    await supabaseAdmin
      .from('ejemplares')
      .update({ estado: 'disponible' })
      .eq('id', loan.ejemplar_id);

    // 4. Registrar en auditoría
    await registrarAuditoria({
      usuario_id: admin_usuario_id || null,
      accion: 'RETURN_LOAN',
      tabla_afectada: 'prestamos',
      registro_id: loanId,
      detalle_cambio: {
        ejemplar_id: loan.ejemplar_id,
        fecha_devolucion: fechaDevolucion,
      },
    });

    return successResponse({
      mensaje: 'Ejemplar devuelto exitosamente y disponible para nuevos préstamos.',
      prestamo: updatedLoan,
    });
  } catch (error) {
    return handleApiError(error, 'Fallo al procesar devolución de préstamo');
  }
}
