import React from "react";
import { cn } from "@core/utils/cn";
import { Label } from "./Label";

interface Option {
  label: string;
  value: string;
}

interface ToggleSelectionProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  className?: string;
}

export const ToggleSelection: React.FC<ToggleSelectionProps> = ({
  options,
  value,
  onChange,
  label,
  error,
  className,
}) => {
  return (
    <div className={cn("flex flex-col", className)}>
      {label && (
        <Label variant="body" className="mb-2">
          {label}
        </Label>
      )}
      
      <div 
        className={cn(
          "flex bg-surface-variant p-1 rounded-lg border transition-colors duration-200",
          error ? "border-red-500 bg-red-500/5" : "border-border"
        )}
      >
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                "flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50",
                isSelected
                  ? "bg-white text-primary shadow-sm border border-gray-100"
                  : "text-secondary-text hover:text-primary hover:bg-gray-200/50"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {error && (
        <span className="mt-1.5 text-[0.8rem] font-medium text-red-500 leading-none ml-1">
          {error}
        </span>
      )}
    </div>
  );
};