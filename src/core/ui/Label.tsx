import React, { type ReactNode } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@core/utils/cn";

type LabelVariant = "header" | "subtitle" | "body" | "small";
type LabelColor = "primary" | "secondary" | "destructive";

interface LabelProps {
  children: ReactNode;
  variant?: LabelVariant;
  color?: LabelColor;
  className?: string;
}

const labelVariants = cva("", {
  variants: {
    variant: {
      header: "text-h1 font-medium leading-h1",
      subtitle: "text-subtitle font-medium leading-5",
      body: "text-body font-normal leading-body",
      small: "text-small font-normal leading-4",
    },
    color: {
      primary: "text-primaryText",
      secondary: "text-secondaryText",
      destructive: "text-destructive",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "primary",
  },
});

export const Label: React.FC<LabelProps> = ({
  children,
  variant,
  color,
  className,
}) => {
  return (
    <span className={cn(labelVariants({ variant, color }), className)}>
      {children}
    </span>
  );
};
