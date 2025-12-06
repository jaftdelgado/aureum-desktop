// src/features/team-overview/pages/TeamOverview.tsx
import React from "react";
import { useSelectedTeam } from "@app/hooks/useSelectedTeam";

const TeamOverview: React.FC = () => {
  const { selectedTeam } = useSelectedTeam();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        {selectedTeam ? selectedTeam.name : "Team Overview"}
      </h1>
      {/* Aquí puedes agregar más contenido más adelante */}
    </div>
  );
};

export default TeamOverview;
