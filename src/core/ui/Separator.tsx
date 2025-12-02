import React from "react";
import { cn } from "@core/utils/cn";
import { cva } from "class-variance-authority";

interface SeparatorProps {
  variant?: "line" | "text" | "vertical";
  text?: string;
  className?: string;
}

const separatorVariants = cva("", {
  variants: {
    variant: {
      line: "border-t border-outline my-4",
      text: "flex items-center my-4",
      vertical: "h-6 border-l border-outline mx-2",
    },
  },
  defaultVariants: {
    variant: "line",
  },
});

export const Separator: React.FC<SeparatorProps> = ({
  variant = "line",
  text,
  className,
}) => {
  if (variant === "line") {
    return <hr className={cn(separatorVariants({ variant }), className)} />;
  }

  if (variant === "text") {
    return (
      <div className={cn(separatorVariants({ variant }), className)}>
        <div className="flex-grow border-t border-outline" />
        {text && (
          <span className="px-2 text-small text-secondaryText whitespace-nowrap">
            {text}
          </span>
        )}
        <div className="flex-grow border-t border-outline" />
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div
        className={cn(separatorVariants({ variant }), className)}
        aria-hidden="true"
      />
    );
  }

  return null;
};
