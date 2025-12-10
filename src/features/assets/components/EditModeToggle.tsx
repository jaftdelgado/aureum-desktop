import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";

interface EditModeToggleProps {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  onSave?: () => void;
  isSaving?: boolean;
  disabled?: boolean;
}

export const EditModeToggle: React.FC<EditModeToggleProps> = ({
  isEditMode,
  setIsEditMode,
  onSave,
  isSaving,
  disabled = false,
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

        <Button
          variant="default"
          icon="hugeicons:floppy-disk"
          className="px-4 py-2"
          onClick={onSave}
          disabled={isSaving || disabled}
        >
          {isSaving ? t("editModeToggle.saving") : t("editModeToggle.save")}
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="default"
      icon="hugeicons:pencil-edit-02"
      className="px-4 py-2"
      onClick={() => setIsEditMode(true)}
    >
      {t("editModeToggle.editMode")}
    </Button>
  );
};
