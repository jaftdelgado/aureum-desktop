import { useState } from "react";
import { DI } from "@app/di/container";

export const useOAuthLogin = () => {
  const [loading, setLoading] = useState(false);

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