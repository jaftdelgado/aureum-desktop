import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";
import { GetSessionUseCase } from "@domain/use-cases/auth/GetSessionUseCase";
import { LogoutUseCase } from "@domain/use-cases/auth/LogoutUseCase";
import { CheckSessionAliveUseCase } from "@domain/use-cases/auth/CheckSessionAliveUseCase";
import { DI } from "@app/di/container";
import { useTranslation } from "react-i18next";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { t } = useTranslation("auth");
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const logout = async (reason?: string) => {
    try {
      const logoutUseCase = new LogoutUseCase(DI.authRepository);
      await logoutUseCase.execute();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setUser(null);
      if (reason) {
        sessionStorage.setItem("logout_reason", reason);
      }
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const getSessionUseCase = new GetSessionUseCase(DI.authRepository, DI.profileRepository);
      try {
        let sessionUser = await getSessionUseCase.execute();

        setUser(sessionUser);
        if (sessionUser && window.location.hash.includes("access_token")) {
           window.history.replaceState(null, "", window.location.pathname);
        }
      } catch (error) {
        console.error("[AuthProvider] error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    void initAuth();

    const unsubscribe = DI.authRepository.onAuthStateChange(async (updatedUser) => {
      if (updatedUser) {
        setUser(prev => prev?.id === updatedUser.id ? prev : updatedUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    if (window.location.hash.includes("access_token")) return;

    const interval = setInterval(async () => {
      if (!user) return;
      if (!navigator.onLine) return;
      const checkSessionUseCase = new CheckSessionAliveUseCase(DI.authRepository);
      const isAlive = await checkSessionUseCase.execute();

      if (!isAlive) {
        console.log("Sesión invalidada. Cerrando...");
        await logout();
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [user]); 

  useEffect(() => {
    const isElectron = typeof window !== 'undefined' && !!(window as any).electronAPI;

    if (isElectron && (window as any).electronAPI) {
       const removeListener = (window as any).electronAPI.onAuthToken(async (url: string) => {
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
                  console.error("Error setting session from Electron:", error);
              }
          }
          }
       });
      return () => {
         if (removeListener && typeof removeListener === 'function') {
            removeListener();
         }
       };
    }
  }, []);

  useEffect(() => {
    const handleOffline = () => {
      console.warn("Conexión perdida. Cerrando sesión...");
      logout("NETWORK_ERROR");
    };

    window.addEventListener("offline", handleOffline);

    if (!navigator.onLine) {
      handleOffline();
    }

    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const handleServerError = () => {
      console.warn("Servidor inalcanzable. Cerrando sesión...");
      logout("SERVER_ERROR");
    };

    window.addEventListener("server-disconnect", handleServerError);

    return () => {
      window.removeEventListener("server-disconnect", handleServerError);
    };
  }, []);
  
  if (loading) {
    return (
      <div className="flex flex-col h-screen w-screen items-center justify-center bg-surface gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primaryBtn border-t-transparent" />
        <p className="text-sm font-medium text-secondaryText animate-pulse">
          {t("common.loading")}
        </p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
