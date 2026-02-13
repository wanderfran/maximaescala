import { createClient } from '@supabase/supabase-js';

// Configuração direta conforme solicitado para a tabela leads
// Utilizando a chave ANON (pública) para operações do frontend
const supabaseUrl = 'https://qbwzqiawxtzmnexurzey.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFid3pxaWF3eHR6bW5leHVyemV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNDYyMTksImV4cCI6MjA4MzkyMjIxOX0.XieyFz0AWWOlKxDZuSJeFGoM8gkB_gN37gNQnHWXyC4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);