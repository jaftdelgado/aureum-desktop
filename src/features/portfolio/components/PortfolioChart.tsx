import React, { useMemo, useState, useEffect } from "react";
import { PortfolioPnLChart } from "../components/PortfolioPnLChart";

interface PortfolioChartProps {
  portfolio: any[];
  marketAssets: any[];
  isLoading: boolean;
}

export const PortfolioChart: React.FC<PortfolioChartProps> = ({
  portfolio,
  marketAssets,
  isLoading,
}) => {
  const [staticPrices, setStaticPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    if (Object.keys(staticPrices).length > 0) return;

    if (marketAssets && marketAssets.length > 0) {
      const snapshot: Record<string, number> = {};
      marketAssets.forEach((asset) => {
        snapshot[asset.id] = asset.currentPrice;
      });
      setStaticPrices(snapshot);
    }
  }, [marketAssets, staticPrices]);

  const myPortfolio = useMemo(() => {
    if (!portfolio) return [];

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

  if (!myPortfolio.length || isLoading) return null;

  return <PortfolioPnLChart data={myPortfolio} />;
};
