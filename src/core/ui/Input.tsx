import * as React from "react";
import { cn } from "@core/utils/cn";
import { Label } from "@core/ui/Label";
import { Icon } from "@iconify/react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
}

export const Input: React.FC<InputProps> = ({
  className,
  type = "text",
  label,
  error,
  size = "md",
  ...props
}) => {
  const sizeClasses: Record<NonNullable<InputProps["size"]>, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-body",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <div className="flex flex-col flex-1 min-w-0">
      {label && (
        <Label
          variant="small"
          className="font-medium mb-1 ml-2 text-primaryText"
        >
          {label}
        </Label>
      )}

      <div className={cn("relative w-full", error && "mb-4")}>
        <input
          type={type}
          data-slot="input"
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          className={cn(
            "w-full text-body rounded-xl outline-none transition-all duration-150",
            "bg-input text-primaryText placeholder:text-secondaryText",
            "border border-outline focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn",
            "disabled:pointer-events-none disabled:opacity-60",
            error &&
              "border-destructive focus:border-destructive focus:ring-destructive",
            sizeClasses[size],
            className
          )}
          {...props}
        />

        {error && (
          <div
            id={`${props.id}-error`}
            className="absolute -bottom-5 left-1 flex items-center gap-1"
          >
            <Icon
              icon="lucide:circle-x"
              className="w-3.5 h-3.5 text-destructive"
            />
            <Label variant="small" color="destructive">
              {error}
            </Label>
          </div>
        )}
      </div>
    </div>
  );
};
