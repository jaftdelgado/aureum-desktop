import { describe, it, expect, vi } from 'vitest';
import { GetProfessorTeamsUseCase } from '@domain/use-cases/teams/GetProfessorTeamsUseCase';
import type { TeamsRepository } from '@domain/repositories/TeamsRepository';
import type { Team } from '@domain/entities/Team';

describe('GetProfessorTeamsUseCase', () => {
  it('debe retornar la lista de equipos del profesor', async () => {
    const mockTeams: Team[] = [
      { id: '1', publicId: 'pub-1', name: 'Curso A', professorId: 'prof-1', description: '', accessCode: 'ABC' },
      { id: '2', publicId: 'pub-2', name: 'Curso B', professorId: 'prof-1', description: '', accessCode: 'XYZ' }
    ];

    const mockRepo = {
      getTeamsByProfessor: vi.fn().mockResolvedValue(mockTeams),
    } as unknown as TeamsRepository;

    const useCase = new GetProfessorTeamsUseCase(mockRepo);
    const result = await useCase.execute('prof-1');

    expect(mockRepo.getTeamsByProfessor).toHaveBeenCalledWith('prof-1');
    expect(result).toEqual(mockTeams);
    expect(result).toHaveLength(2);
  });
});