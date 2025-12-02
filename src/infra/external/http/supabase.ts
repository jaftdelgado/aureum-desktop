import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { ENV } from "@app/config/env";

export const supabase: SupabaseClient = createClient(
  ENV.SUPABASE_URL,
  ENV.SUPABASE_ANON_KEY
);
