import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
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
import { createLoginSchema } from "@schemas/loginSchema";
import { ToggleSelection } from "@components/ui/ToggleSelection";

interface SignUpFormProps {
  onShowLogin: () => void;
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password?: string;
  accountType?: "student" | "teacher";
};

const SignUpForm: React.FC<SignUpFormProps> = ({ onShowLogin }) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);

  const {
    control,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(createLoginSchema(t)),
    mode: "onBlur",
  });

  const handleNextStep = async () => {
    let isValid = false;

    if (currentStep === 1)
      isValid = await trigger(["firstName", "lastName", "email"]);
    else if (currentStep === 2)
      isValid = await trigger(["username", "accountType"]);
    else if (currentStep === 3) isValid = await trigger(["password"]);

    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="w-full max-w-md text-center">
      <Stepper
        initialStep={1}
        controlledStep={currentStep}
        disableStepClickNavigation
        backButtonText={t("signup.back")}
        nextButtonText={t("signup.next")}
        onStepChange={(step) => setCurrentStep(step)} // Mantener sincronizado si se cambia
        headerContent={
          <div className="flex items-center justify-between mb-2">
            <Label variant="subtitle" color="primary">
              {t("signup.createAccount")}
            </Label>
          </div>
        }
        nextButtonProps={{ onClick: handleNextStep }}
        backButtonProps={{ onClick: handlePrevStep }}
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
          </div>
        </Step>

        {/* Paso 4 */}
        <Step>
          <div className="flex flex-col items-center gap-3">
            <Label variant="body" color="secondary">
              {t("signup.allSet")}
            </Label>
            <p className="text-body text-sm">{t("signup.accountCreated")}</p>
            <Button variant="default" type="button" onClick={onShowLogin}>
              {t("signup.finish")}
            </Button>
          </div>
        </Step>
      </Stepper>
    </div>
  );
};

export default SignUpForm;
