import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useSelectedTeam } from "@app/hooks/useSelectedTeam";
import type { SidebarItem } from "../components/side-bar/SideBar";
import { useTranslation } from "react-i18next";

export const useSidebarMenu = () => {
  const { t } = useTranslation("dashboard");
  const location = useLocation();
  const { selectedTeam } = useSelectedTeam();

  const items: SidebarItem[] = useMemo(() => {
    const baseItems: SidebarItem[] = [
      { type: "separator", label: t("sidebar.menu.main") }, 
      { type: "button", icon: "gravity-ui:compass", label: t("sidebar.menu.explore"), route: "/home" },
      { type: "button", icon: "gravity-ui:rectangles-4", label: t("sidebar.menu.teams"), route: "/teams" },
      { type: "button", icon: "hugeicons:video-01", label: t("sidebar.menu.lessons"), route: "/lessons" },
    ];

    if (selectedTeam) {
      baseItems.push(
        { type: "separator", label: t("sidebar.menu.team") }, 
        { type: "button", icon: "hugeicons:discover-circle", label: t("sidebar.menu.overview"), route: `/teams/${selectedTeam.publicId}/overview` },
        { type: "button", icon: "hugeicons:shopping-bag-01", label: t("sidebar.menu.market"), route: `/teams/${selectedTeam.publicId}/market` },
        { type: "button", icon: "hugeicons:wallet-03", label: t("sidebar.menu.portfolio"), route: `/teams/${selectedTeam.publicId}/portfolio` },
        { type: "button", icon: "gravity-ui:rectangles-4", label: t("sidebar.menu.assets"), route: `/teams/${selectedTeam.publicId}/assets` },
        { type: "button", icon: "hugeicons:settings-02", label: t("sidebar.menu.settings"), route: `/teams/${selectedTeam.publicId}/settings` }
      );
    }

    const currentPath = location.hash.startsWith("#") ? location.hash.slice(1) : location.pathname;

    return baseItems.map((item) => {
      if (item.type !== "button") return item;
      return { ...item, active: item.route ? currentPath.startsWith(item.route) : false };
    });
  }, [location.hash, location.pathname, selectedTeam, t]);

  return { items };
};