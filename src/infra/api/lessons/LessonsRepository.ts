import { client } from "@infra/api/http/client";
import { ENV } from "@app/config/env";
import type { Lesson } from "@domain/entities/Lesson"; 

interface LessonDTO {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
}

export const LessonsRepository = {
  getAll: async (): Promise<Lesson[]> => {
    const response = await client.get<LessonDTO[]>("/api/lessons");
    
    return response.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      thumbnailUrl: item.thumbnail 
        ? `data:image/jpeg;base64,${item.thumbnail}` 
        : null
    }));
  },

  getVideoUrl: (lessonId: string): string => {
    return `${ENV.API_GATEWAY_URL}/api/lessons/${lessonId}/video`;
  }
};