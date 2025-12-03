import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  type SidebarItem,
} from "@app/dashboard/components/side-bar/SideBar";
import { useAuth } from "@app/hooks/useAuth";
import { SidebarButton } from "./side-bar/SidebarButton";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";

const useSelectedTeamId = () => {
  return "123"; // ejemplo
};

export const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useTranslation("auth");
  const selectedTeamId = useSelectedTeamId();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const items: SidebarItem[] = [
    { type: "separator", label: "Principal" },
    {
      type: "button",
      icon: "gravity-ui:compass",
      label: "Explorar",
      route: "/home",
    },
    {
      type: "button",
      icon: "gravity-ui:rectangles-4",
      label: "Equipos",
      route: "/teams",
    },
    {
      type: "button",
      icon: "hugeicons:video-01",
      label: "Lecciones",
      route: "/lessons"
    },
    { type: "separator", label: "Gestión" },
    {
      type: "button",
      icon: "hugeicons:shopping-bag-01",
      label: "Mercado",
      route: selectedTeamId ? `/teams/${selectedTeamId}/market` : "/teams",
    },
    {
      type: "button",
      icon: "hugeicons:wallet-03",
      label: "Portafolio",
      route: selectedTeamId ? `/teams/${selectedTeamId}/portfolio` : "/teams"    
    },
    {
      type: "button",
      icon: "gravity-ui:rectangles-4",
      label: "Activos",
      route: selectedTeamId ? `/teams/${selectedTeamId}/assets` : "/teams",
    },
    {
      type: "button",
      icon: "hugeicons:settings-02",
      label: "Configuración",
      route: selectedTeamId ? `/teams/${selectedTeamId}/settings` : "/teams",
    },
  ];

  const handleNavigate = (route: string) => {
    navigate(route);
  };
 
  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };
  
  const profile = user
    ? {
        name: user.email,
        role: "Miembro",
        avatarUrl: `https://ui-avatars.com/api/?name=${user.email}&background=random`,
        onClick: () => navigate("/home"),
      }
    : undefined;
  
  const confirmLogout = async () => {
    await logout();
    setShowLogoutDialog(false);
  };

  const logoutButton = (
    <SidebarButton
      onClick={handleLogoutClick}
      icon="mdi:logout"
      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full justify-start"
    >
      {t("logout.label")}
    </SidebarButton>
  );
  return (
    <>
    <Sidebar 
      items={items} 
      onNavigate={handleNavigate} 
      profile={profile}
      bottomActions={logoutButton}  
    />
    {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface border border-border rounded-xl p-6 shadow-2xl w-full max-w-sm animate-in zoom-in-95 slide-in-from-bottom-2 duration-200">
            <h3 className="text-lg font-semibold text-primary mb-2">
              {t("logout.confirmTitle", "¿Seguro que deseas cerrar sesión?")}
            </h3>
            <p className="text-sm text-secondary mb-6">
              {t("logout.confirmMessage", "Tu sesión se cerrará.")}
            </p>
            
            <div className="flex justify-end gap-3">
              <Button 
                variant="default" 
                onClick={() => setShowLogoutDialog(false)}
              >
                {t("common.cancel", "Cancelar")}
              </Button>
              <Button 
                variant="default" // O "destructive" si lo tienes configurado
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={confirmLogout}
              >
                {t("common.confirm", "Confirmar")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
