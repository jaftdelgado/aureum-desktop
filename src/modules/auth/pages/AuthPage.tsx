import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import SignUpForm from "@auth/components/SignUpForm";
import LoginForm from "@auth/components/LoginForm";
import { ThemeToggleButton } from "@ui/ThemeToggle";
import { Button } from "@core/base-design/Button";
import { Separator } from "@core/base-design/Separator";

const AuthPage: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-bg">
      <div className="absolute inset-0">
        <div className="relative h-full w-full bg-bg"></div>
      </div>

      <header className="relative z-10 w-full flex items-center justify-end p-4 gap-3">
        <Button
          variant="thirdy"
          onClick={() => setShowRegister(!showRegister)}
          className="w-auto"
        >
          {showRegister ? "Iniciar sesión" : t("signin.createAccount")}
        </Button>
        <Separator variant="vertical" className="h-6" />
        <ThemeToggleButton />
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center">
        {!showRegister ? (
          <LoginForm onShowRegister={() => setShowRegister(true)} />
        ) : (
          <SignUpForm onShowLogin={() => setShowRegister(false)} />
        )}
      </main>
    </div>
  );
};

export default AuthPage;
