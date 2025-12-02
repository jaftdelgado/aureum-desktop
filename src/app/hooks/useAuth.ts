// src/app/hooks/useAuth.ts
import { useContext } from "react";
import { AuthContext } from "@app/context/AuthContext";

export const useAuth = () => useContext(AuthContext);
