import React from "react";
import { Button } from "@core/ui/Button";
import { Icon } from "@iconify/react";

interface LessonCardProps {
  title: string;
  description: string;
  thumbnail: string;
  onPlay: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  title,
  description,
  thumbnail,
  onPlay,
}) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all hover:shadow-md">
      {/* Zona de Imagen Clickable */}
      <div 
        className="relative aspect-video w-full cursor-pointer overflow-hidden bg-muted"
        onClick={onPlay}
      >
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
          <Icon icon="mdi:play-circle" className="h-14 w-14 text-white drop-shadow-lg" />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-primaryText" title={title}>
          {title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-secondaryText" title={description}>
          {description}
        </p>
        
        <div className="mt-auto flex justify-end">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onPlay}
            iconLeft="mdi:play"
          >
            Ver Video
          </Button>
        </div>
      </div>
    </div>
  );
};