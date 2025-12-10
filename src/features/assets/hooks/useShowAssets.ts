import { useMemo } from "react";
import type { Asset } from "@domain/entities/Asset";
import type { TeamAsset } from "@domain/entities/TeamAsset";

export function useShowAssets(
  teamAssets: TeamAsset[] | undefined,
  selectedAssets: Asset[] | undefined,
  isEditMode?: boolean
): (TeamAsset | Asset)[] {
  return useMemo(() => {
    if (isEditMode) return selectedAssets ?? [];
    return teamAssets ?? [];
  }, [teamAssets, selectedAssets, isEditMode]);
}
