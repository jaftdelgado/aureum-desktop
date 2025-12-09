import React, { useState, useCallback, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { Team } from "@domain/entities/Team";
import { SelectedTeamContext } from "@app/context/SelectedTeamContext";
import type { SelectedTeamContextType } from "@app/context/SelectedTeamContext";
import { AuthContext } from "@app/context/AuthContext";

interface Props {
  children: ReactNode;
}

export const SelectedTeamProvider: React.FC<Props> = ({ children }) => {
  const [selectedTeam, setSelectedTeamState] = useState<Team | null>(null);
  const [membershipId, setMembershipId] = useState<string | null>(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      setSelectedTeamState(null);
      setMembershipId(null);
    }
  }, [user]);

  const fetchMembership = useCallback(
    async (teamId: string, studentId: string) => {
      try {
        const baseUrl = import.meta.env.VITE_API_GATEWAY_URL;
        const url = `${baseUrl}/api/memberships/teams/${teamId}/members/${studentId}`;

        const response = await fetch(url);
        const data = await response.json();

        setMembershipId(data?.id ?? null);
      } catch (error) {
        console.error("Error en la petición de membership:", error);
        setMembershipId(null);
      }
    },
    []
  );

  const setSelectedTeam = useCallback(
    (team: Team | null) => {
      setSelectedTeamState(team);

      if (!team || !user) {
        setMembershipId(null);
        return;
      }

      const teamId = team.publicId;
      const studentId = user.id;

      void fetchMembership(teamId, studentId);
    },
    [user, fetchMembership]
  );

  const value: SelectedTeamContextType = {
    selectedTeam,
    setSelectedTeam,
    membershipId,
  };

  return (
    <SelectedTeamContext.Provider value={value}>
      {children}
    </SelectedTeamContext.Provider>
  );
};
