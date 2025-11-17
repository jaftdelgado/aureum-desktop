import React from "react";
import { PageHeader } from "@ui/PageHeader";
import { useTranslation } from "react-i18next";
import { SettingsOption } from "@settings/components/ui/SettingsOption";
import { useNavigate } from "react-router-dom";

export const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader
        title={t("settings.title")}
        description={t("settings.description")}
      />

      <div className="flex flex-1 flex-col gap-3 py-4 px-4 w-full max-w-[840px]">
        <SettingsOption
          icon="hugeicons:dashboard-square-01"
          title={t("settings.teamInfo")}
          description={t("settings.teamInfoDesc")}
          onClick={() => navigate("/dashboard/settings/team")}
        />

        <SettingsOption
          icon="hugeicons:user-group"
          title={t("settings.members")}
          description={t("settings.membersDesc")}
          onClick={() => navigate("/dashboard/settings/members")}
        />

        <SettingsOption
          icon="hugeicons:cpu"
          title={t("settings.simulator.mainTitle")}
          description={t("settings.simulator.mainDesc")}
          onClick={() => navigate("/dashboard/settings/simulator")}
        />
      </div>
    </div>
  );
};
