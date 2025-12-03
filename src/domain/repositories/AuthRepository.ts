// src/domain/repositories/AuthRepository.ts
import type { RegisterData } from "@infra/external/auth/AuthApiRepository";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";

export interface AuthRepository {
  login(email: string, password: string): Promise<LoggedInUser>;
  logout(): Promise<void>;
  getSession(): Promise<LoggedInUser | null>;
  register(data: RegisterData): Promise<void>;
  checkProfileExists(authId: string): Promise<boolean>;
}
