import React from "react";
import { Icon } from "@iconify/react";
import { IconContainer } from "@core/ui/IconContainer";

interface SettingsOptionProps {
  icon: string;
  title: string;
  description?: string;
  onClick?: () => void;
}

export const SettingsOption: React.FC<SettingsOptionProps> = ({
  icon,
  title,
  description,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full flex items-center justify-between 
        px-5 py-4 rounded-xl
        bg-input hover:bg-card/80 
        transition-colors
        text-left
      "
    >
      <div className="flex items-center gap-5">
        <IconContainer icon={icon} size="sm" variant="secondary" />

        <div className="flex flex-col">
          <span className="text-headline font-medium text-primaryText">
            {title}
          </span>
          {description && (
            <span className="text-body text-secondaryText">{description}</span>
          )}
        </div>
      </div>

      <Icon
        icon="lucide:chevron-right"
        className="text-lg text-secondaryText"
      />
    </button>
  );
};
