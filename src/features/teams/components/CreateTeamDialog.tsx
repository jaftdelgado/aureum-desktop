import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@core/ui/Button";
import { Input } from "@core/ui/Input";
import { Textarea } from "@core/ui/TextArea";
import { Label } from "@core/ui/Label";
import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@core/components/Dialog";

interface CreateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (data: { name: string; description: string; image: File | null }) => Promise<void>;
}

export const CreateTeamDialog: React.FC<CreateTeamDialogProps> = ({
  open,
  onOpenChange,
  onCreate,
}) => {
  const { t } = useTranslation("teams");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setName("");
    setDescription("");
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim()) return;
    
    setLoading(true);
    try {
      await onCreate({ name, description, image: selectedFile });
      onOpenChange(false);
      resetForm();
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onOpenChange(false);
      resetForm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("createModal.title")}</DialogTitle>
          <DialogDescription>{t("createModal.message")}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-2">
          <div 
            className="relative w-full h-40 rounded-xl border-2 border-dashed border-outline bg-surface-variant flex flex-col items-center justify-center cursor-pointer hover:bg-surface-hover transition-colors overflow-hidden group"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <>
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon icon="lucide:image-plus" className="text-white w-8 h-8" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-secondaryText">
                <Icon icon="lucide:image-plus" width={32} />
                <span className="text-xs font-medium">{t("createModal.uploadImage")}</span>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </div>

          <Input
            label={t("createModal.nameLabel")}
            placeholder={t("createModal.namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />

          <div className="flex flex-col gap-2">
            <Label>{t("createModal.descLabel")}</Label>
            <Textarea
              placeholder={t("createModal.descPlaceholder")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              maxLength={120}
              className="min-h-[80px]"
            />
            <div className="text-xs text-right text-secondaryText">
              {description?.length}/120
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="thirdy" onClick={handleClose} disabled={loading}>
            {t("createModal.cancel")}
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!name || !description || loading}
          >
            {loading ? t("createModal.creating") : t("createModal.create")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};