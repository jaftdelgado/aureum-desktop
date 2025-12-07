// src/domain/repositories/AssetRepository.ts

import type { Asset } from "@domain/entities/Asset";

export interface AssetRepository {
  getAssets(query: Record<string, unknown>): Promise<{
    data: Asset[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  }>;

  getAssetById(id: number): Promise<Asset>;
}
