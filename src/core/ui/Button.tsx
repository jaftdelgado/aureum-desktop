import React, { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Icon } from "@iconify/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@core/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children?: ReactNode;

    icon?: string;
    iconNode?: ReactNode;
    iconWidth?: number;
    iconHeight?: number;

    iconLeft?: string;
    iconRight?: string;
    iconOnly?: string;
    iconLeftNode?: ReactNode;
    iconRightNode?: ReactNode;

    alignText?: "left" | "center" | "right";
  };

const buttonVariants = cva(
  "inline-flex items-center text-body gap-2 whitespace-nowrap transition-all duration-150 disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryBtn",
  {
    variants: {
      variant: {
        default: "bg-primaryBtn text-bg hover:bg-primaryHoverBtn rounded-xl",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 rounded-xl",
        secondary:
          "bg-secondaryBtn text-primaryText hover:bg-secondaryHoverBtn rounded-xl",
        thirdy:
          "bg-transparent text-primaryText hover:bg-secondaryHoverBtn rounded-xl",
        link: "bg-none border-none text-primaryText hover:underline px-0 py-0",
        icon: "bg-transparent text-primaryText hover:bg-secondaryHoverBtn rounded-xl",
      },
      size: {
        sm: "h-8 px-3 py-1.5",
        md: "h-9 px-3 py-2",
        lg: "h-10 px-5 py-3",
      },
      alignText: {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      alignText: "left",
    },
  }
);

const iconOnlySize: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "w-8 h-8",
  md: "w-9 h-9",
  lg: "w-12 h-12",
};

const iconDimensions: Record<
  NonNullable<ButtonProps["size"]>,
  { w: number; h: number }
> = {
  sm: { w: 14, h: 14 },
  md: { w: 18, h: 18 },
  lg: { w: 22, h: 22 },
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  size,
  alignText,
  className,
  icon,
  iconNode,
  iconWidth,
  iconHeight,
  iconLeft,
  iconRight,
  iconOnly,
  iconLeftNode,
  iconRightNode,
  ...props
}) => {
  // Fallback seguros si alguna prop viene undefined
  const finalSize = size || "md";
  const finalVariant = variant || "default";
  const finalAlign = alignText || "left";
  const isIconOnly = !!iconOnly;

  const classes = cn(
    buttonVariants({
      variant: finalVariant,
      size: finalSize,
      alignText: finalAlign,
    }),
    isIconOnly &&
      `${iconOnlySize[finalSize]} p-0 rounded-xl flex items-center justify-center`,
    className
  );

  const iw = iconWidth ?? iconDimensions[finalSize].w;
  const ih = iconHeight ?? iconDimensions[finalSize].h;

  const isTextChild =
    typeof children === "string" || typeof children === "number";

  return (
    <button className={classes} {...props}>
      {/* Icono solo */}
      {isIconOnly && iconOnly && (
        <Icon icon={iconOnly} width={iw} height={ih} />
      )}

      {/* Icono izquierdo */}
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
        <span className="text-body truncate overflow-hidden whitespace-nowrap">
          {children}
        </span>
      )}
      {!isIconOnly && children && !isTextChild && <>{children}</>}

      {/* Icono derecho */}
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
