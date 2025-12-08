import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";
import { Label } from "@core/ui/Label";
import { Separator } from "@core/ui/Separator";
import { Input } from "@core/ui/Input";
import GoogleSignIn from "@features/auth/components/GoogleSignIn";
import { useLoginForm } from "../hooks/useLoginForm";
import { useIsMobile } from "@app/hooks/useIsMobile";
import { Icon } from "@iconify/react";

interface LoginFormProps {
  onShowRegister: () => void;
  onGoogleMissingProfile?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onShowRegister, onGoogleMissingProfile }) => {
  const { t } = useTranslation("auth");
  const isMobile = useIsMobile();
  const { loading, errorMsg, errors, handleSubmit } = useLoginForm();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await handleSubmit({
      email: String(fd.get("email") || "").trim(),
      password: String(fd.get("password") || ""),
    });
  };

  return (
    <div className={`p-8 rounded-xl w-full ${isMobile ? "max-w-full" : "max-w-[340px] mx-auto"}`}>
      <Label variant="subtitle" color="primary">
        {t("signin.title")}
      </Label>

      <form className="flex flex-col gap-4 mt-6" onSubmit={onSubmit} noValidate>
        
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
            <Icon icon="lucide:alert-circle" className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
            <span className="text-xs text-red-600 font-medium">
              {errorMsg === "INVALID_CREDENTIALS" 
                ? t("signin.errors.invalidCredentials")
                : errorMsg === "EMAIL_NOT_CONFIRMED"
                ? t("signin.errors.emailNotConfirmed")
                : errorMsg === "NETWORK_ERROR"  
                ? t("signin.errors.networkError", "Se perdió la conexión a Internet.")
              : errorMsg}
            </span>
          </div>
        )}

        <Input
          type="email"
          name="email"
          placeholder={t("signin.email")}
          autoComplete="username"
          error={errors.email} 
          disabled={loading}
        />
        
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder={t("signin.password")}
          autoComplete="current-password"
          error={errors.password}
          disabled={loading}
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

        <Button
          variant="default"
          className={`mt-2 ${isMobile ? "w-full" : ""} ${loading ? "opacity-80 cursor-wait" : ""}`}
          type="submit"
          size="lg"
          alignText="center"
          disabled={loading}
        >
          {loading ? t("common.loading") : t("signin.login")}
        </Button>

        <Separator variant="line" className="my-1" />
        
        <GoogleSignIn onMissingProfile={onGoogleMissingProfile} />

        <div className={`flex items-center gap-1 mt-4 ${isMobile ? "justify-start" : "justify-center"}`}>
          <Label variant="body" color="secondary">
            {t("signin.noAccount")}
          </Label>
          <Button 
            variant="link" 
            type="button" 
            onClick={onShowRegister}
            disabled={loading}
          >
            {t("signin.createAccount")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
