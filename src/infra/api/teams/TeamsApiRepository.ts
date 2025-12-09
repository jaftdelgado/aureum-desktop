import type { CreateTeamParams, TeamsRepository } from "@domain/repositories/TeamsRepository";
import type { Team } from "@domain/entities/Team";
import type { TeamMember } from "@domain/entities/TeamMember"; 
import { client } from "@infra/api/http/client"; 
import type { TeamDTO, TeamMembershipDto } from "./team.dto";
import { mapTeamDTOToEntity} from "./team.mappers";
import { ProfileApiRepository } from "@infra/api/users/ProfileApiRepository";
import { blobToBase64, compressImage } from "@core/utils/fileUtils";

export class TeamsApiRepository implements TeamsRepository {
  private profileRepo = new ProfileApiRepository();

  private async processTeams(dtos: TeamDTO[]): Promise<Team[]> {
    return Promise.all(
      dtos.map(async (dto) => {
        const team = mapTeamDTOToEntity(dto);

        if (dto.team_pic) {
          try {
            const imageBlob = await client.getBlob(`/api/courses/${dto.public_id}/image`);
            
            const compressedBlob = await compressImage(imageBlob, 400, 0.7);
            
            team.teamPic = await blobToBase64(compressedBlob);
            
          } catch (error) {
            console.warn(`Error optimizando imagen del equipo ${team.name}, usando URL original.`, error);
          }
        }
        return team;
      })
    );
  }

  async getTeamsByProfessor(professorId: string): Promise<Team[]> {
    const dtos = await client.get<TeamDTO[]>(
      `/api/courses/professor/${professorId}`
    );
    return this.processTeams(dtos);
  }

  async getTeamsByStudent(studentId: string): Promise<Team[]> {
    const dtos = await client.get<TeamDTO[]>(
      `/api/courses/student/${studentId}`
    );
    return this.processTeams(dtos);
  }

  async joinTeam(accessCode: string, studentId: string): Promise<void> {
    await client.post("/api/memberships/join", {
      access_code: accessCode,
      user_id: studentId, 
    });
  }

  async getTeamStudents(teamId: string): Promise<TeamMember[]> {
    try {
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
            } catch (innerError) {
              console.warn(`Fallo al procesar estudiante ${membership.userid}:`, innerError);
              return null;
            }
          })
        );

        return students.filter((s): s is TeamMember => s !== null);

    } catch (error) {
        console.error("Error cargando estudiantes del equipo:", error);
        return [];  
    }
  }

  async removeMember(teamId: string, userId: string): Promise<void> {
    await client.delete(`/api/courses/${teamId}/members/${userId}`);
  }

  async createTeam(params: CreateTeamParams): Promise<void> {
    const formData = new FormData();
    formData.append("professor_id", params.professorId);
    formData.append("name", params.name);
    formData.append("description", params.description);
    
    if (params.image) {
      formData.append("file", params.image);
    }

    await client.post("/api/courses", formData);
  }
}
