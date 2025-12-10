import { useQuery } from "@tanstack/react-query";
import { GetStudentTeamsUseCase } from "@domain/use-cases/teams/GetStudentTeamsUseCase";
import { GetProfessorTeamsUseCase } from "@domain/use-cases/teams/GetProfessorTeamsUseCase";
import type { Team } from "@domain/entities/Team";
import { useAuth } from "@app/hooks/useAuth";
import { DI } from "@app/di/container"; 

export const useTeamsList = () => {
  const { user } = useAuth();
  const isProfessor = user?.role === "professor" ;
  const isStudent = user?.role === "student";

  return useQuery<Team[], Error>({
    queryKey: ["teams", user?.id, user?.role],
    enabled: !!user && (isProfessor || isStudent),
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      if (!user) return [];

      if (isProfessor) {
        const useCase = new GetProfessorTeamsUseCase(DI.teamsRepository);
        return await useCase.execute(user.id);
      }
      
      if (isStudent) {
        const useCase = new GetStudentTeamsUseCase(DI.teamsRepository);
        return await useCase.execute(user.id);
      }
      return [];
    },
  });
};
