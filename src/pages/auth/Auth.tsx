import React from "react";
import { Button } from "@components/ui/button/Button";
import {
  InputGroup,
  InputGroupInput,
} from "@components/ui/input-field/InputField";
import "./Auth.scss";
import "@scss/texts.scss";

const Auth: React.FC = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Iniciar sesión</h1>

        <form className="auth-form">
          {/* Usuario */}
          <InputGroup>
            <InputGroupInput type="text" placeholder="Usuario" />
          </InputGroup>

          {/* Contraseña */}
          <InputGroup>
            <InputGroupInput type="password" placeholder="Contraseña" />
          </InputGroup>

          <Button variant="default" className="auth-button">
            Iniciar sesión
          </Button>

          <div className="auth-links">
            <a href="#">¿Olvidaste tu contraseña?</a>
            <a href="#">Crear cuenta</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
