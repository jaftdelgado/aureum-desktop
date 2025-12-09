import type { MarketConfig } from "@domain/entities/MarketConfig";

export const defaultMarketConfig: MarketConfig = {
  publicId: "",
  teamId: "",
  createdAt: new Date(),
  updatedAt: new Date(),

  initialCash: 100_000,
  currency: "USD",
  marketVolatility: "Medium",
  marketLiquidity: "Medium",
  thickSpeed: "Medium",
  transactionFee: "Low",
  eventFrequency: "Medium",
  dividendImpact: "Medium",
  crashImpact: "Medium",
  allowShortSelling: false,
};
