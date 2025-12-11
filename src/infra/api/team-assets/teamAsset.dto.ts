<<<<<<< HEAD
=======
// src/infra/api/team-assets/teamAsset.dto.ts
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
export interface TeamAssetDTO {
  teamAssetId: number;
  publicId: string;
  teamId: string;
  assetId: string;
  currentPrice: number;
<<<<<<< HEAD
  hasMovements: boolean;
  asset: {
=======
  asset: {
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
    category?: {
      categoryId: number;
      categoryKey: string;
    } | null;
=======
    assetPicUrl?: string | null;
    createdAt: string;
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  };
}
