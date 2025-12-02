// src/features/auth/hooks/useOAuthLogin.ts
import { supabase } from "@infra/external/http/supabase";

export const useOAuthLogin = () => {
  const loginWithGoogle = async () => {
    const redirectTo = import.meta.env.DEV
      ? "http://localhost:5173/"
      : "https://aureum-desktop.vercel.app/";

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (error) throw new Error("OAuthLoginFailed");
  };

  return { loginWithGoogle };
};
