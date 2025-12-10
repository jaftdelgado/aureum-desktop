import { describe, it, expect, vi } from 'vitest';
import { LogoutUseCase } from '@domain/use-cases/auth/LogoutUseCase';
import type { AuthRepository } from '@domain/repositories/AuthRepository';

describe('LogoutUseCase', () => {
  it('debe llamar al método logout del repositorio', async () => {
    const mockRepo = {
      logout: vi.fn().mockResolvedValue(undefined),
    } as unknown as AuthRepository;

    const useCase = new LogoutUseCase(mockRepo);
    await useCase.execute();

    expect(mockRepo.logout).toHaveBeenCalled();
  });
});