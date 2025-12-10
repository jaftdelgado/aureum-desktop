import { useState, useEffect } from "react";
import { PageHeader } from "@core/components/PageHeader";
import { Container } from "@core/components/Container";
import { useTranslation } from "react-i18next";

import { useSelectedTeam } from "@app/hooks/useSelectedTeam";
import { useAssetsFilters } from "../hooks/useAssetsFilters";
import { useDebounce } from "../hooks/useDebounce";
import { useTeamAssets } from "../hooks/useTeamAssets";
import { useAssetsList } from "../hooks/useAssetsList";
import { useSelectedAssetIds } from "../hooks/useSelectedAssetIds";
import { useEditingSelectedAssets } from "../store/useEditingSelectedAssets";
import { useSearchAssets } from "../hooks/useSearchAssets";

import { EditModeToggle } from "../components/EditModeToggle";
import { AssetsTable } from "../components/AssetsTable";
import { TeamAssetsSidebar } from "../components/TeamAssetsSidebar";

import { useSyncTeamAssets } from "../hooks/useSyncTeamAssets";

export default function AssetsPage() {
  const { t } = useTranslation("assets");
  const { selectedTeam } = useSelectedTeam();
  const teamPublicId = selectedTeam?.publicId ?? "";

  const [isEditMode, setIsEditMode] = useState(false);
  const { page, perPage, setPage, setSearch } = useAssetsFilters();
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 400);

  const [isSavingChanges, setIsSavingChanges] = useState(false);

  const teamAssetsQuery = useTeamAssets(teamPublicId);
  const { data: teamAssets, isLoading: isLoadingTeamAssets } = teamAssetsQuery;

  const selectedAssetIds = useSelectedAssetIds(teamAssets);

  const assetsListQuery = useAssetsList(selectedAssetIds, {
    enabled: !!teamAssets && !isLoadingTeamAssets,
  });
  const { data, isLoading, error } = assetsListQuery;

  const { editingSelectedAssets, setEditingSelectedAssets } =
    useEditingSelectedAssets();

  const syncTeamAssetsMutation = useSyncTeamAssets();

  useEffect(() => {
    if (isEditMode && data?.data && editingSelectedAssets.length === 0) {
      const initial = data.data.filter((a) =>
        selectedAssetIds.includes(a.publicId ?? "")
      );
      setEditingSelectedAssets(initial);
    }
  }, [
    isEditMode,
    data,
    selectedAssetIds,
    editingSelectedAssets,
    setEditingSelectedAssets,
  ]);

  useSearchAssets(debouncedInput, setSearch, setPage);

  const handleSetEditMode = (value: boolean) => {
    if (!value) setEditingSelectedAssets([]);
    setIsEditMode(value);
  };

  const handleSave = async () => {
    if (!selectedTeam) return;
    try {
      setIsSavingChanges(true);
      await syncTeamAssetsMutation.mutateAsync({
        teamId: selectedTeam.publicId,
        selectedAssetIds: editingSelectedAssets.map((a) => a.publicId!),
      });
      const { data: freshTeamAssets } = await teamAssetsQuery.refetch();
      const newSelectedAssetIds =
        freshTeamAssets?.map((ta) => ta.assetId) ?? [];
      setEditingSelectedAssets([]);
      selectedAssetIds.splice(
        0,
        selectedAssetIds.length,
        ...newSelectedAssetIds
      );
      await assetsListQuery.refetch();
      setIsEditMode(false);
    } catch (err) {
      console.error("Error al guardar cambios:", err);
    } finally {
      setIsSavingChanges(false);
    }
  };

  const hasChanges =
    editingSelectedAssets.length !== selectedAssetIds.length ||
    editingSelectedAssets.some(
      (asset) => !selectedAssetIds.includes(asset.publicId!)
    );

  return (
    <div className="w-full h-full flex flex-col min-h-0">
      <PageHeader
        title={t("title")}
        description={t("description")}
        actions={
          <EditModeToggle
            isEditMode={isEditMode}
            setIsEditMode={handleSetEditMode}
            onSave={handleSave}
            isSaving={syncTeamAssetsMutation.isPending || isSavingChanges}
            disabled={!hasChanges}
          />
        }
      />

      {error && (
        <div className="text-red-500 mb-3 px-4 py-2 bg-red-100 rounded">
          {t("assets:errorLoadingAssets") || "Error al cargar los assets"}
        </div>
      )}

      <div className="flex flex-1 w-full min-h-0 px-page-x py-page-y gap-3">
        <div className="w-full md:w-[30%] flex flex-col">
          <Container className="h-full">
            <TeamAssetsSidebar
              teamId={teamPublicId}
              isEditMode={isEditMode}
              selectedAssets={isEditMode ? editingSelectedAssets : undefined}
              isLoading={
                isLoadingTeamAssets ||
                syncTeamAssetsMutation.isPending ||
                isSavingChanges
              }
            />
          </Container>
        </div>

        <div className="w-full md:w-[70%] flex flex-col">
          <Container className="h-full flex flex-col">
            <AssetsTable
              data={data?.data}
              loading={
                isLoading ||
                isLoadingTeamAssets ||
                syncTeamAssetsMutation.isPending ||
                isSavingChanges
              }
              page={page}
              perPage={perPage}
              total={data?.meta.totalItems ?? 0}
              onPageChange={setPage}
              onQueryChange={setInput}
              isEditMode={isEditMode}
            />
          </Container>
        </div>
      </div>
    </div>
  );
}
