import type { PublicProfileDto } from "./profile.dto";
import type { TeamMember } from "@domain/entities/TeamMember"; 

export const mapPublicProfileToDomain = (dto: PublicProfileDto): TeamMember => {
  return {
    id: dto.auth_user_id, 
    name: dto.full_name || dto.username, 
    email: "", 
    role: dto.role,
    avatarUrl: undefined, 
  };
};