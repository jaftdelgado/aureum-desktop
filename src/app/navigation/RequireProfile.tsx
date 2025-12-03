import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@app/hooks/useAuth";
import { AuthApiRepository } from "@infra/external/auth/AuthApiRepository";

interface RequireProfileProps {
  children: React.ReactNode;
}

const authRepo = new AuthApiRepository();

export const RequireProfile: React.FC<RequireProfileProps> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      if (!user) return;
      
      try {
        const exists = await authRepo.checkProfileExists(user.id);
        setHasProfile(exists);
      } catch (error) {
        console.error("Error verificando perfil en guardia:", error);
        setHasProfile(false);
      }
    };

    if (!authLoading) {
      check();
    }
  }, [user, authLoading]);

  if (authLoading || hasProfile === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-bg">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-body">Verificando acceso...</span>
        </div>
      </div>
    );
  }

  if (hasProfile === false) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};