import React, { useState, useMemo, useEffect } from "react";
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

// IMPORTS NECESARIOS PARA EL TIEMPO REAL
import { MarketApiRepository } from "@infra/api/market/MarketApiRepository";
import { SubscribeToMarketUseCase } from "@domain/use-cases/market/SubscribeToMarketUseCase";

// Instancias para conectar al stream
const marketRepository = new MarketApiRepository();
const subscribeToMarketUseCase = new SubscribeToMarketUseCase(marketRepository);

const PortfolioPage: React.FC = () => {
  const { t } = useTranslation("portfolio");
  const { user } = useAuth();
  const { selectedTeam } = useSelectedTeam();

  const { portfolio, history, isLoading } = usePortfolioData(selectedTeam?.publicId, user?.id);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  // ESTADO PARA PRECIOS EN VIVO
  const [livePrices, setLivePrices] = useState<Record<string, number>>({});

  // EFECTO: Suscribirse al stream del mercado cuando entramos a esta página
  useEffect(() => {
    if (!selectedTeam?.publicId) return;

    const unsubscribe = subscribeToMarketUseCase.execute(selectedTeam.publicId, {
      onData: (snapshot) => {
        // Actualizamos el diccionario de precios: { "guid-asset": 150.20, ... }
        setLivePrices((prev) => {
          const next = { ...prev };
          snapshot.assets.forEach((asset) => {
            next[asset.id] = asset.price;
          });
          return next;
        });
      },
      onError: (err) => console.error("Error en stream de portafolio", err),
    });

    return () => {
      unsubscribe();
    };
  }, [selectedTeam?.publicId]);

  // MEMO: Fusionar datos estáticos del portafolio con precios en vivo
  const myPortfolio = useMemo(() => {
    if (!user?.id || !portfolio) return [];

    // 1. Filtramos los items del usuario actual
    const userItems = portfolio.filter(p => 
       String(p.userId).toLowerCase() === String(user.id).toLowerCase()
    );

    // 2. Recalculamos PnL con el precio en vivo si existe
    return userItems.map(item => {
      const livePrice = livePrices[item.assetId]; // Buscamos si hay precio nuevo

      // Si no hay precio en vivo (todavía no llega el stream), usamos el de la BD (item.currentValue)
      const currentPrice = livePrice !== undefined ? livePrice : item.currentValue;

      // Cálculos financieros
      const currentTotalValue = item.quantity * currentPrice;
      const investedTotal = item.quantity * item.avgPrice;
      const pnl = currentTotalValue - investedTotal;
      
      // Evitar división por cero
      const pnlPercent = investedTotal !== 0 
        ? (pnl / investedTotal) * 100 
        : 0;

      return {
        ...item,
        currentValue: currentPrice, // Actualizamos el precio unitario visual
        currentTotalValue: currentTotalValue, // Actualizamos el total visual
        profitOrLoss: pnl,
        profitOrLossPercentage: pnlPercent
      };
    });

  }, [portfolio, user, livePrices]); // Se recalcula cada vez que 'livePrices' cambia

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

      {/* Gráfica PnL (Ahora se moverá en tiempo real gracias a myPortfolio) */}
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
                  {/* Aquí se mostrará el precio en vivo con un efecto de actualización */}
                  <TableCell className="text-right font-semibold animate-pulse-once">
                    ${item.currentValue.toFixed(2)}
                  </TableCell>
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