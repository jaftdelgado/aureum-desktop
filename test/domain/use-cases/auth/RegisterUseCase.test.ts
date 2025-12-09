import { describe, it, expect, vi } from 'vitest';
import { RegisterUseCase } from '@domain/use-cases/auth/RegisterUseCase';
import type { AuthRepository } from '@domain/repositories/AuthRepository';
import type { ProfileRepository } from '@domain/repositories/ProfileRepository';
import type { RegisterData } from '@domain/entities/RegisterData';

describe('RegisterUseCase', () => {
  it('debe registrar un usuario correctamente (Auth + Profile)', async () => {
    const mockAuthRepo = {
      register: vi.fn().mockResolvedValue('user-123-id'), 
      deleteAuthUser: vi.fn(), 
    } as unknown as AuthRepository;

    const mockProfileRepo = {
      createProfile: vi.fn().mockResolvedValue(undefined),
    } as unknown as ProfileRepository;

    const useCase = new RegisterUseCase(mockAuthRepo, mockProfileRepo);
    
    const registerData: RegisterData = {
      email: 'test@test.com',
      password: 'SecurePassword123',
      username: 'testuser',       
      firstName: 'Juan',         
      lastName: 'Perez',          
      accountType: 'student',     
      isGoogle: false
    };

    await useCase.execute(registerData);

    expect(mockAuthRepo.register).toHaveBeenCalledWith(registerData);
    
    expect(mockProfileRepo.createProfile).toHaveBeenCalledWith('user-123-id', registerData);
  });

  it('debe hacer rollback si falla la creación del perfil', async () => {
    const mockAuthRepo = {
      register: vi.fn().mockResolvedValue('user-fail-id'),
      deleteAuthUser: vi.fn().mockResolvedValue(undefined), // El rollback debe funcionar
    } as unknown as AuthRepository;

    const mockProfileRepo = {
      createProfile: vi.fn().mockRejectedValue(new Error('Error de DB')), // Simulamos fallo en perfil
    } as unknown as ProfileRepository;

    const useCase = new RegisterUseCase(mockAuthRepo, mockProfileRepo);

    const registerData: RegisterData = {
      email: 'fail@test.com',
      password: '123',
      username: 'failuser',
      firstName: 'Fail',
      lastName: 'User',
      accountType: 'student',
    };

    await expect(useCase.execute(registerData)).rejects.toThrow('Error de DB');

    expect(mockAuthRepo.deleteAuthUser).toHaveBeenCalled();
  });
});