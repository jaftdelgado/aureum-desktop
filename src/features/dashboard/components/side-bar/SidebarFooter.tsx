import React from "react";
import { Icon } from "@iconify/react";
import { Label } from "@core/ui/Label";
import { SidebarButton } from "./SidebarButton";
import { Popover, PopoverContent, PopoverTrigger } from "@core/components/Popover";
import { useTranslation } from "react-i18next";
import { cn } from "@core/utils/cn";

export interface SidebarFooterProps {
  name: string;
  role: string;
  avatarUrl: string;
  onProfileClick?: () => void;
  onLogout?: () => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  name,
  role,
  avatarUrl,
  onProfileClick,
  onLogout,
}) => {
  const { t, i18n } = useTranslation("auth");

  const toggleLanguage = () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  };

  const menuItemClass = "flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md hover:bg-surface-variant text-primaryText transition-colors cursor-pointer";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <SidebarButton
          className="mt-auto w-full justify-between group data-[state=open]:bg-surface-variant !pl-1"
          state="hover"
        >
          <div className="flex items-center justify-between w-full overflow-hidden">
            
            <div className="flex items-center gap-3 flex-1 min-w-0 mr-2">
              <img
                src={avatarUrl}
                alt={name}
                className="w-8 h-8 rounded-full object-cover border border-outline bg-surface-variant shrink-0"
              />
              <div className="flex flex-col flex-1 text-left min-w-0">
                <Label variant="body" color="primary" className="truncate font-medium leading-tight">
                  {name}
                </Label>
                <Label variant="small" color="secondary" className="truncate text-[10px] leading-tight">
                  {role}
                </Label>
              </div>
            </div>

            <Icon 
              icon="lucide:chevrons-up-down" 
              width={16} 
              height={16} 
              className="text-secondaryText group-hover:text-primaryText transition-colors shrink-0" 
            />
            
          </div>
        </SidebarButton>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-56 p-1.5 mb-2 bg-panel border border-outline shadow-xl rounded-xl" 
        side="top" 
        align="start" 
        sideOffset={4}
        alignOffset={-8}
      >
        <div className="flex flex-col gap-0.5">
          <button onClick={onProfileClick} className={menuItemClass}>
            <Icon icon="lucide:user" width={16} className="text-secondaryText" />
            <span>{t("sidebar.viewProfile", "Ver perfil")}</span>
          </button>

          <button onClick={toggleLanguage} className={menuItemClass}>
            <Icon icon="lucide:languages" width={16} className="text-secondaryText" />
            <div className="flex-1 text-left flex justify-between items-center">
              <span>{t("sidebar.changeLanguage", "Cambiar idioma")}</span>
              <span className="text-[10px] uppercase font-bold bg-surface px-1.5 py-0.5 rounded text-secondaryText border border-outline">
                {i18n.language}
              </span>
            </div>
          </button>

          <div className="h-px bg-outline my-1 mx-2" />

          <button 
            onClick={onLogout} 
            className={cn(menuItemClass, "text-red-500 hover:bg-red-500/10 hover:text-red-600")}
          >
            <Icon icon="lucide:log-out" width={16} />
            <span>{t("logout.label", "Cerrar sesión")}</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};