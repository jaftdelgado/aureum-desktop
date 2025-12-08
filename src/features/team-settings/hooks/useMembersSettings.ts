import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelectedTeam } from "@app/hooks/useSelectedTeam";
import { GetTeamMembersUseCase } from "@domain/use-cases/teams/GetTeamMembersUseCase";
import { RemoveMemberUseCase } from "@domain/use-cases/teams/RemoveMemberUseCase";
import { DI } from "@app/di/container";

export interface UIMember {
  id: string;
  name: string;
  role: "professor" | "student";
  avatarUrl?: string;
}

export const useMembersSettings = () => {
  const { t } = useTranslation("teamSettings");
  const { selectedTeam } = useSelectedTeam();
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<UIMember[]>([]);
  const [copied, setCopied] = useState(false);

  const fetchMembers = useCallback(async () => {
    if (!selectedTeam?.publicId) return;

    try {
      setLoading(true);
      
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

      setMembers(adminMember ? [adminMember, ...mappedStudents] : mappedStudents);

    } catch (error) {
      console.error("Error loading members:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedTeam, t]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const removeMember = async (memberId: string) => {
    if (!selectedTeam) return;

    try {
      setLoading(true);
      const useCase = new RemoveMemberUseCase(DI.teamsRepository);
      await useCase.execute(selectedTeam.publicId, memberId);
      
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
    } catch (error) {
      console.error("Error eliminando miembro:", error);
      alert(t("errors.generic"));
    } finally {
      setLoading(false);
    }
  };

  const copyAccessCode = () => {
    if (selectedTeam?.accessCode) {
      navigator.clipboard.writeText(selectedTeam.accessCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return {
    members,
    loading,
    copied,
    actions: {
      removeMember,
      copyAccessCode
    }
  };
};