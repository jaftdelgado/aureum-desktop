import React from "react";
import { AppBreadcrumb } from "@features/dashboard/components/AppBreadcrumb";

export const TopBar: React.FC = () => {
  const action = (type: "minimize" | "maximize" | "close") => {
    window.electronAPI?.windowAction(type);
  };

  return (
    <div
      className="
        w-full h-14 flex items-center
        bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/60
        select-none z-10
      "
      onDoubleClick={() => action("maximize")}
    >
      <div className="flex items-center no-drag px-page-x">
        <AppBreadcrumb />
      </div>

      <div className="flex-1 h-full drag-region" />

      <div className="flex items-center no-drag">
        <button
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-700"
          onClick={() => action("minimize")}
          title="Minimizar"
        >
          —
        </button>

        <button
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-700"
          onClick={() => action("maximize")}
          title="Maximizar"
        >
          ☐
        </button>

        <button
          className="w-14 h-14 flex items-center justify-center hover:bg-red-600"
          onClick={() => action("close")}
          title="Cerrar"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TopBar;
