import { describe, it, expect, vi } from 'vitest';
import { DeleteAccountUseCase } from '@domain/use-cases/profile/DeleteAccountUseCase';
import type { ProfileRepository } from '@domain/repositories/ProfileRepository';

describe('DeleteAccountUseCase', () => {
  it('debe llamar al repositorio para eliminar la cuenta', async () => {
    const mockProfileRepo = {
      deleteAccount: vi.fn().mockResolvedValue(undefined),
    } as unknown as ProfileRepository;

    const useCase = new DeleteAccountUseCase(mockProfileRepo);
    
    await useCase.execute('user-123');

    expect(mockProfileRepo.deleteAccount).toHaveBeenCalledWith('user-123');
  });
});