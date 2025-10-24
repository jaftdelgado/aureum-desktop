import React, { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Icon } from "@iconify/react";
import "@styles/theme.css";

type ButtonVariant =
  | "default"
  | "destructive"
  | "secondary"
  | "thirdy"
  | "link"
  | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  icon?: string;
  iconNode?: ReactNode;
  iconWidth?: number;
  iconHeight?: number;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  icon,
  iconNode,
  iconWidth = 20,
  iconHeight = 20,
  className = "",
  ...props
}) => {
  const baseClasses =
    "flex items-center justify-center gap-2 rounded-xl font-medium text-body transition-all disabled:opacity-60 disabled:pointer-events-none";

  const variantClasses: Record<ButtonVariant, string> = {
    default: "px-4 py-2 bg-primaryBtn text-bg hover:bg-primaryHoverBtn",
    destructive: "px-4 py-2 bg-destructive text-white hover:bg-destructive/90",
    secondary:
      "px-4 py-2 bg-secondaryBtn text-primaryText hover:bg-secondaryHoverBtn",
    thirdy:
      "px-4 py-2 bg-transparent text-primaryText hover:bg-secondaryHoverBtn",
    link: "p-0 bg-none border-none text-primaryText hover:underline",
    icon: "p-2 bg-transparent text-primaryText hover:bg-secondaryHoverBtn",
  };

  const classes = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(" ");

  const showIcon = icon || iconNode;

  return (
    <button className={classes} {...props}>
      {icon && <Icon icon={icon} width={iconWidth} height={iconHeight} />}
      {iconNode && <span className="flex items-center">{iconNode}</span>}
      {children && (
        <span className={showIcon ? "flex-1 text-center" : ""}>{children}</span>
      )}
    </button>
  );
};
