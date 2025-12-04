import type { TeamDTO } from "@infra/api/teams/team.dto";
import type { Team } from "@domain/entities/Team";
import { ENV } from "@app/config/env";

export const mapTeamDTOToEntity = (dto: TeamDTO): Team => {
  const imageUrl = dto.team_pic 
    ? `${ENV.API_GATEWAY_URL}/api/courses/${dto.public_id}/image`
    : undefined;

  return {
    publicId: dto.public_id,
    professorId: dto.professor_id,
    name: dto.name,
    description: dto.description ?? undefined,
    teamPic: imageUrl, 
    accessCode: dto.access_code,
    createdAt: new Date(dto.created_at),
  };
};