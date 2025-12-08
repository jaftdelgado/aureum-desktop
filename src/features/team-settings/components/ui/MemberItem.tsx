import React from "react";
import { Button } from "@core/ui/Button";
import { useTranslation } from "react-i18next";

interface MemberItemProps {
  avatarUrl?: string; 
  name: string;
  role: "professor" | "student";
  onRemove?: () => void;
}

export const MemberItem: React.FC<MemberItemProps> = ({
  avatarUrl,
  name,
  role,
  onRemove,
}) => {
  const { t } = useTranslation("teamSettings");
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
  
  const imageSource = avatarUrl && avatarUrl.length > 0 ? avatarUrl : defaultAvatar;

  const roleLabel = role === "professor" 
    ? t("roles.professor", "Profesor") 
    : t("roles.student", "Estudiante");
  return (
    <li className="flex items-center justify-between p-3 bg-surface border border-outline rounded-xl hover:bg-surface-hover transition-colors">
      <div className="flex items-center gap-3 overflow-hidden">
        <img
          src={imageSource}
          alt={name}
          className="w-10 h-10 rounded-full object-cover bg-surface-variant flex-shrink-0 border border-outline"
        />

        <div className="flex flex-col min-w-0">
          <span className="font-medium text-body text-primaryText truncate">
            {name}
          </span>
          <span className="text-xs text-secondaryText truncate capitalize">
            {roleLabel}
          </span>
        </div>
      </div>

      {onRemove && (
        <Button
          variant="destructive"
          size="sm"
          iconOnly="lucide:trash-2"
          onClick={onRemove}
          className="shrink-0 ml-2"
          aria-label={t("members.removeAria", { name })}
        />
      )}
    </li>
  );
};