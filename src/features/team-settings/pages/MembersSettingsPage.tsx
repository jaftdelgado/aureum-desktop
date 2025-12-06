// src/features/team-settings/pages/MembersSettingsPage.tsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SettingsSection,
  SettingsControl,
} from "@features/team-settings/components/ui/SettingsControl";
import FormLayout from "@core/layout/FormLayout";
import { Button } from "@core/ui/Button";

interface Member {
  id: number;
  name: string;
  role: string;
}

const MembersSettingsPage: React.FC = () => {
  const { t } = useTranslation("teamSettings");

  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: "Juan Pérez", role: "Administrador" },
    { id: 2, name: "María López", role: "Miembro" },
    { id: 3, name: "Carlos Sánchez", role: "Miembro" },
  ]);

  const handleRemove = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const sections = [
    {
      title: t("members.listTitle"),
      description: t("members.listDescription"),
      content: (
        <SettingsSection controlWidth="full">
          {members.map((member) => (
            <SettingsControl
              key={member.id}
              title={member.name}
              description={member.role}
              control={
                <Button
                  variant="destructive"
                  size="md"
                  onClick={() => handleRemove(member.id)}
                  className="w-full justify-between"
                >
                  {t("members.removeMember")}
                </Button>
              }
            />
          ))}
        </SettingsSection>
      ),
    },
  ];

  return <FormLayout sections={sections} />;
};

export default MembersSettingsPage;
