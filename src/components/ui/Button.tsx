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

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconNode?: ReactNode;
  iconWidth?: number;
  iconHeight?: number;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "md",
  icon,
  iconNode,
  iconWidth,
  iconHeight,
  className = "",
  ...props
}) => {
  const baseClasses =
    "flex items-center justify-center gap-2 text-body transition-all duration-150 disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryBtn";

  const variantClasses: Record<ButtonVariant, string> = {
    default: "bg-primaryBtn text-bg hover:bg-primaryHoverBtn",
    destructive: "bg-destructive text-white hover:bg-destructive/90",
    secondary: "bg-secondaryBtn text-primaryText hover:bg-secondaryHoverBtn",
    thirdy: "bg-transparent text-primaryText hover:bg-secondaryHoverBtn",
    link: "bg-none border-none text-primaryText hover:underline px-0 py-0",
    icon: "bg-transparent text-primaryText hover:bg-secondaryHoverBtn",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 rounded-lg",
    md: "px-4 py-2 rounded-xl",
    lg: "px-5 py-3 rounded-2xl",
  };

  const iconDimensions: Record<ButtonSize, { w: number; h: number }> = {
    sm: { w: 14, h: 14 },
    md: { w: 18, h: 18 },
    lg: { w: 22, h: 22 },
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const showIcon = icon || iconNode;

  return (
    <button className={classes} {...props}>
      {icon && (
        <Icon
          icon={icon}
          width={iconWidth ?? iconDimensions[size].w}
          height={iconHeight ?? iconDimensions[size].h}
          className={children ? "shrink-0" : ""}
        />
      )}
      {iconNode && <span className="flex items-center">{iconNode}</span>}
      {children && (
        <span
          className={`${
            showIcon ? "flex-1 text-center" : ""
          } truncate overflow-hidden whitespace-nowrap`}
        >
          {children}
        </span>
      )}
    </button>
  );
};
