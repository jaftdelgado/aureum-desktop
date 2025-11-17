import { z } from "zod";
import type { TFunction } from "i18next";

export const createLoginSchema = (t: TFunction) =>
  z.object({
    firstName: z
      .string()
      .trim()
      .min(2, { message: t("validation.required") })
      .max(50, { message: t("validation.required") })
      .nonempty({ message: t("validation.required") }),

    lastName: z
      .string()
      .trim()
      .min(2, { message: t("validation.required") })
      .max(50, { message: t("validation.required") })
      .nonempty({ message: t("validation.required") }),

    username: z
      .string()
      .trim()
      .min(3, { message: t("validation.usernameMin") })
      .max(12, { message: t("validation.usernameMax") })
      .nonempty({ message: t("validation.required") }),

    email: z
      .string()
      .trim()
      .email({ message: t("validation.emailInvalid") })
      .nonempty({ message: t("validation.required") }),
  });
