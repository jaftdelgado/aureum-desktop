// Input.tsx
import * as React from "react";
import { cn } from "@lib/utils";
import { Label } from "./Label";
import "@styles/theme.css";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
}

function Input({ className, type = "text", label, ...props }: InputProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <Label variant="small" className="text-primaryText mb-2 ml-2">
          {label}
        </Label>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "flex-1 w-full rounded-xl px-4 py-2 font-medium outline-none transition-all",
          "bg-sidebarHoverBtn text-primaryText placeholder:text-secondaryText",
          "border border-sidebarHoverBtn focus:border-primaryBtn focus:ring-1 focus:ring-primaryBtn",
          "disabled:pointer-events-none disabled:opacity-60",
          className
        )}
        {...props}
      />
    </div>
  );
}

export { Input };
