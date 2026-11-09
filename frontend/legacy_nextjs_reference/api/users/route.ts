import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { successResponse, errorResponse, handleApiError } from '@/lib/errors';
import { registrarAuditoria } from '@/lib/audit';
import crypto from 'crypto';

/**
 * Función de hashing simple y segura para contraseñas en entorno Node.js / Next.js
 */
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * GET /api/users
 * Listado de usuarios con filtros opcionales de tipo_usuario, rol y estado.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rol = searchParams.get('rol'); // 'admin' | 'personal' | 'lector'
    const tipo_codigo = searchParams.get('tipo'); // 'alumno', 'docente', 'egresado_tesista', 'externo'
    const estado = searchParams.get('estado'); // 'activo' | 'suspendido' | 'inactivo'
    const search = searchParams.get('search')?.trim();

    let query = supabaseAdmin
      .from('usuarios')
      .select('id, email, nombre_completo, matricula_o_nomina, carrera_o_dependencia, vigencia_hasta, rol, estado, created_at, updated_at, tipos_usuario(id, codigo, nombre, max_libros_simultaneos, dias_prestamo_domicilio, permite_prestamo_domicilio)');

    if (rol) query = query.eq('rol', rol);
    if (estado) query = query.eq('estado', estado);
    if (tipo_codigo) query = query.eq('tipos_usuario.codigo', tipo_codigo);
    if (search) {
      query = query.or(`nombre_completo.ilike.%${search}%,email.ilike.%${search}%,matricula_o_nomina.ilike.%${search}%`);
    }

    const { data: users, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return errorResponse(`Error al consultar usuarios: ${error.message}`, 500);
    }

    return successResponse(users || []);
  } catch (error) {
    return handleApiError(error, 'Fallo al listar usuarios');
  }
}

/**
 * POST /api/users
 * Registra un nuevo usuario clasificado por su categoría (docente, alumno, tesista, externo, administrativo).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      nombre_completo,
      matricula_o_nomina,
      tipo_usuario_id = 3, // 3 = Alumno por defecto
      rol = 'lector',
      carrera_o_dependencia,
      vigencia_hasta,
      admin_usuario_id,
    } = body;

    if (!email || !password || !nombre_completo || !matricula_o_nomina) {
      return errorResponse('Los campos email, password, nombre completo y matrícula/nómina/identificación son requeridos.', 400);
    }

    // Validar rol
    const rolesValidos = ['admin', 'personal', 'lector'];
    if (!rolesValidos.includes(rol)) {
      return errorResponse(`Rol inválido (${rol}). Opciones válidas: ${rolesValidos.join(', ')}`, 400);
    }

    // Verificar si el correo ya existe
    const { data: existingEmail } = await supabaseAdmin
      .from('usuarios')
      .select('id')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (existingEmail) {
      return errorResponse('El correo electrónico ya se encuentra registrado.', 409);
    }

    // Verificar si la matrícula/nómina/identificación ya existe
    const { data: existingMatricula } = await supabaseAdmin
      .from('usuarios')
      .select('id')
      .eq('matricula_o_nomina', matricula_o_nomina.trim())
      .single();

    if (existingMatricula) {
      return errorResponse('La matrícula, nómina o identificación ya está registrada.', 409);
    }

    const passwordHash = hashPassword(password);

    const { data: newUser, error: insertError } = await supabaseAdmin
      .from('usuarios')
      .insert({
        tipo_usuario_id,
        email: email.trim().toLowerCase(),
        password_hash: passwordHash,
        nombre_completo: nombre_completo.trim(),
        matricula_o_nomina: matricula_o_nomina.trim(),
        carrera_o_dependencia: carrera_o_dependencia?.trim() || null,
        vigencia_hasta: vigencia_hasta || null,
        rol,
        estado: 'activo',
      })
      .select('id, tipo_usuario_id, email, nombre_completo, matricula_o_nomina, carrera_o_dependencia, vigencia_hasta, rol, estado, created_at')
      .single();

    if (insertError || !newUser) {
      return errorResponse(`Error al registrar usuario: ${insertError?.message}`, 500);
    }

    // Registrar en auditoría
    await registrarAuditoria({
      usuario_id: admin_usuario_id || null,
      accion: 'CREATE_USER',
      tabla_afectada: 'usuarios',
      registro_id: newUser.id,
      detalle_cambio: {
        email: newUser.email,
        matricula_o_nomina: newUser.matricula_o_nomina,
        rol: newUser.rol,
        tipo_usuario_id: newUser.tipo_usuario_id,
      },
    });

    return successResponse(newUser, 201);
  } catch (error) {
    return handleApiError(error, 'Fallo al crear usuario');
  }
}
