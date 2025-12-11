<<<<<<< HEAD
=======
// src/domain/entities/TeamAsset.ts
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
import type { Asset } from "@domain/entities/Asset";

export interface TeamAsset {
  teamAssetId: number;
  publicId: string;
  teamId: string;
  assetId: string;
  currentPrice: number;
<<<<<<< HEAD
  hasMovements: boolean;
=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  asset: Asset;
}
