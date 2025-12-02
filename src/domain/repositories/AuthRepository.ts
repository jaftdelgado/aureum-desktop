// src/domain/repositories/AuthRepository.ts
import type { LoggedInUser } from "@domain/entities/LoggedInUser";

export interface AuthRepository {
  login(email: string, password: string): Promise<LoggedInUser>;
  logout(): Promise<void>;
  getSession(): Promise<LoggedInUser | null>;
}
