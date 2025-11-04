import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@components/ui/Button";
import { Label } from "@components/ui/Label";
import { Separator } from "@components/ui/Separator";
import { Input } from "@components/ui/Input";
import GoogleSignIn from "@components/GoogleSignIn";
import { useNavigate } from "react-router-dom";
import { login, isNetworkError, isApiError, ApiError } from "@lib/auth";
import { useFormValidation } from "@hooks/useFormValidation";

interface LoginFormProps {
  onShowRegister: () => void;
}

interface LoginFields {
  identifier: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onShowRegister }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { errors, setErrors, validateFields } = useFormValidation<LoginFields>([
    {
      field: "identifier",
      validate: (value) =>
        !String(value).trim()
          ? t("signin.errors.identifierRequired", {
              defaultValue: "Ingresa tu correo o usuario.",
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
    setLoading(true);

    try {
      const fd = new FormData(e.currentTarget);
      const formData: LoginFields = {
        identifier: String(fd.get("identifier") || "").trim(),
        password: String(fd.get("password") || ""),
      };

      const isValid = validateFields(formData);
      if (!isValid) {
        setLoading(false);
        return;
      }

      const { access_token } = await login(
        formData.identifier,
        formData.password
      );
      localStorage.setItem("aureum_token", access_token);
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      let uiMsg: string;

      if (isNetworkError(err)) {
        uiMsg = t("signin.errors.networkError", {
          defaultValue: "Error de conexión, verifica tu red.",
        });
      } else if (isApiError(err)) {
        const e = err as ApiError;
        if (e.status === 401 || /incorrect|invalid/i.test(e.message)) {
          uiMsg = t("signin.errors.invalidCredentials", {
            defaultValue: "Correo/usuario o contraseña incorrectos.",
          });
        } else {
          uiMsg = t("signup.error.generic", {
            defaultValue: "Ocurrió un error. Inténtalo de nuevo.",
          });
        }
      } else {
        uiMsg = t("signup.error.generic", {
          defaultValue: "Ocurrió un error. Inténtalo de nuevo.",
        });
      }

      setErrors((prev) => ({ ...prev, password: uiMsg }));
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
          name="identifier"
          placeholder={t("signin.usernameOrEmail")}
          autoComplete="username"
          error={errors.identifier}
          disabled={loading}
        />

        <Input
          type="password"
          name="password"
          placeholder={t("signin.password")}
          autoComplete="current-password"
          error={errors.password}
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
