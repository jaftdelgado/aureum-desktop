import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";
import { Label } from "@core/ui/Label";
import { Separator } from "@core/ui/Separator";
import { Input } from "@core/ui/Input";
import GoogleSignIn from "@features/auth/components/GoogleSignIn";
import { useLoginForm } from "../hooks/useLoginForm";
import { useIsMobile } from "@app/hooks/useIsMobile";

interface LoginFormProps {
  onShowRegister: () => void;
  onGoogleMissingProfile: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onShowRegister, onGoogleMissingProfile }) => {
  const { t } = useTranslation("auth");
  const isMobile = useIsMobile();
  const { loading, errorMsg, errors, handleSubmit } = useLoginForm();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    await handleSubmit({
      email: String(fd.get("email") || "").trim(),
      password: String(fd.get("password") || ""),
    });
  };

  return (
    <div
      className={`p-8 rounded-xl w-full ${
        isMobile ? "max-w-full" : "max-w-[340px] mx-auto"
      }`}
    >
      <Label variant="subtitle" color="primary">
        {t("signin.title")}
      </Label>

      <form className="flex flex-col gap-4 mt-6" onSubmit={onSubmit} noValidate>
        <Input
          type="email"
          name="email"
          placeholder={t("signin.usernameOrEmail")}
          autoComplete="username"
          error={
            errors.email === "REQUIRED"
              ? t("signin.errors.identifierRequired")
              : undefined
          }
          disabled={loading}
          className={isMobile ? "w-full" : ""}
        />
        <Input
          type="password"
          name="password"
          placeholder={t("signin.password")}
          autoComplete="current-password"
          error={
            errorMsg === "INVALID_CREDENTIALS"
              ? t("signin.errors.invalidCredentials")
              : errors.password === "REQUIRED"
              ? t("signin.errors.passwordRequired")
              : undefined
          }
          disabled={loading}
          className={isMobile ? "w-full" : ""}
        />

        <Button
          variant="default"
          className={`mt-2 ${isMobile ? "w-full" : ""}`}
          type="submit"
          size="lg"
          alignText="center"
          disabled={loading}
        >
          {loading
            ? t("common.loading", { defaultValue: "Cargando..." })
            : t("signin.login")}
        </Button>

        <Separator variant="line" className="my-1" />
        <GoogleSignIn onMissingProfile={onGoogleMissingProfile}/>

        <div
          className={`flex items-center gap-1 mt-4 ${
            isMobile ? "justify-start" : "justify-center"
          }`}
        >
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
