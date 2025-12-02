import React from "react";
import { useLocation } from "react-router-dom";
import { SidebarFooter } from "@app/dashboard/components/side-bar/SidebarFooter";
import { SidebarButton } from "@app/dashboard/components/side-bar/SidebarButton";

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
  profile?: {
    name: string;
    role: string;
    avatarUrl: string;
    onClick?: () => void;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  onNavigate,
  className = "",
  profile,
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
      className={`flex flex-col w-60 h-full bg-panel text-white p-4 border-r border-outline ${className}`}
    >
      <nav className="flex flex-col gap-1 flex-1">
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
      {profile && (
        <SidebarFooter
          name={profile.name}
          role={profile.role}
          avatarUrl={profile.avatarUrl}
          onClick={profile.onClick}
        />
      )}
    </aside>
  );
};
