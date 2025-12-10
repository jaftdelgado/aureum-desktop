import React from "react";
import { useTranslation } from "react-i18next";

import { PageHeader } from "@core/components/PageHeader";

import { useMarketPage } from "../hooks/useMarketPage";
import { SelectedAssetPanel } from "../components/SelectedAssetPanel";
import { AssetHistoryChart } from "../components/AssetHistoryChart";
import { AssetsTable } from "../components/AssetsTable";
import { MarketActions } from "../components/MarketActions";
import { useSelectedTeam } from "@app/hooks/useSelectedTeam";
import { useMarketTrading } from "../hooks/useMarketTrading";

const MarketPage: React.FC = () => {
  const { t } = useTranslation("market");
  const { selectedTeam } = useSelectedTeam();
  const courseId = selectedTeam?.publicId || "";
  const { assets, selectedAsset, selectedAssetId, selectAsset, isLoading, reloadQuantities  } =
    useMarketPage(courseId);

  const { buy, sell, loadingBuy, loadingSell, } = useMarketTrading(
    selectedAsset, reloadQuantities
  );


  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col">
        <PageHeader title={t("title")} description={t("description")} />

        <div className="flex-1 overflow-y-auto p-page-x py-6">
          <div className="flex h-60 flex-col items-center justify-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primaryBtn border-t-transparent" />
            <p className="text-sm text-secondaryText">{t("loadingList")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedAsset) {
    return (
      <div className="flex h-full w-full flex-col">
        <PageHeader title={t("title")} description={t("description")} />

        <div className="flex-1 p-page-x pb-6 pt-4">
          <div className="flex h-60 items-center justify-center text-secondaryText">
            {t("noAssets")}
          </div>
        </div>
      </div>
    );
  }
  if (!selectedAsset) {
    return <div className="page-x page-y">{t("noAssets")}</div>;
  }

  return (
    <div className="flex h-full w-full flex-col">
      <PageHeader title={t("title")} description={t("description")} />

      <div className="flex-1 p-page-x pb-6 pt-4">
        <div className="grid h-full grid-cols-5 grid-rows-5 gap-4">
          <SelectedAssetPanel asset={selectedAsset} />

          <AssetHistoryChart asset={selectedAsset} />

          <AssetsTable
            assets={assets}
            selectedAssetId={selectedAssetId}
            onSelectAsset={selectAsset}
          />

          <MarketActions
            onBuy={() => buy(1)}
            onSell={() => sell(1)}
            loadingBuy={loadingBuy}
            loadingSell={loadingSell}
            quantity={selectedAsset?.allocation ?? 0}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketPage;
