import { createClient } from '@supabase/supabase-js';

// We pull the URL and Publishable Key from the environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Export the secure frontend client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);