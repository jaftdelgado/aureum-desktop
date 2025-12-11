<<<<<<< HEAD
import { useState, useEffect } from "react";
import { PageHeader } from "@core/components/PageHeader";
import { Container } from "@core/components/Container";
=======
// src/features/assets/pages/AssetsPage.tsx
import { useState, useEffect } from "react";
import { PageHeader } from "@core/components/PageHeader";
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
import { useTranslation } from "react-i18next";

import { useSelectedTeam } from "@app/hooks/useSelectedTeam";
import { useAssetsFilters } from "../hooks/useAssetsFilters";
import { useDebounce } from "../hooks/useDebounce";
import { useTeamAssets } from "../hooks/useTeamAssets";
import { useAssetsList } from "../hooks/useAssetsList";
import { useSelectedAssetIds } from "../hooks/useSelectedAssetIds";
import { useEditingSelectedAssets } from "../store/useEditingSelectedAssets";
import { useSearchAssets } from "../hooks/useSearchAssets";

<<<<<<< HEAD
=======
// Componentes
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
import { EditModeToggle } from "../components/EditModeToggle";
import { AssetsTable } from "../components/AssetsTable";
import { TeamAssetsSidebar } from "../components/TeamAssetsSidebar";

<<<<<<< HEAD
=======
// Hook de sincronización
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
import { useSyncTeamAssets } from "../hooks/useSyncTeamAssets";

export default function AssetsPage() {
  const { t } = useTranslation("assets");
  const { selectedTeam } = useSelectedTeam();
  const teamPublicId = selectedTeam?.publicId ?? "";

  const [isEditMode, setIsEditMode] = useState(false);
  const { page, perPage, setPage, setSearch } = useAssetsFilters();
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 400);

<<<<<<< HEAD
  const [isSavingChanges, setIsSavingChanges] = useState(false);

  const teamAssetsQuery = useTeamAssets(teamPublicId);
  const { data: teamAssets, isLoading: isLoadingTeamAssets } = teamAssetsQuery;

  const selectedAssetIds = useSelectedAssetIds(teamAssets);

=======
  // Estado de carga al guardar cambios
  const [isSavingChanges, setIsSavingChanges] = useState(false);

  // Team assets
  const teamAssetsQuery = useTeamAssets(teamPublicId);
  const { data: teamAssets, isLoading: isLoadingTeamAssets } = teamAssetsQuery;

  // Selected Asset IDs
  const selectedAssetIds = useSelectedAssetIds(teamAssets);

  // Lista completa de assets
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  const assetsListQuery = useAssetsList(selectedAssetIds, {
    enabled: !!teamAssets && !isLoadingTeamAssets,
  });
  const { data, isLoading, error } = assetsListQuery;

<<<<<<< HEAD
  const { editingSelectedAssets, setEditingSelectedAssets } =
    useEditingSelectedAssets();

  const syncTeamAssetsMutation = useSyncTeamAssets();

=======
  // Assets en edición
  const { editingSelectedAssets, setEditingSelectedAssets } =
    useEditingSelectedAssets();

  // Hook de sincronización
  const syncTeamAssetsMutation = useSyncTeamAssets();

  // Inicializar selección al entrar en modo edición
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
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

<<<<<<< HEAD
=======
  // Búsqueda con debounce
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  useSearchAssets(debouncedInput, setSearch, setPage);

  const handleSetEditMode = (value: boolean) => {
    if (!value) setEditingSelectedAssets([]);
    setIsEditMode(value);
  };

  const handleSave = async () => {
    if (!selectedTeam) return;
<<<<<<< HEAD
    try {
      setIsSavingChanges(true);
=======

    try {
      // 1️⃣ Inicia animación de guardado
      setIsSavingChanges(true);

      // 2️⃣ Guardar cambios en la API
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
      await syncTeamAssetsMutation.mutateAsync({
        teamId: selectedTeam.publicId,
        selectedAssetIds: editingSelectedAssets.map((a) => a.publicId!),
      });
<<<<<<< HEAD
      const { data: freshTeamAssets } = await teamAssetsQuery.refetch();
      const newSelectedAssetIds =
        freshTeamAssets?.map((ta) => ta.assetId) ?? [];
=======

      // 3️⃣ Refrescar los TeamAssets
      const { data: freshTeamAssets } = await teamAssetsQuery.refetch();

      // 4️⃣ Reconstruir el array de selectedAssetIds
      const newSelectedAssetIds =
        freshTeamAssets?.map((ta) => ta.assetId) ?? [];

      // 5️⃣ Limpiar edición y actualizar selección
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
      setEditingSelectedAssets([]);
      selectedAssetIds.splice(
        0,
        selectedAssetIds.length,
        ...newSelectedAssetIds
      );
<<<<<<< HEAD
      await assetsListQuery.refetch();
=======

      // 6️⃣ Refrescar los assets filtrados según la nueva selección
      await assetsListQuery.refetch();

      // 7️⃣ Salir del modo edición
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
      setIsEditMode(false);
    } catch (err) {
      console.error("Error al guardar cambios:", err);
    } finally {
      setIsSavingChanges(false);
    }
  };
<<<<<<< HEAD

  const hasChanges =
    editingSelectedAssets.length !== selectedAssetIds.length ||
    editingSelectedAssets.some(
      (asset) => !selectedAssetIds.includes(asset.publicId!)
    );
=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d

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
<<<<<<< HEAD
            disabled={!hasChanges}
=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
          />
        }
      />

      {error && (
        <div className="text-red-500 mb-3 px-4 py-2 bg-red-100 rounded">
          {t("assets:errorLoadingAssets") || "Error al cargar los assets"}
        </div>
      )}

<<<<<<< HEAD
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
=======
      <div className="flex flex-1 w-full flex-col md:flex-row min-h-0">
        <div className="w-full md:w-[30%] border-r border-outline">
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
        </div>

        <div className="w-full md:w-[70%] flex flex-col h-full min-h-0">
          <div className="flex-1 overflow-x-hidden">
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
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
<<<<<<< HEAD
          </Container>
=======
          </div>
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
        </div>
      </div>
    </div>
  );
}
