import React from "react";
import { useNavigate } from "react-router-dom";
import { SettingsOption } from "@features/team-settings/components/ui/SettingsOption";

export interface SettingsOptionItem {
  icon: string;
  title: string;
  description: string;
  route: string;
}

interface SettingsOptionsListProps {
  options: SettingsOptionItem[];
}

export const SettingsOptionsList: React.FC<SettingsOptionsListProps> = ({
  options,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col gap-3 px-page-x py-4 w-full max-w-[840px]">
      {options.map((opt, index) => (
        <SettingsOption
          key={index}
          icon={opt.icon}
          title={opt.title}
          description={opt.description}
          onClick={() => navigate(opt.route)}
        />
      ))}
    </div>
  );
};
