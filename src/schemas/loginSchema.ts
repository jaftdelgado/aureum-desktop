import * as yup from "yup";
import type { TFunction } from "i18next";

export const createLoginSchema = (t: TFunction) =>
  yup.object({
    firstName: yup
      .string()
      .trim()
      .required(t("validation.required"))
      .min(2, t("validation.required"))
      .max(50, t("validation.required")),

    lastName: yup
      .string()
      .trim()
      .required(t("validation.required"))
      .min(2, t("validation.required"))
      .max(50, t("validation.required")),

    username: yup
      .string()
      .trim()
      .required(t("validation.required"))
      .min(3, t("validation.usernameMin"))
      .max(30, t("validation.usernameMax")),

    email: yup
      .string()
      .trim()
      .required(t("validation.required"))
      .email(t("validation.emailInvalid")),
  });
