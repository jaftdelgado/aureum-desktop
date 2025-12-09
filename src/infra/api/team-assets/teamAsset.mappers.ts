// src/infra/api/team-assets/teamAsset.mappers.ts
import type { TeamAssetDTO } from "@infra/api/team-assets/teamAsset.dto";
import type { TeamAsset } from "@domain/entities/TeamAsset";

export const mapTeamAssetDTOToEntity = (dto: TeamAssetDTO): TeamAsset => ({
  teamAssetId: dto.teamAssetId,
  publicId: dto.publicId,
  teamId: dto.teamId,
  assetId: dto.assetId,
  currentPrice: dto.currentPrice,
  asset: {
    assetId: dto.asset.assetId,
    publicId: dto.asset.publicId,
    assetSymbol: dto.asset.assetSymbol,
    assetName: dto.asset.assetName,
    assetType: dto.asset.assetType,
    basePrice: dto.asset.basePrice,

    volatility: dto.asset.volatility ?? undefined,
    drift: dto.asset.drift ?? undefined,
    maxPrice: dto.asset.maxPrice ?? undefined,
    minPrice: dto.asset.minPrice ?? undefined,
    dividendYield: dto.asset.dividendYield ?? undefined,
    liquidity: dto.asset.liquidity ?? undefined,
    assetPicUrl: dto.asset.assetPicUrl ?? undefined,

    category: null,
    createdAt: new Date(dto.asset.createdAt),
    updatedAt: new Date(),
  },
});
