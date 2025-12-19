import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "@core/components/PageHeader";
import { PageTabs } from "@core/components/PageTabs";
import { Container } from "@core/components/Container";
import { useTranslation } from "react-i18next";
import { type TabItem } from "@core/components/Tabs";

const TeamSettingsLayout: React.FC = () => {
  const { t } = useTranslation("teamSettings");
  const { teamId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const tabs: TabItem[] = [
    { label: t("settings.members"), value: "members" },
    { label: t("settings.simulator"), value: "simulator" },
  ];

  const getCurrentTab = () => {
    if (location.pathname.endsWith("/settings/simulator")) return "simulator";
    return "members";
  };

  const [selectedTab, setSelectedTab] = useState(getCurrentTab());

  useEffect(() => {
    if (
      location.pathname.endsWith("/settings") ||
      location.pathname.endsWith("/settings/")
    ) {
      navigate("members", { replace: true });
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
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div id="page-top-sentinel" className="h-px w-full" />

      <PageHeader title={t("title")} description={t("description")} />

      <div className="px-page-x py-page-y flex-1 min-h-0">
        <Container className="w-full h-full flex flex-col min-h-0">
          <PageTabs
            tabs={tabs}
            value={selectedTab}
            onChange={handleTabChange}
          />

          <div className="flex-1 min-h-0 overflow-y-auto px-page-x py-component-y">
            <Outlet />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TeamSettingsLayout;
