import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function checkSchema() {
  const { data, error } = await supabase.rpc('get_tables', {})
  // Since we don't have get_tables RPC yet, we use a raw query if possible, 
  // or just try to select from information_schema
  
  const { data: tables, error: tableError } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public')

  if (tableError) {
    // If information_schema is restricted via PostgREST (usually is), 
    // we'll try a different approach or just proceed with CREATE TABLE IF NOT EXISTS
    console.error('Error fetching tables:', tableError.message)
    
    // Alternative: Try to select from a known table to see if it exists
    const { error: profileError } = await supabase.from('profiles').select('id').limit(1)
    console.log('Profiles table exists:', !profileError)
  } else {
    console.log('Existing tables:', tables.map(t => t.table_name))
  }
}

checkSchema()
