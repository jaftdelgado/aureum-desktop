import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@core/ui/Button";
import { Separator } from "@core/ui/Separator";
import { ThemeToggleButton } from "@app/components/ThemeToggleButton";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { useAuth } from "@app/hooks/useAuth"; 
import { CheckProfileExistsUseCase } from "@domain/use-cases/auth/CheckProfileExistsUseCase";
import { DI } from "@app/di/container";

const AuthPage: React.FC = () => {
  const { t } = useTranslation("auth");
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();

  const [showRegister, setShowRegister] = useState(false);
  const [isGoogleFlow, setIsGoogleFlow] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(false);

  useEffect(() => {
    const verifyProfile = async () => {
      if (user && !showRegister) {
        setCheckingProfile(true);
        try {
          const checkProfileUseCase = new CheckProfileExistsUseCase(DI.profileRepository);
          
          const exists = await checkProfileUseCase.execute(user.id);
          if (exists) {
            navigate("/home", { replace: true });
          } else {
            setIsGoogleFlow(true);
            setShowRegister(true);
          }
        } catch (error) {
          await logout();
        } finally {
          setCheckingProfile(false);
        }
      }
    };

    if (!authLoading) {
      verifyProfile();
    }
  }, [user, authLoading, navigate, showRegister, logout]);

  const handleShowRegister = async () => {
    if (user) {
      await logout();
    }
    setShowRegister(true);
    setIsGoogleFlow(false);
  };

  const handleShowLogin = async () => {
    if (user) {
      await logout();
      window.location.reload(); 
      return;
    }

    setShowRegister(false);
    setIsGoogleFlow(false);
  };

  const handleGoogleMissingProfile = () => {
    setIsGoogleFlow(true);
    setShowRegister(true);
  };

  if (authLoading || checkingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <p className="text-body">{t("common.loading")}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-bg">
      <div className="absolute inset-0">
        <div className="relative h-full w-full bg-bg"></div>
      </div>

      <header className="relative z-10 w-full flex items-center justify-end p-4 gap-3">
        <Button
          variant="thirdy"
          onClick={showRegister ? handleShowLogin : handleShowRegister}
          className="w-auto"
        >
          {showRegister ? t("signin.login") : t("signin.createAccount")}
        </Button>
        <Separator variant="vertical" className="h-6" />
        <ThemeToggleButton />
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-300">
          {showRegister ? (
            <SignUpForm 
              onShowLogin={handleShowLogin} 
              isGoogleFlow={isGoogleFlow} 
            />
          ) : (
            <LoginForm 
              onShowRegister={handleShowRegister} 
              onGoogleMissingProfile={handleGoogleMissingProfile}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default AuthPage;