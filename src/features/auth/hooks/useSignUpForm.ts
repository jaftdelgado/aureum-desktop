import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { createSignUpSchema, type SignUpFormData } from "../schemas/signUpSchema";
import { RegisterUseCase } from "@domain/use-cases/auth/RegisterUseCase";
import { GetSocialUserUseCase } from "@domain/use-cases/auth/GetSocialUserUseCase";
import { DI } from "@app/di/container";

const GOOGLE_AUTH_DUMMY_PASS = "Google_Auth_Dummy_123!";

export const useSignUpForm = (onShowLogin: () => void, isGoogleFlow: boolean) => {
  const { t } = useTranslation("auth");
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(createSignUpSchema((key) => t(key))),
    defaultValues: {
      accountType: "student",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      username: ""
    }
  });

  useEffect(() => {
    if (isGoogleFlow) {
      const loadData = async () => {
        const getSocialUser = new GetSocialUserUseCase(DI.authRepository);
        const socialUser = await getSocialUser.execute();
        
        if (socialUser) {
          setValue("email", socialUser.email);
          setValue("password", GOOGLE_AUTH_DUMMY_PASS);
          setValue("confirmPassword", GOOGLE_AUTH_DUMMY_PASS);
          
          if (socialUser.firstName.length >= 2 && socialUser.lastName.length >= 2) {
             setValue("firstName", socialUser.firstName);
             setValue("lastName", socialUser.lastName);
             setCurrentStep(2);
          } else {
             setValue("firstName", socialUser.firstName);
             if (socialUser.lastName) setValue("lastName", socialUser.lastName);
          }
        }
      };
      loadData();
    }
  }, [isGoogleFlow, setValue]);

  const onSubmit = async (data: SignUpFormData) => {
    setIsSubmitting(true);
    setApiError(null);
    
    try {
      const registerUseCase = new RegisterUseCase(DI.authRepository);
      
      await registerUseCase.execute({
        ...data,
        isGoogle: isGoogleFlow,
      });
      setCurrentStep(4);
    } catch (error: any) {
      const errorMessage = error.message || "";
      
      if (errorMessage.includes("already registered") || errorMessage.includes("already exists")) {
        setCurrentStep(1);
        setError("email", {
          type: "manual",
          message: t("signup.errors.emailAlreadyRegistered"),
        });
      } else {
        setApiError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    let isValid = false;
    
    if (currentStep === 1) isValid = await trigger(["firstName", "lastName", "email"]);
    if (currentStep === 2) isValid = await trigger(["username", "accountType"]);
    
    if (currentStep === 3) {
        isValid = await trigger(["password", "confirmPassword"]);
        if (isValid) handleSubmit(onSubmit)();
        return;
    }

    if (currentStep === 2 && isGoogleFlow) {
        if (isValid) {
            handleSubmit(onSubmit, (formErrors) => {
                if (formErrors.firstName || formErrors.lastName) {
                    setApiError("Por favor verifica tu nombre y apellido.");
                    setCurrentStep(1);
                }
            })();
        }
        return;
    }

    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  return {
    t,
    control,
    errors,
    apiError,
    currentStep,
    setCurrentStep,
    isSubmitting,
    showPassword,
    togglePassword: () => setShowPassword(!showPassword),
    handleNext,
    watch,
    onShowLogin,
    shouldHideBackButton: isGoogleFlow && currentStep === 2 && !errors.firstName && !errors.lastName
  };
};