import type {
  MarketRepository,
  TradeParams,
} from "@domain/repositories/MarketRepository";
import type { TradeResult } from "@domain/entities/Trade";

export class SellAssetUseCase {
  constructor(private marketRepository: MarketRepository) {}

  execute(params: TradeParams): Promise<TradeResult> {
    return this.marketRepository.sellAsset(params);
  }
}
