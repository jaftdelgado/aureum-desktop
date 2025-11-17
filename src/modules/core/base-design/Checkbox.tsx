import React from "react";
import { Icon } from "@iconify/react";

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  label,
  className = "",
  size = "md",
}) => {
  return (
    <label
      className={`inline-flex items-center gap-2 select-none transition-opacity duration-150 ${
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      <span
        className={`relative flex items-center justify-center border transition-colors duration-150
          ${sizeClasses[size]}
          rounded-[3px]
          ${
            checked
              ? "bg-primaryBtn border-primaryBtn"
              : "bg-transparent border-outline hover:border-primary/60"
          }
        `}
      >
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        <span
          className={`absolute inset-0 flex items-center justify-center rounded-[3px] transition-all duration-200
            ${checked ? "bg-primaryBtn" : "bg-transparent"}
          `}
        >
          {checked && (
            <div className="flex items-center justify-center w-full h-full">
              <Icon
                icon="gravity-ui:check"
                width="14"
                height="14"
                style={{
                  color: "var(--bg)",
                  transition: "opacity 0.2s ease",
                }}
                className={`pointer-events-none ${
                  checked ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          )}
        </span>
      </span>

      {label && (
        <span className="text-body text-secondaryText select-none">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
