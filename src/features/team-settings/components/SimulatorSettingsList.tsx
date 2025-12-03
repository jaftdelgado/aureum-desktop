import React from "react";
import {
  SettingsControl,
  SettingsSection,
} from "@features/team-settings/components/ui/SettingsControl";

export interface SimulatorSettingItem {
  title: string;
  description: string;
  control: React.ReactNode;
}

interface SimulatorSettingsListProps {
  sections: {
    title: string;
    items: SimulatorSettingItem[];
  }[];
  className?: string;
}

export const SimulatorSettingsList: React.FC<SimulatorSettingsListProps> = ({
  sections,
}) => {
  return (
    <div className="w-full h-full flex flex-col gap-4 py-4 max-w-[840px] px-page-x">
      {sections.map((section, sIndex) => (
        <SettingsSection key={sIndex} title={section.title}>
          {section.items.map((item, iIndex) => (
            <SettingsControl
              key={iIndex}
              title={item.title}
              description={item.description}
              control={item.control}
            />
          ))}
        </SettingsSection>
      ))}
    </div>
  );
};
