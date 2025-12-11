<<<<<<< HEAD
=======
// src/domain/repositories/AssetRepository.ts
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
import type { Asset } from "@domain/entities/Asset";

export interface AssetRepository {
  getAssets(
    query: Record<string, unknown>,
    selectedAssetIds?: string[]
  ): Promise<{
    data: Asset[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  }>;

<<<<<<< HEAD
  getAssetById(id: string, selectedAssetIds?: string[]): Promise<Asset>;
=======
  getAssetById(id: number, selectedAssetIds?: string[]): Promise<Asset>;
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
}
