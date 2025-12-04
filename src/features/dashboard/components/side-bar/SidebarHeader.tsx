import React from "react";
import { AureumIcon } from "@app/resources/svg/AureumIcon";

export const SidebarHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-3 pb-4 mb-4 border-b border-outline/30">
      <div
        className="
          w-8 h-8 
          rounded-[10px]
          flex items-center justify-center
          bg-gradient-to-br from-primaryBtn to-primaryHoverBtn
          shadow-sm
        "
      >
        <AureumIcon size={16} color="#ededed" />
      </div>

      {/* TEXTOS */}
      <div className="flex flex-col leading-none">
        <span className="text-headline text-primaryText font-semibold">
          Aureum
        </span>
        <span className="text-secondaryText text-sm">Estudiante</span>
      </div>
    </div>
  );
};
