// src/types/asset.ts
export interface Asset {
  assetId: number;
  assetSymbol: string;
  assetName: string;
  assetType: "Stock" | "Crypto" | "ETF";
  basePrice?: number;
  volatility?: number;
  drift?: number;
  maxPrice?: number;
  minPrice?: number;
  dividendYield?: number;
  liquidity?: number;
  createdAt: string; // <- string para que coincida con la API
  assetPicUrl?: string;
  category?: {
    categoryId: number;
    categoryKey: string;
  };
  status?: string; // Para DataTable
  [key: string]:
    | string
    | number
    | undefined
    | { categoryId: number; categoryKey: string }; // Para DataTable
}
