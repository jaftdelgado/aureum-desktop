import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useMarketPage } from '@features/market/hooks/useMarketPage';
import type { MarketSnapshot } from '@domain/entities/MarketSnapshot';
import { PortfolioRepository } from '@infra/api/portfolio/PortfolioRepository';

// 👇 Mocks hoisted, seguros para usar dentro de vi.mock
const { mockSubscribeExecute } = vi.hoisted(() => ({
  mockSubscribeExecute: vi.fn(),
}));

// 🔹 Mock de la clase que se instancia con `new MarketApiRepository()`
vi.mock('@infra/api/market/MarketApiRepository', () => {
  class MockMarketApiRepository {
    subscribeToMarket = vi.fn();
    buyAsset = vi.fn();
    sellAsset = vi.fn();
  }

  return { MarketApiRepository: MockMarketApiRepository };
});

// 🔹 Mock del use case que se instancia con `new SubscribeToMarketUseCase(...)`
vi.mock('@domain/use-cases/market/SubscribeToMarketUseCase', () => ({
  SubscribeToMarketUseCase: vi.fn().mockImplementation(function (this: any) {
    this.execute = mockSubscribeExecute;
  }),
}));

vi.mock('@app/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'user-123' },
  }),
}));

vi.mock('@infra/api/portfolio/PortfolioRepository', () => ({
  PortfolioRepository: {
    getAssetQuantitiesByTeamAndUser: vi.fn(),
  },
}));

describe('useMarketPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockSubscribeExecute.mockImplementation(
      (_courseId: string, handlers: any) => {
        const snapshot: MarketSnapshot = {
          timestamp: new Date('2024-01-01T10:00:00Z'),
          assets: [
            {
              id: 'asset-1',
              symbol: 'BTC',
              name: 'Bitcoin',
              price: 100,
              basePrice: 90,
              volatility: 0.2,
            },
          ],
        };

        handlers.onData(snapshot);
        return vi.fn(); // unsubscribe
      }
    );

    (PortfolioRepository.getAssetQuantitiesByTeamAndUser as any).mockResolvedValue(
      []
    );
  });

  it('debe suscribirse al market y poblar assets', async () => {
    const { result } = renderHook(() => useMarketPage('course-123'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockSubscribeExecute).toHaveBeenCalledWith(
      'course-123',
      expect.any(Object)
    );

    expect(result.current.assets).toHaveLength(1);
    const asset = result.current.assets[0];

    expect(asset).toMatchObject({
      id: 'asset-1',
      symbol: 'BTC',
      name: 'Bitcoin',
      currentPrice: 100,
      allocation: 0,
    });

    expect(asset.history.length).toBe(1);
    expect(asset.history[0].value).toBe(100);
    expect(result.current.selectedAssetId).toBe('asset-1');
    expect(result.current.selectedAsset?.id).toBe('asset-1');
  });

  it('debe recargar las cantidades del portafolio y reflejar allocation', async () => {
    (PortfolioRepository.getAssetQuantitiesByTeamAndUser as any).mockResolvedValue(
      [
        {
          assetId: 'asset-1',
          quantity: 5,
        },
      ]
    );

    const { result } = renderHook(() => useMarketPage('course-123'));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.reloadQuantities();
    });

    const asset = result.current.assets[0];
    expect(asset.allocation).toBe(5);
    expect(PortfolioRepository.getAssetQuantitiesByTeamAndUser).toHaveBeenCalledWith(
      'course-123',
      'user-123'
    );
  });
});
