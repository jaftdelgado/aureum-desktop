// src/features/teams/pages/TeamsPage.tsx
import React from "react";
import { PageHeader } from "@core/components/PageHeader";
import { useTranslation } from "react-i18next";
import { TeamCard } from "../components/TeamCard";

const TeamsPage: React.FC = () => {
  const { t } = useTranslation("teams");

  const teams = Array.from({ length: 8 }).map((_, i) => ({
    id: i + 1,
    name: `Team ${i + 1}`,
    updated: "Updated 2 days ago",
    image: "https://images.unsplash.com/photo-1707343846298-f5feb53df0df?w=800",
  }));

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader title={t("title")} description={t("description")} />

      <div className="p-page-x">
        <div
          className="
            grid gap-5
            grid-cols-[repeat(auto-fill,minmax(260px,1fr))]
          "
        >
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              title={team.name}
              subtitle={team.updated}
              image={team.image}
              isFree={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
