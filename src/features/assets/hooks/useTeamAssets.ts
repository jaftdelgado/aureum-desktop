<<<<<<< HEAD
=======
// src/features/team-assets/hooks/useTeamAssets.ts
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
import { useQuery } from "@tanstack/react-query";
import { TeamAssetApiRepository } from "@infra/api/team-assets/TeamAssetApiRepository";
import { GetTeamAssetsUseCase } from "@domain/use-cases/team-assets/GetTeamAssetsUseCase";
import type { TeamAsset } from "@domain/entities/TeamAsset";

const teamAssetRepository = new TeamAssetApiRepository();
const getTeamAssetsUseCase = new GetTeamAssetsUseCase(teamAssetRepository);

export const useTeamAssets = (teamId: string) => {
  return useQuery<TeamAsset[], Error>({
    queryKey: ["team-assets", teamId],
    queryFn: async () => {
      if (!teamId) return [];

      try {
        const assets = await getTeamAssetsUseCase.execute(teamId);
        return assets;
      } catch (err: any) {
        console.error("Error fetching team assets:", err);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};
