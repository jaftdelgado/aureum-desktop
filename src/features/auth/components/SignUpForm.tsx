import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@core/ui/Input";
import { Label } from "@core/ui/Label";
import { Stepper } from "@core/ui/Stepper"; 
import { ToggleSelection } from "@core/ui/ToggleSelection"; 
import { Button } from "@core/ui/Button";
import { AuthApiRepository } from "@infra/external/auth/AuthApiRepository";
import { createSignUpSchema, type SignUpFormData } from "../schemas/signUpSchema";

interface SignUpFormProps {
  onShowLogin: () => void;
  isGoogleFlow?: boolean; 
}

const authRepo = new AuthApiRepository();

const SignUpForm: React.FC<SignUpFormProps> = ({ onShowLogin, isGoogleFlow = false }) => {
  const { t } = useTranslation("auth");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    trigger,
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

  const onSubmit = async (data: SignUpFormData) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      await authRepo.register({
        ...data,
        isGoogle: isGoogleFlow,
      });
      setCurrentStep(4);
    } catch (error: any) {
      setApiError(error.message);
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

    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-[400px] p-6 bg-surface rounded-xl border border-border">
      <Label variant="subtitle" className="mb-4 text-center block" color="primary">
        {t("signup.createAccount", "Crear Cuenta")}
      </Label>

      {apiError && (
        <div className="p-3 mb-4 text-sm bg-red-100 text-red-700 rounded-md border border-red-200">
          {apiError}
        </div>
      )}

      {currentStep < 4 ? (
        <Stepper
          currentStep={currentStep}
          totalSteps={3}
          onNext={handleNext}
          onBack={() => setCurrentStep((prev) => prev - 1)}
          isSubmitting={isSubmitting}
          nextLabel={currentStep === 3 ? t("signup.finish", "Finalizar") : t("common.next", "Siguiente")}
          backLabel={t("common.back", "Atrás")}
        >
          {/* PASO 1: Datos Personales */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex gap-4">
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} label={t("signup.firstName", "Nombre")} error={errors.firstName?.message} />
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} label={t("signup.lastName", "Apellido")} error={errors.lastName?.message} />
                  )}
                />
              </div>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="email" label={t("signup.email", "Correo")} error={errors.email?.message} disabled={isGoogleFlow} />
                )}
              />
            </div>
          )}

          {/* PASO 2: Perfil Académico */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input 
                    {...field} 
                    label={t("signup.username", "Nombre de Usuario")} 
                    placeholder="@usuario" 
                    error={errors.username?.message} 
                  />
                )}
              />
              <Controller
                name="accountType"
                control={control}
                render={({ field }) => (
                  <ToggleSelection
                    label={t("signup.role", "Soy...")}
                    options={[
                      { label: t("signup.student", "Estudiante"), value: "student" },
                      { label: t("signup.professor", "Profesor"), value: "teacher" },
                    ]}
                    value={field.value ?? "student"}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.accountType && <span className="text-xs text-destructive">{errors.accountType.message}</span>}
            </div>
          )}

          {/* PASO 3: Seguridad */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="password" label={t("signup.password", "Contraseña")} error={errors.password?.message} />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="password" label={t("signup.confirmPassword", "Confirmar Contraseña")} error={errors.confirmPassword?.message} />
                )}
              />
            </div>
          )}
        </Stepper>
      ) : (
        /* PASO 4: Éxito */
        <div className="text-center animate-in zoom-in duration-300">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-lg font-bold text-primary mb-2">{t("signup.successTitle", "¡Cuenta Creada!")}</h3>
          <p className="text-secondary text-sm mb-6">{t("signup.successMsg", "Tu perfil ha sido configurado correctamente.")}</p>
          <Button variant="default" onClick={onShowLogin} className="w-full">
            {t("signup.goToLogin", "Ir a Iniciar Sesión")}
          </Button>
        </div>
      )}

      {currentStep < 4 && (
        <div className="mt-4 text-center">
          <Button variant="link" onClick={onShowLogin} className="text-sm">
            {t("signup.alreadyHaveAccount", "¿Ya tienes cuenta? Inicia sesión")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;