import { useState, useEffect } from "react";
import type { Lesson } from "@domain/entities/Lesson"; 
import { LessonsRepository } from "@infra/api/lessons/LessonsRepository";

export const useLessonsPage = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      setIsLoading(true);
      const data = await LessonsRepository.getAll();
      setLessons(data);
    } catch (error) {
      console.error("Error cargando lecciones:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    lessons,
    isLoading,
    selectedLesson,
    setSelectedLesson,
  };
};