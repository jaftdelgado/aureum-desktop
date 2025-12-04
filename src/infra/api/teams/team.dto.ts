export interface TeamDTO {
  publicId: string;
  professorId: string | null;
  name: string;
  description?: string | null;
  teamPic?: string | null;
  accessCode: string;
  createdAt: string;
}
