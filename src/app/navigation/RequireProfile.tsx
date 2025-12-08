import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@app/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { CheckProfileExistsUseCase } from "@domain/use-cases/auth/CheckProfileExistsUseCase";
import { DI } from "@app/di/container";

interface RequireProfileProps {
  children: React.ReactNode;
}

export const RequireProfile: React.FC<RequireProfileProps> = ({ children }) => {
  const { t } = useTranslation("auth");
  const { user, loading: authLoading } = useAuth();
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      if (!user) return;
      
      try {
        const checkProfileUseCase = new CheckProfileExistsUseCase(DI.profileRepository);
        
        const exists = await checkProfileUseCase.execute(user.id);
        setHasProfile(exists);
      } catch (error) {
        console.error("Error verificando perfil en guardia:", error);
        setHasProfile(false);
      }
    };

    if (!authLoading) {
      if (user?.role) {
         setHasProfile(true); 
      } else {
         check();
      }
    }
  }, [user, authLoading]);

  if (authLoading || hasProfile === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-bg">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-body">{t("common.verifyingAccess")}</span>
        </div>
      </div>
    );
  }

  if (hasProfile === false) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};