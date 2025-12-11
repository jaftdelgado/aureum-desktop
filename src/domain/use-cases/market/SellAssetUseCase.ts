import type {
  MarketRepository,
  TradeParams,
} from "@domain/repositories/MarketRepository";
import type { TradeResult } from "@domain/entities/Trade";

export class SellAssetUseCase {
<<<<<<< HEAD
  private marketRepository: MarketRepository;
  
  constructor(marketRepository: MarketRepository) {
    this.marketRepository = marketRepository;
  }
=======
  constructor(private marketRepository: MarketRepository) {}

>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
  execute(params: TradeParams): Promise<TradeResult> {
    return this.marketRepository.sellAsset(params);
  }
}
