import React from "react";
import { cn } from "@core/utils/cn";
import type { HistoryItem } from "../hooks/types";
import { useTranslation } from "react-i18next";

interface Props {
  assetName: string;
  assetSymbol: string;
  movements: HistoryItem[];
  onClose: () => void;
}

export const AssetMovementsList: React.FC<Props> = ({ assetName, assetSymbol, movements, onClose }) => {
  const { t } = useTranslation("portfolio");
  
  const formatMoney = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  // Nota: La fecha podrías también internacionalizarla dinámicamente según el idioma actual (i18n.language)
  const formatDate = (dateString: string) => 
    new Date(dateString).toLocaleDateString('es-MX', { 
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit' 
    });

  return (
    <div className="mt-6 rounded-xl border border-outline bg-card p-4 animate-in fade-in slide-in-from-top-4 duration-300 shadow-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-outline pb-4">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 text-primaryText">
            {/* Interpolación: Reemplaza {{symbol}} por la variable */}
            {t("history.title", { symbol: assetSymbol })}
            <span className="text-xs font-normal px-2 py-0.5 rounded-full border border-outline bg-bg text-secondaryText">
              {assetName}
            </span>
          </h3>
        </div>
        <button 
          onClick={onClose}
          className="text-sm font-medium px-3 py-1 rounded-md transition-colors
                     text-secondaryText hover:bg-secondaryBtn hover:text-primaryText"
        >
          {t("history.close")} ✕
        </button>
      </div>

      {movements.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-secondaryText">{t("history.empty")}</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {movements.map((mov) => {
            const isBuy = mov.type === 'Compra';
            const isProfit = mov.realizedPnl >= 0;
            const isSell = !isBuy;

            return (
              <div 
                key={mov.movementId} 
                className="flex flex-col p-5 rounded-lg border border-outline bg-bg transition-all hover:border-secondaryText/30"
              >
                {/* Badge Tipo y Fecha */}
                <div className="flex justify-between items-start mb-4">
                  <span className={cn(
                    "text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 border",
                    isBuy 
                      ? "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400" 
                      : "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400"
                  )}>
                    {isBuy ? `↓ ${t("history.type.buy")}` : `↑ ${t("history.type.sell")}`}
                  </span>
                  <span className="text-[11px] font-mono mt-1 text-secondaryText">
                    {formatDate(mov.date)}
                  </span>
                </div>
                
                {/* Datos Principales */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-medium text-secondaryText">{t("history.price")}</span>
                    <span className="font-mono text-sm text-primaryText">{formatMoney(mov.price)}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-medium text-secondaryText">{t("history.quantity")}</span>
                    <span className="font-mono text-sm font-semibold text-primaryText">{mov.quantity}</span>
                  </div>
                </div>

                <div className="h-px w-full mb-3 border-dashed border-outline"></div>

                {/* Footer */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <span className="text-xs font-medium text-secondaryText">{t("history.totalOperation")}</span>
                        <span className="text-sm font-bold text-primaryText">{formatMoney(mov.totalAmount)}</span>
                    </div>

                    {isSell && (
                        <div className={cn(
                          "mt-2 p-2.5 rounded-lg flex justify-between items-center border",
                          isProfit 
                             ? "bg-green-500/5 border-green-500/20" 
                             : "bg-destructive/5 border-destructive/20"
                        )}>
                            <span className="text-xs font-semibold text-secondaryText">{t("history.pnl")}</span>
                            <div className={cn(
                              "text-sm font-bold flex items-center gap-1",
                              isProfit ? "text-green-600 dark:text-green-400" : "text-destructive"
                            )}>
                                {isProfit ? '↗' : '↘'} {formatMoney(mov.realizedPnl)}
                            </div>
                        </div>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};