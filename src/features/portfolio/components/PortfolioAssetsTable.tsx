import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@core/components/Table";
import { cn } from "@core/utils/cn";
import { useTranslation } from "react-i18next";

interface PortfolioAssetsTableProps {
  portfolio: any[];
  marketAssets: any[];
  selectedAssetId: string | null;
  setSelectedAssetId: (id: string | null) => void;
  isLoading: boolean;
}

export const PortfolioAssetsTable: React.FC<PortfolioAssetsTableProps> = ({
  portfolio,
  marketAssets,
  selectedAssetId,
  setSelectedAssetId,
  isLoading,
}) => {
  const { t } = useTranslation("portfolio");

  // Calcula precios congelados
  const staticPrices = useMemo(() => {
    const snapshot: Record<string, number> = {};
    marketAssets.forEach((asset) => {
      snapshot[asset.id] = asset.currentPrice;
    });
    return snapshot;
  }, [marketAssets]);

  const myPortfolio = useMemo(() => {
    return portfolio.map((item) => {
      const frozenPrice = staticPrices[item.assetId];
      const priceDisplay = frozenPrice ?? item.currentValue;
      const currentTotalValue = item.quantity * priceDisplay;
      const investedTotal = item.quantity * item.avgPrice;
      const pnl = currentTotalValue - investedTotal;
      const pnlPercent = investedTotal !== 0 ? (pnl / investedTotal) * 100 : 0;

      return {
        ...item,
        currentValue: priceDisplay,
        currentTotalValue,
        profitOrLoss: pnl,
        profitOrLossPercentage: pnlPercent,
      };
    });
  }, [portfolio, staticPrices]);

  return (
    <div className="rounded-md border border-outline bg-card">
      <div className="p-4 border-b border-outline">
        <h3 className="font-semibold text-primaryText">
          {t("myAssets.title")}
        </h3>
        <p className="text-sm text-secondaryText">{t("myAssets.subtitle")}</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-outline">
            <TableHead className="text-secondaryText">
              {t("table.symbol")}
            </TableHead>
            <TableHead className="text-secondaryText">
              {t("table.asset")}
            </TableHead>
            <TableHead className="text-right text-secondaryText">
              {t("table.quantity")}
            </TableHead>
            <TableHead className="text-right text-secondaryText">
              {t("table.average")}
            </TableHead>
            <TableHead className="text-right text-secondaryText">
              {t("table.currentValue")}
            </TableHead>
            <TableHead className="text-right text-secondaryText">
              {t("table.pnlCurrency")}
            </TableHead>
            <TableHead className="text-right text-secondaryText">
              {t("table.pnlPercent")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-secondaryText"
              >
                {t("loading")}
              </TableCell>
            </TableRow>
          ) : myPortfolio.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-secondaryText"
              >
                {portfolio.length > 0
                  ? t("empty.withTeam")
                  : t("empty.generic")}
              </TableCell>
            </TableRow>
          ) : (
            myPortfolio.map((item) => (
              <TableRow
                key={item.portfolioId}
                onClick={() =>
                  setSelectedAssetId(
                    item.assetId === selectedAssetId ? null : item.assetId
                  )
                }
                className={cn(
                  "cursor-pointer transition-colors border-outline text-primaryText",
                  selectedAssetId === item.assetId
                    ? "bg-primaryBtn/10 border-l-2 border-l-primaryBtn"
                    : "hover:bg-secondaryBtn"
                )}
              >
                <TableCell className="font-bold text-primaryText">
                  {item.assetSymbol}
                </TableCell>
                <TableCell>{item.assetName}</TableCell>
                <TableCell className="text-right font-mono">
                  {item.quantity.toFixed(4)}
                </TableCell>
                <TableCell className="text-right text-secondaryText">
                  ${item.avgPrice.toFixed(2)}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  ${item.currentValue.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    item.profitOrLoss >= 0
                      ? "text-green-500"
                      : "text-destructive"
                  }`}
                >
                  {item.profitOrLoss >= 0 ? "+" : ""}
                  {item.profitOrLoss.toFixed(2)}
                </TableCell>
                <TableCell
                  className={`text-right ${
                    item.profitOrLossPercentage >= 0
                      ? "text-green-500"
                      : "text-destructive"
                  }`}
                >
                  {item.profitOrLossPercentage.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
