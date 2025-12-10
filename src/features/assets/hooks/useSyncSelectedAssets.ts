import { useEffect } from "react";
import type { TeamAsset } from "@domain/entities/TeamAsset";
import { useSelectedAssets } from "@features/assets/store/useSelectedAssets";

export function useSyncSelectedAssets(
  teamAssets: TeamAsset[] | undefined,
  isEditMode?: boolean
) {
  const { selectedAssetIds, setSelectedAssetIds } = useSelectedAssets();

  useEffect(() => {
    if (isEditMode) return;

    if (teamAssets?.length) {
      const ids = teamAssets
        .map((ta) => ta.assetId)
        .filter(Boolean) as string[];
      const hasChanged =
        ids.length !== selectedAssetIds.length ||
        !ids.every((id) => selectedAssetIds.includes(id));

      if (hasChanged) setSelectedAssetIds(ids);
    } else if (selectedAssetIds.length > 0) {
      setSelectedAssetIds([]);
    }
  }, [teamAssets, isEditMode, selectedAssetIds, setSelectedAssetIds]);
}
