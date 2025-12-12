import { describe, it, expect, vi, beforeEach } from "vitest";
import type { AssetRepository } from "@domain/repositories/AssetRepository";
import type { Asset } from "@domain/entities/Asset";
import { GetAssetsUseCase } from "@domain/use-cases/assets/GetAssetsUseCase";

describe("GetAssetsUseCase", () => {
  let mockAssetRepository: AssetRepository;
  let useCase: GetAssetsUseCase;

  const mockAssets: Asset[] = [
    {
      publicId: "asset-1",
      assetName: "Test Asset 1",
      assetSymbol: "TST1",
      assetType: "Stock",
      basePrice: 100,
      volatility: 0.1,
      drift: 0.05,
      maxPrice: 200,
      minPrice: 50,
      dividendYield: 0.02,
      liquidity: 1000,
      assetPicUrl: "http://example.com/img1.png",
      category: { categoryId: 1, name: "Tech" },
    },
    {
      publicId: "asset-2",
      assetName: "Test Asset 2",
      assetSymbol: "TST2",
      assetType: "Stock",
      basePrice: 150,
      volatility: 0.2,
      drift: 0.04,
      maxPrice: 250,
      minPrice: 100,
      dividendYield: 0.03,
      liquidity: 500,
      assetPicUrl: "http://example.com/img2.png",
      category: { categoryId: 2, name: "Healthcare" },
    },
  ];

  const mockMeta = {
    totalItems: 2,
    itemCount: 2,
    itemsPerPage: 10,
    totalPages: 1,
    currentPage: 1,
  };

  beforeEach(() => {
    mockAssetRepository = {
      getAssets: vi
        .fn()
        .mockResolvedValue({ data: mockAssets, meta: mockMeta }),
      getAssetById: vi.fn(),
    };
    useCase = new GetAssetsUseCase(mockAssetRepository);
  });

  it("should call assetRepository.getAssets with query and selectedAssetIds", async () => {
    const query = { assetType: "Stock" };
    const selectedAssetIds = ["asset-1"];

    const result = await useCase.execute(query, selectedAssetIds);

    expect(mockAssetRepository.getAssets).toHaveBeenCalledWith(
      query,
      selectedAssetIds
    );
    expect(result.data).toEqual(mockAssets);
    expect(result.meta).toEqual(mockMeta);
  });

  it("should call assetRepository.getAssets with empty selectedAssetIds if not provided", async () => {
    const query = { assetType: "Stock" };

    const result = await useCase.execute(query);

    expect(mockAssetRepository.getAssets).toHaveBeenCalledWith(query, []);
    expect(result.data).toEqual(mockAssets);
    expect(result.meta).toEqual(mockMeta);
  });
});
