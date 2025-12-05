import React from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@core/components/PageHeader";
import { Label } from "@core/ui/Label";
import { Separator } from "@core/ui/Separator";
import { useProfilePage } from "../hooks/useProfilePage";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation("profile");
  const { user } = useProfilePage();

  if (!user) return null;

  const joinedDate = new Date(user.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-300">
      <PageHeader title={t("title")} description={t("subtitle")} />
      <div className="flex flex-col items-center mt-2 max-w-md mx-auto w-full">
        <div className="flex flex-col items-center gap-2 mb-8">
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            className="w-32 h-32 rounded-full object-cover border-4 border-surface-variant shadow-xl"
          />
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-2xl font-bold text-primaryText">
              {user.fullName}
            </h2>
            <Label 
              variant="body" 
              color="secondary" 
              className="uppercase tracking-wider text-[10px] font-bold bg-surface-variant px-2 py-0.5 rounded-full"
            >
              {t(`roles.${user.role}` as any, { defaultValue: user.role })}
            </Label>
            {user.bio && (
              <p className="text-sm text-secondaryText mt-2 max-w-[80%] italic">
                "{user.bio}"
              </p>
            )}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-4 w-full shadow-sm flex flex-col gap-0">
          <div className="flex flex-col gap-1">
            <div>
                <Label variant="small" color="secondary" className="mb-0">{t("labels.username")}</Label>
                <p className="text-primaryText font-medium">@{user.username}</p>
            </div>
             <Separator />
            <div>
                <Label variant="small" color="secondary" className="mb-0">{t("labels.email")}</Label>
                <p className="text-primaryText font-medium truncate">{user.email}</p>
            </div>
          </div>
           <Separator />
          <div className="grid grid-cols-2 gap-1">
            <div>
                <Label variant="small" color="secondary" className="mb-1">{t("labels.joinedAt")}</Label>
                <p className="text-primaryText text-sm">{joinedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;