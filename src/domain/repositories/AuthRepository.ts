import type { SocialUser } from "../entities/SocialUser";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";

export interface AuthRepository {
  login(email: string, password: string): Promise<LoggedInUser>;
  logout(): Promise<void>;
  getSession(): Promise<LoggedInUser | null>;
  register(data: any): Promise<void>;
  checkProfileExists(authId: string): Promise<boolean>;
  checkSessionAlive(): Promise<boolean>;
  getPendingSocialUser(): Promise<SocialUser | null>;
}
