export interface MarketAssetDTO {
  Id: string;      
  Symbol: string;
  Name: string;
  Price: number;
  BasePrice: number;
  Volatility: number;
}

export interface MarketSnapshotDTO {
  Timestamp: number;
  Assets: MarketAssetDTO[];
}
