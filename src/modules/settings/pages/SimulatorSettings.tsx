import React from "react";
import { PageHeader } from "@ui/PageHeader";
import { useTranslation } from "react-i18next";
import { MarketSettings } from "@settings/components/MarketSettings";

export const SimulatorSettings: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader
        title={t("settings.simulator.title")}
        description={t("settings.simulator.description")}
      />

      <div className="flex flex-1 flex-col gap-3 py-4 px-4 w-full max-w-[840px]">
        <MarketSettings />
      </div>
    </div>
  );
};
