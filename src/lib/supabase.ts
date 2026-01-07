import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Fallback to avoid build errors if env vars are missing during build time
// These will need to be present for the app to actually work
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables')
}

export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
)
