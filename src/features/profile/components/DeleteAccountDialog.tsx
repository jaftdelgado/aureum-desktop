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

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export const DeleteAccountDialog: React.FC<DeleteAccountDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  isDeleting,
}) => {
  const { t } = useTranslation("profile");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">
            {t("deleteAccount.title")}
          </DialogTitle>
          <DialogDescription>
            {t("deleteAccount.message")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant="default" 
            onClick={() => onOpenChange(false)} 
            disabled={isDeleting}
          >
            {t("deleteAccount.cancel")}
          </Button>
          <Button 
            variant="default" 
            className="bg-red-600 hover:bg-red-700 text-white border-transparent"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Eliminando..." : t("deleteAccount.confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};