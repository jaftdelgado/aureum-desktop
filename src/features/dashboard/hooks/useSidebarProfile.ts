import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@app/hooks/useAuth";
import { useTranslation } from "react-i18next";
import { useAppTheme } from "@app/hooks/useAppTheme";

export const useSidebarProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation("auth");
  const { theme, toggleTheme } = useAppTheme();
  
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const getProfileData = () => {
    if (!user) return null;

    const displayName = user.username || user.email;
    const roleKey = user.role === "professor" ? "signup.professor" : "signup.student";
    const displayRole = user.role ? t(roleKey as any, user.role) : "Miembro";

    const avatarName = encodeURIComponent(displayName);
    
    const finalAvatarUrl = user.avatarUrl || `https://ui-avatars.com/api/?name=${avatarName}&background=0D8ABC&color=fff`;

    return {
      name: displayName,
      role: displayRole,
      avatarUrl: finalAvatarUrl,
    };
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
      setShowLogoutDialog(false);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  };

  return {
    profile: getProfileData(),
    actions: {
      goToProfile: () => navigate("/profile"),
      openLogoutDialog: () => setShowLogoutDialog(true),
      confirmLogout: handleLogout,
      toggleTheme,
      toggleLanguage,
    },
    state: {
      showLogoutDialog,
      setShowLogoutDialog,
      isLoggingOut,
      currentTheme: theme,
      currentLang: i18n.language,
    },
    t, 
  };
};