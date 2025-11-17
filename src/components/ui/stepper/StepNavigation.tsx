import React from "react";
import { Button } from "@core/base-design/Button";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  handleBack: () => void;
  handleNext: () => void;
  handleComplete: () => void;
  backButtonText?: string;
  nextButtonText?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  footerClassName?: string;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  handleBack,
  handleNext,
  handleComplete,
  backButtonText = "Back",
  nextButtonText = "Continue",
  backButtonProps = {},
  nextButtonProps = {},
  footerClassName = "",
}: StepNavigationProps) {
  const isLastStep = currentStep === totalSteps;
  const showBackButton = currentStep !== 1;

  return (
    <div className={`px-8 pb-8 ${footerClassName}`}>
      <div className="mt-10 flex items-center w-full">
        {showBackButton && (
          <Button
            onClick={handleBack}
            variant="thirdy"
            className="px-6 py-2 mr-4 w-1/2 max-w-max"
            {...backButtonProps}
          >
            {backButtonText}
          </Button>
        )}
        <Button
          onClick={isLastStep ? handleComplete : handleNext}
          variant="default"
          className={`px-6 py-2 ${showBackButton ? "w-1/2 ml-auto" : "w-full"}`}
          {...nextButtonProps}
        >
          {isLastStep ? "Complete" : nextButtonText}
        </Button>
      </div>
    </div>
  );
}
