import React, { useState } from "react";
import SignUpForm from "@pages/auth/SignUpForm";
import LoginForm from "@pages/auth/LoginForm";

const AuthLayout: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      {!showRegister ? (
        <LoginForm onShowRegister={() => setShowRegister(true)} />
      ) : (
        <SignUpForm onShowLogin={() => setShowRegister(false)} />
      )}
    </div>
  );
};

export default AuthLayout;
