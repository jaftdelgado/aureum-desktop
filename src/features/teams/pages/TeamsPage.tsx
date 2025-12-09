// src/features/teams/pages/TeamsPage.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TeamCard from "@features/teams/components/TeamCard";
import { Button } from "@core/ui/Button";
import { PageHeader } from "@core/components/PageHeader";
import { useTeamsPage } from "../hooks/useTeamsPage";
import type { Team } from "@domain/entities/Team";
import { JoinTeamModal } from "../components/JoinTeamModal";
import { useSelectedTeam } from "@app/hooks/useSelectedTeam";
import { CreateTeamDialog} from "../components/CreateTeamDialog";

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
    setJoinCode,
    handleOpenModal,
    handleCloseModal,
    handleJoinCourse,
    showCreateModal,
    setShowCreateModal,
    handleCreateCourse,
  } = useTeamsPage();

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team);
    navigate(`/teams/${team.publicId}/overview`);
  };

  const getPlaceholderImage = () => {
    const text = t("card.defaultImageText", "Curso");
    return `https://placehold.co/600x400/1e1e1e/FFF?text=${text}`;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <PageHeader
        title={t("title")}
        description={t("subtitle")}
        actions={
          <div className="flex gap-2">
            {user?.role === "student" && (
              <Button onClick={handleOpenModal} icon="lucide:arrow-up-right">
                {t("joinCourse")}
              </Button>
            )}

            {user?.role === "professor" && (
              <Button
                variant="default"
                icon="lucide:plus"
                onClick={() => setShowCreateModal(true)}
              >
                {t("createCourse")}
              </Button>
            )}
          </div>
        }
      />

      <div className="p-page-x">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
            {[1, 2, 3, 4].map((i) => (
              <TeamCard key={i} loading />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
            {teams?.length === 0 && (
              <div className="col-span-full text-center py-10 opacity-60">
                <p className="text-lg font-medium">{t("emptyState")}</p>
              </div>
            )}

            {teams?.map((team: Team) => (
              <TeamCard
                key={team.publicId}
                image={
                  team.teamPic ||
                  getPlaceholderImage()
                }
                title={team.name}
                subtitle={team.description || t("card.noDescription")}
                onClick={() => handleTeamClick(team)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <JoinTeamModal
        isOpen={showJoinModal}
        joinCode={joinCode}
        isJoining={isJoining}
        setJoinCode={setJoinCode}
        onClose={handleCloseModal}
        onJoin={handleJoinCourse}
        t={t}
      />

      <CreateTeamDialog
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onCreate={handleCreateCourse}
      />
    </div>
  );
};

export default TeamsPage;
