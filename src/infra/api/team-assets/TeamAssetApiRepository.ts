<<<<<<< HEAD
=======
// src/infra/api/team-assets/TeamAssetApiRepository.ts
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
import { client } from "@infra/api/http/client";
import type { TeamAssetRepository } from "@domain/repositories/TeamAssetRepository";
import type { TeamAsset } from "@domain/entities/TeamAsset";
import type { TeamAssetDTO } from "@infra/api/team-assets/teamAsset.dto";
import { mapTeamAssetDTOToEntity } from "@infra/api/team-assets/teamAsset.mappers";

export class TeamAssetApiRepository implements TeamAssetRepository {
  async findAllByTeamId(teamId: string): Promise<TeamAsset[]> {
<<<<<<< HEAD
    const response: TeamAssetDTO[] = await client.get(
=======
    const response = await client.get<TeamAssetDTO[]>(
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
      `/api/team-assets/team/${teamId}`
    );
    return response.map(mapTeamAssetDTOToEntity);
  }

  async syncTeamAssets(
    teamId: string,
    selectedAssetIds: string[]
  ): Promise<TeamAsset[]> {
<<<<<<< HEAD
    const response: TeamAssetDTO[] = await client.post(
      `/api/team-assets/sync`,
      {
        teamId,
        selectedAssetIds,
      }
=======
    const response = await client.post<TeamAssetDTO[]>(
      `/api/team-assets/sync`,
      { teamId, selectedAssetIds }
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
    );
    return response.map(mapTeamAssetDTOToEntity);
  }
}
