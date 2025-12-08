import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";
import { GetSessionUseCase } from "@domain/use-cases/auth/GetSessionUseCase";
import { LogoutUseCase } from "@domain/use-cases/auth/LogoutUseCase";
import { CheckSessionAliveUseCase } from "@domain/use-cases/auth/CheckSessionAliveUseCase";
import { DI } from "@app/di/container";
import { EnrichSessionUserUseCase } from "@domain/use-cases/auth/EnrichSessionUserUseCase";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUserProfile = async (baseUser: LoggedInUser) => {
    const enrichUseCase = new EnrichSessionUserUseCase(DI.profileRepository);
    return await enrichUseCase.execute(baseUser);
  };

  const logout = async () => {
    try {
      const logoutUseCase = new LogoutUseCase(DI.authRepository);
      await logoutUseCase.execute();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const getSessionUseCase = new GetSessionUseCase(DI.authRepository);
      try {
        let sessionUser = await getSessionUseCase.execute();
        if (sessionUser) {
           sessionUser = await refreshUserProfile(sessionUser);
        }

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
        const fullUser = await refreshUserProfile(updatedUser);
        setUser(fullUser);
      } else {
        setUser(null);
      }
      setLoading(false);
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

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
