// src/features/teams/layout/TeamLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";

export const TeamLayout: React.FC = () => {
  return (
    <div className="p-4">
      {/* Aquí puedes poner un header, breadcrumbs, sidebar secundario, etc. */}
      <Outlet />
    </div>
  );
};
