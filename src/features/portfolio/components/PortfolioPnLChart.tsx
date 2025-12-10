import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell
} from 'recharts';
import type { PortfolioItem } from '../hooks/types';
import { useTranslation } from "react-i18next"; 

interface Props {
  data: PortfolioItem[];
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  const { t } = useTranslation("portfolio"); 

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isProfit = data.pnl >= 0;

    return (
      <div className="bg-card border border-outline p-3 rounded shadow-xl backdrop-blur-md bg-opacity-95 min-w-[200px]">
        <div className="flex justify-between items-center mb-2 pb-2 border-b border-outline">
          <span className="font-bold text-lg text-primaryText">{label}</span>
          <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isProfit ? 'bg-green-500/10 text-green-500' : 'bg-destructive/10 text-destructive'}`}>
            {isProfit ? t("chart.tooltip.profit") : t("chart.tooltip.loss")}
          </span>
        </div>
        
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-secondaryText">{t("chart.tooltip.quantity")}</span>
            <span className="font-mono text-primaryText">{data.quantity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondaryText">{t("chart.tooltip.avgPrice")}</span>
            <span className="font-mono text-primaryText">{formatCurrency(data.avgPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondaryText">{t("chart.tooltip.currentPrice")}</span>
            <span className="font-mono text-primaryText">{formatCurrency(data.currentPrice)}</span>
          </div>
          <div className="mt-2 pt-2 border-t border-outline flex justify-between items-center">
            <span className="text-secondaryText font-medium">{t("chart.tooltip.netPnl")}</span>
            <span className={`font-mono font-bold text-base ${isProfit ? 'text-green-500' : 'text-destructive'}`}>
              {isProfit ? '+' : ''}{formatCurrency(data.pnl)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const PortfolioPnLChart: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation("portfolio"); 

  const chartData = useMemo(() => {
    return data
      .filter(item => item.totalInvestment > 0)
      .map(item => ({
        name: item.assetSymbol,
        pnl: item.profitOrLoss,
        quantity: item.quantity,
        avgPrice: item.avgPrice,
        currentPrice: item.currentValue, 
        currentTotal: item.currentTotalValue
      }))
      .sort((a, b) => b.pnl - a.pnl);
  }, [data]);

  const totalPnL = chartData.reduce((acc, curr) => acc + curr.pnl, 0);
  const isTotalProfit = totalPnL >= 0;

  return (
    <div className="w-full bg-card p-6 rounded-lg border border-outline shadow-md flex flex-col h-[500px] transition-colors duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-primaryText">{t("chart.title")}</h3>
          <p className="text-sm text-secondaryText">{t("chart.subtitle")}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-secondaryText uppercase tracking-wider font-semibold">{t("chart.totalPnl")}</p>
          <p className={`text-2xl font-mono font-bold ${isTotalProfit ? 'text-green-500' : 'text-destructive'}`}>
            {isTotalProfit ? '+' : ''}{formatCurrency(totalPnL)}
          </p>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            {/* ... Resto de la configuración del gráfico sigue igual ... */}
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d93025" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#d93025" stopOpacity={0.1}/>
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="var(--outline)" vertical={false} opacity={0.5} />
            <XAxis dataKey="name" stroke="var(--secondary-text)" tick={{fontSize: 12, fill: "var(--secondary-text)"}} axisLine={false} tickLine={false} dy={10} />
            <YAxis stroke="var(--secondary-text)" tick={{fontSize: 11, fill: "var(--secondary-text)", fontFamily: 'monospace'}} tickFormatter={(val) => `$${val}`} axisLine={false} tickLine={false} />
            
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'var(--secondary-btn)', opacity: 0.2}} />
            <ReferenceLine y={0} stroke="var(--outline)" strokeWidth={1} />
            
            <Bar dataKey="pnl" radius={[4, 4, 0, 0]} maxBarSize={60}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.pnl >= 0 ? "url(#colorProfit)" : "url(#colorLoss)"} 
                  stroke={entry.pnl >= 0 ? "#10b981" : "var(--destructive)"}
                  strokeWidth={1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};