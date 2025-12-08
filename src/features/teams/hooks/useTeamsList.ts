// hook/useTeamsList.ts
import { useQuery } from "@tanstack/react-query";
import { GetStudentTeamsUseCase } from "@domain/use-cases/teams/GetStudentTeamsUseCase";
import { GetProfessorTeamsUseCase } from "@domain/use-cases/teams/GetProfessorTeamsUseCase";
import { TeamsApiRepository } from "@infra/api/teams/TeamsApiRepository";
import type { Team } from "@domain/entities/Team";
import { useAuth } from "@app/hooks/useAuth";

const teamsRepository = new TeamsApiRepository();
const getTeamsByProfessorUseCase = new GetProfessorTeamsUseCase(
  teamsRepository
);
const getTeamsByStudentUseCase = new GetStudentTeamsUseCase(teamsRepository);

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
        return getTeamsByProfessorUseCase.execute(user.id);
      }
      if (role === "student") {
        return getTeamsByStudentUseCase.execute(user.id);
      }
      return [];
    },
  });
};
