<<<<<<< HEAD
=======
// src/infra/api/assets/asset.mappers.ts
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
import type { AssetDTO, PaginatedResultDTO } from "@infra/api/assets/asset.dto";
import type { Asset } from "@domain/entities/Asset";

export const mapAssetDTOToEntity = (
  dto: AssetDTO,
  selectedAssetIds: string[] = []
): Asset => ({
<<<<<<< HEAD
=======
  assetId: dto.assetId,
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  publicId: dto.publicId,
  assetName: dto.assetName,
  assetSymbol: dto.assetSymbol,
  assetType: dto.assetType,
  basePrice: dto.basePrice,
  volatility: dto.volatility,
  drift: dto.drift ?? null,
  maxPrice: dto.maxPrice ?? null,
  minPrice: dto.minPrice ?? null,
  dividendYield: dto.dividendYield ?? null,
  liquidity: dto.liquidity ?? null,
<<<<<<< HEAD
  assetPicUrl: dto.logoUrl ?? null,
=======
  assetPicUrl: dto.assetPicUrl ?? null,
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  category: dto.category
    ? {
        categoryId: dto.category.categoryId,
        name: dto.category.categoryKey,
      }
    : null,
<<<<<<< HEAD
=======
  createdAt: new Date(dto.createdAt),
  updatedAt: new Date(dto.updatedAt),
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  isSelected: selectedAssetIds.includes(dto.publicId),
});

export const mapPaginatedAssetsDTOToEntity = (
  dto: PaginatedResultDTO<AssetDTO>,
  selectedAssetIds: string[] = []
) => ({
  data: dto.data.map((asset) => mapAssetDTOToEntity(asset, selectedAssetIds)),
  meta: dto.meta,
});
