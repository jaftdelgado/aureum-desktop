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
  isLoading?: boolean;
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

  const isLoading = propIsLoading || queryIsLoading;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full sticky top-0 z-20 border-b border-outline">
        <div className="flex items-center px-component-x py-component-y">
          <Label variant="subtitle" color="primary">
            {t("teamAssets.title")}
          </Label>
        </div>
        {error && (
          <div className="text-red-500 px-component-x py-2">
            {t("assets:errorLoadingTeamAssets") ||
              "Error al cargar assets del equipo"}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-component-x flex flex-col scroll-container">
        {isLoading
          ? Array.from({ length: 10 }, (_, i) => (
              <TeamAssetCard key={i} isLoading />
            ))
          : assetsToShow.map((asset, index) => {
              const key =
                "teamAssetId" in asset ? asset.teamAssetId : asset.publicId;
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

        {!isLoading && assetsToShow.length === 0 && (
          <div>{t("assets:noTeamAssets")}</div>
        )}
      </div>
    </div>
  );
}
