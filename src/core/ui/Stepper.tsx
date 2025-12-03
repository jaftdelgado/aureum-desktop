import React from "react";
import { cn } from "@core/utils/cn";
import { Button } from "./Button";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  children: React.ReactNode;
  isSubmitting?: boolean;
  nextLabel?: string;
  backLabel?: string;
  hideButtons?: boolean;
}

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  children,
  isSubmitting,
  nextLabel = "Siguiente",
  backLabel = "Atrás",
  hideButtons = false,
}) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const step = idx + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <div
              key={step}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                isActive ? "w-8 bg-primary" : "w-2 bg-surface-variant-dim",
                isCompleted && "bg-primary/50"
              )}
            />
          );
        })}
      </div>

      <div className="flex-1">{children}</div>

      {!hideButtons && (
        <div className="flex justify-between mt-4 gap-4">
          <Button
            variant="secondary"
            onClick={onBack}
            disabled={currentStep === 1 || isSubmitting}
            type="button"
            className={currentStep === 1 ? "invisible" : ""}
          >
            {backLabel}
          </Button>
          <Button
            variant="default"
            onClick={onNext}
            disabled={isSubmitting}
            type="button"
          >
            {isSubmitting ? "Cargando..." : nextLabel}
          </Button>
        </div>
      )}
    </div>
  );
};