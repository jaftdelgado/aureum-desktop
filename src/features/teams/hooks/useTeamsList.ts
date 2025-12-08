import { useQuery } from "@tanstack/react-query";
import { GetStudentTeamsUseCase } from "@domain/use-cases/teams/GetStudentTeamsUseCase";
import { GetProfessorTeamsUseCase } from "@domain/use-cases/teams/GetProfessorTeamsUseCase";
import type { Team } from "@domain/entities/Team";
import { useAuth } from "@app/hooks/useAuth";
import { DI } from "@app/di/container"; 

export const useTeamsList = () => {
  const { user } = useAuth();
  const role = user?.role;

  return useQuery<Team[], Error>({
    queryKey: ["teams", user?.id],
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      if (!user) return [];

      if (role === "professor") {
        const getProfessorTeams = new GetProfessorTeamsUseCase(DI.teamsRepository);
        return getProfessorTeams.execute(user.id);
      }
      if (role === "student") {
        const getStudentTeams = new GetStudentTeamsUseCase(DI.teamsRepository);
        return getStudentTeams.execute(user.id);
      }
      return [];
    },
  });
};
