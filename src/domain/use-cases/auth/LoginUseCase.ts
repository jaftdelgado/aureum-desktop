import type { AuthRepository } from "@domain/repositories/AuthRepository";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";

export class LoginUseCase {
  private authRepo: AuthRepository;

  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  async execute(email: string, password: string): Promise<LoggedInUser> {
    return await this.authRepo.login(email, password);
  }
}
