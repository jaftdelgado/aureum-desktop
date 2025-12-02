// src/features/auth/hooks/useLoginForm.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormValidation } from "@app/hooks/useFormValidation";
import { useAuth } from "@app/hooks/useAuth";
import { LoginUseCase } from "@domain/use-cases/auth/LoginUseCase";
import { AuthApiRepository } from "@infra/external/auth/AuthApiRepository";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";

const authRepository = new AuthApiRepository();
const loginUseCase = new LoginUseCase(authRepository);

export const useLoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { errors, setErrors, validateFields } = useFormValidation([
    {
      field: "email",
      validate: (value) => (!value.trim() ? "REQUIRED" : null),
    },
    {
      field: "password",
      validate: (value) => (!value.trim() ? "REQUIRED" : null),
    },
  ]);

  const handleSubmit = async (formData: {
    email: string;
    password: string;
  }) => {
    setErrors({});
    setErrorMsg(null);
    setLoading(true);

    if (!validateFields(formData)) {
      setLoading(false);
      return;
    }

    try {
      // Llamamos al UseCase del dominio
      const user: LoggedInUser = await loginUseCase.execute(
        formData.email,
        formData.password
      );

      console.log("Login success", user);

      // Guardamos el usuario en el contexto global (UI / App)
      setUser(user);

      // Navegamos al home
      navigate("/home", { replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("INVALID_CREDENTIALS");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, errorMsg, errors, handleSubmit };
};
