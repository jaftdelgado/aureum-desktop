export interface MarketAsset {
  id: number;
  symbol: string;
  name: string;
  price: number;
  basePrice: number;
  volatility: number;
}

export interface MarketSnapshot {
  timestamp: Date;
  assets: MarketAsset[];
}
