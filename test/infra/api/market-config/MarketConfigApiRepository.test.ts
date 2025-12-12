import { describe, it, expect, vi, beforeEach } from "vitest";
import { MarketConfigApiRepository } from "@infra/api/market-config/MarketConfigApiRepository";
import { client } from "@infra/api/http/client";
import type { MarketConfig } from "@domain/entities/MarketConfig";
import type { MarketConfigDTO } from "@infra/api/market-config/marketConfig.dto";
import {
  mapMarketConfigDTOToEntity,
  mapMarketConfigEntityToDTO,
} from "@infra/api/market-config/marketConfig.mappers";

vi.mock("@infra/api/http/client", () => ({
  client: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

vi.mock("@infra/api/market-config/marketConfig.mappers", () => ({
  mapMarketConfigDTOToEntity: vi.fn(),
  mapMarketConfigEntityToDTO: vi.fn(),
}));

describe("MarketConfigApiRepository", () => {
  let repository: MarketConfigApiRepository;

  beforeEach(() => {
    repository = new MarketConfigApiRepository();
    vi.clearAllMocks();
  });

  const makeMockDTO = (): MarketConfigDTO => ({
    public_id: "team-123",
    team_id: "team-123",
    initial_cash: 100000,
    currency: "USD",
    market_volatility: "Medium",
    market_liquidity: "High",
    thick_speed: "Medium",
    transaction_fee: "Low",
    event_frequency: "Medium",
    dividend_impact: "Low",
    crash_impact: "Medium",
    allow_short_selling: true,
    created_at: "2025-12-11T00:00:00.000Z",
    updated_at: "2025-12-11T00:00:00.000Z",
  });

  const makeMockEntity = (): MarketConfig => ({
    publicId: "team-123",
    teamId: "team-123",
    initialCash: 100000,
    currency: "USD",
    marketVolatility: "Medium",
    marketLiquidity: "High",
    thickSpeed: "Medium",
    transactionFee: "Low",
    eventFrequency: "Medium",
    dividendImpact: "Low",
    crashImpact: "Medium",
    allowShortSelling: true,
    createdAt: new Date("2025-12-11T00:00:00.000Z"),
    updatedAt: new Date("2025-12-11T00:00:00.000Z"),
  });

  it("should fetch market config by team and map it", async () => {
    const mockDTO = makeMockDTO();
    const mockEntity = makeMockEntity();

    (client.get as any).mockResolvedValue(mockDTO);
    (mapMarketConfigDTOToEntity as any).mockReturnValue(mockEntity);

    const result = await repository.getMarketConfig("team-123");

    expect(client.get).toHaveBeenCalledWith("/api/market-config/team-123");
    expect(mapMarketConfigDTOToEntity).toHaveBeenCalledWith(mockDTO);
    expect(result).toEqual(mockEntity);
  });

  it("should create market config and map response", async () => {
    const mockEntity = makeMockEntity();
    const mockDTO = makeMockDTO();

    (mapMarketConfigEntityToDTO as any).mockReturnValue(mockDTO);
    (client.post as any).mockResolvedValue(mockDTO);
    (mapMarketConfigDTOToEntity as any).mockReturnValue(mockEntity);

    const result = await repository.createMarketConfig(mockEntity);

    expect(mapMarketConfigEntityToDTO).toHaveBeenCalledWith(mockEntity);
    expect(client.post).toHaveBeenCalledWith("/api/market-config", mockDTO);
    expect(mapMarketConfigDTOToEntity).toHaveBeenCalledWith(mockDTO);
    expect(result).toEqual(mockEntity);
  });

  it("should update market config and map response", async () => {
    const mockEntity = makeMockEntity();
    const mockDTO = makeMockDTO();

    (mapMarketConfigEntityToDTO as any).mockReturnValue(mockDTO);
    (client.put as any).mockResolvedValue(mockDTO);
    (mapMarketConfigDTOToEntity as any).mockReturnValue(mockEntity);

    const result = await repository.updateMarketConfig(mockEntity);

    expect(mapMarketConfigEntityToDTO).toHaveBeenCalledWith(mockEntity);
    expect(client.put).toHaveBeenCalledWith(
      "/api/market-config/team-123",
      mockDTO
    );
    expect(mapMarketConfigDTOToEntity).toHaveBeenCalledWith(mockDTO);
    expect(result).toEqual(mockEntity);
  });
});
