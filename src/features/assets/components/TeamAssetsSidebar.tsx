// src/features/assets/components/TeamAssetsSidebar.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useTeamAssets } from "../hooks/useTeamAssets";
import { useSelectedAssets } from "../store/useSelectedAssets";
import { TeamAssetCard } from "./TeamAssetCard";

interface TeamAssetsSidebarProps {
  teamId: string;
}

export function TeamAssetsSidebar({ teamId }: TeamAssetsSidebarProps) {
  const { t } = useTranslation("assets");
  const { setSelectedAssetIds } = useSelectedAssets();
  const { data: teamAssets, isLoading, error } = useTeamAssets(teamId);

  React.useEffect(() => {
    if (teamAssets?.length) {
      const ids = teamAssets.map((ta) => ta.assetId).filter(Boolean);
      setSelectedAssetIds(ids as string[]);
    }
  }, [teamAssets, setSelectedAssetIds]);

  return (
    <div className="w-full flex flex-col overflow-y-auto">
      <h3 className="text-lg font-semibold mb-2">
        {t("assets:teamAssets") || "Team Assets"}
      </h3>

      {error && (
        <div className="text-red-500 mb-2">
          {t("assets:errorLoadingTeamAssets") ||
            "Error al cargar assets del equipo"}
        </div>
      )}

      <div className="flex flex-col shadow-sm rounded-xl">
        {isLoading
          ? [1, 2, 3].map((i) => <TeamAssetCard key={i} isLoading />)
          : teamAssets?.map((asset, index) => (
              <TeamAssetCard
                key={asset.teamAssetId}
                asset={asset}
                onClick={(a) => console.log("Asset clickeado:", a)}
                isFirst={index === 0}
                isLast={index === (teamAssets?.length ?? 1) - 1}
              />
            ))}
      </div>

      {!isLoading && teamAssets?.length === 0 && (
        <div className="mt-2">
          {t("assets:noTeamAssets") || "No hay assets asignados"}
        </div>
      )}
    </div>
  );
}
