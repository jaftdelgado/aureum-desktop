import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelectedTeam } from "@app/hooks/useSelectedTeam";
import { GetTeamMembersUseCase } from "@domain/use-cases/teams/GetTeamMembersUseCase";
import { RemoveMemberUseCase } from "@domain/use-cases/teams/RemoveMemberUseCase";
import { DI } from "@app/di/container";
import { toast } from "sonner";

export interface UIMember {
  id: string;
  name: string;
  role: "professor" | "student";
  avatarUrl?: string;
}

export const useMembersSettings = () => {
  const { t } = useTranslation("teamSettings");
  const { selectedTeam } = useSelectedTeam();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);

  const { data: members = [], isLoading: loading } = useQuery({
    queryKey: ["team-members", selectedTeam?.publicId],
    enabled: !!selectedTeam?.publicId, 
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      if (!selectedTeam?.publicId) return [];

      const getMembersUseCase = new GetTeamMembersUseCase(DI.teamsRepository);
      const studentsDomain = await getMembersUseCase.execute(selectedTeam.publicId);

      const mappedStudents: UIMember[] = studentsDomain.map((s) => ({
        id: s.id,
        name: s.name,
        role: "student",
        avatarUrl: s.avatarUrl,
      }));

      let adminMember: UIMember | null = null;
      if (selectedTeam.professorId) {
        try {
          const professorDomain = await DI.profileRepository.getPublicProfile(selectedTeam.professorId);
          if (professorDomain) {
            adminMember = {
              id: professorDomain.id,
              name: professorDomain.name,
              role: "professor",
              avatarUrl: professorDomain.avatarUrl,
            };
          }
        } catch (e) {
          console.warn("No se pudo cargar perfil del profesor");
        }
        
        if (!adminMember) {
          adminMember = {
            id: selectedTeam.professorId,
            name: t("members.professorFallback", "Profesor"),
            role: "professor",
          };
        }
      }

      return adminMember ? [adminMember, ...mappedStudents] : mappedStudents;
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (memberId: string) => {
      if (!selectedTeam?.publicId) throw new Error("No team selected");
      const useCase = new RemoveMemberUseCase(DI.teamsRepository);
      await useCase.execute(selectedTeam.publicId, memberId);
    },
    onSuccess: () => {
      toast.success(t("members.removeSuccess"), {
        description: t("members.removeSuccessDesc")
      });
      queryClient.invalidateQueries({ queryKey: ["team-members", selectedTeam?.publicId] });
    },
    onError: (error) => {
      console.error("Error eliminando:", error);
      toast.error(t("errors.generic"), {
        description: t("members.removeFailed")
      });
    }
  });

  const removeMember = (memberId: string) => {
    removeMutation.mutate(memberId);
  };

  const copyAccessCode = () => {
    if (selectedTeam?.accessCode) {
      navigator.clipboard.writeText(selectedTeam.accessCode);
      setCopied(true);
      toast.success(t("common.copied"));
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return {
    members,
    loading: loading || removeMutation.isPending,
    copied,
    actions: {
      removeMember,
      copyAccessCode
    }
  };
};