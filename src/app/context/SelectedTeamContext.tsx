// src/app/context/SelectedTeamContext.ts
import { createContext } from "react";
import type { Team } from "@domain/entities/Team";

export interface SelectedTeamContextType {
  selectedTeam: Team | null;
  setSelectedTeam: (team: Team | null) => void;
  membershipId: string | null;
}

export const SelectedTeamContext = createContext<
  SelectedTeamContextType | undefined
>(undefined);
