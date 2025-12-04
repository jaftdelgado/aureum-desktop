import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  type SidebarItem,
} from "@features/dashboard/components/side-bar/SideBar";
import { useTranslation } from "react-i18next";
import { useAuth } from "@app/hooks/useAuth";
import { Button } from "@core/ui/Button";

const useSelectedTeamId = () => {
  return "123";
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
      route: "/lessons",
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
      route: selectedTeamId ? `/teams/${selectedTeamId}/portfolio` : "/teams",
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

  const handleNavigate = (route: string) => navigate(route);

  const getProfileData = () => {
    if (!user) return undefined;

    const displayName = user.fullName || user.username || user.email;
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
      onProfileClick: () => navigate("/home"),
      onLogout: () => setShowLogoutDialog(true),
    };
  };

  const profile = getProfileData();

  const confirmLogout = async () => {
    await logout();
    setShowLogoutDialog(false);
  };

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
              >
                {t("common.cancel", "Cancelar")}
              </Button>

              <Button
                variant="default"
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
