import { describe, it, expect, vi } from 'vitest';
import { BuyAssetUseCase } from '@domain/use-cases/market/BuyAssetUseCase';
import type {
  MarketRepository,
  TradeParams,
} from '@domain/repositories/MarketRepository';
import type { TradeResult } from '@domain/entities/Trade';

describe('BuyAssetUseCase', () => {
  it('debe delegar la compra al MarketRepository', async () => {
    const mockResult: TradeResult = {
      movementPublicId: 'mov-1',
      transactionPublicId: 'tx-1',
      transactionPrice: 123.45,
      quantity: 2,
      notifications: [
        { userPublicId: 'user-1', message: 'Compra exitosa' },
      ],
    };

    const mockRepo = {
      subscribeToMarket: vi.fn(),
      buyAsset: vi.fn().mockResolvedValue(mockResult),
      sellAsset: vi.fn(),
    } as unknown as MarketRepository;

    const params: TradeParams = {
      teamPublicId: 'team-123',
      assetPublicId: 'asset-abc',
      userPublicId: 'user-xyz',
      quantity: 2,
      price: 120,
    };

    const useCase = new BuyAssetUseCase(mockRepo);

    const result = await useCase.execute(params);

    expect(mockRepo.buyAsset).toHaveBeenCalledWith(params);
    expect(result).toBe(mockResult);
  });
});
