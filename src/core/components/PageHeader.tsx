import React, { type ReactNode } from "react";
import { Label } from "@core/ui/Label";
import { Tabs, type TabItem } from "@core/components/Tabs";
import { cn } from "@core/utils/cn";

interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  tabs?: TabItem[];
  selectedTab?: string;
  onTabChange?: (value: string) => void;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  tabs,
  selectedTab,
  onTabChange,
  className = "",
}) => {
  return (
    <div className={cn("w-full flex flex-col", className)}>
      <div className="flex justify-between items-end w-full py-page-y px-page-x border-b border-outline">
        <div className="flex flex-col gap-1">
          <Label variant="header" color="primary">
            {title}
          </Label>
          {description && (
            <Label variant="body" color="secondary">
              {description}
            </Label>
          )}
        </div>
        {actions && <div className="ml-2">{actions}</div>}
      </div>

      {tabs && selectedTab !== undefined && onTabChange && (
        <div className="w-full px-page-x border-b border-outline">
          <Tabs tabs={tabs} value={selectedTab} onChange={onTabChange} />
        </div>
      )}
    </div>
  );
};
