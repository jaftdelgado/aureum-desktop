import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  type SidebarItem,
} from "@dashboard/components/ui/sidebar/Sidebar";
import { useAuthContext } from "@hooks/useAuthContext";

export const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();

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
      icon: "hugeicons:shopping-bag-01",
      label: "Mercado",
      route: "/dashboard/market",
    },

    {
      type: "button",
      icon: "gravity-ui:rectangles-4",
      label: "Activos",
      route: "/dashboard/assets",
    },

    {
      type: "button",
      icon: "hugeicons:settings-02",
      label: "Configuración",
      route: "/dashboard/settings",
    },
  ];

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  const itemsWithActive: SidebarItem[] = items.map((item) => {
    if (item.type === "separator") return { ...item, active: false };
    return { ...item, active: location.pathname === item.route };
  });

  const profile = {
    name:
      user?.user_metadata?.full_name ||
      user?.user_metadata?.name ||
      user?.email ||
      "Usuario",
    role: "Miembro",
    avatarUrl:
      user?.user_metadata?.avatar_url ||
      user?.user_metadata?.picture ||
      "https://ui-avatars.com/api/?name=User&background=random",
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
