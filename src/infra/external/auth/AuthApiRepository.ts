import { supabase } from "@infra/external/http/supabase";
import type { AuthRepository } from "@domain/repositories/AuthRepository";
import type { LoggedInUser } from "@domain/entities/LoggedInUser";
import { mapUserDTOToLoggedInUser, mapSessionToUser} from "@infra/external/auth/auth.mappers";
import type { SocialUser } from "@domain/entities/SocialUser";
import type { RegisterData } from "@domain/entities/RegisterData";

const PRESERVED_KEYS = ["theme", "i18nextLng"];

export class AuthApiRepository implements AuthRepository {

  async login(email: string, password: string): Promise<LoggedInUser> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("No se pudo iniciar sesión");

    return mapUserDTOToLoggedInUser({
      id: data.user.id,
      email: data.user.email,
      created_at: data.user.created_at,
      avatar_url: data.user.user_metadata?.avatar_url || null,
    }, undefined); 
  }

  async logout(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
    } catch (error) {
      console.warn("Error al cerrar sesión en Supabase, limpiando localmente...", error);
    } finally {
      if (typeof sessionStorage !== "undefined") {
        const existingReason = sessionStorage.getItem("logout_reason");
        
        sessionStorage.clear();
        
        if (existingReason) {
          sessionStorage.setItem("logout_reason", existingReason);
        }
      }
      if (typeof localStorage !== "undefined") {
        const preferences: Record<string, string | null> = {};
        PRESERVED_KEYS.forEach(key => {
          preferences[key] = localStorage.getItem(key);
        });

        localStorage.clear();

        PRESERVED_KEYS.forEach(key => {
          if (preferences[key]) {
            localStorage.setItem(key, preferences[key]!);
          }
        });
      }
    }
  }

  async getSession(): Promise<LoggedInUser | null> {
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;
  if (!user) return null;

  return mapUserDTOToLoggedInUser({
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      avatar_url: user.user_metadata?.avatar_url || null,
  }, undefined);
}

  async register(data: RegisterData): Promise<string> { 
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
      if (!sessionData.user) throw new Error("No hay sesión activa");
      userId = sessionData.user.id;
    }
    
    return userId;  
}

  async checkSessionAlive(): Promise<boolean> {
    try {
      const { data, error } = await supabase.rpc('is_session_alive');
      if (error || data === false) return false;
      return true;
    } catch (error) {
      return false;
    }
  }

  async getPendingSocialUser(): Promise<SocialUser | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;

      const email = user.email || "";
      const fullName = user.user_metadata?.full_name || user.user_metadata?.name || "";
      
      const nameParts = fullName.split(" ").filter(Boolean);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      return { email, firstName, lastName };
    } catch (error) {
      console.warn("Error obteniendo datos de usuario social:", error);
      return null;
    }
  }

  async loginWithGoogle(): Promise<void> {
    const isElectron = typeof window !== 'undefined' && !!(window as any).electronAPI;
    let redirectTo = window.location.origin;     
    if (isElectron) {
        redirectTo = "aureum://auth/callback";
    } else if (import.meta.env.DEV) {
        redirectTo = "http://localhost:5173/";
    }
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { 
        redirectTo,
        skipBrowserRedirect: true, 
      },
    });
    if (error) throw new Error(error.message);
    if (data?.url) {
        if (isElectron) {
            window.open(data.url, '_blank'); 
        } else {
            window.location.href = data.url;
        }
    }
  }

  onAuthStateChange(callback: (user: LoggedInUser | null) => void): () => void {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'TOKEN_REFRESHED') return;
      if (session?.user) {
        const user = mapSessionToUser(session.user);
        callback(user);
      } else {
        callback(null);
      }
    });

    return () => subscription.unsubscribe();
  }

  async setSession(accessToken: string, refreshToken: string): Promise<void> {
    const { error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken
    });
    if (error) throw new Error(error.message);
  }

  async deleteAuthUser(): Promise<void> {
    const { error } = await supabase.rpc('delete_own_user');
    
    if (error) {
      console.error("Error crítico: No se pudo hacer rollback del usuario", error);
      throw new Error("No se pudo revertir la creación del usuario.");
    }
    
    await this.logout();
  }
}
