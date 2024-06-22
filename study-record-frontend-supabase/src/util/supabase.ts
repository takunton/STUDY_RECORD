import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.REACT_APP_PUBLIC_SUPABASE_URL!,
  process.env.REACT_APP_PUBLIC_SUPABASE_ANON_KEY!
);
