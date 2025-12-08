import type { TeamsRepository } from "../../repositories/TeamsRepository";
import type { StudentDto } from "@infra/api/teams/team.dto";

export class GetTeamMembersUseCase {
  private readonly teamsRepository;
  constructor(teamsRepository: TeamsRepository) {
    this.teamsRepository=teamsRepository;
  }

  async execute(teamId: string): Promise<StudentDto[]> {
    return await this.teamsRepository.getTeamStudents(teamId);
  }
}