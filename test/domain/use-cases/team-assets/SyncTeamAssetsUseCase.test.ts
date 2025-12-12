import { describe, it, expect, vi, beforeEach } from "vitest";
import type { TeamAssetRepository } from "@domain/repositories/TeamAssetRepository";
import type { TeamAsset } from "@domain/entities/TeamAsset";
import { SyncTeamAssetsUseCase } from "@domain/use-cases/team-assets/SyncTeamAssetsUseCase";

describe("SyncTeamAssetsUseCase", () => {
  let mockTeamAssetRepository: TeamAssetRepository;
  let useCase: SyncTeamAssetsUseCase;

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
      findAllByTeamId: vi.fn(),
      syncTeamAssets: vi.fn().mockResolvedValue(mockTeamAssets),
    };
    useCase = new SyncTeamAssetsUseCase(mockTeamAssetRepository);
  });

  it("should sync team assets with selectedAssetIds", async () => {
    const result = await useCase.execute("team-1", ["asset-1"]);

    expect(mockTeamAssetRepository.syncTeamAssets).toHaveBeenCalledWith(
      "team-1",
      ["asset-1"]
    );
    expect(result).toEqual(mockTeamAssets);
  });
});
