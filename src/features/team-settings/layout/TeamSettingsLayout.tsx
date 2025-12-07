import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "@core/components/PageHeader";
import { useTranslation } from "react-i18next";
import { type TabItem } from "@core/components/Tabs";

const TeamSettingsLayout: React.FC = () => {
  const { t } = useTranslation("teamSettings");
  const { teamId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const tabs: TabItem[] = [
    { label: t("settings.teamInfo"), value: "teamInfo" },
    { label: t("settings.members"), value: "members" },
    { label: t("settings.simulator"), value: "simulator" },
  ];

  const getCurrentTab = () => {
    if (location.pathname.endsWith("/settings/members")) return "members";
    if (location.pathname.endsWith("/settings/simulator")) return "simulator";
    return "teamInfo";
  };

  const [selectedTab, setSelectedTab] = useState(getCurrentTab());

  useEffect(() => {
    setSelectedTab(getCurrentTab());
  }, [location.pathname]);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);

    switch (value) {
      case "teamInfo":
        navigate(`/teams/${teamId}/settings`);
        break;
      case "members":
        navigate(`/teams/${teamId}/settings/members`);
        break;
      case "simulator":
        navigate(`/teams/${teamId}/settings/simulator`);
        break;
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader
        title={t("title")}
        description={t("description")}
        tabs={tabs}
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
      />

      <div className="p-page-x py-page-y h-full w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default TeamSettingsLayout;
