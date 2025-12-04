import type { TeamsRepository } from "@domain/repositories/TeamsRepository";
import type { Team } from "@domain/entities/Team";
import { client } from "@infra/api/http/client";

import type { TeamDTO } from "./team.dto";
import { mapTeamDTOToEntity } from "./team.mappers";

export class TeamsApiRepository implements TeamsRepository {
  async getTeamsByProfessor(professorId: string): Promise<Team[]> {
    const teams = await client.get<TeamDTO[]>(
      `/api/courses/professor/${professorId}`
    );
    return teams.map(mapTeamDTOToEntity);
  }

  async getTeamsByStudent(studentId: string): Promise<Team[]> {
    const teams = await client.get<TeamDTO[]>(
      `/api/courses/student/${studentId}`
    );
    return teams.map(mapTeamDTOToEntity);
  }
}
