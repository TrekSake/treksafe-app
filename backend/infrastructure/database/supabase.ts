import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { loadEnv } from '../config/env.js';

export type DbUser = {
  id: string;
  email: string;
  password_hash: string;
  role: 'senderista' | 'rescatista';
};

let client: SupabaseClient | null = null;

/**
 * Cliente Supabase con service_role (bypass RLS).
 * Conecta vía HTTPS — evita problemas de Transaction Pooler con pg en Express.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (!client) {
    const { supabaseUrl, supabaseServiceRoleKey } = loadEnv();
    client = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

export async function verifyDatabaseConnection(): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('users').select('id').limit(1);
  if (error) {
    throw new Error(`Supabase DB unreachable: ${error.message}`);
  }
}
