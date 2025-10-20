import React from "react";
import { Button } from "@components/ui/button/Button";
import { Label } from "@components/ui/Label";
import { Input } from "@components/ui/Input";
import Stepper, { Step } from "@components/ui/stepper/Stepper";

interface SignUpFormProps {
  onShowLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onShowLogin }) => {
  return (
    <div className="w-full max-w-md text-center">
      <Stepper
        initialStep={1}
        disableStepClickNavigation={true}
        headerContent={
          <div className="flex items-center justify-between mb-4">
            <Label variant="subtitle" color="primary">
              Crear cuenta
            </Label>
            <Button variant="link" type="button" onClick={onShowLogin}>
              Iniciar sesión
            </Button>
          </div>
        }
        onStepChange={(step) => console.log("Step:", step)}
        onFinalStepCompleted={() => console.log("Registro completado")}
        backButtonText="Atrás"
        nextButtonText="Siguiente"
      >
        <Step>
          <div className="flex flex-col gap-4 text-left">
            <Label variant="body" color="secondary">
              Información personal
            </Label>
            <Input placeholder="Nombre" />
            <Input placeholder="Apellido" />
          </div>
        </Step>

        <Step>
          <div className="flex flex-col gap-4 text-left">
            <Label variant="body" color="secondary">
              Credenciales
            </Label>
            <Input type="email" placeholder="Correo electrónico" />
            <Input type="password" placeholder="Contraseña" />
          </div>
        </Step>

        <Step>
          <div className="flex flex-col items-center gap-3">
            <Label variant="body" color="secondary">
              ¡Todo listo!
            </Label>
            <p className="text-body text-sm">
              Tu cuenta ha sido creada con éxito.
            </p>
            <Button variant="default" type="button">
              Finalizar
            </Button>
          </div>
        </Step>
      </Stepper>
    </div>
  );
};

export default SignUpForm;
