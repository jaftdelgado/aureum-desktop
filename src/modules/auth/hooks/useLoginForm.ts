import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@lib/supabaseClient";
import { useFormValidation } from "@hooks/useFormValidation";
import { useTranslation } from "react-i18next";

export interface LoginFields {
  email: string;
  password: string;
}

export const useLoginForm = () => {
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

  const handleSubmit = async (formData: LoginFields) => {
    setErrors({});
    setErrorMsg(null);
    setLoading(true);

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

    setLoading(false);
  };

  return {
    loading,
    errorMsg,
    errors,
    handleSubmit,
  };
};
