import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';
import type { PortfolioItem } from '../hooks/types';

interface Props {
  data: PortfolioItem[];
}

export const PortfolioPnLChart: React.FC<Props> = ({ data }) => {
  const chartData = data
    .filter(item => item.totalInvestment > 0) // Ocultar activos vacíos
    .map(item => ({
      name: item.assetSymbol,
      pnl: item.profitOrLoss,
      value: item.currentTotalValue,
    }));

  return (
    <div className="h-96 w-full bg-surface-1 p-6 rounded-lg border border-border shadow-md flex flex-col">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-xl font-bold text-text-primary">Rendimiento (P&L)</h3>
          <p className="text-sm text-text-secondary">Ganancia o pérdida neta por activo</p>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData} 
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} opacity={0.4} />
            
            <XAxis 
              dataKey="name" 
              stroke="#666" 
              tick={{fontSize: 12, fill: '#888'}} 
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            
            <YAxis 
              stroke="#666" 
              tick={{fontSize: 12, fill: '#888'}} 
              tickFormatter={(val) => `$${val}`} 
              axisLine={false}
              tickLine={false}
            />
            
            <Tooltip
              cursor={{fill: 'rgba(255,255,255,0.05)'}}
              contentStyle={{ 
                backgroundColor: '#09090b', 
                borderColor: '#27272a', 
                borderRadius: '8px',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Ganancia/Pérdida']}
            />
            
            <ReferenceLine y={0} stroke="#666" strokeWidth={1} />
            
            <Bar dataKey="pnl" radius={[4, 4, 0, 0]} maxBarSize={50}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.pnl >= 0 ? '#22c55e' : '#ef4444'} 
                  fillOpacity={0.9}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};