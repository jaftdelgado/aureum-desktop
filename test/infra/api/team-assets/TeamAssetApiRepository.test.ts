import { describe, it, expect, vi, beforeEach } from "vitest";
import { TeamAssetApiRepository } from "@infra/api/team-assets/TeamAssetApiRepository";
import { client } from "@infra/api/http/client";
import { mapTeamAssetDTOToEntity } from "@infra/api/team-assets/teamAsset.mappers";
import type { TeamAssetDTO } from "@infra/api/team-assets/teamAsset.dto";
import type { TeamAsset } from "@domain/entities/TeamAsset";

vi.mock("@infra/api/http/client", () => ({
  client: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

vi.mock("@infra/api/team-assets/teamAsset.mappers", () => ({
  mapTeamAssetDTOToEntity: vi.fn(),
}));

describe("TeamAssetApiRepository", () => {
  let repository: TeamAssetApiRepository;
  let mockEntities: TeamAsset[];
  let mockDTOs: TeamAssetDTO[];

  const makeMockTeamAssetDTO = (): TeamAssetDTO => ({
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
      logoUrl: "http://example.com/img.png",
      category: {
        categoryId: 1,
        categoryKey: "Tech",
      },
    },
  });

  const makeMockTeamAssetEntity = (): TeamAsset => ({
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
      category: {
        categoryId: 1,
        name: "Tech",
      },
    },
  });

  beforeEach(() => {
    repository = new TeamAssetApiRepository();
    vi.clearAllMocks();

    mockDTOs = [makeMockTeamAssetDTO()];
    mockEntities = [makeMockTeamAssetEntity()];

    (mapTeamAssetDTOToEntity as any).mockImplementation(
      (_dto: TeamAssetDTO) => mockEntities[0]
    );
  });

  it("should fetch all team assets and map them", async () => {
    (client.get as any).mockResolvedValue(mockDTOs);

    const result = await repository.findAllByTeamId("team-1");

    expect(client.get).toHaveBeenCalledWith("/api/team-assets/team/team-1");
    expect(mapTeamAssetDTOToEntity).toHaveBeenCalledTimes(mockDTOs.length);
    expect(result).toEqual(mockEntities);
  });

  it("should sync team assets and map the response", async () => {
    (client.post as any).mockResolvedValue(mockDTOs);

    const result = await repository.syncTeamAssets("team-1", ["asset-1"]);

    expect(client.post).toHaveBeenCalledWith("/api/team-assets/sync", {
      teamId: "team-1",
      selectedAssetIds: ["asset-1"],
    });
    expect(mapTeamAssetDTOToEntity).toHaveBeenCalledTimes(mockDTOs.length);
    expect(result).toEqual(mockEntities);
  });
});
