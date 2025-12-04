// src/features/team-settings/pages/MembersSettingsPage.tsx
import React, { useState } from "react";
import { PageHeader } from "@core/components/PageHeader";
import { useTranslation } from "react-i18next";
import { MemberItem } from "@features/team-settings/components/ui/MemberItem";

interface Member {
  id: number;
  name: string;
  role: string;
  avatarUrl: string;
}

const MembersSettingsPage: React.FC = () => {
  const { t } = useTranslation("teamSettings");

  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "Juan Pérez",
      role: "Administrador",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "María López",
      role: "Miembro",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Carlos Sánchez",
      role: "Miembro",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
    },
  ]);

  const handleRemove = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader
        title={t("members.title")}
        description={t("members.description")}
      />

      <div className="flex-1 px-page-x flex gap-4">
        <div className="flex-shrink-0 max-w-[270px] w-full rounded-lg" />

        <div className="flex-1 bg-white rounded-lg p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Lista de estudiantes</h2>
          <ul className="space-y-2">
            {members.map((member) => (
              <MemberItem
                key={member.id}
                avatarUrl={member.avatarUrl}
                name={member.name}
                role={member.role}
                onRemove={() => handleRemove(member.id)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MembersSettingsPage;
