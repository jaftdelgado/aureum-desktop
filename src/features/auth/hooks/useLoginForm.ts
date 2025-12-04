import { useState} from "react";
import { useAuth } from "@app/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { AuthApiRepository } from "@infra/external/auth/AuthApiRepository";
import { LoginUseCase } from "@domain/use-cases/auth/LoginUseCase";
import { createLoginSchema, type LoginFormData } from "../schemas/loginSchema";

const authRepo = new AuthApiRepository();
const loginUseCase = new LoginUseCase(authRepo);

export const useLoginForm = () => {
  const { t } = useTranslation("auth");
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setErrorMsg(null);
    setFieldErrors({});

    const loginSchema = createLoginSchema(t);
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue: { path: { toString: () => string | number; }[]; message: string; }) => {
        if (issue.path[0]) {
          formattedErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setFieldErrors(formattedErrors);
      setLoading(false);
      return;
    }

    try {
      const user = await loginUseCase.execute(data.email, data.password);
      setUser(user); 
    } catch (error: any) {
      const message = error.message || "";
      console.error("Login error:", message);

      if (message.includes("Invalid login credentials")) {
        setErrorMsg("INVALID_CREDENTIALS");
      } else if (message.includes("Email not confirmed")) {
        setErrorMsg("EMAIL_NOT_CONFIRMED");
      } else {
        setErrorMsg(message); 
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    errorMsg,
    errors: fieldErrors, 
    handleSubmit,
  };
};