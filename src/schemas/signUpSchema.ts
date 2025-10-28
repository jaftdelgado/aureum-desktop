import * as yup from "yup";
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
  yup.object().shape({
    firstName: yup
      .string()
      .required(t("validation.required", { field: t("signup.firstName") })),
    lastName: yup
      .string()
      .required(t("validation.required", { field: t("signup.lastName") })),
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.required", { field: t("signup.email") })),
    username: yup
      .string()
      .required(t("validation.required", { field: t("signup.usernameLabel") }))
      .min(3, t("validation.minLength", { field: t("signup.usernameLabel"), min: 3 })),
    accountType: yup
      .string()
      .oneOf(["student", "teacher"], t("validation.invalidSelection"))
      .required(t("validation.required", { field: t("signup.accountType") })),
    password: yup
      .string()
      .required(t("validation.required", { field: t("signup.password") }))
      .min(8, t("validation.minLength", { field: t("signup.password"), min: 8 })),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], t("validation.passwordsMustMatch")) 
      .required(t("validation.required", { field: t("signup.confirmPassword") })), 
  });