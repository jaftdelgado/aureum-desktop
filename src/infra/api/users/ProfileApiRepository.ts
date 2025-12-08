import { client } from "@infra/api/http/client";
import type { PublicProfileDto } from "./profile.dto";
import { mapPublicProfileToDomain } from "./profile.mappers";
import { blobToBase64 } from "@core/utils/fileUtils";
import type { TeamMember } from "@domain/entities/TeamMember";
import type { ProfileRepository } from "@domain/repositories/ProfileRepository";

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
}