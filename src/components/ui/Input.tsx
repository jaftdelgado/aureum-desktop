import * as React from "react";
import { cn } from "@lib/utils";
import { Label } from "./Label";
import { Icon } from "@iconify/react";
import "@styles/theme.css";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
}

function Input({
  className,
  type = "text",
  label,
  error,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col flex-1 min-w-0">
      {label && (
        <Label variant="small" className="font-medium mb-1 ml-2">
          {label}
        </Label>
      )}

      <div className={cn("relative", error && "mb-4")}>
        <input
          type={type}
          data-slot="input"
          className={cn(
            "w-full rounded-xl px-4 py-2 font-medium outline-none transition-all",
            "bg-sidebarHoverBtn text-primaryText placeholder:text-secondaryText",
            "border border-sidebarHoverBtn focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn",
            "disabled:pointer-events-none disabled:opacity-60",
            error &&
              "border-destructive focus:border-destructive focus:ring-destructive",
            className
          )}
          {...props}
        />

        {error && (
          <div className="absolute -bottom-5 left-1 flex items-center gap-1">
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
}

export { Input };
