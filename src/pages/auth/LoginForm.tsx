import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@components/ui/Button";
import { Label } from "@components/ui/Label";
import { Separator } from "@components/ui/Separator";
import { Input } from "@components/ui/Input";
import GoogleSignIn from "@components/GoogleSignIn";

interface LoginFormProps {
  onShowRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onShowRegister }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-panel border border-sidebarHoverBtn p-8 rounded-xl w-full max-w-xs text-center">
      <Label variant="subtitle" color="primary">
        {t("signin.welcome")}
      </Label>

      <form className="flex flex-col gap-4 mt-6">
        <Input type="email" placeholder={t("signin.usernameOrEmail")} />
        <Input type="password" placeholder={t("signin.password")} />

        <Button variant="default" className="mt-2" type="submit">
          {t("signin.login")}
        </Button>

        <Separator variant="line" className="my-1" />

        <GoogleSignIn />

        <div className="flex justify-center items-center gap-1 text-sm mt-4">
          <Label variant="body" color="secondary">
            {t("signin.noAccount")}
          </Label>
          <Button variant="link" type="button" onClick={onShowRegister}>
            {t("signin.createAccount")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
