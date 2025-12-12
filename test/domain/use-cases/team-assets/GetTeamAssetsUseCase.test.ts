import { describe, it, expect, vi, beforeEach } from "vitest";
import type { TeamAssetRepository } from "@domain/repositories/TeamAssetRepository";
import type { TeamAsset } from "@domain/entities/TeamAsset";
import { GetTeamAssetsUseCase } from "@domain/use-cases/team-assets/GetTeamAssetsUseCase";

describe("GetTeamAssetsUseCase", () => {
  let mockTeamAssetRepository: TeamAssetRepository;
  let useCase: GetTeamAssetsUseCase;

  const mockTeamAssets: TeamAsset[] = [
    {
      teamAssetId: 1,
      publicId: "ta-1",
      teamId: "team-1",
      assetId: "asset-1",
      currentPrice: 100,
      hasMovements: true,
      asset: {
        publicId: "asset-1",
        assetSymbol: "TST",
        assetName: "Test Asset",
        assetType: "Stock",
        basePrice: 100,
        volatility: 0.1,
        drift: 0.05,
        maxPrice: 200,
        minPrice: 50,
        dividendYield: 0.02,
        liquidity: 1000,
        assetPicUrl: "http://example.com/img.png",
        category: { categoryId: 1, name: "Tech" },
      },
    },
  ];

  beforeEach(() => {
    mockTeamAssetRepository = {
      findAllByTeamId: vi.fn().mockResolvedValue(mockTeamAssets),
      syncTeamAssets: vi.fn(),
    };
    useCase = new GetTeamAssetsUseCase(mockTeamAssetRepository);
  });

  it("should fetch all team assets for a given teamId", async () => {
    const result = await useCase.execute("team-1");

    expect(mockTeamAssetRepository.findAllByTeamId).toHaveBeenCalledWith(
      "team-1"
    );
    expect(result).toEqual(mockTeamAssets);
  });
});
