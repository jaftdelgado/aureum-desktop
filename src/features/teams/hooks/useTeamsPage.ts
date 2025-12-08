import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@app/hooks/useAuth";
import { JoinTeamUseCase } from "@domain/use-cases/teams/JoinTeamUseCase";
import { useTeamsList } from "./useTeamsList";
import { DI } from "@app/di/container";
import { useTranslation } from "react-i18next";

export const useTeamsPage = () => {
  const { t } = useTranslation("teams");
  const { user } = useAuth();
  const { data: teams, isLoading } = useTeamsList();
  const queryClient = useQueryClient();

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  
  const [joinError, setJoinError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleOpenModal = () => {
    setJoinCode("");
    setJoinError(null);
    setSuccessMsg(null);
    setShowJoinModal(true);
  };

  const handleCloseModal = () => {
    setShowJoinModal(false);
  };

  const handleJoinCourse = async () => {
    if (!joinCode.trim() || !user?.id) return;
    
    setIsJoining(true);
    setJoinError(null);
    setSuccessMsg(null);

    try {
      const joinTeamUseCase = new JoinTeamUseCase(DI.teamsRepository);
      
      await joinTeamUseCase.execute(joinCode, user.id);
      
      setSuccessMsg(t("joinModal.success"));
      
      await queryClient.invalidateQueries({ queryKey: ["teams", user.id] });

      setTimeout(() => {
        handleCloseModal();
      }, 1500);

    } catch (error: any) {
      
      let msgKey = "joinModal.errors.generic";
      
      if (error.message?.includes("404")) msgKey = "joinModal.errors.invalidCode";
      if (error.message?.includes("409")) msgKey = "joinModal.errors.alreadyMember";
      
      setJoinError(t(msgKey));
    } finally {
      setIsJoining(false);
    }
  };

  return {
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
  };
};