import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseUrl !== 'https://your-supabase-project-id.supabase.co' &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'your-supabase-anon-key-here'
);

if (!isSupabaseConfigured) {
  console.warn(
    '⚡ [StudyPilot AI] Supabase credentials not found in .env. Running in Mock/Offline mode. Add VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY to enable live backend.'
  );
}

// Fallback dummy URL for client instantiation if env variables are pending
const validUrl = isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co';
const validKey = isSupabaseConfigured ? supabaseAnonKey : 'placeholder-key';

export const supabase = createClient(validUrl, validKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
