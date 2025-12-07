import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SettingsSection } from "@features/team-settings/components/ui/SettingsControl";
import { MemberItem } from "@features/team-settings/components/ui/MemberItem"; 
import FormLayout from "@core/layout/FormLayout";
import { Button } from "@core/ui/Button";
import { useAuth } from "@app/hooks/useAuth";
import { useSelectedTeam } from "@app/hooks/useSelectedTeam";
import { TeamsApiRepository } from "@infra/api/teams/TeamsApiRepository";
import { ProfileApiRepository } from "@infra/api/users/ProfileApiRepository";
import { RemoveMemberUseCase } from "@domain/use-cases/teams/RemoveMemberUseCase";
import { GetTeamMembersUseCase } from "@domain/use-cases/teams/GetTeamMembersUseCase";

interface Member {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

const MembersSettingsPage: React.FC = () => {
  const { t } = useTranslation("teamSettings");
  const { user } = useAuth();
  const { selectedTeam } = useSelectedTeam();
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [copied, setCopied] = useState(false); 

  const teamsRepo = new TeamsApiRepository();
  const profileRepo = new ProfileApiRepository();

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedTeam?.publicId) return;

      try {
        setLoading(true);

        const getMembersUseCase = new GetTeamMembersUseCase(teamsRepo);
        const studentsDomain = await getMembersUseCase.execute(selectedTeam.publicId);

        const mappedStudents: Member[] = studentsDomain.map((s) => ({
          id: s.id,
          name: s.name,
          role: "Miembro",
          avatarUrl: s.avatarUrl,
        }));

        let adminMember: Member | null = null;

        if (selectedTeam.professorId) {
          const professorDomain = await profileRepo.getPublicProfile(selectedTeam.professorId);

          if (professorDomain) {
            adminMember = {
              id: professorDomain.id,
              name: professorDomain.name,
              role: "Administrador",
              avatarUrl: professorDomain.avatarUrl,
            };
          } else {
            adminMember = {
              id: selectedTeam.professorId,
              name: t("common.professor", "Profesor"),
              role: "Administrador",
            };
          }
        }

        const finalList = adminMember ? [adminMember, ...mappedStudents] : mappedStudents;
        setMembers(finalList);

      } catch (error) {
        console.error("Error loading members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTeam?.publicId, selectedTeam?.professorId]);

  const handleRemove = async (memberId: string) => {
    if (!selectedTeam) return;

    const confirmed = window.confirm(t("members.confirmDelete", "¿Estás seguro de eliminar a este miembro?"));
    if (!confirmed) return;

    try {
      setLoading(true);
      const useCase = new RemoveMemberUseCase(teamsRepo);
      await useCase.execute(selectedTeam.publicId, memberId);
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
    } catch (error) {
      console.error("Error eliminando miembro:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (selectedTeam?.accessCode) {
      navigator.clipboard.writeText(selectedTeam.accessCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    }
  };

  const isProfessor = user?.role === "professor";
  const adminMember = members.find((m) => m.role === "Administrador");
  const studentMembers = members.filter((m) => m.role !== "Administrador");

  const LoadingState = () => (
    <div className="w-full py-8 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-5 h-5 border-2 border-primaryText border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm text-secondaryText animate-pulse">
          Cargando estudiantes...
        </span>
      </div>
    </div>
  );

  const AccessCodeCard = () => {
    if (!selectedTeam?.accessCode) return null;
    
    return (
      <div className="flex items-center justify-between w-full p-4 mb-4 border border-dashed border-outline bg-card/30 rounded-xl">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-secondaryText uppercase tracking-wider">
            {t("members.accessCode", "Código de acceso")}
          </span>
          <span className="text-xl font-mono font-bold text-primaryText tracking-widest select-all">
            {selectedTeam.accessCode}
          </span>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={copied ? "lucide:check" : "lucide:copy"} 
          onClick={handleCopyCode}
          className={copied ? "text-green-600 bg-green-50 border-green-200" : ""}
        >
          {copied ? t("common.copied", "Copiado") : t("common.copy", "Copiar")}
        </Button>
      </div>
    );
  };

  const getSections = () => {
    // === VISTA PROFESOR ===
    if (isProfessor) {
      return [
        {
          title: t("members.studentsList"),
          description: t("members.studentsListDesc"),
          content: (
            <div className="flex flex-col gap-2 w-full">
              <AccessCodeCard />
              
              {loading ? (
                <LoadingState />
              ) : studentMembers.length > 0 ? (
                studentMembers.map((member) => (
                  <MemberItem
                    key={member.id}
                    name={member.name}
                    role={member.role}
                    avatarUrl={member.avatarUrl}
                    onRemove={() => handleRemove(member.id)}
                  />
                ))
              ) : (
                <div className="p-4 text-sm text-secondaryText text-center italic bg-card rounded-xl border border-outline">
                  {t("members.noStudents", "No hay estudiantes en este equipo.")}
                </div>
              )}
            </div>
          ),
        },
      ];
    }

    // === VISTA ESTUDIANTE ===
    return [
      {
        title: t("members.adminSection"),
        description: t("members.adminSectionDesc"),
        content: (
          <SettingsSection controlWidth="full">
            {loading ? (
               <div className="p-4 text-sm text-secondaryText">Cargando...</div>
            ) : adminMember ? (
              <MemberItem
                name={adminMember.name}
                role={adminMember.role}
                avatarUrl={adminMember.avatarUrl}
              />
            ) : (
              <div className="p-2 text-sm text-secondaryText">
                Admin no encontrado
              </div>
            )}
          </SettingsSection>
        ),
      },
      {
        title: t("members.classmatesSection"),
        description: t("members.classmatesSectionDesc"),
        content: (
          <div className="flex flex-col gap-2 w-full">

            {loading ? (
               <LoadingState />
            ) : studentMembers.length > 0 ? (
              studentMembers.map((member) => (
                member.id !== user?.id && (
                  <MemberItem
                    key={member.id}
                    name={member.name}
                    role={member.role}
                    avatarUrl={member.avatarUrl}
                  />
                )
              ))
            ) : (
              <div className="p-4 text-sm text-secondaryText text-center italic bg-card rounded-xl border border-outline">
                No hay otros compañeros en este equipo.
              </div>
            )}
          </div>
        ),
      },
    ];
  };

  return <FormLayout sections={getSections()} />;
};

export default MembersSettingsPage;