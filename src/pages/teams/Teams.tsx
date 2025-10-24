import React from "react";
import { Button } from "@components/ui/Button";

export const Teams: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full h-[2000px] px-6 pb-6 relative z-10 box-border">
      <div className="relative top-6 z-20 flex items-end justify-between w-full min-h-[70px] bg-bg overflow-visible">
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-700 -translate-x-6 w-[calc(100%+3rem)] pointer-events-none z-0" />

        <div className="flex flex-col gap-[0.1rem] flex-shrink-0 z-10">
          <h1 className="text-2xl font-semibold text-white">
            Cursos disponibles
          </h1>
          <p className="text-secondaryText text-sm">
            Explora y gestiona tus cursos activos
          </p>
        </div>

        {/* Right side */}
        <div className="flex items-end flex-shrink-0 z-10 ml-auto">
          <Button variant="default" icon="gravity-ui:plus">
            Nuevo curso
          </Button>
        </div>
      </div>
    </div>
  );
};
