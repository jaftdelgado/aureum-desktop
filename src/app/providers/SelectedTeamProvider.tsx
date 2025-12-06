// src/app/providers/SelectedTeamProvider.tsx
import React, { useState } from "react";
import type { ReactNode } from "react";
import type { Team } from "@domain/entities/Team";
import { SelectedTeamContext } from "@app/context/SelectedTeamContext";
import type { SelectedTeamContextType } from "@app/context/SelectedTeamContext";

interface Props {
  children: ReactNode;
}

export const SelectedTeamProvider: React.FC<Props> = ({ children }) => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const value: SelectedTeamContextType = { selectedTeam, setSelectedTeam };

  return (
    <SelectedTeamContext.Provider value={value}>
      {children}
    </SelectedTeamContext.Provider>
  );
};
