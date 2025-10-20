import React, { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Icon } from "@iconify/react";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
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
    outline: "w-full px-4 py-2 bg-transparent border border-accent text-text-dark hover:bg-accent",
    secondary: "w-full px-4 py-2 bg-secondaryBtn text-white hover:bg-secondaryHoverBtn",
    ghost: "w-full px-4 py-2 bg-transparent text-text-dark hover:bg-accent",
    link: "w-auto p-0 bg-none border-none text-primaryText underline hover:text-primaryText/90",
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
