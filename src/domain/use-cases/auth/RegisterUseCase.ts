import type { AuthRepository } from "../../repositories/AuthRepository";
import type { RegisterData } from "@infra/external/auth/AuthApiRepository"; 

export class RegisterUseCase {
  private readonly authRepository;
  constructor(authRepository: AuthRepository) {
    this.authRepository=authRepository;
  }

  async execute(data: RegisterData): Promise<void> {
    return await this.authRepository.register(data);
  }
}