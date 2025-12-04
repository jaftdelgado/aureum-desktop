import type { TeamDTO } from "@infra/api/teams/team.dto";
import type { Team } from "@domain/entities/Team";

export const mapTeamDTOToEntity = (dto: TeamDTO): Team => ({
  publicId: dto.publicId,
  professorId: dto.professorId,
  name: dto.name,
  description: dto.description ?? undefined,
  teamPic: dto.teamPic ?? undefined,
  accessCode: dto.accessCode,
  createdAt: new Date(dto.createdAt),
});
