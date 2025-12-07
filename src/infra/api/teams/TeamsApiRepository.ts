import type { TeamsRepository } from "@domain/repositories/TeamsRepository";
import type { Team } from "@domain/entities/Team";
import type { TeamMember } from "@domain/entities/TeamMember"; 
import { client } from "@infra/api/http/client"; 
import type { TeamDTO, TeamMembershipDto } from "./team.dto";
import { mapTeamDTOToEntity} from "./team.mappers";
import { ProfileApiRepository } from "@infra/api/users/ProfileApiRepository"; // 👈 Importar

export class TeamsApiRepository implements TeamsRepository {
  private profileRepo = new ProfileApiRepository();

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

  async joinTeam(accessCode: string, studentId: string): Promise<void> {
    await client.post("/api/memberships/join", {
      access_code: accessCode,
      user_id: studentId, 
    });
  }

  async getTeamStudents(teamId: string): Promise<TeamMember[]> {
    const memberships = await client.get<TeamMembershipDto[]>(
      `/api/courses/${teamId}/students`
    );
    const students = await Promise.all(
      memberships.map(async (membership): Promise<TeamMember | null> => {
        try {
          const profile = await this.profileRepo.getPublicProfile(membership.userid);

          if (!profile) return null;
          return {
            ...profile,
            id: membership.userid, 
          };
        } catch (error) {
          console.warn(`No se pudo cargar perfil para ${membership.userid}`);
          return null;
        }
      })
    );

    return students.filter((s): s is TeamMember => s !== null);
  }

  async removeMember(teamId: string, userId: string): Promise<void> {
    await client.delete(`/api/courses/${teamId}/members/${userId}`);
  }
}
