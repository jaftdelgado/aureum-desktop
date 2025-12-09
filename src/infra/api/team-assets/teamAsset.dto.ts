// src/infra/api/team-assets/teamAsset.dto.ts
export interface TeamAssetDTO {
  teamAssetId: number;
  publicId: string;
  teamId: string;
  assetId: string;
  currentPrice: number;
  asset: {
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
    createdAt: string;
  };
}
