import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@core/utils/cn";

const avatarVariants = cva(
  "inline-block overflow-hidden bg-gray-100 flex items-center justify-center",
  {
    variants: {
      size: {
        xs: "w-4 h-4",
        sm: "w-6 h-6",
        md: "w-10 h-10",
        lg: "w-16 h-16",
        xl: "w-24 h-24",
      },
      rounded: {
        full: "rounded-full",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: "full",
    },
  }
);

interface AvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof avatarVariants> {}

export const Avatar: React.FC<AvatarProps> = ({
  size,
  rounded,
  className,
  ...props
}) => {
  return (
    <img
      className={cn(avatarVariants({ size, rounded }), className)}
      {...props}
    />
  );
};
