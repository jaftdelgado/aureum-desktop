import React, { useState } from "react";
import { Button } from "@components/ui/button/Button";
import "@ui/sidebar/sidebar.scss";

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
}

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  onNavigate,
  className = "",
}) => {
  const firstButton = items.find((i) => i.type === "button");
  const [activeRoute, setActiveRoute] = useState<string>(
    firstButton?.route || ""
  );

  const handleClick = (route: string) => {
    setActiveRoute(route);
    if (onNavigate) onNavigate(route);
  };

  const renderSeparator = (label: string, key: string | number) => (
    <div key={key} className="sidebar__separator">
      {label}
    </div>
  );

  return (
    <aside className={`sidebar ${className}`}>
      <nav className="sidebar__nav">
        {items.map((item, index) =>
          item.type === "separator" ? (
            renderSeparator(item.label, `sep-${index}`)
          ) : (
            <Button
              key={item.route}
              variant={activeRoute === item.route ? "secondary" : "ghost"}
              icon={item.icon}
              className={`sidebar__btn ${
                activeRoute === item.route ? "active" : ""
              }`}
              onClick={() => handleClick(item.route)}
            >
              {item.label}
            </Button>
          )
        )}
      </nav>
    </aside>
  );
};
