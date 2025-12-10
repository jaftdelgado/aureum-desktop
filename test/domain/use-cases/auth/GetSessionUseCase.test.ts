import { describe, it, expect, vi } from 'vitest';
import { GetSessionUseCase } from '@domain/use-cases/auth/GetSessionUseCase';
import type { AuthRepository } from '@domain/repositories/AuthRepository';
import type { ProfileRepository } from '@domain/repositories/ProfileRepository';

describe('GetSessionUseCase', () => {
  it('debe devolver null si no hay sesión activa', async () => {
    const mockAuthRepo = {
      getSession: vi.fn().mockResolvedValue(null),
    } as unknown as AuthRepository;
    
    const mockProfileRepo = {
      getProfile: vi.fn(),
    } as unknown as ProfileRepository;

    const useCase = new GetSessionUseCase(mockAuthRepo, mockProfileRepo);
    const result = await useCase.execute();

    expect(result).toBeNull();
    expect(mockProfileRepo.getProfile).not.toHaveBeenCalled();
  });

  it('debe enriquecer el usuario de auth con datos del perfil', async () => {
    const authUser = { id: 'u1', email: 'a@a.com' };
    
    const profileData = { 
      username: 'user1', 
      role: 'student', 
      full_name: 'Juan Perez', 
      profile_pic_id: 'img-base64', 
      bio: 'Hola mundo'
    };
    
    const mockAuthRepo = {
      getSession: vi.fn().mockResolvedValue(authUser),
    } as unknown as AuthRepository;

    const mockProfileRepo = {
      getProfile: vi.fn().mockResolvedValue(profileData),
    } as unknown as ProfileRepository;

    const useCase = new GetSessionUseCase(mockAuthRepo, mockProfileRepo);
    const result = await useCase.execute();

    expect(result).toEqual({
      id: 'u1',
      email: 'a@a.com',
      username: 'user1',
      role: 'student',
      fullName: 'Juan Perez', 
      bio: 'Hola mundo',
      avatarUrl: 'img-base64'
    });
  });
});