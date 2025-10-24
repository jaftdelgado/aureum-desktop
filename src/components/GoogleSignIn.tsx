import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@components/ui/Button";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleLogo from "@assets/svg/google-logo.svg";

const GoogleSignIn: React.FC = () => {
  const { t } = useTranslation();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Token de Google:", tokenResponse.access_token);
    },
    onError: () => {
      console.log("Login con Google fallido");
    },
  });

  return (
    <Button
      variant="secondary"
      type="button"
      onClick={() => login()}
      iconNode={<img src={GoogleLogo} alt="Google Logo" className="w-5 h-5" />}
    >
      {t("signin.continueWithGoogle")}
    </Button>
  );
};

export default GoogleSignIn;
