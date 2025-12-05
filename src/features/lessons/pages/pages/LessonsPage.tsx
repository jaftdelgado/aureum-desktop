import React from "react";
import { PageHeader } from "@core/components/PageHeader";
import { LessonCard } from "../components/LessonCard";
import { VideoPlayerDialog } from "../components/VideoPlayerDialog";
import { useLessonsPage } from "../hooks/useLessonsPage";

const LessonsPage: React.FC = () => {
  const { 
    lessons, 
    isLoading, 
    selectedLesson, 
    setSelectedLesson 
  } = useLessonsPage();

  return (
    <div className="flex h-full w-full flex-col">
      <PageHeader
        title="Biblioteca de Lecciones"
        description="Aprende trading e inversiones con nuestros videos exclusivos."
      />

      <div className="flex-1 overflow-y-auto p-page-x py-6">
        {isLoading ? (
          <div className="flex h-60 flex-col items-center justify-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primaryBtn border-t-transparent" />
            <p className="text-sm text-secondaryText">Cargando lecciones...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-10">
            {lessons.length === 0 && (
              <div className="col-span-full py-10 text-center opacity-60">
                <p>No se encontraron lecciones disponibles.</p>
              </div>
            )}

            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                title={lesson.title}
                description={lesson.description}
                // Placeholder oscuro si no hay imagen
                thumbnail={lesson.thumbnailUrl || "https://placehold.co/600x400/18181b/FFFFFF/png?text=Sin+Imagen"}
                onPlay={() => setSelectedLesson(lesson)}
              />
            ))}
          </div>
        )}
      </div>

      <VideoPlayerDialog
        isOpen={!!selectedLesson}
        lesson={selectedLesson}
        onClose={() => setSelectedLesson(null)}
      />
    </div>
  );
};

export default LessonsPage;