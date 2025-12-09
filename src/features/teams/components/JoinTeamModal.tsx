import React from "react";
import { Button } from "@core/ui/Button";
import { Input } from "@core/ui/Input";
import type { Dispatch, SetStateAction } from "react";

interface JoinTeamModalProps {
  isOpen: boolean;
  joinCode: string;
  isJoining: boolean;
  setJoinCode: Dispatch<SetStateAction<string>>;
  onClose: () => void;
  onJoin: () => void;
  t: (key: string) => string;
}

export const JoinTeamModal: React.FC<JoinTeamModalProps> = ({
  isOpen,
  joinCode,
  isJoining,
  setJoinCode,
  onClose,
  onJoin,
  t,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface border border-border rounded-xl p-6 shadow-2xl w-full max-w-sm animate-in zoom-in-95 slide-in-from-bottom-2 duration-200">
        <h3 className="text-lg font-semibold text-primaryText mb-2">
          {t("joinModal.title")}
        </h3>
        <p className="text-sm text-secondaryText mb-6">
          {t("joinModal.message")}
        </p>

        <div className="flex flex-col gap-4 mb-6">
          <Input
            label={t("joinModal.codeLabel")}
            placeholder={t("joinModal.codePlaceholder")}
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            maxLength={8}
            disabled={isJoining}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="default" onClick={onClose} disabled={isJoining}>
            {t("joinModal.cancel")}
          </Button>
          <Button
            variant="default"
            onClick={onJoin}
            disabled={!joinCode || isJoining}
          >
            {isJoining ? "Uniéndose..." : t("joinModal.join")}
          </Button>
        </div>
      </div>
    </div>
  );
};
