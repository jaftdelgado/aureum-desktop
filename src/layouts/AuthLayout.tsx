import React, { useState } from "react";
import SignUpForm from "@pages/auth/SignUpForm";
import LoginForm from "@pages/auth/LoginForm";
import { ThemeToggleButton } from "@ui/ThemeToggle";
import { Button } from "@components/ui/Button";
import { Separator } from "@ui/Separator";

const AuthLayout: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header superior */}
      <header className="w-full flex items-center justify-end p-4 gap-3">
        <Button
          variant="thirdy"
          onClick={() => setShowRegister(!showRegister)}
          className="w-auto"
        >
          {showRegister ? "Iniciar sesión" : "Crear cuenta"}
        </Button>

        <Separator variant="vertical" className="h-6" />

        <ThemeToggleButton />
      </header>

      <main className="flex-1 flex items-center justify-center">
        {!showRegister ? (
          <LoginForm onShowRegister={() => setShowRegister(true)} />
        ) : (
          <SignUpForm onShowLogin={() => setShowRegister(false)} />
        )}
      </main>
    </div>
  );
};

export default AuthLayout;
