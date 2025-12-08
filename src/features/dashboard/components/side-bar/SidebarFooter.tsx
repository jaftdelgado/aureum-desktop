import React from "react";
import { Icon } from "@iconify/react";
import { SidebarButton } from "./SidebarButton";
import { Popover, PopoverContent, PopoverTrigger } from "@core/components/Popover";
import { cn } from "@core/utils/cn";

export interface SidebarFooterProps {
  name: string;
  role: string;
  avatarUrl: string;
  currentTheme: "light" | "dark";
  currentLang: string;
  onProfileClick: () => void;
  onLogout: () => void;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  texts: {
    viewProfile: string;
    changeLanguage: string;
    toggleTheme: string;
    logout: string;
  };
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  name,
  role,
  avatarUrl,
  currentTheme,
  currentLang,
  onProfileClick,
  onLogout,
  onToggleTheme,
  onToggleLanguage,
  texts
}) => {
  const menuItemClass = "flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md hover:bg-surface-variant text-primaryText transition-colors cursor-pointer";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <SidebarButton
          className="mt-auto w-full group data-[state=open]:bg-surface-variant !px-2 block h-auto"
          state="hover"
        >
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 w-full">
            <img
              src={avatarUrl}
              alt={name}
              className="w-8 h-8 rounded-full object-cover border border-outline bg-surface-variant"
            />
            <div className="flex flex-col text-left min-w-0">
              <span className="truncate text-sm font-medium text-primaryText leading-tight" title={name}>
                {name}
              </span>
              <span className="truncate text-[10px] text-secondaryText leading-tight">
                {role}
              </span>
            </div>
            <Icon icon="lucide:chevrons-up-down" width={16} className="text-secondaryText group-hover:text-primaryText transition-colors" />
          </div>
        </SidebarButton>
      </PopoverTrigger>
      
      <PopoverContent className="w-56 p-0.5 mb-1.5 bg-panel border border-outline shadow-xl rounded-xl" side="top" align="start" sideOffset={4} alignOffset={-9}>
        <div className="flex flex-col gap-0.5">
          <button onClick={onProfileClick} className={menuItemClass}>
            <Icon icon="lucide:user" width={16} className="text-secondaryText" />
            <span>{texts.viewProfile}</span>
          </button>

          <button onClick={onToggleLanguage} className={menuItemClass}>
            <Icon icon="lucide:languages" width={16} className="text-secondaryText" />
            <div className="flex-1 text-left flex justify-between items-center">
              <span>{texts.changeLanguage}</span>
              <span className="text-[10px] uppercase font-bold bg-surface px-1.5 py-0.5 rounded text-secondaryText border border-outline">
                {currentLang}
              </span>
            </div>
          </button>

          <button onClick={onToggleTheme} className={menuItemClass}>
            <Icon icon={currentTheme === "dark" ? "lucide:moon" : "lucide:sun"} width={16} className="text-secondaryText" />
            <div className="flex-1 text-left flex justify-between items-center">
              <span>{texts.toggleTheme}</span>
              <span className="text-[10px] uppercase font-bold bg-surface px-1.5 py-0.5 rounded text-secondaryText border border-outline">
                {currentTheme === "dark" ? "Dark" : "Light"}
              </span>
            </div>
          </button>

          <div className="h-px bg-outline my-1 mx-2" />

          <button onClick={onLogout} className={cn(menuItemClass, "text-red-500 hover:bg-red-500/10 hover:text-red-600")}>
            <Icon icon="lucide:log-out" width={16} />
            <span>{texts.logout}</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};