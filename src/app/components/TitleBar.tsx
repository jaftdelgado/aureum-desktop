import React from "react";

export const TitleBar: React.FC = () => {
  const action = (type: "minimize" | "maximize" | "close") => {
    window.electronAPI?.windowAction(type);
  };

  return (
    <div
      className="w-full h-10 flex items-center justify-between bg-gray-900 text-gray-200 select-none"
      onDoubleClick={() => action("maximize")}
    >
      {/* Área draggable */}
      <div className="flex-1 h-full flex items-center px-3 drag-region">
        <span className="text-sm">Mi App</span>
      </div>

      {/* Botones de ventana */}
      <div className="flex">
        <button
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-700 no-drag"
          onClick={() => action("minimize")}
          title="Minimizar"
        >
          —
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-700 no-drag"
          onClick={() => action("maximize")}
          title="Maximizar"
        >
          ☐
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center hover:bg-red-600 no-drag"
          onClick={() => action("close")}
          title="Cerrar"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
