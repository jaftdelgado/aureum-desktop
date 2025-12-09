import React, { type ReactNode } from "react";

type LabelVariant = "header" | "subtitle" | "headline" | "body" | "small";
type LabelColor = "primary" | "secondary" | "destructive";
type LabelWeight = "thin" | "light" | "normal" | "medium" | "semibold" | "bold";

interface LabelProps {
  children: ReactNode;
  variant?: LabelVariant;
  color?: LabelColor;
  className?: string;
  weight?: LabelWeight;
}

export const Label: React.FC<LabelProps> = ({
  children,
  variant = "body",
  color = "primary",
  className = "",
  weight,
}) => {
  const colorClasses: Record<LabelColor, string> = {
    primary: "text-primaryText",
    secondary: "text-secondaryText",
    destructive: "text-destructive",
  };

  const variantClasses: Record<LabelVariant, string> = {
    header: "text-h1 font-semibold leading-h1",
    subtitle: "text-subtitle font-medium leading-subtitle",
    headline: "text-headline font-medium leading-body",
    body: "text-body font-normal leading-body",
    small: "text-small font-normal leading-small",
  };

  const weightClasses: Record<LabelWeight, string> = {
    thin: "font-thin",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const variantBaseClass = variantClasses[variant];

  const finalVariantClass = weight
    ? variantBaseClass.replace(/font-\w+/g, weightClasses[weight])
    : variantBaseClass;

  const classes = [finalVariantClass, colorClasses[color], className]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
};
