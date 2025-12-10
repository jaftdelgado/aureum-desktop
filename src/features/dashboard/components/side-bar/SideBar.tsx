import React from "react";
import { useLocation } from "react-router-dom";
import {
  SidebarFooter,
  type SidebarFooterProps,
} from "@features/dashboard/components/side-bar/SidebarFooter";
import { SidebarButton } from "@features/dashboard/components/side-bar/SidebarButton";
import { SidebarHeader } from "@features/dashboard/components/side-bar/SidebarHeader";

export type SidebarItem =
  | {
      type: "button";
      icon?: string;
      label: string;
      route: string;
      active?: boolean;
    }
  | {
      type: "separator";
      label: string;
      active?: boolean;
    };

interface SidebarProps {
  items: SidebarItem[];
  onNavigate?: (route: string) => void;
  className?: string;
  profile?: SidebarFooterProps;
  bottomActions?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  onNavigate,
  className = "",
  profile,
  bottomActions,
}) => {
  const location = useLocation();
  const currentRoute = location.pathname;

  const handleClick = (route: string) => {
    onNavigate?.(route);
  };

  const renderSeparator = (label: string, key: string | number) => (
    <div
      key={key}
      className="text-secondaryText text-small font-medium uppercase mt-4 mb-1 pl-2 select-none"
    >
      {label}
    </div>
  );

  return (
    <aside
      className={`flex flex-col w-60 h-full bg-sidebarBg text-white p-4 border-r border-outline ${className}`}
    >
      <SidebarHeader />

      <nav className="flex flex-col gap-0.5 flex-1">
        {items.map((item, index) =>
          item.type === "separator" ? (
            renderSeparator(item.label, `sep-${index}`)
          ) : (
            <SidebarButton
              key={item.route}
              icon={item.icon}
              state={currentRoute === item.route ? "selected" : "hover"}
              onClick={() => handleClick(item.route)}
            >
              {item.label}
            </SidebarButton>
          )
        )}
      </nav>

      <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-outline/30">
        {bottomActions && <div className="mb-1">{bottomActions}</div>}

        {profile && <SidebarFooter {...profile} />}
      </div>
    </aside>
  );
};
