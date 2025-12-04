import React from "react";
import { PageHeader } from "@core/components/PageHeader";
import { useTranslation } from "react-i18next";
import { SettingsOptionsList } from "@features/team-settings/components/SettingsOptionsList";
import type { SettingsOptionItem } from "@features/team-settings/components/SettingsOptionsList";

const TeamSettingsPage: React.FC = () => {
  const { t } = useTranslation("teamSettings");

  const options: SettingsOptionItem[] = [
    {
      icon: "hugeicons:dashboard-square-01",
      title: t("settings.teamInfo"),
      description: t("settings.teamInfoDesc"),
      route: "/dashboard/settings/team",
    },
    {
      icon: "hugeicons:user-group",
      title: t("settings.members"),
      description: t("settings.membersDesc"),
      route: "/teams/:teamId/settings/members",
    },
    {
      icon: "hugeicons:cpu",
      title: t("settings.simulator"),
      description: t("settings.simulatorDesc"),
      route: "/teams/:teamId/settings/simulator",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader title={t("title")} description={t("description")} />
      <SettingsOptionsList options={options} />
    </div>
  );
};

export default TeamSettingsPage;
