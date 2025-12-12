import { describe, it, expect, vi, beforeEach } from "vitest";
import { AssetApiRepository } from "@infra/api/assets/AssetApiRepository";
import { client } from "@infra/api/http/client";
import type {
  AssetDTO,
  PaginatedResultDTO,
  GetAssetsQueryDTO,
} from "@infra/api/assets/asset.dto";
import * as assetMappers from "@infra/api/assets/asset.mappers";

vi.mock("@infra/api/http/client");
vi.mock("@infra/api/assets/asset.mappers");

describe("AssetApiRepository", () => {
  let repository: AssetApiRepository;

  beforeEach(() => {
    repository = new AssetApiRepository();
    vi.clearAllMocks();
  });

  const makeMockAssetDTO = (): AssetDTO => ({
    publicId: "1",
    assetName: "Test Asset",
    assetSymbol: "TST",
    assetType: "Stock",
    basePrice: 100,
    volatility: 0.1,
    drift: 0.05,
    maxPrice: 200,
    minPrice: 50,
    dividendYield: 0.02,
    liquidity: 1000,
    logoUrl: "http://example.com/img.png",
    category: { categoryId: 1, categoryKey: "tech" },
  });

  const makeMockPaginatedDTO = (): PaginatedResultDTO<AssetDTO> => ({
    data: [makeMockAssetDTO()],
    meta: {
      totalItems: 1,
      itemCount: 1,
      itemsPerPage: 10,
      totalPages: 1,
      currentPage: 1,
    },
  });

  it("should fetch assets and map them", async () => {
    const mockResponse = makeMockPaginatedDTO();
    const mockMappedData = { data: [], meta: mockResponse.meta };

    (client.get as any).mockResolvedValue(mockResponse);
    (assetMappers.mapPaginatedAssetsDTOToEntity as any).mockReturnValue(
      mockMappedData
    );

    const result = await repository.getAssets({}, ["1"]);

    expect(client.get).toHaveBeenCalledWith("/api/assets", {
      selectedAssetIds: ["1"],
    });
    expect(assetMappers.mapPaginatedAssetsDTOToEntity).toHaveBeenCalledWith(
      mockResponse,
      ["1"]
    );
    expect(result).toEqual(mockMappedData);
  });

  it("should fetch asset by id and map it", async () => {
    const mockDTO = makeMockAssetDTO();
    const mockEntity = { id: "1", name: "Test Asset" } as any;

    (client.get as any).mockResolvedValue(mockDTO);
    (assetMappers.mapAssetDTOToEntity as any).mockReturnValue(mockEntity);

    const result = await repository.getAssetById("1", ["1"]);

    expect(client.get).toHaveBeenCalledWith("/api/assets/1");
    expect(assetMappers.mapAssetDTOToEntity).toHaveBeenCalledWith(mockDTO, [
      "1",
    ]);
    expect(result).toEqual(mockEntity);
  });

  it("should transform query object to string params", async () => {
    const query: GetAssetsQueryDTO = {
      search: "bitcoin",
      assetType: "Stock",
      page: 1,
      limit: 10,
    };

    const mockResponse = makeMockPaginatedDTO();
    (client.get as any).mockResolvedValue(mockResponse);
    (assetMappers.mapPaginatedAssetsDTOToEntity as any).mockReturnValue({
      data: [],
      meta: mockResponse.meta,
    });

    await repository.getAssets(query);

    expect(client.get).toHaveBeenCalledWith("/api/assets", {
      search: "bitcoin",
      assetType: "Stock",
      page: "1",
      limit: "10",
    });
  });

  it("should include selectedAssetIds if provided", async () => {
    const query: GetAssetsQueryDTO = { search: "ethereum" };
    const selectedAssetIds = ["abc", "def"];

    const mockResponse = makeMockPaginatedDTO();
    (client.get as any).mockResolvedValue(mockResponse);
    (assetMappers.mapPaginatedAssetsDTOToEntity as any).mockReturnValue({
      data: [],
      meta: mockResponse.meta,
    });

    await repository.getAssets(query, selectedAssetIds);

    expect(client.get).toHaveBeenCalledWith("/api/assets", {
      search: "ethereum",
      selectedAssetIds,
    });
  });
});
