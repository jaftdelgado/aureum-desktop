import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  type SidebarItem,
} from "@app/dashboard/components/side-bar/SideBar";
import { useAuth } from "@app/hooks/useAuth";
import { SidebarButton } from "./side-bar/SidebarButton";

const useSelectedTeamId = () => {
  return "123"; // ejemplo
};

export const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const selectedTeamId = useSelectedTeamId();

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
    { type: "separator", label: "Gestión" },
    {
      type: "button",
      icon: "hugeicons:shopping-bag-01",
      label: "Mercado",
      route: selectedTeamId ? `/teams/${selectedTeamId}/market` : "/teams",
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

  const profile = user
    ? {
        name: user.email,
        role: "Miembro",
        avatarUrl: `https://ui-avatars.com/api/?name=${user.email}&background=random`,
        onClick: () => navigate("/home"),
      }
    : undefined;
  
  const logoutButton = (
    <SidebarButton
      onClick={logout}
      icon="mdi:logout"
      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full justify-start"
    >
      Cerrar Sesión
    </SidebarButton>
  );
  return (
    <Sidebar 
      items={items} 
      onNavigate={handleNavigate} 
      profile={profile}
      bottomActions={logoutButton}  
    />
  );
};
