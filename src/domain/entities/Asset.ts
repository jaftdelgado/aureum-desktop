<<<<<<< HEAD
=======
// src/domain/entities/Asset.ts
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
export interface AssetCategory {
  categoryId: number;
  name: string;
}

export interface Asset {
<<<<<<< HEAD
  publicId: string;
=======
  assetId: number;
  publicId?: string;
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  assetName: string;
  assetSymbol: string;
  assetType: string;
  basePrice: number;

  volatility?: number;
  drift?: number | null;
  maxPrice?: number | null;
  minPrice?: number | null;
  dividendYield?: number | null;
  liquidity?: number | null;
  assetPicUrl?: string | null;

<<<<<<< HEAD
  category?: AssetCategory | null;

  createdAt?: Date;
  updatedAt?: Date;
=======
  category: AssetCategory | null;

  createdAt: Date;
  updatedAt: Date;
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d

  isSelected?: boolean;
}
