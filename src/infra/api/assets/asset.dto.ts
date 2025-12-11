<<<<<<< HEAD
export interface AssetDTO {
=======
// src/infra/api/assets/asset.dto.ts

export interface AssetDTO {
  assetId: number;
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
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
<<<<<<< HEAD
  logoUrl?: string | null;
=======
  assetPicUrl?: string | null;
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  category?: {
    categoryId: number;
    categoryKey: string;
  } | null;
<<<<<<< HEAD
=======
  createdAt: string;
  updatedAt: string;
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
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
