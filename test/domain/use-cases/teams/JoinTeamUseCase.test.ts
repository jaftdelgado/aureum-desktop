import { describe, it, expect, vi } from 'vitest';
import { JoinTeamUseCase } from '@domain/use-cases/teams/JoinTeamUseCase';
import type { TeamsRepository } from '@domain/repositories/TeamsRepository';

describe('JoinTeamUseCase', () => {
  it('debe permitir unirse a un equipo con un código válido', async () => {
    const mockRepo = {
      joinTeam: vi.fn().mockResolvedValue(true),
    } as unknown as TeamsRepository;

    const useCase = new JoinTeamUseCase(mockRepo);
    await useCase.execute('CODE123', 'student-1');

    expect(mockRepo.joinTeam).toHaveBeenCalledWith('CODE123', 'student-1');
  });

  it('debe lanzar error si el repositorio falla (ej: código inválido)', async () => {
    const mockRepo = {
      joinTeam: vi.fn().mockRejectedValue(new Error('Código inválido')),
    } as unknown as TeamsRepository;

    const useCase = new JoinTeamUseCase(mockRepo);

    await expect(useCase.execute('BAD_CODE', 'student-1'))
      .rejects
      .toThrow('Código inválido');
  });
});