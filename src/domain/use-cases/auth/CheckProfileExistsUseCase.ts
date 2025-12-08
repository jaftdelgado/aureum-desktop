import type { AuthRepository } from "../../repositories/AuthRepository";

export class CheckProfileExistsUseCase {
  private readonly authRepository;
  constructor(authRepository: AuthRepository) {
    this.authRepository=authRepository;
  }

  async execute(authId: string): Promise<boolean> {
    return await this.authRepository.checkProfileExists(authId);
  }
}