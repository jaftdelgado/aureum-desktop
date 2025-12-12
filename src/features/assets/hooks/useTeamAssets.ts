import { useQuery } from "@tanstack/react-query";
import { TeamAssetApiRepository } from "@infra/api/team-assets/TeamAssetApiRepository";
import { GetTeamAssetsUseCase } from "@domain/use-cases/team-assets/GetTeamAssetsUseCase";
import type { TeamAsset } from "@domain/entities/TeamAsset";

const teamAssetRepository = new TeamAssetApiRepository();
const getTeamAssetsUseCase = new GetTeamAssetsUseCase(teamAssetRepository);

export const useTeamAssets = (teamId: string) => {
  return useQuery<TeamAsset[], Error>({
    queryKey: ["team-assets", teamId],
    queryFn: async () => getTeamAssetsUseCase.execute(teamId),
    enabled: !!teamId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
