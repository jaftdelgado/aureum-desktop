// src/features/teams/pages/TeamsPage.tsx
import React from "react";
import { PageHeader } from "@core/components/PageHeader";
import { useTranslation } from "react-i18next";
import { TeamCard } from "../components/TeamCard";
import { useTeamsList } from "../hooks/useTeamsList";

const TeamsPage: React.FC = () => {
  const { t } = useTranslation("teams");
  const { data: teams, isLoading, isError } = useTeamsList();

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader title={t("title")} description={t("description")} />

      <div className="p-page-x">
        {isError && <p className="text-red-500">Error cargando los equipos.</p>}

        <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-card rounded-xl border border-outline max-w-xs animate-pulse"
              >
                <div className="h-44 bg-gray-300 mb-3"></div>
                <div className="h-6 bg-gray-300 mb-1 mx-4 mt-2 rounded"></div>
                <div className="h-4 bg-gray-300 mx-4 rounded"></div>
              </div>
            ))
          ) : teams?.length ? (
            teams.map((team) => (
              <TeamCard
                key={team.publicId}
                title={team.name}
                subtitle={team.description ?? ""}
                image={team.teamPic ?? "/placeholder-team.png"}
                isFree={true}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-secondaryText mt-4">
              No hay equipos disponibles.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
