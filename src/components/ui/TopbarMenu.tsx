import React from "react";
import { useAuthContext } from "@hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import LogoImg from "@resources/svg/aureum-icon.svg";

interface TopbarMenuProps {
  className?: string;
}

export const TopbarMenu: React.FC<TopbarMenuProps> = ({ className = "" }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const profileImageUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    "https://ui-avatars.com/api/?name=User&background=random";

  const handleProfileClick = () => {
    navigate("/dashboard/profile");
  };

  return (
    <header
      className={`w-full flex items-center justify-between px-6 py-4 border-b border-outline bg-bg ${className}`}
    >
      {/* Logo a la izquierda */}
      <div className="flex items-center gap-2">
        <img src={LogoImg} alt="Aureum Logo" className="h-8 w-8" />
      </div>

      {/* Perfil a la derecha */}
      <div className="flex items-center gap-2">
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            onClick={handleProfileClick}
          />
        ) : (
          <div
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
            onClick={handleProfileClick}
          />
        )}
      </div>
    </header>
  );
};
