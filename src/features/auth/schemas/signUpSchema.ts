import { z } from "zod";

const RESERVED_USERNAMES = ["admin", "root", "support", "system", "user", "guest", "aureum"];

const NAME_REGEX = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
const PASSWORD_COMPLEXITY_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
const REPEATING_CHARS_REGEX = /(.)\1{5,}/;

export const createSignUpSchema = (t: (key: string) => string) => {
  return z
    .object({
      firstName: z
        .string()
        .transform((val) => val.trim().replace(/\s+/g, " "))
        .pipe(
          z
            .string()
            .min(2, { message: t("signup.errors.nameLength") })
            .max(50, { message: t("signup.errors.nameLength") })
            .regex(NAME_REGEX, { message: t("signup.errors.nameInvalid") })
        ),

      lastName: z
        .string()
        .transform((val) => val.trim().replace(/\s+/g, " "))
        .pipe(
          z
            .string()
            .min(2, { message: t("signup.errors.nameLength") })
            .max(50, { message: t("signup.errors.nameLength") })
            .regex(NAME_REGEX, { message: t("signup.errors.nameInvalid") })
        ),

      email: z
        .string()
        .transform((val) => val.trim().toLowerCase()) 
        .pipe(
          z
            .string()
            .email({ message: t("signup.errors.emailInvalid") })
            .max(254, { message: t("signup.errors.emailLength") })
        ),

      username: z
        .string()
        .transform((val) => val.trim())
        .pipe(
          z
            .string()
            .min(4, { message: t("signup.errors.usernameMin") })
            .max(20, { message: t("signup.errors.usernameMax") })
            .regex(USERNAME_REGEX, { message: t("signup.errors.usernameInvalid") })
            .refine((val) => !RESERVED_USERNAMES.includes(val.toLowerCase()), {
              message: t("signup.errors.usernameReserved"),
            })
        ),

      accountType: z.enum(["student", "teacher"], {
        error: t("signup.errors.accountTypeRequired"),
      }),

      password: z
        .string()
        .min(8, { message: t("signup.errors.passwordMin") })
        .refine((val) => val.trim() === val, {
          message: t("signup.errors.passwordSpaces"),
        })
        .refine((val) => PASSWORD_COMPLEXITY_REGEX.test(val), {
          message: t("signup.errors.passwordComplexity"),
        })
        .refine((val) => !REPEATING_CHARS_REGEX.test(val), {
          message: t("signup.errors.passwordRepeating"),
        })
        .refine((val) => !["123456", "password", "12345678", "qwerty"].includes(val), {
          message: t("signup.errors.passwordCommon"),
        }),

      confirmPassword: z.string(),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t("signup.errors.passwordsDoNotMatch"),
          path: ["confirmPassword"],
        });
      }

      const passLower = data.password.toLowerCase();
      const checks = [
        { val: data.username.toLowerCase(), field: "username" },
        { val: data.firstName.toLowerCase(), field: "nombre" },
        { val: data.email.split("@")[0].toLowerCase(), field: "email" },
      ];

      checks.forEach((check) => {
        if (check.val.length > 3 && passLower.includes(check.val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("signup.errors.passwordSimilar"),
            path: ["password"],
          });
        }
      });
    });
};

export type SignUpFormData = z.infer<ReturnType<typeof createSignUpSchema>>;