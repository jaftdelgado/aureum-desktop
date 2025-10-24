import React, { useState } from "react";
import { Button } from "@ui/Button";

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
    onNavigate?.(route);
  };

  const renderSeparator = (label: string, key: string | number) => (
    <div
      key={key}
      className="text-secondaryText text-[0.7rem] font-medium uppercase mt-4 mb-1 pl-2 select-none"
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
            <Button
              key={item.route}
              variant={activeRoute === item.route ? "secondary" : "thirdy"}
              icon={item.icon}
              className={`w-full justify-start flex items-center gap-2 pl-3 transition-colors duration-200
                ${
                  activeRoute === item.route
                    ? "bg-secondaryBtn text-blue-400 font-medium"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }
              `}
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
