import type {
  MarketRepository,
  MarketStreamHandlers,
} from "@domain/repositories/MarketRepository";

import type { MarketSnapshotDTO } from "./market.dto";
import { mapMarketSnapshotDTOToEntity } from "./market.mappers";
import { marketClient } from "@infra/api/http/marketClient";

export class MarketApiRepository implements MarketRepository {
  subscribeToMarket(
    courseId: string,
    handlers: MarketStreamHandlers
  ): () => void {
    const endpoint = `/api/market/stream/${courseId}`;

    const unsubscribe = marketClient.streamJsonLines<MarketSnapshotDTO>(
      endpoint,
      {
        onMessage: (dto) => {
          const snapshot = mapMarketSnapshotDTOToEntity(dto);
          handlers.onData(snapshot);
        },
        onError: handlers.onError,
        onComplete: handlers.onComplete,
      }
    );

    return unsubscribe;
  }
}
