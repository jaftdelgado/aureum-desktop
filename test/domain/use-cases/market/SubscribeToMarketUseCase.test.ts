import { describe, it, expect, vi } from 'vitest';
import { SubscribeToMarketUseCase } from '@domain/use-cases/market/SubscribeToMarketUseCase';
import type {
  MarketRepository,
  MarketStreamHandlers,
} from '@domain/repositories/MarketRepository';

describe('SubscribeToMarketUseCase', () => {
  it('debe delegar la suscripción al MarketRepository y devolver el unsubscribe', () => {
    const unsubscribe = vi.fn();

    const mockRepo = {
      subscribeToMarket: vi.fn().mockReturnValue(unsubscribe),
      buyAsset: vi.fn(),
      sellAsset: vi.fn(),
    } as unknown as MarketRepository;

    const handlers: MarketStreamHandlers = {
      onData: vi.fn(),
      onError: vi.fn(),
      onComplete: vi.fn(),
    };

    const useCase = new SubscribeToMarketUseCase(mockRepo);

    const returned = useCase.execute('course-123', handlers);

    expect(mockRepo.subscribeToMarket).toHaveBeenCalledWith('course-123', handlers);
    expect(returned).toBe(unsubscribe);
  });
});
