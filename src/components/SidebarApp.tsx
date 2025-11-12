import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sidebar, type SidebarItem } from "@components/ui/sidebar/Sidebar";

export const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items: SidebarItem[] = [
    { type: "separator", label: "Principal" },
    {
      type: "button",
      icon: "gravity-ui:compass",
      label: "Explorar",
      route: "/dashboard",
    },
    {
      type: "button",
      icon: "gravity-ui:rectangles-4",
      label: "Equipos",
      route: "/dashboard/teams",
    },
    { type: "separator", label: "Equipos" },
    {
      type: "button",
      icon: "gravity-ui:rectangles-4",
      label: "Activos",
      route: "/dashboard/assets",
    },
  ];

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  const itemsWithActive: SidebarItem[] = items.map((item) => {
    if (item.type === "separator") {
      return { ...item, active: false };
    }
    return { ...item, active: location.pathname === item.route };
  });

  const profile = {
    name: "Jafeth Dlg",
    role: "Administrador",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    onClick: () => {
      navigate("/dashboard/profile");
    },
  };

  return (
    <Sidebar
      items={itemsWithActive}
      onNavigate={handleNavigate}
      profile={profile}
    />
  );
};
