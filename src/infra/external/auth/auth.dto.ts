// src/infra/api/auth/auth.dto.ts
export interface LoggedInUserDTO {
  id: string;
  email?: string | null;
  created_at: string;
}

export interface UserProfileDTO {
  id: string; 
  auth_user_id: string;
  username: string;
  full_name: string;
  role: "student" | "professor";
  avatar_url?: string;
  created_at?: string;
}