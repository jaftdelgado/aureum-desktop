// src/infra/api/assets/asset.dto.ts

export interface AssetDTO {
  assetId: number;
  publicId: string;
  assetSymbol: string;
  assetName: string;
  assetType: string;
  basePrice: number;
  volatility?: number;
  drift?: number | null;
  maxPrice?: number | null;
  minPrice?: number | null;
  dividendYield?: number | null;
  liquidity?: number | null;
  assetPicUrl?: string | null;
  category?: {
    categoryId: number;
    categoryKey: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResultDTO<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface GetAssetsQueryDTO {
  page?: number;
  limit?: number;
  search?: string;
  assetType?: string;
  basePrice?: number;
  categoryId?: number;
  orderByBasePrice?: "ASC" | "DESC";
  orderByAssetName?: "ASC" | "DESC";
  selectedAssetIds?: string[];
}
