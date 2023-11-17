import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://mhcuwtgmyxwszrvpqgzy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oY3V3dGdteXh3c3pydnBxZ3p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAyMDg2MjQsImV4cCI6MjAxNTc4NDYyNH0.mXV9D6tJbIyKko_rJWrSVkHcq3c6a5eLkGEB68a0u9o";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
