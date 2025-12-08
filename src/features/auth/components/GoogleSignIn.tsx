import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";
import GoogleLogo from "@features/auth/resources/svg/google.svg";
import { useOAuthLogin } from "@features/auth/hooks/useOAuthLogin";
import { DI } from "@app/di/container";
import { GetSessionUseCase } from "@domain/use-cases/auth/GetSessionUseCase";
import { CheckProfileExistsUseCase } from "@domain/use-cases/auth/CheckProfileExistsUseCase";

interface GoogleSignInProps {
  onMissingProfile?: () => void;
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({ onMissingProfile }) => {
  const { t } = useTranslation("auth");
  const { loginWithGoogle } = useOAuthLogin();
  const [checking, setChecking] = useState(false);

  const handleClick = async () => {
    try {
      setChecking(true);
      await loginWithGoogle();
      
      const getSession = new GetSessionUseCase(DI.authRepository, DI.profileRepository);
      const user = await getSession.execute();
      
      if (user) {
        const checkProfile = new CheckProfileExistsUseCase(DI.profileRepository);
        const exists = await checkProfile.execute(user.id);
        
        if (!exists && onMissingProfile) {
          onMissingProfile();
        } else {
          window.location.reload(); 
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error en login con Google:", error.message);
      }
    } finally {
      setChecking(false);
    }
  };

  return (
    <Button
      variant="secondary"
      type="button"
      alignText="center"
      onClick={handleClick}
      disabled={checking}
      iconNode={<img src={GoogleLogo} alt="Google Logo" className="w-5 h-5" />}
    >
      {checking ? t("common.loading") : t("signin.continueWithGoogle")}
    </Button>
  );
};

export default GoogleSignIn;