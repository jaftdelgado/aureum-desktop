<<<<<<< HEAD
=======
// src/features/assets/components/EditModeToggle.tsx
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";

interface EditModeToggleProps {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  onSave?: () => void;
  isSaving?: boolean;
<<<<<<< HEAD
  disabled?: boolean;
=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
}

export const EditModeToggle: React.FC<EditModeToggleProps> = ({
  isEditMode,
  setIsEditMode,
  onSave,
  isSaving,
<<<<<<< HEAD
  disabled = false,
=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
}) => {
  const { t } = useTranslation("assets");

  if (isEditMode) {
    return (
      <div className="flex gap-2">
        <Button
          variant="secondary"
          iconOnly="lucide:x"
          className="px-2 py-2"
          onClick={() => setIsEditMode(false)}
          disabled={isSaving}
        />
<<<<<<< HEAD

=======
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
        <Button
          variant="default"
          icon="hugeicons:floppy-disk"
          className="px-4 py-2"
          onClick={onSave}
<<<<<<< HEAD
          disabled={isSaving || disabled}
        >
          {isSaving ? t("editModeToggle.saving") : t("editModeToggle.save")}
=======
          disabled={isSaving}
        >
          {isSaving
            ? t("assets:saving") || "Guardando..."
            : t("assets:save") || "Guardar"}
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="default"
<<<<<<< HEAD
      icon="hugeicons:pencil-edit-02"
      className="px-4 py-2"
      onClick={() => setIsEditMode(true)}
    >
      {t("editModeToggle.editMode")}
=======
      icon="lucide:edit"
      className="px-4 py-2"
      onClick={() => setIsEditMode(true)}
    >
      {t("assets:editMode") || "Editar"}
>>>>>>> 02cb14a44c4011f6bf4f1af076bac03a97d08a8d
    </Button>
  );
};
