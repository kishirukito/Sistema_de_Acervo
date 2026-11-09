import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { successResponse, errorResponse, handleApiError } from '@/lib/errors';
import { registrarAuditoria } from '@/lib/audit';

/**
 * GET /api/loans
 * Consulta el listado de préstamos con información del libro, ejemplar, solicitante y tipo de usuario.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const estado = searchParams.get('estado'); // 'activo' | 'devuelto' | 'vencido'
    const tipo_prestamo = searchParams.get('tipo_prestamo'); // 'domicilio' | 'sala'
    const usuario_id = searchParams.get('usuario_id');

    let query = supabaseAdmin
      .from('prestamos')
      .select('*, usuarios(id, nombre_completo, email, matricula_o_nomina, vigencia_hasta, tipos_usuario(nombre, codigo)), ejemplares(*, libros(id, titulo, autor, isbn))');

    if (estado) query = query.eq('estado', estado);
    if (tipo_prestamo) query = query.eq('tipo_prestamo', tipo_prestamo);
    if (usuario_id) query = query.eq('usuario_id', usuario_id);

    const { data: loans, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return errorResponse(`Error al consultar préstamos: ${error.message}`, 500);
    }

    return successResponse(loans || []);
  } catch (error) {
    return handleApiError(error, 'Fallo al listar préstamos');
  }
}

/**
 * POST /api/loans
 * Registra un nuevo préstamo validando:
 * 1. Disponibilidad del ejemplar físico.
 * 2. Vigencia de la credencial del usuario (vigencia_hasta 2025, 2026, etc.).
 * 3. Políticas de préstamo según categoría (docente, alumno, tesista, externo).
 * 4. Modalidad del préstamo (a domicilio o en sala de lectura).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      usuario_id,
      ejemplar_id,
      tipo_prestamo = 'domicilio', // 'domicilio' o 'sala'
      dias_prestamo,
      notas,
      admin_usuario_id,
    } = body;

    if (!usuario_id || !ejemplar_id) {
      return errorResponse('Los campos usuario_id y ejemplar_id son obligatorios.', 400);
    }

    // 1. Verificar usuario y su categoría de lector
    const { data: user, error: userError } = await supabaseAdmin
      .from('usuarios')
      .select('*, tipos_usuario(*)')
      .eq('id', usuario_id)
      .single();

    if (userError || !user) {
      return errorResponse('El usuario no existe.', 404);
    }

    if (user.estado !== 'activo') {
      return errorResponse(`El usuario no tiene permitido solicitar préstamos (Estado: ${user.estado}).`, 403);
    }

    // Verificar vigencia de la cuenta/credencial
    if (user.vigencia_hasta) {
      const fechaVigencia = new Date(user.vigencia_hasta);
      const hoy = new Date();
      if (fechaVigencia < hoy) {
        return errorResponse(`La credencial del usuario ha expirado (Vigencia: ${user.vigencia_hasta}). Debe renovarla para solicitar préstamos.`, 403);
      }
    }

    // Verificar si la categoría permite préstamo a domicilio
    const tipoUsuario = user.tipos_usuario;
    if (tipo_prestamo === 'domicilio' && tipoUsuario && !tipoUsuario.permite_prestamo_domicilio) {
      return errorResponse(`La categoría '${tipoUsuario.nombre}' solo tiene autorización para préstamos en sala de lectura.`, 400);
    }

    // 2. Verificar disponibilidad del ejemplar físico
    const { data: ejemplar, error: ejError } = await supabaseAdmin
      .from('ejemplares')
      .select('id, estado, libro_id')
      .eq('id', ejemplar_id)
      .single();

    if (ejError || !ejemplar) {
      return errorResponse('El ejemplar físico no existe.', 404);
    }

    if (ejemplar.estado !== 'disponible') {
      return errorResponse(`El ejemplar no está disponible para préstamo (Estado actual: ${ejemplar.estado}).`, 400);
    }

    // 3. Determinar plazo según tipo de usuario y modalidad
    const fechaPrestamo = new Date();
    const fechaLimite = new Date();

    if (tipo_prestamo === 'sala') {
      // En sala: se presta por horas (debe devolverse el mismo día)
      fechaLimite.setHours(fechaPrestamo.getHours() + 4);
    } else {
      // A domicilio: usa los días de la categoría de usuario o el solicitado
      const diasCalculados = dias_prestamo ? parseInt(dias_prestamo, 10) : (tipoUsuario?.dias_prestamo_domicilio || 7);
      fechaLimite.setDate(fechaPrestamo.getDate() + diasCalculados);
    }

    // 4. Crear préstamo
    const { data: newLoan, error: loanError } = await supabaseAdmin
      .from('prestamos')
      .insert({
        usuario_id,
        ejemplar_id,
        tipo_prestamo,
        fecha_prestamo: fechaPrestamo.toISOString(),
        fecha_limite_devolucion: fechaLimite.toISOString(),
        estado: 'activo',
        notas: notas?.trim() || null,
      })
      .select()
      .single();

    if (loanError || !newLoan) {
      return errorResponse(`Error al registrar préstamo: ${loanError?.message}`, 500);
    }

    // 5. Actualizar estado del ejemplar a 'prestado'
    await supabaseAdmin
      .from('ejemplares')
      .update({ estado: 'prestado' })
      .eq('id', ejemplar_id);

    // 6. Registrar en auditoría
    await registrarAuditoria({
      usuario_id: admin_usuario_id || usuario_id,
      accion: 'CREATE_LOAN',
      tabla_afectada: 'prestamos',
      registro_id: newLoan.id,
      detalle_cambio: {
        usuario_id,
        ejemplar_id,
        tipo_prestamo,
        fecha_limite: fechaLimite.toISOString(),
      },
    });

    return successResponse(newLoan, 201);
  } catch (error) {
    return handleApiError(error, 'Fallo al procesar préstamo');
  }
}
