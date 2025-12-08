import type { RegisterData } from "@domain/entities/RegisterData";
import type { TeamMember } from "@domain/entities/TeamMember";
import type { UserProfileDTO } from "@infra/external/auth/auth.dto";

export interface ProfileRepository {
  getPublicProfile(userId: string): Promise<TeamMember | null>;
  getProfile(userId: string): Promise<UserProfileDTO | null>;  
  checkProfileExists(authId: string): Promise<boolean>;
  updateProfile(authId: string, data: { bio?: string }): Promise<void>;
  uploadAvatar(authId: string, file: File): Promise<void>;
  deleteAccount(authId: string): Promise<void>;
  createProfile(userId: string, data: RegisterData): Promise<void>;
}