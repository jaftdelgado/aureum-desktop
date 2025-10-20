import React, { Children } from "react";
import { motion } from "motion/react";

interface StepCounterProps {
  children: React.ReactNode;
  currentStep: number;
  disableStepIndicators?: boolean;
  renderStepIndicator?: (props: {
    step: number;
    currentStep: number;
    onStepClick: (clicked: number) => void;
  }) => React.ReactNode;
  onStepClick: (step: number) => void;
  className?: string;
}

export function StepCounter({
  children,
  currentStep,
  disableStepIndicators = false,
  renderStepIndicator,
  onStepClick,
  className = "",
}: StepCounterProps) {
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;

  return (
    <div className={`flex w-full items-center p-8 ${className}`}>
      {stepsArray.map((_, index) => {
        const stepNumber = index + 1;
        const isNotLastStep = index < totalSteps - 1;

        return (
          <React.Fragment key={stepNumber}>
            {renderStepIndicator ? (
              renderStepIndicator({
                step: stepNumber,
                currentStep,
                onStepClick,
              })
            ) : (
              <StepIndicator
                step={stepNumber}
                currentStep={currentStep}
                disableStepIndicators={disableStepIndicators}
                onClickStep={onStepClick}
              />
            )}
            {isNotLastStep && (
              <StepConnector isComplete={currentStep > stepNumber} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  onClickStep: (clicked: number) => void;
  disableStepIndicators?: boolean;
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators = false,
}: StepIndicatorProps) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) {
      onClickStep(step);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className="relative cursor-pointer outline-none focus:outline-none"
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: "#222", color: "#a3a3a3" },
          active: { scale: 1, backgroundColor: "#5227FF", color: "#5227FF" },
          complete: { scale: 1, backgroundColor: "#5227FF", color: "#3b82f6" },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
      >
        {status === "complete" ? (
          <CheckIcon className="h-4 w-4 text-black" />
        ) : status === "active" ? (
          <div className="h-3 w-3 rounded-full bg-[#060010]" />
        ) : (
          <span className="text-sm">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

interface StepConnectorProps {
  isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
  const lineVariants = {
    incomplete: { width: 0, backgroundColor: "transparent" },
    complete: { width: "100%", backgroundColor: "#5227FF" },
  };

  return (
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-neutral-600">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.1,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
