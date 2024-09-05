// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lfibhgotnojhtgzuusgu.supabase.co'; // Your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmaWJoZ290bm9qaHRnenV1c2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1MzY1MTUsImV4cCI6MjA0MTExMjUxNX0.1LIoh-F9oQPbSHyX14A3eKx1a8sNoqyrRQDyn_X7u24'; // Your Supabase API key

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;