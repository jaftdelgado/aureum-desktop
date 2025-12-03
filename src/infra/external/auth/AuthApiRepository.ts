import { supabase } from "@infra/external/http/supabase";
import type { AuthRepository } from "@domain/repositories/AuthRepository";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";
import type { LoggedInUserDTO } from "@infra/external/auth/auth.dto";
import { mapUserDTOToLoggedInUser } from "@infra/external/auth/auth.mappers";

const GATEWAY_URL = "https://gateway-production.up.railway.app";

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
  
  async login(email: string, password: string): Promise<LoggedInUser> {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
      if (!data.user) throw new Error("No se pudo iniciar sesión");
      return mapUserDTOToLoggedInUser({ id: data.user.id, email: data.user.email, created_at: data.user.created_at });
  }

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  async getSession(): Promise<LoggedInUser | null> {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (!user) return null;
    return mapUserDTOToLoggedInUser({ id: user.id, email: user.email, created_at: user.created_at });
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

    const { data: session } = await supabase.auth.getSession();
    const token = session.session?.access_token;

    const response = await fetch(`${GATEWAY_URL}/api/users/profiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify(profilePayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error creando perfil: ${errorText}`);
    }
  }
}