import * as React from "react";
import { cn } from "@lib/utils";
import "@styles/theme.css";

function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
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
  );
}

export { Input };
