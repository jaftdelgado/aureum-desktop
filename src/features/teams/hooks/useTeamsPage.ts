import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@app/hooks/useAuth";
import { TeamsApiRepository } from "@infra/api/teams/TeamsApiRepository";
import { JoinTeamUseCase } from "@domain/use-cases/teams/JoinTeamUseCase";
import { useTeamsList } from "./useTeamsList";

const teamsRepo = new TeamsApiRepository();
const joinTeamUseCase = new JoinTeamUseCase(teamsRepo);

export const useTeamsPage = () => {
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
      await joinTeamUseCase.execute(joinCode, user.id);
      
      setSuccessMsg("¡Te has unido al curso exitosamente!");
      
      await queryClient.invalidateQueries({ queryKey: ["teams", user.id] });

      setTimeout(() => {
        handleCloseModal();
      }, 1500);

    } catch (error: any) {
      console.error("Error al unirse:", error);
      let msg = "Ocurrió un error al intentar unirse.";
      
      if (error.message?.includes("404")) msg = "Código de curso no válido.";
      if (error.message?.includes("409")) msg = "Ya eres miembro de este curso.";
      
      setJoinError(msg);
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