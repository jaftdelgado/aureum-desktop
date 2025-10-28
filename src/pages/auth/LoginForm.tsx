import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@components/ui/Button";
import { Label } from "@components/ui/Label";
import { Separator } from "@components/ui/Separator";
import { Input } from "@components/ui/Input";
import GoogleSignIn from "@components/GoogleSignIn";
import { login } from "@lib/auth";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onShowRegister: () => void;
}

type FieldErrors = {
  identifier?: string;
  password?: string;
};

const LoginForm: React.FC<LoginFormProps> = ({ onShowRegister }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const fd = new FormData(e.currentTarget);
      const identifier = String(fd.get("identifier") || "").trim();
      const password = String(fd.get("password") || "");

      const newErrors: FieldErrors = {};
      if (!identifier) newErrors.identifier = t("signin.errors.identifierRequired");
      if (!password)   newErrors.password   = t("signin.errors.passwordRequired");

      if (newErrors.identifier || newErrors.password) {
        setErrors(newErrors);
        return;
      }

      const { access_token } = await login(identifier, password);

      // Si usas Bearer en el resto de llamadas:
      localStorage.setItem("aureum_token", access_token);
      // Si migras a cookie httpOnly, elimina la línea de arriba y añade credentials: "include" en tus fetch.

      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      // Muestra el error a nivel de contraseña (o distribúyelo como prefieras)
      setErrors((prev) => ({
        ...prev,
        password:
          err?.message ||
          t("signin.invalidCredentials") ||
          "Credenciales inválidas.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-panel border border-sidebarHoverBtn p-8 rounded-xl w-full max-w-xs text-center">
      <Label variant="subtitle" color="primary">
        {t("signin.welcome")}
      </Label>

      <form className="flex flex-col gap-4 mt-6" onSubmit={onSubmit} noValidate>
        <Input
          type="email"
          name="identifier"
          label={t("signin.usernameOrEmail")}
          placeholder={t("signin.usernameOrEmail")}
          autoComplete="username"
          error={errors.identifier}
          disabled={loading}
        />

        <Input
          type="password"
          name="password"
          label={t("signin.password")}
          placeholder={t("signin.password")}
          autoComplete="current-password"
          error={errors.password}
          disabled={loading}
        />

        <Button variant="default" className="mt-2" type="submit" disabled={loading}>
          {loading ? t("common.loading") : t("signin.login")}
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
