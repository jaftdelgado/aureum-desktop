// src/infra/api/team-assets/TeamAssetApiRepository.ts
import { client } from "@infra/api/http/client";
import type { TeamAssetRepository } from "@domain/repositories/TeamAssetRepository";
import type { TeamAsset } from "@domain/entities/TeamAsset";
import type { TeamAssetDTO } from "@infra/api/team-assets/teamAsset.dto";
import { mapTeamAssetDTOToEntity } from "@infra/api/team-assets/teamAsset.mappers";

export class TeamAssetApiRepository implements TeamAssetRepository {
  async findAllByTeamId(teamId: string): Promise<TeamAsset[]> {
    const response = await client.get<TeamAssetDTO[]>(
      `/api/team-assets/team/${teamId}`
    );
    return response.map(mapTeamAssetDTOToEntity);
  }

  async syncTeamAssets(
    teamId: string,
    selectedAssetIds: string[]
  ): Promise<TeamAsset[]> {
    const response = await client.put<TeamAssetDTO[]>(
      `/api/team-assets/team/${teamId}/sync`,
      { selectedAssetIds }
    );
    return response.map(mapTeamAssetDTOToEntity);
  }
}
