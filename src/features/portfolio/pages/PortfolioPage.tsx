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

const PortfolioPage: React.FC = () => {
  const { t } = useTranslation("portfolio");
  const { user } = useAuth();
  const { selectedTeam } = useSelectedTeam();

  const { portfolio, history, isLoading } = usePortfolioData(selectedTeam?.publicId, user?.id);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);

  // 1. FILTRADO CRÍTICO: Solo mostramos activos que pertenecen al usuario logueado
  const myPortfolio = useMemo(() => {
    if (!user?.id || !portfolio) return [];
    
    // Debug: Ver qué llega del backend
    console.log("Datos crudos Portfolio:", portfolio);
    console.log("Datos crudos History:", history);
    console.log("Mi User ID:", user.id);

    return portfolio.filter(p => {
       // Normalizamos a string y minúsculas por seguridad
       return String(p.userId).toLowerCase() === String(user.id).toLowerCase();
    });
  }, [portfolio, user]);

  // 2. Encontrar el activo seleccionado (usando lowercase)
  const selectedAsset = useMemo(() => {
    return myPortfolio.find(p => 
      String(p.assetId).toLowerCase() === String(selectedAssetId).toLowerCase()
    );
  }, [myPortfolio, selectedAssetId]);

  // 3. Filtrar historial para el activo seleccionado (usando lowercase)
  const selectedAssetHistory = useMemo(() => {
    if (!selectedAssetId) return [];
    return history.filter(h => 
      String(h.assetId).toLowerCase() === String(selectedAssetId).toLowerCase()
    );
  }, [history, selectedAssetId]);

  if (!selectedTeam) return <div className="p-8">Selecciona un equipo.</div>;

  return (
    <div className="space-y-6 pb-10">
      <PageHeader 
        title={`${t("title") || "Portafolio"} - ${selectedTeam.name}`} 
        description="Gestiona tus inversiones y analiza tu rendimiento." 
      />

      {/* Gráfica PnL Mejorada */}
      {!isLoading && myPortfolio.length > 0 && (
        <PortfolioPnLChart data={myPortfolio} />
      )}

      {/* TABLA DE ACTIVOS */}
      <div className="rounded-md border border-border bg-surface-1">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-text-primary">Mis Activos</h3>
          <p className="text-sm text-text-secondary">Haz clic en un activo para ver sus movimientos</p>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Símbolo</TableHead>
              <TableHead>Activo</TableHead>
              <TableHead className="text-right">Cantidad</TableHead>
              <TableHead className="text-right">Promedio</TableHead>
              <TableHead className="text-right">Valor Actual</TableHead>
              <TableHead className="text-right">P/L ($)</TableHead>
              <TableHead className="text-right">P/L (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8">Cargando portafolio...</TableCell></TableRow>
            ) : myPortfolio.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="text-center py-8">
                {portfolio.length > 0 
                  ? "No tienes activos" 
                  : "No tienes activos en este curso."}
              </TableCell></TableRow>
            ) : (
              myPortfolio.map((item) => (
                <TableRow 
                  key={item.portfolioId}
                  onClick={() => setSelectedAssetId(item.assetId === selectedAssetId ? null : item.assetId)}
                  className={`cursor-pointer transition-colors ${
                    selectedAssetId === item.assetId ? 'bg-primaryBtn/10 border-l-2 border-primaryBtn' : 'hover:bg-muted/50'
                  }`}
                >
                  <TableCell className="font-bold text-primaryBtn">{item.assetSymbol}</TableCell>
                  <TableCell>{item.assetName}</TableCell>
                  <TableCell className="text-right font-mono">{item.quantity.toFixed(4)}</TableCell>
                  <TableCell className="text-right text-text-secondary">${item.avgPrice.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-semibold">${item.currentValue.toFixed(2)}</TableCell>
                  <TableCell className={`text-right font-medium ${item.profitOrLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {item.profitOrLoss >= 0 ? '+' : ''}{item.profitOrLoss.toFixed(2)}
                  </TableCell>
                  <TableCell className={`text-right ${item.profitOrLossPercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
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
            <div className="p-4 bg-yellow-500/10 text-yellow-500 rounded border border-yellow-500/20">
              No se encontró la información del activo seleccionado.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;