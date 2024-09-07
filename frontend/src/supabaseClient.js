import { createClient } from '@supabase/supabase-js';

// Supabase project URL and API key
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://lfibhgotnojhtgzuusgu.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmaWJoZ290bm9qaHRnenV1c2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1MzY1MTUsImV4cCI6MjA0MTExMjUxNX0.1LIoh-F9oQPbSHyX14A3eKx1a8sNoqyrRQDyn_X7u24';

// Creating and exporting the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
