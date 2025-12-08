import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import { Label } from "@core/ui/Label";
import { Button } from "@core/ui/Button";
import { Separator } from "@core/ui/Separator";
import { useProfilePage } from "../hooks/useProfilePage";
import { EditProfileDialog } from "../components/EditProfileDialog";
import { DeleteAccountDialog } from "../components/DeleteAccountDialog";
import { DI } from "@app/di/container";
import { compressImage } from "@core/utils/fileUtils";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation("profile");
  const { user } = useProfilePage();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!user) return null;

  const joinedDate = new Date(user.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleSaveChanges = async (newBio: string, newFile: File | null) => {
    try {
      if (newBio !== user.bio) {
        await DI.profileRepository.updateProfile(user.id, { bio: newBio });
      }
      if (newFile) {
        const compressedFile = await compressImage(newFile, 500, 0.8);
        
        const fileToSend = new File([compressedFile], newFile.name, { type: "image/jpeg" });

        await DI.profileRepository.uploadAvatar(user.id, fileToSend);
      }
      
      window.location.reload();
      
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      await DI.profileRepository.deleteAccount(user.id);
      window.location.reload();
    } catch (error) {
      console.error("Error eliminando cuenta:", error);
      setIsDeleting(false);
      setIsDeleteOpen(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col gap-2 mb-0">
        <div className="flex items-center justify-between w-full pr-8 pl-10"> 
          <div className="flex flex-col gap-1">
            <Label variant="subtitle" color="primary" className="text-2xl font-semibold">
              {t("title")}
            </Label>
            <p className="text-body text-secondaryText">
              {t("subtitle")}
            </p>
          </div>
          
          <Button onClick={() => setIsEditOpen(true)}>
            {t("editProfile")}
          </Button>
        </div>
        <Separator />
      </div>


      <div className="flex flex-col items-center mt-0 max-w-md mx-auto w-full">
        <div className="flex flex-col items-center gap-2 mb-2">
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            className="w-28 h-28 rounded-full object-cover border-4 border-surface-variant shadow-xl"
          />
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-xl font-bold text-primaryText">
              {user.fullName}
            </h2>
            <Label 
              variant="body" 
              color="secondary" 
              className="uppercase tracking-wider text-[10px] font-bold bg-surface-variant px-2 py-0.5 rounded-full"
            >
              {t(`roles.${user.role}` as any, { defaultValue: user.role })}
            </Label>
            {user.bio && (
              <p className="text-sm text-secondaryText mt-0 max-w-[80%] italic">
                "{user.bio}"
              </p>
            )}
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-4 w-full shadow-sm flex flex-col gap-0 mb-8">
          <div className="flex flex-col gap-1">
            <div>
                <Label variant="small" color="secondary" className="mb-0">{t("labels.username")}</Label>
                <p className="text-primaryText font-medium">@{user.username}</p>
            </div>
             <Separator />
            <div>
                <Label variant="small" color="secondary" className="mb-0">{t("labels.email")}</Label>
                <p className="text-primaryText font-medium truncate">{user.email}</p>
            </div>
          </div>
           <Separator />
          <div className="grid grid-cols-2 gap-0">
            <div>
                <Label variant="small" color="secondary" className="mb-1">{t("labels.joinedAt")}</Label>
                <p className="text-primaryText text-sm">{joinedDate}</p>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center mt-auto">
          <Button 
            variant="destructive" 
            className="text-red-500 hover:text-red-600 hover:bg-red-500/10 w-full sm:w-auto"
            onClick={() => setIsDeleteOpen(true)}
          >
            {t("deleteAccount.button")}
          </Button>
        </div>
      </div>

      <EditProfileDialog 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen}
        currentBio={user.bio}
        currentAvatarUrl={user.avatarUrl}
        onSave={handleSaveChanges}
      />

      <DeleteAccountDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDeleteAccount}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ProfilePage;