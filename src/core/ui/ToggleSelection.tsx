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
  className?: string;
}

export const ToggleSelection: React.FC<ToggleSelectionProps> = ({
  options,
  value,
  onChange,
  label,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && <Label variant="body">{label}</Label>}
      <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                "flex-1 py-2 text-sm font-medium rounded-md transition-all duration-200",
                isSelected
                  ? "bg-blue-600 text-white shadow-md transform scale-[1.02]" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"   
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};