// src/features/auth/hooks/useOAuthLogin.ts
import { supabase } from "@infra/external/http/supabase";
import { useEffect } from "react";

export const useOAuthLogin = () => {
  useEffect(() => {
    if (window.electronAPI) {
       window.electronAPI.onAuthToken(async (url: string) => {
          console.log("Token recibido en renderer:", url);
          const hashIndex = url.indexOf("#");
          if (hashIndex !== -1) {
            const params = new URLSearchParams(url.substring(hashIndex + 1));
            const accessToken = params.get("access_token");
            const refreshToken = params.get("refresh_token");

            if (accessToken && refreshToken) {
                const { error } = await supabase.auth.setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken
                });

                if (error) {
           
                    console.error("Error al establecer sesión desde Deep Link:", error.message);
                } else {
                    console.log("Sesión establecida correctamente. Recargando...");
                    window.location.reload();
                }
            }
          }
       });
    }
  }, []);
  
  const loginWithGoogle = async () => {
    const redirectTo = import.meta.env.DEV
      ? "http://localhost:5173/"
      : "aureum://auth/callback";

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { 
        redirectTo,
        skipBrowserRedirect: true
      },
    });

    if (data?.url) {
        window.open(data.url, '_blank'); 
    }

    if (error) throw new Error("OAuthLoginFailed");
  };

  return { loginWithGoogle };
};
