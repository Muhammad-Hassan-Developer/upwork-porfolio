import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
}

const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export async function getAllProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) throw error;

    return data;
  } catch (err) {
    console.error('Error fetching products:', err.message);
    return [];
  }
}

export default supabase;
