import { AuthApiRepository } from "@infra/external/auth/AuthApiRepository";
import { ProfileApiRepository } from "@infra/api/users/ProfileApiRepository";
import { TeamsApiRepository } from "@infra/api/teams/TeamsApiRepository";

class DIContainer {
  private static _authRepository: AuthApiRepository;
  private static _profileRepository: ProfileApiRepository;
  private static _teamsRepository: TeamsApiRepository;

  static get authRepository() {
    if (!this._authRepository) {
      this._authRepository = new AuthApiRepository();
    }
    return this._authRepository;
  }

  static get profileRepository() {
    if (!this._profileRepository) {
      this._profileRepository = new ProfileApiRepository();
    }
    return this._profileRepository;
  }

  static get teamsRepository() {
    if (!this._teamsRepository) {
      this._teamsRepository = new TeamsApiRepository();
    }
    return this._teamsRepository;
  }
}

export const DI = DIContainer;