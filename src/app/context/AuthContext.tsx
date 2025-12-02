// src/app/context/AuthContext.ts
import { createContext } from "react";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";

export interface AuthContextValue {
  user: LoggedInUser | null;
  setUser: (user: LoggedInUser | null) => void;
  loading: boolean;
}

// Valor inicial del contexto
export const AuthContext = createContext<AuthContextValue>({
  user: null,
  setUser: () => {},
  loading: true,
});
