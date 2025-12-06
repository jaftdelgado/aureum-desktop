import React from "react";
import { useTranslation } from "react-i18next";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { Asset } from "../hooks/useMarketPage";
import { currencyFormatter } from "../hooks/useMarketPage";

interface AssetHistoryChartProps {
  asset: Asset;
}

export const AssetHistoryChart: React.FC<AssetHistoryChartProps> = ({
  asset,
}) => {
  const { t } = useTranslation("market");

  return (
    <section className="col-span-3 row-span-3 row-start-2 rounded-xl border border-outline bg-card/40 p-4">
      <header className="mb-3 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-primaryText">
            {t("chart.title")}
          </h2>
          <span className="text-xs text-secondaryText">
            {t("chart.subtitle", { symbol: asset.symbol })}
          </span>
        </div>
      </header>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={asset.history}>
            <CartesianGrid
              strokeDasharray="3 3"
              strokeOpacity={0.1}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              width={70}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v) =>
                currencyFormatter.format(v as number).split(".")[0]
              }
            />
            <Tooltip
              contentStyle={{
                background: "rgba(10,10,20,0.95)",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              formatter={(value: any) =>
                currencyFormatter.format(value as number)
              }
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="currentColor"
              strokeWidth={2}
              dot={false}
              className="text-primaryBtn"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};