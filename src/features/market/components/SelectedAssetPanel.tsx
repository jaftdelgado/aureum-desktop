import React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@core/utils/cn";
import type { Asset } from "../hooks/useMarketPage";
import { currencyFormatter, formatPercent } from "../hooks/useMarketPage";

interface SelectedAssetPanelProps {
  asset: Asset;
}

export const SelectedAssetPanel: React.FC<SelectedAssetPanelProps> = ({
  asset,
}) => {
  const { t } = useTranslation("market");

  return (
    <section className="col-span-5 rounded-xl border border-outline bg-card/40 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wide text-secondaryText">
            {t("selectedAsset.label")}
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-primaryText">
              {asset.symbol}
            </span>
            <span className="text-sm text-secondaryText">{asset.name}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex flex-col">
            <span className="text-xs text-secondaryText">
              {t("selectedAsset.currentPrice")}
            </span>
            <span className="text-lg font-semibold text-primaryText">
              {currencyFormatter.format(asset.currentPrice)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-secondaryText">
              {t("selectedAsset.change24h")}
            </span>
            <span
              className={cn(
                "text-sm font-semibold",
                asset.change24h >= 0 ? "text-green-500" : "text-red-500"
              )}
            >
              {formatPercent(asset.change24h)}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-secondaryText">
              {t("selectedAsset.portfolioPercent")}
            </span>
            <span className="text-sm font-semibold text-primaryText">
              {asset.allocation}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};