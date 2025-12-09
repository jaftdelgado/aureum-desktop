// src/features/assets/pages/AssetsPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@core/components/PageHeader";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";
import { useSelectedTeam } from "@app/hooks/useSelectedTeam";
import { useAssetsFilters } from "../hooks/useAssetsFilters";
import { useDebounce } from "../hooks/useDebounce";
import { useTeamAssets } from "../hooks/useTeamAssets";
import { useAssetsList } from "../hooks/useAssetsList";
import { AssetsTable } from "../components/AssetsTable";
import { TeamAssetsSidebar } from "../components/TeamAssetsSidebar";
import type { TeamAsset } from "@domain/entities/TeamAsset";

export default function AssetsPage() {
  const { t } = useTranslation("assets");
  const { selectedTeam } = useSelectedTeam();
  const teamPublicId = selectedTeam?.publicId ?? "";

  const navigate = useNavigate();

  const { page, perPage, setPage, setSearch } = useAssetsFilters();
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 400);

  useEffect(() => {
    if (debouncedInput.length >= 2 || debouncedInput.length === 0) {
      setSearch(debouncedInput);
      setPage(1);
    }
  }, [debouncedInput, setSearch, setPage]);

  const { data: teamAssets, isLoading: isLoadingTeamAssets } =
    useTeamAssets(teamPublicId);

  const selectedAssetIds =
    teamAssets
      ?.map((a: TeamAsset) => a.asset.publicId)
      .filter((id): id is string => !!id) ?? [];

  const { data, isLoading, error } = useAssetsList(selectedAssetIds, {
    enabled: !!teamAssets && !isLoadingTeamAssets,
  });

  return (
    <div className="w-full h-full flex flex-col min-h-0">
      {/* HEADER */}
      <PageHeader
        title={t("title")}
        description={t("description")}
        actions={
          <Button
            variant="default"
            icon="lucide:plus"
            className="px-4 py-2"
            onClick={() => navigate("/dashboard/assets/register")}
          >
            {t("assets:newAsset") || "Nuevo Asset"}
          </Button>
        }
      />

      {error && (
        <div className="text-red-500 mb-3 px-4 py-2 bg-red-100 rounded">
          {t("assets:errorLoadingAssets") || "Error al cargar los assets"}
        </div>
      )}

      <div className="flex flex-1 w-full flex-col md:flex-row min-h-0">
        <div className="w-full md:w-[30%] border-r border-outline">
          <TeamAssetsSidebar teamId={teamPublicId} />
        </div>

        <div className="w-full md:w-[70%] flex flex-col h-full min-h-0">
          <div className="flex-1 overflow-x-hidden">
            <AssetsTable
              data={data?.data}
              loading={isLoading || isLoadingTeamAssets}
              page={page}
              perPage={perPage}
              total={data?.meta.totalItems ?? 0}
              onPageChange={setPage}
              onQueryChange={setInput}
              onRowClick={(row) => console.log("Fila clickeada:", row)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
