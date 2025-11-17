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
  createdAt: string;
  assetPicUrl?: string;
  category?: {
    categoryId: number;
    categoryKey: string;
  };
  status?: string;
  [key: string]:
    | string
    | number
    | undefined
    | { categoryId: number; categoryKey: string };
}
