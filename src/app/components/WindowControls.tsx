import React from "react";
import { Icon } from "@iconify/react";

interface WindowControlsProps {
  onAction: (type: "minimize" | "maximize" | "close") => void;
}

export const WindowControls: React.FC<WindowControlsProps> = ({ onAction }) => {
  return (
    <div className="flex items-center no-drag">
      <button
        className="w-10 h-10 flex items-center justify-center hover:bg-gray-700 text-secondaryText"
        onClick={() => onAction("minimize")}
      >
        <Icon icon="fluent:minimize-16-filled" />
      </button>

      <button
        className="w-10 h-10 flex items-center justify-center hover:bg-gray-700 text-secondaryText"
        onClick={() => onAction("maximize")}
      >
        <Icon icon="fluent:maximize-16-filled" />
      </button>

      <button
        className="w-14 h-14 flex items-center justify-center hover:bg-red-600 text-secondaryText"
        onClick={() => onAction("close")}
      >
        <Icon icon="fluent:dismiss-16-filled" width={14} height={14} />
      </button>
    </div>
  );
};

export default WindowControls;
