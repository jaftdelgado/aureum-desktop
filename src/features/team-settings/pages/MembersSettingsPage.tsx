import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SettingsSection } from "@features/team-settings/components/ui/SettingsControl";
import { MemberItem } from "@features/team-settings/components/ui/MemberItem"; 
import FormLayout from "@core/layout/FormLayout";
import { Button } from "@core/ui/Button";
import { useAuth } from "@app/hooks/useAuth";
import { useSelectedTeam } from "@app/hooks/useSelectedTeam";
import { useMembersSettings } from "../hooks/useMembersSettings";
import { DeleteMemberDialog } from "../components/DeleteMemberDialog";

const MembersSettingsPage: React.FC = () => {
  const { t } = useTranslation("teamSettings");
  const { user } = useAuth();
  const { selectedTeam } = useSelectedTeam();
  const [memberToDelete, setMemberToDelete] = useState<{ id: string; name: string } | null>(null);
  const { members, loading, copied, actions } = useMembersSettings();

  const isProfessor = user?.role === "professor";
  
  const adminMember = members.find((m) => m.role === "professor");
  const studentMembers = members.filter((m) => m.role === "student");

  const handleRemoveClick = (id: string, name: string) => {
    setMemberToDelete({ id, name });
  };

  const handleConfirmDelete = async () => {
    if (memberToDelete) {
      await actions.removeMember(memberToDelete.id);
      setMemberToDelete(null); 
    }
  };

  const LoadingState = () => (
    <div className="w-full py-8 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-5 h-5 border-2 border-primaryText border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm text-secondaryText animate-pulse">
          {t("members.loading", "Cargando...")}
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
          onClick={actions.copyAccessCode}
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
                    onRemove={() => handleRemoveClick(member.id, member.name)}
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
                <LoadingState />
            ) : adminMember ? (
              <MemberItem
                name={adminMember.name}
                role={adminMember.role}
                avatarUrl={adminMember.avatarUrl}
              />
            ) : (
              <div className="p-2 text-sm text-secondaryText">
                {t("members.adminNotFound", "Admin no encontrado")}
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
                {t("members.noClassmates", "No hay otros compañeros en este equipo.")}
              </div>
            )}
          </div>
        ),
      },
    ];
  };

  return (
    <>
      <FormLayout sections={getSections()} />
      
      <DeleteMemberDialog
        open={!!memberToDelete}
        onOpenChange={(open) => !open && setMemberToDelete(null)}
        onConfirm={handleConfirmDelete}
        memberName={memberToDelete?.name || ""}
        isDeleting={loading} 
      />
    </>
  );
};

export default MembersSettingsPage;