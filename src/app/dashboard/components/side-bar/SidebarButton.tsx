import React, { type ReactNode, type ButtonHTMLAttributes } from "react";
import { Icon } from "@iconify/react";

interface SidebarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: string;
  state?: "selected" | "hover";
  className?: string;
}

export const SidebarButton: React.FC<SidebarButtonProps> = ({
  children,
  icon,
  state = "hover",
  className = "",
  ...props
}) => {
  const baseClasses =
    "flex items-center justify-start gap-2 rounded-xl text-body transition-all disabled:opacity-60 disabled:pointer-events-none px-4 py-2";

  const stateClasses: Record<"selected" | "hover", string> = {
    selected: "bg-secondaryBtn text-blue-400",
    hover:
      "bg-transparent text-secondaryText hover:bg-gray-800 hover:text-white",
  };

  return (
    <button
      className={`${baseClasses} ${stateClasses[state]} ${className}`}
      {...props}
    >
      {icon && <Icon icon={icon} width={17} height={17} />}
      {children && <span className="flex-1 text-left">{children}</span>}
    </button>
  );
};
