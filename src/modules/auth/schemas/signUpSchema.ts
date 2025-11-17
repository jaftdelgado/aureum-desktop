import { z } from "zod";
import type { TFunction } from "i18next";

export type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  accountType: "student" | "teacher";
  password: string;
  confirmPassword: string;
};

export const createSignUpSchema = (t: TFunction) =>
  z
    .object({
      firstName: z
        .string()
        .trim()
        .nonempty({
          message: t("validation.required", { field: t("signup.firstName") }),
        }),

      lastName: z
        .string()
        .trim()
        .nonempty({
          message: t("validation.required", { field: t("signup.lastName") }),
        }),

      email: z
        .string()
        .trim()
        .email({ message: t("validation.email") })
        .nonempty({
          message: t("validation.required", { field: t("signup.email") }),
        }),

      username: z
        .string()
        .trim()
        .nonempty({
          message: t("validation.required", {
            field: t("signup.usernameLabel"),
          }),
        })
        .min(3, {
          message: t("validation.minLength", {
            field: t("signup.usernameLabel"),
            min: 3,
          }),
        }),

      accountType: z.enum(["student", "teacher"]).refine((val) => !!val, {
        message: t("validation.required", { field: t("signup.accountType") }),
      }),

      password: z
        .string()
        .nonempty({
          message: t("validation.required", { field: t("signup.password") }),
        })
        .min(8, {
          message: t("validation.minLength", {
            field: t("signup.password"),
            min: 8,
          }),
        }),

      confirmPassword: z.string().nonempty({
        message: t("validation.required", {
          field: t("signup.confirmPassword"),
        }),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwordsMustMatch"),
      path: ["confirmPassword"],
    });
