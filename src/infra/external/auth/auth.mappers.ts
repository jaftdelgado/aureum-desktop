import type { LoggedInUserDTO } from "@infra/external/auth/auth.dto";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";

export const mapUserDTOToLoggedInUser = (
  dto: LoggedInUserDTO
): LoggedInUser => ({
  id: dto.id,
  email: dto.email ?? "",
  createdAt: dto.created_at,
});
