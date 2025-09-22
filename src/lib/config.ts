// Supabase Configuration
// Copy these values from your Supabase project settings
// and create a .env.local file in the root directory

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
}

// Validation
if (!supabaseConfig.url || !supabaseConfig.anonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

