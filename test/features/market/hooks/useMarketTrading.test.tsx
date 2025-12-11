import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useMarketTrading } from '@features/market/hooks/useMarketTrading';
import type { Asset } from '@features/market/hooks/useMarketPage';

// 👇 Mocks hoisted para usarlos en vi.mock
const { mockBuyExecute, mockSellExecute } = vi.hoisted(() => ({
  mockBuyExecute: vi.fn(),
  mockSellExecute: vi.fn(),
}));

// 🔹 Mock de MarketApiRepository, que se instancia con `new`
vi.mock('@infra/api/market/MarketApiRepository', () => {
  class MockMarketApiRepository {
    subscribeToMarket = vi.fn();
    buyAsset = vi.fn();
    sellAsset = vi.fn();
  }

  return { MarketApiRepository: MockMarketApiRepository };
});

// 🔹 Mocks de use cases, también instanciados con `new`
vi.mock('@domain/use-cases/market/BuyAssetUseCase', () => ({
  BuyAssetUseCase: vi.fn().mockImplementation(function (this: any) {
    this.execute = mockBuyExecute;
  }),
}));

vi.mock('@domain/use-cases/market/SellAssetUseCase', () => ({
  SellAssetUseCase: vi.fn().mockImplementation(function (this: any) {
    this.execute = mockSellExecute;
  }),
}));

vi.mock('@app/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'user-123' },
  }),
}));

vi.mock('@app/hooks/useSelectedTeam', () => ({
  useSelectedTeam: () => ({
    selectedTeam: { publicId: 'team-123' },
  }),
}));

const toastInfo = vi.fn();
const toastSuccess = vi.fn();

vi.mock('sonner', () => ({
  toast: {
    info: (...args: any[]) => toastInfo(...args),
    success: (...args: any[]) => toastSuccess(...args),
  },
}));

describe('useMarketTrading', () => {
  const selectedAsset: Asset = {
    id: 'asset-1',
    symbol: 'BTC',
    name: 'Bitcoin',
    currentPrice: 100,
    change24h: 0,
    allocation: 0,
    history: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe realizar una compra, mostrar notificaciones y recargar cantidades', async () => {
    const reloadQuantities = vi.fn();
    mockBuyExecute.mockResolvedValue({
      movementPublicId: 'mov-1',
      transactionPublicId: 'tx-1',
      transactionPrice: 110,
      quantity: 2,
      notifications: [{ message: 'Compra ok' }],
    });

    const { result } = renderHook(
      () => useMarketTrading(selectedAsset, reloadQuantities)
    );

    await act(async () => {
      await result.current.buy(2);
    });

    expect(mockBuyExecute).toHaveBeenCalledWith({
      teamPublicId: 'team-123',
      assetPublicId: 'asset-1',
      userPublicId: 'user-123',
      quantity: 2,
      price: 100,
    });

    expect(toastSuccess).toHaveBeenCalled();
    expect(toastInfo).toHaveBeenCalledWith(
      'Notificación de mercado',
      expect.objectContaining({
        description: 'Compra ok',
      })
    );
    expect(reloadQuantities).toHaveBeenCalled();
    expect(result.current.loadingBuy).toBe(false);
  });

  it('debe realizar una venta, mostrar notificaciones y recargar cantidades', async () => {
    const reloadQuantities = vi.fn();
    mockSellExecute.mockResolvedValue({
      movementPublicId: 'mov-2',
      transactionPublicId: 'tx-2',
      transactionPrice: 95,
      quantity: 1,
      notifications: [{ message: 'Venta ok' }],
    });

    const { result } = renderHook(
      () => useMarketTrading(selectedAsset, reloadQuantities)
    );

    await act(async () => {
      await result.current.sell(1);
    });

    expect(mockSellExecute).toHaveBeenCalledWith({
      teamPublicId: 'team-123',
      assetPublicId: 'asset-1',
      userPublicId: 'user-123',
      quantity: 1,
      price: 100,
    });

    expect(toastSuccess).toHaveBeenCalled();
    expect(toastInfo).toHaveBeenCalledWith(
      'Notificación de mercado',
      expect.objectContaining({
        description: 'Venta ok',
      })
    );
    expect(reloadQuantities).toHaveBeenCalled();
    expect(result.current.loadingSell).toBe(false);
  });
});
