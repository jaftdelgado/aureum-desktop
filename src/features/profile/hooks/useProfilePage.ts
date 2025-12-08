import { useState } from "react";
import { useAuth } from "@app/hooks/useAuth";
import { UpdateProfileUseCase } from "@domain/use-cases/profile/UpdateProfileUseCase";
import { DeleteAccountUseCase } from "@domain/use-cases/profile/DeleteAccountUseCase";
import { DI } from "@app/di/container";

export const useProfilePage = () => {
  const { user, logout } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const updateProfile = async (newBio: string, newFile: File | null) => {
    if (!user) return;
    setIsSaving(true);
    try {
      const updateUseCase = new UpdateProfileUseCase(DI.profileRepository);
      
      await updateUseCase.execute(
        user.id, 
        user.bio, 
        newBio, 
        newFile
      );
      
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error; 
    } finally {
      setIsSaving(false);
    }
  };

  const deleteAccount = async () => {
    if (!user) return;
    setIsDeleting(true);
    try {
      const deleteUseCase = new DeleteAccountUseCase(DI.profileRepository);
      await deleteUseCase.execute(user.id);
      
      await logout();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting account:", error);
      setIsDeleting(false);
    }
  };

  return {
    user,
    loadingStates: {
      isSaving,
      isDeleting
    },
    actions: {
      updateProfile,
      deleteAccount
    }
  };
};