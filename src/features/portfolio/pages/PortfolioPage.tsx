import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@core/components/PageHeader";
import { useAuth } from "@app/hooks/useAuth";
import { useSelectedTeam } from "@app/hooks/useSelectedTeam";
import { PortfolioChart } from "../components/PortfolioChart";
import { PortfolioAssetsTable } from "../components/PortfolioAssetsTable";
import { AssetMovementsModal } from "../components/AssetMovementsModal";
import { usePortfolioData } from "../hooks/usePortfolioQueries";
import { useMarketPage } from "@features/market/hooks/useMarketPage";

const PortfolioPage: React.FC = () => {
  const { t } = useTranslation("portfolio");
  const { user } = useAuth();
  const { selectedTeam } = useSelectedTeam();
  const { portfolio, history, isLoading } = usePortfolioData(
    selectedTeam?.publicId,
    user?.id
  );

  const { assets: marketAssets } = useMarketPage(selectedTeam?.publicId || "");
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  if (!selectedTeam)
    return <div className="p-8 text-primaryText">{t("selectTeam")}</div>;

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title={`${t("title")} - ${selectedTeam.name}`}
        description={t("description")}
      />

      <PortfolioChart
        portfolio={portfolio}
        marketAssets={marketAssets}
        isLoading={isLoading}
      />

      <PortfolioAssetsTable
        portfolio={portfolio}
        marketAssets={marketAssets}
        selectedAssetId={selectedAssetId}
        setSelectedAssetId={setSelectedAssetId}
        isLoading={isLoading}
      />

      {selectedAssetId && (
        <AssetMovementsModal
          selectedAssetId={selectedAssetId}
          history={history}
          portfolio={portfolio}
          onClose={() => setSelectedAssetId(null)}
        />
      )}
    </div>
  );
};

export default PortfolioPage;
