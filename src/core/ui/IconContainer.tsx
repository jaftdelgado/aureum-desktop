import React from "react";
import { Icon as Iconify } from "@iconify/react";

type IconSize = "sm" | "md" | "lg";
type IconVariant = "primary" | "secondary";

interface IconProps {
  icon: string;
  size?: IconSize;
  variant?: IconVariant;
  width?: number;
  height?: number;
  className?: string;
}

export const IconContainer: React.FC<IconProps> = ({
  icon,
  size = "md",
  variant = "primary",
  width,
  height,
  className = "",
}) => {
  const containerSize: Record<IconSize, string> = {
    sm: "w-8 h-8 rounded-xl",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const iconDimensions: Record<IconSize, { w: number; h: number }> = {
    sm: { w: 20, h: 20 },
    md: { w: 18, h: 18 },
    lg: { w: 22, h: 22 },
  };

  const variantClasses: Record<IconVariant, string> = {
    primary: "bg-transparent text-primaryText",
    secondary: "bg-primaryBtn text-bg",
  };

  const iw = width ?? iconDimensions[size].w;
  const ih = height ?? iconDimensions[size].h;

  return (
    <div
      className={`
        ${containerSize[size]}
        inline-flex 
        items-center 
        justify-center
        ${variantClasses[variant]}
        ${className}
      `}
    >
      <Iconify icon={icon} width={iw} height={ih} />
    </div>
  );
};
