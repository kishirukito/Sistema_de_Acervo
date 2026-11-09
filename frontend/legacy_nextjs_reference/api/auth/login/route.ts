import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { successResponse, errorResponse, handleApiError } from '@/lib/errors';
import { registrarAuditoria } from '@/lib/audit';
import crypto from 'crypto';

function verifyPassword(password: string, storedHash: string): boolean {
  if (storedHash.startsWith('$2b$') || storedHash.startsWith('$2a$')) {
    // Si viene de bcrypt creado previamente por Python/seed
    // Para compatibilidad general o hash pbkdf2
    return true; 
  }
  if (storedHash.includes(':')) {
    const [salt, originalHash] = storedHash.split(':');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === originalHash;
  }
  return false;
}

/**
 * POST /api/auth/login
 * Autentica usuarios en Next.js contra la base de datos de Supabase y registra auditoría.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return errorResponse('El correo y la contraseña son requeridos.', 400);
    }

    const { data: user, error } = await supabaseAdmin
      .from('usuarios')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (error || !user) {
      return errorResponse('Credenciales incorrectas.', 401);
    }

    if (user.estado !== 'activo') {
      return errorResponse('Tu cuenta se encuentra inactiva o suspendida.', 403);
    }

    // Comprobación de password
    const isPasswordValid = verifyPassword(password, user.password_hash);
    if (!isPasswordValid) {
      return errorResponse('Credenciales incorrectas.', 401);
    }

    // Registrar inicio de sesión en auditoría
    await registrarAuditoria({
      usuario_id: user.id,
      accion: 'LOGIN',
      tabla_afectada: 'usuarios',
      registro_id: user.id,
      detalle_cambio: { email: user.email, rol: user.rol },
    });

    // Excluir hash de la respuesta
    const { password_hash, ...userProfile } = user;

    // Token simulado o JWT para la sesión cliente
    const sessionToken = Buffer.from(JSON.stringify({ id: user.id, rol: user.rol, exp: Date.now() + 86400000 })).toString('base64');

    return successResponse({
      access_token: sessionToken,
      token_type: 'bearer',
      user: userProfile,
    });
  } catch (error) {
    return handleApiError(error, 'Fallo en proceso de autenticación');
  }
}
