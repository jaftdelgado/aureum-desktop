import { useContext } from "react";
import { AuthContext, type AuthContextValue } from "@context/AuthContext";

export const useAuthContext = (): AuthContextValue => {
  return useContext(AuthContext);
};
