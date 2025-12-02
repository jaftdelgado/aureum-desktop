// src/infra/api/auth/auth.dto.ts
export interface LoggedInUserDTO {
  id: string;
  email?: string | null;
  created_at: string;
}
