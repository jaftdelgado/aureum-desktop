import React, { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Icon } from "@iconify/react";
import "@ui/button/button.scss";

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
  const classes = ["btn", `btn--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {icon && <Icon icon={icon} width={iconWidth} height={iconHeight} />}
      <span className="btn-label">{children}</span>
    </button>
  );
};
