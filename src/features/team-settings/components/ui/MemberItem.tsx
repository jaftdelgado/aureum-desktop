import React from "react";
import { Button } from "@core/ui/Button";

interface MemberItemProps {
  avatarUrl: string;
  name: string;
  role: string;
  onRemove: () => void;
}

export const MemberItem: React.FC<MemberItemProps> = ({
  avatarUrl,
  name,
  role,
  onRemove,
}) => {
  return (
    <li className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
      <img
        src={avatarUrl}
        alt={name}
        className="w-10 h-10 rounded-full object-cover mr-4 flex-shrink-0"
      />

      <div className="flex-1 flex flex-col justify-center">
        <span className="font-medium text-body truncate">{name}</span>
        <span className="text-sm text-gray-500 truncate">{role}</span>
      </div>

      <Button
        variant="destructive"
        size="sm"
        iconOnly="mdi:delete"
        onClick={onRemove}
        aria-label={`Eliminar ${name}`}
      />
    </li>
  );
};
