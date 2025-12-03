import { z } from "zod";

export const createSignUpSchema = (t: (key: string) => string) => {
  return z
    .object({
      firstName: z.string().min(1, { message: t("signup.errors.firstNameRequired") || "Nombre requerido" }),
      lastName: z.string().min(1, { message: t("signup.errors.lastNameRequired") || "Apellido requerido" }),
      email: z.string().email({ message: t("signup.errors.emailInvalid") || "Email inválido" }),
      username: z
        .string()
        .min(3, { message: t("signup.errors.usernameMin") || "Mínimo 3 caracteres" })
        .regex(/^[a-zA-Z0-9_]+$/, { message: t("signup.errors.usernameInvalid") || "Solo letras, números y _" }),
      
      accountType: z.enum(["student", "teacher"] as const, {
        error: t("signup.errors.accountTypeRequired") || "Selecciona un tipo de cuenta",
      }),

      password: z.string().min(6, { message: t("signup.errors.passwordMin") || "Mínimo 6 caracteres" }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("signup.errors.passwordsDoNotMatch") || "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    });
};

export type SignUpFormData = z.infer<ReturnType<typeof createSignUpSchema>>;