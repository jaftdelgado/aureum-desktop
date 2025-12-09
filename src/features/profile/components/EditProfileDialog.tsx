import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";
import { Label } from "@core/ui/Label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@core/components/Dialog";
import { Icon } from "@iconify/react";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBio?: string;
  currentAvatarUrl?: string;
  onSave: (bio: string, file: File | null) => Promise<void>;
}

export const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  open,
  onOpenChange,
  currentBio = "",
  currentAvatarUrl,
  onSave,
}) => {
  const { t } = useTranslation("profile");
  const [bio, setBio] = useState(currentBio);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl || null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(bio, selectedFile);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("modals.edit.title")}</DialogTitle>
          <DialogDescription>{t("modals.edit.message")}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-col items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <img
                src={previewUrl || "https://placehold.co/150?text=Avatar"}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-surface-variant group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Icon icon="lucide:camera" className="text-white w-6 h-6" />
              </div>
            </div>
            <Button 
              variant="link" 
              size="sm" 
              onClick={() => fileInputRef.current?.click()}
              className="text-primary h-auto p-0"
            >
              {t("labels.changePhoto")}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>{t("labels.bio")}</Label>
            <textarea
              className="flex min-h-[80px] w-full rounded-lg border border-input bg-surface px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              placeholder={t("modals.edit.bioPlaceholder")}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={120}
            />
            <div className="text-xs text-right text-secondaryText">
              {bio?.length}/120
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="default" onClick={() => onOpenChange(false)} disabled={isSaving}>
            {t("modals.edit.cancel")}
          </Button>
          <Button variant="default" onClick={handleSave} disabled={isSaving}>
            {isSaving ? t("modals.edit.saving") : t("modals.edit.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};