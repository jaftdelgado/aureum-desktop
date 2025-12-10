import { useTranslation } from "react-i18next";
import { useSyncSelectedAssets } from "@features/assets/hooks/useSyncSelectedAssets";
import { useTeamAssets } from "@features/assets/hooks/useTeamAssets";
import { useShowAssets } from "@features/assets/hooks/useShowAssets";
import { TeamAssetCard } from "@features/assets/components/TeamAssetCard";
import { Label } from "@core/ui/Label";

import type { Asset } from "@domain/entities/Asset";

interface TeamAssetsSidebarProps {
  teamId: string;
  isEditMode?: boolean;
  selectedAssets?: Asset[];
  isLoading?: boolean; // <-- agregar
}

export function TeamAssetsSidebar({
  teamId,
  isEditMode,
  selectedAssets,
  isLoading: propIsLoading,
}: TeamAssetsSidebarProps) {
  const { t } = useTranslation("assets");
  const {
    data: teamAssets,
    isLoading: queryIsLoading,
    error,
  } = useTeamAssets(teamId);

  useSyncSelectedAssets(teamAssets, isEditMode);
  const assetsToShow = useShowAssets(teamAssets, selectedAssets, isEditMode);

  const isLoading = propIsLoading ?? queryIsLoading; // prop tiene prioridad

  return (
    <div className="w-full flex flex-col overflow-y-auto">
      <Label variant="subtitle" color="primary" className="ml-page-x">
        {t("teamAssets.title")}
      </Label>

      {error && (
        <div className="text-red-500 mb-2">
          {t("assets:errorLoadingTeamAssets") ||
            "Error al cargar assets del equipo"}
        </div>
      )}

      <div className="flex flex-col shadow-sm rounded-xl">
        {isLoading
          ? [1, 2, 3].map((i) => <TeamAssetCard key={i} isLoading />)
          : assetsToShow.map((asset, index) => {
              const key =
                "teamAssetId" in asset
                  ? asset.teamAssetId
                  : asset.publicId ?? asset.assetId;

              return (
                <TeamAssetCard
                  key={key}
                  asset={asset}
                  onClick={() => console.log("Asset clickeado:", asset)}
                  isFirst={index === 0}
                  isLast={index === assetsToShow.length - 1}
                />
              );
            })}
      </div>

      {!isLoading && assetsToShow.length === 0 && (
        <div className="mt-2">
          {t("assets:noTeamAssets") || "No hay assets asignados"}
        </div>
      )}
    </div>
  );
}
