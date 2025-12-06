import type { MarketSnapshotDTO } from "./market.dto";
import type {
  MarketAsset,
  MarketSnapshot,
} from "@domain/entities/MarketSnapshot";

export const mapMarketSnapshotDTOToEntity = (
  dto: MarketSnapshotDTO
): MarketSnapshot => {
  const assets: MarketAsset[] = dto.Assets.map((a) => ({
    id: a.Id,
    symbol: a.Symbol,
    name: a.Name,
    price: a.Price,
    basePrice: a.BasePrice,
    volatility: a.Volatility,
  }));

  return {
    timestamp: new Date(dto.Timestamp),
    assets,
  };
};
