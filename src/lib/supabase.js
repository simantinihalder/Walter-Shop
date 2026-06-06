import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eescssqflvbxrriiyuhc.supabase.co';

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlc2Nzc3FmbHZieHJyaWl5dWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NDUxODUsImV4cCI6MjA5NjMyMTE4NX0.sZBO9K8X4A62Ryu1FExFFAvXmUt7iyUPfiocNfVJsqI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);