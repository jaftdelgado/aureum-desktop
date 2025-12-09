import { describe, it, expect, vi } from 'vitest';
import { GetTeamMembersUseCase } from '@domain/use-cases/teams/GetTeamMembersUseCase';
import type { TeamsRepository } from '@domain/repositories/TeamsRepository';
import type { TeamMember } from '@domain/entities/TeamMember';

describe('GetTeamMembersUseCase', () => {
  it('debe obtener la lista de estudiantes de un equipo', async () => {
    const mockMembers: TeamMember[] = [
      { id: 's1', name: 'Estudiante 1', role: 'student', email: 's1@test.com' },
      { id: 's2', name: 'Estudiante 2', role: 'student', email: 's2@test.com' }
    ];

    const mockRepo = {
      getTeamStudents: vi.fn().mockResolvedValue(mockMembers),
    } as unknown as TeamsRepository;

    const useCase = new GetTeamMembersUseCase(mockRepo);
    const result = await useCase.execute('team-abc');

    expect(mockRepo.getTeamStudents).toHaveBeenCalledWith('team-abc');
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Estudiante 1');
  });
});