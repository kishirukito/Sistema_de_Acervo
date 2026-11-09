import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ghddarooxlbyjcasbjtx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_6nxdM7V7Minj9I3HOP_2iQ_njnMVJDd';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

