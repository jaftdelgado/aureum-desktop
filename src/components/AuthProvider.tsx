import React from "react";
import type { ReactNode } from "react";
import { useAuth } from "@hooks/useAuth";
import { AuthContext, type AuthContextValue } from "@context/AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, loading } = useAuth();

  return (
    <AuthContext.Provider value={{ user, loading } as AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
