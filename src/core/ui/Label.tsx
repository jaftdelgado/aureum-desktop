import React, { type ReactNode } from "react";

type LabelVariant = "header" | "subtitle" | "body" | "small";
type LabelColor = "primary" | "secondary" | "destructive";

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
  const colorClasses: Record<LabelColor, string> = {
    primary: "text-primaryText",
    secondary: "text-secondaryText",
    destructive: "text-destructive",
  };

  const variantClasses: Record<LabelVariant, string> = {
    header: "text-h1 font-semibold leading-h1",
    subtitle: "text-subtitle font-medium leading-subtitle",
    body: "text-body font-normal leading-body",
    small: "text-small font-normal leading-small",
  };

  const classes = [variantClasses[variant], colorClasses[color], className]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
};
