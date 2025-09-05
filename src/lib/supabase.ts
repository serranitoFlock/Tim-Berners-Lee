import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Solo crear el cliente si las credenciales son válidas
export const supabase = (supabaseUrl !== 'your_supabase_url_here' && supabaseUrl !== 'https://placeholder.supabase.co') 
  ? createClient(supabaseUrl, supabaseKey)
  : null

// Tipo de datos para Usuario
export interface User {
  id?: string
  name: string
  email: string
  created_at?: string
}
