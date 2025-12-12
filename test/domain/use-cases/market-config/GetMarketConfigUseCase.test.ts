import { describe, it, expect, vi, beforeEach } from "vitest";
import type { MarketConfigRepository } from "@domain/repositories/MarketConfigRepository";
import type { MarketConfig } from "@domain/entities/MarketConfig";
import { GetMarketConfigUseCase } from "@domain/use-cases/market-config/GetMarketConfigUseCase";

describe("GetMarketConfigUseCase", () => {
  let mockMarketConfigRepository: MarketConfigRepository;
  let useCase: GetMarketConfigUseCase;

  const mockConfig: MarketConfig = {
    publicId: "config-1",
    teamId: "team-1",
    initialCash: 100000,
    currency: "USD",
    marketVolatility: "Medium",
    marketLiquidity: "High",
    thickSpeed: "Medium",
    transactionFee: "Low",
    eventFrequency: "Medium",
    dividendImpact: "Low",
    crashImpact: "High",
    allowShortSelling: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockMarketConfigRepository = {
      createMarketConfig: vi.fn(),
      getMarketConfig: vi.fn().mockResolvedValue(mockConfig),
      updateMarketConfig: vi.fn(),
    };
    useCase = new GetMarketConfigUseCase(mockMarketConfigRepository);
  });

  it("should get a market config by teamPublicId", async () => {
    const result = await useCase.execute("team-1");

    expect(mockMarketConfigRepository.getMarketConfig).toHaveBeenCalledWith(
      "team-1"
    );
    expect(result).toEqual(mockConfig);
  });
});
