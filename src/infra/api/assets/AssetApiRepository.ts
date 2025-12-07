// src/infra/api/assets/AssetApiRepository.ts
import { client } from "@infra/api/http/client";
import type { AssetRepository } from "@domain/repositories/AssetRepository";
import type {
  AssetDTO,
  PaginatedResultDTO,
  GetAssetsQueryDTO,
} from "@infra/api/assets/asset.dto";
import {
  mapAssetDTOToEntity,
  mapPaginatedAssetsDTOToEntity,
} from "@infra/api/assets/asset.mappers";
import type { Asset } from "@domain/entities/Asset";

export class AssetApiRepository implements AssetRepository {
  async getAssets(query: GetAssetsQueryDTO): Promise<{
    data: Asset[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  }> {
    const params: Record<string, string> = Object.fromEntries(
      Object.entries(query)
        .filter(([_, v]) => v !== undefined && v !== null)
        .map(([k, v]) => [k, String(v)])
    );

    const response = await client.get<PaginatedResultDTO<AssetDTO>>(
      "/api/assets",
      params
    );

    return mapPaginatedAssetsDTOToEntity(response);
  }

  async getAssetById(id: number): Promise<Asset> {
    const response = await client.get<AssetDTO>(`/api/assets/${id}`);
    return mapAssetDTOToEntity(response);
  }
}
