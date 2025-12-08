import { AuthApiRepository } from "@infra/external/auth/AuthApiRepository";
import { ProfileApiRepository } from "@infra/api/users/ProfileApiRepository";

class DIContainer {
  private static _authRepository: AuthApiRepository;
  private static _profileRepository: ProfileApiRepository;

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
}

export const DI = DIContainer;