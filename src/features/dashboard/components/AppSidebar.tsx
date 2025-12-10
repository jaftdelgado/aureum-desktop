import React from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@features/dashboard/components/side-bar/SideBar";
import { Button } from "@core/ui/Button";
import { useSidebarMenu } from "../hooks/useSidebarMenu";
import { useSidebarProfile } from "../hooks/useSidebarProfile";

interface AppSidebarProps {
  className?: string; // <-- agregamos className
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ className }) => {
  const navigate = useNavigate();
  const { items } = useSidebarMenu();
  const { profile, actions, state, t } = useSidebarProfile();

  const handleNavigate = (route: string) => navigate(route);

  const profileProps = profile
    ? {
        name: profile.name,
        role: profile.role,
        avatarUrl: profile.avatarUrl,
        currentTheme: state.currentTheme,
        currentLang: state.currentLang,
        onProfileClick: actions.goToProfile,
        onLogout: actions.openLogoutDialog,
        onToggleTheme: actions.toggleTheme,
        onToggleLanguage: actions.toggleLanguage,
        texts: {
          viewProfile: t("sidebar.viewProfile", "Ver perfil"),
          changeLanguage: t("sidebar.changeLanguage", "Cambiar idioma"),
          toggleTheme: t("sidebar.toggleTheme", "Cambiar tema"),
          logout: t("logout.label", "Cerrar sesión"),
        },
      }
    : undefined;

  return (
    <>
      <Sidebar
        items={items}
        onNavigate={handleNavigate}
        profile={profileProps}
        className={className} // <-- pasamos className al Sidebar
      />

      {state.showLogoutDialog && (
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
                onClick={() => state.setShowLogoutDialog(false)}
                disabled={state.isLoggingOut}
              >
                {t("common.cancel", "Cancelar")}
              </Button>
              <Button
                variant="default"
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={actions.confirmLogout}
                disabled={state.isLoggingOut}
              >
                {state.isLoggingOut
                  ? "Cerrando..."
                  : t("common.confirm", "Confirmar")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
