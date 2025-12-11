<<<<<<< HEAD
=======
// src/features/assets/hooks/useSyncTeamAssets.ts
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamAssetApiRepository } from "@infra/api/team-assets/TeamAssetApiRepository";
import { SyncTeamAssetsUseCase } from "@domain/use-cases/team-assets/SyncTeamAssetsUseCase";
import type { TeamAsset } from "@domain/entities/TeamAsset";

const teamAssetRepository = new TeamAssetApiRepository();
const syncTeamAssetsUseCase = new SyncTeamAssetsUseCase(teamAssetRepository);

interface SyncTeamAssetsParams {
  teamId: string;
  selectedAssetIds: string[];
}

export const useSyncTeamAssets = () => {
  const queryClient = useQueryClient();

  return useMutation<TeamAsset[], Error, SyncTeamAssetsParams>({
    mutationFn: async (params: SyncTeamAssetsParams) => {
      const { teamId, selectedAssetIds } = params;
      return syncTeamAssetsUseCase.execute(teamId, selectedAssetIds);
    },
    onSuccess: (_data: TeamAsset[], variables: SyncTeamAssetsParams) => {
      queryClient.invalidateQueries({
        queryKey: ["team-assets", variables.teamId],
      });
    },
    onError: (error: Error) => {
      console.error("Error sincronizando assets:", error.message);
    },
  });
};
