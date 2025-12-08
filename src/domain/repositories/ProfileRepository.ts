import type { TeamMember } from "@domain/entities/TeamMember";

export interface ProfileRepository {
  getPublicProfile(userId: string): Promise<TeamMember | null>;
}