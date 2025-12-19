import React from "react";
import { Tabs, type TabItem } from "@core/components/Tabs";

interface PageTabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const PageTabs: React.FC<PageTabsProps> = ({
  tabs,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div
      className={`w-full px-component-x border-b border-outline ${className}`}
    >
      <Tabs tabs={tabs} value={value} onChange={onChange} />
    </div>
  );
};
