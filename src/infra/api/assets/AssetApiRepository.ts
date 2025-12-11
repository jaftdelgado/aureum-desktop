<<<<<<< HEAD
=======
// src/infra/api/assets/AssetApiRepository.ts
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
import { client } from "@infra/api/http/client";
import type { AssetRepository } from "@domain/repositories/AssetRepository";
import type {
  AssetDTO,
  PaginatedResultDTO,
  GetAssetsQueryDTO,
} from "@infra/api/assets/asset.dto";
import {
<<<<<<< HEAD
  mapPaginatedAssetsDTOToEntity,
  mapAssetDTOToEntity,
} from "./asset.mappers";
=======
  mapAssetDTOToEntity,
  mapPaginatedAssetsDTOToEntity,
} from "@infra/api/assets/asset.mappers";
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
import type { Asset } from "@domain/entities/Asset";

export class AssetApiRepository implements AssetRepository {
  async getAssets(
    query: GetAssetsQueryDTO,
    selectedAssetIds: string[] = []
<<<<<<< HEAD
  ): Promise<{ data: Asset[]; meta: PaginatedResultDTO<AssetDTO>["meta"] }> {
    const params: Record<string, string | string[]> = Object.fromEntries(
      Object.entries(query)
        .filter(([_, v]) => v != null)
        .map(([k, v]) => [k, Array.isArray(v) ? v.map(String) : String(v)])
=======
  ): Promise<{
    data: Asset[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  }> {
    const params: Record<string, string | string[]> = Object.fromEntries(
      Object.entries(query).filter(([_, v]) => v != null)
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
    );

    if (selectedAssetIds.length) params.selectedAssetIds = selectedAssetIds;

    const response = await client.get<PaginatedResultDTO<AssetDTO>>(
      "/api/assets",
      params
    );
<<<<<<< HEAD

=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
    return mapPaginatedAssetsDTOToEntity(response, selectedAssetIds);
  }

  async getAssetById(
<<<<<<< HEAD
    id: string,
=======
    id: number,
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
    selectedAssetIds: string[] = []
  ): Promise<Asset> {
    const response = await client.get<AssetDTO>(`/api/assets/${id}`);
    return mapAssetDTOToEntity(response, selectedAssetIds);
  }
}
