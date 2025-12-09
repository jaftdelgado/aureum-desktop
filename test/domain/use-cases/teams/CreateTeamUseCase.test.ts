import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateTeamUseCase } from '@domain/use-cases/teams/CreateTeamUseCase';
import type { TeamsRepository } from '@domain/repositories/TeamsRepository';

vi.mock('@core/utils/fileUtils', () => ({
  compressImage: vi.fn().mockResolvedValue(new Blob(['compressed_content'], { type: 'image/jpeg' }))
}));

describe('CreateTeamUseCase', () => {
  let useCase: CreateTeamUseCase;
  let mockRepo: TeamsRepository;

  beforeEach(() => {
    mockRepo = {
      createTeam: vi.fn(),
      getTeamsByProfessor: vi.fn(),
      getTeamsByStudent: vi.fn(),
      joinTeam: vi.fn(),
      getTeamMembers: vi.fn(),
      removeMember: vi.fn(),
      getTeamAssets: vi.fn(), 
      syncTeamAssets: vi.fn() 
    } as unknown as TeamsRepository;

    useCase = new CreateTeamUseCase(mockRepo);
  });

  it('debe llamar al repositorio con la imagen comprimida si se proporciona una', async () => {
    const file = new File(['original'], 'test.png', { type: 'image/png' });
    const params = {
      professorId: 'prof-123',
      name: 'Curso de Prueba',
      description: 'Descripción del curso',
      image: file
    };

    await useCase.execute(params);

    expect(mockRepo.createTeam).toHaveBeenCalledTimes(1);

    const callArgs = (mockRepo.createTeam as any).mock.calls[0][0];
    
    expect(callArgs.image).toBeInstanceOf(File);
    expect(callArgs.name).toBe('Curso de Prueba');
  });

  it('debe funcionar correctamente sin imagen', async () => {
    const params = {
      professorId: 'prof-123',
      name: 'Curso Sin Imagen',
      description: 'Desc',
      image: null
    };

    await useCase.execute(params);

    expect(mockRepo.createTeam).toHaveBeenCalledWith(params);
  });
});