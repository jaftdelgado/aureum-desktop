import React, { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Icon } from "@iconify/react";

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

  iconLeft?: string;
  iconRight?: string;
  iconOnly?: string;
  iconLeftNode?: ReactNode;
  iconRightNode?: ReactNode;

  className?: string;

  alignText?: "left" | "center" | "right";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "md",

  icon,
  iconNode,
  iconWidth,
  iconHeight,

  iconLeft,
  iconRight,
  iconOnly,
  iconLeftNode,
  iconRightNode,

  className = "",
  alignText,

  ...props
}) => {
  const baseClasses =
    "inline-flex items-center text-body gap-2 whitespace-nowrap transition-all duration-150 disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryBtn";

  const variantClasses: Record<ButtonVariant, string> = {
    default: "bg-primaryBtn text-bg hover:bg-primaryHoverBtn rounded-xl",
    destructive: "bg-destructive text-white hover:bg-destructive/90 rounded-xl",
    secondary:
      "bg-secondaryBtn text-primaryText hover:bg-secondaryHoverBtn rounded-xl",
    thirdy:
      "bg-transparent text-primaryText hover:bg-secondaryHoverBtn rounded-xl",
    link: "bg-none border-none text-primaryText hover:underline px-0 py-0",
    icon: "bg-transparent text-primaryText hover:bg-secondaryHoverBtn rounded-xl",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "h-8 px-3 py-1.5",
    md: "h-9 px-3 py-2",
    lg: "h-10 px-5 py-3",
  };

  const iconOnlySize: Record<ButtonSize, string> = {
    sm: "w-8 h-8",
    md: "w-9 h-9",
    lg: "w-12 h-12",
  };

  const iconDimensions: Record<ButtonSize, { w: number; h: number }> = {
    sm: { w: 14, h: 14 },
    md: { w: 18, h: 18 },
    lg: { w: 22, h: 22 },
  };

  const isIconOnly = !!iconOnly;

  /** Clases nuevas para alinear */
  const alignClasses: Record<NonNullable<ButtonProps["alignText"]>, string> = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    isIconOnly
      ? `${iconOnlySize[size]} p-0 rounded-xl flex items-center justify-center`
      : `${sizeClasses[size]} flex ${
          alignText ? alignClasses[alignText] : "justify-start"
        }`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iw = iconWidth ?? iconDimensions[size].w;
  const ih = iconHeight ?? iconDimensions[size].h;

  const isTextChild =
    typeof children === "string" || typeof children === "number";

  return (
    <button className={classes} {...props}>
      {isIconOnly && iconOnly && (
        <Icon icon={iconOnly} width={iw} height={ih} />
      )}

      {!isIconOnly && (iconLeft || iconLeftNode) && (
        <>
          {iconLeft && <Icon icon={iconLeft} width={iw} height={ih} />}
          {iconLeftNode && (
            <span className="flex items-center">{iconLeftNode}</span>
          )}
        </>
      )}

      {!isIconOnly && !iconLeft && !iconRight && icon && (
        <Icon icon={icon} width={iw} height={ih} />
      )}

      {!isIconOnly && !iconLeft && !iconRight && iconNode && (
        <span className="flex items-center">{iconNode}</span>
      )}

      {!isIconOnly && children && isTextChild && (
        <span className="truncate overflow-hidden whitespace-nowrap">
          {children}
        </span>
      )}

      {!isIconOnly && children && !isTextChild && <>{children}</>}

      {!isIconOnly && (iconRight || iconRightNode) && (
        <>
          {iconRight && <Icon icon={iconRight} width={iw} height={ih} />}
          {iconRightNode && (
            <span className="flex items-center">{iconRightNode}</span>
          )}
        </>
      )}
    </button>
  );
};
