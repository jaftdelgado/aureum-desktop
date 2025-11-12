// src/pages/auth/LoginForm.tsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@components/ui/Button";
import { Label } from "@components/ui/Label";
import { Separator } from "@components/ui/Separator";
import { Input } from "@components/ui/Input";
import GoogleSignIn from "@components/GoogleSignIn";
import { useNavigate } from "react-router-dom";
import { supabase } from "@lib/supabaseClient";
import { useFormValidation } from "@hooks/useFormValidation";

interface LoginFormProps {
  onShowRegister: () => void;
}

interface LoginFields {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onShowRegister }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { errors, setErrors, validateFields } = useFormValidation<LoginFields>([
    {
      field: "email",
      validate: (value) =>
        !String(value).trim()
          ? t("signin.errors.identifierRequired", {
              defaultValue: "Ingresa tu correo.",
            })
          : null,
    },
    {
      field: "password",
      validate: (value) =>
        !String(value).trim()
          ? t("signin.errors.passwordRequired", {
              defaultValue: "Ingresa tu contraseña.",
            })
          : null,
    },
  ]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setErrors({});
    setErrorMsg(null);
    setLoading(true);

    try {
      const fd = new FormData(e.currentTarget);
      const formData: LoginFields = {
        email: String(fd.get("email") || "").trim(),
        password: String(fd.get("password") || ""),
      };

      const isValid = validateFields(formData);
      if (!isValid) {
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrorMsg(
          error.message ||
            t("signin.errors.invalidCredentials", {
              defaultValue: "Correo o contraseña incorrectos.",
            })
        );
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch {
      setErrorMsg(
        t("signup.error.generic", {
          defaultValue: "Ocurrió un error. Inténtalo de nuevo.",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-panel border border-sidebarHoverBtn p-8 rounded-xl w-full max-w-xs">
      <Label
        variant="subtitle"
        color="primary"
        className="text-left self-start"
      >
        {t("signin.title")}
      </Label>

      <form className="flex flex-col gap-4 mt-6" onSubmit={onSubmit} noValidate>
        <Input
          type="email"
          name="email"
          placeholder={t("signin.usernameOrEmail")}
          autoComplete="username"
          error={errors.email}
          disabled={loading}
        />

        <Input
          type="password"
          name="password"
          placeholder={t("signin.password")}
          autoComplete="current-password"
          error={errorMsg || errors.password}
          disabled={loading}
        />

        <Button
          variant="default"
          className="mt-2"
          type="submit"
          disabled={loading}
        >
          {loading
            ? t("common.loading", { defaultValue: "Cargando..." })
            : t("signin.login")}
        </Button>

        <Separator variant="line" className="my-1" />

        {/* Botón de login con Google usando Supabase */}
        <GoogleSignIn />

        <div className="flex justify-center items-center gap-1 mt-4 text-left self-start">
          <Label
            variant="body"
            color="secondary"
            className="align-middle mr-0.5"
          >
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
