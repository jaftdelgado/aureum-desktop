import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";
import GoogleLogo from "@features/auth/resources/svg/google.svg";
import { useOAuthLogin } from "@features/auth/hooks/useOAuthLogin";
import { AuthApiRepository } from "@infra/external/auth/AuthApiRepository";
import { supabase } from "@infra/external/http/supabase";

interface GoogleSignInProps {
  onMissingProfile?: () => void;
}

const authRepo = new AuthApiRepository();

const GoogleSignIn: React.FC<GoogleSignInProps> = ({ onMissingProfile }) => {
  const { t } = useTranslation("auth");
  const { loginWithGoogle } = useOAuthLogin();
  const [checking, setChecking] = useState(false);

  const handleClick = async () => {
    try {
      setChecking(true);
      await loginWithGoogle();
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const exists = await authRepo.checkProfileExists(user.id);
        
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