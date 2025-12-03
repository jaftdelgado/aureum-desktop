import { supabase } from "@infra/external/http/supabase";
import type { AuthRepository } from "@domain/repositories/AuthRepository";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";
import { httpClient } from "@infra/external/http/client";
import { mapUserDTOToLoggedInUser } from "@infra/external/auth/auth.mappers";
import type { LoggedInUserDTO, UserProfileDTO } from "@infra/external/auth/auth.dto";
import { HttpError } from "@infra/external/http/client";

export interface RegisterData {
  email: string;
  password?: string;
  username: string;
  firstName: string;
  lastName: string;
  accountType: "student" | "teacher";
  isGoogle?: boolean;
}

export class AuthApiRepository implements AuthRepository {
  
  private async fetchProfile(authId: string): Promise<UserProfileDTO | undefined> {
    try {
      const profile = await httpClient.get<UserProfileDTO>(`/api/users/profiles/${authId}`);
      return profile;
    } catch (error) {
      console.warn(`No se pudo cargar el perfil para ${authId}`, error);
      return undefined;
    }
  }

  async login(email: string, password: string): Promise<LoggedInUser> {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw new Error(error.message);
      if (!data.user) throw new Error("No se pudo iniciar sesión");

      const authDto: LoggedInUserDTO = {
        id: data.user.id,
        email: data.user.email,
        created_at: data.user.created_at,
      };

      const profileDto = await this.fetchProfile(data.user.id);
      
      return mapUserDTOToLoggedInUser(authDto, profileDto);
  }

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async getSession(): Promise<LoggedInUser | null> {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;

    if (!user) return null;

    const authDto: LoggedInUserDTO = {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    };

    const profileDto = await this.fetchProfile(user.id);

    return mapUserDTOToLoggedInUser(authDto, profileDto);
  }

  async register(data: RegisterData): Promise<void> {
    let userId = "";

    if (!data.isGoogle) {
      if (!data.password) throw new Error("Password requerido");
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) throw new Error(error.message);
      if (!authData.user) throw new Error("Error al crear usuario en Auth");
      userId = authData.user.id;
    } else {
      const { data: sessionData } = await supabase.auth.getUser();
      if (!sessionData.user) throw new Error("No hay sesión de Google activa");
      userId = sessionData.user.id;
    }

    const roleToSend = data.accountType === "teacher" ? "professor" : "student";
    const fullName = `${data.firstName} ${data.lastName}`.trim();

    const profilePayload = {
      auth_user_id: userId,
      username: data.username,
      full_name: fullName,
      role: roleToSend,
    };

    await httpClient.post("/api/users/profiles", profilePayload);
  }

  async checkProfileExists(authId: string): Promise<boolean> {
    try {
      await httpClient.get(`/api/users/profiles/${authId}`);
      return true;
    } catch (error: any) {
      
      if (error instanceof HttpError && error.status === 404) {
        return false;
      }
      return false;
    }
  }
}