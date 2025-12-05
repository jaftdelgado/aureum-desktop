import React, { useRef } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@core/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
 
} from "@core/components/Dialog";
import type { Lesson } from "@domain/entities/Lesson";
import { LessonsRepository } from "@infra/api/lessons/LessonsRepository";

interface VideoPlayerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson | null;
}

export const VideoPlayerDialog: React.FC<VideoPlayerDialogProps> = ({
  isOpen,
  onClose,
  lesson,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!lesson) return null;

  const handleSkip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="gap-0 overflow-hidden bg-black p-0 sm:max-w-4xl border-zinc-800">
        
        <DialogHeader className="flex flex-row items-center justify-between border-b border-white/10 bg-zinc-900 p-4">
          <DialogTitle className="text-white text-lg font-medium">
            {lesson.title}
          </DialogTitle>
          
          <Button 
            variant="icon" 
            size="sm" 
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-white/10"
          >
            <Icon icon="mdi:close" width={24} height={24} />
          </Button>
        </DialogHeader>

        <div className="relative flex w-full flex-col bg-black">
            <video
                ref={videoRef}
                controls
                autoPlay
                className="max-h-[60vh] w-full"
                src={LessonsRepository.getVideoUrl(lesson.id)}
            >
                Tu navegador no soporta video HTML5.
            </video>

            <div className="flex items-center justify-center gap-4 bg-zinc-900/50 p-2 border-b border-white/10 backdrop-blur-sm">
                <Button 
                    variant="secondary" 
                    size="sm"
                    className="bg-white/10 text-white hover:bg-white/20 border-0"
                    onClick={() => handleSkip(-10)}
                    iconLeft="mdi:rewind-10"
                >
                    -10s
                </Button>
                
                <Button 
                    variant="secondary" 
                    size="sm"
                    className="bg-white/10 text-white hover:bg-white/20 border-0"
                    onClick={() => handleSkip(10)}
                    iconRight="mdi:fast-forward-10"
                >
                    +10s
                </Button>
            </div>
        </div>
        
        <div className="max-h-32 overflow-y-auto bg-zinc-900 p-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Descripción
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              {lesson.description}
            </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};