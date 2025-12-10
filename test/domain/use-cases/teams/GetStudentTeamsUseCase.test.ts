import { describe, it, expect, vi } from 'vitest';
import { GetStudentTeamsUseCase } from '@domain/use-cases/teams/GetStudentTeamsUseCase';
import type { TeamsRepository } from '@domain/repositories/TeamsRepository';
import type { Team } from '@domain/entities/Team';

describe('GetStudentTeamsUseCase', () => {
  it('debe devolver los equipos donde el estudiante está inscrito', async () => {
    const mockTeams: Team[] = [
        { 
            publicId: 't1', 
            name: 'Curso X', 
            professorId: 'prof-1', 
            accessCode: 'A', 
            createdAt: new Date(), 
            teamPic: null 
        }
    ];

    const mockRepo = {
      getTeamsByStudent: vi.fn().mockResolvedValue(mockTeams),
    } as unknown as TeamsRepository;

    const useCase = new GetStudentTeamsUseCase(mockRepo);
    const result = await useCase.execute('student-1');

    expect(mockRepo.getTeamsByStudent).toHaveBeenCalledWith('student-1');
    expect(result).toHaveLength(1);
  });
});