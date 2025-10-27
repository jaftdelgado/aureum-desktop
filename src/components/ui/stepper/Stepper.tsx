import React, {
  useState,
  Children,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import type { ReactNode, HTMLAttributes } from "react";
import type { Variants } from "motion/react";
import { StepCounter } from "./StepCounter";
import { StepNavigation } from "./StepNavigation";

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  controlledStep?: number; // <--- paso controlado opcional
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  headerContent?: ReactNode;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  disableStepIndicators?: boolean;
  disableStepClickNavigation?: boolean;
  renderStepIndicator?: (props: {
    step: number;
    currentStep: number;
    onStepClick: (clicked: number) => void;
  }) => ReactNode;
  onNextStep?: () => void; // <--- se llama antes de avanzar
  onBackStep?: () => void; // <--- se llama antes de retroceder
}

export default function Stepper({
  children,
  initialStep = 1,
  controlledStep,
  headerContent,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  disableStepIndicators = false,
  disableStepClickNavigation = false,
  renderStepIndicator,
  onNextStep,
  onBackStep,
  ...rest
}: StepperProps) {
  const [internalStep, setInternalStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);

  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const currentStep = controlledStep ?? internalStep; // usa control externo si existe
  const isCompleted = currentStep > totalSteps;

  const updateStep = useCallback(
    (newStep: number) => {
      if (!controlledStep) setInternalStep(newStep);
      if (newStep > totalSteps) onFinalStepCompleted();
      else onStepChange(newStep);
    },
    [controlledStep, onFinalStepCompleted, onStepChange, totalSteps]
  );

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  }, [currentStep, totalSteps, updateStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  }, [currentStep, updateStep]);

  const handleNextClick = () => {
    if (onNextStep) {
      onNextStep(); // solo avanza si la función externa lo permite (ej: validación)
    } else {
      handleNext();
    }
  };

  const handleBackClick = () => {
    if (onBackStep) onBackStep();
    handleBack();
  };

  return (
    <div
      className="flex min-h-full flex-1 flex-col items-center justify-center p-4 sm:aspect-[4/3] md:aspect-[2/1]"
      {...rest}
    >
      <div
        className={`bg-panel border border-sidebarHoverBtn mx-auto w-full max-w-md rounded-xl ${stepCircleContainerClassName}`}
      >
        {headerContent && (
          <div className="flex items-center justify-between p-8 pb-0">
            {headerContent}
          </div>
        )}

        <StepCounter
          currentStep={currentStep}
          disableStepIndicators={disableStepIndicators}
          renderStepIndicator={renderStepIndicator}
          onStepClick={(clicked) => {
            if (!disableStepClickNavigation) {
              setDirection(clicked > currentStep ? 1 : -1);
              updateStep(clicked);
            }
          }}
          className={stepContainerClassName}
        >
          {children}
        </StepCounter>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`space-y-2 px-8 ${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <StepNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            handleBack={handleBackClick}
            handleNext={handleNextClick}
            handleComplete={handleNext}
            backButtonText={backButtonText}
            nextButtonText={nextButtonText}
            backButtonProps={backButtonProps}
            nextButtonProps={nextButtonProps}
            footerClassName={footerClassName}
          />
        )}
      </div>
    </div>
  );
}

interface StepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className = "",
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0);

  return (
    <motion.div
      style={{ position: "relative", overflow: "hidden" }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={(h) => setParentHeight(h)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
  onHeightReady: (height: number) => void;
}

function SlideTransition({
  children,
  direction,
  onHeightReady,
}: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: "absolute", left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? "-100%" : "100%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? "50%" : "-50%", opacity: 0 }),
};

export function Step({ children }: { children: ReactNode }) {
  return <div className="px-8">{children}</div>;
}
