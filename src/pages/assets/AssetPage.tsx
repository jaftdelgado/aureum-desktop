import React from "react";
import { PageHeader } from "@ui/PageHeader";
import { useTranslation } from "react-i18next";
import { Button } from "@ui/Button";

export const AssetPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader
        title={t("assets.title")}
        description={t("assets.description")}
        actions={
          <Button variant="default" icon="lucide:plus" className="px-4 py-2">
            {t("assets.newAssetButton")}
          </Button>
        }
      />

      <div className="flex flex-1 w-full">
        <div className="flex-1 h-full bg-transparent flex items-center justify-center border-r border-outline"></div>
        <div className="flex flex-col flex-1 h-full">
          <div className="flex-1 bg-transparent flex items-center justify-center border-b border-outline"></div>
          <div className="flex-1 bg-transparent flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
};
