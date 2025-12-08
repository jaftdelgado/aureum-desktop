export interface PortfolioItem {
    userId: string;
  portfolioId: number;
  assetId: string;
  quantity: number;
  avgPrice: number;
  currentValue: number;
  assetName: string;
  assetSymbol: string;
  totalInvestment: number;
  currentTotalValue: number;
  profitOrLoss: number;
  profitOrLossPercentage: number;
}

export interface HistoryItem {
  movementId: string;
  assetId: string;
  assetName: string;
  assetSymbol: string;
  quantity: number;
  price: number;
  totalAmount: number;
  type: string; 
  realizedPnl: number;
  date: string;
}