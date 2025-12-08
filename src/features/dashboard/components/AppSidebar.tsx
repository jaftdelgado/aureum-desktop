import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  type SidebarItem,
} from "@features/dashboard/components/side-bar/SideBar";
import { useTranslation } from "react-i18next";
import { useAuth } from "@app/hooks/useAuth";
import { Button } from "@core/ui/Button";
import { useSelectedTeam } from "@app/hooks/useSelectedTeam";

export const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t } = useTranslation("auth");
  const { selectedTeam } = useSelectedTeam();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleNavigate = (route: string) => navigate(route);

  const getProfileData = () => {
    if (!user) return undefined;

    const displayName = user.username || user.email;
    let displayRole = "Miembro";
    if (user.role === "professor")
      displayRole = t("signup.professor", "Profesor");
    if (user.role === "student")
      displayRole = t("signup.student", "Estudiante");

    const avatarName = encodeURIComponent(displayName);
    const finalAvatarUrl =
      user.avatarUrl ||
      `https://ui-avatars.com/api/?name=${avatarName}&background=0D8ABC&color=fff`;

    return {
      name: displayName,
      role: displayRole,
      avatarUrl: finalAvatarUrl,
      onProfileClick: () => navigate("/profile"),
      onLogout: () => setShowLogoutDialog(true),
    };
  };

  const profile = getProfileData();

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
      setShowLogoutDialog(false);
    }
  };

  const items: SidebarItem[] = useMemo(() => {
    const baseItems: SidebarItem[] = [
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
        route: "/lessons",
      },
    ];

    if (selectedTeam) {
      baseItems.push(
        { type: "separator", label: "Equipo" },
        {
          type: "button",
          icon: "hugeicons:discover-circle",
          label: "Overview",
          route: `/teams/${selectedTeam.publicId}/overview`,
        },
        {
          type: "button",
          icon: "hugeicons:shopping-bag-01",
          label: "Mercado",
          route: `/teams/${selectedTeam.publicId}/market`,
        },
        {
          type: "button",
          icon: "hugeicons:wallet-03",
          label: "Portafolio",
          route: `/teams/${selectedTeam.publicId}/portfolio`,
        },
        {
          type: "button",
          icon: "gravity-ui:rectangles-4",
          label: "Activos",
          route: `/teams/${selectedTeam.publicId}/assets`,
        },
        {
          type: "button",
          icon: "hugeicons:settings-02",
          label: "Configuración",
          route: `/teams/${selectedTeam.publicId}/settings`,
        }
      );
    }

    const currentPath = location.hash.startsWith("#")
      ? location.hash.slice(1)
      : location.pathname;

    return baseItems.map((item) => {
      if (item.type !== "button") return item;
      const selected = item.route ? currentPath.startsWith(item.route) : false;
      return { ...item, selected };
    });
  }, [location.hash, location.pathname, selectedTeam]);

  return (
    <>
      <Sidebar items={items} onNavigate={handleNavigate} profile={profile} />

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
                disabled={isLoggingOut}
              >
                {t("common.cancel", "Cancelar")}
              </Button>
              <Button
                variant="default"
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={confirmLogout}
                disabled ={isLoggingOut}
              >
                {isLoggingOut ? "Cerrando..." : t("common.confirm", "Confirmar")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
