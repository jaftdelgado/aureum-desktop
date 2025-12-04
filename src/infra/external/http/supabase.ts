import { createClient} from "@supabase/supabase-js";
import { ENV } from "@app/config/env";

export const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY, {
  auth: {
    storage: sessionStorage,
    
    debug: import.meta.env.DEV, 
  },
});
