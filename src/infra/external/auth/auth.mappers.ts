import type { LoggedInUserDTO, UserProfileDTO } from "@infra/external/auth/auth.dto";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";

export const mapUserDTOToLoggedInUser = (
  dto: LoggedInUserDTO,
  profileDto?: UserProfileDTO
): LoggedInUser => ({
  id: dto.id,
  email: dto.email ?? "",
  createdAt: dto.created_at,
  username: profileDto?.username,
  fullName: profileDto?.full_name,
  bio: profileDto?.bio,
  role: profileDto?.role,
  avatarUrl: profileDto?.profile_pic_id || dto.avatar_url || undefined,
});
