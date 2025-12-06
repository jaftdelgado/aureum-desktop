// src/app/hooks/useSelectedTeam.ts
import { useContext } from "react";
import { SelectedTeamContext } from "@app/context/SelectedTeamContext";

export const useSelectedTeam = () => {
  const context = useContext(SelectedTeamContext);
  if (!context) {
    throw new Error(
      "useSelectedTeam debe ser usado dentro de SelectedTeamProvider"
    );
  }
  return context;
};
