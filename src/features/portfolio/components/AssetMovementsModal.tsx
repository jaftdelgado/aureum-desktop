import React, { useMemo } from "react";
import { AssetMovementsList } from "../components/AssetMovementsList";

interface AssetMovementsModalProps {
  selectedAssetId: string;
  portfolio: any[];
  history: any[];
  onClose: () => void;
}

export const AssetMovementsModal: React.FC<AssetMovementsModalProps> = ({
  selectedAssetId,
  portfolio,
  history,
  onClose,
}) => {
  const selectedAsset = useMemo(
    () => portfolio.find((p) => p.assetId === selectedAssetId),
    [portfolio, selectedAssetId]
  );

  const selectedAssetHistory = useMemo(
    () => history.filter((h) => h.assetId === selectedAssetId),
    [history, selectedAssetId]
  );

  if (!selectedAsset)
    return (
      <div className="p-4 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded border border-yellow-500/20">
        Asset no encontrado
      </div>
    );

  return (
    <AssetMovementsList
      assetName={selectedAsset.assetName}
      assetSymbol={selectedAsset.assetSymbol}
      movements={selectedAssetHistory}
      onClose={onClose}
    />
  );
};
