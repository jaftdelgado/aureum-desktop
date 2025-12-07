import * as React from "react";
import { cn } from "@core/utils/cn";
import { Label } from "@core/ui/Label";
import { Icon } from "@iconify/react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  endContent?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  className,
  type = "text",
  label,
  error,
  size = "md",
  endContent,
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
          className="font-medium mb-1 ml-1 text-primaryText"
        >
          {label}
        </Label>
      )}
      <div className="relative w-full">
        <input
          type={type}
          data-slot="input"
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          className={cn(
            "w-full text-body rounded-xl outline-none transition-all duration-150",
            "bg-secondaryBtn text-primaryText placeholder:text-secondaryText",
            "border focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn",
            "disabled:pointer-events-none disabled:opacity-60",
            endContent ? "pr-10" : "",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
              : "border-outline hover:border-outline/80",
            sizeClasses[size],
            className
          )}
          {...props}
        />

        {endContent && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-secondaryText flex items-center justify-center">
            {endContent}
          </div>
        )}
      </div>

      {error && (
        <div
          id={`${props.id}-error`}
          className="flex items-center gap-1.5 mt-1.5 ml-1 animate-in slide-in-from-top-1 fade-in duration-200"
        >
          <Icon
            icon="lucide:circle-x"
            className="w-3.5 h-3.5 text-red-500 flex-shrink-0"
          />
          <span className="text-[0.8rem] font-medium text-red-500 leading-none">
            {error}
          </span>
        </div>
      )}
    </div>
  );
};
