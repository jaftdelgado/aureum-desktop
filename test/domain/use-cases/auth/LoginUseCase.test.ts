import { describe, it, expect, vi } from 'vitest';
import { LoginUseCase } from '@domain/use-cases/auth/LoginUseCase';
import type { AuthRepository } from '@domain/repositories/AuthRepository';
import type { ProfileRepository } from '@domain/repositories/ProfileRepository';

describe('LoginUseCase', () => {
  it('debe iniciar sesión y devolver el usuario completo', async () => {
    const mockAuthUser = { id: 'user-123', email: 'test@test.com' };
    const mockAuthRepo = {
      login: vi.fn().mockResolvedValue(mockAuthUser),
    } as unknown as AuthRepository;

    const mockProfile = { role: 'student', username: 'testuser' };
    const mockProfileRepo = {
      getProfile: vi.fn().mockResolvedValue(mockProfile), 
    } as unknown as ProfileRepository;

    const useCase = new LoginUseCase(mockAuthRepo, mockProfileRepo);
    
    const result = await useCase.execute('test@test.com', 'password');

    expect(mockAuthRepo.login).toHaveBeenCalledWith('test@test.com', 'password');
    expect(mockProfileRepo.getProfile).toHaveBeenCalledWith('user-123');
    
    expect(result).toMatchObject({ ...mockAuthUser, ...mockProfile });
  });

  it('debe propagar errores de credenciales inválidas', async () => {
    const mockAuthRepo = {
      login: vi.fn().mockRejectedValue(new Error('Credenciales inválidas')),
    } as unknown as AuthRepository;

    const mockProfileRepo = {
      getProfile: vi.fn(),
    } as unknown as ProfileRepository;

    const useCase = new LoginUseCase(mockAuthRepo, mockProfileRepo);

    await expect(useCase.execute('test@test.com', 'badpass'))
      .rejects.toThrow('Credenciales inválidas');
  });
});