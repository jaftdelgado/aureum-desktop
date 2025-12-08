import { useEffect, useState } from "react";
import { DI } from "@app/di/container";

export const useOAuthLogin = () => {
  const [loading, setLoading] = useState(false);
  const isElectron = typeof window !== 'undefined' && !!window.electronAPI;

  useEffect(() => {
    if (isElectron && window.electronAPI) {
       window.electronAPI.onAuthToken(async (url: string) => {
          const hashIndex = url.indexOf("#");
          if (hashIndex !== -1) {
            const params = new URLSearchParams(url.substring(hashIndex + 1));
            const accessToken = params.get("access_token");
            const refreshToken = params.get("refresh_token");

            if (accessToken && refreshToken) {
                try {
                  await DI.authRepository.setSession(accessToken, refreshToken);
                  window.location.reload();
              } catch (error) {
                  console.error("Error setting session:", error);
              }
          }
          }
       });
    }
  }, [isElectron]);

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await DI.authRepository.loginWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loginWithGoogle, loading };
};