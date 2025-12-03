import React from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { Label } from "@core/ui/Label";
import { useAuth } from "@app/hooks/useAuth";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface SidebarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: string;
  state?: "selected" | "hover";
  className?: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  children,
  icon,
  state = "hover",
  className = "",
  ...props
}) => {
  const baseClasses =
    "flex items-center gap-2 rounded-xl text-body transition-all disabled:opacity-60 disabled:pointer-events-none px-2 py-2";

  const stateClasses: Record<"selected" | "hover", string> = {
    selected: "bg-secondaryBtn text-blue-400",
    hover: "bg-transparent text-secondaryText hover:bg-sidebarHoverBtn",
  };

  return (
    <button
      className={`${baseClasses} ${stateClasses[state]} ${className}`}
      {...props}
    >
      {icon && <Icon icon={icon} width={17} height={17} />}
      {children}
    </button>
  );
};

export interface SidebarFooterProps {
  name: string;
  role: string;
  avatarUrl: string;
  onClick?: () => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  name,
  role,
  avatarUrl,
  onClick,
}) => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  return (
    <SidebarButton
      onClick={onClick}
      className="mt-auto w-full justify-between"
      state="hover"
    >
      <div className="flex items-center gap-3 flex-1">
        <img
          src={avatarUrl}
          alt={name}
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="flex flex-col flex-1 text-left">
          <Label variant="body" color="primary">
            {name}
          </Label>
          <Label variant="small" color="secondary">
            {role}
          </Label>
        </div>
      </div>
      <Icon icon="lucide:chevrons-up-down" width={16} height={16} />
    </SidebarButton>
  );
};
