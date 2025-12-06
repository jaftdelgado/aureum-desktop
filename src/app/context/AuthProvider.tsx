import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";
import type { AuthRepository } from "@domain/repositories/AuthRepository";
import { AuthApiRepository } from "@infra/external/auth/AuthApiRepository";
import { GetSessionUseCase } from "@domain/use-cases/auth/GetSessionUseCase";
import { LogoutUseCase } from "@domain/use-cases/auth/LogoutUseCase";
import { supabase } from "@infra/external/http/supabase";

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
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally{
      setUser(null);  
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const authRepo: AuthRepository = new AuthApiRepository();
      const getSessionUseCase = new GetSessionUseCase(authRepo);

      try {
        const sessionUser = await getSessionUseCase.execute();
        console.log("[AuthProvider] sessionUser:", sessionUser);
        setUser(sessionUser);
        if (sessionUser && window.location.hash.includes("access_token")) {
           window.location.hash = "/"; 
        }
      } catch (error) {
        console.error("[AuthProvider] error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    void initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[AuthProvider] Auth event:", event);

      if (event === 'SIGNED_OUT') {
        setUser(null);
      }
      
      if (event === 'SIGNED_IN' && session) {
      }
    });

    const interval = setInterval(async () => {
      if (!user) return;
      const { data: isAlive, error } = await supabase.rpc('is_session_alive');

      if (isAlive === false || error) {
        console.log("Sesión invalidada por inicio en otro dispositivo. Cerrando...");
        await logout();
      }
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, [user]);

  console.log("[AuthProvider] render:", { user, loading });

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
