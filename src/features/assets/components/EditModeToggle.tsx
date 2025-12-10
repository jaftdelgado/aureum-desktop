// src/features/assets/components/EditModeToggle.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";

interface EditModeToggleProps {
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
  onSave?: () => void;
  isSaving?: boolean;
}

export const EditModeToggle: React.FC<EditModeToggleProps> = ({
  isEditMode,
  setIsEditMode,
  onSave,
  isSaving,
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
          disabled={isSaving}
        >
          {isSaving
            ? t("assets:saving") || "Guardando..."
            : t("assets:save") || "Guardar"}
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="default"
      icon="lucide:edit"
      className="px-4 py-2"
      onClick={() => setIsEditMode(true)}
    >
      {t("assets:editMode") || "Editar"}
    </Button>
  );
};
