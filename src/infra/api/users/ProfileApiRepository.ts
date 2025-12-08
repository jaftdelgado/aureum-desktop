import { client } from "@infra/api/http/client";
import type { PublicProfileDto } from "./profile.dto";
import { mapPublicProfileToDomain } from "./profile.mappers";
import { blobToBase64 } from "@core/utils/fileUtils";
import type { TeamMember } from "@domain/entities/TeamMember";
import type { ProfileRepository } from "@domain/repositories/ProfileRepository";
import type { UserProfileDTO } from "@infra/external/auth/auth.dto"; 
import { HttpError } from "@infra/api/http/client";
import type { RegisterData } from "@domain/entities/RegisterData";

export class ProfileApiRepository implements ProfileRepository {
  
  async getPublicProfile(userId: string): Promise<TeamMember | null> {
    try {
      const dto = await client.get<PublicProfileDto>(`/api/users/profiles/${userId}`);
      let avatarBase64: string | undefined = undefined;
      if (dto.profile_pic_id) { 
        try {
          const imageBlob = await client.getBlob(`/api/users/profiles/${userId}/avatar`);
          avatarBase64 = await blobToBase64(imageBlob);
        } catch (error) {
          console.warn(`Error fetching avatar for ${userId}`, error);
        }
      }

      const domainEntity = mapPublicProfileToDomain(dto);
      return {
        ...domainEntity,
        avatarUrl: avatarBase64 
      };
      
    } catch (error) {
      console.error(`Error fetching public profile for ${userId}:`, error);
      return null;
    }
  }

  async getProfile(authId: string): Promise<UserProfileDTO | null> {
    try {
      const profile = await client.get<UserProfileDTO>(`/api/users/profiles/${authId}`);
      
      if (profile && profile.profile_pic_id) {
        try {
          const imageBlob = await client.getBlob(`/api/users/profiles/${authId}/avatar`);
          const base64Image = await blobToBase64(imageBlob);
          profile.profile_pic_id = base64Image;
        } catch (imageError) {
          console.warn("No se pudo descargar avatar:", imageError);
        }
      }
      return profile;
    } catch (error) {
      console.warn(`Error fetching profile for ${authId}`, error);
      return null;
    }
  }

  async checkProfileExists(authId: string): Promise<boolean> {
    try {
      await client.get(`/api/users/profiles/${authId}`);
      return true;
    } catch (error: any) {
      if (error instanceof HttpError && error.status === 404) return false;
      throw error;
    }
  }

  async updateProfile(authId: string, data: { bio?: string }): Promise<void> {
    await client.patch(`/api/users/profiles/${authId}`, data);
  }

  async uploadAvatar(authId: string, file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);
    await client.post(`/api/users/profiles/${authId}/avatar`, formData);
  }

  async deleteAccount(authId: string): Promise<void> {
     await client.delete(`/api/users/profiles/${authId}`);
  }

  async createProfile(userId: string, data: RegisterData): Promise<void> {
    const roleToSend = data.accountType === "teacher" ? "professor" : "student";
    const fullName = `${data.firstName} ${data.lastName}`.trim();

    const profilePayload = {
      auth_user_id: userId,
      username: data.username,
      full_name: fullName,
      role: roleToSend,
    };

    await client.post("/api/users/profiles", profilePayload);
}
}