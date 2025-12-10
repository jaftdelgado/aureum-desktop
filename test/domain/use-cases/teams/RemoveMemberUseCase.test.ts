import { describe, it, expect, vi } from 'vitest';
import { RemoveMemberUseCase } from '@domain/use-cases/teams/RemoveMemberUseCase';
import type { TeamsRepository } from '@domain/repositories/TeamsRepository';

describe('RemoveMemberUseCase', () => {
  it('debe eliminar un miembro del equipo', async () => {
    const mockRepo = {
      removeMember: vi.fn().mockResolvedValue(undefined),
    } as unknown as TeamsRepository;

    const useCase = new RemoveMemberUseCase(mockRepo);
    await useCase.execute('team-1', 'student-1');

    expect(mockRepo.removeMember).toHaveBeenCalledWith('team-1', 'student-1');
  });
});