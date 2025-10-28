import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@components/ui/Button";
import { Label } from "@components/ui/Label";
import { Input } from "@components/ui/Input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@components/ui/InputGroup";
import Stepper, { Step } from "@components/ui/stepper/Stepper";
import { createSignUpSchema } from "@schemas/signUpSchema";
import type { SignUpFormData } from "@schemas/signUpSchema";
import { ToggleSelection } from "@components/ui/ToggleSelection";

interface SignUpFormProps {
  onShowLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onShowLogin }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);

  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [apiError, setApiError] = useState<string | null>(null); 

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<SignUpFormData>({ 
    resolver: yupResolver(createSignUpSchema(t)), 
    mode: "onBlur",
    defaultValues: { 
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        accountType: undefined, 
        password: '',
        confirmPassword: ''
    }
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data: SignUpFormData) => {
    setIsSubmitting(true); 
    setApiError(null);     

    const roleIdToSend = data.accountType === 'student' ? 1 : 2; 

    const payload = {
        email: data.email,
        username: data.username,
        password: data.password,
        role_id: roleIdToSend,
        first_name: data.firstName, 
        last_name: data.lastName,
    };

    console.log("Enviando payload:", payload); 

    try {
      const response = await fetch('/auth/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json(); 

      if (!response.ok) {
        console.error("Error del servidor:", result);
        setApiError(result.detail || t("signup.error.generic")); 
      } else {
        console.log("Registro exitoso:", result);
        setCurrentStep((prev: number) => prev + 1); 
      }

    } catch (error) {
      console.error("Error de red:", error);
      setApiError(t("signup.error.network"));
    } finally {
      setIsSubmitting(false); 
    }
  };

  const handleNextStep = async () => {
    let isValid = false;
    let fieldsToValidate: (keyof SignUpFormData)[] = []; 

    if (currentStep === 1) {
        fieldsToValidate = ["firstName", "lastName", "email"];
    } else if (currentStep === 2) {
        fieldsToValidate = ["username", "accountType"];
    } else if (currentStep === 3) {
        fieldsToValidate = ["password", "confirmPassword"];
    }
    
    isValid = await trigger(fieldsToValidate);

    if (isValid) {
      if (currentStep === 3) {
        handleSubmit(onSubmit)(); 
      } else {
        setCurrentStep((prev: number) => prev + 1);
      }
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="w-full max-w-md text-center flex flex-col">
      {apiError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
             {apiError}
          </div>
       )}
      <Stepper
        initialStep={1}
        controlledStep={currentStep}
        disableStepClickNavigation
        backButtonText={t("signup.back")}
        nextButtonText={t("signup.next")}
        onStepChange={(step) => setCurrentStep(step)} 
        headerContent={
          <div className="flex items-center justify-between mb-2">
            <Label variant="subtitle" color="primary">
              {t("signup.createAccount")}
            </Label>
          </div>
        }
        nextButtonProps={{ 
          onClick: handleNextStep,
          disabled: isSubmitting,
          children: isSubmitting ? t("signup.submitting") : t("signup.next")
        }}
        backButtonProps={{ 
          onClick: handlePrevStep,
          disabled: isSubmitting 
        }}
      >
        {/* Paso 1 */}
        <Step>
          <div className="flex flex-col gap-2 text-left">
            <Label variant="body" color="secondary">
              {t("signup.personalInfo")}
            </Label>
            <div className="flex gap-4 mb-2">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={t("signup.firstName")}
                    placeholder={t("signup.firstNamePlaceholder")}
                    error={errors.firstName?.message}
                    className="flex-1 min-w-0"
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={t("signup.lastName")}
                    placeholder={t("signup.lastNamePlaceholder")}
                    error={errors.lastName?.message}
                    className="flex-1 min-w-0"
                  />
                )}
              />
            </div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label={t("signup.email")}
                  placeholder={t("signup.emailPlaceholder")}
                  error={errors.email?.message}
                />
              )}
            />
          </div>
        </Step>

        <Step>
          <div className="flex flex-col gap-4 text-left">
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <InputGroup
                  label={t("signup.usernameLabel")}
                  error={errors.username?.message}
                >
                  <InputGroupInput
                    {...field}
                    placeholder={t("signup.usernamePlaceholder")}
                  />
                  <InputGroupAddon>@</InputGroupAddon>
                </InputGroup>
              )}
            />

            <Controller
              name="accountType"
              control={control}
              render={({ field }) => (
                <ToggleSelection
                  options={[
                    { label: t("signup.student"), value: "student" },
                    { label: t("signup.teacher"), value: "teacher" },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  label={t("signup.accountType")}
                  className="mt-1"
                />
              )}
            />
            {/* Error display para accountType */}
            {errors.accountType?.message && (
              <Label variant="small" color="destructive" className="mt-1 ml-2">
                {errors.accountType.message}
              </Label>
            )}
          </div>
        </Step>

        {/* Paso 3 */}
        <Step>
          <div className="flex flex-col gap-4 text-left">
            <Label variant="body" color="secondary">
              {t("signup.credentials")}
            </Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  label={t("signup.password")}
                  placeholder={t("signup.passwordPlaceholder")}
                  error={errors.password?.message}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  label={t("signup.confirmPassword")} 
                  placeholder={t("signup.confirmPasswordPlaceholder")}
                  error={errors.confirmPassword?.message}
                  />
                )}
            />
          </div>
        </Step>

        {/* Paso 4 */}
        <Step>
          <div className="flex flex-col items-center gap-3">
            <Label variant="subtitle" color="primary">
              {t("signup.allSet")}
            </Label>
            <p className="text-body text-sm">{t("signup.accountCreated")}</p>
            <Button variant="default" type="button" onClick={onShowLogin}> 
              {t("signup.goToLogin")}
            </Button>
          </div>
        </Step>
      </Stepper>
    </div>
  );
};

export default SignUpForm;
