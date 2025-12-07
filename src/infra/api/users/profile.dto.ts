export interface PublicProfileDto {
  profile_id: number;
  auth_user_id: string;
  username: string;
  full_name: string; 
  bio?: string;
  profile_pic_id?: string; 
  role: "student" | "professor";
}