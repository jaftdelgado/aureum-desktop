// src/features/teams/pages/TeamsPage.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TeamCard from "@features/teams/components/TeamCard";
import { Button } from "@core/ui/Button";
import { Separator } from "@core/ui/Separator";
import { useTeamsPage } from "../hooks/useTeamsPage";
import type { Team } from "@domain/entities/Team";
import { JoinTeamModal } from "../components/JoinTeamModal";
import { useSelectedTeam } from "@app/hooks/useSelectedTeam";

const TeamsPage: React.FC = () => {
  const { t } = useTranslation("teams");
  const navigate = useNavigate();
  const { setSelectedTeam } = useSelectedTeam();

  const {
    teams,
    isLoading,
    user,
    showJoinModal,
    joinCode,
    isJoining,
    joinError,
    successMsg,
    setJoinCode,
    handleOpenModal,
    handleCloseModal,
    handleJoinCourse,
  } = useTeamsPage();

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team);
    navigate(`/teams/${team.publicId}/overview`);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center justify-between w-full pr-8 pl-10">
          <div className="flex flex-col gap-1">
            <p className="text-2xl font-semibold text-primary">{t("title")}</p>
            <p className="text-body text-secondaryText">{t("subtitle")}</p>
          </div>

          <div className="flex gap-3">
            {user?.role === "student" && (
              <Button onClick={handleOpenModal}>{t("joinCourse")}</Button>
            )}
            {user?.role === "professor" && (
              <Button
                variant="default"
                onClick={() => console.log("Crear curso")}
              >
                {t("createCourse")}
              </Button>
            )}
          </div>
        </div>

        <Separator />
      </div>

      <div className="p-page-x">
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-secondaryText text-sm">Cargando equipos...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
            {teams?.length === 0 && (
              <div className="col-span-full text-center py-10 opacity-60">
                <p>No tienes cursos registrados aún.</p>
              </div>
            )}
            {teams?.map((team: Team) => (
              <TeamCard
                key={team.publicId}
                image={
                  team.teamPic ||
                  "https://placehold.co/600x400/1e1e1e/FFF?text=Curso"
                }
                title={team.name}
                subtitle={team.description || "Sin descripción"}
                onClick={() => handleTeamClick(team)}
              />
            ))}
          </div>
        )}
      </div>

      <JoinTeamModal
        isOpen={showJoinModal}
        joinCode={joinCode}
        isJoining={isJoining}
        joinError={joinError || undefined}
        successMsg={successMsg || undefined}
        setJoinCode={setJoinCode}
        onClose={handleCloseModal}
        onJoin={handleJoinCourse}
        t={t}
      />
    </div>
  );
};

export default TeamsPage;
