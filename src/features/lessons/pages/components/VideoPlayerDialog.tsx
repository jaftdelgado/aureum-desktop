import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
// Importación del cliente local corregida
import { lessonsClient } from "@features/lessons/pages/api/client";

interface VideoPlayerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson | null;
}

const formatTime = (time: number) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const VideoPlayerDialog: React.FC<VideoPlayerDialogProps> = ({
  isOpen,
  onClose,
  lesson,
}) => {
  const { t } = useTranslation("lessons");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Estado para la URL segura del video (blob)
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    let isActive = true;
    let currentBlobUrl: string | null = null;

    const fetchVideoSecurely = async () => {
      if (!lesson || !isOpen) return;

      try {
        setIsLoading(true);
        setVideoSrc(null); 

        const endpointUrl = LessonsRepository.getVideoUrl(lesson.id);
        
        const blobUrl = await lessonsClient.fetchVideoBlob(endpointUrl);
        
        if (isActive) {
          currentBlobUrl = blobUrl;
          setVideoSrc(blobUrl);
        }
      } catch (error) {
        console.error("Error cargando el video:", error);
        setIsLoading(false);
      }
    };

    fetchVideoSecurely();

    return () => {
      isActive = false;
      if (currentBlobUrl) {
        URL.revokeObjectURL(currentBlobUrl);
      }
    };
  }, [lesson, isOpen]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleSkip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const onTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const onLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  };

  if (!lesson) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        showCloseButton={false} 
        className="gap-0 overflow-hidden bg-black p-0 sm:max-w-4xl border-zinc-800 shadow-2xl"
      >
        <div ref={containerRef} className="relative flex flex-col bg-black group w-full h-full">
          
          {!isFullscreen && (
            <DialogHeader className="flex flex-row items-center justify-between border-b border-white/10 bg-zinc-900/90 p-4 backdrop-blur-md absolute top-0 w-full z-20">
              <div className="flex flex-col">
                <DialogTitle className="text-white text-lg font-medium tracking-wide drop-shadow-md">
                  {lesson.title}
                </DialogTitle>
                <span className="text-xs text-zinc-400">
                  {t("player.playingNow")}
                </span>
              </div>
              
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={onClose}
                className="bg-white/10 text-white hover:bg-red-500/80 hover:text-white border-0 transition-colors backdrop-blur-md"
              >
                <Icon icon="mdi:close" width={20} height={20} />
                <span className="ml-1 text-xs font-medium hidden sm:inline">
                  {t("player.close")}
                </span>
              </Button>
            </DialogHeader>
          )}

          <div className="relative flex-1 flex items-center justify-center bg-black min-h-[300px]">
              {videoSrc && (
                <video
                    ref={videoRef}
                    controls={false}
                    autoPlay
                    className="w-full h-full max-h-[60vh] object-contain cursor-pointer"
                    src={videoSrc}
                    onClick={togglePlay}
                    onTimeUpdate={onTimeUpdate}
                    onLoadedMetadata={onLoadedMetadata}
                    onLoadStart={() => setIsLoading(true)}
                    onWaiting={() => setIsLoading(true)}
                    onSeeking={() => setIsLoading(true)}
                    onSeeked={() => setIsLoading(false)}
                    onCanPlay={() => setIsLoading(false)}
                    onPlaying={() => {
                       setIsLoading(false);
                       setIsPlaying(true);
                    }}
                    onPause={() => setIsPlaying(false)}
                >
                    Tu navegador no soporta video HTML5.
                </video>
              )}

              {(isLoading || !videoSrc) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-30 pointer-events-none backdrop-blur-[1px]">
                   <div className="flex flex-col items-center gap-2">
                      <Icon icon="mdi:loading" className="text-white w-12 h-12 animate-spin" />
                      <span className="text-xs text-white/80 font-medium tracking-wider">
                        {t("player.loading")}
                      </span>
                   </div>
                </div>
              )}

              {!isPlaying && !isLoading && videoSrc && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10 pointer-events-none">
                  <Icon icon="mdi:play-circle" className="text-white/80 w-20 h-20 drop-shadow-2xl opacity-80" />
                </div>
              )}
          </div>

          <div className="flex flex-col gap-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pb-2 absolute bottom-0 w-full z-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              
              <div className="w-full flex items-center gap-3 cursor-pointer group/slider">
                 <span className="text-xs font-mono text-white/80 w-10 text-right">
                    {formatTime(currentTime)}
                 </span>
                 
                 <div className="relative flex-1 h-1 group-hover/slider:h-2 transition-all bg-white/20 rounded-full">
                    <input 
                      type="range" 
                      min={0} 
                      max={duration || 100} 
                      value={currentTime} 
                      onChange={handleSeek}
                      disabled={!videoSrc}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 disabled:cursor-not-allowed"
                    />
                    <div 
                      className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full pointer-events-none z-10"
                      style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow pointer-events-none z-10 opacity-0 group-hover/slider:opacity-100 transition-opacity"
                      style={{ left: `${(currentTime / (duration || 1)) * 100}%` }}
                    />
                 </div>

                 <span className="text-xs font-mono text-white/80 w-10">
                    {formatTime(duration)}
                 </span>
              </div>

              <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-4">
                      <button onClick={togglePlay} className="text-white hover:text-indigo-400 transition-colors">
                          <Icon icon={isPlaying ? "mdi:pause" : "mdi:play"} width={28} height={28} />
                      </button>
                      <button onClick={() => handleSkip(-10)} className="text-white/70 hover:text-white transition-colors">
                          <Icon icon="mdi:rewind-10" width={24} height={24} />
                      </button>
                      <button onClick={() => handleSkip(10)} className="text-white/70 hover:text-white transition-colors">
                          <Icon icon="mdi:fast-forward-10" width={24} height={24} />
                      </button>
                      <div className="flex items-center gap-1 group/volume">
                        <button onClick={toggleMute} className="text-white/70 hover:text-white ml-2">
                            <Icon icon={isMuted ? "mdi:volume-off" : "mdi:volume-high"} width={22} height={22} />
                        </button>
                      </div>
                  </div>
                  <div>
                      <button onClick={toggleFullscreen} className="text-white/70 hover:text-white transition-colors">
                          <Icon icon={isFullscreen ? "mdi:fullscreen-exit" : "mdi:fullscreen"} width={26} height={26} />
                      </button>
                  </div>
              </div>
          </div>
        </div>
        
        {!isFullscreen && (
          <div className="max-h-32 overflow-y-auto bg-zinc-950 p-5 border-t border-white/5">
              <h4 className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
                <Icon icon="mdi:text-box-outline" /> 
                {t("player.description")}
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                {lesson.description}
              </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};