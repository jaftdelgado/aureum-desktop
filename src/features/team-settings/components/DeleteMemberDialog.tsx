import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@core/components/Dialog";

interface DeleteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  memberName: string;
  isDeleting: boolean;
}

export const DeleteMemberDialog: React.FC<DeleteMemberDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  memberName,
  isDeleting,
}) => {
  const { t } = useTranslation("teamSettings");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">
            {t("deleteMember.title", "Eliminar miembro")}
          </DialogTitle>
          <DialogDescription>
            {t("deleteMember.message", { name: memberName })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant="default" 
            onClick={() => onOpenChange(false)} 
            disabled={isDeleting}
          >
            {t("deleteMember.cancel", "Cancelar")}
          </Button>
          <Button 
            variant="default" 
            className="bg-red-600 hover:bg-red-700 text-white border-transparent"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? t("deleteMember.deleting", "Eliminando...") : t("deleteMember.confirm", "Eliminar")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};