import { describe, it, expect, vi, beforeEach } from "vitest";
import type { MarketConfigRepository } from "@domain/repositories/MarketConfigRepository";
import type { MarketConfig } from "@domain/entities/MarketConfig";
import { CreateMarketConfigUseCase } from "@domain/use-cases/market-config/CreateMarketConfigUseCase";

describe("CreateMarketConfigUseCase", () => {
  let mockMarketConfigRepository: MarketConfigRepository;
  let useCase: CreateMarketConfigUseCase;

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
      createMarketConfig: vi.fn().mockResolvedValue(mockConfig),
      getMarketConfig: vi.fn(),
      updateMarketConfig: vi.fn(),
    };
    useCase = new CreateMarketConfigUseCase(mockMarketConfigRepository);
  });

  it("should call marketConfigRepository.createMarketConfig with the provided config", async () => {
    const result = await useCase.execute(mockConfig);

    expect(mockMarketConfigRepository.createMarketConfig).toHaveBeenCalledWith(
      mockConfig
    );
    expect(result).toEqual(mockConfig);
  });
});
