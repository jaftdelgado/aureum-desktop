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
<<<<<<< HEAD
              tickFormatter={() => ""}   // <── elimina las horas del eje X
=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
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
              separator=" "
              contentStyle={{
                backgroundColor: "rgba(15,23,42,0.96)", 
                borderRadius: 16,
                border: "none",
                padding: "8px 10px",
                boxShadow: "0 10px 25px rgba(15,23,42,0.45)",
              }}
              labelStyle={{
                color: "#E5E7EB",           
                fontSize: 11,
                marginBottom: 4,
              }}
              itemStyle={{
                color: "#F9FAFB",           
                fontSize: 12,
                fontWeight: 500,
              }}
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