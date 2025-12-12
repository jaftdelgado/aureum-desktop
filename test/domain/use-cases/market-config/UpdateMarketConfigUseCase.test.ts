import { describe, it, expect, vi, beforeEach } from "vitest";
import type { MarketConfigRepository } from "@domain/repositories/MarketConfigRepository";
import type { MarketConfig } from "@domain/entities/MarketConfig";
import { UpdateMarketConfigUseCase } from "@domain/use-cases/market-config/UpdateMarketConfigUseCase";

describe("UpdateMarketConfigUseCase", () => {
  let mockMarketConfigRepository: MarketConfigRepository;
  let useCase: UpdateMarketConfigUseCase;

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
      getMarketConfig: vi.fn(),
      updateMarketConfig: vi.fn().mockResolvedValue(mockConfig),
    };
    useCase = new UpdateMarketConfigUseCase(mockMarketConfigRepository);
  });

  it("should update a market config", async () => {
    const result = await useCase.execute(mockConfig);

    expect(mockMarketConfigRepository.updateMarketConfig).toHaveBeenCalledWith(
      mockConfig
    );
    expect(result).toEqual(mockConfig);
  });
});
