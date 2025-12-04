import type { Team } from "@domain/entities/Team";

export interface TeamsRepository {
  getTeamsByProfessor(professorId: string): Promise<Team[]>;
  getTeamsByStudent(studentId: string): Promise<Team[]>;
}
