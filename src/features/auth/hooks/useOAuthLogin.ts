import { supabase } from "@infra/external/http/supabase";
import { useEffect } from "react";

export const useOAuthLogin = () => {
  const isElectron = typeof window !== 'undefined' && !!window.electronAPI;

  useEffect(() => {
    if (isElectron && window.electronAPI) {
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
                    console.error("Error setting session:", error.message);
                } else {
                    window.location.reload();
                }
            }
          }
       });
    }
  }, [isElectron]);

  const loginWithGoogle = async () => {
    let redirectTo = window.location.origin;     
    if (isElectron) {
        redirectTo = "aureum://auth/callback";
    } else if (import.meta.env.DEV) {
        redirectTo = "http://localhost:5173/";
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { 
        redirectTo,
        skipBrowserRedirect: isElectron 
      },
    });

    if (error) throw new Error(error.message);

    if (isElectron && data?.url) {
        window.open(data.url, '_blank'); 
    }
  };

  return { loginWithGoogle };
};