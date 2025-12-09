// src/domain/entities/TeamAsset.ts
import type { Asset } from "@domain/entities/Asset";

export interface TeamAsset {
  teamAssetId: number;
  publicId: string;
  teamId: string;
  assetId: string;
  currentPrice: number;
  asset: Asset;
}
