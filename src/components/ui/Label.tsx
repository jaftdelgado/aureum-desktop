import React, { type ReactNode } from "react";

type LabelVariant = "header" | "subtitle" | "body" | "small";
type LabelColor = "primary" | "secondary";

interface LabelProps {
  children: ReactNode;
  variant?: LabelVariant;
  color?: LabelColor;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  children,
  variant = "body",
  color = "primary",
  className = "",
}) => {
  const variantClasses: Record<LabelVariant, string> = {
    header: "text-h1 font-medium leading-h1 text-primaryText",
    subtitle: "text-subtitle font-normal leading-5 text-primaryText font-semibold",
    body:
      color === "primary"
        ? "text-body font-normal leading-body text-primaryText"
        : "text-body font-normal leading-body text-secondaryText",
    small: "text-small font-normal leading-4 text-secondaryText",
  };

  const classes = [variantClasses[variant], className].filter(Boolean).join(" ");

  return <span className={classes}>{children}</span>;
};
