// src/infra/api/auth/AuthApiRepository.ts
import { supabase } from "@infra/external/http/supabase";
import type { AuthRepository } from "@domain/repositories/AuthRepository";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";
import type { LoggedInUserDTO } from "@infra/external/auth/auth.dto";
import { mapUserDTOToLoggedInUser } from "@infra/external/auth/auth.mappers";

export class AuthApiRepository implements AuthRepository {
  async login(email: string, password: string): Promise<LoggedInUser> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("No se pudo iniciar sesión");

    const dto: LoggedInUserDTO = {
      id: data.user.id,
      email: data.user.email,
      created_at: data.user.created_at,
    };

    return mapUserDTOToLoggedInUser(dto);
  }

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async getSession(): Promise<LoggedInUser | null> {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;

    if (!user) return null;

    const dto: LoggedInUserDTO = {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    };

    return mapUserDTOToLoggedInUser(dto);
  }
}
