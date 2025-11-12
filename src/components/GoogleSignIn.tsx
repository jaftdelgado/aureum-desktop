import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@components/ui/Button";
import GoogleLogo from "@assets/svg/google-logo.svg";
import { supabase } from "@lib/supabaseClient";

const GoogleSignIn: React.FC = () => {
  const { t } = useTranslation();

  const handleGoogleSignIn = async () => {
    // Detecta si estás en entorno local o en producción (Vercel)
    const redirectTo = import.meta.env.DEV
      ? "http://localhost:5173/dashboard"
      : "https://aureum-desktop.vercel.app/dashboard";

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (error) {
      console.error("Error en login con Google:", error.message);
    } else {
      console.log("Redirigiendo a Google login...");
    }
  };

  return (
    <Button
      variant="secondary"
      type="button"
      onClick={handleGoogleSignIn}
      iconNode={<img src={GoogleLogo} alt="Google Logo" className="w-5 h-5" />}
    >
      {t("signin.continueWithGoogle")}
    </Button>
  );
};

export default GoogleSignIn;
