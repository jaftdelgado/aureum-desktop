import { z } from "zod";

export const createLoginSchema = (t: (key: string) => string) => {
  return z.object({
    email: z
      .string()
      .min(1, { message: t("signin.errors.identifierRequired") }), // Validamos que no esté vacío
    password: z
      .string()
      .min(1, { message: t("signin.errors.passwordRequired") }), // Validamos que no esté vacío
  });
};

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;