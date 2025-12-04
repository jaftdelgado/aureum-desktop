import React, { useState, useEffect } from "react";
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
import { supabase } from "@infra/external/http/supabase"; 
import { PasswordStrength } from "./PasswordStrength";
import { Icon } from "@iconify/react";

interface SignUpFormProps {
  onShowLogin: () => void;
  isGoogleFlow?: boolean; 
}

const GOOGLE_AUTH_DUMMY_PASS = "GOOGLE_AUTH_DUMMY_PASS";
const authRepo = new AuthApiRepository();

const SignUpForm: React.FC<SignUpFormProps> = ({ onShowLogin, isGoogleFlow = false }) => {
  const { t } = useTranslation("auth");
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(isGoogleFlow ? 2 : 1);
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

  const watchedPassword = watch("password");
  const togglePassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (isGoogleFlow) {
      const loadGoogleData = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const email = user.email || "";
          const fullName = user.user_metadata?.full_name || user.user_metadata?.name || "";
          
          const nameParts = fullName.split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          setValue("email", email);
          setValue("firstName", firstName);
          setValue("lastName", lastName);

          setValue("password", GOOGLE_AUTH_DUMMY_PASS);
          setValue("confirmPassword", GOOGLE_AUTH_DUMMY_PASS);
        }
      };
      
      loadGoogleData();
    }
  }, [isGoogleFlow, setValue]);

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
      const errorMessage = error.message || "";
      if (
        errorMessage.includes("already registered") || 
        errorMessage.includes("already exists")
      ) {
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
        if (isValid) handleSubmit(onSubmit)();
        return;
    }

    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const shouldHideBackButton = currentStep === 1 || (isGoogleFlow && currentStep === 2);

  return (
    <div className="w-full max-w-[400px] p-6 bg-surface rounded-xl border border-border">
      <Label variant="subtitle" className="mb-4 text-center block" color="primary">
        {isGoogleFlow ? t("signup.finish", "Completar Registro") : t("signup.createAccount", "Crear Cuenta")}
      </Label>

      {apiError && (
        <div className="p-3 mb-4 text-sm bg-red-100 text-red-700 rounded-md border border-red-200">
          {apiError}
        </div>
      )}

      {currentStep < 4 ? (
        <Stepper
          currentStep={currentStep}
          totalSteps={isGoogleFlow ? 2 : 3} 
          onNext={handleNext}
          onBack={() => {
            if (isGoogleFlow && currentStep === 2) return;
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
            className: shouldHideBackButton ? "invisible pointer-events-none" : "",
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
                  <Input {...field} type="email" label={t("signup.email", "Correo")} error={errors.email?.message} disabled={isGoogleFlow} autoComplete="email"/>
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

          {/* PASO 3: Seguridad (Solo si NO es Google Flow) */}
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
            {isGoogleFlow ? t("signup.goToDashboard") : t("signup.goToLogin")}
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