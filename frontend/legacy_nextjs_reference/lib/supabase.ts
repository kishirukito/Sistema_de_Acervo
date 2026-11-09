import { createClient } from '@supabase/supabase-js';

// Variables de entorno para la conexión con Supabase (soporta nombres estándar y nuevos de Supabase)
const supabaseUrl = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  process.env.SUPABASE_URL || 
  'https://ghddarooxlbyjcasbjtx.supabase.co';

const supabaseAnonKey = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  process.env.SUPABASE_PUBLISHABLE_KEY || 
  process.env.SUPABASE_KEY || 
  'placeholder_anon_key';

const supabaseServiceRoleKey = 
  process.env.SUPABASE_SERVICE_ROLE_KEY || 
  process.env.SUPABASE_SECRET_KEY || 
  supabaseAnonKey;

/**
 * Cliente de Supabase para operaciones del lado del cliente / anónimas.
 * Respeta estrictamente las directivas de Row Level Security (RLS).
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Cliente con privilegios administrativos (Service Role) para operaciones
 * internas del servidor en Route Handlers / Server Actions (auditoría, gestión de usuarios, etc.).
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
