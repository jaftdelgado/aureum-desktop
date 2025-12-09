import type { TeamsRepository, CreateTeamParams } from "@domain/repositories/TeamsRepository";
import { compressImage } from "@core/utils/fileUtils";

export class CreateTeamUseCase {
  private readonly teamsRepository;
  constructor(teamsRepository: TeamsRepository) {
    this.teamsRepository=teamsRepository;
  }

  async execute(params: CreateTeamParams): Promise<void> {
    let imageToSend = params.image;

    if (imageToSend) {
      try {
        const compressedBlob = await compressImage(imageToSend, 800, 0.7); // 800px es bueno para cover de curso
        imageToSend = new File([compressedBlob], imageToSend.name, {
          type: "image/jpeg",
        });
      } catch (error) {
        console.warn("Falló la compresión de imagen, enviando original:", error);
      }
    }

    await this.teamsRepository.createTeam({
      ...params,
      image: imageToSend,
    });
  }
}