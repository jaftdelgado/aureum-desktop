import React from "react";
import { Button } from "@components/ui/Button";
import { Label } from "@components/ui/Label";
import { Separator } from "@components/ui/Separator";
import { Input } from "@components/ui/Input";

interface LoginFormProps {
  onShowRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onShowRegister }) => {
  return (
    <div className="bg-bg border border-sidebarHoverBtn p-8 rounded-xl w-full max-w-xs text-center">
      <Label variant="subtitle" color="primary">
        Bienvenido a Aureum
      </Label>

      <form className="flex flex-col gap-4 mt-6">
        <Input type="email" placeholder="Usuario o correo" />
        <Input type="password" placeholder="Contraseña" />

        <Button variant="default" className="mt-2" type="submit">
          Iniciar sesión
        </Button>

        <Separator variant="line" className="my-1" />

        <Button variant="secondary" type="button">
          Continuar con Google
        </Button>

        <div className="flex justify-center items-center gap-1 text-sm mt-4">
          <Label variant="body" color="secondary">
            ¿No tienes una cuenta?
          </Label>
          <Button variant="link" type="button" onClick={onShowRegister}>
            Crear cuenta
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
