import type { AuthRepository } from "@domain/repositories/AuthRepository";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";

export class GetSessionUseCase {
  private authRepo: AuthRepository;

  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  async execute(): Promise<LoggedInUser | null> {
    return await this.authRepo.getSession();
  }
}
