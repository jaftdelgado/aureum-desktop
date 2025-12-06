import type { MarketSnapshot } from "@domain/entities/MarketSnapshot";

export interface MarketStreamHandlers {
  onData: (snapshot: MarketSnapshot) => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
}

export interface MarketRepository {
  subscribeToMarket(
    courseId: string,
    handlers: MarketStreamHandlers
  ): () => void;
}
