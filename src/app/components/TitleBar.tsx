import React from "react";
import { AppBreadcrumb } from "@features/dashboard/components/AppBreadcrumb";
import WindowControls from "./WindowControls";

export const TitleBar: React.FC = () => {
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

      <WindowControls onAction={action} />
    </div>
  );
};

export default TitleBar;
