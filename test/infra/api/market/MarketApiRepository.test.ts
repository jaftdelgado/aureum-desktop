import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MarketApiRepository } from '@infra/api/market/MarketApiRepository';
import type { MarketSnapshotDTO } from '@infra/api/market/market.dto';
import type { TradeResultDTO } from '@infra/api/market/market.trade.dto';
import { marketClient } from '@infra/api/http/marketClient';

vi.mock('@infra/api/http/marketClient', () => ({
  marketClient: {
    streamJsonLines: vi.fn(),
    postJson: vi.fn(),
  },
}));

describe('MarketApiRepository', () => {
  let repository: MarketApiRepository;

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new MarketApiRepository();
  });

  describe('subscribeToMarket', () => {
    it('debe usar marketClient.streamJsonLines y mapear el snapshot', () => {
      const mockUnsubscribe = vi.fn();

      (marketClient.streamJsonLines as any).mockReturnValue(mockUnsubscribe);

      const dto: MarketSnapshotDTO = {
        Timestamp: 1733872800000,
        Assets: [
          {
            Id: 'asset-1',
            Symbol: 'BTC',
            Name: 'Bitcoin',
            Price: 100,
            BasePrice: 90,
            Volatility: 0.2,
          },
        ],
      };

      const onData = vi.fn();
      const onError = vi.fn();
      const onComplete = vi.fn();

      const unsubscribe = repository.subscribeToMarket('course-123', {
        onData,
        onError,
        onComplete,
      });

      // 🔹 Aquí estaba el fallo: el código real solo pasa 2 argumentos
      expect(marketClient.streamJsonLines).toHaveBeenCalledWith(
        '/api/market/stream/course-123',
        expect.objectContaining({
          onMessage: expect.any(Function),
          onError: expect.any(Function),
          onComplete: expect.any(Function),
        })
      );

      const handlers = (marketClient.streamJsonLines as any).mock.calls[0][1];

      handlers.onMessage(dto);

      expect(onData).toHaveBeenCalledWith({
        timestamp: new Date(dto.Timestamp),
        assets: [
          {
            id: dto.Assets[0].Id,
            symbol: dto.Assets[0].Symbol,
            name: dto.Assets[0].Name,
            price: dto.Assets[0].Price,
            basePrice: dto.Assets[0].BasePrice,
            volatility: dto.Assets[0].Volatility,
          },
        ],
      });

      expect(unsubscribe).toBe(mockUnsubscribe);
    });
  });

  describe('buyAsset', () => {
    it('debe llamar al endpoint de compra y mapear el TradeResult', async () => {
      const dto: TradeResultDTO = {
        movementPublicId: 'mov-1',
        transactionPublicId: 'tx-1',
        transactionPrice: 99.5,
        quantity: 3,
        notifications: [
          { userPublicId: 'user-1', message: 'Compra ejecutada' },
        ],
      };

      (marketClient.postJson as any).mockResolvedValue(dto);

      const result = await repository.buyAsset({
        teamPublicId: 'team-1',
        assetPublicId: 'asset-1',
        userPublicId: 'user-1',
        quantity: 3,
        price: 99.5,
      });

      expect(marketClient.postJson).toHaveBeenCalledWith('/api/market/buy', {
        teamPublicId: 'team-1',
        assetPublicId: 'asset-1',
        userPublicId: 'user-1',
        quantity: 3,
        price: 99.5,
      });

      expect(result).toEqual({
        movementPublicId: dto.movementPublicId,
        transactionPublicId: dto.transactionPublicId,
        transactionPrice: dto.transactionPrice,
        quantity: dto.quantity,
        notifications: dto.notifications,
      });
    });
  });

  describe('sellAsset', () => {
    it('debe llamar al endpoint de venta y mapear el TradeResult', async () => {
      const dto: TradeResultDTO = {
        movementPublicId: 'mov-2',
        transactionPublicId: 'tx-2',
        transactionPrice: 80.25,
        quantity: 1,
        notifications: [
          { userPublicId: 'user-2', message: 'Venta ejecutada' },
        ],
      };

      (marketClient.postJson as any).mockResolvedValue(dto);

      const result = await repository.sellAsset({
        teamPublicId: 'team-1',
        assetPublicId: 'asset-1',
        userPublicId: 'user-1',
        quantity: 1,
        price: 80.25,
      });

      expect(marketClient.postJson).toHaveBeenCalledWith('/api/market/sell', {
        teamPublicId: 'team-1',
        assetPublicId: 'asset-1',
        userPublicId: 'user-1',
        quantity: 1,
        price: 80.25,
      });

      expect(result).toEqual({
        movementPublicId: dto.movementPublicId,
        transactionPublicId: dto.transactionPublicId,
        transactionPrice: dto.transactionPrice,
        quantity: dto.quantity,
        notifications: dto.notifications,
      });
    });
  });
});
