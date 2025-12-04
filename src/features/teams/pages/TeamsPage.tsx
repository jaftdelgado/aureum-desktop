// src/features/teams/pages/TeamsPage.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { TeamCard } from "../components/TeamCard";
import { Button } from "@core/ui/Button";
import { Input } from "@core/ui/Input";
import { Label } from "@core/ui/Label"; 
import { Separator } from "@core/ui/Separator";
import { useTeamsPage } from "../hooks/useTeamsPage";
import type { Team } from "@domain/entities/Team";

const TeamsPage: React.FC = () => {
  const { t } = useTranslation("teams");
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
    handleJoinCourse
  } = useTeamsPage();

  return (
    <div className="w-full h-full flex  flex-col">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center justify-between w-full pr-8 pl-10"> 
          
          <div className="flex flex-col gap-1">
            <Label variant="subtitle" color="primary" className="text-2xl font-semibold">
              {t("title")}
            </Label>
            <p className="text-body text-secondaryText">
              {t("subtitle")}
            </p>
          </div>

          <div className="flex gap-3">
            {user?.role === "student" && (
              <Button onClick={handleOpenModal}>
                {t("joinCourse")}
              </Button>
            )}

            {user?.role === "professor" && (
              <Button variant="default" onClick={() => console.log("Crear curso")}>
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
               <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"/>
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
                image={team.teamPic || "https://placehold.co/600x400/1e1e1e/FFF?text=Curso"}
                title={team.name}
                subtitle={team.description || "Sin descripción"}
              />
            ))}
          </div>
        )}
      </div>

      {showJoinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-surface border border-border rounded-xl p-6 shadow-2xl w-full max-w-sm animate-in zoom-in-95 slide-in-from-bottom-2 duration-200">
            <h3 className="text-lg font-semibold text-primaryText mb-2">
              {t("joinModal.title")}
            </h3>
            <p className="text-sm text-secondaryText mb-6">
              {t("joinModal.message")}
            </p>

            {joinError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-xs font-medium">
                {joinError}
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded text-green-500 text-xs font-medium">
                {successMsg}
              </div>
            )}

            <div className="flex flex-col gap-4 mb-6">
              <Input 
                label={t("joinModal.codeLabel")}
                placeholder={t("joinModal.codePlaceholder")}
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                maxLength={8}
                disabled={isJoining || !!successMsg}
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button 
                variant="default" 
                onClick={handleCloseModal}
                disabled={isJoining}
              >
                {t("joinModal.cancel")}
              </Button>
              <Button 
                variant="default"
                onClick={handleJoinCourse}
                disabled={!joinCode || isJoining || !!successMsg}
              >
                {isJoining ? "Uniéndose..." : t("joinModal.join")}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TeamsPage;
