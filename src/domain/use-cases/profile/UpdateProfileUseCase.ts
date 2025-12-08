import type { ProfileRepository } from "@domain/repositories/ProfileRepository";
import { compressImage } from "@core/utils/fileUtils";

export class UpdateProfileUseCase {
  private readonly profileRepository;
  constructor(profileRepository: ProfileRepository) {
    this.profileRepository=profileRepository;
  }

  async execute(
    userId: string, 
    currentBio: string | undefined, 
    newBio: string, 
    newFile: File | null
  ): Promise<void> {
    if (newBio !== currentBio) {
      await this.profileRepository.updateProfile(userId, { bio: newBio });
    }

    if (newFile) {
      const compressedBlob = await compressImage(newFile, 500, 0.8);
      
      const fileToSend = new File(
        [compressedBlob], 
        newFile.name, 
        { type: "image/jpeg" }
      );

      await this.profileRepository.uploadAvatar(userId, fileToSend);
    }
  }
}