import { useMemo } from "react";
import type { TeamAsset } from "@domain/entities/TeamAsset";

export function useSelectedAssetIds(teamAssets: TeamAsset[] | undefined) {
  return useMemo(
    () =>
      teamAssets
        ?.map((a) => a.asset.publicId)
        .filter((id): id is string => !!id) ?? [],
    [teamAssets]
  );
}
