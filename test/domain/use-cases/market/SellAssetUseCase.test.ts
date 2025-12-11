import { describe, it, expect, vi } from 'vitest';
import { SellAssetUseCase } from '@domain/use-cases/market/SellAssetUseCase';
import type {
  MarketRepository,
  TradeParams,
} from '@domain/repositories/MarketRepository';
import type { TradeResult } from '@domain/entities/Trade';

describe('SellAssetUseCase', () => {
  it('debe delegar la venta al MarketRepository', async () => {
    const mockResult: TradeResult = {
      movementPublicId: 'mov-2',
      transactionPublicId: 'tx-2',
      transactionPrice: 80,
      quantity: 5,
      notifications: [
        { userPublicId: 'user-1', message: 'Venta realizada' },
      ],
    };

    const mockRepo = {
      subscribeToMarket: vi.fn(),
      buyAsset: vi.fn(),
      sellAsset: vi.fn().mockResolvedValue(mockResult),
    } as unknown as MarketRepository;

    const params: TradeParams = {
      teamPublicId: 'team-123',
      assetPublicId: 'asset-abc',
      userPublicId: 'user-xyz',
      quantity: 5,
      price: 79,
    };

    const useCase = new SellAssetUseCase(mockRepo);

    const result = await useCase.execute(params);

    expect(mockRepo.sellAsset).toHaveBeenCalledWith(params);
    expect(result).toBe(mockResult);
  });
});
