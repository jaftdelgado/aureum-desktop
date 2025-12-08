import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { PageHeader } from "@core/components/PageHeader";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@core/components/Table";
import { useAuth } from "@app/hooks/useAuth";
import { useSelectedTeam } from "@app/hooks/useSelectedTeam";
import { usePortfolioData } from "../hooks/usePortfolioQueries";
import { PortfolioPnLChart } from "../components/PortfolioPnLChart";
import { AssetMovementsList } from "../components/AssetMovementsList";
import { cn } from "@core/utils/cn";

const PortfolioPage: React.FC = () => {
  // Inicializamos el hook apuntando al namespace "portfolio"
  const { t } = useTranslation("portfolio");
  const { user } = useAuth();
  const { selectedTeam } = useSelectedTeam();

  const { portfolio, history, isLoading } = usePortfolioData(selectedTeam?.publicId, user?.id);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  const myPortfolio = useMemo(() => {
    if (!user?.id || !portfolio) return [];
    return portfolio.filter(p => {
       return String(p.userId).toLowerCase() === String(user.id).toLowerCase();
    });
  }, [portfolio, user]);

  const selectedAsset = useMemo(() => {
    return myPortfolio.find(p => 
      String(p.assetId).toLowerCase() === String(selectedAssetId).toLowerCase()
    );
  }, [myPortfolio, selectedAssetId]);

  const selectedAssetHistory = useMemo(() => {
    if (!selectedAssetId) return [];
    return history.filter(h => 
      String(h.assetId).toLowerCase() === String(selectedAssetId).toLowerCase()
    );
  }, [history, selectedAssetId]);

  if (!selectedTeam) return <div className="p-8 text-primaryText">{t("selectTeam")}</div>;

  return (
    <div className="space-y-6 pb-10">
      <PageHeader 
        title={`${t("title")} - ${selectedTeam.name}`} 
        description={t("description")} 
      />

      {/* Gráfica PnL */}
      {!isLoading && myPortfolio.length > 0 && (
        <PortfolioPnLChart data={myPortfolio} />
      )}

      {/* TABLA DE ACTIVOS */}
      <div className="rounded-md border border-outline bg-card">
        <div className="p-4 border-b border-outline">
          <h3 className="font-semibold text-primaryText">{t("myAssets.title")}</h3>
          <p className="text-sm text-secondaryText">{t("myAssets.subtitle")}</p>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-outline">
              <TableHead className="text-secondaryText">{t("table.symbol")}</TableHead>
              <TableHead className="text-secondaryText">{t("table.asset")}</TableHead>
              <TableHead className="text-right text-secondaryText">{t("table.quantity")}</TableHead>
              <TableHead className="text-right text-secondaryText">{t("table.average")}</TableHead>
              <TableHead className="text-right text-secondaryText">{t("table.currentValue")}</TableHead>
              <TableHead className="text-right text-secondaryText">{t("table.pnlCurrency")}</TableHead>
              <TableHead className="text-right text-secondaryText">{t("table.pnlPercent")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-secondaryText">{t("loading")}</TableCell></TableRow>
            ) : myPortfolio.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8 text-secondaryText">
                {portfolio.length > 0 
                  ? t("empty.withTeam") 
                  : t("empty.generic")}
              </TableCell></TableRow>
            ) : (
              myPortfolio.map((item) => (
                <TableRow 
                  key={item.portfolioId}
                  onClick={() => setSelectedAssetId(item.assetId === selectedAssetId ? null : item.assetId)}
                  className={cn(
                    "cursor-pointer transition-colors border-outline text-primaryText",
                    selectedAssetId === item.assetId 
                      ? "bg-primaryBtn/10 border-l-2 border-l-primaryBtn" 
                      : "hover:bg-secondaryBtn"
                  )}
                >
                  <TableCell className="font-bold text-primaryText">{item.assetSymbol}</TableCell>
                  <TableCell>{item.assetName}</TableCell>
                  <TableCell className="text-right font-mono">{item.quantity.toFixed(4)}</TableCell>
                  <TableCell className="text-right text-secondaryText">${item.avgPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-semibold">${item.currentValue.toFixed(2)}</TableCell>
                  <TableCell className={`text-right font-medium ${item.profitOrLoss >= 0 ? 'text-green-500' : 'text-destructive'}`}>
                    {item.profitOrLoss >= 0 ? '+' : ''}{item.profitOrLoss.toFixed(2)}
                  </TableCell>
                  <TableCell className={`text-right ${item.profitOrLossPercentage >= 0 ? 'text-green-500' : 'text-destructive'}`}>
                    {item.profitOrLossPercentage.toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* SECCIÓN DE DETALLE DE MOVIMIENTOS */}
      {selectedAssetId && (
        <div className="mt-4">
          {selectedAsset ? (
             <AssetMovementsList 
               assetName={selectedAsset.assetName}
               assetSymbol={selectedAsset.assetSymbol}
               movements={selectedAssetHistory}
               onClose={() => setSelectedAssetId(null)}
             />
          ) : (
            <div className="p-4 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded border border-yellow-500/20">
              {t("assetNotFound")}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;