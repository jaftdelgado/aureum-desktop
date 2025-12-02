// src/features/auth/components/GoogleSignInButton.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";
import GoogleLogo from "@features/auth/resources/svg/google.svg";
import { useOAuthLogin } from "@features/auth/hooks/useOAuthLogin";

const GoogleSignIn: React.FC = () => {
  const { t } = useTranslation();
  const { loginWithGoogle } = useOAuthLogin();

  const handleClick = async () => {
    try {
      await loginWithGoogle();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error en login con Google:", error.message);
      } else {
        console.error("Error desconocido en login con Google");
      }
    }
  };

  return (
    <Button
      variant="secondary"
      type="button"
      alignText="center"
      onClick={handleClick}
      iconNode={<img src={GoogleLogo} alt="Google Logo" className="w-5 h-5" />}
    >
      {t("signin.continueWithGoogle")}
    </Button>
  );
};

export default GoogleSignIn;
