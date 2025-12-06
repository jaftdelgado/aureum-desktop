import { z } from "zod";

export const createLoginSchema = (t: (key: string) => string) => {
  return z.object({
    email: z
      .string()
      .trim() 
      .min(1, { message: t("signin.errors.identifierRequired") })
      .max(254, { message: t("signin.errors.identifierMax") }), // Validación: Longitud

    password: z
      .string()
      .min(1, { message: t("signin.errors.passwordRequired") })
      .max(64, { message: t("signin.errors.passwordMax") }), // Validación: Longitud
  });
};

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;