<<<<<<< HEAD
=======
// src/infra/api/team-assets/teamAsset.mappers.ts
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
import type { TeamAssetDTO } from "@infra/api/team-assets/teamAsset.dto";
import type { TeamAsset } from "@domain/entities/TeamAsset";

export const mapTeamAssetDTOToEntity = (dto: TeamAssetDTO): TeamAsset => ({
  teamAssetId: dto.teamAssetId,
  publicId: dto.publicId,
  teamId: dto.teamId,
  assetId: dto.assetId,
  currentPrice: dto.currentPrice,
<<<<<<< HEAD
  hasMovements: dto.hasMovements,

  asset: {
=======
  asset: {
    assetId: dto.asset.assetId,
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
    publicId: dto.asset.publicId,
    assetSymbol: dto.asset.assetSymbol,
    assetName: dto.asset.assetName,
    assetType: dto.asset.assetType,
    basePrice: dto.asset.basePrice,

<<<<<<< HEAD
    volatility: dto.asset.volatility,
=======
    volatility: dto.asset.volatility ?? undefined,
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
    drift: dto.asset.drift ?? undefined,
    maxPrice: dto.asset.maxPrice ?? undefined,
    minPrice: dto.asset.minPrice ?? undefined,
    dividendYield: dto.asset.dividendYield ?? undefined,
    liquidity: dto.asset.liquidity ?? undefined,
<<<<<<< HEAD
    assetPicUrl: dto.asset.logoUrl ?? undefined,

    category: dto.asset.category
      ? {
          categoryId: dto.asset.category.categoryId,
          name: dto.asset.category.categoryKey,
        }
      : null,
=======
    assetPicUrl: dto.asset.assetPicUrl ?? undefined,

    category: null,
    createdAt: new Date(dto.asset.createdAt),
    updatedAt: new Date(),
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  },
});
