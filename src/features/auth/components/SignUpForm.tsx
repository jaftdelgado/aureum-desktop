import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "@core/ui/Input";
import { Label } from "@core/ui/Label";
import { Stepper } from "@core/ui/Stepper"; 
import { ToggleSelection } from "@core/ui/ToggleSelection"; 
import { Button } from "@core/ui/Button";
import { PasswordStrength } from "./PasswordStrength";
import { Icon } from "@iconify/react";
import { useSignUpForm } from "../hooks/useSignUpForm"; // 👇 Importamos el hook

interface SignUpFormProps {
  onShowLogin: () => void;
  isGoogleFlow?: boolean; 
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onShowLogin, isGoogleFlow = false }) => {
  const {
    t,
    control,
    errors,
    apiError,
    currentStep,
    setCurrentStep,
    isSubmitting,
    showPassword,
    togglePassword,
    handleNext,
    watch,
    shouldHideBackButton
  } = useSignUpForm(onShowLogin, isGoogleFlow);

  const watchedPassword = watch("password");

  return (
    <div className="w-full max-w-[400px] p-6 bg-surface rounded-xl border border-border">
      <Label variant="subtitle" className="mb-4 text-center block" color="primary">
        {isGoogleFlow ? t("signup.finish", "Completar Registro") : t("signup.createAccount", "Crear Cuenta")}
      </Label>

      {apiError && (
        <div className="p-3 mb-4 text-sm bg-red-100 text-red-700 rounded-md border border-red-200 animate-in fade-in slide-in-from-top-2">
          {apiError}
        </div>
      )}

      {currentStep < 4 ? (
        <Stepper
          currentStep={currentStep}
          totalSteps={isGoogleFlow ? 2 : 3} 
          onNext={handleNext}
          onBack={() => {
            if (shouldHideBackButton) return;
            setCurrentStep((prev) => prev - 1);
          }}
          isSubmitting={isSubmitting}
          loadingLabel={t("common.loading")}
          nextLabel={
            (currentStep === 3) || (isGoogleFlow && currentStep === 2) 
              ? t("signup.finish", "Finalizar") 
              : t("common.next", "Siguiente")
          }
          backLabel={t("common.back", "Atrás")}
          backButtonProps={{
            className: (currentStep === 1 || shouldHideBackButton) ? "invisible pointer-events-none" : "",
            disabled: isSubmitting
          }}
        >
          {/* PASO 1: Datos Personales */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex gap-4">
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} label={t("signup.firstName", "Nombre")} error={errors.firstName?.message } autoComplete="given-name"/>
                  )}
                />
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} label={t("signup.lastName", "Apellido")} error={errors.lastName?.message} autoComplete="family-name"/>
                  )}
                />
              </div>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input 
                    {...field} 
                    type="email" 
                    label={t("signup.email", "Correo")} 
                    error={errors.email?.message} 
                    disabled={isGoogleFlow} 
                    autoComplete="email"
                  />
                )}
              />
            </div>
          )}

          {/* PASO 2: Perfil Académico */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
              {isGoogleFlow && (
                 <p className="text-sm text-secondary text-center mb-2">
                   {t("signup.googleFlowMessage")}
                 </p>
              )}
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input 
                    {...field} 
                    label={t("signup.username", "Nombre de Usuario")} 
                    placeholder="usuario" 
                    error={errors.username?.message}
                    autoComplete="username"
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
                    error={errors.accountType?.message}
                  />
                )}
              />
            </div>
          )}

          {/* PASO 3: Seguridad */}
          {currentStep === 3 && !isGoogleFlow && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex flex-col gap-1">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                        type={showPassword ? "text" : "password"} 
                        label={t("signup.password")}
                        error={errors.password?.message}
                        autoComplete="new-password"
                        endContent={
                        <button
                          type="button"
                          onClick={togglePassword}
                          className="hover:text-primaryText transition-colors focus:outline-none"
                          tabIndex={-1}
                        >
                          <Icon 
                            icon={showPassword ? "lucide:eye-off" : "lucide:eye"} 
                            width={18} 
                          />
                        </button>
                      }
                    />
                  )}
                />
                {watchedPassword && watchedPassword.length > 0 && (
                  <PasswordStrength password={watchedPassword} />
                )}
              </div>

              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password" 
                    label={t("signup.confirmPassword")}
                    error={errors.confirmPassword?.message}
                    autoComplete="new-password"
                  />
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
            {t("signup.goToLogin")}
          </Button>
        </div>
      )}

      {currentStep < 4 && !isGoogleFlow && (
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