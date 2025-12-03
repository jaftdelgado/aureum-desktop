import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";
import type { AuthRepository } from "@domain/repositories/AuthRepository";
import { AuthApiRepository } from "@infra/external/auth/AuthApiRepository";
import { GetSessionUseCase } from "@domain/use-cases/auth/GetSessionUseCase";
import { LogoutUseCase } from "@domain/use-cases/auth/LogoutUseCase";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const authRepo = new AuthApiRepository();

  const logout = async () => {
    try {
      const logoutUseCase = new LogoutUseCase(authRepo);
      await logoutUseCase.execute(); 
      setUser(null);                
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    console.log("[AuthProvider] useEffect init");

    const initAuth = async () => {
      const authRepo: AuthRepository = new AuthApiRepository();
      const getSessionUseCase = new GetSessionUseCase(authRepo);

      try {
        const sessionUser = await getSessionUseCase.execute();
        console.log("[AuthProvider] sessionUser:", sessionUser);
        setUser(sessionUser);
      } catch (error) {
        console.error("[AuthProvider] error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    void initAuth();
  }, []);

  console.log("[AuthProvider] render:", { user, loading });

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
