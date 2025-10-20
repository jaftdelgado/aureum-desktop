import React, { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Icon } from "@iconify/react";

type ButtonVariant =
  | "default"
  | "destructive"
  | "secondary"
  | "thirdy"
  | "link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  icon,
  iconWidth = 20,
  iconHeight = 20,
  className = "",
  ...props
}) => {
  const baseClasses =
    "flex items-center justify-center gap-2 rounded-xl font-medium text-body transition-all disabled:opacity-60 disabled:pointer-events-none";

  const variantClasses: Record<ButtonVariant, string> = {
    default: "w-full px-4 py-2 bg-primaryBtn text-bg hover:bg-primaryHoverBtn",
    destructive: "w-full px-4 py-2 bg-destructive text-white hover:bg-destructive/90",
    secondary: "w-full px-4 py-2 bg-secondaryBtn text-primaryText hover:bg-secondaryHoverBtn",
    thirdy: "w-full px-4 py-2 bg-transparent text-primaryText hover:bg-secondaryHoverBtn",
    link: "w-auto p-0 bg-none border-none text-primaryText hover:underline",
  };

  const classes = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {icon && <Icon icon={icon} width={iconWidth} height={iconHeight} />}
      <span>{children}</span>
    </button>
  );
};
