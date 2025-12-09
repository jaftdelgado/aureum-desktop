import { describe, it, expect, vi } from 'vitest';
import { UpdateProfileUseCase } from '@domain/use-cases/profile/UpdateProfileUseCase';
import type { ProfileRepository } from '@domain/repositories/ProfileRepository';

vi.mock('@core/utils/fileUtils', () => ({
  compressImage: vi.fn().mockResolvedValue(new Blob(['fake-image'], { type: 'image/jpeg' })),
  blobToBase64: vi.fn().mockResolvedValue('base64-mock-string')
}));

describe('UpdateProfileUseCase', () => {
  it('debe llamar al repositorio con los datos actualizados (solo Bio)', async () => {
    const mockRepo = {
      updateProfile: vi.fn().mockResolvedValue(undefined),
      uploadAvatar: vi.fn().mockResolvedValue(undefined), // ✅ Agregado para evitar error si se llamara
    } as unknown as ProfileRepository;

    const useCase = new UpdateProfileUseCase(mockRepo);
    
    await useCase.execute('user-123', 'Old Bio', 'New Bio Updated', null);

    expect(mockRepo.updateProfile).toHaveBeenCalledWith('user-123', {
      bio: 'New Bio Updated'
    });
    expect(mockRepo.uploadAvatar).not.toHaveBeenCalled();
  });

  it('debe manejar la actualización con archivo de imagen', async () => {
    const mockRepo = {
      updateProfile: vi.fn().mockResolvedValue(undefined),
      uploadAvatar: vi.fn().mockResolvedValue(undefined), // ✅ Agregado: Mock de la función faltante
    } as unknown as ProfileRepository;

    const useCase = new UpdateProfileUseCase(mockRepo);
    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' });

    await useCase.execute('user-123', 'Bio', 'Bio', file);

    expect(mockRepo.uploadAvatar).toHaveBeenCalledTimes(1);
    
    const callArgs = (mockRepo.uploadAvatar as any).mock.calls[0];
    expect(callArgs[0]).toBe('user-123');
    expect(callArgs[1]).toBeInstanceOf(File);
  });
});