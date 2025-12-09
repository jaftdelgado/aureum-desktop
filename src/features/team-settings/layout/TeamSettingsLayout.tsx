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
    { label: t("settings.simulator"), value: "simulator" },
    { label: t("settings.members"), value: "members" },
  ];

  const getCurrentTab = () => {
    if (location.pathname.endsWith("/settings/simulator")) return "simulator";
    return "members";
  };

  const [selectedTab, setSelectedTab] = useState(getCurrentTab());

  useEffect(() => {
    if (location.pathname.endsWith("/settings") || location.pathname.endsWith("/settings/")) {
      navigate(`members`, { replace: true });
    }
    
    setSelectedTab(getCurrentTab());
  }, [location.pathname, navigate]);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);

    switch (value) {
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
      <div id="page-top-sentinel" className="h-px w-full" />
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
