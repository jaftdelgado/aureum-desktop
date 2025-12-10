import React from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@core/components/Table";
import { cn } from "@core/utils/cn";
import type { Asset } from "../hooks/useMarketPage";
import { currencyFormatter, formatPercent } from "../hooks/useMarketPage";

interface AssetsTableProps {
  assets: Asset[];
  selectedAssetId?: string;
  onSelectAsset: (id: string) => void;
}

export const AssetsTable: React.FC<AssetsTableProps> = ({
  assets,
  selectedAssetId,
  onSelectAsset,
}) => {
  const { t } = useTranslation("market");

  return (
    <section className="col-span-2 row-span-3 col-start-4 row-start-2 flex flex-col rounded-xl border border-outline bg-card/40 p-4">
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-primaryText">
          {t("table.title")}
        </h2>
        <span className="text-xs text-secondaryText">
          {t("table.count", { count: assets.length })}
        </span>
      </header>

      {/* CONTENEDOR SCROLLABLE */}
      <div className="flex-1 min-h-0 overflow-y-auto max-h-64 pr-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table.columns.asset")}</TableHead>
              <TableHead className="text-right">
                {t("table.columns.price")}
              </TableHead>
              <TableHead className="text-right">
                {t("table.columns.change24h")}
              </TableHead>
              <TableHead className="text-right">
                {t("table.columns.portfolioPercent")}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {assets.map((asset) => {
              const isSelected = asset.id === selectedAssetId;

              return (
                <TableRow
                  key={asset.id}
                  className={cn(
                    "cursor-pointer transition-colors hover:bg-primary/5",
                    isSelected && "bg-primary/10"
                  )}
                  onClick={() => onSelectAsset(asset.id)}
                >
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-primaryText">
                        {asset.symbol}
                      </span>
                      <span className="text-xs text-secondaryText">
                        {asset.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right text-sm">
                    {currencyFormatter.format(asset.currentPrice)}
                  </TableCell>

                  <TableCell
                    className={cn(
                      "text-right text-sm font-medium",
                      asset.change24h >= 0 ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {formatPercent(asset.change24h)}
                  </TableCell>

                  <TableCell className="text-right text-sm">
                    {asset.allocation}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>

  );
};
