// src/infra/api/market/MarketApiRepository.ts
import type {
  MarketRepository,
  MarketStreamHandlers,
  TradeParams,
} from "@domain/repositories/MarketRepository";

import type { MarketSnapshotDTO } from "./market.dto";
import { mapMarketSnapshotDTOToEntity } from "./market.mappers";

import type { TradeResult } from "@domain/entities/Trade";
import type { TradeResultDTO } from "./market.trade.dto";
import { mapTradeResultDTOToEntity } from "./market.trade.mappers";

import { marketClient } from "@infra/api/http/marketClient";

export class MarketApiRepository implements MarketRepository {
  // 🔁 STREAM de precios (CheckMarket)
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

  // 💰 BUY (gRPC vía API Gateway, pero usando REST JSON)
  async buyAsset(params: TradeParams): Promise<TradeResult> {
    const dto = await marketClient.postJson<TradeResultDTO>("/api/market/buy", {
      teamPublicId: params.teamPublicId,
      assetPublicId: params.assetPublicId,
      userPublicId: params.userPublicId,
      quantity: params.quantity,
      price: params.price,
    });

    return mapTradeResultDTOToEntity(dto);
  }

  // 💸 SELL
  async sellAsset(params: TradeParams): Promise<TradeResult> {
    const dto = await marketClient.postJson<TradeResultDTO>(
      "/api/market/sell",
      {
        teamPublicId: params.teamPublicId,
        assetPublicId: params.assetPublicId,
        userPublicId: params.userPublicId,
        quantity: params.quantity,
        price: params.price,
      }
    );

    return mapTradeResultDTOToEntity(dto);
  }
}
